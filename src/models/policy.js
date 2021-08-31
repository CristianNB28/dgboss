const db = require('../../config/database');

module.exports = {
/*                  GET                  */
/*                  POST                 */
    postPolicyForm: (tomador_viejo, corporativo, monto_prima, deducible, fecha_poliza_desde, fecha_poliza_hasta, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza (numero_poliza, ramo_poliza, tomador_viejo, fecha_desde, fecha_hasta, tipo_moneda, tipo_movimiento, monto_prima, tipo_producto, tipo_canal, corporativa_poliza, grupo_poliza, deducible_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, policy.ramo_poliza, tomador_viejo, fecha_poliza_desde, fecha_poliza_hasta, policy.tipo_moneda, policy.tipo_movimiento, monto_prima, policy.tipo_producto, policy.tipo_canal, corporativo, policy.tipo_grupo, deducible],                          
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