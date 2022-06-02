const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getColInsuInsuredVehi: (caaId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Col_Aseg_Asegurado_Vehi 
                                WHERE caa_id=? AND deshabilitar_caav=0`, 
                [caaId],
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
    getColInsuInsuredVehiId: (vehicleId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Col_Aseg_Asegurado_Vehi 
                                WHERE vehiculo_id=? AND deshabilitar_caav=0`, 
                [vehicleId],
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
    postColInsuInsuredVehi: async (temparrayVehicle) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Col_Aseg_Asegurado_Vehi (caa_id, vehiculo_id) 
                                VALUES ?`, 
                [temparrayVehicle],
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
/*               DELETE                  */
    disableColInsuInsuredVehi: (id, disableCIIV) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Col_Aseg_Asegurado_Vehi 
                                SET deshabilitar_caav=? 
                                WHERE id_caav=?`, 
                [disableCIIV, id],
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
    disableColInsuInsuredVehiId: (idVehicle, disableCIIV) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Col_Aseg_Asegurado_Vehi 
                                SET deshabilitar_caav=? 
                                WHERE vehiculo_id=?`, 
                [disableCIIV, idVehicle],
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