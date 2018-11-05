/* Copyright (c) 2017-2018 Red Hat, Inc. */
var util = require('../util.js');
var immutable = require('immutable');

function Device(id, name, x, y, type, host_id) {
    this.model_type = 'Device';
    this.id = id;
    this.host_id = host_id ? host_id: 0;
    this.name = name;
    this.x = x;
    this.y = y;
    this.height = type === "host" ? 20 : 37.5;
    this.width = 37.5;
    this.size = 37.5;
    this.type = type;
    this.selected = false;
    this.remote_selected = false;
    this.edit_label = false;
    this.status = null;
    this.working = false;
    this.moving = false;
    this.icon = false;
    this.tasks = immutable.List([]);
    this.tasks_by_name = immutable.Map();
    this.shape = type === "router" ? "circular" : "rectangular";
    this.interface_seq = util.natural_numbers(0);
    this.interfaces = [];
    this.process_id_seq = util.natural_numbers(0);
    this.processes = [];
    this.in_group = false;
    this.template = false;
    this.variables = {};
    this.text_width = null;
    this.cursor_pos = null;
    this.modification = 0;
    this.mod_seq = util.natural_numbers(0);
}
exports.Device = Device;

Device.prototype.object_id = function () {
  return this.model_type + "_" + this.id;
};

Device.prototype.toJSON = function () {
    return {id: this.id,
            name: this.name,
            x: this.x,
            y: this.y,
            type: this.type,
            interfaces: this.interfaces.map(function (x) {
                return x.toJSON();
            }),
            processes: this.processes.map(function (x) {
                return x.toJSON();
            })};
};

Device.prototype.is_selected = function (x, y) {

    var text_y = this.type === "host" ? this.y + 30 : this.y + 45;
    var text_x = this.text_width !== null ? this.x - this.text_width / 2 : this.x - this.width / 2;
    var text_width = this.text_width !== null ? this.text_width : this.width;
    var text_height = 20;
    console.log([x, y]);
    console.log([text_x, text_y, text_width, text_height]);
    console.log(x > text_x &&
        x < (text_x + text_width) &&
        y > text_y &&
        y < (text_y + text_height));
    if (x > text_x &&
        x < (text_x + text_width) &&
        y > text_y &&
        y < (text_y + text_height)) {
      return true;
    }

    if (this.shape === "circular") {
      var d = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
      return d < this.size;

    } else {
      return (x > this.x - this.width &&
              x < this.x + this.width &&
              y > this.y - this.height &&
              y < this.y + this.height);
    }

};

Device.prototype.describeArc = util.describeArc;


Device.prototype.compile_variables = function () {
    var variables = JSON.parse(JSON.stringify(this.variables));
    var awx_variables = {};
    variables.awx = awx_variables;
    awx_variables.name = this.name;
    awx_variables.type = this.type;
    awx_variables.interfaces = [];
    var i = 0;
    var intf = null;
    for (i = 0; i < this.interfaces.length; i++) {
        intf = {name: this.interfaces[i].name,
                id: this.interfaces[i].id};
        if (this.interfaces[i].link !== null) {
            intf.link_id = this.interfaces[i].link.id;
            intf.link_name = this.interfaces[i].link.name;
            intf.remote_interface_name = this.interfaces[i].remote_interface().name;
            intf.remote_device_name = this.interfaces[i].remote_interface().device.name;
        }
        awx_variables.interfaces.push(intf);
    }
    return variables;
};

function Interface(id, name) {
    this.model_type = 'Interface';
    this.id = id;
    this.name = name;
    this.link = null;
    this.device = null;
    this.edit_label = false;
    this.dot_x = null;
    this.dot_y = null;
    this.text_width = null;
    this.cursor_pos = null;
}
exports.Interface = Interface;

Interface.prototype.object_id = function () {
  return this.device.model_type + "_" + this.device.id  + "_" + this.model_type + "_" + this.id;
};

Interface.prototype.toJSON = function () {

    return {id: this.id,
            name: this.name};
};

Interface.prototype.remote_interface = function () {

    if (this.link === null) {
        return null;
    }
    if (this.link.to_interface === this) {
        return this.link.from_interface;
    } else {
        return this.link.to_interface;
    }
};

Interface.prototype.is_selected = function (x, y) {

    if (this.link === null || this.device === null) {
        return false;
    }

    var d = Math.sqrt(Math.pow(x - this.device.x, 2) + Math.pow(y - this.device.y, 2));
    return this.link.is_selected(x, y) && (d < this.dot_d + 30);
};

Interface.prototype.dot_distance = function () {
    this.dot_d = Math.sqrt(Math.pow(this.device.x - this.dot_x, 2) + Math.pow(this.device.y - this.dot_y, 2));
};

