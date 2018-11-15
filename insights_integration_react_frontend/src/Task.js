import React, { PureComponent } from 'react';

class Task extends PureComponent {

  render() {
    return (
      <div>
      {this.props.name} {this.props.status}
      </div>
    );
  }
}

export default Task;
