import React, {Component, PropTypes} from 'react'
import {selectInterval, selectBoard, getPins} from '../actions'
import Range from '../components/range_react'

export default class Controls extends Component{

  static displayName = 'Controls'

  constructor(props){
    super(props);
  }

  render(){

    let boards = this.props.boards;
    let options = [<option id={'choose'} key={'choose'}>{'choose a board'}</option>]
    boards.forEach(function(board){
      options.push(<option id={board.id} key={board.id}>{board.name}</option>)
    })

    return (
      <div>
        <select onChange={this.props.selectBoard}>
          {options}
        </select>

        <Range
          classLabel={'label-interval'}
          classRange={'range-interval'}
          label={'interval: '}
          min={2000}
          max={20000}
          step={5}
          value={this.props.interval}
          onChange={e => this.props.dispatch(selectInterval(e.target.valueAsNumber))}
        />

        <button
          disabled={typeof this.props.selectedBoard === 'undefined'}
          onClick={e => this.props.dispatch(getPins(this.props.selectedBoard))}
        >
          {'start'}
        </button>
      </div>
    )
  }
}

// .isRequired yields a warning because decorators aren't yet fully supported
Controls.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object),
  interval: PropTypes.number,
  selectBoard: PropTypes.func,
  selectedBoard: PropTypes.string
}
