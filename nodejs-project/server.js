var code = require('./code.js');
var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
  console.log("/ is called on server");
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/ajax', function(req, res) {
  console.log("/ajax is called on server");
  res.send(code.hello());
});

console.log("Opening the server");
app.listen(8080);
console.log('TECHIO> open -p 8080 /nodejs-project');
console.log("Server opened");
