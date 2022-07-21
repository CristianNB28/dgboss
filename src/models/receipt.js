const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getSumReceiptCommissionsPolicy: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(re.monto_comision_recibo) AS comisionTotalPoliza
                                FROM Recibo re, Poliza po
                                WHERE deshabilitar_recibo=0 AND re.poliza_id=po.id_poliza AND
                                po.tipo_moneda_poliza='DÓLAR'`,
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
    getSumReceiptCommissionsCollective: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(re.monto_comision_recibo) AS comisionTotalColectivo
                                FROM Recibo re, Colectivo co
                                WHERE deshabilitar_recibo=0 AND re.colectivo_id=co.id_colectivo AND
                                co.tipo_moneda_colectivo='DÓLAR'`,
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
    getReceiptPolicy: (policyId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Recibo 
                                WHERE poliza_id=? AND deshabilitar_recibo=0`, 
                [policyId],
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
    getReceiptCollective: (collectiveId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Recibo 
                                WHERE colectivo_id=? AND deshabilitar_recibo=0`, 
                [collectiveId],
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
    getReceiptLast: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_recibo, monto_comision_recibo 
                                FROM Recibo 
                                WHERE deshabilitar_recibo=0
                                ORDER BY id_recibo DESC
                                LIMIT 1;`,
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
    getReceipt: (id) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Recibo 
                                WHERE id_recibo=? AND deshabilitar_recibo=0`, 
                [id],
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
    getReceipts: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Recibo 
                                WHERE deshabilitar_recibo=0`,
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
    postReceiptPolicyForm: async (montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, policyId, receipt) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Recibo (numero_recibo, tipo_recibo, fecha_desde_recibo, fecha_hasta_recibo, prima_neta_recibo, igtf_recibo, prima_total_recibo, fecha_pago_recibo, metodo_pago_recibo, monto_comision_recibo, poliza_id)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [receipt.numero_recibo, receipt.tipo_recibo, fechaDesdeRecibo, fechaHastaRecibo, montoPrimaNeta, montoIgtf, montoPrimaTotal, fechaPagoRecibo, receipt.metodo_pago_recibo, montoComision, policyId],
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
    postReceiptCollectiveForm: async (montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, collectiveId, receipt) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Recibo (numero_recibo, tipo_recibo, fecha_desde_recibo, fecha_hasta_recibo, prima_neta_recibo, igtf_recibo, prima_total_recibo, fecha_pago_recibo, metodo_pago_recibo, monto_comision_recibo, colectivo_id)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [receipt.numero_recibo, receipt.tipo_recibo, fechaDesdeRecibo, fechaHastaRecibo, montoPrimaNeta, montoIgtf, montoPrimaTotal, fechaPagoRecibo, receipt.metodo_pago_recibo, montoComision, collectiveId],
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
    updateReceiptPolicy: (fraccionamiento, montoPrimaRecibo, montoComisionRecibo, numeroPago, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, collectiveId, policyId, receipt) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Recibo 
                                SET numero_recibo=?, tipo_recibo=?, fecha_desde_recibo=?, fecha_hasta_recibo=?, fraccionamiento_boolean_recibo=?, tipo_fraccionamiento_recibo=?, metodo_pago_recibo=?, monto_prima_recibo=?, monto_comision_recibo=?, numero_pago_recibo=?, fecha_pago_recibo=?, poliza_id=?, colectivo_id=? 
                                WHERE id_recibo=?`, 
                [receipt.numero_recibo, receipt.tipo_recibo, fechaDesdeRecibo, fechaHastaRecibo, fraccionamiento, receipt.tipo_fraccionamiento_recibo, receipt.metodo_pago_recibo, montoPrimaRecibo, montoComisionRecibo, numeroPago, fechaPagoRecibo, policyId[0].id_poliza, collectiveId, receipt.id_recibo],
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
    updateReceiptCollective: (fraccionamiento, montoPrimaRecibo, montoComisionRecibo, numeroPago, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, policyId, collectiveId, receipt) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Recibo 
                                SET numero_recibo=?, tipo_recibo=?, fecha_desde_recibo=?, fecha_hasta_recibo=?, fraccionamiento_boolean_recibo=?, tipo_fraccionamiento_recibo=?, metodo_pago_recibo=?, monto_prima_recibo=?, monto_comision_recibo=?, numero_pago_recibo=?, fecha_pago_recibo=?, poliza_id=?, colectivo_id=? 
                                WHERE id_recibo=?`,
                [receipt.numero_recibo, receipt.tipo_recibo, fechaDesdeRecibo, fechaHastaRecibo, fraccionamiento, receipt.tipo_fraccionamiento_recibo, receipt.metodo_pago_recibo, montoPrimaRecibo, montoComisionRecibo, numeroPago, fechaPagoRecibo, policyId, collectiveId[0].id_colectivo, receipt.id_recibo],
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
    updateDisableReceipt: (id, receipt) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Recibo 
                                SET obser_deshabilitar_recibo=?    
                                WHERE id_recibo=?`, 
                [receipt.obser_deshabilitar_recibo, id],
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
    disableReceipt: (id, disableReceipt) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Recibo 
                                SET deshabilitar_recibo=? 
                                WHERE id_recibo=?`, 
                [disableReceipt, id],
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
    disableReceiptPolicy: (idPolicy, disableReceiptPolicy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Recibo 
                                SET deshabilitar_recibo=? 
                                WHERE poliza_id=?`, 
                [disableReceiptPolicy, idPolicy],
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
    disableReceiptCollective: (idCollective, disableReceiptCollective) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Recibo 
                                SET deshabilitar_recibo=? 
                                WHERE colectivo_id=?`, 
                [disableReceiptCollective, idCollective],
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