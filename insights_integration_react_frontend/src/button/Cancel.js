import React, { PureComponent } from 'react';

class CancelButton extends PureComponent {

  render() {
    return (
      <button onClick={this.props.action}>Cancel</button>
    );
  }
}

export default CancelButton;
