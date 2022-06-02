const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getInsurers: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_aseguradora, tipo_rif_aseguradora, rif_aseguradora, nombre_aseguradora, telefono_aseguradora, direccion_aseguradora 
                                FROM Aseguradora 
                                WHERE deshabilitar_aseguradora=0`,
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
    getInsurer: (idInsurer) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_aseguradora, tipo_rif_aseguradora, rif_aseguradora, nombre_aseguradora, telefono_aseguradora, direccion_aseguradora 
                                FROM Aseguradora 
                                WHERE id_aseguradora=?`, 
                [idInsurer],
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
    postInsurerForm: (insurer) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Aseguradora (rif_aseguradora, tipo_rif_aseguradora, nombre_aseguradora, telefono_aseguradora, direccion_aseguradora)
                                VALUES (?, ?, ?, ?, ?)`, 
                [insurer.rif_aseguradora, insurer.tipo_rif_aseguradora, insurer.nombre_aseguradora, insurer.telefono_aseguradora, insurer.direccion_aseguradora],
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
    updateInsurer: (insurer) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Aseguradora 
                                SET rif_aseguradora=?, tipo_rif_aseguradora=?, nombre_aseguradora=?, direccion_aseguradora=?, telefono_aseguradora=? 
                                WHERE id_aseguradora=?`, 
                [insurer.rif_aseguradora, insurer.tipo_rif_aseguradora, insurer.nombre_aseguradora, insurer.direccion_aseguradora, insurer.telefono_aseguradora, insurer.id_aseguradora],
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
    updateDisableInsurer: (id, insurer) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Aseguradora 
                                SET obser_deshabilitar_aseguradora=? 
                                WHERE id_aseguradora=?`, 
                [insurer.obser_deshabilitar_aseguradora, id],
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
    disableInsurer: (id, disableInsurer) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Aseguradora 
                                SET deshabilitar_aseguradora=? 
                                WHERE id_aseguradora=?`, 
                [disableInsurer, id],
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