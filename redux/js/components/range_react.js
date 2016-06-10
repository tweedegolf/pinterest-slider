import React, {PropTypes} from 'react'

const labelStyle = {
  width: '140px',
  height: '1.9em',
  display: 'inline-block',
  color: 'red'
}

const rangeStyle = {
  verticalAlign: 'middle',
  //marginBottom: '5px',
  width: '200px'
}

/* React wrapper for input type Range */

class Slider extends React.Component{

  static displayName = 'Slider'

  render(){
    let value = this.props.value
    function createLabel(props){
      let label = value
      if(props.label){
        label = props.label + '<em>' + value + '</em>'
      }
      return {__html: label}
    }

    let _labelStyle = labelStyle;
    let _rangeStyle = rangeStyle;

    if(typeof this.props.classLabel !== 'undefined'){
      _labelStyle = {};
    }
    if(typeof this.props.classRange !== 'undefined'){
      _rangeStyle = {};
    }

    return (
      <div>
        <label className={this.props.classLabel} htmlFor={this.props.id} style={_labelStyle} dangerouslySetInnerHTML={createLabel(this.props)} />
        <input
          className={this.props.classRange}
          style={_rangeStyle}
          onMouseUp={this.props.onMouseUp}
          onMouseDown={this.props.onMouseDown}
          id={this.props.id}
          onChange={this.props.onChange}
          type="range"
          value={value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
        />
      </div>
    )
  }
}

Slider.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  value: PropTypes.number,
  classLabel: PropTypes.string,
  classRange: PropTypes.string
}

export default Slider
