const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getExecutives: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query('SELECT * FROM Ejecutivo WHERE deshabilitar_ejecutivo=0',
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
    getExecutive: (idExecutive) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query('SELECT * FROM Ejecutivo WHERE id_ejecutivo=?', 
                [idExecutive],
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
    getExecutiveId: (nombreEjecutivo, apellidoEjecutivo) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_ejecutivo 
                                FROM Ejecutivo 
                                WHERE nombre_ejecutivo=? AND apellido_ejecutivo=?`, 
                [nombreEjecutivo, apellidoEjecutivo],
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
    postExecutiveForm: (nombreEjecutivo, apellidoEjecutivo, montoPorcentajeEjecutivo, executive) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Ejecutivo (cedula_ejecutivo, tipo_cedula_ejecutivo, nombre_ejecutivo, apellido_ejecutivo, celular_ejecutivo, correo_ejecutivo, direccion_ejecutivo, cargo_ejecutivo, departamento_cargo_ejecutivo, porcentaje_ejecutivo)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [executive.cedula_ejecutivo, executive.tipo_cedula_ejecutivo, nombreEjecutivo, apellidoEjecutivo, executive.celular_ejecutivo, executive.correo_ejecutivo, executive.direccion_ejecutivo, executive.cargo_ejecutivo, executive.departamento_cargo_ejecutivo, montoPorcentajeEjecutivo],
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
    updateExecutive: (nombreEjecutivo, apellidoEjecutivo, montoPorcentajeEjecutivo, executive) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Ejecutivo 
                                SET cedula_ejecutivo=?, tipo_cedula_ejecutivo=?, nombre_ejecutivo=?, apellido_ejecutivo=?, celular_ejecutivo=?, correo_ejecutivo=?, direccion_ejecutivo=?, cargo_ejecutivo=?, departamento_cargo_ejecutivo=?, porcentaje_ejecutivo=?    
                                WHERE id_ejecutivo=?`, 
                [executive.cedula_ejecutivo, executive.tipo_cedula_ejecutivo, nombreEjecutivo, apellidoEjecutivo, executive.celular_ejecutivo, executive.correo_ejecutivo, executive.direccion_ejecutivo, executive.cargo_ejecutivo, executive.departamento_cargo_ejecutivo, montoPorcentajeEjecutivo, executive.id_ejecutivo],
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
    updateDisableExecutive: (id, executive) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Ejecutivo 
                                SET obser_deshabilitar_ejecutivo=?       
                                WHERE id_ejecutivo=?`, 
                [executive.obser_deshabilitar_ejecutivo, id],
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
    disableExecutive: (id, disableExecutive) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Ejecutivo 
                                SET deshabilitar_ejecutivo=? 
                                WHERE id_ejecutivo=?`, 
                [disableExecutive, id],
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