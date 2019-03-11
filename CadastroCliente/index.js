var app = require('express')();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){
    req.on("end", function(){
        res.writeHead(200, {"Content-Type":"text/html"});

        res.end(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title></title
                </head>
                <body>
                    <p>${body}</p>
                </body>

            </html
        `);
    });
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
