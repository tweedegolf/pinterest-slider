import AppDispatcher from './app_dispatcher'
import * as ActionTypes from './constants'
import * as PinterestAPI from './pinterest/api'

export default {

  checkSession(){
    AppDispatcher.dispatch({
      type: ActionTypes.CHECK_SESSION
    })
    PinterestAPI.checkSession()
  },

  login(){
    AppDispatcher.dispatch({
      type: ActionTypes.LOGIN
    })
    PinterestAPI.login()
  },

  selectBoard(e){
    let boardId = e.target.options[e.target.selectedIndex].value
    AppDispatcher.dispatch({
      type: ActionTypes.SELECT_BOARD,
      payload: {boardId}
    })
    //PinterestAPI.getPins(boardId)
  },

  selectInterval(e){
    AppDispatcher.dispatch({
      type: ActionTypes.SELECT_INTERVAL,
      payload: {
        interval: e.target.valueAsNumber
      }
    })
  },

  nextImage(){
    AppDispatcher.dispatch({
      type: ActionTypes.NEXT_IMAGE
    })
  },

  getBoards(boards){
    AppDispatcher.dispatch({
      type: ActionTypes.GET_BOARDS,
      payload: {boards}
    })
  },

  getPins(data){
    AppDispatcher.dispatch({
      type: ActionTypes.GET_BOARDS,
      payload: data
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
