var inherits = require('inherits');
var fsm = require('../fsm.js');
var messages = require('./messages.js');
var core_messages = require('../core/messages.js');

function _State () {
}
inherits(_State, fsm._State);


function _NotRecording () {
    this.name = 'NotRecording';
}
inherits(_NotRecording, _State);
var NotRecording = new _NotRecording();
exports.NotRecording = NotRecording;

function _Recording () {
    this.name = 'Recording';
}
inherits(_Recording, _State);
var Recording = new _Recording();
exports.Recording = Recording;

function _Start () {
    this.name = 'Start';
}
inherits(_Start, _State);
var Start = new _Start();
exports.Start = Start;

function _Ready () {
    this.name = 'Ready';
}
inherits(_Ready, _State);
var Ready = new _Ready();
exports.Ready = Ready;




_Recording.prototype.start = function (controller) {

  var scope = controller.scope;
  scope.trace_id = scope.trace_id_seq();
  scope.send_control_message(new core_messages.MultipleMessage(scope.client_id,
                                                           [new messages.StartRecording(scope.client_id, scope.trace_id),
                                                            new messages.ViewPort(scope.client_id,
                                                                                  scope.current_scale,
                                                                                  scope.panX,
                                                                                  scope.panY,
                                                                                  scope.trace_id),
                                                            new messages.Snapshot(scope.client_id,
                                                                                  scope.devices,
                                                                                  scope.links,
                                                                                  scope.groups,
                                                                                  0,
                                                                                  scope.trace_id)]));
};

_Recording.prototype.end = function (controller) {
  var scope = controller.scope;
  scope.send_control_message(new core_messages.MultipleMessage(scope.client_id,
                                                           [new messages.Snapshot(scope.client_id,
                                                                                  scope.devices,
                                                                                  scope.links,
                                                                                  scope.groups,
                                                                                  1,
                                                                                  scope.trace_id),
                                                            new messages.StopRecording(scope.client_id, scope.trace_id)]));
};


_Recording.prototype.onPageClose = function (controller) {

    controller.changeState(NotRecording);
};
_Recording.prototype.onPageClose.transitions = ['NotRecording'];

_Recording.prototype.onMouseEvent = function (controller, msg_type, $event) {

  controller.scope.send_control_message(new messages.MouseEvent(controller.scope.client_id,
                                                                     $event.pageX,
                                                                     $event.pageY,
                                                                     $event.type,
                                                                     controller.scope.trace_id));
  controller.delegate_channel.send(msg_type, $event);
};

_Recording.prototype.onMouseUp = _Recording.prototype.onMouseEvent;
_Recording.prototype.onMouseDown = _Recording.prototype.onMouseEvent;
_Recording.prototype.onMouseMove = _Recording.prototype.onMouseEvent;
_Recording.prototype.onMouseLeave = _Recording.prototype.onMouseEvent;
_Recording.prototype.onMouseEnter = _Recording.prototype.onMouseEvent;
_Recording.prototype.onMouseOver = _Recording.prototype.onMouseEvent;


_Recording.prototype.onMouseWheel = function (controller, msg_type, $event) {
  var deltaX = $event[0];
  var deltaY = $event[1];
  controller.scope.send_control_message(new messages.MouseWheelEvent(controller.scope.client_id,
                                                                     deltaX,
                                                                     deltaY,
                                                                     'mousewheel',
                                                                     controller.scope.trace_id));
  controller.delegate_channel.send(msg_type, $event);
};

_Start.prototype.start = function (controller) {

    controller.changeState(Ready);

};
_Start.prototype.start.transitions = ['Ready'];

_Ready.prototype.start = function (controller) {

  if (controller.scope.disconnected) {
    controller.changeState(Recording);
  }
};
_Ready.prototype.start.transitions = ['Recording'];


_Ready.prototype.onSnapshotLoaded = function (controller, msg_type, $event) {

  controller.changeState(Recording);
  controller.delegate_channel.send(msg_type, $event);
};
_Ready.prototype.onSnapshotLoaded.transitions = ['Recording'];

