import React, { Component } from 'react';

import Colors from '../style/Colors';

class LogPane extends Component {
  render() {

    var logPaneTextStyle = {
      fill: Colors.logText
    };


    var logPaneStyle = {
      fill: Colors.lightBackground,
      stroke: Colors.darkWidgetDetail
    };

    var lines = [];

    if (this.props.target !== null) {
      for (var i = 0; i < this.props.target.log.length; i++) {
        var line = this.props.target.log[i];
        lines.push(<text key={"logPaneText " + i} style={logPaneTextStyle} transform={"translate(0, " + (i * 20 + this.props.log_offset) + ")"}>{line}</text>);
      }
    }
    return (
      <g clipPath="url(#log-pane-clip-path)">
        {!this.props.hidden ?
        <g>
        <rect x={this.props.x}
              y={this.props.y}
              width={this.props.width}
              height={this.props.height}
              style={logPaneStyle}></rect>
        <g transform={"translate(" + (this.props.x + 10) + "," + (this.props.y + 15) + ")"}>
        {lines}
        </g>
        </g>
        : null}
      </g>
    );
  }
}

export default LogPane;
