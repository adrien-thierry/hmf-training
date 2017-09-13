var test;
var wf = WF();
test = require('../logger.app.js');

var loggerTest = new test({});
loggerTest.code(wf.Emulate.req, wf.Emulate.res);
