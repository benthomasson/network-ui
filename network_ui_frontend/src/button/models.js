
var inherits = require('inherits');
var button = require('./button.fsm.js');
var util = require('../util.js');
var fsm = require('../fsm.js');

function Button(name, x, y, width, height, callback, tracer) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.callback = callback;
    this.mouse_over_callback = util.noop;
    this.mouse_out_callback = util.noop;
    this.is_pressed = false;
    this.mouse_over = false;
    this.enabled = true;
    this.fsm = new fsm.FSMController(this, "button_fsm", button.Start, tracer);
}
exports.Button = Button;


Button.prototype.is_selected = function (x, y) {

    return (x > this.x &&
            x < this.x + this.width &&
            y > this.y &&
            y < this.y + this.height);

};


function ToggleButton(name, x, y, width, height, toggle_callback, untoggle_callback, default_toggled, tracer) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mouse_over_callback = util.noop;
    this.mouse_out_callback = util.noop;
    this.callback = this.toggle;
    this.is_pressed = default_toggled;
    this.toggled = default_toggled;
    this.toggle_callback = toggle_callback;
    this.untoggle_callback = untoggle_callback;
    this.mouse_over = false;
    this.enabled = true;
    this.fsm = new fsm.FSMController(this, "button_fsm", button.Start, tracer);
}
inherits(ToggleButton, Button);
exports.ToggleButton = ToggleButton;

ToggleButton.prototype.toggle = function () {
    this.toggled = !this.toggled;
    this.is_pressed = this.toggled;

    if (this.toggled) {
        this.toggle_callback();
    } else {
        this.untoggle_callback();
    }
};
