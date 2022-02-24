const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getRefunds: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
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
    postRefundForm: async (montoReclamoReembolso, montoPagadoReembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, insuredBeneficiaryId, refund) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Reembolso (patologia_reembolso, fecha_ocurrencia_reembolso, fecha_notificacion_reembolso, monto_reclamo_reembolso, monto_pagado_reembolso, observacion_reembolso, tipo_moneda_reembolso, estatus_reembolso, numero_siniestro_reembolso, asegurado_beneficiario_id) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [refund.patologia_reembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, montoReclamoReembolso, montoPagadoReembolso, refund.observacion_reembolso, refund.tipo_moneda_reembolso, refund.estatus, refund.numero_siniestro_reembolso, insuredBeneficiaryId], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateRefund: async (montoReclamoReembolso, montoPagadoReembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, insuredBeneficiaryId, refund) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Reembolso 
                    SET patologia_reembolso=?, fecha_ocurrencia_reembolso=?, fecha_notificacion_reembolso=?, monto_reclamo_reembolso=?, monto_pagado_reembolso=?, observacion_reembolso=?, tipo_moneda_reembolso=?, estatus_reembolso=?, numero_siniestro_reembolso=?, asegurado_beneficiario_id=? 
                    WHERE id_reembolso=?`, 
            [refund.patologia_reembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, montoReclamoReembolso, montoPagadoReembolso, refund.observacion_reembolso, refund.tipo_moneda_reembolso, refund.estatus, refund.numero_siniestro_reembolso, insuredBeneficiaryId, refund.id_reembolso], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    updateDisableRefund: (id, refund) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Reembolso 
                    SET obser_deshabilitar_reembolso=?    
                    WHERE id_reembolso=?`, 
            [refund.obser_deshabilitar_reembolso, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
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