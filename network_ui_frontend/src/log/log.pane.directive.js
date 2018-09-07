/* Copyright (c) 2018 Red Hat, Inc. */

const templateUrl = require('~network-ui/log/log.pane.partial.svg');

function logPane () {
  return { restrict: 'A', templateUrl};
}
exports.logPane = logPane;
