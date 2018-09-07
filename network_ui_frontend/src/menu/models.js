
var fsm = require('../fsm.js');
var util = require('../util.js');
var button = require('../button/button.fsm.js');

function ContextMenu(name, x, y, width, height, callback, enabled, buttons, tracer) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mouse_over_callback = util.noop;
    this.mouse_out_callback = util.noop;
    this.callback = callback;
    this.is_pressed = false;
    this.mouse_over = false;
    this.enabled = false;
    this.buttons = buttons;
    this.fsm = new fsm.FSMController(this, "button_fsm", enabled ? button.Start : button.Disabled, tracer);
}
exports.ContextMenu = ContextMenu;


ContextMenu.prototype.is_selected = function (x, y) {

    return (x > this.x &&
            x < this.x + this.width &&
            y > this.y &&
            y < this.y + this.height);

};

function ContextMenuButton(name, x, y, width, height, callback, tracer) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mouse_over_callback = util.noop;
    this.mouse_out_callback = util.noop;
    this.callback = callback;
    this.is_pressed = false;
    this.mouse_over = false;
    this.enabled = true;
    this.fsm = new fsm.FSMController(this, "button_fsm", button.Start, tracer);
}
exports.ContextMenuButton = ContextMenuButton;


ContextMenuButton.prototype.is_selected = function (x, y) {

    return (x > this.x &&
            x < this.x + this.width &&
            y > this.y &&
            y < this.y + this.height);

};
