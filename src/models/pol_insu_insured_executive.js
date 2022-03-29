const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getPolInsuInsuredExecutive: (paaId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Pol_Aseg_Asegurado_Ejecu 
                    WHERE paa_id=? AND deshabilitar_paae=0`, 
            [paaId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postPolInsuInsuredExecutive: async (paaId, executiveId) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Pol_Aseg_Asegurado_Ejecu (paa_id, ejecutivo_id) 
                    VALUES (?, ?)`, 
            [paaId, executiveId], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updatePolInsuInsuredExecutive: async (paaeId, executiveId) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Pol_Aseg_Asegurado_Ejecu 
                    SET ejecutivo_id=? 
                    WHERE id_paae=?`, 
            [executiveId, paaeId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disablePolInsuInsuredExecutive: (id, disablePIIE) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Pol_Aseg_Asegurado_Ejecu SET deshabilitar_paae=? WHERE id_paae=?`, 
            [disablePIIE, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}