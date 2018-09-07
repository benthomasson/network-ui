

function ProcessCreate(sender, id, name, type, device_id, x, y) {
    this.msg_type = "ProcessCreate";
    this.id = id;
    this.name = name;
    this.type = type;
    this.device_id = device_id;
    this.x = x;
    this.y = y;
}
exports.ProcessCreate = ProcessCreate;

function StreamCreate(sender, id, from_id, to_id, label) {
    this.msg_type = "StreamCreate";
    this.sender = sender;
    this.id = id;
    this.from_id = from_id;
    this.to_id = to_id;
    this.label = label;
}
exports.StreamCreate = StreamCreate;

function StreamDestroy(sender, id, from_id, to_id, label) {
    this.msg_type = "StreamDestroy";
    this.sender = sender;
    this.id = id;
    this.from_id = from_id;
    this.to_id = to_id;
    this.label = label;
}
exports.StreamDestroy = StreamDestroy;

function StreamLabelEdit(sender, id, label, previous_label) {
    this.msg_type = "StreamLabelEdit";
    this.sender = sender;
    this.id = id;
    this.label = label;
    this.previous_label = previous_label;
}
exports.StreamLabelEdit = StreamLabelEdit;

function StreamSelected(sender, id) {
    this.msg_type = "StreamSelected";
    this.sender = sender;
    this.id = id;
}
exports.StreamSelected = StreamSelected;

function StreamUnSelected(sender, id) {
    this.msg_type = "StreamUnSelected";
    this.sender = sender;
    this.id = id;
}
exports.StreamUnSelected = StreamUnSelected;
