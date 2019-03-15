const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'root',
    database : 'GabrielMottaConn'
});

connection.connect(
    function(err) {
        if(err) return console.log(err);
        console.log('Conectado');
        createTable(connection);
    }
);

function createTable(conn) {
    const sql = "CREATE TABLE IF NOT EXISTS `aluno` (";
    sql += "`id` INT NOT NULL AUTO_INCREMENT, ";
    sql += "`nome` NCHAR(20) NOT NULL, ";
    sql += "`idade` INT NOT NULL, ";
    sql += ");";
    conn.query(sql, function (error, result, fields) {
        if (error) return console.log(error);
        console.log('Tabela criada com sucesso');
    });
}