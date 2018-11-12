var inherits = require('inherits');
var fsm = require('../fsm.js');
var monitor_models = require('./models.js');
var core_models = require('../core/models.js');
var util = require('../util.js');
var core_animations = require('../core/animations.js');
var immutable = require('immutable');

function _State () {
}
inherits(_State, fsm._State);


function _Start () {
    this.name = 'Start';
}
inherits(_Start, _State);
var Start = new _Start();
exports.Start = Start;

function _Ready () {
    this.name = 'Ready';
}
inherits(_Ready, _State);
var Ready = new _Ready();
exports.Ready = Ready;




_Start.prototype.start = function (controller) {

    controller.changeState(Ready);

};
_Start.prototype.start.transitions = ['Ready'];

_Ready.prototype.onPlaybook = function(controller, msg_type, message) {

  var i = 0;
  var device = null;
  var j = 0;
  var task = null;
  for(i=0; i < controller.scope.devices.length; i++) {
    device = controller.scope.devices[i];
    device.tasks = device.tasks.clear();
    device.tasks_by_name = device.tasks_by_name.clear();
    for(j=0; j < message.tasks.length ; j++) {
      task = new monitor_models.Task(j, message.tasks[j]);
      device.tasks_by_name = device.tasks_by_name.set(message.tasks[j], task);
      device.tasks = device.tasks.push(task);
    }
  }
};

_Ready.prototype.onRunner = function(controller, msg_type, message) {

    console.log(message);
    var new_playbook = null;
    var playbook = null;
    var new_play = null;
    var play = null;
    var new_task = null;
    var task = null;
    var device = null;

    if (message.event === "playbook_on_start") {
        if (controller.scope.playbooks_by_name.has(message.event_data.playbook)) {
          new_playbook = controller.scope.playbooks_by_name.get(message.event_data.playbook);
          new_playbook.id = message.event_data.playbook_uuid;
          controller.scope.playbooks_by_name.delete(message.event_data.playbook);
        } else {
          new_playbook = new monitor_models.Playbook(message.event_data.playbook_uuid,
                                                     message.event_data.playbook);
          controller.scope.playbooks.push(new_playbook);
          controller.scope.play_status.playbooks.push(new_playbook);
        }
        new_playbook.working = true;
        controller.scope.playbook_animation = new core_models.Animation(controller.scope.animation_id_seq(),
                                                                        17,
                                                                        -1,
                                                                        {},
                                                                        controller.scope,
                                                                        controller.scope.playbook_status,
                                                                        controller.scope,
                                                                        core_animations.set_frame_animation);
        controller.scope.playbooks_by_id[new_playbook.id] = new_playbook;
        controller.scope.log_pane.target = new_playbook;
        controller.scope.play_status.update_height();
    }
    if (message.event === "playbook_on_play_start") {
        playbook = controller.scope.playbooks_by_id[message.event_data.playbook_uuid];
        playbook.log = playbook.log.concat(util.split_new_lines(message.stdout));
        new_play = new monitor_models.Play(message.event_data.play_uuid,
                                   message.event_data.play);
        playbook.plays.push(new_play);
        playbook.plays_by_id[new_play.id] = new_play;
    }
    if (message.event === "playbook_on_task_start") {
        playbook = controller.scope.playbooks_by_id[message.event_data.playbook_uuid];
        playbook.log = playbook.log.concat(util.split_new_lines(message.stdout));
        play = playbook.plays_by_id[message.event_data.play_uuid];
    }
    if (message.event === "runner_on_ok") {
        playbook = controller.scope.playbooks_by_id[message.event_data.playbook_uuid];
        playbook.log = playbook.log.concat(util.split_new_lines(message.stdout));
        var i = 0;
        for(i=0; i < controller.scope.devices.length; i++) {
            device = controller.scope.devices[i];
            if (device.name === message.event_data.remote_addr) {
                if (device.tasks_by_name.has(message.event_data.task)) {
                  task = device.tasks_by_name.get(message.event_data.task);
                  task.status = true;
                  task.id = message.event_data.task_uuid;
                  device.status = true;
                  device.modification = device.mod_seq();
                } else {
                  task = new monitor_models.Task(message.event_data.task_uuid,
                                                     message.event_data.task);
                  task.status = true;
                  device.status = true;
                  device.tasks = device.tasks.push(task);
                }
            }
        }
    }
    if (message.event === "runner_on_failed" || message.event === "runner_on_unreachable") {
        playbook = controller.scope.playbooks_by_id[message.event_data.playbook_uuid];
        playbook.log = playbook.log.concat(util.split_new_lines(message.stdout));
        var i = 0;
        for(i=0; i < controller.scope.devices.length; i++) {
            device = controller.scope.devices[i];
            if (device.name === message.event_data.remote_addr) {
                if (device.tasks_by_name.has(message.event_data.task)) {
                  task = device.tasks_by_name.get(message.event_data.task);
                  task.status = false;
                  task.id = message.event_data.task_uuid;
                  device.status = false;
                  device.modification = device.mod_seq();
                } else {
                  task = new monitor_models.Task(message.event_data.task_uuid,
                                                     message.event_data.task);
                  task.status = false;
                  device.status = false;
                  device.tasks = device.tasks.push(task);
                }
            }
        }
    }
    if (message.event === "playbook_on_stats") {
        playbook = controller.scope.playbooks_by_id[message.event_data.playbook_uuid];
        playbook.log = playbook.log.concat(util.split_new_lines(message.stdout));
        playbook.working = false;
        if (controller.scope.playbook_animation !== null) {
          controller.scope.playbook_animation.fsm.handle_message('AnimationWindDown', {wind_down_steps: 10});
        }
        if (Object.keys(message.event_data.failures).length === 0) {
            playbook.status = true;
        } else {
            playbook.status = false;
        }
    }
};
