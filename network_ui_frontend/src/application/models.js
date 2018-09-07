
var util = require('../util.js');


function Process(id, name, type, x, y) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    this.size = 50;
    this.selected = null;
    this.enabled = true;
    this.icon = false;
    this.device = null;
}
exports.Process = Process;

Process.prototype.toJSON = function () {
    return {id: this.id,
            name: this.name};
};

function Stream(id, from_device, to_device, label) {
    this.id = id;
    this.from_device = from_device;
    this.to_device = to_device;
    this.selected = false;
    this.remote_selected = false;
    this.label = label;
    this.offset = 0;
}
exports.Stream = Stream;

Stream.prototype.toJSON = function () {
    return {to_device: this.to_device.id,
            from_device: this.from_device.id};
};

Stream.prototype.slope_rad = function () {
    //Return the slope in radians for this transition.
    var x1 = this.from_device.x;
    var y1 = this.from_device.y;
    var x2 = this.to_device.x;
    var y2 = this.to_device.y;
    return Math.atan2(y2 - y1, x2 - x1) + Math.PI;
};

Stream.prototype.slope = function () {
    //Return the slope in degrees for this transition.
    var x1 = this.from_device.x;
    var y1 = this.from_device.y;
    var x2 = this.to_device.x;
    var y2 = this.to_device.y;
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 180;
};

Stream.prototype.flip_text_rotate = function () {
    var slope = this.slope();
    if (slope > 90 && slope < 270) {
        return 180;
    } else {
        return 0;
    }
};

Stream.prototype.flip_text_offset = function () {
    var slope = this.slope();
    if (slope > 90 && slope < 270) {
        return 10;
    } else {
        return 0;
    }
};

Stream.prototype.pslope = function () {
    //Return the slope of a perpendicular line to this
    //transition
    var x1 = this.from_device.x;
    var y1 = this.from_device.y;
    var x2 = this.to_device.x;
    var y2 = this.to_device.y;
    var slope = (y2 - y1)/(x2 - x1);
    //var intercept = - slope * x1;
    var pslope = 1/slope;
    return Math.atan(pslope)  * 180 / Math.PI + 180;
};

Stream.prototype.perpendicular = function (x, y) {
    //Find the perpendicular line through x, y to this transition.
    var x1 = this.from_device.x;
    var y1 = this.from_device.y;
    var x2 = this.to_device.x;
    var y2 = this.to_device.y;
    var slope = (y2 - y1)/(x2 - x1);
    var intercept = y1 - slope * x1;
    var pslope = -1/slope;
    var pintercept = y - pslope * x;

    var xi = (pintercept - intercept) / (slope - pslope);
    var yi = pslope * xi + pintercept;
    return {x1:x, y1:y, x2: xi, y2: yi};
};

Stream.prototype.is_selected = function (x, y) {
    // Is the distance to the mouse location less than 25 if on the label side
    // or 5 on the other from the shortest line to the transition?
    console.log("is_selected");
    var phi = this.slope_rad();
    console.log({"phi": phi});
    console.log({'x': this.from_device.x, 'y': this.from_device.y});
    console.log({'x': this.to_device.x, 'y': this.to_device.y});
    console.log({'x': x, 'y': y});
    var p1 = util.cartesianToPolar(this.from_device.x, this.from_device.y);
    var p2 = util.cartesianToPolar(this.to_device.x, this.to_device.y);
    var p3 = util.cartesianToPolar(x, y);
    console.log(p1);
    p1.theta -= phi;
    console.log(p1);
    console.log(p2);
    p2.theta -= phi;
    console.log(p2);
    p3.theta -= phi;

    p1 = util.polarToCartesian_rad(0, 0, p1.r, p1.theta);
    p2 = util.polarToCartesian_rad(0, 0, p2.r, p2.theta);
    p3 = util.polarToCartesian_rad(0, 0, p3.r, p3.theta);
    p2.y -= this.arc_offset2();
    console.log(p1);
    console.log(p2);
    console.log(p3);
    var max_x = Math.max(p1.x, p2.x);
    var min_x = Math.min(p1.x, p2.x);
    var max_y = Math.max(p1.y, p2.y) + 5;
    var min_y = Math.min(p1.y, p2.y) - 25 ;

    return p3.x > min_x && p3.x < max_x && p3.y > min_y && p3.y < max_y;
};

Stream.prototype.length = function () {
    //Return the length of this transition.
    var x1 = this.from_device.x;
    var y1 = this.from_device.y;
    var x2 = this.to_device.x;
    var y2 = this.to_device.y;
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
};


Stream.prototype.inter_length = function () {
    //Return the length of this transition between states.
    return this.length() - this.from_device.size - this.to_device.size;
};

Stream.prototype.arc_r = function () {
    return this.inter_length();
};

Stream.prototype.arc_r2 = function () {
    var offset_to_r = [2, 1, 0.75, 0.6, 0.55, 0.53, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
    return this.length() * offset_to_r[this.offset];
};

Stream.prototype.arc_offset = function () {
    var r = this.arc_r();
    var offset =  r - (Math.sin(this.arc_angle_rad()) * r);
    return offset;
};

Stream.prototype.arc_offset2 = function () {
    var r = this.arc_r2();
    var theta = Math.acos((this.length() / 2) / r);
    var offset =  r * (1 - Math.sin(theta));
    return offset;
};

Stream.prototype.arc_angle_rad = function () {
    return Math.acos((this.inter_length() / 2) / this.arc_r());
};

Stream.prototype.arc_angle_tan_rad = function () {
    return Math.PI/2 - Math.acos((this.inter_length() / 2) / this.arc_r());
};

Stream.prototype.arc_angle_tan = function () {
    return this.arc_angle_tan_rad() * 180 / Math.PI;
};

Stream.prototype.arc_angle_tan_rad2 = function () {
    var r = this.arc_r2();
    var l = this.length();
    var phi = this.end_arc_angle_rad();
    return Math.PI/2 - Math.acos((l/2 - Math.cos(phi) * this.to_device.size) / r);
};

Stream.prototype.arc_angle_tan2 = function () {
    return this.arc_angle_tan_rad2() * 180 / Math.PI;
};

Stream.prototype.end_arc_angle_rad = function () {
    var r = this.arc_r2();
    var l = this.length();
    return Math.acos((this.to_device.size / 2) / r) - Math.acos((l/2)/r);
};

Stream.prototype.end_arc_angle = function () {
    return this.end_arc_angle_rad() * 180 / Math.PI;
};

Stream.prototype.start_arc_angle_rad = function () {
    return Math.acos((this.from_device.size / 2) / this.arc_r2()) - Math.acos((this.length()/2)/this.arc_r2());
};

Stream.prototype.start_arc_angle = function () {
    return this.start_arc_angle_rad() * 180 / Math.PI;
};
