import React, { Component } from 'react';
import './App.css';
import CancelButton from './button/Cancel.js';
import LaunchButton from './button/Launch.js';
import Controller from './logic.js';
import Host from './Host.js';
import Playbook from './Playbook.js';
import Log from './Log.js';

class App extends Component {

  constructor(props) {
    super(props);
    window.svgFrame = this;
    this.controller = new Controller(this);
  }
  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }
  componentDidMount() {
    this.controller.init();
  }
  render() {

    var hosts = [];
    for (var i = 0; i < this.controller.hosts.length; i++) {
      var host = this.controller.hosts[i];
      var tasks = this.controller.tasks_by_host[host.host_id];
      if (tasks === undefined) {
        tasks = [];
      }
      hosts.push(<Host {...host} tasks={tasks} key={host.name} />);
    }
    return (
      <div className="App">
      <LaunchButton action={this.controller.launch} enabled={this.controller.launch_enabled}/>
      <CancelButton action={this.controller.cancel} enabled={this.controller.cancel_enabled}/>
      <Playbook {...this.controller.playbook} />
      {hosts}
      <Log lines={this.controller.log} />
      </div>
    );
  }
}

export default App;
