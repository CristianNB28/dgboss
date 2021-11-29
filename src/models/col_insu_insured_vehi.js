const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getColInsuInsuredVehi: (caaId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * 
                    FROM Col_Aseg_Asegurado_Vehi 
                    WHERE caa_id=? AND deshabilitar_caav=0`, 
            [caaId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getColInsuInsuredVehiId: (vehicleId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * 
                    FROM Col_Aseg_Asegurado_Vehi 
                    WHERE vehiculo_id=? AND deshabilitar_caav=0`, 
            [vehicleId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postColInsuInsuredVehi: async (caaId, vehicleId) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Col_Aseg_Asegurado_Vehi (caa_id, vehiculo_id) 
                    VALUES (?, ?)`, [caaId, vehicleId], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
/*               DELETE                  */
    disableColInsuInsuredVehi: (id, disableCIIV) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Col_Aseg_Asegurado_Vehi SET deshabilitar_caav=? WHERE id_caav=?`, 
            [disableCIIV, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    disableColInsuInsuredVehiId: (idVehicle, disableCIIV) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Col_Aseg_Asegurado_Vehi SET deshabilitar_caav=? WHERE vehiculo_id=?`, 
            [disableCIIV, idVehicle], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}