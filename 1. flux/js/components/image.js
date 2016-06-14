import React, {PropTypes} from 'react'
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')

const Image = ({url, index, width, height, onClick}) => {
  return (
    <ReactCSSTransitionGroup
      transitionName={'image'}
      transitionAppear={true}
      transitionAppearTimeout={1200}
      transitionEnterTimeout={1200}
      transitionLeaveTimeout={1200}
    >
      <img
        src={url}
        key={'image_' + index}
        onClick={onClick}
      />
    </ReactCSSTransitionGroup>
  )
}


Image.propTypes = {
  url: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

export default Image
