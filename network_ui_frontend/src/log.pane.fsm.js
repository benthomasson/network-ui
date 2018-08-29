var inherits = require('inherits');
var fsm = require('./fsm.js');

function _State () {
}
inherits(_State, fsm._State);


function _Visible () {
    this.name = 'Visible';
}
inherits(_Visible, _State);
var Visible = new _Visible();
exports.Visible = Visible;

function _Hidden () {
    this.name = 'Hidden';
}
inherits(_Hidden, _State);
var Hidden = new _Hidden();
exports.Hidden = Hidden;

function _Start () {
    this.name = 'Start';
}
inherits(_Start, _State);
var Start = new _Start();
exports.Start = Start;

function _Playbook () {
    this.name = 'Playbook';
}
inherits(_Playbook, _State);
var Playbook = new _Playbook();
exports.Playbook = Playbook;


_Visible.prototype.start = function (controller) {

    controller.scope.hidden = false;
};

_Visible.prototype.onMouseMove = function (controller, msg_type, $event) {

    if (!controller.scope.is_selected(controller.scope.scope.mouseX,
                                      controller.scope.scope.mouseY)) {
        controller.changeState(Hidden);
    }

    controller.delegate_channel.send(msg_type, $event);
};
_Visible.prototype.onMouseMove.transitions = ['Hidden'];

var onMouseWheel = function (controller, msg_type, $event) {

    var delta = $event[1];
    if (delta < 0) {
        controller.scope.log_offset = Math.max(controller.scope.log_offset - 10, controller.scope.target.log.length * -12);
    }
    if (delta > 0) {
        controller.scope.log_offset = Math.min(controller.scope.log_offset + 10, 0);
    }
};
_Visible.prototype.onMouseWheel = onMouseWheel;


_Hidden.prototype.start = function (controller) {

    controller.scope.hidden = true;
};

_Hidden.prototype.onMouseOver = function (controller) {

    controller.changeState(Playbook);
};
_Hidden.prototype.onMouseOver.transitions = ['Visible'];


_Start.prototype.start = function (controller) {

    controller.changeState(Hidden);

};
_Start.prototype.start.transitions = ['Hidden'];



_Playbook.prototype.start = function (controller) {

    controller.scope.hidden = false;
};

_Playbook.prototype.onMouseOut = function (controller, msg_type, $event) {

    if (controller.scope.is_selected(controller.scope.scope.mouseX,
                                      controller.scope.scope.mouseY)) {
        controller.changeState(Visible);
    } else {
        controller.changeState(Hidden);
    }

    controller.delegate_channel.send(msg_type, $event);
};
_Playbook.prototype.onMouseOut.transitions = ['Visible'];

_Playbook.prototype.onMouseWheel = onMouseWheel;
