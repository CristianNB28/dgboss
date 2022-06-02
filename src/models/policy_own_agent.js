const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getPolicyOwnAgent: (policyId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Poliza_Agente_Propio 
                                WHERE poliza_id=? AND deshabilitar_pap=0`, 
                [policyId],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
/*                  POST                 */
    postPolicyOwnAgent: async (policyId, ownAgentId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Poliza_Agente_Propio (poliza_id, agente_propio_id) 
                                VALUES (?, ?)`, 
                [policyId, ownAgentId[0].id_agente_propio],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
/*                  PUT                  */
    updatePolicyOwnAgent: async (policyId, ownAgentId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Poliza_Agente_Propio 
                                SET agente_propio_id=? 
                                WHERE poliza_id=?`, 
                [ownAgentId[0].id_agente_propio, policyId],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
/*               DELETE                  */
    disablePolicyOwnAgent: (id, disablePAP) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Poliza_Agente_Propio 
                                SET deshabilitar_pap=? 
                                WHERE poliza_id=?`, 
                [disablePAP, id],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    }
}