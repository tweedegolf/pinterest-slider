import React, {Component} from 'react'
import Actions from '../actions'
import Authorize from '../components/authorize'
import Controls from '../components/controls'
import ImageSlider from '../components/image_slider'
import * as DisplayStates from '../constants/display_states'
import {connect} from 'react-redux'

// only component with state

const mapStateToProps = (state) => {
  const {session, data, slider} = state
  let {displayState} = session
  let {boards, images, selectedBoard} = data
  let {interval, index} = slider
  return {
    displayState,
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
  }

  componentDidMount() {
    this.props.dispatch(Actions.checkSession())
  }

  render(){
    switch(this.props.displayState){

      case DisplayStates.AUTHORIZE:
        return <Authorize onClick={Actions.login}/>

      case DisplayStates.CONFIGURE:
        return <Controls {...this.props} selectBoard={Actions.selectBoard} selectInterval={Actions.selectInterval} start={Actions.start}/>

      case DisplayStates.RUN:
        return <ImageSlider {...this.props} nextImage={Actions.nextImage} />

      case DisplayStates.MESSAGE:
        return <div className={'message'}>{this.props.message}</div>

      default:
        return false
    }
  }
}
