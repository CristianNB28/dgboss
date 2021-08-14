const db = require('../../config/database');

module.exports = {
    postLogin: (email_username) => {
        const validateEmail = email => /\S+@\S+/.test(email);
        if (validateEmail(email_username) === true) {
            return new Promise((resolve, reject) => {
                db.query('SELECT id_usuario, correo_usuario, password_usuario, nombre_usuario FROM Usuario WHERE correo_usuario = ?', [email_username], (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query('SELECT id_usuario, username, password_usuario, nombre_usuario FROM Usuario WHERE username = ?', [email_username], (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        }
    }
}