import React, { PureComponent } from 'react';

import Colors from '../style/Colors';

class Header extends PureComponent {

  render() {
    var headerStyle = {
      fill: Colors.header,
      stroke: Colors.headerLine
    };
    return (
      <g>
        <rect x='-1' y='-1' width={this.props.width + 2} height='51' style={headerStyle} />
      </g>
    );
  }
}

export default Header;
