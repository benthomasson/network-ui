import React, { PureComponent } from 'react';

import {statusCircleStyle,
        statusCircleStylePass,
        statusCircleStyleFail,
        statusPathStyle,
        } from '../style/Styles.js';

import util from '../util'

class TaskStatus extends PureComponent {

  render() {
    var last7 = this.props.tasks.toArray().slice(-7);
	  var tasks = [];
    for (var i = 0; i < last7.length; i++) {
      var item = last7[i];
      tasks.push(
        <g key={item.id.toString()}>
          {item.working ?
              <path transform={"translate(" + (i * 12 + 17) + "," + (-5) + ") rotate(" + (this.props.frame/3) + ")"}
                  style={statusPathStyle} d={util.describeArc(0, 0, 10, 0, 270)}/>
          : null}
          {!item.working ?
          <circle cx={i * 12 + 17}
                  cy="-5"
                  r="5"
                  style={this.props.status === null ? statusCircleStyle : this.props.status ? statusCircleStylePass : statusCircleStyleFail} />
          : null}
      </g>);
    }
    return (
      <g transform={"translate(" + (-this.props.width) + "," + (-this.props.height) + ")"}>
      {tasks}
			</g>
    );
  }
}

export default TaskStatus;
