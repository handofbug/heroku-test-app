var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.end('hello');
});

app.listen(app.get('port2'), function() {
  console.log('Node app is running on port', app.get('port'));
});
