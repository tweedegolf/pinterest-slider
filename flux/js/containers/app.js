import React, {Component, PropTypes} from 'react'
import Actions from '../actions'
import Authorize from './authorize'
import Controls from './controls'
import ImageSlider from './image_slider'
import Store from '../store'

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
        return <Authorize/>
      case 'configure':
        return <Controls boards={this.state.boards} interval={this.state.interval} onSelect={Actions.selectBoard}/>
      case 'run':
        return <ImageSlider/>
      case 'loading':
        return <div className={'loading'}>{'loading'}</div>;
      default:
        return false
    }
    // return (
    //   <div>
    //     <Authorize displayState={this.props.displayState}/>
    //     <Controls displayState={this.props.displayState}/>
    //     <ImageSlider displayState={this.props.displayState}/>
    //   </div>
    // )
  }
}

App.propTypes = {
  dispatch: PropTypes.func, // .isRequired yields a warning because decorators aren't yet fully supported
  displayState: PropTypes.string
}
