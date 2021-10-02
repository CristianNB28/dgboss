const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getAMP: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_amp, patologia_amp, clinica_amp, fecha_ocurrencia_amp, fecha_notificacion_amp, monto_amp, observacion_amp
                    FROM AMP 
                    WHERE deshabilitar_amp=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getAMPId: (idAMP) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM AMP 
                    WHERE id_amp=?`, 
            [idAMP], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postAMPForm: async (montoAMP, fechaOcurrenciaAMP, fechaNotificacionAMP, amp) => {
        let legalInsuredId = 0;
        let naturalInsuredId = 0;
        if (amp.id_rif_asegurado.startsWith('J') || amp.id_rif_asegurado.startsWith('G')) {
            legalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_jur 
                        FROM Asegurado_Persona_Juridica 
                        WHERE deshabilitar_asegurado_per_jur=0 AND rif_asegurado_per_jur=?`,
                [amp.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (amp.id_rif_asegurado.startsWith('V')) {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_nat 
                        FROM Asegurado_Persona_Natural 
                        WHERE deshabilitar_asegurado_per_nat=0 AND rif_asegurado_per_nat=?`,
                [amp.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (amp.id_rif_asegurado.match(/^\d/)) {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_nat 
                        FROM Asegurado_Persona_Natural 
                        WHERE deshabilitar_asegurado_per_nat=0 AND cedula_asegurado_per_nat=?`,
                [amp.id_rif_asegurado],
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
                db.query(`INSERT INTO AMP (patologia_amp, clinica_amp, fecha_ocurrencia_amp, fecha_notificacion_amp, monto_amp, nombre_beneficiario_amp, observacion_amp, asegurado_per_jur_id) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
                [amp.patologia_amp, amp.clinica_amp, fechaOcurrenciaAMP, fechaNotificacionAMP, montoAMP, amp.nombre_beneficiario_amp, amp.observacion_amp, legalInsuredId[0].id_asegurado_per_jur], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO AMP (patologia_amp, clinica_amp, fecha_ocurrencia_amp, fecha_notificacion_amp, monto_amp, nombre_beneficiario_amp, observacion_amp, asegurado_per_nat_id) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
                [amp.patologia_amp, amp.clinica_amp, fechaOcurrenciaAMP, fechaNotificacionAMP, montoAMP, amp.nombre_beneficiario_amp, amp.observacion_amp, naturalInsuredId[0].id_asegurado_per_nat], 
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
    updateAMP: async (montoAMP, fechaOcurrenciaAMP, fechaNotificacionAMP, amp) => {
        let legalInsuredId = 0;
        let naturalInsuredId = 0;
        if (amp.id_rif_asegurado.startsWith('J') || amp.id_rif_asegurado.startsWith('G')) {
            legalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_jur 
                        FROM Asegurado_Persona_Juridica 
                        WHERE deshabilitar_asegurado_per_jur=0 AND rif_asegurado_per_jur=?`,
                [amp.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (amp.id_rif_asegurado.startsWith('V')) {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_nat 
                        FROM Asegurado_Persona_Natural 
                        WHERE deshabilitar_asegurado_per_nat=0 AND rif_asegurado_per_nat=?`,
                [amp.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (amp.id_rif_asegurado.match(/^\d/)) {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_nat 
                        FROM Asegurado_Persona_Natural 
                        WHERE deshabilitar_asegurado_per_nat=0 AND cedula_asegurado_per_nat=?`,
                [amp.id_rif_asegurado],
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
                db.query(`UPDATE AMP 
                        SET patologia_amp=?, clinica_amp=?, fecha_ocurrencia_amp=?, fecha_notificacion_amp=?, monto_amp=?, nombre_beneficiario_amp=?, observacion_amp=?, asegurado_per_jur_id=? 
                        WHERE id_amp=?`, 
                [amp.patologia_amp, amp.clinica_amp, fechaOcurrenciaAMP, fechaNotificacionAMP, montoAMP, amp.nombre_beneficiario_amp, amp.observacion_amp, legalInsuredId[0].id_asegurado_per_jur, amp.id_amp], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`UPDATE AMP 
                        SET patologia_amp=?, clinica_amp=?, fecha_ocurrencia_amp=?, fecha_notificacion_amp=?, monto_amp=?, nombre_beneficiario_amp=?, observacion_amp=?, asegurado_per_nat_id=? 
                        WHERE id_amp=?`, 
                [amp.patologia_amp, amp.clinica_amp, fechaOcurrenciaAMP, fechaNotificacionAMP, montoAMP, amp.nombre_beneficiario_amp, amp.observacion_amp, naturalInsuredId[0].id_asegurado_per_nat, amp.id_amp], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        }
    },
/*               DELETE                  */
    disableAMP: (id, disableAMP) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE AMP SET deshabilitar_amp=? WHERE id_amp=?`, [disableAMP, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}