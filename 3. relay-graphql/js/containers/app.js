import React, {Component, PropTypes} from 'react'
import Relay from 'react-relay'
import Controls from '../components/controls'
import ImageSlider from '../components/image_slider'
import * as DisplayStates from '../constants/display_states'

// only component with state

class App extends Component{

  static displayName = 'App'

  constructor(){
    super()

    this.state = {
      displayState: DisplayStates.AUTHORIZE,
      message: 'checking session',
      selectedBoard: 'choose',
      interval: 6000,
      index: 0,
    }

    this._selectBoard = (e) => {
      let boardId = e.target.options[e.target.selectedIndex].value
      this.state = {...this.state, selectedBoard: boardId}
      this.props.relay.setVariables({boardId})
    }

    this._selectInterval = (e) => {
      let interval = parseInt(e.target.valueAsNumber, 10)
      this.state = {...this.state, interval}
      this.setState(this.state)
    }

    this._start = () => {
      this.state = {...this.state, displayState: DisplayStates.RUN}
      this.setState(this.state)
    }

    this._nextImage = () => {
      let index = this.state.index + 1
      let maxIndex = this.props.session.images.length
      if(index === maxIndex){
        index = 0
      }
      this.state = {...this.state, index}
      this.setState(this.state)
    }

  }

  componentWillMount(){
    let {authorized} = this.props.session
    if(authorized === true && this.state.displayState === DisplayStates.AUTHORIZE){
      this.state = {...this.state, displayState: DisplayStates.CONFIGURE}
    }else{
      this.state = {...this.state, message: 'something went wrong, please refresh the page and try again'}
    }
  }

  render(){

    switch(this.state.displayState){

      case DisplayStates.AUTHORIZE:
        return <div>{this.state.message}</div>

      case DisplayStates.CONFIGURE:
        return (
          <Controls
            {...this.props.session}
            interval={this.state.interval}
            selectedBoard={this.state.selectedBoard}
            selectBoard={this._selectBoard}
            selectInterval={this._selectInterval}
            start={this._start}
          />)

      case DisplayStates.RUN:
        return (
          <ImageSlider
            {...this.props.session}
            interval={this.state.interval}
            index={this.state.index}
            nextImage={this._nextImage}
          />)

      default:
        return false
    }
  }
}

App.propTypes = {
  session: PropTypes.object,
}


export default Relay.createContainer(App, {
  initialVariables: {
    boardId: 'choose',
  },
  fragments: {
    session: () => Relay.QL`
      fragment on Session{
        authorized,
        boards {
          id,
          url,
          name,
        },
        images(boardId: $boardId){
          url,
          pinUrl
        },
      }
    `
  },
})
