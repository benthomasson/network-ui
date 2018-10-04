/* Copyright (c) 2017 Red Hat, Inc. */

function DeviceMove(sender, id, x, y, previous_x, previous_y) {
    this.msg_type = "DeviceMove";
    this.sender = sender;
    this.id = id;
    this.x = x;
    this.y = y;
    this.previous_x = previous_x;
    this.previous_y = previous_y;
}
exports.DeviceMove = DeviceMove;

function DeviceInventoryUpdate(sender, id, host_id) {
    this.msg_type = "DeviceInventoryUpdate";
    this.sender = sender;
    this.id = id;
    this.host_id = host_id;
}
exports.DeviceInventoryUpdate = DeviceInventoryUpdate;

function GroupInventoryUpdate(sender, id, group_id) {
    this.msg_type = "GroupInventoryUpdate";
    this.sender = sender;
    this.id = id;
    this.group_id = group_id;
}
exports.GroupInventoryUpdate = GroupInventoryUpdate;

function DeviceCreate(sender, id, x, y, name, type, host_id) {
    this.msg_type = "DeviceCreate";
    this.sender = sender;
    this.id = id;
    this.x = x;
    this.y = y;
    this.name = name;
    this.type = type;
    this.host_id = host_id;
}
exports.DeviceCreate = DeviceCreate;

function DeviceDestroy(sender, id, previous_x, previous_y, previous_name, previous_type, previous_host_id) {
    this.msg_type = "DeviceDestroy";
    this.sender = sender;
    this.id = id;
    this.previous_x = previous_x;
    this.previous_y = previous_y;
    this.previous_name = previous_name;
    this.previous_type = previous_type;
    this.previous_host_id = previous_host_id;
}
exports.DeviceDestroy = DeviceDestroy;

function DeviceLabelEdit(sender, id, name, previous_name) {
    this.msg_type = "DeviceLabelEdit";
    this.sender = sender;
    this.id = id;
    this.name = name;
    this.previous_name = previous_name;
}
exports.DeviceLabelEdit = DeviceLabelEdit;

function DeviceSelected(sender, id) {
    this.msg_type = "DeviceSelected";
    this.sender = sender;
    this.id = id;
}
exports.DeviceSelected = DeviceSelected;

function DeviceUnSelected(sender, id) {
    this.msg_type = "DeviceUnSelected";
    this.sender = sender;
    this.id = id;
}
exports.DeviceUnSelected = DeviceUnSelected;

function InterfaceCreate(sender, device_id, id, name) {
    this.msg_type = "InterfaceCreate";
    this.sender = sender;
    this.device_id = device_id;
    this.id = id;
    this.name = name;
}
exports.InterfaceCreate = InterfaceCreate;

function InterfaceLabelEdit(sender, id, device_id, name, previous_name) {
    this.msg_type = "InterfaceLabelEdit";
    this.sender = sender;
    this.id = id;
    this.device_id = device_id;
    this.name = name;
    this.previous_name = previous_name;
}
exports.InterfaceLabelEdit = InterfaceLabelEdit;

function LinkLabelEdit(sender, id, name, previous_name) {
    this.msg_type = "LinkLabelEdit";
    this.sender = sender;
    this.id = id;
    this.name = name;
    this.previous_name = previous_name;
}
exports.LinkLabelEdit = LinkLabelEdit;

function LinkCreate(sender, id, from_device_id, to_device_id, from_interface_id, to_interface_id) {
    this.msg_type = "LinkCreate";
    this.id = id;
    this.sender = sender;
    this.name = '';
    this.from_device_id = from_device_id;
    this.to_device_id = to_device_id;
    this.from_interface_id = from_interface_id;
    this.to_interface_id = to_interface_id;
}
exports.LinkCreate = LinkCreate;

