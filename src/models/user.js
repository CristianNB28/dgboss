const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getUsers: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query('SELECT * FROM Usuario WHERE deshabilitar_usuario=0',
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
    getUser: (idUser) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query('SELECT * FROM Usuario WHERE id_usuario=?', [idUser],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
/*                  POST                 */
    postLogin: (email_username) => {
        const validateEmail = email => /\S+@\S+/.test(email);
        if (validateEmail(email_username) === true) {
            return new Promise((resolve, reject) => {
                db.getConnection((err, connection) => {
                    if(err) { 
                        console.log(err); 
                        return; 
                    }
                    connection.query(`SELECT id_usuario, nombre_apellido_usuario, cargo_usuario, password_usuario 
                                    FROM Usuario 
                                    WHERE correo_usuario=? AND deshabilitar_usuario=0`, 
                    [email_username],
                    (error, rows) => {
                        connection.release();
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(rows);
                    });
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.getConnection((err, connection) => {
                    if(err) { 
                        console.log(err); 
                        return; 
                    }
                    connection.query(`SELECT id_usuario, nombre_apellido_usuario, cargo_usuario, password_usuario 
                                    FROM Usuario 
                                    WHERE username=? AND deshabilitar_usuario=0`, 
                    [email_username],
                    (error, rows) => {
                        connection.release();
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(rows);
                    });
                });
            });
        }
    },
    postUserForm: (password, idExecutive, user) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Usuario (cedula_usuario, tipo_cedula_usuario, nombre_apellido_usuario, cargo_usuario, correo_usuario, direccion_usuario, username, password_usuario, ejecutivo_id)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [user.cedula_usuario, user.tipo_cedula_usuario, user.nombre_apellido_usuario, user.cargo_usuario, user.email_usuario, user.direccion_usuario, user.username, password, idExecutive],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
/*                  PUT                  */
    updateUser: (password, idExecutive, user) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Usuario 
                                SET cedula_usuario=?, tipo_cedula_usuario=?, nombre_apellido_usuario=?, cargo_usuario=?, correo_usuario=?, direccion_usuario=?, username=?, password_usuario=?, ejecutivo_id=?    
                                WHERE id_usuario=?`, 
                [user.cedula_usuario, user.tipo_cedula_usuario, user.nombre_apellido_usuario, user.cargo_usuario, user.email_usuario, user.direccion_usuario, user.username, password, idExecutive, user.id_usuario],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
    updateDisableUser: (id, user) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Usuario 
                                SET obser_deshabilitar_usuario=?    
                                WHERE id_usuario=?`, 
                [user.obser_deshabilitar_usuario, id], 
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
/*               DELETE                  */
    disableUser: (id, disableUser) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Usuario 
                                SET deshabilitar_usuario=? 
                                WHERE id_usuario=?`, 
                [disableUser, id],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    }
}