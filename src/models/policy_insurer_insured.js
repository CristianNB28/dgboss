const db = require('../../config/database');

module.exports = {
/*                  GET                  */
/*                  POST                 */
    postPolicyInsurerInsured: async (cedula_asegurado, rif_asegurado, nombre_aseguradora, policyId) => {
        let insuredId = 0;
        if (cedula_asegurado === '') {
            insuredId = await new Promise((resolve, reject) => {
                db.query('SELECT id_asegurado FROM Asegurado WHERE rif_asegurado=? AND deshabilitar_asegurado=0', [rif_asegurado], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else {
            insuredId = await new Promise((resolve, reject) => {
                db.query('SELECT id_asegurado FROM Asegurado WHERE cedula_asegurado=? AND deshabilitar_asegurado=0', [cedula_asegurado], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        }
        let insurerId = await  new Promise((resolve, reject) => {
            db.query('SELECT id_aseguradora FROM Aseguradora WHERE nombre_aseguradora=? AND deshabilitar_aseguradora=0', [nombre_aseguradora], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza_Aseguradora_Asegurado (poliza_id, aseguradora_id, asegurado_id) 
                    VALUES (?, ?, ?)`, [policyId, insurerId[0].id_aseguradora, insuredId[0].id_asegurado], 
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