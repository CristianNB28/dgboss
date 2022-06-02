const db = require('../../config/database');

module.exports = {
/*                  GET                  */

    getCollectives: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_colectivo, numero_colectivo, nombre_tomador_colectivo, tipo_colectivo, fecha_desde_colectivo, fecha_hasta_colectivo, tipo_moneda_colectivo, prima_anual_colectivo, estatus_colectivo 
                                FROM Colectivo 
                                WHERE deshabilitar_colectivo=0`,
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
    getCollectivesNumbers: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT numero_colectivo 
                                FROM Colectivo`,
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
    getCollective: (idCollective) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Colectivo 
                                WHERE id_colectivo=?`, 
                [idCollective],
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
    getCollectiveLast: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_colectivo, numero_colectivo, prima_anual_colectivo, tipo_moneda_colectivo 
                                FROM Colectivo 
                                WHERE deshabilitar_colectivo=0
                                ORDER BY id_colectivo DESC
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
    getSummaryCollectiveCousins: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(prima_anual_colectivo) AS primaTotal
                                FROM Colectivo 
                                WHERE deshabilitar_colectivo=0`,
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
    getHealthCollectiveCounter: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(tipo_colectivo) AS health
                                FROM Colectivo 
                                WHERE tipo_colectivo='Salud'
                                AND deshabilitar_colectivo=0`,
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
    getAutoCollectiveCounter: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(tipo_colectivo) AS auto
                                FROM Colectivo 
                                WHERE tipo_colectivo='Automovil'
                                AND deshabilitar_colectivo=0`,
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
    getRiskDiverCollectiveCounter: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(tipo_colectivo) AS risk
                                FROM Colectivo 
                                WHERE tipo_colectivo='Riesgos Diversos'
                                AND deshabilitar_colectivo=0`,
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
    getCollectiveNumberId: (numberCollective) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_colectivo
                                FROM Colectivo 
                                WHERE numero_colectivo=? AND deshabilitar_colectivo=0`, 
                [numberCollective],
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
    postCollectiveHealthForm: (montoPrimaAnual, deducible, coberturaSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoColectivo, estatusPoliza, collective) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Colectivo (numero_colectivo, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_colectivo, correo_tomador, tipo_colectivo, fecha_desde_colectivo, fecha_hasta_colectivo, tipo_moneda_colectivo, prima_anual_colectivo, estatus_colectivo, cobertura_suma_asegurada_colectivo, tipo_canal_colectivo, deducible_colectivo, grupo_colectivo, maternidad_colectivo, plazo_espera_colectivo, detalle_cliente_colectivo)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [collective.numero_colectivo, collective.tipo_id_rif_tomador, collective.id_rif_tomador, collective.nombre_tomador_colectivo, collective.correo_tomador, tipoColectivo, fechaPolizaDesde, fechaPolizaHasta, collective.tipo_moneda_colectivo, montoPrimaAnual, estatusPoliza, coberturaSumaAsegurada, collective.tipo_canal_colectivo, deducible, collective.grupo_colectivo, collective.maternidad_colectivo, collective.plazo_espera_colectivo, fechaDetalleCliente],
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
    postCollectiveForm: (tomadorAsegurado, montoPrimaAnual, deducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, collective) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Colectivo (numero_colectivo, tomador_asegurado_colectivo, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_colectivo, correo_tomador, tipo_colectivo, fecha_desde_colectivo, fecha_hasta_colectivo, tipo_moneda_colectivo, prima_anual_colectivo, estatus_colectivo, tipo_canal_colectivo, deducible_colectivo, grupo_colectivo)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [collective.numero_colectivo, tomadorAsegurado, collective.tipo_id_rif_tomador, collective.id_rif_tomador, collective.nombre_tomador_colectivo, collective.correo_tomador, tipoColectivo, fechaPolizaDesde, fechaPolizaHasta, collective.tipo_moneda_colectivo, montoPrimaAnual, estatusPoliza, collective.tipo_canal_colectivo, deducible, collective.grupo_colectivo],
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
    updateCollectiveHealth: (montoPrimaAnual, deducible, coberturaSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoColectivo, estatusPoliza, collective) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Colectivo 
                                SET numero_colectivo=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_colectivo=?, correo_tomador=?, tipo_colectivo=?, fecha_desde_colectivo=?, fecha_hasta_colectivo=?, tipo_moneda_colectivo=?, prima_anual_colectivo=?, estatus_colectivo=?, cobertura_suma_asegurada_colectivo=?, tipo_canal_colectivo=?, deducible_colectivo=?, grupo_colectivo=?, maternidad_colectivo=?, plazo_espera_colectivo=?, detalle_cliente_colectivo=? 
                                WHERE id_colectivo=?`, 
                [collective.numero_colectivo, collective.tipo_id_rif_tomador, collective.id_rif_tomador, collective.nombre_tomador_colectivo, collective.correo_tomador, tipoColectivo, fechaPolizaDesde, fechaPolizaHasta, collective.tipo_moneda_colectivo, montoPrimaAnual, estatusPoliza, coberturaSumaAsegurada, collective.tipo_canal_colectivo, deducible, collective.grupo_colectivo, collective.maternidad_colectivo, collective.plazo_espera_colectivo, fechaDetalleCliente, collective.id_colectivo],
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
    updateCollective: (tomadorAsegurado, montoPrimaAnual, deducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, collective) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Colectivo 
                                SET numero_colectivo=?, tomador_asegurado_colectivo=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_colectivo=?, correo_tomador=?, tipo_colectivo=?, fecha_desde_colectivo=?, fecha_hasta_colectivo=?, tipo_moneda_colectivo=?, prima_anual_colectivo=?, estatus_colectivo=?, tipo_canal_colectivo=?, deducible_colectivo=?, grupo_colectivo=?
                                WHERE id_colectivo=?`, 
                [collective.numero_colectivo, tomadorAsegurado, collective.tipo_id_rif_tomador, collective.id_rif_tomador, collective.nombre_tomador_colectivo, collective.correo_tomador, tipoColectivo, fechaPolizaDesde, fechaPolizaHasta, collective.tipo_moneda_colectivo, montoPrimaAnual, estatusPoliza, collective.tipo_canal_colectivo, deducible, collective.grupo_colectivo, collective.id_colectivo],
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
    updateDisableCollective: (id, collective) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Colectivo 
                                SET obser_deshabilitar_colectivo=? 
                                WHERE id_colectivo=?`, 
                [collective.obser_deshabilitar_colectivo ,id],
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
    disableCollective: (id, disableCollective) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Colectivo 
                                SET deshabilitar_colectivo=? 
                                WHERE id_colectivo=?`, 
                [disableCollective, id],
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