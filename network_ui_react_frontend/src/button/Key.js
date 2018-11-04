import React, { PureComponent } from 'react';

import {textStyle, pathStyle, debugStyle} from '../style/Styles.js';
import Colors from '../style/Colors';
import ToolTip from '../core/ToolTip';


class Key extends PureComponent {

  render() {
    return (
        <g style={{cursor: 'pointer'}}>
          {this.props.showDebug ?
          <rect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} style={debugStyle}/>
          : null}
          <g transform={"translate(" + (this.props.x + 5) + "," + (this.props.y + 5) + ")"}>
          <circle cx='13' cy='13' r='20' style={{fill: Colors.buttonBackground}} />
          <g transform={"scale(0.05)"}>
          <path style={{fill: Colors.lightBackground}} d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z" />
          </g>
          </g>
          <ToolTip {...this.props} text_width="100" tooltip={["Toggle", "Key"]} x_offset="-25"/>
        </g>
    );
  }
}

export default Key;
