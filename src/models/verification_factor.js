const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getVerificationFactor: (idCommission) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Factor_Verificacion 
                    WHERE comision_id=?`,
            [idCommission],
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
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