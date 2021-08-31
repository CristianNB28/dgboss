const db = require('../../config/database');

module.exports = {
/*                  GET                  */
/*                  POST                 */
    postPolicyHedgeForm: async (descripcionCobertura) => {
        let policyId = await new Promise((resolve, reject) => {
            db.query(`SELECT id_poliza 
                    FROM Poliza 
                    WHERE deshabilitar_poliza=0
                    ORDER BY id_poliza DESC
                    LIMIT 1;`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
        let hedgeId = await new Promise((resolve, reject) => {
            db.query('SELECT id_cobertura FROM Cobertura WHERE descripcion_cobertura=? AND deshabilitar_cobertura=0', 
            [descripcionCobertura], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza_Cobertura (poliza_id, cobertura_id) 
                    VALUES (?, ?)`, [policyId[0].id_poliza, hedgeId[0].id_cobertura], 
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