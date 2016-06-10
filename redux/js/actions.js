import * as actions from './constants'
import pdk from './pdk_wrapper'


function _receiveBoards(json){
  let boards = []

  json.map(function(b){
    boards.push(b)
  })

  return {
    type: actions.RECEIVE_BOARDS,
    displayState: 'configure',
    boards
  }
}

function _receivePins(json){
  let pins = []
  let images = []

  json.map(function(p){
    pins.push(p)
    images.push(p.image.original)
  })

  return {
    type: actions.RECEIVE_PINS,
    displayState: 'run',
    pins,
    images,
    numImages: images.length
  }
}

export function checkSession(){
  let accessToken = pdk.accessToken
  if(accessToken !== ''){
    return dispatch => {
      dispatch({
        type: actions.GET_BOARDS,
        displayState: 'loading'
      })
      return pdk.getBoards()
        .then(e => dispatch(_receiveBoards(e)))
    }
  }

  return {
    type: actions.CHECK_SESSION,
    displayState: 'authorize'
  }
}

export function login(){
  return dispatch => {
    dispatch({
      type: actions.LOGIN,
      displayState: 'loading'
    })
    return pdk.login()
      .then(() => {
        dispatch({
          type: actions.LOGGED_IN,
          displayState: 'configure'
        })
        pdk.getBoards()
          .then((e) => dispatch(_receiveBoards(e)))
      })
  }
}

export function getPins(boardId) {
  return dispatch => {
    dispatch({
      type: actions.GET_PINS,
      displayState: 'loading'
    })
    return pdk.getPins(boardId)
      .then(e => dispatch(_receivePins(e)))
  }
}


export function nextImage(oldIndex){
  return (dispatch, getState) => {
    let index = oldIndex + 1
    let max = getState().data.numImages
    if(index === max){
      index = 0
    }
    dispatch({
      type: actions.NEXT_IMAGE,
      index
    })
  }
}

export function selectInterval(interval){
  return (dispatch) => {
    dispatch({
      type: actions.SELECT_INTERVAL,
      interval
    })
  }
}

export function selectBoard(board){
  return (dispatch) => {
    dispatch({
      type: actions.SELECT_BOARD,
      board
    })
  }
}
