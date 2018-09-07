/* Copyright (c) 2017 Red Hat, Inc. */

const templateUrl = require('~network-ui/toolbox/chevron_right.partial.svg');

function chevronRight () {
  return {
      restrict: 'A',
      templateUrl,
      scope: {
          actionIcon: '='
      }
  };
}
exports.chevronRight = chevronRight;
