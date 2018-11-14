import React, { PureComponent } from 'react';

class Host extends PureComponent {

  render() {
    return (
      <div> {this.props.name} </div>
    );
  }
}

export default Host;
