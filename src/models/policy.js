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
                connection.query(`SELECT * 
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
    getPoliciesReceipts: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Poliza p
                                INNER JOIN Recibo r ON p.id_poliza = r.poliza_id
                                WHERE p.deshabilitar_poliza=0 AND r.deshabilitar_recibo=0`,
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
                                WHERE id_poliza=? AND deshabilitar_poliza=0`, 
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
                connection.query(`SELECT SUM(prima_neta_poliza) AS primaTotalPoliza
                                FROM Poliza 
                                WHERE deshabilitar_poliza=0 AND tipo_moneda_poliza='DÓLAR'`,
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
    getVehicleAccidentSumPolicy: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(re.monto_reclamo_reembolso) AS siniestralidadVehiculoPoliza
                                FROM Poliza po, Reembolso re
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND re.tipo_moneda_reembolso='DÓLAR' AND 
                                po.tipo_individual_poliza='AUTOMÓVIL' AND po.deshabilitar_poliza=0 AND re.poliza_id=po.id_poliza AND
                                re.deshabilitar_reembolso=0
                                UNION
                                SELECT SUM(amp.monto_reclamado_amp) AS siniestralidadVehiculoPoliza
                                FROM Poliza po, AMP amp
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND amp.tipo_moneda_amp='DÓLAR' AND
                                po.tipo_individual_poliza='AUTOMÓVIL' AND po.deshabilitar_poliza=0 AND amp.poliza_id=po.id_poliza AND
                                amp.deshabilitar_amp=0
                                UNION
                                SELECT SUM(em.monto_reclamado_emergencia) AS siniestralidadVehiculoPoliza
                                FROM Poliza po, Emergencia em
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND em.tipo_moneda_emergencia='DÓLAR' AND
                                po.tipo_individual_poliza='AUTOMÓVIL' AND po.deshabilitar_poliza=0 AND em.poliza_id=po.id_poliza AND
                                em.deshabilitar_emergencia=0
                                UNION
                                SELECT SUM(ca.monto_reclamado_carta_aval) AS siniestralidadVehiculoPoliza
                                FROM Poliza po, Carta_Aval ca
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND ca.tipo_moneda_carta_aval='DÓLAR' AND
                                po.tipo_individual_poliza='AUTOMÓVIL' AND po.deshabilitar_poliza=0 AND ca.poliza_id=po.id_poliza AND
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
    getHealthAccidentSumPolicy: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(re.monto_reclamo_reembolso) AS siniestralidadSaludPoliza
                                FROM Poliza po, Reembolso re
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND re.tipo_moneda_reembolso='DÓLAR' AND 
                                po.tipo_individual_poliza='SALUD' AND po.deshabilitar_poliza=0 AND re.poliza_id=po.id_poliza  AND
                                re.deshabilitar_reembolso=0
                                UNION
                                SELECT SUM(amp.monto_reclamado_amp) AS siniestralidadSaludPoliza
                                FROM Poliza po, AMP amp
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND amp.tipo_moneda_amp='DÓLAR' AND
                                po.tipo_individual_poliza='SALUD' AND po.deshabilitar_poliza=0 AND amp.poliza_id=po.id_poliza AND
                                amp.deshabilitar_amp=0
                                UNION
                                SELECT SUM(em.monto_reclamado_emergencia) AS siniestralidadSaludPoliza
                                FROM Poliza po, Emergencia em
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND em.tipo_moneda_emergencia='DÓLAR' AND
                                po.tipo_individual_poliza='SALUD' AND po.deshabilitar_poliza=0 AND em.poliza_id=po.id_poliza AND
                                em.deshabilitar_emergencia=0
                                UNION
                                SELECT SUM(ca.monto_reclamado_carta_aval) AS siniestralidadSaludPoliza
                                FROM Poliza po, Carta_Aval ca
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND ca.tipo_moneda_carta_aval='DÓLAR' AND
                                po.tipo_individual_poliza='SALUD' AND po.deshabilitar_poliza=0 AND ca.poliza_id=po.id_poliza AND
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
    getPatrimonialAccidentSum: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(re.monto_reclamo_reembolso) AS siniestralidadPatrimonialPoliza
                                FROM Poliza po, Reembolso re
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND re.tipo_moneda_reembolso='DÓLAR' AND 
                                po.tipo_individual_poliza='PATRIMONIAL' AND po.deshabilitar_poliza=0 AND re.poliza_id=po.id_poliza AND
                                re.deshabilitar_reembolso=0
                                UNION
                                SELECT SUM(amp.monto_reclamado_amp) AS siniestralidadPatrimonialPoliza
                                FROM Poliza po, AMP amp
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND amp.tipo_moneda_amp='DÓLAR' AND
                                po.tipo_individual_poliza='PATRIMONIAL' AND po.deshabilitar_poliza=0 AND amp.poliza_id=po.id_poliza AND
                                amp.deshabilitar_amp=0
                                UNION
                                SELECT SUM(em.monto_reclamado_emergencia) AS siniestralidadPatrimonialPoliza
                                FROM Poliza po, Emergencia em
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND em.tipo_moneda_emergencia='DÓLAR' AND
                                po.tipo_individual_poliza='PATRIMONIAL' AND po.deshabilitar_poliza=0 AND em.poliza_id=po.id_poliza AND
                                em.deshabilitar_emergencia=0
                                UNION
                                SELECT SUM(ca.monto_reclamado_carta_aval) AS siniestralidadPatrimonialPoliza
                                FROM Poliza po, Carta_Aval ca
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND ca.tipo_moneda_carta_aval='DÓLAR' AND
                                po.tipo_individual_poliza='PATRIMONIAL' AND po.deshabilitar_poliza=0 AND ca.poliza_id=po.id_poliza AND
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
    getBailAccidentSum: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(re.monto_reclamo_reembolso) AS siniestralidadFianzaPoliza
                                FROM Poliza po, Reembolso re
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND re.tipo_moneda_reembolso='DÓLAR' AND 
                                po.tipo_individual_poliza='FIANZA' AND po.deshabilitar_poliza=0 AND re.poliza_id=po.id_poliza AND
                                re.deshabilitar_reembolso=0
                                UNION
                                SELECT SUM(amp.monto_reclamado_amp) AS siniestralidadFianzaPoliza
                                FROM Poliza po, AMP amp
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND amp.tipo_moneda_amp='DÓLAR' AND
                                po.tipo_individual_poliza='FIANZA' AND po.deshabilitar_poliza=0 AND amp.poliza_id=po.id_poliza AND
                                amp.deshabilitar_amp=0
                                UNION
                                SELECT SUM(em.monto_reclamado_emergencia) AS siniestralidadFianzaPoliza
                                FROM Poliza po, Emergencia em
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND em.tipo_moneda_emergencia='DÓLAR' AND
                                po.tipo_individual_poliza='FIANZA' AND po.deshabilitar_poliza=0 AND em.poliza_id=po.id_poliza AND
                                em.deshabilitar_emergencia=0
                                UNION
                                SELECT SUM(ca.monto_reclamado_carta_aval) AS siniestralidadFianzaPoliza
                                FROM Poliza po, Carta_Aval ca
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND ca.tipo_moneda_carta_aval='DÓLAR' AND
                                po.tipo_individual_poliza='FIANZA' AND po.deshabilitar_poliza=0 AND ca.poliza_id=po.id_poliza AND
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
    getChargedCounterPremium: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(fra.prima_neta_fraccionamiento) AS prima_cobrada_total
                                FROM Fraccionamiento fra, Poliza po, Recibo re
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND po.tipo_moneda_poliza='DÓLAR' AND 
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=0 AND fra.numero_fraccionamiento IS NOT NULL AND
                                po.id_poliza=re.poliza_id AND re.id_recibo=fra.recibo_id
                                UNION
                                SELECT SUM(fra.prima_neta_fraccionamiento) AS prima_cobrada_total
                                FROM Fraccionamiento fra, Colectivo co, Recibo re
                                WHERE DATE(co.fecha_desde_colectivo)  BETWEEN ? AND ? AND co.tipo_moneda_colectivo='DÓLAR' AND 
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=0 AND fra.numero_fraccionamiento IS NOT NULL AND
                                co.id_colectivo=re.colectivo_id AND re.id_recibo=fra.recibo_id`, 
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
    getPremiumReturnedCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(fra.prima_neta_fraccionamiento) AS prima_devuelta_total
                                FROM Fraccionamiento fra, Poliza po, Recibo re
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND po.tipo_moneda_poliza='DÓLAR' AND 
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=0 AND fra.numero_fraccionamiento IS NULL AND
                                po.id_poliza=re.poliza_id AND re.id_recibo=fra.recibo_id
                                UNION
                                SELECT SUM(fra.prima_neta_fraccionamiento) AS prima_devuelta_total
                                FROM Fraccionamiento fra, Colectivo co, Recibo re
                                WHERE DATE(co.fecha_desde_colectivo)  BETWEEN ? AND ? AND co.tipo_moneda_colectivo='DÓLAR' AND 
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=0 AND fra.numero_fraccionamiento IS NULL AND
                                co.id_colectivo=re.colectivo_id AND re.id_recibo=fra.recibo_id`, 
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
    getPremiumCollectedNetCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(fra.prima_neta_fraccionamiento) AS prima_cobrada_neta_total
                                FROM Fraccionamiento fra, Poliza po, Recibo re
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND po.tipo_moneda_poliza='DÓLAR' AND 
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=1 AND
                                po.id_poliza=re.poliza_id AND re.id_recibo=fra.recibo_id
                                UNION
                                SELECT SUM(fra.prima_neta_fraccionamiento) AS prima_cobrada_neta_total
                                FROM Fraccionamiento fra, Colectivo co, Recibo re
                                WHERE DATE(co.fecha_desde_colectivo)  BETWEEN ? AND ? AND co.tipo_moneda_colectivo='DÓLAR' AND 
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=1 AND
                                co.id_colectivo=re.colectivo_id AND re.id_recibo=fra.recibo_id`, 
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
    getPremiumCollectedNetVehicleCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(fra.prima_neta_fraccionamiento) AS prima_cobrada_neta_vehiculo
                                FROM Fraccionamiento fra, Poliza po, Recibo re
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND po.tipo_moneda_poliza='DÓLAR' AND 
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=1 AND
                                po.tipo_individual_poliza='AUTOMÓVIL' AND po.id_poliza=re.poliza_id AND re.id_recibo=fra.recibo_id
                                UNION
                                SELECT SUM(fra.prima_neta_fraccionamiento) AS prima_cobrada_neta_vehiculo
                                FROM Fraccionamiento fra, Colectivo co, Recibo re
                                WHERE DATE(co.fecha_desde_colectivo)  BETWEEN ? AND ? AND co.tipo_moneda_colectivo='DÓLAR' AND 
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=1 AND
                                co.tipo_colectivo='AUTOMÓVIL' AND co.id_colectivo=re.colectivo_id AND re.id_recibo=fra.recibo_id`, 
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
    getPremiumCollectedNetHealthCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(fra.prima_neta_fraccionamiento) AS prima_cobrada_neta_salud
                                FROM Fraccionamiento fra, Poliza po, Recibo re
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND po.tipo_moneda_poliza='DÓLAR' AND 
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=1 AND
                                po.tipo_individual_poliza='SALUD' AND po.id_poliza=re.poliza_id AND re.id_recibo=fra.recibo_id
                                UNION
                                SELECT SUM(fra.prima_neta_fraccionamiento) AS prima_cobrada_neta_salud
                                FROM Fraccionamiento fra, Colectivo co, Recibo re
                                WHERE DATE(co.fecha_desde_colectivo)  BETWEEN ? AND ? AND co.tipo_moneda_colectivo='DÓLAR' AND 
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=1 AND
                                co.tipo_colectivo='SALUD' AND co.id_colectivo=re.colectivo_id AND re.id_recibo=fra.recibo_id`, 
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
    getPremiumCollectedNetPatrimonialCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(fra.prima_neta_fraccionamiento) AS prima_cobrada_neta_patrimonial
                                FROM Fraccionamiento fra, Poliza po, Recibo re
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND po.tipo_moneda_poliza='DÓLAR' AND 
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=1 AND
                                po.tipo_individual_poliza='PATRIMONIAL' AND po.id_poliza=re.poliza_id AND re.id_recibo=fra.recibo_id`,
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
    getPremiumCollectedNetBailCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT SUM(fra.prima_neta_fraccionamiento) AS prima_cobrada_neta_fianza
                                FROM Fraccionamiento fra, Poliza po, Recibo re
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND po.tipo_moneda_poliza='DÓLAR' AND 
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=1 AND
                                po.tipo_individual_poliza='FIANZA' AND po.id_poliza=re.poliza_id AND re.id_recibo=fra.recibo_id`,
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
    getNonRenewedVehiclePolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(po.id_poliza) as poliza_no_renovada_auto
                                FROM Poliza po, Recibo re, Fraccionamiento fra
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND po.tipo_moneda_poliza='DÓLAR' AND po.tipo_individual_poliza='AUTOMÓVIL' AND
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=0 AND po.id_poliza=re.poliza_id AND re.id_recibo=fra.recibo_id
                                UNION ALL
                                SELECT COUNT(co.id_colectivo) as poliza_no_renovada_auto
                                FROM Colectivo co, Recibo re, Fraccionamiento fra
                                WHERE DATE(co.fecha_desde_colectivo) BETWEEN ? AND ? AND co.tipo_moneda_colectivo='DÓLAR' AND co.tipo_colectivo='AUTOMÓVIL' AND
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=0 AND co.id_colectivo=re.colectivo_id AND re.id_recibo=fra.recibo_id`, 
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
    getNonRenewedHealthPolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(po.id_poliza) as poliza_no_renovada_salud
                                FROM Poliza po, Recibo re, Fraccionamiento fra
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND po.tipo_moneda_poliza='DÓLAR' AND po.tipo_individual_poliza='SALUD' AND
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=0 AND po.id_poliza=re.poliza_id AND re.id_recibo=fra.recibo_id
                                UNION ALL
                                SELECT COUNT(co.id_colectivo) as poliza_no_renovada_salud
                                FROM Colectivo co, Recibo re, Fraccionamiento fra
                                WHERE DATE(co.fecha_desde_colectivo) BETWEEN ? AND ? AND co.tipo_moneda_colectivo='DÓLAR' AND co.tipo_colectivo='SALUD' AND
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=0 AND co.id_colectivo=re.colectivo_id AND re.id_recibo=fra.recibo_id`,
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
    getNonRenewedPatrimonialPolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(po.id_poliza) as poliza_no_renovada_patrimonial
                                FROM Poliza po, Recibo re, Fraccionamiento fra
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND po.tipo_moneda_poliza='DÓLAR' AND po.tipo_individual_poliza='PATRIMONIAL' AND
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=0 AND po.id_poliza=re.poliza_id AND re.id_recibo=fra.recibo_id`,
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
    getRenewedVehiclePolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(po.id_poliza) as poliza_renovada_auto
                                FROM Poliza po, Recibo re, Fraccionamiento fra
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND po.tipo_moneda_poliza='DÓLAR' AND po.tipo_individual_poliza='AUTOMÓVIL' AND
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=1 AND po.id_poliza=re.poliza_id AND re.id_recibo=fra.recibo_id
                                UNION ALL
                                SELECT COUNT(co.id_colectivo) as poliza_renovada_auto
                                FROM Colectivo co, Recibo re, Fraccionamiento fra
                                WHERE DATE(co.fecha_desde_colectivo) BETWEEN ? AND ? AND co.tipo_moneda_colectivo='DÓLAR' AND co.tipo_colectivo='AUTOMÓVIL' AND
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=1 AND co.id_colectivo=re.colectivo_id AND re.id_recibo=fra.recibo_id`,
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
    getRenewedHealthPolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(po.id_poliza) as poliza_renovada_salud
                                FROM Poliza po, Recibo re, Fraccionamiento fra
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND po.tipo_moneda_poliza='DÓLAR' AND po.tipo_individual_poliza='SALUD' AND
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=1 AND po.id_poliza=re.poliza_id AND re.id_recibo=fra.recibo_id
                                UNION ALL
                                SELECT COUNT(co.id_colectivo) as poliza_renovada_salud
                                FROM Colectivo co, Recibo re, Fraccionamiento fra
                                WHERE DATE(co.fecha_desde_colectivo) BETWEEN ? AND ? AND co.tipo_moneda_colectivo='DÓLAR' AND co.tipo_colectivo='SALUD' AND
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=1 AND co.id_colectivo=re.colectivo_id AND re.id_recibo=fra.recibo_id`,
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
    getRenewedPatrimonialPolicyCounter: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(po.id_poliza) as poliza_renovada_patrimonial
                                FROM Poliza po, Recibo re, Fraccionamiento fra
                                WHERE DATE(po.fecha_desde_poliza) BETWEEN ? AND ? AND po.tipo_moneda_poliza='DÓLAR' AND po.tipo_individual_poliza='PATRIMONIAL' AND
                                fra.deshabilitar_fraccionamiento=0 AND fra.recibo_distribuicion_fraccionamiento=1 AND po.id_poliza=re.poliza_id AND re.id_recibo=fra.recibo_id`,
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
    getSumPremiumCounter: (policyType, coinType) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT COUNT(id_poliza) AS poliza_contador_tipo, SUM(prima_neta_poliza) AS prima_total
                                FROM Poliza
                                WHERE tipo_individual_poliza=? AND tipo_moneda_poliza=? AND deshabilitar_poliza=0`,
                [policyType, coinType],
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