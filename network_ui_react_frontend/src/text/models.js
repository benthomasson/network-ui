var fsm = require('../fsm.js');
var util = require('../util.js');
var text_fsm = require('./text.fsm.js');

function TextInput(id, value, scope, tracer) {
    this.lastClick = window.performance.now();
    this.scope = scope;
    this.x = 400;
    this.y = 400;
    this.id = id;
    this.width = 100;
    this.height = 20;
    this.value = value;
    this.pre_cursor_value = value;
    this.post_cursor_value = '';
    this.tracer = tracer;
    this.edit = false;
    this.selected = false;
    this.text_selected = false;
    this.cursor_pos = 0;
    this.show_cursor = false;
    this.update_cursor_pos();
    this.fsm = new fsm.FSMController(this, "text_fsm", text_fsm.Start, tracer);
}
exports.TextInput = TextInput;

TextInput.prototype.future_update_cursor_pos = function() {
    this.scope.future_messages.push(['UpdateCursor', {}]);
};

TextInput.prototype.update_cursor_pos = function() {

    var textInput = document.getElementById('text_' + this.id);
    if (textInput !== null) {
        var width = textInput.getBBox().width;
        this.cursor_pos = width + 6;
        this.width = width + 16;
    } else {
        this.scope.future_messages.push(['UpdateCursor', {}]);
    }
};

TextInput.prototype.is_selected = function(x, y) {
    console.log([x, y]);
    console.log(util.rectangle_is_selected(this, x, y));
    return util.rectangle_is_selected(this, x, y);
};
