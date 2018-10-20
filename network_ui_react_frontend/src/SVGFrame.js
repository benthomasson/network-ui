import React, { Component } from 'react';
import Debug from './core/Debug'
import Cursor from './core/Cursor'
import Key from './core/Key'
import Download from './button/Download'
import Quadrants from './core/Quadrants'
import Help from './core/Help'
import models from './models'
import Device from './network/Device'
import Host from './network/Host'
import Router from './network/Router'
import Switch from './network/Switch'
import Link from './network/Link'
import Group from './network/Group'


class SVGFrame extends Component {

  constructor(props) {
    super(props);
    window.scope = this;
    this.scope = new models.ApplicationScope(this);
  }

  componentDidMount() {
     var blinkIntervalId = setInterval(this.scope.blinkTimer, 500);
     var intervalId = setInterval(this.scope.timer, 17);
     //var intervalId = null;
     this.scope.setState({
       intervalId: intervalId,
       blinkIntervalId: blinkIntervalId,
       frameWidth: window.innerWidth,
       frameHeight: window.innerHeight
     });
     document.addEventListener('keydown', this.scope.onKeyDown);
     window.addEventListener('resize', this.scope.onResize);
     window.addEventListener('beforeunload', this.scope.onUnload);

     this.forceUpdate();
  }

  render() {
    var frameStyle = {
      backgroundColor: '#ffffff',
      cursor: (this.scope.selecting_device ? 'alias' :
               this.scope.placing_group ? 'crosshair' : 'auto')
    };

    var devices = [];
    var device = null;
    for (var i = 0; i < this.scope.devices.length; i++) {
      device = this.scope.devices[i];
      if (device.type === "router") {
        devices.push(<Router {...device}
                     key={'device' + i}
                     blink={this.scope.blink}
                     showDebug={this.scope.showDebug}/>);
      } else if (device.type === "switch") {
        devices.push(<Switch {...device}
                     key={'device' + i}
                     blink={this.scope.blink}
                     showDebug={this.scope.showDebug}/>);
      } else if (device.type === "host") {
        devices.push(<Host {...device}
                     key={'device' + i}
                     blink={this.scope.blink}
                     showDebug={this.scope.showDebug}/>);
      } else {
        devices.push(<Device {...device}
                     key={'device' + i}
                     blink={this.scope.blink}
                     showDebug={this.scope.showDebug}/>);
      }
    }
    var links = [];
    var link = null;
    for (i = 0; i < this.scope.links.length; i++) {
      link = this.scope.links[i];
      links.push(<Link {...link}
                       key={'link' + i}
                       blink={this.scope.blink}
                       showDebug={this.scope.showDebug}
                       scaledX={this.scope.scaledX}
                       scaledY={this.scope.scaledY} />)
    }
    var groups = [];
    for (i=0; i< this.scope.groups.length; i++) {
      groups.push(<Group {...this.scope.groups[i]}
                          key={'group' + i}
                          blink={this.scope.blink}
                          showDebug={this.scope.showDebug}
                          scaledX={this.scope.scaledX}
                          scaledY={this.scope.scaledY} />);
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
          </defs>
          <g transform={'translate(' + this.scope.panX + ',' + this.scope.panY + ') ' +
                         'scale(' + this.scope.current_scale + ')'}>
          {links}
          {devices}
          {groups}
          <Quadrants {...this.scope} />
          </g>
          <Debug {...this.scope}
                 x={100}
                 move={this.scope.move_controller}
                 group={this.scope.group_controller}
                 link={this.scope.link_controller}
                 transition={this.scope.transition_controller}
                 view={this.scope.view_controller}
                 />
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
          {this.scope.showButtons ?
          <g>
          <Download {...this.scope.buttons_by_name.download} showDebug={this.scope.showDebug} />
          </g>
          : null}
          <Help showHelp={this.scope.showHelp}
                y={10}
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
        </svg>
      </div>
    );
  }
}

export default SVGFrame;
