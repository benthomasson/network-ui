import React, { PureComponent } from 'react';

import {logStyle} from './style/Styles.js';

class Log extends PureComponent {

  render() {
    var lines = [];
    for (var i = 0; i < this.props.lines.length; i++) {
      var line = this.props.lines[i];
      lines.push(line.value);
    }
    return (
        <div>
        <pre style={logStyle}>
        {lines.join('\n\n')}
        </pre>
        </div>
    );
  }
}

export default Log;
