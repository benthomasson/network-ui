

var fsm = require('../fsm.js');
var util = require('../util.js');
var button = require('../button/button.fsm.js');

function ActionIcon(name, x, y, r, callback, enabled, tracer) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.r = r;
    this.mouse_over_callback = util.noop;
    this.mouse_out_callback = util.noop;
    this.callback = callback;
    this.is_pressed = false;
    this.mouse_over = false;
    this.enabled = enabled;
    this.fsm = new fsm.FSMController(this, "button_fsm", enabled ? button.Start : button.Disabled, tracer);
}
exports.ActionIcon = ActionIcon;

ActionIcon.prototype.is_selected = function (x, y) {

    return (x > this.x - this.r &&
            x < this.x + this.r &&
            y > this.y - this.r &&
            y < this.y + this.r);

};


function ToolBox(id, name, type, x, y, width, height) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.items = [];
    this.spacing = 200;
    this.scroll_offset = 0;
    this.selected_item = null;
    this.enabled = true;
}
exports.ToolBox = ToolBox;
