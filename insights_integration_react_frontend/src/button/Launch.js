import React, { PureComponent } from 'react';

class LaunchButton extends PureComponent {

  constructor(props) {
    super(props);
    this.launch = this.launch.bind(this);
  }

  launch (e) {
    console.log('launch');
    console.log(e);
    console.log(this.props.controller.server);
  }

  render() {
    return (
      <button onClick={this.launch}>Launch</button>
    );
  }
}

export default LaunchButton;
