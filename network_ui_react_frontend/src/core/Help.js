import React, { Component } from 'react';

import Colors from '../style/Colors';

class Upload extends Component {
  render() {
    var i = -1;
    function next_y () {
      i = i + 1;
      return 48 + i * 25;
    }
    var backgroundRectStyle = {
      fill: Colors.lightBackground,
      stroke: Colors.darkWidgetDetail
    };
    var titleRectStyle = {
      fill: Colors.widgetBody,
      stroke: Colors.darkWidgetDetail
    };
    var keyStyle = {
      fill: Colors.widgetBody,
      stroke: Colors.darkWidgetDetail
    };
    var keys = [];

    var key = null;
    var shortcut = null;
    var y = 0;
    for (var j = 0; j < this.props.shortcuts.length; j++) {
      key = this.props.shortcuts[j][0];
      shortcut = this.props.shortcuts[j][1];
      y = next_y();
      keys.push(<g>
                <rect x='-5' y={y-15} width='20' height='20' style={keyStyle} rx='3'/>
                <text x='5' y={y} textAnchor="middle">{key}</text>
                <text x='20' y={y}>{shortcut}</text>
                </g>);
    }
    return (
        this.props.showHelp ?
          <g transform={'translate(' + this.props.x + ',' + this.props.y + ')'}>
              <rect x='-20' y='0' width='200' height={y+20} style={backgroundRectStyle}/>
              <rect x='-20' y='0' width='200' height='28' style={titleRectStyle}/>
              <text x='0' y='20'>Keyboard shortcuts</text>
              {keys}
          </g>
      : null
    );
  }
}

export default Upload;
