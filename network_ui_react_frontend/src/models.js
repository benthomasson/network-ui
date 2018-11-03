var util = require('./util.js');
var fsm = require('./fsm.js');
var core_models = require('./core/models.js');
var hot_keys_fsm = require('./core/hotkeys.fsm.js');
var time_fsm = require('./core/time.fsm.js');
var view_fsm = require('./core/view.fsm.js');
var future_fsm = require('./core/future.fsm.js');
var move_fsm = require('./network/move.fsm.js');
var link_fsm = require('./network/link.fsm.js');
var group_fsm = require('./network/group.fsm.js');
var buttons_fsm = require('./button/buttons.fsm.js');
var record_fsm = require('./ux/record.fsm.js');
var runner_fsm = require('./monitor/runner.fsm.js');
var core_messages = require('./core/messages.js');
var button_models = require('./button/models.js');
var net_messages = require('./network/messages.js');
var net_models = require('./network/models.js');
var app_models = require('./application/models.js');
var monitor_models = require('./monitor/models.js');
var log_models = require('./log/models.js');
var log_pane_fsm = require('./log/log.pane.fsm.js');
var core_animations = require('./core/animations.js');
var ReconnectingWebSocket = require('reconnectingwebsocket');
var history = require('history');
if (process.env.REACT_APP_REPLAY === 'true') {
  var replay_fsm = require('./ux/replay.fsm.js');
}



