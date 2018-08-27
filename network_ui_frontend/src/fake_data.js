
var models = require('./models.js');

function load_fake_data ($scope) {
  console.log('Loading fake data');

  var i = 0;
  var dids = $scope.device_id_seq;
  var mids = $scope.message_id_seq;
  var gids = $scope.group_id_seq;
  var lids = $scope.link_id_seq;

  $scope.app_toolbox.items.push(new models.Process(0, 'BGP', 'process', 0, 0));
  $scope.app_toolbox.items.push(new models.Process(0, 'OSPF', 'process', 0, 0));
  $scope.app_toolbox.items.push(new models.Process(0, 'STP', 'process', 0, 0));
  $scope.app_toolbox.items.push(new models.Process(0, 'Zero Pipeline', 'process', 0, 0));

  $scope.inventory_toolbox.items.push(new models.Device(0, 'Router6', 0, 0, 'router'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Switch6', 0, 0, 'switch'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Host6', 0, 0, 'host'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Router7', 0, 0, 'router'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Router8', 0, 0, 'router'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Router9', 0, 0, 'router'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Router10', 0, 0, 'router'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Router11', 0, 0, 'router'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Router12', 0, 0, 'router'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Router13', 0, 0, 'router'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Router14', 0, 0, 'router'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Router15', 0, 0, 'router'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Router16', 0, 0, 'router'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'FSM1', 0, 0, 'fsm'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'FSM2', 0, 0, 'fsm'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Queue1', 0, 0, 'queue'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Queue1', 0, 0, 'queue'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Pod1', 0, 0, 'pod'));
  $scope.inventory_toolbox.items.push(new models.Device(0, 'Pod2', 0, 0, 'pod'));

  $scope.rack_toolbox.items.push(new models.Group(0, 'Rack3', 'rack', 0, 0, 200, 1000, 'false'));

  $scope.site_toolbox.items.push(new models.Group(0, 'Site3', 'site', 0, 0, 1000, 1000, 'false'));

  $scope.initial_messages = [
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":100,"y":100,"name":"Router1","type":"router","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":300,"y":100,"name":"Switch1","type":"switch","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":500,"y":100,"name":"HostA","type":"host","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":700,"y":100,"name":"Host1","type":"host","message_id":mids()}],

      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":100,"y":300,"name":"Router2","type":"router","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":100,"y":500,"name":"Router3","type":"router","message_id":mids()}],
      ["InterfaceCreate", {"msg_type":"InterfaceCreate","sender":0,"device_id":5,"id":1,"name":"eth1","message_id":mids()}],
      ["InterfaceCreate", {"msg_type":"InterfaceCreate","sender":0,"device_id":6,"id":1,"name":"eth1","message_id":mids()}],
      ["LinkCreate", {"msg_type":"LinkCreate","id":lids(),"sender":0,"name":"","from_device_id":5,"to_device_id":6,"from_interface_id":1,"to_interface_id":1,"message_id":mids()}],

      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":300,"y":300,"name":"Switch2","type":"switch","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":300,"y":500,"name":"Switch3","type":"switch","message_id":mids()}],
      ["InterfaceCreate", {"msg_type":"InterfaceCreate","sender":0,"device_id":7,"id":1,"name":"eth1","message_id":mids()}],
      ["InterfaceCreate", {"msg_type":"InterfaceCreate","sender":0,"device_id":8,"id":1,"name":"eth1","message_id":mids()}],
      ["LinkCreate", {"msg_type":"LinkCreate","id":lids(),"sender":0,"name":"","from_device_id":7,"to_device_id":8,"from_interface_id":1,"to_interface_id":1,"message_id":mids()}],

      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":500,"y":300,"name":"HostB","type":"host","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":500,"y":500,"name":"HostC","type":"host","message_id":mids()}],
      ["InterfaceCreate", {"msg_type":"InterfaceCreate","sender":0,"device_id":9,"id":1,"name":"eth1","message_id":mids()}],
      ["InterfaceCreate", {"msg_type":"InterfaceCreate","sender":0,"device_id":10,"id":1,"name":"eth1","message_id":mids()}],
      ["LinkCreate", {"msg_type":"LinkCreate","id":lids(),"sender":0,"name":"","from_device_id":9,"to_device_id":10,"from_interface_id":1,"to_interface_id":1,"message_id":mids()}],

      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":700,"y":300,"name":"Host2","type":"host","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":700,"y":500,"name":"Host3","type":"host","message_id":mids()}],
      ["InterfaceCreate", {"msg_type":"InterfaceCreate","sender":0,"device_id":11,"id":1,"name":"eth1","message_id":mids()}],
      ["InterfaceCreate", {"msg_type":"InterfaceCreate","sender":0,"device_id":12,"id":1,"name":"eth1","message_id":mids()}],
      ["LinkCreate", {"msg_type":"LinkCreate","id":lids(),"sender":0,"name":"","from_device_id":11,"to_device_id":12,"from_interface_id":1,"to_interface_id":1,"message_id":mids()}],

      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":100,"y":700,"name":"Router4","type":"router","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":300,"y":700,"name":"Switch4","type":"switch","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":500,"y":700,"name":"HostD","type":"host","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":700,"y":700,"name":"Host4","type":"host","message_id":mids()}],

      ["GroupCreate",{"msg_type":"GroupCreate","sender":0,"ids":gids(),"x1":0,"y1":600,"x2":1000,"y2":800,"name":"Group1",type:"group", "message_id":mids()}],

      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":100,"y":900,"name":"Router5","type":"router","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":300,"y":900,"name":"Switch5","type":"switch","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":500,"y":900,"name":"HostE","type":"host","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":700,"y":900,"name":"Host5","type":"host","message_id":mids()}],

      ["GroupCreate",{"msg_type":"GroupCreate","sender":0,"ids":gids(),"x1":-100,"y1":0,"x2":1100,"y2":1100,"name":"Site1",type:"site", "message_id":mids()}],
      ["GroupCreate",{"msg_type":"GroupCreate","sender":0,"ids":gids(),"x1":0,"y1":800,"x2":1000,"y2":1000,"name":"Rack1",type:"rack", "message_id":mids()}],


      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":900,"y":100,"name":"Device1","type":"device","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":900,"y":300,"name":"Device2","type":"device","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":900,"y":500,"name":"Device3","type":"device","message_id":mids()}],
      ["InterfaceCreate", {"msg_type":"InterfaceCreate","sender":0,"device_id":22,"id":1,"name":"eth1","message_id":mids()}],
      ["InterfaceCreate", {"msg_type":"InterfaceCreate","sender":0,"device_id":23,"id":1,"name":"eth1","message_id":mids()}],
      ["LinkCreate", {"msg_type":"LinkCreate","id":lids(),"sender":0,"name":"","from_device_id":22,"to_device_id":23,"from_interface_id":1,"to_interface_id":1,"message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":900,"y":700,"name":"Device4","type":"device","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":900,"y":900,"name":"Device5","type":"device","message_id":mids()}],

      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":100,"y":2900,"name":"Router6","type":"router","message_id":mids()}],
      ["InterfaceCreate", {"msg_type":"InterfaceCreate","sender":0,"device_id":17,"id":1,"name":"eth1","message_id":mids()}],
      ["InterfaceCreate", {"msg_type":"InterfaceCreate","sender":0,"device_id":26,"id":1,"name":"eth1","message_id":mids()}],
      ["LinkCreate", {"msg_type":"LinkCreate","id":lids(),"sender":0,"name":"","from_device_id":17,"to_device_id":26,"from_interface_id":1,"to_interface_id":1,"message_id":mids()}],
      ["GroupCreate",{"msg_type":"GroupCreate","sender":0,"ids":gids(),"x1":0,"y1":2800,"x2":1000,"y2":3000,"name":"Site2",type:"site", "message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":100,"y":3500,"name":"FSM3","type":"fsm","message_id":mids()}],
      ["DeviceCreate",{"msg_type":"DeviceCreate","sender":0,"id":dids(),"x":100,"y":3600,"name":"FSM4","type":"fsm","message_id":mids()}],
  ];

  for (i =0; i < $scope.initial_messages.length; i++) {
      console.log(['Initial message',  $scope.initial_messages[i]]);
      $scope.first_channel.send($scope.initial_messages[i][0], $scope.initial_messages[i][1]);
  }
  console.log('Loaded fake data');
}

exports.load_fake_data = load_fake_data;
