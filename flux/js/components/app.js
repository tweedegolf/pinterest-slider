import React, {Component, PropTypes} from 'react'
import Actions from '../actions'
import Authorize from './authorize'
import Controls from './controls'
import ImageSlider from './image_slider'
import Store from '../store'

// only component with state

export default class App extends Component{

  static displayName = 'App'

  constructor(){
    super()
    this.state = Store.getState()
    this._onChangeListener = this._onChange.bind(this)
  }

  componentDidMount() {
    Store.addChangeListener(this._onChangeListener)
    Actions.checkSession()
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChangeListener)
  }

  _onChange(){
    let state = Store.getState()
    this.setState(state)
  }

  render(){
    switch(this.state.displayState){
      case 'authorize':
        return <Authorize onClick={Actions.login}/>

      case 'configure':
        return <Controls {...this.state} selectBoard={Actions.selectBoard} selectInterval={Actions.selectInterval} getPins={Actions.getPins}/>

      case 'run':
        return <ImageSlider {...this.state} nextImage={Actions.nextImage} onClick={Actions.onImageClick}/>

      case 'loading':
        return <div className={'loading'}>{'loading'}</div>

      default:
        return false
    }
  }
}