function ApplicationScope (svgFrame) {

  //bind functions
  this.select_items = this.select_items.bind(this);
  this.onMouseMove = this.onMouseMove.bind(this);
  this.onMouseUp = this.onMouseUp.bind(this);
  this.onMouseDown = this.onMouseDown.bind(this);
  this.onMouseWheel = this.onMouseWheel.bind(this);
  this.timer = this.timer.bind(this);
  this.onKeyDown = this.onKeyDown.bind(this);
  this.onResize = this.onResize.bind(this);
  this.onUnload = this.onUnload.bind(this);
  this.onHistory = this.onHistory.bind(this);
  this.onTopology = this.onTopology.bind(this);
  this.onClientId = this.onClientId.bind(this);
  this.onSnapshot = this.onSnapshot.bind(this);
  this.updateScaledXY = this.updateScaledXY.bind(this);
  this.updatePanAndScale = this.updatePanAndScale.bind(this);
  this.send_control_message = this.send_control_message.bind(this);
  this.send_trace_message = this.send_trace_message.bind(this);
  this.uploadButtonHandler = this.uploadButtonHandler.bind(this);
  this.downloadButtonHandler = this.downloadButtonHandler.bind(this);
  this.launchButtonHandler = this.launchButtonHandler.bind(this);
  this.keyButtonHandler = this.keyButtonHandler.bind(this);
  this.toolbarButtonHandler = this.toolbarButtonHandler.bind(this);
  this.create_inventory_host = this.create_inventory_host.bind(this);
  this.create_inventory_group = this.create_inventory_group.bind(this);
  this.create_group_association = this.create_group_association.bind(this);
  this.delete_group_association = this.delete_group_association.bind(this);
  this.deleteDevice = this.deleteDevice.bind(this);
  this.deleteGroup = this.deleteGroup.bind(this);
  this.parseUrl = this.parseUrl.bind(this);
  this.update_cursor_pos = this.update_cursor_pos.bind(this);
  this.future_update_cursor_pos = this.future_update_cursor_pos.bind(this);
  if (process.env.REACT_APP_REPLAY === 'true') {
    this.run_replay_events = this.run_replay_events.bind(this);
  }

  var self = this;

  //Initialize variables
  this.svgFrame = svgFrame;
  this.panX = 0;
  this.panY = 0;
  this.current_scale = 1.0;
  this.cursorPosX = 0;
  this.cursorPosY = 0;
  this.mouseX = 0;
  this.mouseY = 0;
  this.scaledX = 0;
  this.scaledY = 0;
  this.pressedX = 0;
  this.pressedY = 0;
  this.pressedScaledX = 0;
  this.pressedScaledY = 0;
  this.frameWidth = 0;
  this.frameHeight = 0;
  this.lastKey = '';
  this.showDebug = false;
  this.showHelp = true;
  this.showCursor = false;
  this.showKey = false;
  this.showButtons = true;
  this.client_id = 1;
  this.state = this;
  this.topology_id = 0;
  if (process.env.REACT_APP_REPLAY === 'true') {
    this.replay_id = null;
    this.replay = false;
    this.replay_events = [];
  }
  this.disconnected = process.env.REACT_APP_DISCONNECTED === 'true';
  this.websocket_host = process.env.REACT_APP_WEBSOCKET_HOST ? process.env.REACT_APP_WEBSOCKET_HOST : window.location.host;
  this.first_channel = null;
  this.history = [];
  this.future_messages = [];
  this.selecting_device = false;
  this.placing_group = false;
  this.grabbed = false;
  this.dragging = false;
  this.browser_history = history.createHashHistory({hashType: "hashbang"});
  console.log(this.browser_history.location);

  this.template_building = false;
  this.selected_items = [];
  this.groups = [];
  this.devices = [];
  this.links = [];
  this.last_selected_device = [];
  this.interface_prefix = 'eth';

  this.playbooks = [];
  this.playbooks_by_id = {};

  this.viewport_update_subscribers = [this];

  this.help_offset = 0;
  this.help_animation = null;
  this.help = null;
  this.text_components = new WeakMap();

  this.parseUrl();

  var ws_protocol = window.location.protocol === 'https:' ? 'wss://': 'ws://';


  //Connect websocket
  if (!this.disconnected) {
    console.log( ws_protocol + this.websocket_host + "/ws/network_ui?topology_id=" + this.topology_id);
    this.control_socket_url = ws_protocol + this.websocket_host + "/ws/network_ui?topology_id=" + this.topology_id;
    if (process.env.REACT_APP_REPLAY === 'true') {
      this.control_socket_url = this.control_socket_url + "&replay_id=" + this.replay_id;
    }
    this.control_socket = new ReconnectingWebSocket(
      this.control_socket_url,
      null,
      {debug: false, reconnectInterval: 300});
    this.control_socket.onmessage = function(message) {
      if (self.first_channel !== null) {
        self.first_channel.send("Message", message);
      }
      console.log(message);
      self.svgFrame.setState({});
    };
  } else {
    this.control_socket = {send: util.noop};
  }

  //Create sequences
  this.animation_id_seq = util.natural_numbers(0);
  this.trace_id_seq = util.natural_numbers(0);
  this.trace_order_seq = util.natural_numbers(0);
  this.message_id_seq = util.natural_numbers(0);
  this.group_id_seq = util.natural_numbers(0);
  this.device_id_seq = util.natural_numbers(0);
  this.link_id_seq = util.natural_numbers(0);
  this.interface_id_seq = util.natural_numbers(0);
  this.play_id_seq = util.natural_numbers(0);

  //Create Buttons
  this.buttons_by_name = {
    toggle_toolbar: new button_models.Button("Toolbar", 20, 7, 40, 40, this.toolbarButtonHandler, this),
    download: new button_models.Button("Topology", 70, 7, 40, 40, this.downloadButtonHandler, this),
    launch: new button_models.Button("Launch", 120, 7, 40, 40, this.launchButtonHandler, this),
    toggle_key: new button_models.Button("Key", -50, 7, 40, 40, this.keyButtonHandler, this)
  };

  this.buttons = [this.buttons_by_name.download,
                  this.buttons_by_name.launch,
                  this.buttons_by_name.toggle_key,
                  this.buttons_by_name.toggle_toolbar];

  this.viewport_update_subscribers.push(this.buttons_by_name.toggle_key);
  this.buttons_by_name.toggle_key.update_size(window);

  //Create Log Pane
  this.log_pane = new log_models.LogPane(this);
  this.viewport_update_subscribers.push(this.log_pane);
  this.log_pane.update_size(window);
  this.log_pane.hidden = false;
  this.log_pane.x = 200;
  this.log_pane.y = 100;
  this.log_pane.log_offset = -20;

  //Create Playbook Status
  this.play_status = new monitor_models.PlayStatus(this.log_pane, this);
  this.viewport_update_subscribers.push(this.play_status);
  this.play_status.update_size(window);
  this.play_status.width = 200;
  this.play_status.height = 500;

  this.buttons.push(this.play_status);


  //Create FSM controllers
  this.hotkeys_controller = new fsm.FSMController(this, 'hot_keys_fsm', hot_keys_fsm.Start, this);
  this.move_controller = new fsm.FSMController(this, 'move_fsm', move_fsm.Start, this);
  this.link_controller = new fsm.FSMController(this, 'link_fsm', link_fsm.Start, this);
  this.buttons_controller = new fsm.FSMController(this, 'buttons_fsm', buttons_fsm.Start, this);
  this.time_controller = new fsm.FSMController(this, 'time_fsm', time_fsm.Start, this);
  this.view_controller = new fsm.FSMController(this, 'view_fsm', view_fsm.Start, this);
  this.group_controller = new fsm.FSMController(this, 'group_fsm', group_fsm.Start, this);
  this.record_controller = new fsm.FSMController(this, 'record_fsm', record_fsm.Start, this);
  this.log_pane_controller = new fsm.FSMController(this.log_pane, 'log_pane_fsm', log_pane_fsm.Start, this);
  this.runner_controller = new fsm.FSMController(this, 'runner_fsm', runner_fsm.Start, this);
  this.log_pane.fsm = this.log_pane_controller;
  this.future_controller = new fsm.FSMController(this, 'future_fsm', future_fsm.Start, this);
  if (process.env.REACT_APP_REPLAY === 'true') {
    this.replay_controller = new fsm.FSMController(this, 'replay_fsm', replay_fsm.Start, this);
  }


  //Wire up controllers
  //
  this.controllers = [this.view_controller,
                      this.hotkeys_controller,
                      this.move_controller,
                      this.link_controller,
                      this.group_controller,
                      this.log_pane_controller,
                      this.runner_controller,
                      this.buttons_controller,
                      this.time_controller,
                      this.future_controller];

  if (process.env.REACT_APP_REPLAY === 'true') {
    this.controllers.push(this.replay_controller);
  }
  else {
    this.controllers.push(this.record_controller);
  }

  console.log(this.controllers);



  for (var i = 0; i < this.controllers.length - 1; i++) {
    var next_controller = this.controllers[i];
    var current_controller = this.controllers[i+1];

    current_controller.delegate_channel = new fsm.Channel(current_controller,
                                                          next_controller,
                                                          this);
  }

  this.first_channel = new fsm.Channel(null,
                                       this.controllers[this.controllers.length - 1],
                                       this);

}
exports.ApplicationScope = ApplicationScope;

