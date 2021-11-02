const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getRefunds: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_reembolso, patologia_reembolso, fecha_ocurrencia_reembolso, fecha_notificacion_reembolso, monto_reembolso, observacion_reembolso
                    FROM Reembolso 
                    WHERE deshabilitar_reembolso=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getRefund: (idRefund) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Reembolso 
                    WHERE id_reembolso=?`, 
            [idRefund], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postRefundForm: async (montoReclamoReembolso, montoPagadoReembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, refund) => {
        let legalInsuredId = 0;
        let naturalInsuredId = 0;
        if (refund.id_rif_asegurado.startsWith('J') || refund.id_rif_asegurado.startsWith('G')) {
            legalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_jur 
                        FROM Asegurado_Persona_Juridica 
                        WHERE deshabilitar_asegurado_per_jur=0 AND rif_asegurado_per_jur=?`,
                [refund.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (refund.id_rif_asegurado.startsWith('V')) {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_nat 
                        FROM Asegurado_Persona_Natural 
                        WHERE deshabilitar_asegurado_per_nat=0 AND rif_asegurado_per_nat=?`,
                [refund.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (refund.id_rif_asegurado.match(/^\d/)) {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_nat 
                        FROM Asegurado_Persona_Natural 
                        WHERE deshabilitar_asegurado_per_nat=0 AND cedula_asegurado_per_nat=?`,
                [refund.id_rif_asegurado],
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
                db.query(`INSERT INTO Reembolso (patologia_reembolso, fecha_ocurrencia_reembolso, fecha_notificacion_reembolso, monto_reclamo_reembolso, monto_pagado_reembolso, nombre_beneficiario_reembolso, cedula_beneficiario_reembolso, observacion_reembolso, tipo_moneda_reembolso, asegurado_per_jur_id) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [refund.patologia_reembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, montoReclamoReembolso, montoPagadoReembolso, refund.nombre_beneficiario_reembolso, refund.cedula_beneficiario_reembolso, refund.observacion_reembolso, refund.tipo_moneda_reembolso, legalInsuredId[0].id_asegurado_per_jur], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Reembolso (patologia_reembolso, fecha_ocurrencia_reembolso, fecha_notificacion_reembolso, monto_reclamo_reembolso, monto_pagado_reembolso, nombre_beneficiario_reembolso, cedula_beneficiario_reembolso, observacion_reembolso, tipo_moneda_reembolso, asegurado_per_nat_id) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [refund.patologia_reembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, montoReclamoReembolso, montoPagadoReembolso, refund.nombre_beneficiario_reembolso, refund.cedula_beneficiario_reembolso, refund.observacion_reembolso, refund.tipo_moneda_reembolso, naturalInsuredId[0].id_asegurado_per_nat], 
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
    updateRefund: async (montoReembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, refund) => {
        let legalInsuredId = 0;
        let naturalInsuredId = 0;
        if (refund.id_rif_asegurado.startsWith('J') || refund.id_rif_asegurado.startsWith('G')) {
            legalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_jur 
                        FROM Asegurado_Persona_Juridica 
                        WHERE deshabilitar_asegurado_per_jur=0 AND rif_asegurado_per_jur=?`,
                [refund.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (refund.id_rif_asegurado.startsWith('V')) {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_nat 
                        FROM Asegurado_Persona_Natural 
                        WHERE deshabilitar_asegurado_per_nat=0 AND rif_asegurado_per_nat=?`,
                [refund.id_rif_asegurado],
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (refund.id_rif_asegurado.match(/^\d/)) {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query(`SELECT id_asegurado_per_nat 
                        FROM Asegurado_Persona_Natural 
                        WHERE deshabilitar_asegurado_per_nat=0 AND cedula_asegurado_per_nat=?`,
                [refund.id_rif_asegurado],
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
                db.query(`UPDATE Reembolso 
                        SET patologia_reembolso=?, fecha_ocurrencia_reembolso=?, fecha_notificacion_reembolso=?, monto_reembolso=?, nombre_beneficiario_reembolso=?, cedula_beneficiario_reembolso=?, observacion_reembolso=?, asegurado_per_jur_id=? 
                        WHERE id_reembolso=?`, 
                [refund.patologia_reembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, montoReembolso, refund.nombre_beneficiario_reembolso, refund.cedula_beneficiario_reembolso, refund.observacion_reembolso, legalInsuredId[0].id_asegurado_per_jur, refund.id_reembolso], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`UPDATE Reembolso 
                        SET patologia_reembolso=?, fecha_ocurrencia_reembolso=?, fecha_notificacion_reembolso=?, monto_reembolso=?, nombre_beneficiario_reembolso=?, cedula_beneficiario_reembolso=?, observacion_reembolso=?, asegurado_per_nat_id=? 
                        WHERE id_reembolso=?`, 
                [refund.patologia_reembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, montoReembolso, refund.nombre_beneficiario_reembolso, refund.cedula_beneficiario_reembolso, refund.observacion_reembolso, naturalInsuredId[0].id_asegurado_per_nat, refund.id_reembolso], 
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
    disableRefund: (id, disableRefund) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Reembolso SET deshabilitar_reembolso=? WHERE id_reembolso=?`, 
            [disableRefund, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}