Interface.prototype.dot = function () {
    if (this.link === null || this.device === null) {
        return;
    }
    if (this.link.to_device === null || this.link.from_device === null) {
        return;
    }
    var p;
    if (this.device.shape === "circular") {

        var theta = this.link.slope_rads();
        if (this.link.from_interface === this) {
            theta = theta + Math.PI;
        }
        p = {x: this.device.x - this.device.size * Math.cos(theta),
                y: this.device.y - this.device.size * Math.sin(theta)};
        this.dot_x = p.x;
        this.dot_y = p.y;
        this.dot_distance();
        return;
    }

    var x1;
    var y1;
    var x2;
    var y2;
    var x3;
    var y3;
    var x4;
    var y4;
    var param1;
    var param2;

    x3 = this.link.to_device.x;
    y3 = this.link.to_device.y;
    x4 = this.link.from_device.x;
    y4 = this.link.from_device.y;

    x1 = this.device.x - this.device.width;
    y1 = this.device.y - this.device.height;
    x2 = this.device.x + this.device.width;
    y2 = this.device.y - this.device.height;

    p = util.intersection(x3, y3, x4, y4, x1, y1, x2, y2);
    param1 = util.pCase(p.x, p.y, x1, y1, x2, y2);
    param2 = util.pCase(p.x, p.y, x3, y3, x4, y4);
    if (param1 >= 0 && param1 <= 1 && param2 >= 0 && param2 <= 1) {
        this.dot_x = p.x;
        this.dot_y = p.y;
        this.dot_distance();
        return;
    }


    x1 = this.device.x - this.device.width;
    y1 = this.device.y + this.device.height;
    x2 = this.device.x + this.device.width;
    y2 = this.device.y + this.device.height;

    p = util.intersection(x3, y3, x4, y4, x1, y1, x2, y2);
    param1 = util.pCase(p.x, p.y, x1, y1, x2, y2);
    param2 = util.pCase(p.x, p.y, x3, y3, x4, y4);
    if (param1 >= 0 && param1 <= 1 && param2 >= 0 && param2 <= 1) {
        this.dot_x = p.x;
        this.dot_y = p.y;
        this.dot_distance();
        return;
    }

    x1 = this.device.x + this.device.width;
    y1 = this.device.y - this.device.height;
    x2 = this.device.x + this.device.width;
    y2 = this.device.y + this.device.height;

    p = util.intersection(x3, y3, x4, y4, x1, y1, x2, y2);
    param1 = util.pCase(p.x, p.y, x1, y1, x2, y2);
    param2 = util.pCase(p.x, p.y, x3, y3, x4, y4);
    if (param1 >= 0 && param1 <= 1 && param2 >= 0 && param2 <= 1) {
        this.dot_x = p.x;
        this.dot_y = p.y;
        this.dot_distance();
        return;
    }

    x1 = this.device.x - this.device.width;
    y1 = this.device.y - this.device.height;
    x2 = this.device.x - this.device.width;
    y2 = this.device.y + this.device.height;

    p = util.intersection(x3, y3, x4, y4, x1, y1, x2, y2);
    param1 = util.pCase(p.x, p.y, x1, y1, x2, y2);
    param2 = util.pCase(p.x, p.y, x3, y3, x4, y4);
    if (param1 >= 0 && param1 <= 1 && param2 >= 0 && param2 <= 1) {
        this.dot_x = p.x;
        this.dot_y = p.y;
        this.dot_distance();
        return;
    }

};

function Link(id, from_device, to_device, from_interface, to_interface) {
    this.model_type = 'Link';
    this.id = id;
    this.from_device = from_device;
    this.to_device = to_device;
    this.from_interface = from_interface;
    this.to_interface = to_interface;
    this.selected = false;
    this.remote_selected = false;
    this.status = null;
    this.edit_label = false;
    this.name = "";
    this.text_width = null;
    this.cursor_pos = null;
}
exports.Link = Link;

Link.prototype.object_id = function () {
  return this.model_type + "_" + this.id;
};

Link.prototype.toJSON = function () {

    return {from_device_id: this.from_device.id,
            to_device_id: this.to_device.id,
            from_interface_id: this.from_interface.id,
            to_interface_id: this.to_interface.id,
            name: this.name};
};

Link.prototype.is_selected = function (x, y) {
    // Is the distance to the mouse location less than 25 if on the label side
    // or 5 on the other from the shortest line to the link?

    if (this.to_device === null) {
        return false;
    }
    var d = util.pDistance(x,
                           y,
                           this.from_device.x,
                           this.from_device.y,
                           this.to_device.x,
                           this.to_device.y);
    if (util.cross_z_pos(x,
                         y,
                         this.from_device.x,
                         this.from_device.y,
                         this.to_device.x,
                         this.to_device.y)) {
        return d < 10;
    } else {
        return d < 10;
    }
};