ApplicationScope.prototype.parseUrl = function () {

  var data = {};

  var split = this.browser_history.location.pathname.split('/');
  var last = split[split.length - 1];
  var split2 = last.split('&');
  for (var j = 0; j < split2.length; j++) {
    var split3 = split2[j].split(':');
    if (split3.length === 2) {
      var name = split3[0];
      var value = split3[1];
      data[name] = value;
    }
  }
  if (data.topology_id !== undefined && data.topology_id !== null) {
    this.topology_id = data.topology_id;
  }
  if (process.env.REACT_APP_REPLAY === 'true') {
    if (data.replay_id !== undefined && data.replay_id !== null) {
      this.replay_id = data.replay_id;
    }
  }

  console.log(this);
};

ApplicationScope.prototype.uploadButtonHandler = function (message) {
  console.log(message);
  window.open("/network_ui/upload?topology_id=" + this.topology_id, "_top");
};

ApplicationScope.prototype.downloadButtonHandler = function (message) {
  console.log(message);
  window.open("/network_ui/download?topology_id=" + this.topology_id, "_blank");
};

ApplicationScope.prototype.launchButtonHandler = function (message) {
  this.send_control_message(new net_messages.Deploy(this.client_id));
};

ApplicationScope.prototype.keyButtonHandler = function (message) {
  var self = this;
  if (this.help_animation !== null) {
    this.help_animation.fsm.handle_message('AnimationCancelled');
  }
  if (this.help.state.extending) {
    this.help.setState({showHelp: true, extending: false});
    this.help_animation = new core_models.Animation(this.animation_id_seq(),
                                                    35,
                                                    {scope: this,
                                                     direction: 10,
                                                     component:this.help},
                                                    this,
                                                    this,
                                                    core_animations.help_animation,
                                                    function () {self.help.setState({showHelp: false})},
                                                    function () {self.help.setState({showHelp: true})});
  } else {
    this.help.setState({showHelp: true, extending: true});
    this.help_animation = new core_models.Animation(this.animation_id_seq(),
                                                    35,
                                                    {scope: this,
                                                     direction: -10,
                                                     component:this.help},
                                                    this,
                                                    this,
                                                    core_animations.help_animation,
                                                    function () {self.help.setState({showHelp: true})},
                                                    function () {self.help.setState({showHelp: false})});
  }
};

