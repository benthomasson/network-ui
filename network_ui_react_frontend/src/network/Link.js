import React, { Component } from 'react';

import Colors from '../style/Colors';
import util from '../util';
import TextInput from '../text/TextInput';

class Link extends Component {

  shouldComponentUpdate () {
    return false;
  }


  length () {
      //Return the length of this link.
      var x1 = this.props.from_device.x;
      var y1 = this.props.from_device.y;
      var x2 = this.props.to_device.x;
      var y2 = this.props.to_device.y;
      return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
  }

  slope () {
      //Return the slope in degrees for this link.
      var x1 = this.props.from_device.x;
      var y1 = this.props.from_device.y;
      var x2 = this.props.to_device.x;
      var y2 = this.props.to_device.y;
      return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 180;
  }

  plength () {
      //Return the length of the link.
      var x = this.props.scaledX;
      var y = this.props.scaledY;
      var x1 = this.props.from_device.x;
      var y1 = this.props.from_device.y;
      var x2 = this.props.to_device.x;
      var y2 = this.props.to_device.y;
      return util.pDistance(x, y, x1, y1, x2, y2);
  }
  pDistanceLine () {

      var x = this.props.scaledX;
      var y = this.props.scaledY;
      var x1 = this.props.from_device.x;
      var y1 = this.props.from_device.y;
      var x2 = this.props.to_device.x;
      var y2 = this.props.to_device.y;
      return util.pDistanceLine(x, y, x1, y1, x2, y2);
  };

