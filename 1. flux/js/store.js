import {ReduceStore} from 'flux/utils'
import AppDispatcher from './app_dispatcher'
import * as ActionTypes from './constants/action_types'
import * as DisplayStates from './constants/display_states'


class Store extends ReduceStore {

  getInitialState(){
    return {
      displayState: DisplayStates.AUTHORIZE,
      message: 'checking session',
      boards: [],
      images: [],
      index: 0,
      interval: 6000,
      selectedBoard: 'choose',
    }
  }

  reduce(state, action) {

    switch(action.type) {

      case ActionTypes.CHECK_SESSION:
        if(action.payload.session === true){
          return {...state, displayState: DisplayStates.MESSAGE, message: 'checking session'}
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
        let numImages = state.images.length
        if(index === numImages){
          index = 0
        }
        return {...state, index}


      // actions originating from Pinterest API
      case ActionTypes.GET_BOARDS:
        return {...state, boards: action.payload.boards, displayState: DisplayStates.CONFIGURE}

      case ActionTypes.GET_PINS:
        return {...state, images: action.payload.images, displayState: DisplayStates.RUN}

      default:
        return state
    }
  }
}

export default new Store(AppDispatcher)
