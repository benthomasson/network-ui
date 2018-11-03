
function help_animation(scope) {

  if (!scope.active) {
    return;
  }

  scope.data.component.setState({y_offset: Math.min(Math.max(0, scope.data.component.state.y_offset + scope.data.direction), 350)});
};
exports.help_animation = help_animation;
