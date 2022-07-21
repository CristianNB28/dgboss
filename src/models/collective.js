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
                connection.query(`SELECT * 
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
    getCollectiveReceipts: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Colectivo c
                                INNER JOIN Recibo r ON c.id_colectivo = r.colectivo_id
                                WHERE c.deshabilitar_colectivo=0 AND r.deshabilitar_recibo=0`,
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
                                WHERE id_colectivo=? AND deshabilitar_colectivo=0`, 
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
                connection.query(`SELECT * 
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
                connection.query(`SELECT SUM(prima_neta_colectivo) AS primaTotalColectivo
                                FROM Colectivo 
                                WHERE deshabilitar_colectivo=0 AND tipo_moneda_colectivo='DÓLAR'`,
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
    getSumPremiumCounter: (collectiveType, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(id_colectivo) AS colectivo_contador_tipo, SUM(prima_neta_colectivo) AS prima_total
                                FROM Colectivo
                                WHERE tipo_colectivo=? AND tipo_moneda_colectivo=? AND deshabilitar_colectivo=0`,
                [collectiveType, coinType],
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
    getVehicleAccidentSumCollective: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(re.monto_reclamo_reembolso) AS siniestralidadVehiculoColectivo
                                FROM Colectivo co, Reembolso re
                                WHERE DATE(co.fecha_desde_colectivo) BETWEEN ? AND ? AND re.tipo_moneda_reembolso='DÓLAR' AND 
                                co.tipo_colectivo='AUTOMÓVIL' AND co.deshabilitar_colectivo=0 AND re.colectivo_id=co.id_colectivo AND
                                re.deshabilitar_reembolso=0
                                UNION
                                SELECT SUM(amp.monto_reclamado_amp) AS siniestralidadVehiculoColectivo
                                FROM Colectivo co, AMP amp
                                WHERE DATE(co.fecha_desde_colectivo) BETWEEN ? AND ? AND amp.tipo_moneda_amp='DÓLAR' AND 
                                co.tipo_colectivo='AUTOMÓVIL' AND co.deshabilitar_colectivo=0 AND amp.colectivo_id=co.id_colectivo AND
                                amp.deshabilitar_amp=0
                                UNION
                                SELECT SUM(em.monto_reclamado_emergencia) AS siniestralidadVehiculoColectivo
                                FROM Colectivo co, Emergencia em
                                WHERE DATE(co.fecha_desde_colectivo) BETWEEN ? AND ? AND em.tipo_moneda_emergencia='DÓLAR' AND 
                                co.tipo_colectivo='AUTOMÓVIL' AND co.deshabilitar_colectivo=0 AND em.colectivo_id=co.id_colectivo AND
                                em.deshabilitar_emergencia=0
                                UNION
                                SELECT SUM(ca.monto_reclamado_carta_aval) AS siniestralidadVehiculoColectivo
                                FROM Colectivo co, Carta_Aval ca
                                WHERE DATE(co.fecha_desde_colectivo) BETWEEN ? AND ? AND ca.tipo_moneda_carta_aval='DÓLAR' AND 
                                co.tipo_colectivo='AUTOMÓVIL' AND co.deshabilitar_colectivo=0 AND ca.colectivo_id=co.id_colectivo AND
                                ca.deshabilitar_carta_aval=0`, 
                [startDate, endDate, startDate, endDate, startDate, endDate, startDate, endDate], 
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
    getHealthAccidentSumCollective: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(re.monto_reclamo_reembolso) AS siniestralidadSaludColectivo
                                FROM Colectivo co, Reembolso re
                                WHERE DATE(co.fecha_desde_colectivo) BETWEEN ? AND ? AND re.tipo_moneda_reembolso='DÓLAR' AND 
                                co.tipo_colectivo='SALUD' AND co.deshabilitar_colectivo=0 AND re.colectivo_id=co.id_colectivo AND
                                re.deshabilitar_reembolso=0
                                UNION
                                SELECT SUM(amp.monto_reclamado_amp) AS siniestralidadSaludColectivo
                                FROM Colectivo co, AMP amp
                                WHERE DATE(co.fecha_desde_colectivo) BETWEEN ? AND ? AND amp.tipo_moneda_amp='DÓLAR' AND 
                                co.tipo_colectivo='SALUD' AND co.deshabilitar_colectivo=0 AND amp.colectivo_id=co.id_colectivo AND
                                amp.deshabilitar_amp=0
                                UNION
                                SELECT SUM(em.monto_reclamado_emergencia) AS siniestralidadSaludColectivo
                                FROM Colectivo co, Emergencia em
                                WHERE DATE(co.fecha_desde_colectivo) BETWEEN ? AND ? AND em.tipo_moneda_emergencia='DÓLAR' AND 
                                co.tipo_colectivo='SALUD' AND co.deshabilitar_colectivo=0 AND em.colectivo_id=co.id_colectivo AND
                                em.deshabilitar_emergencia=0
                                UNION
                                SELECT SUM(ca.monto_reclamado_carta_aval) AS siniestralidadSaludColectivo
                                FROM Colectivo co, Carta_Aval ca
                                WHERE DATE(co.fecha_desde_colectivo) BETWEEN ? AND ? AND ca.tipo_moneda_carta_aval='DÓLAR' AND 
                                co.tipo_colectivo='SALUD' AND co.deshabilitar_colectivo=0 AND ca.colectivo_id=co.id_colectivo AND
                                ca.deshabilitar_carta_aval=0`, 
                [startDate, endDate, startDate, endDate, startDate, endDate, startDate, endDate], 
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
    postCollectiveHealthForm: (fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoCoberturaSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoColectivo, estatusPoliza, collective) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Colectivo (numero_colectivo, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_colectivo, correo_tomador, tipo_colectivo, fecha_desde_colectivo, fecha_hasta_colectivo, tipo_moneda_colectivo, prima_neta_colectivo, igtf_colectivo, prima_total_colectivo, estatus_colectivo, cobertura_suma_asegurada_colectivo, tipo_canal_colectivo, deducible_colectivo, grupo_colectivo, maternidad_colectivo, plazo_espera_colectivo, detalle_cliente_colectivo, fraccionamiento_boolean_colectivo, tipo_fraccionamiento_colectivo, numero_pago_colectivo)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [collective.numero_colectivo, collective.tipo_id_rif_tomador, collective.id_rif_tomador, collective.nombre_tomador_colectivo, collective.correo_tomador, tipoColectivo, fechaPolizaDesde, fechaPolizaHasta, collective.tipo_moneda_colectivo, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, montoCoberturaSumaAsegurada, collective.tipo_canal_colectivo, montoDeducible, collective.grupo_colectivo, collective.maternidad_colectivo, collective.plazo_espera_colectivo, fechaDetalleCliente, fraccionamientoBoolean, collective.tipo_fraccionamiento_colectivo, collective.numero_pago_colectivo],
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
    postCollectiveForm: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, collective) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Colectivo (numero_colectivo, tomador_asegurado_colectivo, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_colectivo, correo_tomador, tipo_colectivo, fecha_desde_colectivo, fecha_hasta_colectivo, tipo_moneda_colectivo, prima_neta_colectivo, igtf_colectivo, prima_total_colectivo, estatus_colectivo, tipo_canal_colectivo, deducible_colectivo, grupo_colectivo, fraccionamiento_boolean_colectivo, tipo_fraccionamiento_colectivo, numero_pago_colectivo)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [collective.numero_colectivo, tomadorAsegurado, collective.tipo_id_rif_tomador, collective.id_rif_tomador, collective.nombre_tomador_colectivo, collective.correo_tomador, tipoColectivo, fechaPolizaDesde, fechaPolizaHasta, collective.tipo_moneda_colectivo, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, collective.tipo_canal_colectivo, montoDeducible, collective.grupo_colectivo, fraccionamientoBoolean, collective.tipo_fraccionamiento_colectivo, collective.numero_pago_colectivo],
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
    updateCollectiveHealth: (fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoCoberturaSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoColectivo, estatusPoliza, collective) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Colectivo 
                                SET numero_colectivo=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_colectivo=?, correo_tomador=?, tipo_colectivo=?, fecha_desde_colectivo=?, fecha_hasta_colectivo=?, tipo_moneda_colectivo=?, prima_neta_colectivo=?, igtf_colectivo=?, prima_total_colectivo=?, estatus_colectivo=?, cobertura_suma_asegurada_colectivo=?, tipo_canal_colectivo=?, deducible_colectivo=?, grupo_colectivo=?, maternidad_colectivo=?, plazo_espera_colectivo=?, detalle_cliente_colectivo=?, fraccionamiento_boolean_colectivo=?, tipo_fraccionamiento_colectivo=?, numero_pago_colectivo=? 
                                WHERE id_colectivo=?`, 
                [collective.numero_colectivo, collective.tipo_id_rif_tomador, collective.id_rif_tomador, collective.nombre_tomador_colectivo, collective.correo_tomador, tipoColectivo, fechaPolizaDesde, fechaPolizaHasta, collective.tipo_moneda_colectivo, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, montoCoberturaSumaAsegurada, collective.tipo_canal_colectivo, montoDeducible, collective.grupo_colectivo, collective.maternidad_colectivo, collective.plazo_espera_colectivo, fechaDetalleCliente, fraccionamientoBoolean, collective.tipo_fraccionamiento_colectivo, collective.numero_pago_colectivo, collective.id_colectivo],
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
    updateCollective: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, collective) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Colectivo 
                                SET numero_colectivo=?, tomador_asegurado_colectivo=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_colectivo=?, correo_tomador=?, tipo_colectivo=?, fecha_desde_colectivo=?, fecha_hasta_colectivo=?, tipo_moneda_colectivo=?, prima_neta_colectivo=?, igtf_colectivo=?, prima_total_colectivo=?, estatus_colectivo=?, tipo_canal_colectivo=?, deducible_colectivo=?, grupo_colectivo=?, fraccionamiento_boolean_colectivo=?, tipo_fraccionamiento_colectivo=?, numero_pago_colectivo=?
                                WHERE id_colectivo=?`, 
                [collective.numero_colectivo, tomadorAsegurado, collective.tipo_id_rif_tomador, collective.id_rif_tomador, collective.nombre_tomador_colectivo, collective.correo_tomador, tipoColectivo, fechaPolizaDesde, fechaPolizaHasta, collective.tipo_moneda_colectivo, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, collective.tipo_canal_colectivo, montoDeducible, collective.grupo_colectivo, fraccionamientoBoolean, collective.tipo_fraccionamiento_colectivo, collective.numero_pago_colectivo, collective.id_colectivo],
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