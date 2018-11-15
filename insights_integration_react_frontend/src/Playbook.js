import React, { PureComponent } from 'react';

import {playbookStyle, blockStyle, headerStyle} from './style/Styles.js';

class Playbook extends PureComponent {

  render() {
    return (
      <div style={blockStyle}>
      <div style={headerStyle}>Playbook: {this.props.name}</div>
      <pre style={playbookStyle}>{this.props.contents}</pre>
      </div>
    );
  }
}

export default Playbook;
