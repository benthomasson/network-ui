
import Colors from '../style/Colors';

var debugStyle = {
  stroke: Colors['debugCopyNot'],
  fill: 'none',
  strokeWidth: 1
};

var pathStyle = {
  fill: Colors['darkWidgetDetail'],
  stroke: Colors['darkWidgetDetail'],
};

var textStyle = {
  fill: Colors['darkWidgetDetail'],
};
var constructionLineStyle = {
  fillOpacity: 0,
  stroke: Colors['debugCopyNot'],
  strokeWidth: 1
};
var debugLineStyle = {
  fillOpacity: 0,
  stroke: Colors['debugCopyNot'],
  strokeWidth: 1
};
var debugRectStyle = {
  fillOpacity: 0,
  stroke: Colors['debugCopyNot'],
  strokeWidth: 1
};
var deviceStyle = {
  fill: Colors['lightBackground'],
  cursor: 'move'
};
var deviceSelectedStyle = {
    fill: Colors['lightBackground'],
    stroke: Colors['selectedBlue'],
    strokeWidth: 10
};
var deviceTextStyle = {
  fill: Colors['buttonText'],
};
var devicePathStyle = {
  fill: Colors['blue'],
  cursor: 'move'
};
export {textStyle,
        pathStyle,
        debugStyle,
        debugLineStyle,
        debugRectStyle,
        constructionLineStyle,
        deviceStyle,
        deviceSelectedStyle,
        devicePathStyle,
        deviceTextStyle
       };
