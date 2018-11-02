
function help_animation(scope) {

  if (!scope.active) {
    return;
  }

  scope.data.scope.help_offset = Math.min(Math.max(0, scope.data.scope.help_offset + scope.data.direction), 350);
};
exports.help_animation = help_animation;
