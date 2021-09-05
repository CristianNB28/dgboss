const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getPolicies: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_poliza, numero_poliza, ramo_poliza, tipo_negocio, tipo_poliza, fecha_desde, fecha_hasta, tipo_moneda, monto_prima, estatus_poliza FROM Poliza WHERE deshabilitar_poliza=0', 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getPolicy: (idPolicy) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_poliza, numero_poliza, ramo_poliza, tipo_negocio, tipo_poliza, fecha_desde, fecha_hasta, tipo_moneda, monto_prima, estatus_poliza FROM Poliza WHERE id_poliza=?', 
            [idPolicy], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postPolicyForm: (tomador_viejo, corporativo, monto_prima, deducible, fecha_poliza_desde, fecha_poliza_hasta, tipo_negocio, tipo_poliza, estatus_poliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza (numero_poliza, ramo_poliza, tomador_viejo, tipo_negocio, tipo_poliza, fecha_desde, fecha_hasta, tipo_moneda, tipo_movimiento, monto_prima, estatus_poliza, tipo_producto, tipo_canal, corporativa_poliza, grupo_poliza, deducible_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, policy.ramo_poliza, tomador_viejo, tipo_negocio, tipo_poliza, fecha_poliza_desde, fecha_poliza_hasta, policy.tipo_moneda, policy.tipo_movimiento, monto_prima, estatus_poliza, policy.tipo_producto, policy.tipo_canal, corporativo, policy.tipo_grupo, deducible],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updatePolicy: (fechaDesdePoliza, fechaHastaPoliza, montoPrima, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza 
                    SET numero_poliza=?, ramo_poliza=?, tipo_negocio=?, tipo_poliza=?, fecha_desde=?, fecha_hasta=?, tipo_moneda=?, monto_prima=?, estatus_poliza=? 
                    WHERE id_poliza=?`, 
            [policy.numero_poliza, policy.ramo_poliza, policy.tipo_negocio, policy.tipo_poliza, fechaDesdePoliza, fechaHastaPoliza, policy.tipo_moneda, montoPrima, policy.estatus_poliza, policy.id_poliza], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disablePolicy: (id, disablePolicy) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza SET deshabilitar_poliza=? WHERE id_poliza=?`, [disablePolicy, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}