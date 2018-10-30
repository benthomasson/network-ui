import React, { Component } from 'react';

import Colors from '../style/Colors';

class Header extends Component {
  render() {
    var headerStyle = {
      fill: Colors.header,
      stroke: Colors.headerLine
    };
    return (
      <g>
        <rect x='-1' y='-1' width={this.props.width + 1} height='51' style={headerStyle} />
      </g>
    );
  }
}

export default Header;
