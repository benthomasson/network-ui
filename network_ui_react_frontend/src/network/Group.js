import React, { Component } from 'react';
import util from '../util'

import Colors from '../style/Colors'

class Group extends Component {

  width () {
    var x2 = this.props.x2 !== null ? this.props.x2 : this.props.scaledX;
    return Math.abs(this.props.x1 - x2);
  };

  height () {
    var y2 = this.props.y2 !== null ? this.props.y2 : this.props.scaledY;
    return Math.abs(this.props.y1 - y2);
  };

  top_extent () {
    var y2 = this.props.y2 !== null ? this.props.y2 : this.props.scaledY;
    return (this.props.y1 < y2? this.props.y1 : y2);
  };

  left_extent () {
    var x2 = this.props.x2 !== null ? this.props.x2 : this.props.scaledX;
    return (this.props.x1 < x2? this.props.x1 : x2);
  };

  bottom_extent () {
    var y2 = this.props.y2 !== null ? this.props.y2 : this.props.scaledY;
    return (this.props.y1 > y2? this.props.y1 : y2);
  };

  right_extent () {
    var x2 = this.props.x2 !== null ? this.props.x2 : this.props.scaledX;
    return (this.props.x1 > x2? this.props.x1 : x2);
  };
  render() {
    var groupStyle = {
      stroke: Colors['group'],
      strokeWidth: 2,
      fill: 'none',
      cursor: 'move'
    };
    var groupCornerStyle = util.clone(groupStyle);
    groupCornerStyle.cursor = 'move';
    groupCornerStyle.fill = Colors['light'];
    groupCornerStyle.fillOpacity = 0;
    var groupCornerStyleNESW = util.clone(groupCornerStyle);
    groupCornerStyleNESW.cursor = 'nesw-resize';
    var groupCornerStyleNWSE = util.clone(groupCornerStyle);
    groupCornerStyleNWSE.cursor = 'nwse-resize';
    var selectedStyle = {
      stroke: Colors['selectedBlue'],
      strokeWidth: 6,
      fill: 'none'
    };
    var constructionStyle = {
      fillOpacity: "0",
      stroke: Colors['debugCopyNot'],
      strokeWidth: 1,
    };
    var textSelected = {
    };
    var textStyle = {
      fill: Colors['buttonText'],
    };
    return (
      <g>

        { this.props.moving ?
        <g>
            <g transform={"translate(" + this.left_extent() + "," + this.top_extent() + ")"}>
            <line x1="-100"
                  y1="0"
                  x2="+100"
                  y2="0"
                  style={constructionStyle}></line>
             <line x1="0"
                   y1="-100"
                   x2="0"
                   y2="+100"
                   style={constructionStyle}></line>
            </g>
            <g transform={"translate(" + this.right_extent() + "," + this.top_extent() + ")"}>
            <line x1="-100"
                  y1="0"
                  x2="+100"
                  y2="0"
                  style={constructionStyle}></line>
             <line x1="0"
                   y1="-100"
                   x2="0"
                   y2="+100"
                   style={constructionStyle}></line>
            </g>
            <g transform={"translate(" + this.left_extent() + "," + this.bottom_extent() + ")"}>
            <line x1="-100"
                  y1="0"
                  x2="+100"
                  y2="0"
                  style={constructionStyle}></line>
             <line x1="0"
                   y1="-100"
                   x2="0"
                   y2="+100"
                   style={constructionStyle}></line>
            </g>
            <g transform={"translate(" + this.right_extent() + "," + this.bottom_extent() + ")"}>
            <line x1="-100"
                  y1="0"
                  x2="+100"
                  y2="0"
                   style={constructionStyle}></line>
             <line x1="0"
                   y1="-100"
                   x2="0"
                   y2="+100"
                   style={constructionStyle}></line>
            </g>
        </g>
        : null }

        {this.props.selected ?
        <g>
          <rect width={this.width()}
                height={this.height()}
                x={this.left_extent()}
                y={this.top_extent()}
                style={selectedStyle} />

          <rect width="10"
                height="10"
                x={this.left_extent()}
                y={this.top_extent()}
                style={selectedStyle} />

          <rect width="10"
                height="10"
                x={this.right_extent() - 10}
                y={this.top_extent()}
                style={selectedStyle} />

          <rect width="10"
                height="10"
                x={this.right_extent() - 10}
                y={this.bottom_extent() - 10}
                style={selectedStyle} />

          <rect width="10"
                height="10"
                x={this.left_extent()}
                y={this.bottom_extent() - 10}
                style={selectedStyle} />
        </g>
        : null }

        <rect width={this.width()}
              height={this.height()}
              x={this.left_extent()}
              y={this.top_extent()}
              style={groupStyle} />


        { (this.props.highlighted || this.props.selected) ?
        <g>
        <rect width="10"
              height="10"
              x={this.left_extent()}
              y={this.top_extent()}
              style={groupCornerStyleNWSE} />

        <rect width="10"
              height="10"
              x={this.right_extent() - 10}
              y={this.top_extent()}
              style={groupCornerStyleNESW} />

        <rect width="10"
              height="10"
              x={this.right_extent() - 10}
              y={this.bottom_extent() - 10}
              style={groupCornerStyleNWSE} />

        <rect width="10"
              height="10"
              x={this.left_extent()}
              y={this.bottom_extent() - 10}
              style={groupCornerStyleNESW} />
        </g>
        : null }

        <g transform={"translate(" + this.left_extent() + "," + this.top_extent() + ")"}>
        {(this.props.selected && ! this.props.edit_label) ?
          <text style={textSelected}
                filter="url(#selected)"
                textAnchor="left"
                x="20"
                y="32">{this.props.name}</text>
        :  null}
          <text style={textStyle} textAnchor="left" x="20" y="32">{this.props.name}{this.props.edit_label?'_':''}</text>
        </g>
      </g>
    );
  }
}

export default Group;
