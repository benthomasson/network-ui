import React, { PureComponent } from 'react';

import Colors from '../style/Colors'
import {debugRectStyle} from '../style/Styles';


class TextInput extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {blink: false}
    this.props.scope.text_components.set(this.props.object, this);
  }

  render() {
    var showDebug = this.props.showDebug !== undefined ? this.props.showDebug : false;
    var textAnchor = this.props.textAnchor !== undefined ? this.props.textAnchor : 'middle';
    var textInputBoxStyle = {
      fill: 'none',
      stroke: Colors['dark'],
      strokeWidth: 1
    };
    var selected1Style = {
      fill: 'none',
      stroke: Colors['selected1'],
      strokeWidth: 3
    };
    var selected2Style = {
      fill: 'none',
      stroke: Colors['selected2'],
      strokeWidth: 6
    };
    var textSelectedStyle = {
      fill: Colors['selected'],
      stroke: 'none'
    };
    var textBackgroundtyle = {
      fill: Colors.lightBackground,
      stroke: 'none'
    };
    var cursorStyle = {
      fill: 'none',
      stroke: Colors['dark'],
      strokeWidth: 1
    };
    var textInputStyle = {
      fill: Colors['dark'],
      stroke: 'none'
    };
    var x_offset = textAnchor === 'left' ? 5 : this.props.width/2;
    return (
      <g transform={'translate(' + (this.props.x) + ',' + (this.props.y - 15) + ')'}>
      {showDebug ?
          <rect x={-x_offset} y='0'
                width={this.props.width} height='20'
                style={debugRectStyle}>
          </rect>
        : null}
      {(!this.props.text_selected && this.props.width !== null && this.props.value !== "") ?
          <rect x={-x_offset + 2} y='2'
                width={this.props.cursor_pos} height='16'
                style={textBackgroundtyle}>
          </rect>
        : null}
      {(this.props.selected && this.props.width !== null) ?
          <rect x={-x_offset} y='0'
                width={this.props.width} height='20'
                style={textInputBoxStyle}
                rx='2'>
          </rect>
        : null}
      {(this.props.edit && this.props.width !== null) ?
        <g>
          <rect x={-x_offset} y='0'
                width={this.props.width} height='20'
                style={selected2Style}
                rx='2'>
          </rect>
          <rect x={-x_offset} y='0'
                width={this.props.width} height='20'
                style={selected1Style}
                rx='2'>
          </rect>
        </g>
        : null}
      {(this.props.text_selected && this.props.width !== null) ?
          <rect x={-x_offset + 2} y='2'
                width={this.props.cursor_pos} height='16'
                style={textSelectedStyle}>
          </rect>
        : null}
      {(this.props.show_cursor && this.props.width !== null && !this.state.blink) ?
          <line x1={this.props.cursor_pos - x_offset} x2={this.props.cursor_pos - x_offset}
                y1='2' y2='18'
                style={cursorStyle}>
          </line>
        : null }
        <text textAnchor={textAnchor} id={'text_' + this.props.id}
              x='0' y='15'
              style={textInputStyle}>{this.props.value}</text>
      </g>
    );
  }
}

export default TextInput;
