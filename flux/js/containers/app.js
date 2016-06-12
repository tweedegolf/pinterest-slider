import React, {Component} from 'react'
import Actions from '../actions'
import Authorize from '../components/authorize'
import Controls from '../components/controls'
import ImageSlider from '../components/image_slider'
import Store from '../store'
import * as DisplayStates from '../constants/display_states'

// only component with state

export default class App extends Component{

  static displayName = 'App'

  constructor(){
    super()
    this.state = Store.getState()
    this._onChangeListener = this._onChange.bind(this)
  }

  componentDidMount() {
    this._storeListener = Store.addListener(this._onChangeListener)
    Actions.checkSession()
  }

  componentWillUnmount() {
    this._storeListener.remove()
  }

  _onChange(){
    let state = Store.getState()
    //console.log(state)
    this.setState(state)
  }

  render(){
    switch(this.state.displayState){

      case DisplayStates.AUTHORIZE:
        return <Authorize onClick={Actions.login}/>

      case DisplayStates.CONFIGURE:
        return <Controls {...this.state} selectBoard={Actions.selectBoard} selectInterval={Actions.selectInterval} start={Actions.start}/>

      case DisplayStates.RUN:
        return <ImageSlider {...this.state} nextImage={Actions.nextImage} />

      case DisplayStates.MESSAGE:
        return <div className={'message'}>{this.state.message}</div>

      default:
        return false
    }
  }
}
