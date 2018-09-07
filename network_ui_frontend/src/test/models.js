

function Test(name, event_trace, fsm_trace, pre_test_snapshot, post_test_snapshot) {
    this.name = name;
    this.event_trace = event_trace;
    this.fsm_trace = fsm_trace;
    this.pre_test_snapshot = pre_test_snapshot;
    this.post_test_snapshot = post_test_snapshot;
}
exports.Test = Test;

function TestResult(id, name, result, date, code_under_test) {
    this.id = id;
    this.name = name;
    this.result = result;
    this.date = date;
    this.code_under_test = code_under_test;
}
exports.TestResult = TestResult;
