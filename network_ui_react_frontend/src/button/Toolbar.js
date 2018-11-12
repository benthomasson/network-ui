import React, { PureComponent } from 'react';

import {textStyle, pathStyle, debugStyle} from '../style/Styles.js';
import Colors from '../style/Colors';
import ToolTip from '../core/ToolTip';


class Toolbar extends PureComponent {

  render() {
    return (
        <g style={{cursor: 'pointer'}}>
          {this.props.showDebug ?
          <rect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} style={debugStyle}/>
          : null}
          <g transform={"translate(" + (this.props.x + 5) + "," + (this.props.y + 5) + ") scale(0.8)"}>
          <circle cx='13' cy='13' r='20' style={{fill: Colors.toggleButtonBackground}} />
          <g transform={"scale(0.05)"}>
          <path style={{fill: Colors.lightBackground}} d="M507.73 109.1c-2.24-9.03-13.54-12.09-20.12-5.51l-74.36 74.36-67.88-11.31-11.31-67.88 74.36-74.36c6.62-6.62 3.43-17.9-5.66-20.16-47.38-11.74-99.55.91-136.58 37.93-39.64 39.64-50.55 97.1-34.05 147.2L18.74 402.76c-24.99 24.99-24.99 65.51 0 90.5 24.99 24.99 65.51 24.99 90.5 0l213.21-213.21c50.12 16.71 107.47 5.68 147.37-34.22 37.07-37.07 49.7-89.32 37.91-136.73zM64 472c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z" />
          </g>
          </g>
          <ToolTip {...this.props} text_width="70" tooltip={["Toggle", "Toolbar"]} />
        </g>
    );
  }
}

export default Toolbar;
