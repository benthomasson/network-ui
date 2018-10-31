var fsm = require('../fsm.js');
var button = require('./button.fsm.js');
var util = require('../util.js');

function Button(label, x, y, width, height, callback, tracer) {
    this.label = label;
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
    this.fsm = new fsm.FSMController(this, 'button_fsm', button.Start, tracer);
}
exports.Button = Button;

Button.prototype.is_selected = util.rectangle_is_selected;
