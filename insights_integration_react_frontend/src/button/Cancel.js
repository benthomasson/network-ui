import React, { PureComponent } from 'react';

class CancelButton extends PureComponent {

  cancel (e) {
    console.log('cancel');
    console.log(e);
  }

  render() {
    return (
      <button onClick={this.cancel}>Cancel</button>
    );
  }
}

export default CancelButton;
