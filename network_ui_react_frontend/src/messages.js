/* Copyright (c) 2017 Red Hat, Inc. */


function serialize(message) {
    return JSON.stringify([message.constructor.name, message]);
}
exports.serialize = serialize;

function Undo(sender, original_message) {
    this.msg_type = "Undo";
    this.sender = sender;
    this.original_message = original_message;
}
exports.Undo = Undo;

function Redo(sender, original_message) {
    this.msg_type = "Redo";
    this.sender = sender;
    this.original_message = original_message;
}
exports.Redo = Redo;

function MultipleMessage(sender, messages) {
    this.msg_type = "MultipleMessage";
    this.sender = sender;
    this.messages = messages;
}
exports.MultipleMessage = MultipleMessage;

function MouseEvent(sender, x, y, type, trace_id) {
    this.msg_type = "MouseEvent";
    this.sender = sender;
    this.x = x;
    this.y = y;
    this.type = type;
    this.trace_id = trace_id;
}
exports.MouseEvent = MouseEvent;

function MouseWheelEvent(sender, delta, deltaX, deltaY, type, metaKey, trace_id) {
    this.msg_type = "MouseWheelEvent";
    this.sender = sender;
    this.delta = delta;
    this.deltaX = deltaX;
    this.deltaY = deltaY;
    this.type = type;
    this.originalEvent = {metaKey: metaKey};
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

function ViewPort(sender, scale, panX, panY, trace_id) {
    this.msg_type = "ViewPort";
    this.sender = sender;
    this.scale = scale;
    this.panX = panX;
    this.panY = panY;
    this.trace_id = trace_id;
}
exports.ViewPort = ViewPort;

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
