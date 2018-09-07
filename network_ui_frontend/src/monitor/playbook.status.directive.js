/* Copyright (c) 2018 Red Hat, Inc. */

const templateUrl = require('~network-ui/monitor/playbook.status.partial.svg');

function playbookStatus () {
  return { restrict: 'A', templateUrl};
}
exports.playbookStatus = playbookStatus;
