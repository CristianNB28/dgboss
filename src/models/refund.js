const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getRefunds: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Reembolso 
                                WHERE deshabilitar_reembolso=0`,
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
    getRefund: (idRefund) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Reembolso 
                                WHERE id_reembolso=?`, 
                [idRefund],
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
    postRefundForm: async (montoReclamoReembolso, montoPagadoReembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, insuredBeneficiaryId, idPolicy, idCollective, refund) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Reembolso (patologia_reembolso, fecha_ocurrencia_reembolso, fecha_notificacion_reembolso, monto_reclamo_reembolso, monto_pagado_reembolso, observacion_reembolso, tipo_moneda_reembolso, estatus_reembolso, numero_siniestro_reembolso, asegurado_beneficiario_id, poliza_id, colectivo_id) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [refund.patologia_reembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, montoReclamoReembolso, montoPagadoReembolso, refund.observacion_reembolso, refund.tipo_moneda_reclamo, refund.estatus, refund.numero_siniestro_reembolso, insuredBeneficiaryId, idPolicy, idCollective],
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
    updateRefund: async (montoReclamoReembolso, montoPagadoReembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, insuredBeneficiaryId, idPolicy, idCollective, refund) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Reembolso 
                                SET patologia_reembolso=?, fecha_ocurrencia_reembolso=?, fecha_notificacion_reembolso=?, monto_reclamo_reembolso=?, monto_pagado_reembolso=?, observacion_reembolso=?, tipo_moneda_reembolso=?, estatus_reembolso=?, numero_siniestro_reembolso=?, asegurado_beneficiario_id=?, poliza_id=?, colectivo_id=? 
                                WHERE id_reembolso=?`, 
                [refund.patologia_reembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, montoReclamoReembolso, montoPagadoReembolso, refund.observacion_reembolso, refund.tipo_moneda_reclamo, refund.estatus, refund.numero_siniestro_reembolso, insuredBeneficiaryId, idPolicy, idCollective, refund.id_reembolso],
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
    updateDisableRefund: (id, refund) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Reembolso 
                                SET obser_deshabilitar_reembolso=?    
                                WHERE id_reembolso=?`, 
                [refund.obser_deshabilitar_reembolso, id],
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
    disableRefund: (id, disableRefund) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Reembolso 
                                SET deshabilitar_reembolso=? 
                                WHERE id_reembolso=?`, 
                [disableRefund, id],
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