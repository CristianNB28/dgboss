const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getPolicies: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_poliza, numero_poliza, tipo_individual_poliza, nombre_tomador_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_anual_poliza, estatus_poliza 
                    FROM Poliza 
                    WHERE deshabilitar_poliza=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getPoliciesNumbers: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT numero_poliza 
                    FROM Poliza`, 
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
            db.query(`SELECT * 
                    FROM Poliza 
                    WHERE id_poliza=?`, 
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
            db.query(`SELECT id_poliza, numero_poliza, prima_anual_poliza, tipo_moneda_poliza 
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
    getHealthPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(tipo_individual_poliza) AS health
                    FROM Poliza 
                    WHERE tipo_individual_poliza='Salud'
                    AND deshabilitar_poliza=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getAutoPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(tipo_individual_poliza) AS auto
                    FROM Poliza 
                    WHERE tipo_individual_poliza='Automovil'
                    AND deshabilitar_poliza=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPatrimonialPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(tipo_individual_poliza) AS patrimonial
                    FROM Poliza 
                    WHERE tipo_individual_poliza='Patrimonial'
                    AND deshabilitar_poliza=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getBailPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(tipo_individual_poliza) AS bail
                    FROM Poliza 
                    WHERE tipo_individual_poliza='Fianza'
                    AND deshabilitar_poliza=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getAnotherBranchPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(tipo_individual_poliza) AS anotherBranch
                    FROM Poliza 
                    WHERE tipo_individual_poliza='Otros Ramos'
                    AND deshabilitar_poliza=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getFuneralPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(tipo_individual_poliza) AS funeral
                    FROM Poliza 
                    WHERE tipo_individual_poliza='Funerario'
                    AND deshabilitar_poliza=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getLifePolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(tipo_individual_poliza) AS life
                    FROM Poliza 
                    WHERE tipo_individual_poliza='Vida'
                    AND deshabilitar_poliza=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getAPPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(tipo_individual_poliza) AS ap
                    FROM Poliza 
                    WHERE tipo_individual_poliza='AP'
                    AND deshabilitar_poliza=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getTravelPolicyCounter: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(tipo_individual_poliza) AS travel
                    FROM Poliza 
                    WHERE tipo_individual_poliza='Viaje'
                    AND deshabilitar_poliza=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getSummaryPolizaCousins: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(prima_anual_poliza) AS primaTotal
                    FROM Poliza 
                    WHERE deshabilitar_poliza=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPolicyHolder: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT DISTINCT(nombre_tomador_poliza) AS nombreTomador
                    FROM Poliza 
                    WHERE deshabilitar_poliza=0`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPolicyNumberId: (numberPolicy) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_poliza
                    FROM Poliza 
                    WHERE numero_poliza=? AND deshabilitar_poliza=0`,
            [numberPolicy], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getVehicleAccidentSum: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_vehiculo
                    FROM Poliza
                    WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = 'DÓLAR') AND (tipo_individual_poliza = 'AUTOMÓVIL'))
                    UNION
                    SELECT SUM(prima_anual_colectivo) as siniestralidad_vehiculo
                    FROM Colectivo
                    WHERE ((DATE(fecha_desde_colectivo) BETWEEN ? AND ?) AND (tipo_moneda_colectivo = 'DÓLAR') AND (tipo_colectivo = 'AUTOMÓVIL'))`,
            [startDate, endDate, startDate, endDate], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getVehicleAccidentRateSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_vehiculo_suma
                    FROM Poliza
                    WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = ?) AND (tipo_individual_poliza = 'AUTOMÓVIL'))
                    UNION
                    SELECT SUM(prima_anual_colectivo) as siniestralidad_vehiculo_suma
                    FROM Colectivo
                    WHERE ((DATE(fecha_desde_colectivo) BETWEEN ? AND ?) AND (tipo_moneda_colectivo = ?) AND (tipo_colectivo = 'AUTOMÓVIL'))`,
            [startDate, endDate, coinType, startDate, endDate, coinType], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getHealthAccidentSum: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_salud
                    FROM Poliza
                    WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = 'DÓLAR') AND (tipo_individual_poliza = 'SALUD'))
                    UNION
                    SELECT SUM(prima_anual_colectivo) as siniestralidad_salud
                    FROM Colectivo
                    WHERE ((DATE(fecha_desde_colectivo) BETWEEN ? AND ?) AND (tipo_moneda_colectivo = 'DÓLAR') AND (tipo_colectivo = 'SALUD'))`,
            [startDate, endDate, startDate, endDate], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getHealthAccidentRateSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_salud_suma
                    FROM Poliza
                    WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = ?) AND (tipo_individual_poliza = 'SALUD'))
                    UNION
                    SELECT SUM(prima_anual_colectivo) as siniestralidad_salud_suma
                    FROM Colectivo
                    WHERE ((DATE(fecha_desde_colectivo) BETWEEN ? AND ?) AND (tipo_moneda_colectivo = ?) AND (tipo_colectivo = 'SALUD'))`,
            [startDate, endDate, coinType, startDate, endDate, coinType], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPatrimonialAccidentSum: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_patrimonial
                    FROM Poliza
                    WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = 'DÓLAR') AND (tipo_individual_poliza = 'PATRIMONIAL'))`,
            [startDate, endDate], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPatrimonialAccidentRateSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_patrimonial_suma
                    FROM Poliza
                    WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = ?) AND (tipo_individual_poliza = 'PATRIMONIAL'))`,
            [startDate, endDate, coinType], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getBailAccidentSum: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_fianza
                    FROM Poliza
                    WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = 'DÓLAR') AND (tipo_individual_poliza = 'FIANZA'))`,
            [startDate, endDate], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getBailAccidentRateSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(prima_anual_poliza) as siniestralidad_fianza_suma
                    FROM Poliza
                    WHERE ((DATE(fecha_desde_poliza) BETWEEN ? AND ?) AND (tipo_moneda_poliza = ?) AND (tipo_individual_poliza = 'FIANZA'))`,
            [startDate, endDate, coinType], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getChargedCounterPremium: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(p.prima_anual_poliza - c.monto_comision_comision) as prima_cobrada
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
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getChargedCounterPremiumDate: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(p.prima_anual_poliza - c.monto_comision_comision) as prima_cobrada_date
                    FROM Poliza p
                    INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                    INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                    WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO'))
                    UNION
                    SELECT SUM(pc.prima_anual_colectivo - c.monto_comision_comision) as prima_cobrada
                    FROM Colectivo pc
                    INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                    INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                    WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO'))`,
            [startDate, endDate, coinType, startDate, endDate, coinType], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPremiumReturnedCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(p.prima_anual_poliza - c.monto_comision_comision) as prima_devuelta
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
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPremiumReturnedCounterDate: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(p.prima_anual_poliza - c.monto_comision_comision) as prima_devuelta_date
                    FROM Poliza p
                    INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                    INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                    WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE'))
                    UNION
                    SELECT SUM(pc.prima_anual_colectivo - c.monto_comision_comision) as prima_devuelta
                    FROM Colectivo pc
                    INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                    INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                    WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = ?) AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE'))`,
            [startDate, endDate, coinType, startDate, endDate, coinType], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPremiumCollectedNetCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta
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
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPremiumCollectedNetCounterDate: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_date
                    FROM Poliza p
                    INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                    INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                    WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO'))
                    UNION
                    SELECT SUM(pc.prima_anual_colectivo) as prima_cobrada_neta
                    FROM Colectivo pc
                    INNER JOIN Comision c ON pc.id_colectivo = c.colectivo_id
                    INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                    WHERE ((DATE(pc.fecha_desde_colectivo) BETWEEN ? AND ?) AND (pc.tipo_moneda_colectivo = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO'))`,
            [startDate, endDate, coinType, startDate, endDate, coinType], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPremiumCollectedNetVehicleCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_vehiculo
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
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPremiumCollectedNetVehicleSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_vehiculo_suma
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
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPremiumCollectedNetHealthCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_salud
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
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPremiumCollectedNetHealthSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_salud_suma
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
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPremiumCollectedNetPatrimonialCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_patrimonial
                    FROM Poliza p
                    INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                    INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                    WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'PATRIMONIAL'))`,
            [startDate, endDate], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPremiumCollectedNetPatrimonialSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_patrimonial_suma
                    FROM Poliza p
                    INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                    INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                    WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'PATRIMONIAL'))`,
            [startDate, endDate, coinType], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPremiumCollectedNetBailCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_fianza
                    FROM Poliza p
                    INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                    INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                    WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'FIANZA'))`,
            [startDate, endDate], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getPremiumCollectedNetBailSum: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT SUM(p.prima_anual_poliza) as prima_cobrada_neta_fianza_suma
                    FROM Poliza p
                    INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                    INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                    WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'FIANZA'))`,
            [startDate, endDate, coinType], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getNonRenewedVehiclePolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(p.id_poliza) as poliza_no_renovada_auto
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
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getNonRenewedVehiclePolicyCount: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(p.id_poliza) as poliza_no_renovada_auto_contador
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
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getNonRenewedHealthPolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(p.id_poliza) as poliza_no_renovada_salud
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
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getNonRenewedHealthPolicyCount: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(p.id_poliza) as poliza_no_renovada_salud_contador
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
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getNonRenewedPatrimonialPolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(p.id_poliza) as poliza_no_renovada_patrimonial
                    FROM Poliza p
                    INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                    INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                    WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE') AND (p.tipo_individual_poliza = 'PATRIMONIAL'))`,
            [startDate, endDate], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getNonRenewedPatrimonialPolicyCount: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(p.id_poliza) as poliza_no_renovada_patrimonial_contador
                    FROM Poliza p
                    INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                    INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                    WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PENDIENTE') AND (p.tipo_individual_poliza = 'PATRIMONIAL'))`,
            [startDate, endDate, coinType], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getRenewedVehiclePolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(p.id_poliza) as poliza_renovada_auto
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
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getRenewedVehiclePolicyCount: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(p.id_poliza) as poliza_renovada_auto_contador
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
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getRenewedHealthPolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(p.id_poliza) as poliza_renovada_salud
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
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getRenewedHealthPolicyCount: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(p.id_poliza) as poliza_renovada_salud_contador
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
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getRenewedPatrimonialPolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(p.id_poliza) as poliza_renovada_patrimonial
                    FROM Poliza p
                    INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                    INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                    WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = 'DÓLAR') AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'PATRIMONIAL'))`,
            [startDate, endDate], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getRenewedPatrimonialPolicyCount: (startDate, endDate, coinType) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(p.id_poliza) as poliza_renovada_patrimonial_contador
                    FROM Poliza p
                    INNER JOIN Comision c ON p.id_poliza = c.poliza_id 
                    INNER JOIN Factor_Verificacion fv ON c.id_comision = fv.comision_id
                    WHERE ((DATE(p.fecha_desde_poliza) BETWEEN ? AND ?) AND (p.tipo_moneda_poliza = ?) AND (fv.estatus_comision_factor_verificacion = 'PAGADO') AND (p.tipo_individual_poliza = 'PATRIMONIAL'))`,
            [startDate, endDate, coinType], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postVehiclePolicyForm: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, tasa_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza, tipo_producto_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza, policy.tipo_producto_poliza],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postHealthPolicyForm: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, cobertura, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_anual_poliza, estatus_poliza, tipo_cobertura_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza, maternidad_poliza, plazo_espera_poliza, detalle_cliente_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaAnual, estatusPoliza, cobertura, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza, policy.maternidad_poliza, policy.plazo_espera_poliza, fechaDetalleCliente],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postPatrimonialPolicyForm: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_ramo_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, tasa_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postBailPolicyForm: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_ramo_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, tasa_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postAnotherBranchPolicyForm: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_ramo_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, tasa_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postFuneralPolicyForm: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postLifePolicyForm: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postAPPolicyForm: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_ramo_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postTravelPolicyForm: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, tipo_id_rif_tomador, id_rif_tomador, nombre_tomador_poliza, correo_tomador, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateHealthPolicy: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, cobertura, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza 
                    SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, prima_anual_poliza=?, estatus_poliza=?, tipo_cobertura_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?, maternidad_poliza=?, plazo_espera_poliza=?, detalle_cliente_poliza=? 
                    WHERE id_poliza=?`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaAnual, estatusPoliza, cobertura, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza, policy.maternidad_poliza, policy.plazo_espera_poliza, fechaDetalleCliente, policy.id_poliza], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateVehiclePolicy: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza 
                    SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, tasa_poliza=?, prima_anual_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?, tipo_producto_poliza=?
                    WHERE id_poliza=?`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza, policy.tipo_producto_poliza, policy.id_poliza], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updatePatrimonialPolicy: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza 
                    SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_ramo_poliza=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, tasa_poliza=?, prima_anual_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?
                    WHERE id_poliza=?`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza, policy.id_poliza], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateBailPolicy: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza 
                    SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_ramo_poliza=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, tasa_poliza=?, prima_anual_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?
                    WHERE id_poliza=?`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza, policy.id_poliza], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateAnotherBranchPolicy: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza 
                    SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_ramo_poliza=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, tasa_poliza=?, prima_anual_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?
                    WHERE id_poliza=?`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza, policy.id_poliza], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateFuneralPolicy: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza 
                    SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, prima_anual_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?
                    WHERE id_poliza=?`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza, policy.id_poliza], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateLifePolicy: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza 
                    SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, prima_anual_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?
                    WHERE id_poliza=?`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza, policy.id_poliza], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateAPPolicy: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza 
                    SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_ramo_poliza=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, prima_anual_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?
                    WHERE id_poliza=?`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza, policy.id_poliza], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateTravelPolicy: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza 
                    SET numero_poliza=?, tomador_asegurado_poliza=?, tipo_id_rif_tomador=?, id_rif_tomador=?, nombre_tomador_poliza=?, correo_tomador=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, prima_anual_poliza=?, estatus_poliza=?, tipo_canal_poliza=?, suma_asegurada_poliza=?, deducible_poliza=?, grupo_poliza=?
                    WHERE id_poliza=?`, 
            [policy.numero_poliza, tomadorAsegurado, policy.tipo_id_rif_tomador, policy.id_rif_tomador, policy.nombre_tomador_poliza, policy.correo_tomador, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza, policy.id_poliza], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateDisablePolicy: (id, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza 
                    SET obser_deshabilitar_poliza=? 
                    WHERE id_poliza=?`, 
            [policy.obser_deshabilitar_poliza ,id], 
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