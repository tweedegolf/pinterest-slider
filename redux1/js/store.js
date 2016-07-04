import {applyMiddleware, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import * as ActionTypes from './constants/action_types'
import * as DisplayStates from './constants/display_states'

let store = null

let initialState = {
  displayState: DisplayStates.AUTHORIZE,
  message: '...',
  boards: [],
  images: [],
  index: 0,
  interval: 6000,
  selectedBoard: 'choose',
}


function rootReducer(state = initialState, action){

  switch (action.type) {

    case ActionTypes.CHECK_SESSION:
      if(action.payload.session === true){
        return {...state, displayState: DisplayStates.MESSAGE, message: 'check session'}
      }
      return {...state, displayState: DisplayStates.AUTHORIZE}

    case ActionTypes.LOGIN:
      return {...state, displayState: DisplayStates.MESSAGE, message: 'logging in'}


    // actions originating from user interaction
    case ActionTypes.SELECT_BOARD:
      return {...state, selectedBoard: action.payload.boardId}

    case ActionTypes.SELECT_INTERVAL:
      return {...state, interval: action.payload.interval}

    case ActionTypes.START:
      return {...state, displayState: DisplayStates.MESSAGE, message: 'loading images'}


    // actions originating from setInterval
    case ActionTypes.NEXT_IMAGE:
      let index = state.index + 1
      let maxIndex = state.images.length
      if(index === maxIndex){
        index = 0
      }
      return {...state, index}


    // actions originating from Pinterest API
    case ActionTypes.GET_BOARDS:
      return {...state, displayState: DisplayStates.CONFIGURE, boards: action.payload.boards}

    case ActionTypes.GET_PINS:
      return {...state, displayState: DisplayStates.RUN, images: action.payload.images}

    default:
      return state
  }
}


export default function getStore() {
  if(store === null){
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(
        thunkMiddleware,
        createLogger()
      )
    )
  }
  return store
}
