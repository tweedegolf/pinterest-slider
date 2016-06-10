import * as actions from '../constants/action_types'


function session(state = {}, action){
  let displayState = action.displayState
  switch (action.type) {
    case actions.CHECK_SESSION:
    case actions.LOGIN:
    case actions.LOGGED_IN:
    case actions.GET_BOARDS:
    case actions.RECEIVE_BOARDS:
    case actions.GET_PINS:
    case actions.RECEIVE_PINS:
      return Object.assign({}, state, {
        displayState
      })
    default:
      return state
  }
}

function data(state = {boards: [], images: []}, action) {
  switch(action.type){
    case actions.RECEIVE_BOARDS:
      return Object.assign({}, state, {
        boards: action.boards
      })
    case actions.SELECT_BOARD:
      return Object.assign({}, state, {
        selectedBoard: action.board
      })
    case actions.RECEIVE_PINS:
      return Object.assign({}, state, {
        pins: action.pins,
        images: action.images,
        numImages: action.numImages
      })
    default:
      return state
  }
}

function slider(state = {index: 0, interval: 6000}, action){
  switch(action.type){
    case actions.NEXT_IMAGE:
      return Object.assign({}, state, {index: action.index})
    case actions.SELECT_INTERVAL:
      return Object.assign({}, state, {interval: action.interval})
    default:
      return state
  }
}

const rootReducer = combineReducers({
  session,
  data,
  slider
})

export default rootReducer