ApplicationScope.prototype.toolbarButtonHandler = function (message) {
  console.log(message);
};

ApplicationScope.prototype.send_trace_message = function (message) {
  console.log(message);
};

ApplicationScope.prototype.send_control_message = function (message) {
  //console.log(message);
  message.sender = this.client_id;
  message.message_id = this.message_id_seq();
  if (message.msg_type === "MultipleMessage") {
      for (var i=0; i < message.messages.length; i++) {
          message.messages[i].message_id = this.message_id_seq();
      }
  }
  var data = core_messages.serialize(message);
  if (process.env.REACT_APP_REPLAY === 'true') {
    if (this.replay) {
      return;
    }
  }
  //console.log(["Sending", message.msg_type, message.sender, message.message_id]);
  this.control_socket.send(data);
};

ApplicationScope.prototype.setState = function (o) {
  var keys = Object.keys(o);

  for (var i = 0; i < keys.length; i++) {
    this[keys[i]] = o[keys[i]];
  }
};

ApplicationScope.prototype.onMouseMove = function (e) {
  this.first_channel.send('MouseMove', e);
  this.setState({
    cursorPosX: e.pageX,
    cursorPosY: e.pageY,
    mouseX: e.pageX,
    mouseY: e.pageY,
  });

  this.updateScaledXY();

  e.preventDefault();
  this.svgFrame.setState({});
};

ApplicationScope.prototype.onMouseDown = function (e) {
  this.mouse_pressed = true;
  this.first_channel.send('MouseDown', e);
  this.setState({
    cursorPosX: e.pageX,
    cursorPosY: e.pageY,
    mouseX: e.pageX,
    mouseY: e.pageY,
  });

  this.updateScaledXY();

  e.preventDefault();
  this.svgFrame.setState({});
};

ApplicationScope.prototype.onMouseUp = function (e) {
  this.mouse_pressed = false;
  this.first_channel.send('MouseUp', e);
  this.setState({
    cursorPosX: e.pageX,
    cursorPosY: e.pageY,
    mouseX: e.pageX,
    mouseY: e.pageY,
  });

  this.updateScaledXY();

  e.preventDefault();
  this.svgFrame.setState({});
};

ApplicationScope.prototype.onMouseWheel = function (e) {
  console.log([e, e.deltaX, e.deltaY, e.deltaZ, e.metaKey, e.deltaMode]);
  this.first_channel.send("MouseWheel", [e.deltaX, e.deltaY]);
  e.preventDefault();
  this.svgFrame.setState({});
};

ApplicationScope.prototype.onKeyDown = function (e) {
  this.first_channel.send('KeyDown', e);
  this.setState({
    lastKey: e.key
  });

  e.preventDefault();
  this.svgFrame.setState({});
};

ApplicationScope.prototype.timer = function () {
  if (this.future_messages.length > 0) {

    for(var i = 0; i < this.future_messages.length; i++) {
      this.first_channel.send(this.future_messages[i][0],
                              this.future_messages[i][1]);
    }

    this.future_messages = [];
    this.svgFrame.setState({});
  }
};

ApplicationScope.prototype.onUnload = function (e) {

  this.first_channel.send('PageClose', {});
};

ApplicationScope.prototype.onResize = function (e) {
  if (process.env.REACT_APP_REPLAY === 'true') {
    if (this.replay) {
      return;
    }
  }

  for( var i = 0; i < this.viewport_update_subscribers.length; i++ ) {
    this.viewport_update_subscribers[i].update_size(window);
  }
   this.setState({
     frameWidth: window.innerWidth,
     frameHeight: window.innerHeight
   });
  this.svgFrame.setState({});
};

