const mysql = require('mysql');
const connection =  mysql.createConnection({
    host: process.env.DB_HOST || '186.90.167.50',
    user: process.env.DB_USER || 'grdqmgkt_sistema_user',
    password: process.env.DB_PASSWORD || '(Ns]&ZSei6&y',
    database: process.env.DB_DATABASE || 'grdqmgkt_sistema'
});

connection.connect((error) => {
    if (error) {
        console.log('El error de conexion es: ' + error);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = connection;