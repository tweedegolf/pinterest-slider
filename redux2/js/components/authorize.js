import React, {PropTypes} from 'react'

const Authorize = ({onClick}) => {

  return (
    <button onClick={onClick}>
      {"authorize"}
    </button>
  )
}

Authorize.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Authorize
