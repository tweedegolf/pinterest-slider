import React, {Component, PropTypes} from 'react'

export default class Authorize extends Component{

  static displayName = 'Authorize'

  constructor(props){
    super(props)
  }

  render(){
    return (
      <button onClick={this.props.onClick}>
        {"authorize"}
      </button>
    )
  }
}

Authorize.propTypes = {
  onClick: PropTypes.func.isRequired
}
