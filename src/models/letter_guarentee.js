const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getLettersGuarantee: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Carta_Aval 
                    WHERE deshabilitar_carta_aval=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getLetterGuarantee: (idLetterGuarentee) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Carta_Aval 
                    WHERE id_carta_aval=?`, 
            [idLetterGuarentee], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postLetterGuaranteeForm: async (montoReclamoCartaAval, montoPagadoCartaAval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, letterGuarantee) => {
        let legalInsuredId = 0;
        let naturalInsuredId = 0;
        if (letterGuarantee.id_rif_asegurado.startsWith('J') || letterGuarantee.id_rif_asegurado.startsWith('G')) {
            legalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_jur 
                        FROM Asegurado_Persona_Juridica 
                        WHERE deshabilitar_asegurado_per_jur=0 AND rif_asegurado_per_jur=?`,
                [letterGuarantee.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (letterGuarantee.id_rif_asegurado.startsWith('V')) {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_nat 
                        FROM Asegurado_Persona_Natural 
                        WHERE deshabilitar_asegurado_per_nat=0 AND rif_asegurado_per_nat=?`,
                [letterGuarantee.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (letterGuarantee.id_rif_asegurado.match(/^\d/)) {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_nat 
                        FROM Asegurado_Persona_Natural 
                        WHERE deshabilitar_asegurado_per_nat=0 AND cedula_asegurado_per_nat=?`,
                [letterGuarantee.id_rif_asegurado],
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
                db.query(`INSERT INTO Carta_Aval (patologia_carta_aval, clinica_carta_aval, fecha_ocurrencia_carta_aval, fecha_notificacion_carta_aval, monto_reclamado_carta_aval, monto_pagado_carta_aval, observacion_carta_aval, tipo_moneda_carta_aval, asegurado_per_jur_id) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [letterGuarantee.patologia_carta_aval, letterGuarantee.clinica_carta_aval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, montoReclamoCartaAval, montoPagadoCartaAval, letterGuarantee.observacion_carta_aval, letterGuarantee.tipo_moneda_carta_aval, legalInsuredId[0].id_asegurado_per_jur], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Carta_Aval (patologia_carta_aval, clinica_carta_aval, fecha_ocurrencia_carta_aval, fecha_notificacion_carta_aval, monto_reclamado_carta_aval, monto_pagado_carta_aval, observacion_carta_aval, tipo_moneda_carta_aval, asegurado_per_nat_id) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [letterGuarantee.patologia_carta_aval, letterGuarantee.clinica_carta_aval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, montoReclamoCartaAval, montoPagadoCartaAval, letterGuarantee.observacion_carta_aval, letterGuarantee.tipo_moneda_carta_aval, naturalInsuredId[0].id_asegurado_per_nat], 
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
    updateLetterGuarantee: async (montoReclamoCartaAval, montoPagadoCartaAval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, letterGuarantee) => {
        let legalInsuredId = 0;
        let naturalInsuredId = 0;
        if (letterGuarantee.id_rif_asegurado.startsWith('J') || letterGuarantee.id_rif_asegurado.startsWith('G')) {
            legalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_jur 
                        FROM Asegurado_Persona_Juridica 
                        WHERE deshabilitar_asegurado_per_jur=0 AND rif_asegurado_per_jur=?`,
                [letterGuarantee.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (letterGuarantee.id_rif_asegurado.startsWith('V')) {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_nat 
                        FROM Asegurado_Persona_Natural 
                        WHERE deshabilitar_asegurado_per_nat=0 AND rif_asegurado_per_nat=?`,
                [letterGuarantee.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (letterGuarantee.id_rif_asegurado.match(/^\d/)) {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_nat 
                        FROM Asegurado_Persona_Natural 
                        WHERE deshabilitar_asegurado_per_nat=0 AND cedula_asegurado_per_nat=?`,
                [letterGuarantee.id_rif_asegurado],
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
                db.query(`UPDATE Carta_Aval 
                        SET patologia_carta_aval=?, clinica_carta_aval=?, fecha_ocurrencia_carta_aval=?, fecha_notificacion_carta_aval=?, monto_reclamado_carta_aval=?, monto_pagado_carta_aval=?, observacion_carta_aval=?, tipo_moneda_carta_aval=?, asegurado_per_nat_id=?, asegurado_per_jur_id=? 
                        WHERE id_carta_aval=?`, 
                [letterGuarantee.patologia_carta_aval, letterGuarantee.clinica_carta_aval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, montoReclamoCartaAval, montoPagadoCartaAval, letterGuarantee.observacion_carta_aval, letterGuarantee.tipo_moneda_carta_aval, naturalInsuredId, legalInsuredId[0].id_asegurado_per_jur, letterGuarantee.id_carta_aval], 
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
                db.query(`UPDATE Carta_Aval 
                        SET patologia_carta_aval=?, clinica_carta_aval=?, fecha_ocurrencia_carta_aval=?, fecha_notificacion_carta_aval=?, monto_reclamado_carta_aval=?, monto_pagado_carta_aval=?, observacion_carta_aval=?, tipo_moneda_carta_aval=?, asegurado_per_nat_id=?, asegurado_per_jur_id=? 
                        WHERE id_carta_aval=?`, 
                [letterGuarantee.patologia_carta_aval, letterGuarantee.clinica_carta_aval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, montoReclamoCartaAval, montoPagadoCartaAval, letterGuarantee.observacion_carta_aval, letterGuarantee.tipo_moneda_carta_aval, naturalInsuredId[0].id_asegurado_per_nat, legalInsuredId, letterGuarantee.id_carta_aval], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        }
    },
    updateDisableLetterGuarentee: (id, letterGuarantee) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Carta_Aval 
                    SET obser_deshabilitar_carta_aval=?    
                    WHERE id_carta_aval=?`, 
            [letterGuarantee.obser_deshabilitar_carta_aval, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableLetterGuarentee: (id, disableLetterGuarentee) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Carta_Aval SET deshabilitar_carta_aval=? WHERE id_carta_aval=?`, 
            [disableLetterGuarentee, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}