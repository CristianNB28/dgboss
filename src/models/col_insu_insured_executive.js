const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getColInsuInsuredExecutive: (caaId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Col_Aseg_Asegurado_Ejecu 
                    WHERE caa_id=? AND deshabilitar_caae=0`, 
            [caaId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postColInsuInsuredExecutive: async (caaId, executiveId) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Col_Aseg_Asegurado_Ejecu (caa_id, ejecutivo_id) 
                    VALUES (?, ?)`, 
            [caaId, executiveId], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateColInsuInsuredExecutive: async (caaeId, executiveId) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Col_Aseg_Asegurado_Ejecu 
                    SET ejecutivo_id=? 
                    WHERE id_caae=?`, 
            [executiveId, caaeId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableColInsuInsuredExecutive: (id, disableCIIE) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Col_Aseg_Asegurado_Ejecu 
                    SET deshabilitar_caae=? 
                    WHERE id_caae=?`, 
            [disableCIIE, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}