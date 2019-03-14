/* Dependencias */
var ip = require("ip");
var publicIp = require('public-ip');
var fs = require('fs');
var express = require('express');
var http = require('http');
var socketio = require('socket.io');

// Porta na qual o servidor será aberto
const port = 81;
// Lista de conexões que associa um nome de usuario para cada socket
var clientes = new Map();

var app = express();
var server = http.Server(app);
server.listen(port);
var io = socketio(server);

var internalIP = ip.address();
var internalIpRange = getInternalIpRange(internalIP);
var externalIP = "nada";

// Retorna o prefixo do ip local
function getInternalIpRange(varIp){
  var newInternal = "";
  var dots = 0;
  for (var i = 0; i < varIp.length; i++) {
    var character = varIp[i];
    if (character == ".") {
      dots += 1;
    }
    if (dots == 3) {
      break;
    }
    newInternal += character;
  }
  return newInternal;
}

// Retorna o ip externo
publicIp.v4().then(ip => {
  // Define o ip externo
  externalIP = ip;
  // Inicia o serviço
  start();
});

// Função que inicia o serviço
function start() {
  fs.readFile(__dirname + "/index.html", (err, html) => {
    let htmlPlusData = html.toString();
    htmlPlusData = htmlPlusData.replace("{PORT}", port);

    app.get('/', (req, res) => {
      var clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      if (clientIp.includes("::1") || clientIp.includes("127.0.0.1") || clientIp.includes(internalIpRange)) {
        console.log("[Server] Conexão local iniciada: " + clientIp.replace("::ffff:", ""));
        res.send(htmlPlusData.replace("{IP}", internalIP));
      } else {
        console.log("[Server] Conexão remota iniciada: " + clientIp.replace("::ffff:", ""));
        res.send(htmlPlusData.replace("{IP}", externalIP));
      }

    });
  });

  console.log("[SOCKET] Aguardando conexões");
  console.log("Obs: Você pode se conectar localmente utilizando os ips: [localhost:" + port + ", " + internalIP + ":" + port + ", 127.0.0.1:" + port + "]")
  console.log("Obs2: Os usuarios fora de sua rede poderão acessar pelo ip: " + externalIP + ":" + port + " (Caso a porta esteja aberta)");

  // Evento que executa quando uma conexão é estabelecida, e passa como parametro o socket (conexão)
  io.on('connection', function (socket) {
    console.log("[SOCKET] Conexão estabelecida com: " + socket.handshake.address.replace("::ffff:", ""));

    socket.on('login', function (data) {
      // Verifica se já tem um usuario concetado com o mesmo nome
      for (var [key, value] of clientes.entries()) {
        if (value == data) {
          socket.emit("login-fail")
          console.log("[SOCKET] " + socket.handshake.address.replace("::ffff:", "") + " falhou ao tentar se logar com o nome de '" + data + "'");
          return;
        }
      }
      console.log("[SOCKET] " + socket.handshake.address.replace("::ffff:", "") + " se logou com o nome: " + data);
      // Registra e associa a conexão do cliente com o nome de usuario escolhido
      clientes.set(socket, data);
      // Informa para o cliente que o login foi efetuado corretamente
      socket.emit('login-success');
      // Informa a todos os clientes conectados a entrada do novo cliente
      io.sockets.emit('message', "Servidor: " + data + " entrou no chat!");
      // Envia mensagem de boas vindas
      socket.emit('message', "Servidor: " + "Olá, bem vindo ao bate papo!");
    });

    // Evento que le mensagens recebidas pelos clientes
    socket.on('message', function (data) {
      // Verifica se o cliente que enviou a mensagem já se logou
      if (!clientes.has(socket)) {
        io.sockets.emit('message', "Servidor: " + "Você precisa estar logado para enviar mensagens!")
        return;
      }

      // Pega no registro de clientes o nome de usuario com base na conexão e reenvia a mensagem para todos os clientes (sockets) conectados
      io.sockets.emit('message', clientes.get(socket) + ": " + data);
    });

    // Evento que executa quando uma conexão é perdida
    socket.on('disconnect', function () {
      
      // Verifica se a conexão que foi perdida estava registrada
      if (clientes.has(socket)) {
        console.log("[SOCKET] Conexão perdida com: " + socket.handshake.address.replace("::ffff:", "") + " (" + clientes.get(socket)+ ")");

        // Informa a todos os clientes (sockets) conectados a saida do usuario
        io.sockets.emit('message', "Servidor: " + clientes.get(socket) + " saiu do chat!");
        // Desregistra o usuario da lista
        clientes.delete(socket);
      } else {
        console.log("[SOCKET] Conexão perdida com: " + socket.handshake.address.replace("::ffff:", ""));
      }
    });
  });
}