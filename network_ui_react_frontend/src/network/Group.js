import React, { PureComponent } from 'react';
import util from '../util'

import Colors from '../style/Colors'
import TextInput from '../text/TextInput';

class Group extends PureComponent {

  width () {
    return Math.abs(this.props.x1 - this.props.x2);
  };

  height () {
    return Math.abs(this.props.y1 - this.props.y2);
  };

  top_extent () {
    return (this.props.y1 < this.props.y2 ? this.props.y1 : this.props.y2);
  };

  left_extent () {
    return (this.props.x1 < this.props.x2 ? this.props.x1 : this.props.x2);
  };

  bottom_extent () {
    return (this.props.y1 > this.props.y2 ? this.props.y1 : this.props.y2);
  };

  right_extent () {
    return (this.props.x1 > this.props.x2 ? this.props.x1 : this.props.x2);
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
        <TextInput scope={this.props.scope}
                   object={this.props.group}
                   x="20" y="32"
                   value={this.props.name}
                   selected={this.props.selected}
                   width={this.props.text_width} height={20}
                   show_cursor={this.props.edit_label}
                   edit={this.props.edit_label}
                   id={'Group_' + this.props.id}
                   cursor_pos={this.props.cursor_pos}
                   textAnchor="left"
                   />
        </g>
      </g>
    );
  }
}

export default Group;
