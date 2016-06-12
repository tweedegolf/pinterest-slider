import {combineReducers, applyMiddleware, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import * as actions from './constants/action_types'


function session(state = {}, action){
  switch (action.type) {
    case actions.CHECK_SESSION:
      return {...state, displayState: action.payload.session}
    case actions.LOGIN:
    case actions.LOGGED_IN:
    case actions.GET_BOARDS:
      return {...state, displayState: 'configure'}
    case actions.RECEIVE_BOARDS:
    case actions.GET_PINS:
    case actions.RECEIVE_PINS:
    default:
      return state
  }
}

function data(state = {boards: [], images: []}, action) {
  switch(action.type){

    case actions.GET_BOARDS:
      return {...state, boards: action.payload.boards}

    case actions.SELECT_BOARD:
      return Object.assign({}, state, {
        selectedBoard: action.payload.boardId
      })
    case actions.RECEIVE_PINS:
      return Object.assign({}, state, {
        pins: action.pins,
        images: action.images,
        numImages: action.numImages
      })
    default:
      return state
  }
}

function slider(state = {index: 0, interval: 6000}, action){
  switch(action.type){
    case actions.NEXT_IMAGE:
      return Object.assign({}, state, {index: action.index})
    case actions.SELECT_INTERVAL:
      return Object.assign({}, state, {interval: action.interval})
    default:
      return state
  }
}

const rootReducer = combineReducers({
  session,
  data,
  slider
})

const loggerMiddleware = createLogger()

export default function getStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