  render() {
    var networkLinkSelectedStyle = {
      stroke: Colors['selectedBlue'],
      strokeWidth: 6
    };
    var networkLinkStyle = {
      stroke: Colors['link'],
      strokeWidth: 2
    };
    var linkDebugStyle = {
      stroke: Colors['debugCopyNot'],
      strokeWidth: 1
    };
    var circleDebugStyle = {
      fill: Colors['debugCopyNot']
    };
    var interfaceSelectedStyle = {
      fill: Colors['selectedBlue'],
    };
    var interfaceStyle = {
      fill: Colors['buttonOutline']
    };
    var interfaceTextStyle = {
      fill: Colors['buttonText'],
      fontSize: '8px'
    };
    var linkTextStyle = {
      fill: Colors['buttonText'],
      fontSize: '8px'
    };
    return (
      <g>
        {this.props.selected ?
        <line x1={this.props.from_device.x}
              y1={this.props.from_device.y}
              x2={this.props.to_device !== null ? this.props.to_device.x : this.props.scaledX}
              y2={this.props.to_device !== null ? this.props.to_device.y : this.props.scaledY}
              style={networkLinkSelectedStyle} />
        : null}
        <line x1={this.props.from_device.x}
              y1={this.props.from_device.y}
              x2={this.props.to_device !== null ? this.props.to_device.x : this.props.scaledX}
              y2={this.props.to_device !== null ? this.props.to_device.y : this.props.scaledY}
              style={networkLinkStyle} />
        {this.props.showDebug ?
          <g>
          {this.props.to_device !== null && this.plength() < 100 ?
          <line
              x1={this.pDistanceLine().x2}
              y1={this.pDistanceLine().y2}
              x2={this.props.scaledX}
              y2={this.props.scaledY}
              style={linkDebugStyle} />
          : null}
          {this.props.to_device !== null ?
          <g>
          <g transform={"translate(" + this.props.to_device.x + "," + this.props.to_device.y + ")" +
                        "rotate(" + this.slope() + ")" +
                        "translate(" + this.length()/2 + ", 0)"}>
          <circle cx="0"
                  cy="0"
                  r="10"
                  style={circleDebugStyle}> </circle>
          </g>
          <g transform={"translate(" + this.props.to_device.x + "," + this.props.to_device.y + ")" +
                        "rotate(" + this.slope() + ")" +
                        "translate(" + this.length()/2 + ", 0)"}>
          <line x1="0" y1="-20"  x2="0" y2="20" style={linkDebugStyle}/>
          </g>
          <g transform={"translate(" + this.props.to_device.x + "," + this.props.to_device.y + ")" +
                        "rotate(" + this.slope() + ")" +
                        "translate(" + this.props.to_device.size + ", 0)"}>
          <circle cx="0"
                  cy="0"
                  r="10"
                  style={circleDebugStyle}> </circle>
          </g>
          <g transform={"translate(" + this.props.from_device.x + "," + this.props.from_device.y + ")" +
                        "rotate(" + this.slope() + ")" +
                        "translate(" + (-this.props.from_device.size) + ", 0)"}>
          <circle cx="0"
                  cy="0"
                  r="10"
                  style={circleDebugStyle}></circle>
          </g>
        </g>
        : null}
        </g>

        : null}
        {this.props.to_device !== null ?
        <g transform={"translate(" + this.props.to_device.x + "," + this.props.to_device.y + ")" +
                      "rotate(" + this.slope() + ")" +
                      "translate(" + this.props.to_device.size + ", 0)" +
                      "rotate(180)" +
                      "translate(-19, -9)" }>
        </g>
        : null}

        <g>

        {this.props.to_device !== null ?
        <g transform={"translate(" + this.props.from_device.x + "," + this.props.from_device.y + ")" +
                      "rotate(" + this.slope() + ")" +
                      "translate(" + -this.length()/2 + ", 0)" +
                      "rotate(" + -this.slope() + ")" +
                      "translate(0, -5) scale(0.75)"}>
          <TextInput x="0" y="0"
                     value={this.props.name}
                     selected={this.props.selected}
                     width={this.props.text_width} height={20}
                     show_cursor={this.props.edit_label}
                     edit={this.props.edit_label}
                     id={'Link_' + this.props.id}
                     cursor_pos={this.props.cursor_pos}
                     blink={this.props.blink}
                     />
        </g>
        : null}

        {this.props.to_device !== null ?
        <g transform={"translate(" + this.props.from_device.x + "," + this.props.from_device.y + ")" +
                    "rotate(" + this.slope() + ")" +
                    "translate(" + (-this.props.from_interface.dot_d - 25) + ", 0)" +
                    "rotate(" + -this.slope() + ") scale(0.5)"}>
          <TextInput x="0" y="0"
                     value={this.props.from_interface.name}
                     selected={this.props.from_interface.selected}
                     width={this.props.from_interface.text_width} height={20}
                     show_cursor={this.props.from_interface.edit_label}
                     edit={this.props.from_interface.edit_label}
                     id={'Interface_' + this.props.from_interface.id}
                     cursor_pos={this.props.from_interface.cursor_pos}
                     blink={this.props.blink}
                     />
        </g>
        : null}

        {this.props.to_device !== null ?
        <g transform={"translate(" + this.props.from_device.x + "," + this.props.from_device.y + ")" +
                      "rotate(" + this.slope() + ")" +
                      "translate(" + (-this.length() + this.props.to_interface.dot_d + 25) + ", 0)" +
                      "rotate(" + -this.slope() + ") scale(0.5)"}>
          <TextInput x="0" y="0"
                     value={this.props.to_interface.name}
                     selected={this.props.to_interface.selected}
                     width={this.props.to_interface.text_width} height={20}
                     show_cursor={this.props.to_interface.edit_label}
                     edit={this.props.to_interface.edit_label}
                     id={'Interface_' + this.props.to_interface.id}
                     cursor_pos={this.props.to_interface.cursor_pos}
                     blink={this.props.blink}
                     />
        </g>
        : null}
        {this.props.to_device !== null ?
        <g>
          {this.props.from_interface.selected ?
          <circle cx={this.props.from_interface.dot_x}
                  cy={this.props.from_interface.dot_y}
                  r="14"
                  style={interfaceSelectedStyle}></circle>
          : null}
          <circle cx={this.props.from_interface.dot_x}
                  cy={this.props.from_interface.dot_y}
                  r="10"
                  style={interfaceStyle}></circle>
          {this.props.to_interface.selected ?
          <circle cx={this.props.to_interface.dot_x}
                  cy={this.props.to_interface.dot_y}
                  r="14"
                  style={interfaceSelectedStyle}></circle>
          : null}
          <circle cx={this.props.to_interface.dot_x}
                  cy={this.props.to_interface.dot_y}
                  r="10"
                  style={interfaceStyle}></circle>
        </g>
        : null}
        </g>
      </g>
    );
  }
}

export default Link;