Link.prototype.slope_rads = function () {
    //Return the slope in degrees for this link.
    var x1 = this.from_device.x;
    var y1 = this.from_device.y;
    var x2 = this.to_device.x;
    var y2 = this.to_device.y;
    return Math.atan2(y2 - y1, x2 - x1);
};

Link.prototype.slope = function () {
    //Return the slope in degrees for this link.
    var x1 = this.from_device.x;
    var y1 = this.from_device.y;
    var x2 = this.to_device.x;
    var y2 = this.to_device.y;
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 180;
};

Link.prototype.pDistanceLine = function (x, y) {

    var x1 = this.from_device.x;
    var y1 = this.from_device.y;
    var x2 = this.to_device.x;
    var y2 = this.to_device.y;
    return util.pDistanceLine(x, y, x1, y1, x2, y2);
};


Link.prototype.length = function () {
    //Return the length of this link.
    var x1 = this.from_device.x;
    var y1 = this.from_device.y;
    var x2 = this.to_device.x;
    var y2 = this.to_device.y;
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
};

Link.prototype.plength = function (x, y) {
    //Return the length of this link.
    var x1 = this.from_device.x;
    var y1 = this.from_device.y;
    var x2 = this.to_device.x;
    var y2 = this.to_device.y;
    return util.pDistance(x, y, x1, y1, x2, y2);
};


function Group(id, name, type, x1, y1, x2, y2, selected) {
    this.model_type = 'Group';
    this.id = id;
    this.name = name;
    this.type = type;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.selected = selected;
    this.moving = false;
    this.highlighted = false;
    this.fsm = null;
    this.selected_corner = null;
    this.devices = [];
    this.links = [];
    this.groups = [];
    this.streams = [];
    this.group_id = 0;
    this.icon_size = type === 'site' ? 500 : 100;
    this.template = false;
    this.variables = {};
    this.sequences = {};
    this.text_width = null;
    this.cursor_pos = null;
}
exports.Group = Group;

Group.prototype.object_id = function () {
  return this.model_type + "_" + this.id;
};

Group.prototype.compile_variables = function () {

    var variables = JSON.parse(JSON.stringify(this.variables));
    return variables;
};

Group.prototype.toJSON = function () {

    return {id: this.id,
            name: this.name,
            type: this.type,
            x1: this.x1,
            y1: this.y1,
            x2: this.x2,
            y2: this.y2,
            devices: this.devices,
            links: this.links,
            streams: this.streams,
            groups: this.groups};
};


Group.prototype.update_hightlighted = function (x, y) {

    this.highlighted = this.is_highlighted(x, y);
};

Group.prototype.is_highlighted = function (x, y) {

    return (x > this.left_extent() &&
            x < this.right_extent() &&
            y > this.top_extent() &&
            y < this.bottom_extent());

};

Group.prototype.is_icon_selected = function (x, y) {

    return ((x > this.left_extent() &&
             x < this.right_extent() &&
             y > this.top_extent() &&
             y < this.bottom_extent()) ||
            (x > this.centerX() - this.icon_size &&
             x < this.centerX() + this.icon_size &&
             y > this.centerY() - this.icon_size &&
             y < this.centerY() + this.icon_size));

};

var TOP_LEFT = 0;
exports.TOP_LEFT = TOP_LEFT;
var TOP_RIGHT = 1;
exports.TOP_RIGHT = TOP_RIGHT;
var BOTTOM_LEFT = 2;
exports.BOTTOM_LEFT = BOTTOM_LEFT;
var BOTTOM_RIGHT = 3;
exports.BOTTOM_RIGHT = BOTTOM_RIGHT;

Group.prototype.has_corner_selected = function (x, y) {

    if (x > this.left_extent() &&
        x < this.left_extent() + 10 &&
        y > this.top_extent() &&
        y < this.top_extent() + 10) {
        return true;
    }
    if (x > this.left_extent() &&
        x < this.left_extent() + 10 &&
        y > this.bottom_extent() - 10 &&
        y < this.bottom_extent()) {
        return true;
    }
    if (x > this.right_extent() - 10 &&
        x < this.right_extent() &&
        y > this.bottom_extent() - 10 &&
        y < this.bottom_extent()) {
        return true;
    }
    if (x > this.right_extent() - 10 &&
        x < this.right_extent() &&
        y > this.top_extent() &&
        y < this.top_extent() + 10) {
        return true;
    }

    return false;
};

Group.prototype.select_corner = function (x, y) {

    var corners = [[util.distance(this.x1, this.y1, x, y), TOP_LEFT],
                   [util.distance(this.x2, this.y2, x, y), BOTTOM_RIGHT],
                   [util.distance(this.x1, this.y2, x, y), BOTTOM_LEFT],
                   [util.distance(this.x2, this.y1, x, y), TOP_RIGHT]];

    corners.sort(function(a, b) {
        return a[0] - b[0];
    });

    if (corners[0][0] > 30) {
        return null;
    }

    return corners[0][1];
};

