import React, { Component } from 'react';

import Colors from '../style/Colors';
import util from '../util';

class Link extends Component {

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
                      "translate(0, -5)"}>
          {this.props.selected ?
          <text style={linkTextStyle}
                filter="url(#selected)"
                textAnchor="middle"
                fontSize="8"
                x="0"
                y="0"> {this.props.name}</text>
          :null}
          <text style={linkTextStyle}
                filter="url(#background)"
                textAnchor="middle"
                x="0" y="0">{this.props.name}{this.props.edit_label?'_':''}</text>
        </g>
        : null}

        {this.props.to_device !== null ?
        <g transform={"translate(" + this.props.from_device.x + "," + this.props.from_device.y + ")" +
                    "rotate(" + this.slope() + ")" +
                    "translate(" + (-this.props.from_interface.dot_d - 25) + ", 0)" +
                    "rotate(" + -this.slope() + ")"}>
          {this.props.from_interface.selected ?
          <text style={interfaceTextStyle}
                filter="url(#selected)"
                textAnchor="middle"
                fontSize="8"
                x="0"
                y="0"> {this.props.from_interface.name}</text>
          : null}

          <text style={interfaceTextStyle}
                filter={this.props.from_interface.selected ? "" : "url(#background)"}
                textAnchor="middle"
                x="0" y="0">{this.props.from_interface.name}{this.props.from_interface.edit_label ? '_': ''}</text>
        </g>
        : null}

        {this.props.to_device !== null ?
        <g transform={"translate(" + this.props.from_device.x + "," + this.props.from_device.y + ")" +
                      "rotate(" + this.slope() + ")" +
                      "translate(" + (-this.length() + this.props.to_interface.dot_d + 25) + ", 0)" +
                      "rotate(" + -this.slope() + ")"}>
        {this.props.to_interface.selected ?
          <text style={interfaceTextStyle}
              filter="url(#selected)"
              textAnchor="middle"
              x="0"
              y="0"> {this.props.to_interface.name}</text>
        : null}
        <text style={interfaceTextStyle}
              filter={this.props.to_interface.selected ? "" : "url(#background)"}
              textAnchor="middle"
              x="0" y="0">{this.props.to_interface.name}{this.props.to_interface.edit_label?'_':''}</text>
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