ApplicationScope.prototype.update_size = function () {
};

ApplicationScope.prototype.clear_selections = function () {
  var i = 0;
  var j = 0;
  var devices = this.devices;
  var links = this.links;
  var groups = this.groups;
  this.selected_items = [];
  this.selected_devices = [];
  this.selected_links = [];
  this.selected_interfaces = [];
  this.selected_groups = [];
  for (i = 0; i < devices.length; i++) {
      for (j = 0; j < devices[i].interfaces.length; j++) {
          devices[i].interfaces[j].selected = false;
      }
      if (devices[i].selected) {
          this.send_control_message(new net_messages.DeviceUnSelected(this.client_id, devices[i].id));
      }
      devices[i].selected = false;
  }
  for (i = 0; i < links.length; i++) {
      if (links[i].selected) {
          this.send_control_message(new net_messages.LinkUnSelected(this.client_id, links[i].id));
      }
      links[i].selected = false;
  }
  for (i = 0; i < groups.length; i++) {
      groups[i].selected = false;
  }
};

ApplicationScope.prototype.select_items = function (multiple_selection) {
  var i = 0;
  var j = 0;
  var devices = this.devices;
  var last_selected_device = null;
  var last_selected_interface = null;
  var last_selected_link = null;

  this.pressedX = this.mouseX;
  this.pressedY = this.mouseY;
  this.pressedScaledX = this.scaledX;
  this.pressedScaledY = this.scaledY;

  if (!multiple_selection) {
      this.clear_selections();
  }

  for (i = devices.length - 1; i >= 0; i--) {
      if (devices[i].is_selected(this.scaledX, this.scaledY)) {
          devices[i].selected = true;
          this.send_control_message(new net_messages.DeviceSelected(this.client_id, devices[i].id));
          last_selected_device = devices[i];
            if (this.selected_items.indexOf(this.devices[i]) === -1) {
                this.selected_items.push(this.devices[i]);
            }
          if (this.selected_devices.indexOf(devices[i]) === -1) {
              this.selected_devices.push(devices[i]);
          }
          if (!multiple_selection) {
              break;
          }
      }
  }

  // Do not select interfaces if a device was selected
  if (last_selected_device === null && !this.hide_interfaces) {
      for (i = devices.length - 1; i >= 0; i--) {
          for (j = devices[i].interfaces.length - 1; j >= 0; j--) {
              if (devices[i].interfaces[j].is_selected(this.scaledX, this.scaledY)) {
                  devices[i].interfaces[j].selected = true;
                  last_selected_interface = devices[i].interfaces[j];
                  if (this.selected_interfaces.indexOf(this.devices[i].interfaces[j]) === -1) {
                      this.selected_interfaces.push(this.devices[i].interfaces[j]);
                  }
                  if (this.selected_items.indexOf(this.devices[i].interfaces[j]) === -1) {
                      this.selected_items.push(this.devices[i].interfaces[j]);
                  }
                  if (!multiple_selection) {
                      break;
                  }
              }
          }
      }
  }

  // Do not select links if a device was selected
  if (last_selected_device === null && last_selected_interface === null) {
      for (i = this.links.length - 1; i >= 0; i--) {
          if (this.links[i].is_selected(this.scaledX, this.scaledY)) {
              this.links[i].selected = true;
              this.send_control_message(new net_messages.LinkSelected(this.client_id, this.links[i].id));
              last_selected_link = this.links[i];
              if (this.selected_items.indexOf(this.links[i]) === -1) {
                  this.selected_items.push(this.links[i]);
              }
              if (this.selected_links.indexOf(this.links[i]) === -1) {
                  this.selected_links.push(this.links[i]);
                  if (!multiple_selection) {
                      break;
                  }
              }
          }
      }
  }

  return {last_selected_device: last_selected_device,
          last_selected_link: last_selected_link,
          last_selected_interface: last_selected_interface,
         };
};

ApplicationScope.prototype.updateScaledXY = function() {
  this.scaledX = (this.mouseX - this.panX) / this.current_scale;
  this.scaledY = (this.mouseY - this.panY) / this.current_scale;
};

