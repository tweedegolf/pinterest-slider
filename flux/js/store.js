import EventEmitter from 'events'
import * as ActionTypes from './constants'
import AppDispatcher from './app_dispatcher'
import * as Actions from './actions'
import pdk from './pdk_wrapper'

const CHANGE_EVENT = 'change'

let state = {
  displayState: 'authorize',
  interval: 6000
}

let s = 0


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

  state = {...state,
    type: Actions.RECEIVE_PINS,
    displayState: 'run',
    pins,
    images,
    numImages: images.length
  }
}


function getBoards(){
  state = {...state, displayState: 'loading'}
  this.emitChange()
  pdk.getBoards()
  .then(e => {
    state = _receiveBoards(e)
    this.emitChange()
  })
}


function login(){
  state = {...state, displayState: 'loading'}
  this.emitChange()

  pdk.login()
  .then(() => {
    pdk.getBoards()
    .then(e => {
      state = _receiveBoards(e)
      this.emitChange()
    })
  })
}

function getPins(boardId) {
  return dispatch => {
    dispatch({
      type: Actions.GET_PINS,
      displayState: 'loading'
    })
    return pdk.getPins(boardId)
      .then(e => dispatch(_receivePins(e)))
  }
}


function nextImage(oldIndex){
  return (dispatch, getState) => {
    let index = oldIndex + 1
    let max = getState().data.numImages
    if(index === max){
      index = 0
    }
    dispatch({
      type: Actions.NEXT_IMAGE,
      index
    })
  }
}

function selectInterval(interval){
  return (dispatch) => {
    dispatch({
      type: Actions.SELECT_INTERVAL,
      interval
    })
  }
}

function selectBoard(board){
  return (dispatch) => {
    dispatch({
      type: Actions.SELECT_BOARD,
      board
    })
  }
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
        let accessToken = pdk.accessToken
        if(accessToken !== ''){
          getBoards.call(this)
        }else{
          login.call(this)
        }
        break;

      case ActionTypes.LOGIN:
        //this.emitChange()
        break;


      case ActionTypes.SELECT_BOARD:
        getPins.call(this, action.payload.boardId)
        break;

      default:
      // do nothing
    }
  }
}

export default new Store()
