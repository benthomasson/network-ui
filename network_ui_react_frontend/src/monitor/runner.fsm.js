var inherits = require('inherits');
var fsm = require('../fsm.js');
var monitor_models = require('./models.js');
var util = require('../util.js');

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


_Ready.prototype.onRunner = function(controller, msg_type, message) {

    console.log(message);
    var new_playbook = null;
    var playbook = null;
    var new_play = null;
    var play = null;
    var new_task = null;
    var task = null;

    if (message.event === "playbook_on_start") {
        new_playbook = new monitor_models.Playbook(message.event_data.playbook_uuid,
                                           message.event_data.playbook);
        new_playbook.working = true;
        controller.scope.playbooks.push(new_playbook);
        controller.scope.playbooks_by_id[new_playbook.id] = new_playbook;
        controller.scope.log_pane.target = new_playbook;
        controller.scope.play_status.playbooks.push(new_playbook);
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
        new_task = new monitor_models.Task(message.event_data.task_uuid,
                                           message.event_data.task);
        play.tasks.push(new_task);
        play.tasks_by_id[new_task.id] = new_task;
    }
    if (message.event === "runner_on_ok") {
        playbook = controller.scope.playbooks_by_id[message.event_data.playbook_uuid];
        playbook.log = playbook.log.concat(util.split_new_lines(message.stdout));
        play = playbook.plays_by_id[message.event_data.play_uuid];
        task = play.tasks_by_id[message.event_data.task_uuid];
        task.status = true;
        var i = 0;
        for(i=0; i < controller.scope.devices.length; i++) {
            if (controller.scope.devices[i].name === message.event_data.remote_addr) {
                controller.scope.devices[i].status = true;
                controller.scope.devices[i].tasks.push(task);
            }
        }
    }
    if (message.event === "playbook_on_stats") {
        playbook = controller.scope.playbooks_by_id[message.event_data.playbook_uuid];
        playbook.log = playbook.log.concat(util.split_new_lines(message.stdout));
        playbook.working = false;
        if (Object.keys(message.event_data.failures).length === 0) {
            playbook.status = true;
        } else {
            playbook.status = false;
        }
    }
};
