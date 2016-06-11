import AppDispatcher from './app_dispatcher'
import * as ActionTypes from './constants'

export default {

  checkSession(){
    AppDispatcher.dispatch({
      type: ActionTypes.CHECK_SESSION
    })
  },

  login(){
    AppDispatcher.dispatch({
      type: ActionTypes.LOGIN
    })
  },

  selectBoard(e){
    let boardId = e.target.options[e.target.selectedIndex].value
    AppDispatcher.dispatch({
      type: ActionTypes.SELECT_BOARD,
      payload: {boardId}
    })
  },

  selectInterval(e){
    AppDispatcher.dispatch({
      type: ActionTypes.SELECT_INTERVAL,
      payload: {
        interval: e.target.valueAsNumber
      }
    })
  },

  getPins(){
    AppDispatcher.dispatch({
      type: ActionTypes.GET_PINS,
    })
  },

  nextImage(){
    AppDispatcher.dispatch({
      type: ActionTypes.NEXT_IMAGE
    })
  },

  onImageClick(event){
    AppDispatcher.dispatch({
      type: ActionTypes.ON_IMAGE_CLICK,
      payload: {
        event
      }
    })
  },
}
