

function EnableTest() {
    this.msg_type = "EnableTest";
}
exports.EnableTest = EnableTest;

function DisableTest() {
    this.msg_type = "DisableTest";
}
exports.DisableTest = DisableTest;

function StartTest() {
    this.msg_type = "StartTest";
}
exports.StartTest = StartTest;

function TestCompleted() {
    this.msg_type = "TestCompleted";
}
exports.TestCompleted = TestCompleted;

function TestResult(sender, id, name, result, date, code_under_test) {
    this.msg_type = "TestResult";
    this.sender = sender;
    this.id = id;
    this.name = name;
    this.result = result;
    this.date = date;
    this.code_under_test = code_under_test;
}
exports.TestResult = TestResult;

function Coverage(sender, coverage, result_id) {
    this.msg_type = "Coverage";
    this.sender = sender;
    this.coverage = coverage;
    this.result_id = result_id;
}
exports.Coverage = Coverage;
