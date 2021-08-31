const db = require('../../config/database');

module.exports = {
/*                  GET                  */
/*                  POST                 */
    postPolAsegAseguradoVehi: async (vehicleId) => {
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
        let paaId = await new Promise((resolve, reject) => {
            db.query('SELECT id_paa FROM Poliza_Aseguradora_Asegurado WHERE poliza_id=? AND deshabilitar_paa=0', 
            [policyId[0].id_poliza], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Pol_Aseg_Asegurado_Vehi (paa_id, vehiculo_id) 
                    VALUES (?, ?)`, [paaId[0].id_paa, vehicleId], 
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