import React, { Component } from 'react';
import Debug from './core/Debug';
import Cursor from './core/Cursor';
import Key from './core/Key';
import Download from './button/Download';
import Launch from './button/Launch';
import Cancel from './button/Cancel';
import KeyButton from './button/Key';
import ToolbarButton from './button/Toolbar';
import Quadrants from './core/Quadrants';
import Help from './core/Help';
import Header from './core/Header';
import GetStarted from './core/GetStarted';
import models from './models';
import Device from './network/Device';
import Host from './network/Host';
import Router from './network/Router';
import Switch from './network/Switch';
import Link from './network/Link';
import Group from './network/Group';
import PlaybookStatus from './monitor/PlaybookStatus';
import LogPane from './log/LogPane';
import PlaybookSelect from './launch/PlaybookSelect';


class SVGFrame extends Component {

  constructor(props) {
    super(props);
    window.svgFrame = this;
    this.scope = new models.ApplicationScope(this);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  componentDidMount() {
    var intervalId = setInterval(this.scope.timer, 17);
     this.scope.setState({
       intervalId: intervalId,
       frameWidth: window.innerWidth,
       frameHeight: window.innerHeight
     });
     document.addEventListener('keydown', this.scope.onKeyDown);
     window.addEventListener('resize', this.scope.onResize);
     window.addEventListener('beforeunload', this.scope.onUnload);

     this.setState({});
  }

  render() {
    var frameStyle = {
      backgroundColor: '#ffffff',
      cursor: (this.scope.selecting_device ? 'alias' :
               this.scope.placing_group ? 'crosshair' :
               this.scope.grabbed ? 'grab' :
               this.scope.dragging ? 'grabbing' :
               'auto')
    };

    var devices = [];
    var device = null;
    for (var i = 0; i < this.scope.devices.length; i++) {
      device = this.scope.devices[i];
      if (device.type === "router") {
        devices.push(<Router {...device}
                     device={device}
                     scope={this.scope}
                     key={device.id.toString()}
                     showDebug={this.scope.showDebug}/>);
      } else if (device.type === "switch") {
        devices.push(<Switch {...device}
                     device={device}
                     scope={this.scope}
                     key={device.id.toString()}
                     showDebug={this.scope.showDebug}/>);
      } else if (device.type === "host") {
        devices.push(<Host {...device}
                     device={device}
                     scope={this.scope}
                     key={device.id.toString()}
                     showDebug={this.scope.showDebug}/>);
      } else {
        devices.push(<Device {...device}
                     device={device}
                     scope={this.scope}
                     key={device.id.toString()}
                     showDebug={this.scope.showDebug}/>);
      }
    }
    var links = [];
    var link = null;
    for (i = 0; i < this.scope.links.length; i++) {
      link = this.scope.links[i];
      if (link.to_device === null) {
        links.push(<Link {...link}
                         from_device_x = {link.from_device.x}
                         from_device_y = {link.from_device.y}
                         scaledX={this.scope.scaledX}
                         scaledY={this.scope.scaledY}
                         link={link}
                         scope={this.scope}
                         key={link.id.toString()}
                         showDebug={this.scope.showDebug} />)
      } else {
        links.push(<Link {...link}
                         from_device_x = {link.from_device.x}
                         from_device_y = {link.from_device.y}
                         to_device_x = {link.to_device.x}
                         to_device_y = {link.to_device.y}
                         link={link}
                         scope={this.scope}
                         key={link.id.toString()}
                         from_interface_selected = {link.from_interface.selected}
                         from_interface_edit_label = {link.from_interface.edit_label}
                         from_interface_name = {link.from_interface.name}
                         from_interface_cursor_pos = {link.from_interface.cursor_pos}
                         from_interface_text_width = {link.from_interface.text_width}
                         to_interface_selected = {link.to_interface.selected}
                         to_interface_edit_label = {link.to_interface.edit_label}
                         to_interface_name = {link.to_interface.name}
                         to_interface_cursor_pos = {link.to_interface.cursor_pos}
                         to_interface_text_width = {link.to_interface.text_width}
                         showDebug={this.scope.showDebug} />)
      }
    }
    var groups = [];
    var group = null;
    for (i=0; i< this.scope.groups.length; i++) {
      group = this.scope.groups[i];
      groups.push(<Group {...group}
                         scope={this.scope}
                         group={group}
                         key={group.id.toString()}
                         showDebug={this.scope.showDebug} />);
    }
    return (
      <div className='SVGFrame'>
        <svg  id='frame' style={frameStyle}
              height={this.scope.frameHeight}
              width={this.scope.frameWidth}
              onMouseMove={this.scope.onMouseMove}
              onMouseDown={this.scope.onMouseDown}
              onMouseUp={this.scope.onMouseUp}
              onWheel={this.scope.onMouseWheel}>
          <defs>
            <filter x="0" y="0" width="1" height="1" id="selected">
              <feFlood floodColor="#b3d8fd"/>
              <feComposite in="SourceGraphic" operator="xor"/>
            </filter>
            <filter x="0" y="0" width="1" height="1" id="background">
              <feFlood floodColor="#ffffff"/>
              <feComposite in="SourceGraphic"/>
            </filter>
            <clipPath id="log-pane-clip-path">
							<rect x={this.scope.log_pane.x-1}
										y={this.scope.log_pane.y-1}
										width={this.scope.log_pane.width+2}
										height={this.scope.log_pane.height+2} />
						</clipPath>
          </defs>
          <g transform={'translate(' + this.scope.panX + ',' + this.scope.panY + ') ' +
                         'scale(' + this.scope.current_scale + ')'}>
          {links}
          {devices}
          {groups}
          <Quadrants {...this.scope} />
          </g>
          {this.scope.showCursor ?
          <Cursor x={this.scope.cursorPosX}
                  y={this.scope.cursorPosY}
                  pressed={this.scope.mouse_pressed}/>
          : null}
          {this.scope.showKey ?
          <Key x={this.scope.frameWidth/2}
               y={this.scope.frameHeight - 100}
               lastKey={this.scope.lastKey}/>
          : null}
          <Help scope={this.scope}
                y={50}
                x={this.scope.frameWidth - 200}
                shortcuts={[['0', 'Reset scale and pan'],
                     ['?', 'Toggle help'],
                     ['d', 'Toggle debug'],
                     ['p', 'Toggle pointer'],
                     ['b', 'Toggle buttons'],
                     ['r', 'Place new router'],
                     ['s', 'Place new switch'],
                     ['h', 'Place new host'],
                     ['l', 'Make new link'],
                     ['g', 'Make new group']
                    ]} />;
          {this.scope.showButtons ?
          <g>
          <Header width={this.scope.frameWidth} />
          <Download {...this.scope.buttons_by_name.download} showDebug={this.scope.showDebug} />
          <Launch {...this.scope.buttons_by_name.launch} showDebug={this.scope.showDebug} />
          <Cancel {...this.scope.buttons_by_name.cancel} showDebug={this.scope.showDebug} />
          <ToolbarButton {...this.scope.buttons_by_name.toggle_toolbar} showDebug={this.scope.showDebug} />
          <KeyButton {...this.scope.buttons_by_name.toggle_key} showDebug={this.scope.showDebug} />
          <PlaybookSelect {...this.scope.buttons_by_name.playbook_select} showDebug={this.scope.showDebug} />
          </g>
          : null}
          <PlaybookStatus {...this.scope.play_status} scope={this.scope} showDebug={this.scope.showDebug}/>
          {this.scope.devices.length === 0 && this.scope.groups.length === 0 ?
              <GetStarted x={this.scope.frameWidth/2} y={this.scope.frameHeight/2} />
          : null}
          {this.scope.log_pane.target !== null ?
          <LogPane log={this.scope.log_pane.target.log} {...this.scope.log_pane}/>
          : null}
          <Debug {...this.scope}
                 x={400}
                 move={this.scope.move_controller}
                 group={this.scope.group_controller}
                 link={this.scope.link_controller}
                 transition={this.scope.transition_controller}
                 view={this.scope.view_controller}
                 log={this.scope.log_pane_controller}
                 download={this.scope.buttons_by_name.download}
                 />
        </svg>
      </div>
    );
  }
}

export default SVGFrame;
