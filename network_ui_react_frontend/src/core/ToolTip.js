import React, { PureComponent } from 'react';

import {toolTipStyle, toolTipTextStyle} from '../style/Styles';

class ToolTip extends PureComponent {

  render() {
    var x_offset = this.props.x_offset !== undefined ? this.props.x_offset : 0;
    var lines = [];
    var line = null;
    for (var i = 0; i < this.props.tooltip.length; i++) {
      line = this.props.tooltip[i];
      lines.push(<text key={line} x={this.props.width/2} y={75 + i * 20} textAnchor="middle" style={toolTipTextStyle}> {line} </text>);
    }
    return (
        this.props.mouse_over ?
          <g transform={"translate(" + this.props.x + "," + this.props.y + ")"}>
          <g transform={"translate(" + this.props.width/2 +",40)"}>
            <polygon points="0,0 -10,10, 10,10" style={toolTipStyle} />
          </g>
          <g transform={"translate(" + x_offset + ",0)"}>
          <rect x={45 - this.props.text_width/2 - 25} y="50" width={this.props.text_width} height={20 * lines.length + 20} style={toolTipStyle} rx="2"/>
          {lines}
          </g>
          </g>
        : null
    );
  }
}

export default ToolTip;
