const db = require('../../config/database');

module.exports = {
/*                  GET                  */
/*                  POST                 */
    postPolicyBondForm: async (tipoBono) => {
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
        let bondId = await new Promise((resolve, reject) => {
            db.query('SELECT id_bono FROM Bono WHERE tipo_bono=? AND deshabilitar_bono=0', 
            [tipoBono], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza_Bono (poliza_id, bono_id) 
                    VALUES (?, ?)`, [policyId[0].id_poliza, bondId[0].id_bono], 
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