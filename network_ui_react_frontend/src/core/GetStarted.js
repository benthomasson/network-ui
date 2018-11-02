import React, { PureComponent } from 'react';

import Colors from '../style/Colors';

class GetStarted extends PureComponent {

  render() {
    var textStyle = {
      fill: Colors.key
    };
    return (
      <g transform={'translate(' + this.props.x + ',' + this.props.y + ')'}>
          <text textAnchor='middle' style={textStyle}>Please start by dragging or adding</text>
          <text y='20' textAnchor='middle' style={textStyle}>an object to the canvas.</text>
      </g>
    );
  }
}

export default GetStarted;
