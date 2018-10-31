import React, { Component } from 'react';

import Colors from '../style/Colors';

import {debugLineStyle,
        debugRectStyle,
        constructionLineStyle,
        deviceStyle,
        deviceTextStyle
        } from '../style/Styles.js';

import util from '../util'

class PlaybookStatus extends Component {
  render() {

    var playbooks = [];

    var last7 = this.props.playbooks.slice(-7);

    var debugStyle = {
    };

    var statusCircleStyle = {
      fill: Colors.widgetBody,
      stroke: Colors.darkWidgetDetail,
      strokeWidth: 2
    };

    var statusCircleStylePass = Object.assign({}, statusCircleStyle);
    var statusCircleStyleFail = Object.assign({}, statusCircleStyle);
    statusCircleStylePass.fill = Colors.pass;
    statusCircleStyleFail.fill = Colors.fail;

    var statusPathStyle = {
      fill: 'none',
      stroke: Colors.darkWidgetDetail,
      strokeWidth: 2
    };

    var statusTextStyle = {
      fill: Colors.statusText
    }

    for (var i = 0; i < last7.length; i++) {
      var item = last7[i];
      playbooks.push(
        <g key={"play_status " + i}>
        {item.working ?
            <path transform={"translate(0," + (i * 24) + ") rotate(" + (this.props.frame  * 5) + ")"} style={statusPathStyle} d={util.describeArc(0, 0, 10, 0, 270)}/>
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
