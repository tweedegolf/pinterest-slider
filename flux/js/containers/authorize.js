import React, {Component, PropTypes} from 'react'
import Actions from '../actions'

export default class Authorize extends Component{

  static displayName = 'Authorize'

  constructor(props){
    super(props)
  }

  render(){
    return (
      <button onClick={Actions.login}>
        {"authorize"}
      </button>
    )
  }
}

Authorize.propTypes = {
  dispatch: PropTypes.func // .isRequired yields a warning because decorators aren't yet fully supported
}
