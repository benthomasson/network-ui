import React, { PureComponent } from 'react';

import {buttonStyle, buttonLogoStyle, buttonBlockStyle} from '../style/Styles.js';

class LaunchButton extends PureComponent {


  render() {
    return (
      <button style={buttonStyle} onClick={this.props.action} disabled={!this.props.enabled}>
      <i style={buttonBlockStyle}>
      <img style={buttonLogoStyle} src={process.env.PUBLIC_URL + "/images/l_ansible-blue.svg"} />
      </i>
      <span>Launch Playbook</span>
      </button>
    );
  }
}

export default LaunchButton;
