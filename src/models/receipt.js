const db = require('../../config/database');

module.exports = {
/*                  GET                  */
/*                  POST                 */
    postReceiptForm: async (monto_prima_recibo, monto_comision, fecha_recibo_desde, fecha_recibo_hasta, receipt) => {
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
            db.query(`INSERT INTO Recibo (numero_recibo, tipo_recibo, fecha_vigencia_desde, fecha_vigencia_hasta, monto_prima_recibo, monto_comision_recibo, poliza_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`, 
            [receipt.numero_recibo, receipt.tipo_recibo, fecha_recibo_desde, fecha_recibo_hasta, monto_prima_recibo, monto_comision, policyId[0].id_poliza], 
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