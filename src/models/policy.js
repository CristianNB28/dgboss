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
    getPolicyLast: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_poliza, monto_prima 
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
    },
/*                  POST                 */
    postVehiclePolicyForm: (tomadorViejo, montoPrima, tasaPoliza, deducible, comisionPoliza, fechaPolizaDesde, fechaPolizaHasta, tipoPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza (numero_poliza, ramo_poliza, tomador_viejo, nombre_tomador_poliza, tipo_poliza, fecha_desde, fecha_hasta, tipo_moneda, tasa_poliza, monto_prima, estatus_poliza, tipo_producto_poliza, tipo_canal, deducible_poliza, comision_poliza, bonificacion_poliza, cobertura_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, policy.ramo_poliza, tomadorViejo, policy.nombre_tomador_poliza, tipoPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda, tasaPoliza, montoPrima, estatusPoliza, policy.tipo_producto_poliza, policy.tipo_canal, deducible, comisionPoliza, policy.bonificacion_poliza, policy.cobertura_poliza],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postHealthPolicyForm: (tomadorViejo, montoPrima, deducible, comisionPoliza, fechaPolizaDesde, fechaPolizaHasta, tipoPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza (numero_poliza, ramo_poliza, tomador_viejo, nombre_tomador_poliza, tipo_poliza, fecha_desde, fecha_hasta, tipo_moneda, monto_prima, estatus_poliza, tipo_canal, deducible_poliza, comision_poliza, bonificacion_poliza, cobertura_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, policy.ramo_poliza, tomadorViejo, policy.nombre_tomador_poliza, tipoPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda, montoPrima, estatusPoliza, policy.tipo_canal, deducible, comisionPoliza, policy.bonificacion_poliza, policy.cobertura_poliza],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postPatrimonialPolicyForm: (tomadorViejo, montoPrima, tasaPoliza, deducible, comisionPoliza, fechaPolizaDesde, fechaPolizaHasta, tipoPoliza, estatusPoliza, patrimonial) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza (numero_poliza, ramo_poliza, tomador_viejo, nombre_tomador_poliza, tipo_poliza, fecha_desde, fecha_hasta, tipo_moneda, tasa_poliza, monto_prima, estatus_poliza, tipo_producto_poliza, tipo_canal, deducible_poliza, comision_poliza, bonificacion_poliza, cobertura_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [patrimonial.numero_poliza, patrimonial.ramo_poliza, tomadorViejo, patrimonial.nombre_tomador_poliza, tipoPoliza, fechaPolizaDesde, fechaPolizaHasta, patrimonial.tipo_moneda, tasaPoliza, montoPrima, estatusPoliza, patrimonial.tipo_producto_poliza, patrimonial.tipo_canal, deducible, comisionPoliza, patrimonial.bonificacion_poliza, patrimonial.cobertura_poliza],                          
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