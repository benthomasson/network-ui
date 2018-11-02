import React, { Component } from 'react';

import Colors from '../style/Colors';

class Upload extends Component {
  render() {
    var i = -1;
    function next_y () {
      i = i + 1;
      return 48 + i * 30;
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
      fill: Colors.key,
      stroke: Colors.key
    };
    var textStyle = {
      fill: Colors.helpText
    };
    var keyTextStyle = {
      fill: Colors.keyText
    };
    var keyTitleStyle = {
      fill: Colors.keyTitle
    };
    var keys = [];

    var key = null;
    var shortcut = null;
    var y = 0;
    for (var j = 0; j < this.props.shortcuts.length; j++) {
      key = this.props.shortcuts[j][0];
      shortcut = this.props.shortcuts[j][1];
      y = next_y();
      keys.push(<g key={'Help' + j}>
                <circle cx='5' cy={y-5} r='11' style={keyStyle}/>
                <text x='5' y={y} textAnchor="middle" style={keyTextStyle}>{key}</text>
                <text x='20' y={y} style={textStyle}>{shortcut}</text>
                </g>);
    }
    return (
        this.props.showHelp ?
          <g transform={'translate(' + this.props.x + ',' + (this.props.y - this.props.y_offset) + ')'}>
              <rect x='-20' y='-5' width='200' height={y+30} style={backgroundRectStyle} rx='5'/>
              <text x='-5' y='20' style={keyTitleStyle} >Key</text>
              {keys}
          </g>
      : null
    );
  }
}

export default Upload;
