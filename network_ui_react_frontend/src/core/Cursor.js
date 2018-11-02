import React, { PureComponent } from 'react';

class Cursor extends PureComponent {

  render() {
    var debugStyle = {
      stroke: 'rgb(77,200,242)',
      fill: 'none'
    };
    return (
      <g transform={'translate(' + this.props.x + ',' + this.props.y + ')'}>
          <line x1="-15" y1="0" x2="15" y2="0" style={debugStyle} />
          <line x1="0" y1="-15" x2="0" y2="15" style={debugStyle} />
          {this.props.pressed ?
            <circle style={debugStyle} cx="0" cy="0" r="15" />
          : null}
      </g>
    );
  }
}

export default Cursor;
