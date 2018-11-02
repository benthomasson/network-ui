
var fsm = require('../fsm.js');
var immutable = require('immutable');
var button_fsm = require('../button/button.fsm.js');


function Playbook(id, name) {
    this.id = id;
    this.name = name;
    this.log = immutable.List([]);
    this.plays = [];
    this.plays_by_id = {};
    this.working = null;
    this.status = null;
}
exports.Playbook = Playbook;

function Play(id, name) {
    this.id = id;
    this.name = name;
    this.tasks = [];
    this.tasks_by_id = {};
    this.working = null;
    this.status = null;
}
exports.Play = Play;

function Task(id, name) {
    this.id = id;
    this.name = name;
    this.working = null;
    this.status = null;
}
exports.Task = Task;

function PlayStatus(log_pane, tracer) {
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;
    this.target = null;
    this.hidden = true;
    this.log_pane = log_pane;
    this.playbooks = [];
    this.enabled = true;
    this.callback = function () {
        console.log("clicky");
    };
    this.mouse_over_callback = function () {
        if (this.playbooks.length > 0) {
            this.log_pane.fsm.handle_message('MouseOver');
        }
    };
    this.mouse_out_callback = function () {
        this.log_pane.fsm.handle_message('MouseOut');
    };
    this.is_pressed = false;
    this.mouse_over = false;
    this.fsm = new fsm.FSMController(this, "button_fsm", button_fsm.Start, tracer);
}
exports.PlayStatus = PlayStatus;

PlayStatus.prototype.update_height = function () {

    this.height = this.playbooks.length * 24;
};

PlayStatus.prototype.update_size = function ($window) {

    this.x = 100;
    this.y = 100;
};

PlayStatus.prototype.is_selected = function (x, y) {

    return (x > this.x &&
            x < this.x + this.width &&
            y > this.y &&
            y < this.y + this.height);
};
