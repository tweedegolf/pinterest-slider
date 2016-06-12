import {ReduceStore} from 'flux/utils'
import * as ActionTypes from './constants'
import AppDispatcher from './app_dispatcher'

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
    //console.log('action:', action, state)

    switch(action.type) {

      case ActionTypes.CHECK_SESSION:
        state = {...state, displayState: 'loading'}
        return state

      case ActionTypes.LOGIN:
        state = {...state, displayState: 'loading'}
        return state

      // actions originating from user interaction
      case ActionTypes.SELECT_BOARD:
        state = {...state, selectedBoard: action.payload.boardId}
        return state

      case ActionTypes.SELECT_INTERVAL:
        state = {...state, interval: action.payload.interval}
        return state

      case ActionTypes.NEXT_IMAGE:
        let index = state.index
        let numImages = state.images.length
        index++
        if(index === numImages){
          index = 0
        }
        state = {...state, index}
        return state

      case ActionTypes.ON_IMAGE_CLICK:
        action.payload.event.preventDefault()
        let url = state.pins[state.index].url
        window.open(url, '_blank')
        return null

      // actions originating from Pinterest API
      case ActionTypes.GET_BOARDS:
        state = {...state, boards: action.payload.boards, displayState: 'configure'}
        return state

      case ActionTypes.GET_PINS:
        state = {...state, pins: action.payload.pins, images: action.payload.images, displayState: 'configure'}
        console.log(state)
        return state

      default:
        return null
    }
  }
}

export default new Store(AppDispatcher)
