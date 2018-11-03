
var util = require('../util.js');
var fsm = require('../fsm.js');
var animation_fsm = require('./animation.fsm.js');


function Animation(id, delay, steps, data, scope, tracer, callback, completed_callback, cancelled_callback) {

    this.id = id;
    this.steps = steps;
    this.delay = delay;
    this.active = true;
    this.frame_number_seq = util.natural_numbers(-1);
    this.frame_number = 0;
    this.data = data;
    this.callback = callback;
    this.completed_callback = completed_callback;
    this.cancelled_callback = cancelled_callback;
    this.scope = scope;
    this.interval = null;
    this.fsm = new fsm.FSMController(this, "animation_fsm", animation_fsm.Start, tracer);
}
exports.Animation = Animation;