Group.prototype.is_selected = function (x, y) {

    if (util.pDistance(x,
                       y,
                       this.left_extent(),
                       this.top_extent(),
                       this.left_extent(),
                       this.bottom_extent()) < 10) {
        return true;
    }
    if (util.pDistance(x,
                       y,
                       this.left_extent(),
                       this.top_extent(),
                       this.right_extent(),
                       this.top_extent()) < 10) {
        return true;
    }
    if (util.pDistance(x,
                       y,
                       this.left_extent(),
                       this.top_extent(),
                       this.right_extent(),
                       this.top_extent()) < 40 && y > this.top_extent()) {
        return true;
    }
    if (util.pDistance(x,
                       y,
                       this.right_extent(),
                       this.bottom_extent(),
                       this.right_extent(),
                       this.top_extent()) < 10) {
        return true;
    }
    if (util.pDistance(x,
                       y,
                       this.right_extent(),
                       this.bottom_extent(),
                       this.left_extent(),
                       this.bottom_extent()) < 10) {
        return true;
    }

    return false;
};

Group.prototype.width = function (scaledX) {
    var x2 = this.x2 !== null ? this.x2 : scaledX;
    return Math.abs(this.x1 - x2);
};

Group.prototype.height = function (scaledY) {
    var y2 = this.y2 !== null ? this.y2 : scaledY;
    return Math.abs(this.y1 - y2);
};

Group.prototype.top_extent = function (scaledY) {
    var y2 = this.y2 !== null ? this.y2 : scaledY;
    return (this.y1 < y2? this.y1 : y2);
};

Group.prototype.left_extent = function (scaledX) {
    var x2 = this.x2 !== null ? this.x2 : scaledX;
    return (this.x1 < x2? this.x1 : x2);
};

Group.prototype.bottom_extent = function (scaledY) {
    var y2 = this.y2 !== null ? this.y2 : scaledY;
    return (this.y1 > y2? this.y1 : y2);
};

Group.prototype.right_extent = function (scaledX) {
    var x2 = this.x2 !== null ? this.x2 : scaledX;
    return (this.x1 > x2? this.x1 : x2);
};

Group.prototype.centerX = function (scaledX) {
    return (this.right_extent(scaledX) + this.left_extent(scaledX)) / 2;
};

Group.prototype.centerY = function (scaledY) {
    return (this.bottom_extent(scaledY) + this.top_extent(scaledY)) / 2;
};

Group.prototype.update_membership = function (devices, groups) {
    var i = 0;
    var y1 = this.top_extent();
    var x1 = this.left_extent();
    var y2 = this.bottom_extent();
    var x2 = this.right_extent();
    var old_devices = this.devices;
    var new_devices = [];
    var removed_devices = old_devices.slice();
    var device_ids = [];
    var index = -1;
    this.devices = [];
    for (i = 0; i < devices.length; i++) {
        if (devices[i].x > x1 &&
            devices[i].y > y1 &&
            devices[i].x < x2 &&
            devices[i].y < y2) {
            devices[i].in_group = true;
            this.devices.push(devices[i]);
            device_ids.push(devices[i].id);
            index = removed_devices.indexOf(devices[i]);
            if (index !== -1) {
                removed_devices.splice(index, 1);
            } else {
                new_devices.push(devices[i]);
            }
        }
    }
    var old_groups = this.groups;
    this.groups = [];
    var group_ids = [];
    for (i = 0; i < groups.length; i++) {
        if (groups[i].left_extent() > x1 &&
            groups[i].top_extent() > y1 &&
            groups[i].right_extent() < x2 &&
            groups[i].bottom_extent() < y2) {
            this.groups.push(groups[i]);
            group_ids.push(groups[i].id);
        }
    }
    return [old_devices, this.devices, device_ids, old_groups, this.groups, group_ids, new_devices, removed_devices];
};

Group.prototype.is_in_breadcrumb = function(viewport){
    var groupY1 = this.top_extent();
    var groupX1 = this.left_extent();
    var groupY2 = this.bottom_extent();
    var groupX2 = this.right_extent();

    var viewportY1 = viewport.top_extent();
    var viewportX1 = viewport.left_extent();
    var viewportY2 = viewport.bottom_extent();
    var viewportX2 = viewport.right_extent();

    if (viewportX1 > groupX1 &&
        viewportY1 > groupY1 &&
        viewportX2 < groupX2 &&
        viewportY2 < groupY2) {
            this.on_screen = true;
            return true;
    } else {
        this.on_screen = false;
        return false;
    }
};
