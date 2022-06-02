const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getEmergencies: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Emergencia 
                                WHERE deshabilitar_emergencia=0`,
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
    getEmergency: (idEmergency) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Emergencia 
                                WHERE id_emergencia=?`, 
                [idEmergency],
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
    postEmergencyForm: async (montoReclamoEmergencia, montoPagadoEmergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, insuredBeneficiaryId, emergency) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Emergencia (patologia_emergencia, clinica_emergencia, fecha_ocurrencia_emergencia, fecha_notificacion_emergencia, monto_reclamado_emergencia, monto_pagado_emergencia, observacion_emergencia, tipo_moneda_emergencia, estatus_emergencia, numero_siniestro_emergencia, asegurado_beneficiario_id) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [emergency.patologia_emergencia, emergency.clinica_emergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, montoReclamoEmergencia, montoPagadoEmergencia, emergency.observacion_emergencia, emergency.tipo_moneda_reclamo, emergency.estatus, emergency.numero_siniestro_emergencia, insuredBeneficiaryId],
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
    updateEmergency: async (montoReclamoEmergencia, montoPagadoEmergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, insuredBeneficiaryId, emergency) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Emergencia 
                                SET patologia_emergencia=?, clinica_emergencia=?, fecha_ocurrencia_emergencia=?, fecha_notificacion_emergencia=?, monto_reclamado_emergencia=?, monto_pagado_emergencia=?, observacion_emergencia=?, tipo_moneda_emergencia=?, estatus_emergencia=?, numero_siniestro_emergencia=?, asegurado_beneficiario_id=?
                                WHERE id_emergencia=?`, 
                [emergency.patologia_emergencia, emergency.clinica_emergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, montoReclamoEmergencia, montoPagadoEmergencia, emergency.observacion_emergencia, emergency.tipo_moneda_reclamo, emergency.estatus, emergency.numero_siniestro_emergencia, insuredBeneficiaryId, emergency.id_emergencia],
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
    updateDisableEmergency: (id, emergency) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Emergencia 
                                SET obser_deshabilitar_emergencia=?    
                                WHERE id_emergencia=?`, 
                [emergency.obser_deshabilitar_emergencia, id],
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
    disableEmergency: (id, disableEmergency) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Emergencia 
                                SET deshabilitar_emergencia=? 
                                WHERE id_emergencia=?`, 
                [disableEmergency, id],
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