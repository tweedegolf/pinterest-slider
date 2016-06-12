import AppDispatcher from './app_dispatcher'
import * as PinterestAPI from './pinterest/api'
import * as ActionTypes from './constants/action_types'

export default {

  checkSession(){
    let session = PinterestAPI.checkSession()
    AppDispatcher.dispatch({
      type: ActionTypes.CHECK_SESSION,
      payload: {session}
    })
    if(session){
      PinterestAPI.getBoards()
    }
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
  },

  selectInterval(e){
    AppDispatcher.dispatch({
      type: ActionTypes.SELECT_INTERVAL,
      payload: {
        interval: e.target.valueAsNumber
      }
    })
  },

  start(boardId){
    AppDispatcher.dispatch({
      type: ActionTypes.START,
    })
    PinterestAPI.getPins(boardId)
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
      type: ActionTypes.GET_PINS,
      payload: data
    })
  },
}
