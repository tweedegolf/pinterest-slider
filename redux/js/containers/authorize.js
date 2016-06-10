import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {login} from '../actions'

const mapDispatchToProps = function(dispatch){
  return {
    dispatch
  }
}

@connect(mapDispatchToProps)
export default class Authorize extends Component{

  static displayName = 'Authorize'

  constructor(props){
    super(props)
  }

  render(){
    return (
      <button onClick={() => this.props.dispatch(login())}>
        {"authorize"}
      </button>
    )
  }
}

Authorize.propTypes = {
  dispatch: PropTypes.func // .isRequired yields a warning because decorators aren't yet fully supported
}
