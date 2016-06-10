import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {nextImage} from '../actions'
import Image from '../components/image'

const mapStateToProps = (state) => {
  const {data, slider} = state
  return {
    pins: data.pins,
    images: data.images,
    index: slider.index,
    interval: slider.interval
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (url) => {
      window.open(url, '_blank')
      //dispatch(nextImage(ownProps.index))
    },
    dispatch
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ImageSlider extends Component{

  static displayName = 'ImageSlider'

  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.props.dispatch(nextImage(this.props.index))
    }, this.props.interval)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render(){
    let image = this.props.images[this.props.index]
    return (
      <Image
        url={image.url}
        index={this.props.index}
        onClick={() => this.props.onClick(this.props.pins[this.props.index].url)}
      />
    )
  }
}

// .isRequired yields a warning because decorators aren't yet fully supported
ImageSlider.propTypes = {
  dispatch: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
  interval: PropTypes.number,
  onClick: PropTypes.func
}
