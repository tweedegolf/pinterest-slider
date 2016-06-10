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

  selectBoard(){
    AppDispatcher.dispatch({
      type: ActionTypes.SELECT_BOARD
    })
  },
}
