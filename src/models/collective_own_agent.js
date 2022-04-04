const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getCollectiveOwnAgent: (collectiveId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Colectivo_Agente_Propio 
                    WHERE colectivo_id=? AND deshabilitar_cap=0`, 
            [collectiveId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postCollectiveOwnAgent: async (colectivoId, ownAgentId) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Colectivo_Agente_Propio (colectivo_id, agente_propio_id) 
                    VALUES (?, ?)`, 
            [colectivoId, ownAgentId[0].id_agente_propio], 
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
    disableCollectiveOwnAgent: (id, disableCAP) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Colectivo_Agente_Propio 
                    SET deshabilitar_cap=? 
                    WHERE colectivo_id=?`, 
            [disableCAP, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}