ApplicationScope.prototype.updatePanAndScale = function() {
  //var g = document.getElementById('frame_g');
  //g.setAttribute('transform','translate(' + this.panX + ',' + this.panY + ') scale(' + this.current_scale + ')');
};

ApplicationScope.prototype.onHistory = function (data) {

  this.history = [];
  var i = 0;
  for (i = 0; i < data.length; i++) {
      //console.log(data[i]);
      this.history.push(data[i]);
  }
};

ApplicationScope.prototype.onTopology = function(data) {

  var path_data = {pathname: '/topology_id:' + data.topology_id}
  if (process.env.REACT_APP_REPLAY === 'true' && this.replay_id !== null) {
    path_data.pathname = path_data.pathname + "&replay_id:" + this.replay_id;
  }
  if (this.browser_history.location.pathname !== path_data.pathname) {
    this.browser_history.push(path_data);
  }
  this.parseUrl();
};

ApplicationScope.prototype.onClientId = function(data) {
  this.client_id = data;
};


ApplicationScope.prototype.onSnapshot = function (data) {

        //Erase the existing state
        this.devices = [];
        this.links = [];
        this.groups = [];

        var device_map = {};
        var device_interface_map = {};
        var i = 0;
        var j = 0;
        var device = null;
        var intf = null;
        var new_device = null;
        var new_intf = null;
        var max_device_id = null;
        var max_link_id = null;
        var max_group_id = null;
        var max_stream_id = null;
        var min_x = null;
        var min_y = null;
        var max_x = null;
        var max_y = null;
        var new_link = null;
        var new_group = null;
        var process = null;
        var new_process = null;
        var new_stream = null;

        //Build the devices
        for (i = 0; i < data.devices.length; i++) {
            device = data.devices[i];
            if (max_device_id === null || device.id > max_device_id) {
                max_device_id = device.id;
            }
            if (min_x === null || device.x < min_x) {
                min_x = device.x;
            }
            if (min_y === null || device.y < min_y) {
                min_y = device.y;
            }
            if (max_x === null || device.x > max_x) {
                max_x = device.x;
            }
            if (max_y === null || device.y > max_y) {
                max_y = device.y;
            }
            new_device = new net_models.Device(device.id,
                                           device.name,
                                           device.x,
                                           device.y,
                                           device.device_type,
                                           device.host_id);

            /*
            for (j=0; j < this.inventory_toolbox.items.length; j++) {
                 if(this.inventory_toolbox.items[j].name === device.name) {
                     this.inventory_toolbox.items.splice(j, 1);
                     break;
                 }
            }
            */
            new_device.interface_seq = util.natural_numbers(device.interface_id_seq);
            new_device.process_id_seq = util.natural_numbers(device.process_id_seq);
            this.devices.push(new_device);
            device_map[device.id] = new_device;
            device_interface_map[device.id] = {};
            for (j = 0; j < device.processes.length; j++) {
                process = device.processes[j];
                new_process = (new app_models.Process(process.id,
                                                  process.name,
                                                  process.process_type,
                                                  0,
                                                  0));
                new_process.device = new_device;
                new_device.processes.push(new_process);
            }
            for (j = 0; j < device.interfaces.length; j++) {
                intf = device.interfaces[j];
                new_intf = (new net_models.Interface(intf.id,
                                                 intf.name));
                new_intf.device = new_device;
                device_interface_map[device.id][intf.id] = new_intf;
                new_device.interfaces.push(new_intf);
            }
        }

        //Build the links
        var link = null;
        for (i = 0; i < data.links.length; i++) {
            link = data.links[i];
            if (max_link_id === null || link.id > max_link_id) {
                max_link_id = link.id;
            }
            new_link = new net_models.Link(link.id,
                                       device_map[link.from_device_id],
                                       device_map[link.to_device_id],
                                       device_interface_map[link.from_device_id][link.from_interface_id],
                                       device_interface_map[link.to_device_id][link.to_interface_id]);
            new_link.name = link.name;
            this.links.push(new_link);
            device_interface_map[link.from_device_id][link.from_interface_id].link = new_link;
            device_interface_map[link.to_device_id][link.to_interface_id].link = new_link;
        }

        //Build the groups
        var group = null;
        for (i = 0; i < data.groups.length; i++) {
            group = data.groups[i];
            if (max_group_id === null || group.id > max_group_id) {
                max_group_id = group.id;
            }
            new_group = new net_models.Group(group.id,
                                         group.name,
                                         group.group_type,
                                         group.x1,
                                         group.y1,
                                         group.x2,
                                         group.y2,
                                         false);
            new_group.group_id = group.inventory_group_id;
            if (group.members !== undefined) {
                for (j=0; j < group.members.length; j++) {
                    new_group.devices.push(device_map[group.members[j]]);
                }
            }
            this.groups.push(new_group);
        }

        //Update group membership

        for (i = 0; i < this.groups.length; i++) {
            this.groups[i].update_membership(this.devices, this.groups);
        }

        var diff_x;
        var diff_y;

        // Calculate the new scale to show the entire diagram
        if (min_x !== null && min_y !== null && max_x !== null && max_y !== null) {
            diff_x = max_x - min_x;
            diff_y = max_y - min_y;

            this.current_scale = Math.min(2, Math.max(0.10, Math.min((window.innerWidth-200)/diff_x, (window.innerHeight-300)/diff_y)));
            this.updateScaledXY();
            this.updatePanAndScale();
        }
        // Calculate the new panX and panY to show the entire diagram
        if (min_x !== null && min_y !== null) {
            diff_x = max_x - min_x;
            diff_y = max_y - min_y;
            this.panX = this.current_scale * (-min_x - diff_x/2) + window.innerWidth/2;
            this.panY = this.current_scale * (-min_y - diff_y/2) + window.innerHeight/2;
            this.updateScaledXY();
            this.updatePanAndScale();
        }

        //Update the device_id_seq to be greater than all device ids to prevent duplicate ids.
        if (max_device_id !== null) {
            this.device_id_seq = util.natural_numbers(max_device_id);
        }
        //
        //Update the link_id_seq to be greater than all link ids to prevent duplicate ids.
        if (max_link_id !== null) {
            this.link_id_seq = util.natural_numbers(max_link_id);
        }
        //Update the stream_id_seq to be greater than all stream ids to prevent duplicate ids.
        if (max_stream_id !== null) {
            this.stream_id_seq = util.natural_numbers(max_stream_id);
        }
        //Update the group_id_seq to be greater than all group ids to prevent duplicate ids.
        if (max_group_id !== null) {
            this.group_id_seq = util.natural_numbers(max_group_id);
        }

        this.updateInterfaceDots();
        this.update_device_variables();

        this.first_channel.send('SnapshotLoaded', {});
};

