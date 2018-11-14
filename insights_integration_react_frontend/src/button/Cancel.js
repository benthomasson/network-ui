import React, { PureComponent } from 'react';

class CancelButton extends PureComponent {

  render() {
    return (
      <button onClick={this.props.action} disabled={!this.props.enabled}>Cancel</button>
    );
  }
}

export default CancelButton;
