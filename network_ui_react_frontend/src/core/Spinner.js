import React, { PureComponent } from 'react';

import {statusPathStyle} from '../style/Styles.js';

import util from '../util'

class Spinner extends PureComponent {

  render() {
    return (
        <path transform={"translate(" + this.props.x + "," + this.props.y + ") rotate(" + (this.props.frame_number * 5) + ")"} style={statusPathStyle} d={util.describeArc(0, 0, 10, 0, 270)}/>
    );
  }
}

export default Spinner;
