/* Copyright (c) 2017 Red Hat, Inc. */
var inherits = require('inherits');
var fsm = require('./fsm.js');

function _State () {
}
inherits(_State, fsm._State);

function _Ready () {
    this.name = 'Ready';
}
inherits(_Ready, _State);
var Ready = new _Ready();
exports.Ready = Ready;

function _MouseOver () {
    this.name = 'MouseOver';
}
inherits(_MouseOver, _State);
var MouseOver = new _MouseOver();
exports.MouseOver = MouseOver;

function _Start () {
    this.name = 'Start';
}
inherits(_Start, _State);
var Start = new _Start();
exports.Start = Start;

function _Clicked () {
    this.name = 'Clicked';
}
inherits(_Clicked, _State);
var Clicked = new _Clicked();
exports.Clicked = Clicked;

function _Pressed () {
    this.name = 'Pressed';
}
inherits(_Pressed, _State);
var Pressed = new _Pressed();
exports.Pressed = Pressed;
function _Disabled () {
    this.name = 'Disabled';
}
inherits(_Disabled, _State);
var Disabled = new _Disabled();
exports.Disabled = Disabled;



// Begin ready state
_Ready.prototype.onMouseDown = function (controller) {

    controller.changeState(Pressed);

};
_Ready.prototype.onMouseDown.transitions = ['Pressed'];

_Ready.prototype.start = function (controller) {

    controller.scope.enabled = true;
};

_Ready.prototype.onMouseOver = function (controller) {

    controller.changeState(MouseOver);
};
_Ready.prototype.onMouseOver.transitions = ['MouseOver'];


_Ready.prototype.onDisable = function (controller) {

    controller.changeState(Disabled);

};
_Ready.prototype.onDisable.transitions = ['Disabled'];
// end ready state


_MouseOver.prototype.start = function (controller) {
    controller.scope.mouse_over = true;
    controller.scope.mouse_over_callback(controller.scope);
};

_MouseOver.prototype.onMouseDown = function (controller) {

    controller.changeState(Pressed);
};
_MouseOver.prototype.onMouseDown.transitions = ['Pressed'];

_MouseOver.prototype.onMouseOut = function (controller) {

    controller.changeState(Ready);
};
_MouseOver.prototype.onMouseOut.transitions = ['MouseOver'];

_MouseOver.prototype.end = function (controller) {
    controller.scope.mouse_over = false;
    controller.scope.mouse_out_callback(controller.scope);
};

_Start.prototype.start = function (controller) {

    controller.changeState(Ready);
};
_Start.prototype.start.transitions = ['Ready'];


_Clicked.prototype.start = function (controller) {

    controller.scope.is_pressed = false;
    controller.changeState(Ready);
    controller.scope.callback(controller.scope);
};
_Clicked.prototype.start.transitions = ['Ready'];


_Pressed.prototype.start = function (controller) {
    controller.scope.is_pressed = true;
};

_Pressed.prototype.onMouseUp = function (controller) {

    controller.changeState(Clicked);

};
_Pressed.prototype.onMouseUp.transitions = ['Clicked'];

_Disabled.prototype.onEnable = function (controller) {

    controller.changeState(Ready);

};
_Disabled.prototype.onEnable.transitions = ['Ready'];

_Disabled.prototype.start = function (controller) {

    controller.scope.enabled = false;

};
