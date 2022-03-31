const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getPolicyAgentExecutive: (policyId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Poliza_Agente_Ejecutivo 
                    WHERE poliza_id=? AND deshabilitar_pae=0`, 
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
    postPolicyAgentExecutive: async (policyId, ownAgentId, executiveId) => {
        if (ownAgentId.length === 0) {
            ownAgentId = null;
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Poliza_Agente_Ejecutivo (poliza_id, agente_propio_id, ejecutivo_id) 
                        VALUES (?, ?, ?)`, 
                [policyId, ownAgentId, executiveId[0].id_ejecutivo], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else {
            executiveId = null;
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Poliza_Agente_Ejecutivo (poliza_id, agente_propio_id, ejecutivo_id) 
                        VALUES (?, ?, ?)`, 
                [policyId, ownAgentId[0].id_agente_propio, executiveId], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        }
    },
/*                  PUT                  */
/*               DELETE                  */
    disablePolicyAgentExecutive: (id, disablePAE) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza_Agente_Ejecutivo 
                    SET deshabilitar_pae=? 
                    WHERE poliza_id=?`, 
            [disablePAE, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}