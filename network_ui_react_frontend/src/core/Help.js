import React, { Component } from 'react';

class Upload extends Component {
  render() {
    var i = -1;
    function next_i () {
      i = i + 1;
      return 20 + i * 20;
    }
    return (
        this.props.showHelp ?
          <g transform={'translate(' + this.props.x + ',' + this.props.y + ')'}>
              <text x='0' y={next_i()}>Hot Keys:</text>
              <text x='0' y={next_i()}>0 - Reset scale and pan</text>
              <text x='0' y={next_i()}>h - Toggle help</text>
              <text x='0' y={next_i()}>d - Toggle debug</text>
              <text x='0' y={next_i()}>p - Toggle pointer</text>
              <text x='0' y={next_i()}>b - Toggle buttons</text>
          </g>
      : null
    );
  }
}

export default Upload;
