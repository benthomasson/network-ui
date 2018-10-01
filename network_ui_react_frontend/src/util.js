/* Copyright (c) 2017 Red Hat, Inc. */
var math = require('mathjs');

function noop () {
}
exports.noop = noop;

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
exports.clone = clone;

function natural_numbers (start) {
    var counter = start;
    return function () {return counter += 1;};
}
exports.natural_numbers = natural_numbers;


function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}
exports.polarToCartesian = polarToCartesian;

function polarToCartesian_rad(centerX, centerY, radius, angleInRadians) {

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}
exports.polarToCartesian_rad = polarToCartesian_rad;

function cartesianToPolar(x, y) {

    return {
        r: Math.sqrt(Math.pow(x,2) + Math.pow(y, 2)),
        theta: Math.atan2(y, x)
    };
}
exports.cartesianToPolar = cartesianToPolar;

// describeArc
// From http://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
// @opsb, @wdebeaum

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}
exports.describeArc = describeArc;

function pDistance(x, y, x1, y1, x2, y2) {
  //Code from http://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
  //Joshua
  // Find the dot product of two vectors <A, B>, <C, D>
  // Divide by the length squared of <C, D>
  // Use scalar project to find param
  //

  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq !== 0) {
      //in case of 0 length line
      param = dot / len_sq;
  }

  var xx, yy;

  //Find a point xx, yy where the projection and the <C, D> vector intersect.
  //If less than 0 use x1, y1 as the closest point.
  //If less than 1 use x2, y2 as the closest point.
  //If between 0 and 1 use the projection intersection xx, yy
  if (param < 0) {
    xx = x1;
    yy = y1;
  }
  else if (param > 1) {
    xx = x2;
    yy = y2;
  }
  else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = x - xx;
  var dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}
exports.pDistance = pDistance;

function distance (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
exports.distance = distance;

function rectangle_is_selected (x, y) {

    return (x > this.x &&
            x < this.x + this.width &&
            y > this.y &&
            y < this.y + this.height);

}
exports.rectangle_is_selected = rectangle_is_selected;

function cross_z_pos(x, y, x1, y1, x2, y2) {
  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  return math.cross([A, B, 0], [C, D, 0])[2] > 0;
}
exports.cross_z_pos = cross_z_pos;

