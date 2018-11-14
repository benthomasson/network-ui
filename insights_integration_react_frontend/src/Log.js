import React, { PureComponent } from 'react';

class Log extends PureComponent {

  render() {
    var lines = [];
    for (var i = 0; i < this.props.lines.length; i++) {
      var line = this.props.lines[i];
      lines.push(<pre key={i}>{line.value}</pre>);
    }
    return (
        <div>
        {lines}
        </div>
    );
  }
}

export default Log;
