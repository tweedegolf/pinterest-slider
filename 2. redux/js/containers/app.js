import React, {Component, PropTypes} from 'react'
import Actions from '../actions'
import Authorize from '../components/authorize'
import Controls from '../components/controls'
import ImageSlider from '../components/image_slider'
import * as DisplayStates from '../constants/display_states'
import {connect} from 'react-redux'

// only component with state

const mapStateToProps = (state) => {
  let {displayState, message, boards, images, selectedBoard, interval, index} = state
  return {
    displayState,
    message,
    boards,
    images,
    selectedBoard,
    interval,
    index,
  }
}

const mapDispatchToProps = function(dispatch){
  return {
    dispatch,
    login(args){
      dispatch(Actions.login(...args))
    },
    selectBoard(e){
      dispatch(Actions.selectBoard(e))
    },
    selectInterval(e){
      dispatch(Actions.selectInterval(e))
    },
    start(boardId){
      dispatch(Actions.start(boardId))
    },
    nextImage(){
      dispatch(Actions.nextImage())
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component{

  static displayName = 'App'

  constructor(){
    super()

  }

  componentDidMount() {
    this.props.dispatch(Actions.checkSession())
  }

  render(){
    switch(this.props.displayState){

      case DisplayStates.AUTHORIZE:
        return <Authorize onClick={this.props.login}/>

      case DisplayStates.CONFIGURE:
        return <Controls {...this.props}/>

      case DisplayStates.RUN:
        return <ImageSlider {...this.props} />

      case DisplayStates.MESSAGE:
        return <div className={'message'}>{this.props.message}</div>

      default:
        return false
    }
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  displayState: PropTypes.string,
  login: PropTypes.func,
  message: PropTypes.string,
}
