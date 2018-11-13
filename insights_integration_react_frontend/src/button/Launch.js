import React, { PureComponent } from 'react';

class LaunchButton extends PureComponent {


  render() {
    return (
      <button onClick={this.props.action}>Launch</button>
    );
  }
}

export default LaunchButton;
