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

@connect(mapStateToProps)
export default class App extends Component{

  static displayName = 'App'

  componentDidMount() {
    Actions.checkSession()
  }

  render(){
    switch(this.props.displayState){

      case DisplayStates.AUTHORIZE:
        return <Authorize onClick={Actions.login}/>

      case DisplayStates.CONFIGURE:
        return <Controls {...this.props} selectBoard={Actions.selectBoard} selectInterval={Actions.selectInterval} start={Actions.start}/>

      case DisplayStates.RUN:
        return <ImageSlider {...this.props} nextImage={Actions.nextImage}/>

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
