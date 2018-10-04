

function FSMTrace(order, fsm_name, from_state, to_state, recv_message_type) {
    this.msg_type = 'FSMTrace';
    this.order = order;
    this.sender = 0;
    this.trace_id = 0;
    this.fsm_name = fsm_name;
    this.from_state = from_state;
    this.to_state = to_state;
    this.recv_message_type = recv_message_type;
}
exports.FSMTrace = FSMTrace;

function ChannelTrace(from_fsm, to_fsm, sent_message_type) {
    this.msg_type = 'ChannelTrace';
    this.sender = 0;
    this.trace_id = 0;
    this.from_fsm = from_fsm;
    this.to_fsm = to_fsm;
    this.sent_message_type = sent_message_type;
}
exports.ChannelTrace = ChannelTrace;

function MouseEvent(sender, x, y, type, trace_id) {
    this.msg_type = "MouseEvent";
    this.sender = sender;
    this.x = x;
    this.y = y;
    this.type = type;
    this.trace_id = trace_id;
}
exports.MouseEvent = MouseEvent;

function MouseWheelEvent(sender, deltaX, deltaY, type, trace_id) {
    this.msg_type = "MouseWheelEvent";
    this.sender = sender;
    this.deltaX = deltaX;
    this.deltaY = deltaY;
    this.type = type;
    this.trace_id = trace_id;
}
exports.MouseWheelEvent = MouseWheelEvent;

function KeyEvent(sender, key, keyCode, type, altKey, shiftKey, ctrlKey, metaKey, trace_id) {
    this.msg_type = "KeyEvent";
    this.sender = sender;
    this.key = key;
    this.keyCode = keyCode;
    this.type = type;
    this.altKey = altKey;
    this.shiftKey = shiftKey;
    this.ctrlKey = ctrlKey;
    this.metaKey = metaKey;
    this.trace_id = trace_id;
}
exports.KeyEvent = KeyEvent;

function StartRecording(sender, trace_id) {
    this.msg_type = "StartRecording";
    this.sender = sender;
    this.trace_id = trace_id;
}
exports.StartRecording = StartRecording;

function StopRecording(sender, trace_id) {
    this.msg_type = "StopRecording";
    this.sender = sender;
    this.trace_id = trace_id;
}
exports.StopRecording = StopRecording;

function ViewPort(sender, scale, panX, panY, frameWidth, frameHeight, trace_id) {
    this.msg_type = "ViewPort";
    this.sender = sender;
    this.scale = scale;
    this.panX = panX;
    this.panY = panY;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.trace_id = trace_id;
}
exports.ViewPort = ViewPort;

function Snapshot(sender, devices, links, groups, order, trace_id) {
    this.msg_type = 'Snapshot';
    this.sender = 0;
    this.devices = devices;
    this.links = links;
    this.groups = groups;
    this.order = order;
    this.trace_id = trace_id;
}
exports.Snapshot = Snapshot;
