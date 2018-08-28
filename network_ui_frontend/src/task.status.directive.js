
const templateUrl = require('~network-ui/task.status.partial.svg');

function taskStatus () {
  return { restrict: 'A', templateUrl};
}
exports.taskStatus = taskStatus;
