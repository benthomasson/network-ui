import React, { PureComponent } from 'react';

class LaunchButton extends PureComponent {


  render() {
    return (
      <button onClick={this.props.action} disabled={!this.props.enabled}>Launch</button>
    );
  }
}

export default LaunchButton;
