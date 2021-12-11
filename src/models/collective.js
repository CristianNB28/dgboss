const db = require('../../config/database');

module.exports = {
/*                  GET                  */

    getCollectives: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_colectivo, numero_colectivo, nombre_tomador_colectivo, tipo_colectivo, fecha_desde_colectivo, fecha_hasta_colectivo, tipo_moneda_colectivo, prima_anual_colectivo, estatus_colectivo 
                    FROM Colectivo 
                    WHERE deshabilitar_colectivo=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getCollective: (idCollective) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_colectivo, numero_colectivo, nombre_tomador_colectivo, tipo_colectivo, fecha_desde_colectivo, fecha_hasta_colectivo, tipo_moneda_colectivo, prima_anual_colectivo, estatus_colectivo 
                    FROM Colectivo 
                    WHERE id_colectivo=?`, 
            [idCollective], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getCollectiveLast: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_colectivo, prima_anual_colectivo 
                    FROM Colectivo 
                    WHERE deshabilitar_colectivo=0
                    ORDER BY id_colectivo DESC
                    LIMIT 1;`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getCollectiveHolder: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT DISTINCT(nombre_tomador_colectivo) AS nombreTomador
                    FROM Colectivo 
                    WHERE deshabilitar_colectivo=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getSummaryCollectiveCousins: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(prima_anual_colectivo) AS primaTotal
                    FROM Colectivo 
                    WHERE deshabilitar_colectivo=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getHealthCollectiveCounter: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(tipo_colectivo) AS health
                    FROM Colectivo 
                    WHERE tipo_colectivo='Salud'
                    AND deshabilitar_colectivo=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getAutoCollectiveCounter: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(tipo_colectivo) AS auto
                    FROM Colectivo 
                    WHERE tipo_colectivo='Automovil'
                    AND deshabilitar_colectivo=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getRiskDiverCollectiveCounter: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(tipo_colectivo) AS risk
                    FROM Colectivo 
                    WHERE tipo_colectivo='Riesgos Diversos'
                    AND deshabilitar_colectivo=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getCollectiveNumberId: (numberCollective) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_colectivo
                    FROM Colectivo 
                    WHERE numero_colectivo=? AND deshabilitar_colectivo=0`,
            [numberCollective], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postCollectiveForm: (montoPrimaAnual, deducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, collective) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Colectivo (numero_colectivo, nombre_tomador_colectivo, tipo_colectivo, fecha_desde_colectivo, fecha_hasta_colectivo, tipo_moneda_colectivo, prima_anual_colectivo, estatus_colectivo, cobertura_colectivo, tipo_canal_colectivo, deducible_colectivo, grupo_colectivo, maternidad_colectivo, plazo_espera_colectivo, detalle_cliente_colectivo)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [collective.numero_colectivo, collective.nombre_tomador_colectivo, tipoColectivo, fechaPolizaDesde, fechaPolizaHasta, collective.tipo_moneda_colectivo, montoPrimaAnual, estatusPoliza, collective.cobertura_colectivo, collective.tipo_canal_colectivo, deducible, collective.grupo_colectivo, collective.maternidad_colectivo, collective.plazo_espera_colectivo, collective.detalle_cliente_colectivo],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateCollective: (fechaDesdeColectivo, fechaHastaColectivo, montoPrimaAnual, collective) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Colectivo 
                    SET numero_colectivo=?, nombre_tomador_colectivo=?, tipo_colectivo=?, fecha_desde_colectivo=?, fecha_hasta_colectivo=?, tipo_moneda_colectivo=?, prima_anual_colectivo=?, estatus_colectivo=? 
                    WHERE id_colectivo=?`, 
            [collective.numero_colectivo, collective.nombre_tomador_colectivo, collective.tipo_colectivo, fechaDesdeColectivo, fechaHastaColectivo, collective.tipo_moneda_colectivo, montoPrimaAnual, collective.estatus_colectivo, collective.id_colectivo], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateDisableCollective: (id, collective) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Colectivo 
                    SET obser_deshabilitar_colectivo=? 
                    WHERE id_colectivo=?`, 
            [collective.obser_deshabilitar_colectivo ,id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableCollective: (id, disableCollective) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Colectivo SET deshabilitar_colectivo=? WHERE id_colectivo=?`, 
            [disableCollective, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}