/* Copyright (c) 2017 Red Hat, Inc. */

const templateUrl = require('~network-ui/network/switch.partial.svg');

function switchd () {
  return { restrict: 'A', templateUrl};
}
exports.switchd = switchd;
