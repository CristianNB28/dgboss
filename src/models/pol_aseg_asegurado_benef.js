const db = require('../../config/database');

module.exports = {
/*                  GET                  */
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
    }
/*                  PUT                  */
/*               DELETE                  */
}