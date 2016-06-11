import EventEmitter from 'events'
import pdk from './pdk_wrapper'
import * as ActionTypes from './constants'
import AppDispatcher from './app_dispatcher'

const CHANGE_EVENT = 'change'

let state = {
  displayState: 'authorize',
  interval: 6000,
  index: 0,
  selectedBoard: 'choose',
}

let s = 0
let numImages = 0


function _receiveBoards(json){
  let boards = []

  json.map(function(b){
    boards.push(b)
  })

  return {...state, boards, displayState: 'configure'}
}


function _receivePins(json){
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


function checkSession(){
  let accessToken = pdk.accessToken
  if(accessToken !== ''){
    getBoards.call(this)
  }else{
    login.call(this)
  }
}


function login(){
  state = {...state, displayState: 'loading'}
  this.emitChange()

  pdk.login()
  .then(() => {
    getBoards.call(this)
  })
}


function getBoards(){
  state = {...state, displayState: 'loading'}
  this.emitChange()
  pdk.getBoards()
  .then(json => {
    state = _receiveBoards(json)
    this.emitChange()
  })
}


function getPins() {
  state = {...state, displayState: 'loading'}
  this.emitChange()

  pdk.getPins(state.selectedBoard)
  .then(json => {
    state = _receivePins(json)
    this.emitChange()
  })
}


function nextImage(){
  let index = state.index
  index++
  if(index === numImages){
    index = 0
  }
  state = {...state, index}
  this.emitChange()
}


class Store extends EventEmitter {

  constructor () {
    super()

    AppDispatcher.register((action) => {
      this.handle(action)
    })
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getState() {
    console.log(s++, state)
    return {...state}
  }


  handle(action) {
    console.log('action:', action)

    switch(action.type) {

      case ActionTypes.CHECK_SESSION:
        checkSession.call(this)
        break

      case ActionTypes.LOGIN:
        login.call(this)
        break

      case ActionTypes.SELECT_BOARD:
        state = {...state, selectedBoard: action.payload.boardId}
        this.emitChange()
        break

      case ActionTypes.SELECT_INTERVAL:
        state = {...state, interval: action.payload.interval}
        this.emitChange()
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
      // do nothing
    }
  }
}

export default new Store()
