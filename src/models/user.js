const db = require('../../config/database');

module.exports = {
    postLogin: (correo_usuario) => {
        if (process.env.PRODUCTION == 'false') {
            return new Promise((resolve, reject) => {
                db.query('SELECT id_usuario, correo_usuario, password_usuario, nombre_usuario FROM usuario WHERE correo_usuario = ?', [correo_usuario], (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        } else if (process.env.PRODUCTION == 'true'){
            return new Promise((resolve, reject) => {
                db.query('SELECT id_usuario, correo_usuario, password_usuario, nombre_usuario FROM bjo4oss6ie2anbdpo0b0.usuario WHERE correo_usuario = ?', [correo_usuario], (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        }
    }
}