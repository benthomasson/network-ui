import React, { PureComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Task extends PureComponent {

  render() {
    return (
      <li>
      {this.props.name} {this.props.status === "ok" ?  <FontAwesomeIcon style={{color: '#5cb85c'}} icon="check" /> : <FontAwesomeIcon style={{color: '#d9534f'}} icon="times" />}
      </li>
    );
  }
}

export default Task;
