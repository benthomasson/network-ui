import React, { Component } from 'react';

import Colors from '../style/Colors';

class Key extends Component {
  render() {

    var keyStyle = {
      fill: Colors['darkWidgetDetail'],
      fontSize: "40px",
      fontFamily: "sans-serif"
    };
    return (
      <g>
        <text x={this.props.x} y={this.props.y} textAnchor="middle" style={keyStyle}>{this.props.lastKey}</text>
      </g>
    );
  }
}

export default Key;

