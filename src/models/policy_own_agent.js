const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getPolicyOwnAgent: (policyId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Poliza_Agente_Propio 
                    WHERE poliza_id=? AND deshabilitar_pap=0`, 
            [policyId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postPolicyOwnAgent: async (policyId, ownAgentId) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza_Agente_Propio (poliza_id, agente_propio_id) 
                    VALUES (?, ?)`, 
            [policyId, ownAgentId[0].id_agente_propio], 
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
    disablePolicyOwnAgent: (id, disablePAP) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza_Agente_Propio 
                    SET deshabilitar_pap=? 
                    WHERE poliza_id=?`, 
            [disablePAP, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}