/* Copyright (c) 2017 Red Hat, Inc. */

//import atFeaturesNetworking from './network-nav/main';
//import networkDetailsDirective from './network-details/main';
//import networkZoomWidget from './zoom-widget/main';

//console.log = function () { };
var angular = require('angular');
var NetworkUIController = require('./network.ui.controller.js');
var cursor = require('./core/cursor.directive.js');
var router = require('./network/router.directive.js');
var switchd = require('./network/switch.directive.js');
var host = require('./network/host.directive.js');
var link = require('./network/link.directive.js');
var stream = require('./application/stream.directive.js');
var rack = require('./network/rack.directive.js');
var rackIcon = require('./network/rack.icon.directive.js');
var group = require('./network/group.directive.js');
var site = require('./network/site.directive.js');
var siteIcon = require('./network/site.icon.directive.js');
var taskStatus = require('./monitor/task.status.directive.js');
var statusLight = require('./monitor/status.light.directive.js');
var playbookStatus = require('./monitor/playbook.status.directive.js');
var logPane = require('./log/log.pane.directive.js');
var chevronRight = require('./toolbox/chevron.right.directive.js');
var chevronLeft = require('./toolbox/chevron.left.directive.js');
var contextMenu = require('./menu/context.menu.directive.js');
var contextMenuButton = require('./menu/context.menu.button.directive.js');
var process = require('./application/process.directive.js');
var map = require('./network/map.directive.js');
var deviceDetail = require('./network/device.detail.directive.js');
var defaultd = require('./network/default.directive.js');
var quadrants = require('./core/quadrants.directive.js');
var button = require('./button/button.directive.js');
var inventoryToolbox = require('./toolbox/inventory.toolbox.directive.js');
var debug = require('./core/debug.directive.js');
var test_results = require('./test/test_results.directive.js');
var awxNetworkUI = require('./network/network.ui.directive.js');

var networkUI = angular.module('networkUI', [
        'monospaced.mousewheel',
        //atFeaturesNetworking,
        //networkDetailsDirective.name,
        //networkZoomWidget.name
    ])
    .controller('NetworkUIController', NetworkUIController.NetworkUIController)
    .directive('awxNetCursor', cursor.cursor)
    .directive('awxNetDebug', debug.debug)
    .directive('awxNetRouter', router.router)
    .directive('awxNetSwitch', switchd.switchd)
    .directive('awxNetHost', host.host)
    .directive('awxNetLink', link.link)
    .directive('awxNetStream', stream.stream)
    .directive('awxNetRack', rack.rack)
    .directive('awxNetGroup', group.group)
    .directive('awxNetSite', site.site)
    .directive('awxNetSiteIcon', siteIcon.siteIcon)
    .directive('awxNetStatusLight', statusLight.statusLight)
    .directive('awxNetTaskStatus', taskStatus.taskStatus)
    .directive('awxNetPlaybookStatus', playbookStatus.playbookStatus)
    .directive('awxNetLogPane', logPane.logPane)
    .directive('awxNetRackIcon', rackIcon.rackIcon)
    .directive('awxNetChevronRightIcon', chevronRight.chevronRight)
    .directive('awxNetChevronLeftIcon', chevronLeft.chevronLeft)
    .directive('awxNetContextMenu', contextMenu.contextMenu)
    .directive('awxNetContextMenuButton', contextMenuButton.contextMenuButton)
    .directive('awxNetProcess', process.process)
    .directive('awxNetMap', map.map)
    .directive('awxNetDeviceDetail', deviceDetail.deviceDetail)
    .directive('awxNetDefault', defaultd.defaultd)
    .directive('awxNetQuadrants', quadrants.quadrants)
    .directive('awxNetButton', button.button)
    .directive('awxNetInventoryToolbox', inventoryToolbox.inventoryToolbox)
    .directive('awxNetTestResults', test_results.test_results)
    .directive('awxNetworkUi', awxNetworkUI.awxNetworkUI);

exports.networkUI = networkUI;
