const db = require('../../config/database');

module.exports = {
/*                  GET                  */
/*                  POST                 */
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
    },
    postUserForm: (admin, productor, password, user) => {
        if ((user.id_rif.startsWith('J')) || (user.id_rif.startsWith('V'))) {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Usuario (rif_usuario, nombre_usuario, username, password_usuario, correo_usuario, telefono_usuario, direccion_usuario, cargo_usuario, productor_boolean, administrador_boolean, tipo_linea_negocio)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [user.id_rif, user.nombre_usuario, user.username, password, user.email_usuario, user.telefono_usuario, user.direccion_usuario, user.cargo_usuario, productor, admin, user.negocio], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Usuario (cedula_usuario, nombre_usuario, username, password_usuario, correo_usuario, telefono_usuario, direccion_usuario, cargo_usuario, productor_boolean, administrador_boolean, tipo_linea_negocio)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [user.id_rif, user.nombre_usuario, user.username, password, user.email_usuario, user.telefono_usuario, user.direccion_usuario, user.cargo_usuario, productor, admin, user.negocio], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        }
    }
}