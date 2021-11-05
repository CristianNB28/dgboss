const db = require('../../config/database');

module.exports = {
/*                  GET                  */
/*                  POST                 */
    postBeneficiaryForm: async (fechaNacBeneficiario, beneficiary) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Beneficiario (nombre_beneficiario, apellido_beneficiario, cedula_beneficiario, fec_nac_beneficiario, parentesco_beneficiario)
                    VALUES (?, ?, ?, ?, ?)`, 
            [beneficiary.nombre_beneficiario, beneficiary.apellido_beneficiario, beneficiary.cedula_beneficiario, fechaNacBeneficiario, beneficiary.parentesco_beneficiario], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
/*                  PUT                  */
/*               DELETE                  */
}