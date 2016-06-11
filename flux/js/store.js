import {ReduceStore} from 'flux/utils'
import pdk from './pdk_wrapper'
import * as ActionTypes from './constants'
import AppDispatcher from './app_dispatcher'

let numImages = 0


function _receiveBoards(json, state){
  let boards = []

  json.map(function(b){
    boards.push(b)
  })

  return {...state, boards, displayState: 'configure'}
}


function _receivePins(json, state){
  let pins = []
  let images = []

  json.map(function(p){
    pins.push(p)
    images.push(p.image.original)
  })

  numImages = json.length

  return {...state,
    pins,
    images,
    displayState: 'run',
  }
}


function getBoards(state){
  pdk.getBoards()
  .then(json => {

    let boards = []

    json.map(function(b){
      boards.push(b)
    })

    return _receiveBoards(json, state)
  })
}


function getPins() {
  state = {...state, displayState: 'loading'}

  pdk.getPins(state.selectedBoard)
  .then(json => {
    state = _receivePins(json)
  })
}


function login(){
  state = {...state, displayState: 'login'}

  pdk.login()
  .then(() => {
    getBoards.call(this)
  })
}


function checkSession(state){
  let accessToken = pdk.accessToken
  if(accessToken !== ''){
    return getBoards.call(this, state)
  }else {
    return null
  }
}


function nextImage(){
  let index = state.index
  index++
  if(index === numImages){
    index = 0
  }
  state = {...state, index}
}


class Store extends ReduceStore {

  getInitialState(){
    return {
      displayState: 'authorize',
      interval: 6000,
      index: 0,
      selectedBoard: 'choose',
    }
  }


  reduce(state, action) {
    console.log('action:', action, state)

    switch(action.type) {

      case ActionTypes.CHECK_SESSION:
        //return null
        return checkSession.call(this, state)

      case ActionTypes.LOGIN:
        state = {...state, displayState: 'loading'}
        this.__emitChange()
        login.call(this)
        break

      case ActionTypes.SELECT_BOARD:
        state = {...state, selectedBoard: action.payload.boardId}

        break

      case ActionTypes.SELECT_INTERVAL:
        state = {...state, interval: action.payload.interval}

        break

      case ActionTypes.GET_PINS:
        getPins.call(this)
        break

      case ActionTypes.NEXT_IMAGE:
        nextImage.call(this)
        break

      case ActionTypes.ON_IMAGE_CLICK:
        action.payload.event.preventDefault()
        let url = state.pins[state.index].url
        window.open(url, '_blank')
        break

      default:
        return null
    }
  }
}

export default new Store(AppDispatcher)
