const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getUsers: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_usuario, cedula_usuario, rif_usuario, correo_usuario, direccion_usuario, nombre_usuario, cargo_usuario, tipo_linea_negocio FROM Usuario WHERE deshabilitar_usuario=0', 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getUser: (idUser) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Usuario WHERE id_usuario = ?', [idUser],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
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
        if ((user.id_rif.startsWith('J')) || (user.id_rif.startsWith('V')) || (user.id_rif.startsWith('G'))) {
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
    },
/*                  PUT                  */
    updateUser: (cedulaUsuario, rifUsuario, admin, productor, password, user) => {
        if (cedulaUsuario === '') {
            return new Promise((resolve, reject) => {
                db.query(`UPDATE Usuario 
                            SET cedula_usuario=?, rif_usuario=?, nombre_usuario=?, username=?, password_usuario=?, correo_usuario=?, telefono_usuario=?, direccion_usuario=?, cargo_usuario=?, productor_boolean=?, administrador_boolean=?, tipo_linea_negocio=?    
                            WHERE id_usuario=?`, [cedulaUsuario, rifUsuario, user.nombre_usuario, user.username, password, user.email_usuario, user.telefono_usuario, user.direccion_usuario, user.cargo_usuario, productor, admin, user.negocio, user.id_usuario], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`UPDATE Usuario 
                            SET cedula_usuario=?, rif_usuario=?, nombre_usuario=?, username=?, password_usuario=?, correo_usuario=?, telefono_usuario=?, direccion_usuario=?, cargo_usuario=?, productor_boolean=?, administrador_boolean=?, tipo_linea_negocio=?    
                            WHERE id_usuario=?`, [cedulaUsuario, rifUsuario, user.nombre_usuario, user.username, password, user.email_usuario, user.telefono_usuario, user.direccion_usuario, user.cargo_usuario, productor, admin, user.negocio, user.id_usuario], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        }
    },
/*               DELETE                  */
    disableUser: (id, disableUser) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Usuario SET deshabilitar_usuario=? WHERE id_usuario=?`, [disableUser, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}