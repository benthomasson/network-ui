import React, { PureComponent } from 'react';

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

class StatusLight extends PureComponent {

  render() {
    return (
      <g>
        {this.props.working ?
            <path transform={"translate(" + (-this.props.width) + "," + (-this.props.height) + ") rotate(" + (this.props.frame/3) + ")"}
                  style={statusPathStyle} d={util.describeArc(0, 0, 10, 0, 270)}/>
        : null }
        {!this.props.working ?
        <circle cx={-this.props.width}
                cy={-this.props.height}
                r="10"
                style={this.props.status === null ? statusCircleStyle : this.props.status ? statusCircleStylePass : statusCircleStyleFail} />
        : null }
      </g>
    );
  }
}

export default StatusLight;
