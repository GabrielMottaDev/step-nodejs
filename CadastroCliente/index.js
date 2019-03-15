const mysql = require('mysql');

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
    addCliente("Fulano", "231.002.999-00.");
  }
);

function createTable() {
  var sql = "CREATE TABLE IF NOT EXISTS `cliente` (";
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

function hasCliente(cpf, callback) {
  cpf = cpf.split('.').join('');
  cpf = cpf.split('-').join('');

  var sql = "SELECT * FROM `cliente` WHERE `cpf`='" + cpf + "'";
  connection.query(sql, function (error, results, fields) {
    callback(results.length > 0);
  });
}

function addCliente(nome, cpf) {
  cpf = cpf.split('.').join('');
  cpf = cpf.split('-').join('');
  const sql = "INSERT INTO `cliente`" +
    "(`nome` ,`cpf`) VALUES" +
    "('" + nome + "', '" + cpf + "');";
  connection.query(sql, function (error, results, fields) {
    if (error) return console.log(error);
    console.log('Cliente cadastrado com sucesso!');
  });
};