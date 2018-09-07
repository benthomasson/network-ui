
const templateUrl = require('~network-ui/monitor/task.status.partial.svg');

function taskStatus () {
  return { restrict: 'A', templateUrl};
}
exports.taskStatus = taskStatus;
