const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getPolInsuInsuredVehi: (paaId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Pol_Aseg_Asegurado_Vehi 
                                WHERE paa_id=? AND deshabilitar_paav=0`, 
                [paaId],
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
    postPolInsuInsuredVehi: async (paaId, vehicleId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Pol_Aseg_Asegurado_Vehi (paa_id, vehiculo_id) 
                                VALUES (?, ?)`, 
                [paaId, vehicleId],
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
    disablePolInsuInsuredVehi: (id, disablePIIV) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Pol_Aseg_Asegurado_Vehi 
                                SET deshabilitar_paav=? 
                                WHERE id_paav=?`, 
                [disablePIIV, id],
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