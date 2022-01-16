const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getSumReceiptCommissions: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(monto_comision_recibo) AS comisionTotal
                    FROM Recibo 
                    WHERE deshabilitar_recibo=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getReceiptCommissionPolicy: (policyId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT monto_comision_recibo
                    FROM Recibo 
                    WHERE poliza_id=? AND deshabilitar_recibo=0`,
            [policyId],
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getReceiptCommissionCollective: (collectiveId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT monto_comision_recibo
                    FROM Recibo 
                    WHERE colectivo_id=? AND deshabilitar_recibo=0`,
            [collectiveId],
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getReceiptLast: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_recibo, monto_comision_recibo 
                    FROM Recibo 
                    WHERE deshabilitar_recibo=0
                    ORDER BY id_recibo DESC
                    LIMIT 1;`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getReceipt: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Recibo 
                    WHERE id_recibo=? AND deshabilitar_recibo=0`,
            [id],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getReceipts: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Recibo 
                    WHERE deshabilitar_recibo=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postReceiptForm: async (fraccionamiento, montoPrimaRecibo, montoComisionRecibo, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, receipt) => {
        let policyId = await new Promise((resolve, reject) => {
            db.query(`SELECT id_poliza 
                    FROM Poliza 
                    WHERE deshabilitar_poliza=0
                    ORDER BY id_poliza DESC
                    LIMIT 1;`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Recibo (numero_recibo, tipo_recibo, fecha_desde_recibo, fecha_hasta_recibo, fraccionamiento_boolean_recibo, tipo_fraccionamiento_recibo, metodo_pago_recibo, monto_prima_recibo, monto_comision_recibo, numero_pago_recibo, fecha_pago_recibo, tipo_fecha_recibo, poliza_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [receipt.numero_recibo, receipt.tipo_recibo, fechaDesdeRecibo, fechaHastaRecibo, fraccionamiento, receipt.tipo_fraccionamiento_recibo, receipt.metodo_pago_recibo, montoPrimaRecibo, montoComisionRecibo, receipt.numero_pago_recibo, fechaPagoRecibo, receipt.tipo_fecha_recibo, policyId[0].id_poliza], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postReceiptPolicyForm: async (fraccionamiento, montoPrimaRecibo, montoComisionRecibo, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, policyId, receipt) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Recibo (numero_recibo, tipo_recibo, fecha_desde_recibo, fecha_hasta_recibo, fraccionamiento_boolean_recibo, tipo_fraccionamiento_recibo, metodo_pago_recibo, monto_prima_recibo, monto_comision_recibo, numero_pago_recibo, fecha_pago_recibo, tipo_fecha_recibo, poliza_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [receipt.numero_recibo, receipt.tipo_recibo, fechaDesdeRecibo, fechaHastaRecibo, fraccionamiento, receipt.tipo_fraccionamiento_recibo, receipt.metodo_pago_recibo, montoPrimaRecibo, montoComisionRecibo, receipt.numero_pago_recibo, fechaPagoRecibo, receipt.tipo_fecha_recibo, policyId[0].id_poliza], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postReceiptCollectiveForm: async (fraccionamiento, montoPrimaRecibo, montoComisionRecibo, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, collectiveId, receipt) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Recibo (numero_recibo, tipo_recibo, fecha_desde_recibo, fecha_hasta_recibo, fraccionamiento_boolean_recibo, tipo_fraccionamiento_recibo, metodo_pago_recibo, monto_prima_recibo, monto_comision_recibo, numero_pago_recibo, fecha_pago_recibo, tipo_fecha_recibo, colectivo_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [receipt.numero_recibo, receipt.tipo_recibo, fechaDesdeRecibo, fechaHastaRecibo, fraccionamiento, receipt.tipo_fraccionamiento_recibo, receipt.metodo_pago_recibo, montoPrimaRecibo, montoComisionRecibo, receipt.numero_pago_recibo, fechaPagoRecibo, receipt.tipo_fecha_recibo, collectiveId[0].id_colectivo], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateReceiptPolicy: (fraccionamiento, montoPrimaRecibo, montoComisionRecibo, numeroPago, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, collectiveId, policyId, receipt) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Recibo 
                    SET numero_recibo=?, tipo_recibo=?, fecha_desde_recibo=?, fecha_hasta_recibo=?, fraccionamiento_boolean_recibo=?, tipo_fraccionamiento_recibo=?, metodo_pago_recibo=?, monto_prima_recibo=?, monto_comision_recibo=?, numero_pago_recibo=?, fecha_pago_recibo=?, tipo_fecha_recibo=?, poliza_id=?, colectivo_id=? 
                    WHERE id_recibo=?`, 
            [receipt.numero_recibo, receipt.tipo_recibo, fechaDesdeRecibo, fechaHastaRecibo, fraccionamiento, receipt.tipo_fraccionamiento_recibo, receipt.metodo_pago_recibo, montoPrimaRecibo, montoComisionRecibo, numeroPago, fechaPagoRecibo, receipt.tipo_fecha_recibo, policyId[0].id_poliza, collectiveId, receipt.id_recibo], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateReceiptCollective: (fraccionamiento, montoPrimaRecibo, montoComisionRecibo, numeroPago, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, policyId, collectiveId, receipt) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Recibo 
                    SET numero_recibo=?, tipo_recibo=?, fecha_desde_recibo=?, fecha_hasta_recibo=?, fraccionamiento_boolean_recibo=?, tipo_fraccionamiento_recibo=?, metodo_pago_recibo=?, monto_prima_recibo=?, monto_comision_recibo=?, numero_pago_recibo=?, fecha_pago_recibo=?, tipo_fecha_recibo=?, poliza_id=?, colectivo_id=? 
                    WHERE id_recibo=?`, 
            [receipt.numero_recibo, receipt.tipo_recibo, fechaDesdeRecibo, fechaHastaRecibo, fraccionamiento, receipt.tipo_fraccionamiento_recibo, receipt.metodo_pago_recibo, montoPrimaRecibo, montoComisionRecibo, numeroPago, fechaPagoRecibo, receipt.tipo_fecha_recibo, policyId, collectiveId[0].id_colectivo, receipt.id_recibo], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateDisableReceipt: (id, receipt) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Recibo 
                    SET obser_deshabilitar_recibo=?    
                    WHERE id_recibo=?`, 
            [receipt.obser_deshabilitar_recibo, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableReceipt: (id, disableReceipt) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Recibo SET deshabilitar_recibo=? WHERE id_recibo=?`, [disableReceipt, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}