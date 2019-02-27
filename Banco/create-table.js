const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'localhost',
    port : 8080,
    user : 'root',
    password : '',
    database : 'GabrielMottaConn'
});

connection.connect(
    function(err) {
        if(err) return console.log(err);
        console.log('Conectado');
        createTable(connection);
        addAluno(connection);
    }
);

function createTable(conn) {
    const sql = "CREATE TABLE IF NOT EXISTS `aluno` ("+
                    "`id` INT NOT NULL AUTO_INCREMENT, "+
                    "`nome` NCHAR(20) NOT NULL, "+
                    "`cpf` VARCHAR(11) NOT NULL, "+
                    "PRIMARY KEY (`id`)"+
                ");";
    conn.query(sql, function (error, result, fields) {
        if (error) return console.log(error);
        console.log('Tabela criada com sucesso');
    });
}

function addAluno(conn){
    const sql = "INSERT INTO `aluno` (`nome`, `cpf`) "+
                "VALUES ('Zeca', '00987654321');";
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('Aluno criado com sucesso!');
    });
}