import React, { Component } from 'react';
import './App.css';
import CancelButton from './button/Cancel.js';
import LaunchButton from './button/Launch.js';
import Controller from './logic.js';

class App extends Component {
  constructor(props) {
    super(props);
    window.svgFrame = this;
    this.controller = new Controller();
  }
  render() {
    return (
      <div className="App">
      <LaunchButton action={this.controller.launch}/>
      <CancelButton controller={this.controller}/>
      </div>
    );
  }
}

export default App;
