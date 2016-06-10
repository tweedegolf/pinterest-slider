import React, {Component, PropTypes} from 'react'
import {getPins} from '../actions'

export default class SelectBoard extends Component{

  static displayName = 'SelectBoard'

  constructor(props){
    super(props);
  }

  render(){
    let boards = this.props.boards;
    let options = [<option id={'choose'} key={'choose'}>{'choose a board'}</option>]
    for(let id of Object.keys(boards)){
      let b = boards[id]
      options.push(<option id={id} key={id}>{b.name}</option>)
    }

    return (
      <select onChange={this.props.onChange}>
        {options}
      </select>
    )
  }
}


// .isRequired yields a warning because decorators aren't yet fully supported
SelectBoard.propTypes = {
  onChange: PropTypes.func,
  boards: PropTypes.object
}
