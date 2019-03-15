const mysql = require('mysql');
var ip = require("ip");
var publicIp = require('public-ip');
var fs = require('fs');
var express = require('express');
var http = require('http');
var socketio = require('socket.io');

const port = 81;

var app = express();
var server = http.Server(app);
server.listen(port);
var io = socketio(server);

var internalIP = ip.address();
var internalIpRange = getInternalIpRange(internalIP);
var externalIP = "nada";

function getInternalIpRange(varIp) {
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

publicIp.v4().then(ip => {
  externalIP = ip;
  start();
});

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

  io.on('connection', function (socket) {
    console.log("[SOCKET] Conexão estabelecida com: " + socket.handshake.address.replace("::ffff:", ""));

    socket.on('cadastrar', function (nome, cpf) {
      hasAluno(cpf, function (has) {
        if (!has) {
          addAluno(nome, cpf);
          socket.emit('success', nome);
        } else {
          socket.emit('error-already-exist', cpf);
        }
      });
    });
  });
}

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'GabrielMottaConn'
});

connection.connect(
  function (err) {
    if (err) return console.log(err);
    console.log('[MySQL] Conectado');
    createTable(connection);
  }
);

function createTable() {
  var sql = "CREATE TABLE IF NOT EXISTS `aluno` (";
  sql += "`id` INT NOT NULL AUTO_INCREMENT, ";
  sql += "`nome` NCHAR(20) NOT NULL, ";
  sql += "`cpf` VARCHAR(11) NOT NULL, ";
  sql += "PRIMARY KEY (ID)";
  sql += ");";
  connection.query(sql, function (error, result, fields) {
    if (error) return console.log(error);
    console.log('Tabela criada com sucesso');
  });
}

function hasAluno(cpf, callback) {
  cpf = cpf.split('.').join('');
  cpf = cpf.split('-').join('');

  var sql = "SELECT * FROM `aluno` WHERE `cpf`='" + cpf + "'";
  connection.query(sql, function (error, results, fields) {
    callback(results.length > 0);
  });
}

function addAluno(nome, cpf) {
  cpf = cpf.split('.').join('');
  cpf = cpf.split('-').join('');
  const sql = "INSERT INTO `aluno`" +
    "(`nome` ,`cpf`) VALUES" +
    "('" + nome + "', '" + cpf + "');";
  connection.query(sql, function (error, results, fields) {
    if (error) return console.log(error);
    console.log('Aluno cadastrado com sucesso!');
  });
};