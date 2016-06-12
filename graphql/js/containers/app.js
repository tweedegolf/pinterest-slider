import React, {Component, PropTypes} from 'react'
import Relay from 'react-relay'
import Actions from '../actions'
import Authorize from '../components/authorize'
import Controls from '../components/controls'
import ImageSlider from '../components/image_slider'
import * as DisplayStates from '../constants/display_states'

// only component with state

class App extends Component{

  static displayName = 'App'

  constructor(){
    super()
  }

  componentDidMount() {
    //this.props.dispatch(Actions.checkSession())
    console.log('mount', this.props)
  }

  render(){
    switch(this.props.state.displayState){

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

export default Relay.createContainer(App, {
  fragments: {
    state: () => Relay.QL`
      fragment on State {
        displayState,
        message
      }
    `,
    session: () => Relay.QL`
      fragment on Session {
        loggedin,
        boards
      }
    `
  },
})
