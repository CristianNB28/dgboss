const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getCollectiveOwnAgent: (collectiveId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Colectivo_Agente_Propio 
                                WHERE colectivo_id=? AND deshabilitar_cap=0`, 
                [collectiveId],
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
    postCollectiveOwnAgent: async (colectivoId, ownAgentId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Colectivo_Agente_Propio (colectivo_id, agente_propio_id) 
                                VALUES (?, ?)`, 
                [colectivoId, ownAgentId[0].id_agente_propio],
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
    updateCollectiveOwnAgent: async (colectivoId, ownAgentId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Colectivo_Agente_Propio 
                                SET agente_propio_id=? 
                                WHERE colectivo_id=?`, 
                [ownAgentId[0].id_agente_propio, colectivoId],
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
    disableCollectiveOwnAgent: (id, disableCAP) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Colectivo_Agente_Propio 
                                SET deshabilitar_cap=? 
                                WHERE colectivo_id=?`, 
                [disableCAP, id],
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