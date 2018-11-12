
import Colors from '../style/Colors';

var debugStyle = {
  stroke: Colors['debugCopyNot'],
  fill: 'none',
  strokeWidth: 1
};

var pathStyle = {
  fill: Colors.icons,
  stroke: Colors.icons,
};

var buttonStyle = {
  fill: Colors.buttonBackground,
  stroke: Colors.buttonBackground
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

var statusCircleStyle = {
  fill: Colors.widgetBody,
  stroke: Colors.darkWidgetDetail,
  strokeWidth: 1
};

var statusCircleStylePass = Object.assign({}, statusCircleStyle);
var statusCircleStyleFail = Object.assign({}, statusCircleStyle);
statusCircleStylePass.fill = Colors.pass;
statusCircleStyleFail.fill = Colors.fail;

var statusPathStyle = {
  fill: 'none',
  stroke: Colors.darkWidgetDetail,
  strokeWidth: 1
};

var statusTextStyle = {
  fill: Colors.statusText
};

var toolTipStyle = {
  fill: Colors.toolTipBackground
};

var toolTipTextStyle = {
  fill: Colors.lightBackground,
  stroke: "none",
  fontSize: "0.8em"
};

var taskTextStyle = {
  fill: Colors['buttonText'],
  fontSize: '10px'
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
        deviceTextStyle,
        statusCircleStyle,
        statusCircleStylePass,
        statusCircleStyleFail,
        statusPathStyle,
        statusTextStyle,
        toolTipStyle,
        toolTipTextStyle,
        taskTextStyle
       };
