const db = require('../../config/database');

module.exports = {
    postLogin: (correo_usuario) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_usuario, correo_usuario, password_usuario, nombre_usuario FROM Usuario WHERE correo_usuario = ?', [correo_usuario], (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}