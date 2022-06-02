const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getOwnAgents: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Agente_Propio 
                                WHERE deshabilitar_agente_propio=0`,
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
    getOwnAgent: (idOwnAgent) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Agente_Propio 
                                WHERE id_agente_propio=?`, 
                [idOwnAgent],
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
    getOwnAgentId: (nombresAgentePropio, apellidosAgentePropio) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_agente_propio 
                                FROM Agente_Propio 
                                WHERE nombre_agente_propio=? AND apellido_agente_propio=?`, 
                [nombresAgentePropio, apellidosAgentePropio],
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
    getOwnAgentIdCedula: (cedulaAgentePropio) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_agente_propio 
                                FROM Agente_Propio 
                                WHERE cedula_agente_propio=?`, 
                [cedulaAgentePropio],
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
    postOwnAgentForm: (porcentajeAgentePropio, nombreAgentePropio, apellidoAgentePropio, ownAgent) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Agente_Propio (cedula_agente_propio, tipo_cedula_agente_propio, nombre_agente_propio, apellido_agente_propio, celular_agente_propio, correo_agente_propio, direccion_agente_propio, porcentaje_agente_propio)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
                [ownAgent.cedula_agente_propio, ownAgent.tipo_cedula_agente_propio, nombreAgentePropio, apellidoAgentePropio, ownAgent.celular_agente_propio, ownAgent.correo_agente_propio, ownAgent.direccion_agente_propio, porcentajeAgentePropio],
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
    updateOwnAgent: (porcentajeAgentePropio, nombreAgentePropio, apellidoAgentePropio, ownAgent) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Agente_Propio 
                                SET cedula_agente_propio=?, tipo_cedula_agente_propio=?, nombre_agente_propio=?, apellido_agente_propio=?, celular_agente_propio=?, correo_agente_propio=?, direccion_agente_propio=?, porcentaje_agente_propio=?       
                                WHERE id_agente_propio=?`, 
                [ownAgent.cedula_agente_propio, ownAgent.tipo_cedula_agente_propio, nombreAgentePropio, apellidoAgentePropio, ownAgent.celular_agente_propio, ownAgent.correo_agente_propio, ownAgent.direccion_agente_propio, porcentajeAgentePropio, ownAgent.id_agente_propio],
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
    updateDisableOwnAgent: (id, ownAgent) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Agente_Propio 
                                SET obser_deshabilitar_agente_propio=?       
                                WHERE id_agente_propio=?`, 
                [ownAgent.obser_deshabilitar_agente_propio, id],
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
    disableOwnAgent: (id, disableOwnAgent) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Agente_Propio 
                                SET deshabilitar_agente_propio=? 
                                WHERE id_agente_propio=?`, 
                [disableOwnAgent, id],
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