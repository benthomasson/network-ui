import React, { Component } from 'react';

import {debugLineStyle,
        debugRectStyle,
        constructionLineStyle,
        deviceStyle,
        deviceTextStyle,
        statusCircleStyle,
        statusCircleStylePass,
        statusCircleStyleFail,
        statusPathStyle,
        statusTextStyle
        } from '../style/Styles.js';

import util from '../util'

class Template extends Component {
  render() {
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
                style={this.props.item.status === null ? statusCircleStyle : this.props.item.status ? statusCircleStylePass : statusCircleStyleFail} />
        : null }
      </g>
    );
  }
}

export default Template;
