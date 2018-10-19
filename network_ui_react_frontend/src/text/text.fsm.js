var inherits = require('inherits');
var fsm = require('../fsm.js');

function _Start () {
    this.name = 'Start';
}
inherits(_Start, fsm._State);
var Start = new _Start();
exports.Start = Start;

function _Edit () {
    this.name = 'Edit';
}
inherits(_Edit, fsm._State);
var Edit = new _Edit();
exports.Edit = Edit;

function _Ready () {
    this.name = 'Ready';
}
inherits(_Ready, fsm._State);
var Ready = new _Ready();
exports.Ready = Ready;

function _TextSelected () {
    this.name = 'TextSelected';
}
inherits(_TextSelected, fsm._State);
var TextSelected = new _TextSelected();
exports.TextSelected = TextSelected;




_Start.prototype.start = function (controller) {

    controller.changeState(Ready);

};
_Start.prototype.start.transitions = ['Ready'];


_Edit.prototype.start = function (controller) {
    controller.scope.edit = true;
    controller.scope.selected = true;
    controller.scope.show_cursor = true;
};

_Edit.prototype.end = function (controller) {
    controller.scope.edit = false;
    controller.scope.selected = false;
    controller.scope.show_cursor = false;
};


_Edit.prototype.onMouseDown = function (controller) {

    var x = controller.scope.scope.state.cursorPosX;
    var y = controller.scope.scope.state.cursorPosY;

    if (controller.scope.is_selected(x, y)) {
        if ((window.performance.now() - controller.scope.lastClick) < 500) {
            controller.changeState(TextSelected);
        }
        controller.scope.lastClick = window.performance.now();
    } else {
        controller.changeState(Ready);
    }
};
_Edit.prototype.onMouseDown.transitions = ['TextSelected', 'Ready'];


_Edit.prototype.onKeyDown = function (controller, msg_type, $event) {
    //Key codes found here:
    //https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
	var item = controller.scope;
	if ($event.keyCode === 8 || $event.keyCode === 46) { //Delete
		item.value = item.value.slice(0, -1);
        item.future_update_cursor_pos();
	} else if ($event.keyCode >= 48 && $event.keyCode <=90) { //Alphanumeric
        item.value += $event.key;
        item.future_update_cursor_pos();
	} else if ($event.keyCode >= 186 && $event.keyCode <=222) { //Punctuation
        item.value += $event.key;
        item.future_update_cursor_pos();
	} else if ($event.keyCode === 13) { //Enter
        controller.changeState(Ready);
    }
};
_Edit.prototype.onKeyDown.transitions = ['Ready'];

_Edit.prototype.onUpdateCursor = function (controller) {
    controller.scope.update_cursor_pos();
};

_Ready.prototype.onMouseDown = function (controller) {

    var x = controller.scope.scope.state.cursorPosX;
    var y = controller.scope.scope.state.cursorPosY;

    if (controller.scope.is_selected(x, y)) {
        controller.changeState(Edit);
    }
};
_Ready.prototype.onMouseDown.transitions = ['Edit'];

_Ready.prototype.onUpdateCursor = function (controller) {
    controller.scope.update_cursor_pos();
};


_TextSelected.prototype.start = function (controller) {
    controller.scope.edit = true;
    controller.scope.selected = true;
    controller.scope.text_selected = true;
    controller.scope.show_cursor = false;
};

_TextSelected.prototype.end = function (controller) {
    controller.scope.edit = false;
    controller.scope.selected = false;
    controller.scope.text_selected = false;
    controller.scope.show_cursor = false;
};

_TextSelected.prototype.onMouseDown = function (controller) {

    controller.changeState(Edit);
};
_TextSelected.prototype.onMouseDown.transitions = ['Edit'];

_TextSelected.prototype.onKeyDown = function (controller, msg_type, $event) {
    controller.scope.value = "";
    controller.scope.future_update_cursor_pos();
    controller.changeState(Edit);
    controller.handle_message("KeyDown", $event);
};
_TextSelected.prototype.onKeyDown.transitions = ['Edit'];



