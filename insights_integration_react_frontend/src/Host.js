import React, { Component } from 'react';
import Task from './Task.js';

class Host extends Component {

  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  render() {
    var tasks = [];
    for (var i = 0; i < this.props.tasks.length; i++) {
      var task = this.props.tasks[i];
      tasks.push(<Task {...task} key={task.task_result_id} />);
    }
    return (
      <li> {this.props.name} <ul>{tasks}</ul>
      </li>
    );
  }
}

export default Host;
