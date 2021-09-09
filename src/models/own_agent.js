const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getOwnAgents: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Agente_Propio WHERE deshabilitar_agente_propio=0', (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getOwnAgent: (idOwnAgent) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Agente_Propio WHERE id_agente_propio=?', 
            [idOwnAgent],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getOwnAgentId: (nombresAgentePropio, apellidosAgentePropio) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_agente_propio FROM Agente_Propio WHERE nombre_agente_propio=? AND apellido_agente_propio=?', 
            [nombresAgentePropio, apellidosAgentePropio],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postOwnAgentForm: (cedulaAgentePropio, rifAgentePropio, ownAgent) => {
        if (cedulaAgentePropio === '') {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Agente_Propio (cedula_agente_propio, rif_agente_propio, nombre_agente_propio, apellido_agente_propio, celular_agente_propio, correo_agente_propio)
                        VALUES (?, ?, ?, ?, ?, ?)`, 
                [cedulaAgentePropio, rifAgentePropio, ownAgent.nombre_agente_propio, ownAgent.apellido_agente_propio, ownAgent.celular_agente_propio, ownAgent.correo_agente_propio], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Agente_Propio (cedula_agente_propio, rif_agente_propio, nombre_agente_propio, apellido_agente_propio, celular_agente_propio, correo_agente_propio)
                        VALUES (?, ?, ?, ?, ?, ?)`, 
                [cedulaAgentePropio, rifAgentePropio, ownAgent.nombre_agente_propio, ownAgent.apellido_agente_propio, ownAgent.celular_agente_propio, ownAgent.correo_agente_propio], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        }
    },
/*                  PUT                  */
    updateOwnAgent: (cedulaAgentePropio, rifAgentePropio, ownAgent) => {
        if (cedulaAgentePropio === '') {
            return new Promise((resolve, reject) => {
                db.query(`UPDATE Agente_Propio 
                        SET cedula_agente_propio=?, rif_agente_propio=?, nombre_agente_propio=?, apellido_agente_propio=?, celular_agente_propio=?, correo_agente_propio=?       
                        WHERE id_agente_propio=?`, 
                [cedulaAgentePropio, rifAgentePropio, ownAgent.nombre_agente_propio, ownAgent.apellido_agente_propio, ownAgent.celular_agente_propio, ownAgent.correo_agente_propio, ownAgent.id_agente_propio], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`UPDATE Agente_Propio 
                        SET cedula_agente_propio=?, rif_agente_propio=?, nombre_agente_propio=?, apellido_agente_propio=?, celular_agente_propio=?, correo_agente_propio=?       
                        WHERE id_agente_propio=?`, 
                [cedulaAgentePropio, rifAgentePropio, ownAgent.nombre_agente_propio, ownAgent.apellido_agente_propio, ownAgent.celular_agente_propio, ownAgent.correo_agente_propio, ownAgent.id_agente_propio], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        }
    },
/*               DELETE                  */
    disableOwnAgent: (id, disableOwnAgent) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Agente_Propio SET deshabilitar_agente_propio=? WHERE id_agente_propio=?`, [disableOwnAgent, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}