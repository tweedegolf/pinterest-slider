import React, {PropTypes} from 'react'
import Range from './range_react'

const Controls = ({boards, selectedBoard, selectBoard, interval, selectInterval, start}) => {

  let options = [<option value={'choose'} key={'choose'}>{'choose a board'}</option>]

  boards.forEach(board => {
    options.push(<option value={board.id} key={board.id} disabled={board.id === selectedBoard}>{board.name}</option>)
  })

  return (
    <div>
      <select onChange={selectBoard} value={selectedBoard}>
        {options}
      </select>

      <Range
        classLabel={'label-interval'}
        classRange={'range-interval'}
        label={'interval: '}
        min={2000}
        max={20000}
        step={5}
        value={interval}
        onChange={selectInterval}
      />

      <button
        disabled={selectedBoard === 'choose'}
        onClick={function(){
          start(selectedBoard)
        }}
      >
        {'start'}
      </button>
    </div>
  )
}


Controls.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object),
  start: PropTypes.func.isRequired,
  interval: PropTypes.number.isRequired,
  selectBoard: PropTypes.func.isRequired,
  selectedBoard: PropTypes.string.isRequired,
  selectInterval: PropTypes.func.isRequired,
}

export default Controls
