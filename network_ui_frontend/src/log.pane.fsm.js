var inherits = require('inherits');
var fsm = require('./fsm.js');

function _State () {
}
inherits(_State, fsm._State);


function _Hidden () {
    this.name = 'Hidden';
}
inherits(_Hidden, _State);
var Hidden = new _Hidden();
exports.Hidden = Hidden;

function _Scrolling () {
    this.name = 'Scrolling';
}
inherits(_Scrolling, _State);
var Scrolling = new _Scrolling();
exports.Scrolling = Scrolling;

function _Start () {
    this.name = 'Start';
}
inherits(_Start, _State);
var Start = new _Start();
exports.Start = Start;

function _Visible () {
    this.name = 'Visible';
}
inherits(_Visible, _State);
var Visible = new _Visible();
exports.Visible = Visible;




_Hidden.prototype.onMouseMove = function (controller) {

    controller.changeState(Visible);

};
_Hidden.prototype.onMouseMove.transitions = ['Visible'];



_Scrolling.prototype.onMouseWheel = function (controller) {

    controller.changeState(Visible);

};
_Scrolling.prototype.onMouseWheel.transitions = ['Visible'];



_Start.prototype.start = function (controller) {

    controller.changeState(Hidden);

};
_Start.prototype.start.transitions = ['Hidden'];



_Visible.prototype.onMouseDown = function (controller) {

    controller.changeState(Hidden);

};
_Visible.prototype.onMouseDown.transitions = ['Hidden'];

_Visible.prototype.onMouseMove = function (controller) {

    controller.changeState(Hidden);

};
_Visible.prototype.onMouseMove.transitions = ['Hidden'];

_Visible.prototype.onMouseWheel = function (controller) {

    controller.changeState(Scrolling);

};
_Visible.prototype.onMouseWheel.transitions = ['Scrolling'];

