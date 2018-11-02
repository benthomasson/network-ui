import React, { PureComponent } from 'react';

import {textStyle, pathStyle, debugStyle} from '../style/Styles.js';
import Colors from '../style/Colors';


class Download extends PureComponent {

  render() {
    return (
        <g style={{cursor: 'pointer'}}>
          {this.props.showDebug ?
          <rect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} style={debugStyle}/>
          : null}
          <g transform={"translate(" + (this.props.x + 5) + "," + (this.props.y + 5) + ")"}>
          <circle cx='13' cy='13' r='20' style={{fill: Colors.lightBackground}} />
          <g transform={"scale(0.015)"}>
          <path  style={pathStyle} d="M1344 1344q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h465l135 136q58 56 136 56t136-56l136-136h464q40 0 68 28t28 68zm-325-569q17 41-14 70l-448 448q-18 19-45 19t-45-19l-448-448q-31-29-14-70 17-39 59-39h256v-448q0-26 19-45t45-19h256q26 0 45 19t19 45v448h256q42 0 59 39z"/>
          </g>
          </g>
        </g>
    );
  }
}

export default Download;
