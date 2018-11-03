import React, { PureComponent } from 'react';

import Colors from '../style/Colors';

class LogPane extends PureComponent {

  render() {

    var logPaneTextStyle = {
      fill: Colors.logText,
      fontFamily: 'monospace'
    };


    var logPaneStyle = {
      fill: Colors.lightBackground,
      stroke: Colors.darkWidgetDetail
    };

    var lines = [];

    var log = this.props.log.toArray();

    for (var i = 0; i < log.length; i++) {
      var line = log[i];
      lines.push(<text key={i.toString()} style={logPaneTextStyle} transform={"translate(0, " + (i * 20 + this.props.log_offset) + ")"}>{line}</text>);
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
