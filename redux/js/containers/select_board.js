import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {getPins} from '../actions'

const mapStateToProps = function(state){
  const {boardsById} = state
  let boards = boardsById.boards
  return {
    boards
  }
}


const mapDispatchToProps = function(dispatch){
  return {
    onChange: (e) => {
      let options = e.target.options
      let optionId = options[e.target.selectedIndex].id
      if(optionId !== 'choose'){
        dispatch(getPins(optionId))
      }
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
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
