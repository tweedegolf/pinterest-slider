import {ReduceStore} from 'flux/utils'
import AppDispatcher from './app_dispatcher'
import * as ActionTypes from './constants/action_types'
import * as DisplayStates from './constants/display_states'


class Store extends ReduceStore {

  getInitialState(){
    return {
      displayState: DisplayStates.Authorize,
      message: '...',
      boards: [],
      images: [],
      index: 0,
      interval: 6000,
      selectedBoard: 'choose',
    }
  }

  reduce(state, action) {
    //console.log('action:', action, state)

    switch(action.type) {

      case ActionTypes.CHECK_SESSION:
        if(action.payload.session === true){
          state = {...state, displayState: DisplayStates.MESSAGE, message: 'checking session'}
        }else{
          state = {...state, displayState: DisplayStates.AUTHORIZE}
        }
        return state

      case ActionTypes.LOGIN:
        state = {...state, displayState: DisplayStates.MESSAGE, message: 'logging in'}
        return state


      // actions originating from user interaction
      case ActionTypes.SELECT_BOARD:
        state = {...state, selectedBoard: action.payload.boardId}
        return state

      case ActionTypes.SELECT_INTERVAL:
        state = {...state, interval: action.payload.interval}
        return state

      case ActionTypes.START:
        state = {...state, displayState: DisplayStates.MESSAGE, message: 'loading images'}
        return state


      // actions originating from setInterval
      case ActionTypes.NEXT_IMAGE:
        let index = state.index + 1
        let numImages = state.images.length
        if(index === numImages){
          index = 0
        }
        state = {...state, index}
        return state


      // actions originating from Pinterest API
      case ActionTypes.GET_BOARDS:
        state = {...state, boards: action.payload.boards, displayState: DisplayStates.CONFIGURE}
        return state

      case ActionTypes.GET_PINS:
        state = {...state, images: action.payload.images, displayState: DisplayStates.RUN}
        return state

      default:
        return state
    }
  }
}

export default new Store(AppDispatcher)
