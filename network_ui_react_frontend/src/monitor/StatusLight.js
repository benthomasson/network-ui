import React, { Component } from 'react';

import util from '../util'

class Template extends Component {
  render() {
    var statusPathStyle = {
    };
    var statusCircleStyle = {
    };
    return (
      <g>
        {this.props.working ?
            <path transform={"translate(" + (-this.props.item.width) + "," + (-this.props.item.height) + ") rotate(" + (this.props.frame/3) + ")"}
                  style={statusPathStyle} d={util.describeArc(0, 0, 10, 0, 270)}/>
        : null }
        {!this.props.working ?
        <circle cx={-this.props.item.width}
                cy={-this.props.item.height}
                r="10"
                style={statusCircleStyle}>
        </circle>
        : null }
      </g>
    );
  }
}

export default Template;
