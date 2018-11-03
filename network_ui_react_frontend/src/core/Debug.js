import React, { Component } from 'react';

class Debug extends Component {

  shouldComponentUpdate () {
    return true;
  }

  render() {
    var debugStyle = {
      fill: 'rgb(77,200,242)',
      stroke: 'none'
    };
    var i = -1;
    function next_i () {
      i = i + 1;
      return 100 + i * 20;
    }
    if (this.props.showDebug) {
      return (
        <g>
          <text x={this.props.x} y={next_i()} style={debugStyle}>Page: ({this.props.frameWidth}, {this.props.frameHeight})</text>
          <text x={this.props.x} y={next_i()} style={debugStyle}>Cursor: ({this.props.cursorPosX}, {this.props.cursorPosY})</text>
          <text x={this.props.x} y={next_i()} style={debugStyle}>Scaled: ({this.props.scaledX}, {this.props.scaledY})</text>
          <text x={this.props.x} y={next_i()} style={debugStyle}>Mouse: ({this.props.mouseX}, {this.props.mouseY})</text>
          <text x={this.props.x} y={next_i()} style={debugStyle}>Pressed: ({this.props.pressedX}, {this.props.pressedY})</text>
          <text x={this.props.x} y={next_i()} style={debugStyle}>Pressed Scaled: ({this.props.pressedScaledX}, {this.props.pressedScaledY})</text>
          <text x={this.props.x} y={next_i()} style={debugStyle}>Pan: ({this.props.panX}, {this.props.panY}) </text>
          <text x={this.props.x} y={next_i()} style={debugStyle}>Scale: {this.props.current_scale} </text>
          <text x={this.props.x} y={next_i()} style={debugStyle}>Key: {this.props.lastKey} </text>
          <text x={this.props.x} y={next_i()} style={debugStyle}># Selected: {this.props.selected_items.length} </text>
          <text x={this.props.x} y={next_i()} style={debugStyle}>View: {this.props.view.state.name} </text>
          <text x={this.props.x} y={next_i()} style={debugStyle}>Move: {this.props.move.state.name} </text>
          <text x={this.props.x} y={next_i()} style={debugStyle}>Link: {this.props.link.state.name} </text>
          <text x={this.props.x} y={next_i()} style={debugStyle}>Group: {this.props.group.state.name} </text>
          <text x={this.props.x} y={next_i()} style={debugStyle}>Log: {this.props.log.state.name} </text>
          {process.env.REACT_APP_REPLAY === 'true' ?
          <text x={this.props.x} y={next_i()} style={debugStyle}>Repllay: {this.props.replay_events.length} </text>
            : null}
        </g>
      );
    } else {
      return null;
    }
  }
}

export default Debug;
