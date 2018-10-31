
var util = require('../util.js');


function LogPane(scope) {

    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;
    this.target = null;
    this.hidden = true;
    this.callback = util.noop;
    this.log_offset = 0;
    this.scope = scope;
    this.fsm = null;
}
exports.LogPane = LogPane;

LogPane.prototype.update_size = function ($window) {

    this.x = 100;
    this.y = 100;
    this.width = $window.innerWidth - 400;
    this.height = $window.innerHeight - 200;
};

LogPane.prototype.is_selected = function (x, y) {

  console.log([x,y, this.x, this.y]);

    return (x > this.x &&
            x < this.x + this.width &&
            y > this.y &&
            y < this.y + this.height);
};
