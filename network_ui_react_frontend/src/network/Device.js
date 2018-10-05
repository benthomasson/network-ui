import React, { Component } from 'react';

import {debugLineStyle,
        debugRectStyle,
        constructionLineStyle,
        deviceStyle,
        deviceTextStyle
        } from '../style/Styles.js';


class Device extends Component {
  render() {
    return (
      <g transform={"translate(" + this.props.x + "," + this.props.y + ")"}>
        {this.props.moving ?
        <g>
        <line x1={-50 - 100}
               y1="0"
               x2={50 + 100}
               y2="0"
               style={constructionLineStyle}></line>
         <line x1="0"
               y1={-50 - 100}
               x2="0"
               y2={50 + 100}
               style={constructionLineStyle}></line>
        </g>
        : null}

        {this.props.showDebug ?
        <g>
         <line x1={-50 - 10}
               y1="0"
               x2={50 + 10}
               y2="0"
               style={debugLineStyle}></line>
         <line x1="0"
               y1={-50 - 10}
               x2="0"
               y2={50 + 10}
               style={debugLineStyle}></line>
         <rect x={-50}
               y={-50}
               width={50 * 2}
               height={50 * 2}
               style={debugRectStyle}></rect>
        </g>
        : null}

        <g class="NetworkUI__device">
        <circle
            cx="0"
            cy="0"
            r={50 + 2}
            style={deviceStyle}>
        </circle>
        <circle
            cx="0"
            cy="0"
            r="50">
        </circle>
        </g>
        <g>
        <text style={deviceTextStyle}
  filter="url(#selected)"
              textAnchor="middle"
  x="0"
  y="0"> {this.props.name} </text>
        <text style={deviceTextStyle} textAnchor="middle" x="0" y="0">{this.props.name}{this.props.edit_label?'_':''}</text>
                    </g>
      </g>
    );
  }
}

export default Device;
