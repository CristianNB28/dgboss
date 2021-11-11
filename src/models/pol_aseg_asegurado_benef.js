const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getPolInsuInsuredBenefs: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * 
                    FROM Pol_Aseg_Asegurado_Benef 
                    WHERE deshabilitar_paab=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getPolInsuInsuredBenef: (paaId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * 
                    FROM Pol_Aseg_Asegurado_Benef 
                    WHERE paa_id=? AND deshabilitar_paab=0`, 
            [paaId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getPolInsuInsuredBenefId: (beneficiaryId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_paab 
                    FROM Pol_Aseg_Asegurado_Benef 
                    WHERE beneficiario_id=? AND deshabilitar_paab=0`, 
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
    postPolInsuInsuredBenef: async (paaId, BeneficiaryId) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Pol_Aseg_Asegurado_Benef (paa_id, beneficiario_id) 
                    VALUES (?, ?)`, [paaId, BeneficiaryId], 
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
    disablePolInsuInsuredBenef: (id, disablePIIB) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Pol_Aseg_Asegurado_Benef SET deshabilitar_paab=? WHERE id_paab=?`, 
            [disablePIIB, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}