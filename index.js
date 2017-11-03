var express = require('express');
var db = require('monk')(process.env.DB_USER + ':' + process.env.DB_PASS +'@ds245715.mlab.com:45715/heroku');
var app = express();
var users = db.get('test');
app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response) {
    users.find({}).then((data) => {
        console.log(data);
        response.end(JSON.stringify(data));
    });
});
app.get('/insert', function (request, response) {
    users.insert({'name':'name'});
        response.end('');
});
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});