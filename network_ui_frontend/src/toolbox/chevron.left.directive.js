/* Copyright (c) 2017 Red Hat, Inc. */

const templateUrl = require('~network-ui/toolbox/chevron_left.partial.svg');

function chevronLeft () {
  return {
      restrict: 'A',
      templateUrl,
      scope: {
          actionIcon: '='
      }
  };
}
exports.chevronLeft = chevronLeft;
