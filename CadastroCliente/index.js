var app = require('express')();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){
    req.on("end", function(){
        console.log(res);
    });
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
