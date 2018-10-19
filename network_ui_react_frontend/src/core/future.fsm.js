var inherits = require('inherits');
var fsm = require('../fsm.js');

function _State () {
}
inherits(_State, fsm._State);


function _Ready () {
    this.name = 'Ready';
}
inherits(_Ready, _State);
var Ready = new _Ready();
exports.Ready = Ready;

function _Start () {
    this.name = 'Start';
}
inherits(_Start, _State);
var Start = new _Start();
exports.Start = Start;






_Start.prototype.start = function (controller) {

    controller.changeState(Ready);

};
_Start.prototype.start.transitions = ['Ready'];

_Ready.prototype.onUpdateCursor = function (controller, msg_type, message) {
  controller.scope.update_cursor_pos(message.id, message.object, message.counter);
};
