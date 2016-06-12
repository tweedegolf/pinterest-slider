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
    dispatch
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component{

  static displayName = 'App'

  constructor(){
    super()

    this._login = (args) => {
      this.props.dispatch(Actions.login(...args))
    }
    this._selectBoard = (e) => {
      this.props.dispatch(Actions.selectBoard(e))
    }
    this._selectInterval = (e) => {
      this.props.dispatch(Actions.selectInterval(e))
    }
    this._start = (boardId) => {
      this.props.dispatch(Actions.start(boardId))
    }
    this._nextImage = () => {
      this.props.dispatch(Actions.nextImage())
    }
  }

  componentDidMount() {
    this.props.dispatch(Actions.checkSession())
  }

  render(){
    switch(this.props.displayState){

      case DisplayStates.AUTHORIZE:
        return <Authorize onClick={this._login}/>

      case DisplayStates.CONFIGURE:
        return <Controls {...this.props} selectBoard={this._selectBoard} selectInterval={this._selectInterval} start={this._start}/>

      case DisplayStates.RUN:
        return <ImageSlider {...this.props} nextImage={this._nextImage} />

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
  message: PropTypes.string,
}
