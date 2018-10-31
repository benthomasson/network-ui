
function help_animation(scope) {

  scope.data.scope.help_offset = Math.min(Math.max(0, scope.data.scope.help_offset + scope.data.direction), 350);
  console.log(scope.data.scope.help_offset);
};
exports.help_animation = help_animation;
