import React, {Component, PropTypes} from 'react'
import Image from './image'

export default class ImageSlider extends Component{

  static displayName = 'ImageSlider'

  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.props.nextImage()
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
        onClick={function(e){
          e.preventDefault()
          window.open(image.pinUrl, '_blank')
        }}
      />
    )
  }
}

ImageSlider.propTypes = {
  nextImage: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  interval: PropTypes.number.isRequired,
}
