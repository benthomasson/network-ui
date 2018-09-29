var util = require('./util.js');
var fsm = require('./fsm.js');
var hot_keys_fsm = require('./core/hotkeys.fsm.js');
var time_fsm = require('./core/time.fsm.js');
var view_fsm = require('./core/view.fsm.js');
var move_fsm = require('./network/move.fsm.js');
var buttons_fsm = require('./button/buttons.fsm.js');
var core_messages = require('./core/messages.js');
var button_models = require('./button/models.js');
var net_messages = require('./network/messages.js');
var ReconnectingWebSocket = require('reconnectingwebsocket');
var history = require('history');



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
  this.onHistory = this.onHistory.bind(this);
  this.onTopology = this.onTopology.bind(this);
  this.onClientId =  this.onClientId.bind(this);
  this.onSnapshot =  this.onSnapshot.bind(this);
  this.updateScaledXY =  this.updateScaledXY.bind(this);
  this.updatePanAndScale =  this.updatePanAndScale.bind(this);
  this.send_control_message =  this.send_control_message.bind(this);
  this.send_trace_message =  this.send_trace_message.bind(this);
  this.uploadButtonHandler =  this.uploadButtonHandler.bind(this);
  this.downloadButtonHandler =  this.downloadButtonHandler.bind(this);

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
  this.frameNumber = 0;
  this.showDebug = false;
  this.showHelp = true;
  this.showCursor = false;
  this.showButtons = true;
  this.client_id = 1;
  this.state = this;
  this.topology_id = 0;
  this.disconnected = process.env.REACT_APP_DISCONNECTED === 'true';
  this.websocket_host = process.env.REACT_APP_WEBSOCKET_HOST ? process.env.REACT_APP_WEBSOCKET_HOST : window.location.host;
  this.first_channel = null;
  this.history = [];
  this.selecting_state = false;
  this.browser_history = history.createHashHistory({hashType: "hashbang"});
  console.log(this.browser_history.location);

  this.template_building = false;
  this.selected_items = [];
  this.groups = [];
  this.devices = [];
  this.links = [];
  this.last_selected_device = [];


  var split = this.browser_history.location.pathname.split('/');
  var last = split[split.length - 1];
  var split2 = last.split(':');
  var last2 = split2[split2.length - 1];
  this.topology_id = last2;


  //Connect websocket
  if (!this.disconnected) {
    console.log( "ws://" + this.websocket_host + "/ws/prototype?topology_id=" + this.topology_id);
    this.control_socket = new ReconnectingWebSocket(
      "ws://" + this.websocket_host + "/ws/prototype?topology_id=" + this.topology_id,
      null,
      {debug: false, reconnectInterval: 300});
    this.control_socket.onmessage = function(message) {
      if (self.first_channel !== null) {
        self.first_channel.send("Message", message);
      }
      console.log(message);
      self.svgFrame.forceUpdate();
    };
  } else {
    this.control_socket = {send: util.noop};
  }

  //Create sequences
  this.trace_order_seq = util.natural_numbers(0);
  this.message_id_seq = util.natural_numbers(0);
  this.group_id_seq = util.natural_numbers(0);
  this.device_id_seq = util.natural_numbers(0);

  //Create Buttons
  this.buttons_by_name = {
    upload: new button_models.Button("Topology", 20, 7, 50, 70, this.uploadButtonHandler, this),
    download: new button_models.Button("Topology", 90, 7, 50, 70, this.downloadButtonHandler, this),
  };

  this.buttons = [this.buttons_by_name.upload,
                  this.buttons_by_name.download];

  //Create FSM controllers
  this.hotkeys_controller = new fsm.FSMController(this, 'hot_keys_fsm', hot_keys_fsm.Start, this);
  this.move_controller = new fsm.FSMController(this, 'move_fsm', move_fsm.Start, this);
  this.buttons_controller = new fsm.FSMController(this, 'buttons_fsm', buttons_fsm.Start, this);
  this.time_controller = new fsm.FSMController(this, 'time_fsm', time_fsm.Start, this);
  this.view_controller = new fsm.FSMController(this, 'view_fsm', view_fsm.Start, this);


  //Wire up controllers
  //
  this.controllers = [this.view_controller,
                      this.hotkeys_controller,
                      this.move_controller,
                      this.buttons_controller,
                      this.time_controller];


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

ApplicationScope.prototype.uploadButtonHandler = function (message) {
  console.log(message);
  window.open("/prototype/upload?topology_id=" + this.topology_id, "_top");
};

ApplicationScope.prototype.downloadButtonHandler = function (message) {
  console.log(message);
  window.open("/prototype/download?topology_id=" + this.topology_id, "_blank");
};

ApplicationScope.prototype.send_trace_message = function (message) {
  console.log(message);
};

ApplicationScope.prototype.send_control_message = function (message) {
  console.log(message);
  message.sender = this.client_id;
  message.message_id = this.message_id_seq();
  var data = core_messages.serialize(message);
  console.log(["Sending", message.msg_type, message.sender, message.message_id]);
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
  this.svgFrame.forceUpdate();
};

ApplicationScope.prototype.onMouseDown = function (e) {
  this.first_channel.send('MouseDown', e);
  this.setState({
    cursorPosX: e.pageX,
    cursorPosY: e.pageY,
    mouseX: e.pageX,
    mouseY: e.pageY,
  });

  this.updateScaledXY();

  e.preventDefault();
  this.svgFrame.forceUpdate();
};

ApplicationScope.prototype.onMouseUp = function (e) {
  this.first_channel.send('MouseUp', e);
  this.setState({
    cursorPosX: e.pageX,
    cursorPosY: e.pageY,
    mouseX: e.pageX,
    mouseY: e.pageY,
  });

  this.updateScaledXY();

  e.preventDefault();
  this.svgFrame.forceUpdate();
};

ApplicationScope.prototype.onMouseWheel = function (e) {
  //console.log(e);
  this.first_channel.send("MouseWheel", [e, e.deltaY]);
  e.preventDefault();
  this.svgFrame.forceUpdate();
};

ApplicationScope.prototype.onKeyDown = function (e) {
  this.first_channel.send('KeyDown', e);
  this.setState({
    lastKey: e.key
  });

  e.preventDefault();
  this.svgFrame.forceUpdate();
};

ApplicationScope.prototype.timer = function () {
  this.setState({
    frameNumber: this.state.frameNumber + 1
  });
  this.svgFrame.forceUpdate();
};

ApplicationScope.prototype.onResize = function (e) {
   this.setState({
     frameWidth: window.innerWidth,
     frameHeight: window.innerHeight
   });
  this.svgFrame.forceUpdate();
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

  var path_data = {pathname: '/toplogy_id:' + data.toplogy_id}
  if (this.browser_history.location.pathname !== path_data.pathname) {
    this.browser_history.push(path_data);
  }
};

ApplicationScope.prototype.onClientId = function(data) {
  this.client_id = data;
};


ApplicationScope.prototype.onSnapshot = function (data) {

};

ApplicationScope.prototype.create_inventory_host = function (device) {
  if (this.template_building || device.template) {
    return;
  }
  console.log(device);

  return [];
};
