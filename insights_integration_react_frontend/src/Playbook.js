import React, { PureComponent } from 'react';

class Playbook extends PureComponent {

  render() {
    return (
      <div>
      <div>{this.props.name}</div>
      <pre>{this.props.contents}</pre>
      </div>
    );
  }
}

export default Playbook;
