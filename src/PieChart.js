import React, { Component } from 'react';
import './App.css';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import * as d3 from 'd3'

function translate(x, y) {
  return `translate(${x}, ${y})`;
}

class Slice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isHovered: false};
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseOver() {
    this.setState({isHovered: true});
  }

  onMouseOut() {
    this.setState({isHovered: false});
  }

  render() {
    let {value, label, fill, innerRadius = 0, outerRadius, cornerRadius, padAngle, ...props} = this.props;
    if (this.state.isHovered) {
      outerRadius *= 1.1;
    }
    let arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(cornerRadius)
      .padAngle(padAngle);
    return (
      <g onMouseOver={this.onMouseOver}
         onMouseOut={this.onMouseOut}
         {...props}>
        <path d={arc(value)} fill={fill} />
        <text transform={translate(...arc.centroid(value))}
              dy=".35em"
              className="label">
          {label}
        </text>
      </g>
    );
  }
}

class Pie extends React.Component {
  constructor(props) {
    super(props);
    this.colorScale = scaleLinear.category10();
    this.renderSlice = this.renderSlice.bind(this);
  }

  render() {
    let {x, y, data} = this.props;
    let pie = d3.layout.pie();
    return (
      <g transform={translate(x, y)}>
        {pie(data).map(this.renderSlice)}
      </g>
    );
  }

  renderSlice(value, i) {
    let {innerRadius, outerRadius, cornerRadius, padAngle} = this.props;
    return (
      <Slice key={i}
             innerRadius={innerRadius}
             outerRadius={outerRadius}
             cornerRadius={cornerRadius}
             padAngle={padAngle}
             value={value}
             label={value.data}
             fill={this.colorScale(i)} />
    );
  }
}

class PieChart extends React.Component {
  render() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let minViewportSize = Math.min(width, height);
    let radius = (minViewportSize * .9) / 2;
    let x = width / 2;
    let y = height / 2;

    return (
      <svg width="100%" height="100%">
        <Pie x={x}
             y={y}
             innerRadius={radius * .35}
             outerRadius={radius}
             cornerRadius={7}
             padAngle={.02}
             data={this.props.data} />
      </svg>
    );
  }
}
export default PieChart;