import React, {Component, PropTypes} from 'react'
import Range from './range_react'

export default class Controls extends Component{

  static displayName = 'Controls'

  constructor(props){
    super(props);
  }

  render(){

    let boards = this.props.boards
    let options = [<option value={'choose'} key={'choose'}>{'choose a board'}</option>]

    boards.forEach(board => {
      options.push(<option value={board.id} key={board.id}>{board.name}</option>)
    })

    return (
      <div>
        <select value={this.props.selectedBoard} onChange={this.props.selectBoard}>
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
          onChange={this.props.selectInterval}
        />

        <button
          disabled={this.props.selectedBoard === 'choose'}
          onClick={this.props.getPins}
        >
          {'start'}
        </button>
      </div>
    )
  }
}

Controls.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object),
  interval: PropTypes.number.isRequired,
  selectBoard: PropTypes.func.isRequired,
  selectedBoard: PropTypes.string.isRequired
}
