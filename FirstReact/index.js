const port = 81;

var express = require('express');
var http = require('http');
var app = express();
var server = http.Server(app);
server.listen(port);

function getScreen(name) {
    return __dirname + "/src/screens/" + name + ".html";
}

app.get('/', (req, res) => {
    res.sendFile(getScreen("index"));
});