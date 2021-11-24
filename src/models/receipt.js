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
/*                  POST                 */
    postReceiptForm: async (fraccionamiento, montoPrimaRecibo, montoComisionRecibo, fechaDesdeRecibo, fechaHastaRecibo, receipt) => {
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
            db.query(`INSERT INTO Recibo (numero_recibo, tipo_recibo, fecha_desde_recibo, fecha_hasta_recibo, fraccionamiento_boolean_recibo, tipo_fraccionamiento_recibo, metodo_pago_recibo, monto_prima_recibo, monto_comision_recibo, numero_pago_recibo, poliza_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [receipt.numero_recibo, receipt.tipo_recibo, fechaDesdeRecibo, fechaHastaRecibo, fraccionamiento, receipt.tipo_fraccionamiento_recibo, receipt.metodo_pago_recibo, montoPrimaRecibo, montoComisionRecibo, receipt.numero_pago_recibo, policyId[0].id_poliza], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postReceiptCollectiveForm: async (fraccionamiento, montoPrimaRecibo, montoComisionRecibo, fechaDesdeRecibo, fechaHastaRecibo, collectiveId, receipt) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Recibo (numero_recibo, tipo_recibo, fecha_desde_recibo, fecha_hasta_recibo, fraccionamiento_boolean_recibo, tipo_fraccionamiento_recibo, metodo_pago_recibo, monto_prima_recibo, monto_comision_recibo, colectivo_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [receipt.numero_recibo, receipt.tipo_recibo, fechaDesdeRecibo, fechaHastaRecibo, fraccionamiento, receipt.tipo_fraccionamiento_recibo, receipt.metodo_pago_recibo, montoPrimaRecibo, montoComisionRecibo, collectiveId[0].id_colectivo], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
/*                  PUT                  */
/*               DELETE                  */
}