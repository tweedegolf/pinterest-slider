import {applyMiddleware, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import * as actions from './constants/action_types'
import * as DisplayStates from './constants/display_states'

let store = null

let initialState = {
  displayState: DisplayStates.Authorize,
  message: '...',
  boards: [],
  images: [],
  index: 0,
  interval: 6000,
  selectedBoard: 'choose',
}


function rootReducer(state = initialState, action){

  switch (action.type) {
    case actions.CHECK_SESSION:
      return {...state, displayState: DisplayStates.MESSAGE, message: 'check session'}

    case actions.GET_BOARDS:
      return {...state, displayState: DisplayStates.CONFIGURE, boards: action.payload.boards}

    case actions.SELECT_INTERVAL:
      return {...state, interval: action.interval}

    case actions.SELECT_BOARD:
      return {...state, selectedBoard: action.payload.boardId}

    case actions.GET_PINS:
      return {...state, displayState: DisplayStates.RUN, images: action.payload.images}

    case actions.NEXT_IMAGE:
      let index = state.index + 1
      let maxIndex = state.images.length
      if(index === maxIndex){
        index = 0
      }
      return {...state, index: index}

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