ApplicationScope.prototype.create_inventory_host = function (device) {
  if (this.template_building || device.template) {
    return;
  }
  console.log(device);

  return [];
};

ApplicationScope.prototype.create_inventory_group = function (group) {
  if (this.template_building || group.template) {
      return;
  }
  console.log(group);
  return [];
};

ApplicationScope.prototype.create_group_association = function () {};

ApplicationScope.prototype.delete_group_association = function (group, devices) {
  if (this.template_building || group.template) {
      return;
  }

  console.log(['delete_group_association', group, devices]);
};

ApplicationScope.prototype.deleteDevice = function() {
  var i = 0;
  var j = 0;
  var index = -1;
  var devices = this.selected_devices;
  var links = this.selected_links;
  var all_links = this.links.slice();
  this.selected_devices = [];
  this.selected_links = [];
  this.move_controller.changeState(move_fsm.Ready);
  for (i = 0; i < links.length; i++) {
      index = this.links.indexOf(links[i]);
      if (index !== -1) {
          links[i].selected = false;
          links[i].remote_selected = false;
          this.links.splice(index, 1);
          this.send_control_message(new net_messages.LinkDestroy(this.client_id,
                                                                         links[i].id,
                                                                         links[i].from_device.id,
                                                                         links[i].to_device.id,
                                                                         links[i].from_interface.id,
                                                                         links[i].to_interface.id,
                                                                         links[i].name));
      }
  }
  for (i = 0; i < devices.length; i++) {
      index = this.devices.indexOf(devices[i]);
      if (index !== -1) {
          this.devices.splice(index, 1);
          this.send_control_message(new net_messages.DeviceDestroy(this.client_id,
                                                                           devices[i].id,
                                                                           devices[i].x,
                                                                           devices[i].y,
                                                                           devices[i].name,
                                                                           devices[i].type,
                                                                           devices[i].host_id));
      }
      for (j = 0; j < all_links.length; j++) {
          if (all_links[j].to_device === devices[i] ||
              all_links[j].from_device === devices[i]) {
              index = this.links.indexOf(all_links[j]);
              if (index !== -1) {
                  this.links.splice(index, 1);
              }
          }
      }
  }
};

