const port = 81;
var clientes = new Map();

var publicIp = require('public-ip');
var fs = require('fs');
var app = require('express')();
var server = require('http').Server(app);
server.listen(port);
var io = require('socket.io')(server);

/*app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});*/

var externalIP = "nada";

publicIp.v4().then(ip => {
  externalIP = ip;
  start();
});

function start(){
fs.readFile(__dirname + "/index.html", (err, html) => {
  let htmlPlusData = html.toString();
  htmlPlusData = htmlPlusData.replace("{PORT}", port);

  app.get('/', (req, res) => {
      var clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log(clientIp);
      if(clientIp.includes("::1")){
        console.log("CONEXAO LOCAL");
        res.send(htmlPlusData.replace("{IP}", "localhost"));
      } else {
        console.log("CONEXAO REMOTA");
        res.send(htmlPlusData.replace("{IP}", externalIP));
      }
      
  });
});

console.log("[SOCKET] Aguardando conexões");

// Evento que executa quando uma conexão é estabelecida, e passa como parametro o socket (conexão)
io.on('connection', function (socket) {
  console.log("[SOCKET] Nova conexão estabelecida");

  socket.on('login', function(data){
    for (var [key, value] of clientes.entries()) {
      console.log(value);
      if(value == data){
        socket.emit("login-fail")
        return;
      }
    }
    clientes.set(socket, data);
    socket.emit('login-success');
    // Envia mensagem de boas vindas
    io.sockets.emit('message', "Servidor: " + data + " entrou no chat!");
    socket.emit('message', "Servidor: " + "Olá, bem vindo ao bate papo!");
  });

  // Evento que le mensagens recebidas pelos clientes
  socket.on('message', function (data) {
    if(!clientes.has(socket)){
      io.sockets.emit('message', "Servidor: " + "Você estar logado para enviar mensagens!")
      return;
    }

    // Reenvia a mensagem para todos os clientes (sockets) conectados
    io.sockets.emit('message', clientes.get(socket) + ": " + data);
  });

  // Evento que executa quando uma conexão é perdida
  socket.on('disconnect', function(){
    console.log("[SOCKET] Uma conexão foi perdida");
    if(clientes.has(socket)){
       io.sockets.emit('message', "Servidor: " + clientes.get(socket) + " saiu do chat!");
       clientes.delete(socket);
    }
  });
});
}