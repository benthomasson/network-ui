/* Copyright (c) 2017 Red Hat, Inc. */
var inherits = require('inherits');
var fsm = require('../fsm.js');

function _State () {
}
inherits(_State, fsm._State);


function _Enabled () {
    this.name = 'Enabled';
}
inherits(_Enabled, _State);
var Enabled = new _Enabled();
exports.Enabled = Enabled;

function _Start () {
    this.name = 'Start';
}
inherits(_Start, _State);
var Start = new _Start();
exports.Start = Start;

function _Disabled () {
    this.name = 'Disabled';
}
inherits(_Disabled, _State);
var Disabled = new _Disabled();
exports.Disabled = Disabled;


_Enabled.prototype.onDisable = function (controller) {

    controller.changeState(Disabled);
};
_Enabled.prototype.onDisable.transitions = ['Disabled'];


_Enabled.prototype.onKeyDown = function(controller, msg_type, $event) {

	var scope = controller.scope;

    if ($event.key === 'd') {
        scope.setState({
          showDebug: !scope.state.showDebug,
        });
        return;
    }
    if ($event.key === 'h') {
        scope.setState({
          showHelp: !scope.state.showHelp
        });
        return;
    }
    else if ($event.key === 'p') {
        scope.setState({
          showCursor: !scope.state.showCursor
        });
        return;
    }
    else if ($event.key === 'b') {
        scope.setState({
          showButtons: !scope.state.showButtons
        });
        return;
    }
    else if ($event.key === '0') {
        scope.setState({
          panX: 0,
          panY: 0,
          current_scale: 1.0
        });
    }

	controller.delegate_channel.send(msg_type, $event);
};

_Start.prototype.start = function (controller) {

    controller.changeState(Enabled);

};
_Start.prototype.start.transitions = ['Enabled'];



_Disabled.prototype.onEnable = function (controller) {

    controller.changeState(Enabled);

};
_Disabled.prototype.onEnable.transitions = ['Enabled'];


