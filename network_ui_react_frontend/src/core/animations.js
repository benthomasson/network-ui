
function help_animation(scope) {

  if (!scope.active) {
    return;
  }

  scope.component.setState({y_offset: Math.min(Math.max(0, scope.component.state.y_offset + scope.data.direction), 350)});
};
exports.help_animation = help_animation;

function set_frame_animation(scope) {

  if (!scope.active) {
    return;
  }

  scope.component.setState({frame_number: scope.frame_number});
};
exports.set_frame_animation = set_frame_animation;
