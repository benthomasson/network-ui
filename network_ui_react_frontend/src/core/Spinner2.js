import React, { PureComponent } from 'react';

import core_animations from './animations.js';

import {statusPathStyle} from '../style/Styles.js';

import util from '../util'

class Spinner2 extends PureComponent {

  constructor(props) {
    super(props);
    this.animationstate = {blink: false}
    this.animate()
  }

  animate() {
    this.props.scope.animations.set(this.props.object, new core_models.Animation(this.props.scope.animation_id_seq(),
                                                                    17,
                                                                    -1,
                                                                    {},
                                                                    this.props.scope,
                                                                    this,
                                                                    this.props.scope,
                                                                    core_animations.set_frame_animation));
  }

  render() {
    return (
        <path transform={"translate(" + this.props.x + "," + this.props.y + ") rotate(" + (this.state.frame_number * 5) + ")"} style={statusPathStyle} d={util.describeArc(0, 0, 10, 0, 270)}/>
    );
  }
}

export default Spinner2;
