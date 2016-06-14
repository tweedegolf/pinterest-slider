import * as PinterestAPI from './pinterest/api'
import * as ActionTypes from './constants/action_types'
import getStore from './store'

const dispatch = getStore().dispatch

export default {

  checkSession(){
    let session = PinterestAPI.checkSession()

    dispatch({
      type: ActionTypes.CHECK_SESSION,
      payload: {session}
    })

    if(session){
      PinterestAPI.getBoards()
      .then(boards => {
        dispatch({
          type: ActionTypes.GET_BOARDS,
          payload: {boards}
        })
      })
    }
  },


  login(){
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
  },


  selectBoard(e){
    let boardId = e.target.options[e.target.selectedIndex].value
    dispatch({
      type: ActionTypes.SELECT_BOARD,
      payload: {boardId}
    })
  },


  selectInterval(e){
    let interval = e.target.valueAsNumber
    dispatch({
      type: ActionTypes.SELECT_INTERVAL,
      payload: {interval}
    })
  },


  start(boardId){
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
  },


  nextImage(){
    dispatch({
      type: ActionTypes.NEXT_IMAGE
    })
  },
}
