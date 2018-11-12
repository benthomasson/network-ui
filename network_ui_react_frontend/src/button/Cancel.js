import React, { PureComponent } from 'react';

import {textStyle, pathStyle, debugStyle} from '../style/Styles.js';
import Colors from '../style/Colors';
import ToolTip from '../core/ToolTip';


class Launch extends PureComponent {

  render() {
    return (
        <g style={{cursor: 'pointer'}}>
          {this.props.showDebug ?
          <rect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} style={debugStyle}/>
          : null}
          <g transform={"translate(" + (this.props.x + 5) + "," + (this.props.y + 5) + ") scale(0.8)"}>
          <circle cx='13' cy='13' r='20' style={{fill: Colors.lightBackground}} />
          <g transform={"translate(-3,-3) scale(0.065)"}>
          <path style={pathStyle} d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"/>
          </g>
          </g>
          <ToolTip {...this.props} text_width="70" tooltip={["Cancel"]}/>
        </g>
    );
  }
}

export default Launch;
