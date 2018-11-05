import React, { PureComponent } from 'react';

import Colors from '../style/Colors'

class Select extends PureComponent {

  render() {
    var textInputBoxStyle = {
      fill: Colors.lightBackground,
      stroke: Colors.dark,
      strokeWidth: 1
    };
    var selected1Style = {
      fill: Colors.lightBackground,
      stroke: Colors.selected1,
      strokeWidth: 3
    };
    var downArrowStyle = {
      fill: Colors.dark,
      stroke: Colors.dark
    };
    return (
      <g transform={"translate(" + this.props.x + "," + this.props.y + ")"}>
          <rect x="0" y="0" width={this.props.width} height={this.props.height} style={textInputBoxStyle} />
          <text x="10" y="20"> {this.props.label} </text>
          <g transform={"translate(" + (this.props.width - 20)  +",4)"}>
            <polygon points="0,15 -7,7, 7,7" style={downArrowStyle} />
          </g>
      </g>
    );
  }
}

export default Select;
