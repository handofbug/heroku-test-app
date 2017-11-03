var db = require('monk')((process.env.DB_USER || 'test') + ':' + (process.env.DB_PASS || 'test') + '@ds245715.mlab.com:45715/heroku');
var users = db.get('test');
var ia = 567438;
//
var express = require('express');
var https = require('https');
var WebSocketServer = require("ws").Server;
var websocketport;

var app = express();

var requestAgent = require('request');

app.get('/', function (request, response) {
    users.find({}).then((data) => {
        response.end(JSON.stringify(data) + process.env.PORT);
    });
});

app.get('/api', function (request, response) {
    requestAgent('https://finance.tut.by/news' + ia + '.html', (error, res, body) => {
        console.log(res.headers['content-length']);
        console.log('https://finance.tut.by/news' + ia + '.html');
        response.end(websocketport + ' asdasd' + res.headers['content-length']);
    }); 
    ia--;
});


app.get('/insert', function (request, response) {
    users.insert({
        'name': 'name'
    });
    response.end('');
});

app.set('port', (process.env.PORT || 5000));



var server = https.createServer(app);
var wss = new WebSocketServer({
    server: server
});

wss.on("connection", function (ws) {
    var id = setInterval(function () {

        
        ws.send(JSON.stringify(new Date()), function () {});
    }, 3000);

    console.log("websocket connection open");

    ws.on("close", function () {
        console.log("websocket connection close");
        clearInterval(id);
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

server.listen(8080, function listening() {
    websocketport = server.address().port;
    console.log('Listening on %d', websocketport);
  });