import React, { PureComponent } from 'react';

import Colors from '../style/Colors';
import Spinner from '../core/Spinner';

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

class PlaybookStatus extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {frame_number: 0}
    this.props.scope.playbook_status = this;
  }

  render() {

    var playbooks = [];

    var last7 = this.props.playbooks.slice(-7);

    for (var i = 0; i < last7.length; i++) {
      var item = last7[i];
      playbooks.push(
        <g key={item.id.toString()}>
        {item.working ?
            <Spinner x="0" y={i*24} frame_number={this.state.frame_number}/>
        : null}
        {!item.working ?
        <circle cx="0"
                cy={i * 24}
                r="10"
                style={item.status === null ? statusCircleStyle : item.status ? statusCircleStylePass : statusCircleStyleFail} />
        :null}
        <text style={statusTextStyle} dy=".4em" transform={"translate(15, " + (i * 24) + ")"}>{item.name}</text>
        </g>
      );
    }
    return (
      <g>
        <g transform={"translate(" + this.props.x + "," + this.props.y + ")"}>

        {playbooks}

        {this.props.showDebug ?
        <rect x="0"
              y="0"
              width={this.props.width}
              height={this.props.height}
              style={debugRectStyle} />
        :null}
        </g>
      </g>
    );
  }
}

export default PlaybookStatus;
