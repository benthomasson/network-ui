import React, { Component } from 'react';

import Colors from '../style/Colors';

class Upload extends Component {
  render() {
    var quadrantStyle = {
      stroke: Colors['debugCopyNot'],
      strokeWidth: 1
    };
    return (
        this.props.showDebug ?
                <g>
                 <line x1="-100000"
                       y1="-1"
                       x2="100000"
                       y2="-1"
                       style={quadrantStyle} />
                 <line x1="-100000"
                       y1="1"
                       x2="100000"
                       y2="1"
                       style={quadrantStyle} />
                 <line x1="0"
                       y1="-100000"
                       x2="0"
                       y2="100000"
                       style={quadrantStyle} />
                </g>
      : null
    );
  }
}

export default Upload;
