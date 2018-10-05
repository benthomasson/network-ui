var inherits = require('inherits');
var fsm = require('../fsm.js');
var messages = require('./messages.js');

function _State () {
}
inherits(_State, fsm._State);


function _Completed () {
    this.name = 'Completed';
}
inherits(_Completed, _State);
var Completed = new _Completed();
exports.Completed = Completed;

function _Start () {
    this.name = 'Start';
}
inherits(_Start, _State);
var Start = new _Start();
exports.Start = Start;

function _Running () {
    this.name = 'Running';
}
inherits(_Running, _State);
var Running = new _Running();
exports.Running = Running;

function _Ready () {
    this.name = 'Ready';
}
inherits(_Ready, _State);
var Ready = new _Ready();
exports.Ready = Ready;


_Completed.prototype.start = function (controller) {

    controller.changeState(Ready);

};
_Completed.prototype.start.transitions = ['Completed'];


_Start.prototype.start = function (controller) {

    controller.changeState(Ready);

};
_Start.prototype.start.transitions = ['Completed'];


_Running.prototype.start = function (controller) {

  controller.scope.onSnapshot(controller.scope.current_replay.snapshots[0]);
  controller.scope.replay = true;
  controller.scope.disconnected = true;
  controller.scope.showCursor = true;
  controller.scope.replay_events = controller.scope.current_replay.event_trace.slice();
  controller.scope.replay_events.push(new messages.ReplayCompleted());
  controller.scope.reset_flags();
  controller.scope.reset_fsm_state();
  controller.scope.reset_history();
  controller.scope.replayInterval = setInterval(controller.scope.run_replay_events, 10);
};

_Running.prototype.end = function (controller) {

  clearInterval(controller.scope.replayInterval);
};

_Running.prototype.onReplayCompleted = function (controller) {

    controller.changeState(Completed);
};
_Running.prototype.onReplayCompleted.transitions = ['Completed'];


_Ready.prototype.onReplay = function (controller, msg_type, message) {

  controller.scope.current_replay = JSON.parse(message.replay_data);
  controller.changeState(Running);
};
_Ready.prototype.start.transitions = ['Loading'];
