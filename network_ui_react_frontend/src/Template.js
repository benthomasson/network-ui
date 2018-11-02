import React, { Component } from 'react';

class Template extends Component {

  shouldComponentUpdate () {
    return false;
  }

  render() {
    return (
      <g>
      </g>
    );
  }
}

export default Template;
