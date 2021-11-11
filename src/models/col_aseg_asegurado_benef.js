const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getColInsuInsuredBenef: (caaId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * 
                    FROM Col_Aseg_Asegurado_Benef 
                    WHERE caa_id=? AND deshabilitar_caab=0`, 
            [caaId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getColInsuInsuredBenefs: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * 
                    FROM Col_Aseg_Asegurado_Benef 
                    WHERE deshabilitar_caab=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getColInsuInsuredBenefId: (beneficiaryId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_caab 
                    FROM Col_Aseg_Asegurado_Benef 
                    WHERE beneficiario_id=? AND deshabilitar_caab=0`, 
            [beneficiaryId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postColInsuInsuredBenef: async (caaId, BeneficiaryId) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Col_Aseg_Asegurado_Benef (caa_id, beneficiario_id) 
                    VALUES (?, ?)`, [caaId, BeneficiaryId], 
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
    disableColInsuInsuredBenef: (id, disableCIIB) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Col_Aseg_Asegurado_Benef SET deshabilitar_caab=? WHERE id_caab=?`, 
            [disableCIIB, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}