import * as PinterestAPI from './pinterest/api'
import * as ActionTypes from './constants/action_types'

export default {

  checkSession(){
    return dispatch => {
      let session = PinterestAPI.checkSession()

      dispatch({
        type: ActionTypes.CHECK_SESSION,
        payload: {session}
      })

      if(session){
        return PinterestAPI.getBoards()
        .then(boards => {
          dispatch({
            type: ActionTypes.GET_BOARDS,
            payload: {boards}
          })
        })
      }

      return null
    }
  },


  login(){
    return dispatch => {
      dispatch({
        type: ActionTypes.LOGIN
      })

      PinterestAPI.login()
      .then(boards => {
        dispatch({
          type: ActionTypes.GET_BOARDS,
          payload: {boards}
        })
      })
    }
  },


  selectBoard(e){
    let boardId = e.target.options[e.target.selectedIndex].value
    return {
      type: ActionTypes.SELECT_BOARD,
      payload: {boardId}
    }
  },


  selectInterval(e){
    let interval = e.target.valueAsNumber
    return {
      type: ActionTypes.SELECT_INTERVAL,
      payload: {interval}
    }
  },


  start(boardId){
    return function(dispatch){
      dispatch({
        type: ActionTypes.START,
      })
      PinterestAPI.getPins(boardId)
      .then(data => {
        dispatch({
          type: ActionTypes.GET_PINS,
          payload: data
        })
      })
    }
  },


  nextImage(){
    return function(dispatch){
      dispatch({
        type: ActionTypes.NEXT_IMAGE
      })
    }
  },
}
