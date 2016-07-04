import React, {PropTypes} from 'react'

const SelectBoard = ({boards, onChange}) => {

  let options = [<option id={'choose'} key={'choose'}>{'choose a board'}</option>]

  for(let id of Object.keys(boards)){
    let b = boards[id]
    options.push(<option id={id} key={id}>{b.name}</option>)
  }

  return (
    <select onChange={onChange}>
      {options}
    </select>
  )
}

SelectBoard.propTypes = {
  boards: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SelectBoard
