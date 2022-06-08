const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getPolicies: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_poliza, numero_poliza, tipo_individual_poliza, nombre_tomador_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_neta_poliza, igtf_poliza, prima_total_poliza, estatus_poliza 
                                FROM Poliza 
                                WHERE deshabilitar_poliza=0`,
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
    getPoliciesNumbers: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT numero_poliza 
                                FROM Poliza`,
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
    getPolicy: (idPolicy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Poliza 
                                WHERE id_poliza=?`, 
                [idPolicy],
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
    getPolicyLast: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Poliza 
                                WHERE deshabilitar_poliza=0
                                ORDER BY id_poliza DESC
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
    getHealthPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(tipo_individual_poliza) AS health
                                FROM Poliza 
                                WHERE tipo_individual_poliza='Salud'
                                AND deshabilitar_poliza=0`,
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
    getAutoPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(tipo_individual_poliza) AS auto
                                FROM Poliza 
                                WHERE tipo_individual_poliza='Automovil'
                                AND deshabilitar_poliza=0`,
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
    getPatrimonialPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(tipo_individual_poliza) AS patrimonial
                                FROM Poliza 
                                WHERE tipo_individual_poliza='Patrimonial'
                                AND deshabilitar_poliza=0`,
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
    getBailPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(tipo_individual_poliza) AS bail
                                FROM Poliza 
                                WHERE tipo_individual_poliza='Fianza'
                                AND deshabilitar_poliza=0`,
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
    getAnotherBranchPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(tipo_individual_poliza) AS anotherBranch
                                FROM Poliza 
                                WHERE tipo_individual_poliza='Otros Ramos'
                                AND deshabilitar_poliza=0`,
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
    getFuneralPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(tipo_individual_poliza) AS funeral
                                FROM Poliza 
                                WHERE tipo_individual_poliza='Funerario'
                                AND deshabilitar_poliza=0`,
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
    getLifePolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(tipo_individual_poliza) AS life
                                FROM Poliza 
                                WHERE tipo_individual_poliza='Vida'
                                AND deshabilitar_poliza=0`,
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
    getAPPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(tipo_individual_poliza) AS ap
                                FROM Poliza 
                                WHERE tipo_individual_poliza='AP'
                                AND deshabilitar_poliza=0`,
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
    getTravelPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(tipo_individual_poliza) AS travel
                                FROM Poliza 
                                WHERE tipo_individual_poliza='Viaje'
                                AND deshabilitar_poliza=0`,
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
    getSummaryPolizaCousins: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(prima_anual_poliza) AS primaTotal
                                FROM Poliza 
                                WHERE deshabilitar_poliza=0`,
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
    getPolicyNumberId: (numberPolicy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_poliza
                                FROM Poliza 
                                WHERE numero_poliza=? AND deshabilitar_poliza=0`, 
                [numberPolicy],
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
    getVehicleAccidentSum: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_vehiculo
                                FROM Poliza
                                WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = 'DÓLAR') AND (tipo_individual_poliza = 'AUTOMÓVIL'))
                                UNION
                                SELECT SUM(prima_anual_colectivo) as siniestralidad_vehiculo
                                FROM Colectivo
                                WHERE ((DATE(fecha_desde_colectivo) BETWEEN ? AND ?) AND (tipo_moneda_colectivo = 'DÓLAR') AND (tipo_colectivo = 'AUTOMÓVIL'))`, 
                [startDate, endDate, startDate, endDate], 
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
    getVehicleAccidentRateSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_vehiculo_suma
                                FROM Poliza
                                WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = ?) AND (tipo_individual_poliza = 'AUTOMÓVIL'))
                                UNION
                                SELECT SUM(prima_anual_colectivo) as siniestralidad_vehiculo_suma
                                FROM Colectivo
                                WHERE ((DATE(fecha_desde_colectivo) BETWEEN ? AND ?) AND (tipo_moneda_colectivo = ?) AND (tipo_colectivo = 'AUTOMÓVIL'))`, 
                [startDate, endDate, coinType, startDate, endDate, coinType],  
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
    getHealthAccidentSum: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_salud
                                FROM Poliza
                                WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = 'DÓLAR') AND (tipo_individual_poliza = 'SALUD'))
                                UNION
                                SELECT SUM(prima_anual_colectivo) as siniestralidad_salud
                                FROM Colectivo
                                WHERE ((DATE(fecha_desde_colectivo) BETWEEN ? AND ?) AND (tipo_moneda_colectivo = 'DÓLAR') AND (tipo_colectivo = 'SALUD'))`, 
                [startDate, endDate, startDate, endDate], 
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
    getHealthAccidentRateSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_salud_suma
                                FROM Poliza
                                WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = ?) AND (tipo_individual_poliza = 'SALUD'))
                                UNION
                                SELECT SUM(prima_anual_colectivo) as siniestralidad_salud_suma
                                FROM Colectivo
                                WHERE ((DATE(fecha_desde_colectivo) BETWEEN ? AND ?) AND (tipo_moneda_colectivo = ?) AND (tipo_colectivo = 'SALUD'))`, 
                [startDate, endDate, coinType, startDate, endDate, coinType],  
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
    getPatrimonialAccidentSum: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_patrimonial
                                FROM Poliza
                                WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = 'DÓLAR') AND (tipo_individual_poliza = 'PATRIMONIAL'))`, 
                [startDate, endDate],
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
    getPatrimonialAccidentRateSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_patrimonial_suma
                                FROM Poliza
                                WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = ?) AND (tipo_individual_poliza = 'PATRIMONIAL'))`, 
                [startDate, endDate, coinType],
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
    getBailAccidentSum: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_fianza
                                FROM Poliza
                                WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = 'DÓLAR') AND (tipo_individual_poliza = 'FIANZA'))`,
                [startDate, endDate],
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
    getBailAccidentRateSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_fianza_suma
                                FROM Poliza
                                WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = ?) AND (tipo_individual_poliza = 'FIANZA'))`, 
                [startDate, endDate, coinType],
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
    getChargedCounterPremium: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(p.prima_anual_poliza - c.monto_comision_comision) as prima_cobrada
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO'))
                                UNION
                                SELECT SUM(pc.prima_anual_colectivo - c.monto_comision_comision) as prima_cobrada
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO'))`, 
                [startDate, endDate, startDate, endDate], 
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
    getChargedCounterPremiumDate: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(p.prima_anual_poliza - c.monto_comision_comision) as prima_cobrada_date
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO'))
                                UNION
                                SELECT SUM(pc.prima_anual_colectivo - c.monto_comision_comision) as prima_cobrada_date
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO'))`, 
                [startDate, endDate, coinType, startDate, endDate, coinType],  
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
    getPremiumReturnedCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(p.prima_anual_poliza - c.monto_comision_comision) as prima_devuelta
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE'))
                                UNION
                                SELECT SUM(pc.prima_anual_colectivo - c.monto_comision_comision) as prima_devuelta
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE'))`, 
                [startDate, endDate, startDate, endDate], 
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
    getPremiumReturnedCounterDate: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(p.prima_anual_poliza - c.monto_comision_comision) as prima_devuelta_date
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE'))
                                UNION
                                SELECT SUM(pc.prima_anual_colectivo - c.monto_comision_comision) as prima_devuelta_date
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = ?) AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE'))`, 
                [startDate, endDate, coinType, startDate, endDate, coinType],  
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
    getPremiumCollectedNetCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO'))
                                UNION
                                SELECT SUM(pc.prima_anual_colectivo) as prima_cobrada_neta
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO'))`, 
                [startDate, endDate, startDate, endDate], 
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
    getPremiumCollectedNetCounterDate: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_date
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO'))
                                UNION
                                SELECT SUM(pc.prima_anual_colectivo) as prima_cobrada_neta_date
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO'))`, 
                [startDate, endDate, coinType, startDate, endDate, coinType],  
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
    getPremiumCollectedNetVehicleCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_vehiculo
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'AUTOMÓVIL'))
                                UNION
                                SELECT SUM(pc.prima_anual_colectivo) as prima_cobrada_neta_vehiculo
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (pc.tipo_colectivo = 'AUTOMÓVIL'))`, 
                [startDate, endDate, startDate, endDate], 
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
    getPremiumCollectedNetVehicleSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_vehiculo_suma
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'AUTOMÓVIL'))
                                UNION
                                SELECT SUM(pc.prima_anual_colectivo) as prima_cobrada_neta_vehiculo_suma
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (pc.tipo_colectivo = 'AUTOMÓVIL'))`,
                [startDate, endDate, coinType, startDate, endDate, coinType],  
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
    getPremiumCollectedNetHealthCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_salud
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'SALUD'))
                                UNION
                                SELECT SUM(pc.prima_anual_colectivo) as prima_cobrada_neta_salud
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (pc.tipo_colectivo = 'SALUD'))`, 
                [startDate, endDate, startDate, endDate], 
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
    getPremiumCollectedNetHealthSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_salud_suma
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'SALUD'))
                                UNION
                                SELECT SUM(pc.prima_anual_colectivo) as prima_cobrada_neta_salud_suma
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (pc.tipo_colectivo = 'SALUD'))`,
                [startDate, endDate, coinType, startDate, endDate, coinType],  
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
    getPremiumCollectedNetPatrimonialCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_patrimonial
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'PATRIMONIAL'))`,
                [startDate, endDate],
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
    getPremiumCollectedNetPatrimonialSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_patrimonial_suma
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'PATRIMONIAL'))`, 
                [startDate, endDate, coinType],
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
    getPremiumCollectedNetBailCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_fianza
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'FIANZA'))`,
                [startDate, endDate],
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
    getPremiumCollectedNetBailSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_fianza_suma
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'FIANZA'))`,
                [startDate, endDate, coinType],
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
    getNonRenewedVehiclePolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(p.id_poliza) as poliza_no_renovada_auto
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE') AND (p.tipo_individual_poliza = 'AUTOMÓVIL'))
                                UNION ALL
                                SELECT COUNT(pc.id_colectivo) as poliza_no_renovada_auto
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE') AND (pc.tipo_colectivo = 'AUTOMÓVIL'))`, 
                [startDate, endDate, startDate, endDate], 
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
    getNonRenewedVehiclePolicyCount: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(p.id_poliza) as poliza_no_renovada_auto_contador
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE') AND (p.tipo_individual_poliza = 'AUTOMÓVIL'))
                                UNION ALL
                                SELECT COUNT(pc.id_colectivo) as poliza_no_renovada_auto_contador
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = ?) AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE') AND (pc.tipo_colectivo = 'AUTOMÓVIL'))`,
                [startDate, endDate, coinType, startDate, endDate, coinType],  
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
    getNonRenewedHealthPolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(p.id_poliza) as poliza_no_renovada_salud
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE') AND (p.tipo_individual_poliza = 'SALUD'))
                                UNION ALL
                                SELECT COUNT(pc.id_colectivo) as poliza_no_renovada_salud
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE') AND (pc.tipo_colectivo = 'SALUD'))`,
                [startDate, endDate, startDate, endDate], 
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
    getNonRenewedHealthPolicyCount: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(p.id_poliza) as poliza_no_renovada_salud_contador
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE') AND (p.tipo_individual_poliza = 'SALUD'))
                                UNION ALL
                                SELECT COUNT(pc.id_colectivo) as poliza_no_renovada_salud_contador
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = ?) AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE') AND (pc.tipo_colectivo = 'SALUD'))`,
                [startDate, endDate, coinType, startDate, endDate, coinType],  
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
    getNonRenewedPatrimonialPolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(p.id_poliza) as poliza_no_renovada_patrimonial
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE') AND (p.tipo_individual_poliza = 'PATRIMONIAL'))`,
                [startDate, endDate],
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
    getNonRenewedPatrimonialPolicyCount: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(p.id_poliza) as poliza_no_renovada_patrimonial_contador
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE') AND (p.tipo_individual_poliza = 'PATRIMONIAL'))`,
                [startDate, endDate, coinType],
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
    getRenewedVehiclePolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(p.id_poliza) as poliza_renovada_auto
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'AUTOMÓVIL'))
                                UNION ALL
                                SELECT COUNT(pc.id_colectivo) as poliza_renovada_auto
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (pc.tipo_colectivo = 'AUTOMÓVIL'))`,
                [startDate, endDate, startDate, endDate], 
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
    getRenewedVehiclePolicyCount: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(p.id_poliza) as poliza_renovada_auto_contador
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'AUTOMÓVIL'))
                                UNION ALL
                                SELECT COUNT(pc.id_colectivo) as poliza_renovada_auto_contador
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (pc.tipo_colectivo = 'AUTOMÓVIL'))`,
                [startDate, endDate, coinType, startDate, endDate, coinType],  
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
    getRenewedHealthPolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(p.id_poliza) as poliza_renovada_salud
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'SALUD'))
                                UNION ALL
                                SELECT COUNT(pc.id_colectivo) as poliza_renovada_salud
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (pc.tipo_colectivo = 'SALUD'))`,
                [startDate, endDate, startDate, endDate], 
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
    getRenewedHealthPolicyCount: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(p.id_poliza) as poliza_renovada_salud_contador
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'SALUD'))
                                UNION ALL
                                SELECT COUNT(pc.id_colectivo) as poliza_renovada_salud_contador
                                FROM Colectivo pc
                                INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (pc.tipo_colectivo = 'SALUD'))`,
                [startDate, endDate, coinType, startDate, endDate, coinType],  
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
    getRenewedPatrimonialPolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(p.id_poliza) as poliza_renovada_patrimonial
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'PATRIMONIAL'))`,
                [startDate, endDate],
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
    getRenewedPatrimonialPolicyCount: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(p.id_poliza) as poliza_renovada_patrimonial_contador
                                FROM Poliza p
                                INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                                INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                                WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'PATRIMONIAL'))`,
                [startDate, endDate, coinType],
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
    postVehiclePolicyForm: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, tasa_poliza, prima_neta_poliza, igtf_poliza, prima_total_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza, tipo_producto_poliza, fraccionamiento_boolean_poliza, tipo_fraccionamiento_poliza, numero_pago_poliza)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, policy.tipo_producto_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza],
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
    postHealthPolicyForm: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, montoCobertura, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_neta_poliza, igtf_poliza, prima_total_poliza, estatus_poliza, tipo_cobertura_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza, maternidad_poliza, plazo_espera_poliza, detalle_cliente_poliza, fraccionamiento_boolean_poliza, tipo_fraccionamiento_poliza, numero_pago_poliza)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, montoCobertura, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, policy.maternidad_poliza, policy.plazo_espera_poliza, fechaDetalleCliente, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza],
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
    postPatrimonialPolicyForm: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_ramo_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, tasa_poliza, prima_neta_poliza, igtf_poliza, prima_total_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza, fraccionamiento_boolean_poliza, tipo_fraccionamiento_poliza, numero_pago_poliza)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza],
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
    postBailPolicyForm: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_ramo_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, tasa_poliza, prima_neta_poliza, igtf_poliza, prima_total_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza, fraccionamiento_boolean_poliza, tipo_fraccionamiento_poliza, numero_pago_poliza)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza],
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
    postAnotherBranchPolicyForm: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_ramo_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, tasa_poliza, prima_neta_poliza, igtf_poliza, prima_total_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza, fraccionamiento_boolean_poliza, tipo_fraccionamiento_poliza, numero_pago_poliza)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza],
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
    postFuneralPolicyForm: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_neta_poliza, igtf_poliza, prima_total_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza, fraccionamiento_boolean_poliza, tipo_fraccionamiento_poliza, numero_pago_poliza)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza],
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
    postLifePolicyForm: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_neta_poliza, igtf_poliza, prima_total_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza, fraccionamiento_boolean_poliza, tipo_fraccionamiento_poliza, numero_pago_poliza)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza],
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
    postAPPolicyForm: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_ramo_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_neta_poliza, igtf_poliza, prima_total_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza, fraccionamiento_boolean_poliza, tipo_fraccionamiento_poliza, numero_pago_poliza)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza,  montoSumaAsegurada, montoDeducible, policy.grupo_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza],
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
    postTravelPolicyForm: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_neta_poliza, igtf_poliza, prima_total_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza, fraccionamiento_boolean_poliza, tipo_fraccionamiento_poliza, numero_pago_poliza)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza],
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
    updateHealthPolicy: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, montoCobertura, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Poliza 
                                SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, prima_neta_poliza=?, igtf_poliza=?, prima_total_poliza=?, estatus_poliza=?, tipo_cobertura_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?, maternidad_poliza=?, plazo_espera_poliza=?, detalle_cliente_poliza=?, fraccionamiento_boolean_poliza=?, tipo_fraccionamiento_poliza=?, numero_pago_poliza=? 
                                WHERE id_poliza=?`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, montoCobertura, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, policy.maternidad_poliza, policy.plazo_espera_poliza, fechaDetalleCliente, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza, policy.id_poliza],
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
    updateVehiclePolicy: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Poliza 
                                SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, tasa_poliza=?, prima_neta_poliza=?, igtf_poliza=?, prima_total_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?, tipo_producto_poliza=?, fraccionamiento_boolean_poliza=?, tipo_fraccionamiento_poliza=?, numero_pago_poliza=?
                                WHERE id_poliza=?`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, policy.tipo_producto_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza, policy.id_poliza],
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
    updatePatrimonialPolicy: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Poliza 
                                SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_ramo_poliza=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, tasa_poliza=?, prima_neta_poliza=?, igtf_poliza=?, prima_total_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?, fraccionamiento_boolean_poliza=?, tipo_fraccionamiento_poliza=?, numero_pago_poliza=?
                                WHERE id_poliza=?`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza, policy.id_poliza],
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
    updateBailPolicy: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Poliza 
                                SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_ramo_poliza=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, tasa_poliza=?, prima_neta_poliza=?, igtf_poliza=?, prima_total_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?, fraccionamiento_boolean_poliza=?, tipo_fraccionamiento_poliza=?, numero_pago_poliza=?
                                WHERE id_poliza=?`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza, policy.id_poliza],
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
    updateAnotherBranchPolicy: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Poliza 
                                SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_ramo_poliza=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, tasa_poliza=?, prima_neta_poliza=?, igtf_poliza=?, prima_total_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?, fraccionamiento_boolean_poliza=?, tipo_fraccionamiento_poliza=?, numero_pago_poliza=?
                                WHERE id_poliza=?`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza, policy.id_poliza],
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
    updateFuneralPolicy: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Poliza 
                                SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, prima_neta_poliza=?, igtf_poliza=?, prima_total_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?, fraccionamiento_boolean_poliza=?, tipo_fraccionamiento_poliza=?, numero_pago_poliza=?
                                WHERE id_poliza=?`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza, policy.id_poliza],
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
    updateLifePolicy: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Poliza 
                                SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, prima_neta_poliza=?, igtf_poliza=?, prima_total_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?, fraccionamiento_boolean_poliza=?, tipo_fraccionamiento_poliza=?, numero_pago_poliza=? 
                                WHERE id_poliza=?`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza, policy.id_poliza],
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
    updateAPPolicy: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Poliza 
                                SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_ramo_poliza=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, prima_neta_poliza=?, igtf_poliza=?, prima_total_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?, fraccionamiento_boolean_poliza=?, tipo_fraccionamiento_poliza=?, numero_pago_poliza=?
                                WHERE id_poliza=?`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza,  montoSumaAsegurada, montoDeducible, policy.grupo_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza, policy.id_poliza],
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
    updateTravelPolicy: (tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Poliza 
                                SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, prima_neta_poliza=?, igtf_poliza=?, prima_total_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?, fraccionamiento_boolean_poliza=?, tipo_fraccionamiento_poliza=?, numero_pago_poliza=?
                                WHERE id_poliza=?`, 
                [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaNeta, montoIgtf, montoPrimaTotal, estatusPoliza, policy.tipo_canal_poliza, montoSumaAsegurada, montoDeducible, policy.grupo_poliza, fraccionamientoBoolean, policy.tipo_fraccionamiento_poliza, policy.numero_pago_poliza, policy.id_poliza],
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
    updateDisablePolicy: (id, policy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Poliza 
                                SET obser_deshabilitar_poliza=? 
                                WHERE id_poliza=?`, 
                [policy.obser_deshabilitar_poliza ,id],
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
    disablePolicy: (id, disablePolicy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Poliza 
                                SET deshabilitar_poliza=? 
                                WHERE id_poliza=?`, 
                [disablePolicy, id],
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