// serviço de http
var http = require('http');

// serviço do servidor
var server = http.createServer(
    function (request, response) {
        response.writeHead(
            200, {"Content-Type":"text/plain"}
        );
        response.end("Hello World\n");
    }
);

// definindo porta do servidor
server.listen(7000);
console.log("Serviço HelloWorld\nRodando na porta 7000");