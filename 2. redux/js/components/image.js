import React, {PropTypes} from 'react'
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')

const Image = ({url, index, width, height}) => {
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
        onClick={function(e){
          e.preventDefault()
          window.open(url, '_blank')
        }}
      />
    </ReactCSSTransitionGroup>
  )
}


Image.propTypes = {
  url: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

export default Image
