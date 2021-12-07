const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getEmergencies: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Emergencia 
                    WHERE deshabilitar_emergencia=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getEmergency: (idEmergency) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Emergencia 
                    WHERE id_emergencia=?`, 
            [idEmergency], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postEmergencyForm: async (montoReclamoEmergencia, montoPagadoEmergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, emergency) => {
        let legalInsuredId = 0;
        let naturalInsuredId = 0;
        if (emergency.id_rif_asegurado.startsWith('J') || emergency.id_rif_asegurado.startsWith('G')) {
            legalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_jur 
                        FROM Asegurado_Persona_Juridica 
                        WHERE deshabilitar_asegurado_per_jur=0 AND rif_asegurado_per_jur=?`,
                [emergency.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (emergency.id_rif_asegurado.match(/^\d/)) {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_nat 
                        FROM Asegurado_Persona_Natural 
                        WHERE deshabilitar_asegurado_per_nat=0 AND cedula_asegurado_per_nat=?`,
                [emergency.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        }
        if (legalInsuredId[0] !== undefined) {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Emergencia (patologia_emergencia, clinica_emergencia, fecha_ocurrencia_emergencia, fecha_notificacion_emergencia, monto_reclamado_emergencia, monto_pagado_emergencia, observacion_emergencia, tipo_moneda_emergencia, estatus_emergencia, siniestro_nombre_emergencia, asegurado_per_jur_id) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [emergency.patologia_emergencia, emergency.clinica_emergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, montoReclamoEmergencia, montoPagadoEmergencia, emergency.observacion_emergencia, emergency.tipo_moneda_emergencia, emergency.estatus, emergency.siniestro_nombre, legalInsuredId[0].id_asegurado_per_jur], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Emergencia (patologia_emergencia, clinica_emergencia, fecha_ocurrencia_emergencia, fecha_notificacion_emergencia, monto_reclamado_emergencia, monto_pagado_emergencia, observacion_emergencia, tipo_moneda_emergencia, estatus_emergencia, siniestro_nombre_emergencia, asegurado_per_nat_id) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [emergency.patologia_emergencia, emergency.clinica_emergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, montoReclamoEmergencia, montoPagadoEmergencia, emergency.observacion_emergencia, emergency.tipo_moneda_emergencia, emergency.estatus, emergency.siniestro_nombre, naturalInsuredId[0].id_asegurado_per_nat], 
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
    updateEmergency: async (montoReclamoEmergencia, montoPagadoEmergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, emergency) => {
        let legalInsuredId = 0;
        let naturalInsuredId = 0;
        if (emergency.id_rif_asegurado.startsWith('J') || emergency.id_rif_asegurado.startsWith('G')) {
            legalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_jur 
                        FROM Asegurado_Persona_Juridica 
                        WHERE deshabilitar_asegurado_per_jur=0 AND rif_asegurado_per_jur=?`,
                [emergency.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (emergency.id_rif_asegurado.match(/^\d/)) {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_nat 
                        FROM Asegurado_Persona_Natural 
                        WHERE deshabilitar_asegurado_per_nat=0 AND cedula_asegurado_per_nat=?`,
                [emergency.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        }
        if (legalInsuredId[0] !== undefined) {
            naturalInsuredId = null;
            return new Promise((resolve, reject) => {
                db.query(`UPDATE Emergencia 
                        SET patologia_emergencia=?, clinica_emergencia=?, fecha_ocurrencia_emergencia=?, fecha_notificacion_emergencia=?, monto_reclamado_emergencia=?, monto_pagado_emergencia=?, observacion_emergencia=?, tipo_moneda_emergencia=?, estatus_emergencia=?, siniestro_nombre_emergencia=?, asegurado_per_nat_id=?, asegurado_per_jur_id=? 
                        WHERE id_emergencia=?`, 
                [emergency.patologia_emergencia, emergency.clinica_emergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, montoReclamoEmergencia, montoPagadoEmergencia, emergency.observacion_emergencia, emergency.tipo_moneda_emergencia, emergency.estatus, emergency.siniestro_nombre, naturalInsuredId, legalInsuredId[0].id_asegurado_per_jur, emergency.id_emergencia], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else {
            legalInsuredId = null;
            return new Promise((resolve, reject) => {
                db.query(`UPDATE Emergencia 
                        SET patologia_emergencia=?, clinica_emergencia=?, fecha_ocurrencia_emergencia=?, fecha_notificacion_emergencia=?, monto_reclamado_emergencia=?, monto_pagado_emergencia=?, observacion_emergencia=?, tipo_moneda_emergencia=?, estatus_emergencia=?, siniestro_nombre_emergencia=?, asegurado_per_nat_id=?, asegurado_per_jur_id=? 
                        WHERE id_emergencia=?`, 
                [emergency.patologia_emergencia, emergency.clinica_emergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, montoReclamoEmergencia, montoPagadoEmergencia, emergency.observacion_emergencia, emergency.tipo_moneda_emergencia, emergency.estatus, emergency.siniestro_nombre, naturalInsuredId[0].id_asegurado_per_nat, legalInsuredId, emergency.id_emergencia], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        }
    },
    updateDisableEmergency: (id, emergency) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Emergencia 
                    SET obser_deshabilitar_emergencia=?    
                    WHERE id_emergencia=?`, 
            [emergency.obser_deshabilitar_emergencia, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableEmergency: (id, disableEmergency) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Emergencia SET deshabilitar_emergencia=? WHERE id_emergencia=?`, [disableEmergency, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}