ApplicationScope.prototype.deleteGroup = function () {
  var i = 0;
  var index = -1;
  var selected_groups = this.selected_groups;
  this.selected_groups = [];
  this.group_controller.changeState(group_fsm.Ready);

  var self = this;

  function removeSingleGroup(group){
      index = self.groups.indexOf(group);
      if (index !== -1) {
          group.selected = false;
          group.remote_selected = false;
          self.groups.splice(index, 1);
      }
      self.send_control_message(new net_messages.GroupDestroy(self.client_id,
                                                                      group.id,
                                                                      group.x1,
                                                                      group.y1,
                                                                      group.x2,
                                                                      group.y2,
                                                                      group.name,
                                                                      group.group_id));
  }

  if(this.current_scale <= 0.5){
      // current scale is in racks mode or sites mode
      for (i = 0; i < selected_groups.length; i++) {
          let group = selected_groups[i];
          if(group.groups.length > 0){
              for(var k = 0; k < group.groups.length; k++){
                  let nested_group = group.groups[k];
                  removeSingleGroup(nested_group);
              }
          }
          // remove all the nested devices and links
          this.selected_devices = group.devices;
          this.selected_links = group.links;
          this.deleteDevice();

          removeSingleGroup(group);
      }
  }
  if(this.current_scale > 0.5){
      // current scale is in devices mode
      for (i = 0; i < selected_groups.length; i++) {
          let group = selected_groups[i];
          removeSingleGroup(group);
      }
  }
};

ApplicationScope.prototype.updateInterfaceDots = function () {
  var i = 0;
  var j = 0;
  var devices = this.devices;
  for (i = devices.length - 1; i >= 0; i--) {
    for (j = devices[i].interfaces.length - 1; j >= 0; j--) {
      devices[i].interfaces[j].dot();
    }
  }
};

ApplicationScope.prototype.update_device_variables = function () {

  var hosts_by_id = {};
  var i = 0;
  for (i = 0; i < this.devices.length; i++) {
    hosts_by_id[this.devices[i].host_id] = this.devices[i];
  }
};

ApplicationScope.prototype.reset_flags = function () {

};
ApplicationScope.prototype.reset_fsm_state = function () {

};
ApplicationScope.prototype.reset_history = function () {

};

if (process.env.REACT_APP_REPLAY === 'true') {
  ApplicationScope.prototype.run_replay_events = function () {
    var replay_event = null;
    if (this.replay_events.length  > 0) {
        replay_event = this.replay_events.shift();
        replay_event.sender = 0;
        console.log(replay_event);
        this.first_channel.send(replay_event.msg_type, replay_event);
        this.svgFrame.setState({});
    }
  };
}

ApplicationScope.prototype.future_update_cursor_pos = function(id, object) {
    this.future_messages.push(['UpdateCursor', {id:id, object:object, counter:5}]);
};

ApplicationScope.prototype.update_cursor_pos = function(id, object, counter) {

    console.log(['update_cursor_pos', 'text_' + id, counter]);

    if (id === undefined) {
      return;
    }
    if (counter === undefined) {
      counter = 5;
    }
    if (counter <= 0) {
      return;
    }

    var textInput = document.getElementById('text_' + id);
    console.log(textInput);
    if (textInput !== null) {
        console.log(textInput.getBBox().width);
        var width = textInput.getBBox().width;
        object.cursor_pos = width + 9;
        object.text_width = width + 16;
    } else {
        this.future_messages.push(['UpdateCursor', {id:id, object:object, counter:counter-1}]);
    }
};