function LinkDestroy(sender, id, from_device_id, to_device_id, from_interface_id, to_interface_id, name) {
    this.msg_type = "LinkDestroy";
    this.id = id;
    this.sender = sender;
    this.name = name;
    this.from_device_id = from_device_id;
    this.to_device_id = to_device_id;
    this.from_interface_id = from_interface_id;
    this.to_interface_id = to_interface_id;
}
exports.LinkDestroy = LinkDestroy;

function LinkSelected(sender, id) {
    this.msg_type = "LinkSelected";
    this.sender = sender;
    this.id = id;
}
exports.LinkSelected = LinkSelected;

function LinkUnSelected(sender, id) {
    this.msg_type = "LinkUnSelected";
    this.sender = sender;
    this.id = id;
}
exports.LinkUnSelected = LinkUnSelected;

function Deploy(sender) {
    this.msg_type = "Deploy";
    this.sender = sender;
}
exports.Deploy = Deploy;

function Destroy(sender) {
    this.msg_type = "Destroy";
    this.sender = sender;
}
exports.Destroy = Destroy;

function Discover(sender) {
    this.msg_type = "Discover";
    this.sender = sender;
}

exports.Discover = Discover;

function Layout(sender) {
    this.msg_type = "Layout";
    this.sender = sender;
}
exports.Layout = Layout;

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

function NewDevice(type) {
    this.type = type;
}
exports.NewDevice = NewDevice;

function PasteDevice(device) {
    this.device = device;
}
exports.PasteDevice = PasteDevice;

function PasteProcess(process) {
    this.process = process;
}
exports.PasteProcess = PasteProcess;


function NewGroup(type) {
    this.type = type;
}
exports.NewGroup = NewGroup;

function PasteRack(group) {
    this.group = group;
}
exports.PasteRack = PasteRack;

function PasteSite(group) {
    this.group = group;
}
exports.PasteSite = PasteSite;

function CopySite(site) {
    this.msg_type = "CopySite";
    this.site = site;
}
exports.CopySite = CopySite;


function GroupMove(sender, id, x1, y1, x2, y2, previous_x1, previous_y1, previous_x2, previous_y2) {
    this.msg_type = "GroupMove";
    this.sender = sender;
    this.id = id;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.previous_x1 = previous_x1;
    this.previous_y1 = previous_y1;
    this.previous_x2 = previous_x2;
    this.previous_y2 = previous_y2;
}
exports.GroupMove = GroupMove;

function GroupCreate(sender, id, x1, y1, x2, y2, name, type, group_id) {
    this.msg_type = "GroupCreate";
    this.sender = sender;
    this.id = id;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.name = name;
    this.type = type;
    this.group_id = group_id;
}
exports.GroupCreate = GroupCreate;

function GroupDestroy(sender, id, previous_x1, previous_y1, previous_x2, previous_y2, previous_name, previous_type, previous_group_id) {
    this.msg_type = "GroupDestroy";
    this.sender = sender;
    this.id = id;
    this.previous_x1 = previous_x1;
    this.previous_y1 = previous_y1;
    this.previous_x2 = previous_x2;
    this.previous_y2 = previous_y2;
    this.previous_name = previous_name;
    this.previous_type = previous_type;
    this.previous_group_id = previous_group_id;
}
exports.GroupDestroy = GroupDestroy;

function GroupLabelEdit(sender, id, name, previous_name) {
    this.msg_type = "GroupLabelEdit";
    this.sender = sender;
    this.id = id;
    this.name = name;
    this.previous_name = previous_name;
}
exports.GroupLabelEdit = GroupLabelEdit;

function GroupSelected(sender, id) {
    this.msg_type = "GroupSelected";
    this.sender = sender;
    this.id = id;
}
exports.GroupSelected = GroupSelected;

function GroupUnSelected(sender, id) {
    this.msg_type = "GroupUnSelected";
    this.sender = sender;
    this.id = id;
}
exports.GroupUnSelected = GroupUnSelected;

function GroupMembership(sender, id, members) {
    this.msg_type = "GroupMembership";
    this.sender = sender;
    this.id = id;
    this.members = members;
}
exports.GroupMembership = GroupMembership;

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
