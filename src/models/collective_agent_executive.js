const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getCollectiveAgentExecutive: (collectiveId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Colectivo_Agente_Ejecutivo 
                    WHERE colectivo_id=? AND deshabilitar_cae=0`, 
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
    postCollectiveAgentExecutive: async (colectivo_id, ownAgentId, executiveId) => {
        if (ownAgentId.length === 0) {
            ownAgentId = null;
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Colectivo_Agente_Ejecutivo (colectivo_id, agente_propio_id, ejecutivo_id) 
                        VALUES (?, ?, ?)`, 
                [colectivo_id, ownAgentId, executiveId[0].id_ejecutivo], 
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
                db.query(`INSERT INTO Colectivo_Agente_Ejecutivo (colectivo_id, agente_propio_id, ejecutivo_id) 
                        VALUES (?, ?, ?)`, 
                [colectivo_id, ownAgentId[0].id_agente_propio, executiveId], 
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
    disableCollectiveAgentExecutive: (id, disableCAE) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Colectivo_Agente_Ejecutivo 
                    SET deshabilitar_cae=? 
                    WHERE colectivo_id=?`, 
            [disableCAE, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}