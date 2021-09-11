const db = require('../../config/database');

module.exports = {
/*                  GET                  */
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
            db.query(`INSERT INTO Recibo (numero_recibo, tipo_recibo, fecha_desde_recibo, fecha_hasta_recibo, fraccionamiento_boolean_recibo, tipo_fraccionamiento_recibo, forma_pago_recibo, monto_prima_recibo, monto_comision_recibo, poliza_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [receipt.numero_recibo, receipt.tipo_recibo, fechaDesdeRecibo, fechaHastaRecibo, fraccionamiento, receipt.tipo_fraccionamiento_recibo, receipt.forma_pago_recibo, montoPrimaRecibo, montoComisionRecibo, policyId[0].id_poliza], 
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