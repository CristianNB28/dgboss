const db = require('../../config/database');

module.exports = {
/*                  GET                  */
/*                  POST                 */
    postVerificationFactorForm: (porcentajePrima, idCommission, verificationFactor) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Factor_Verificacion (porcentaje_prima_factor_verificacion, estatus_comision_factor_verificacion, comision_id)
                    VALUES (?, ?, ?)`, 
            [porcentajePrima, verificationFactor.estatus_comision_factor_verificacion, idCommission[0].id_comision], 
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