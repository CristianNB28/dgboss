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
            db.query(`SELECT id_poliza, numero_poliza, tipo_individual_poliza, nombre_tomador_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_anual_poliza, estatus_poliza 
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
            db.query(`SELECT id_poliza, prima_anual_poliza, tipo_moneda_poliza 
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
/*                  POST                 */
    postVehiclePolicyForm: (tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, nombre_tomador_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, tasa_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza, tipo_producto_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.nombre_tomador_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza, policy.tipo_producto_poliza],                          
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
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, nombre_tomador_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_anual_poliza, estatus_poliza, tipo_cobertura_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza, maternidad_poliza, plazo_espera_poliza, detalle_cliente_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.nombre_tomador_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaAnual, estatusPoliza, cobertura, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza, policy.maternidad_poliza, policy.plazo_espera_poliza, fechaDetalleCliente],                          
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
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, nombre_tomador_poliza, tipo_ramo_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, tasa_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.nombre_tomador_poliza, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza],                          
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
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, nombre_tomador_poliza, tipo_ramo_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, tasa_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.nombre_tomador_poliza, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza],                          
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
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, nombre_tomador_poliza, tipo_ramo_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, tasa_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.nombre_tomador_poliza, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, policy.tasa_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza],                          
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
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, nombre_tomador_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.nombre_tomador_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza],                          
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
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, nombre_tomador_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.nombre_tomador_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza],                          
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
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, nombre_tomador_poliza, tipo_ramo_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.nombre_tomador_poliza, policy.tipo_ramo_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza],                          
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
            db.query(`INSERT INTO Poliza (numero_poliza, tomador_asegurado_poliza, nombre_tomador_poliza, tipo_individual_poliza, fecha_desde_poliza, fecha_hasta_poliza, tipo_moneda_poliza, prima_anual_poliza, estatus_poliza, tipo_canal_poliza, suma_asegurada_poliza, deducible_poliza, grupo_poliza)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [policy.numero_poliza, tomadorAsegurado, policy.nombre_tomador_poliza, tipoIndividualPoliza, fechaPolizaDesde, fechaPolizaHasta, policy.tipo_moneda_poliza, montoPrimaAnual, estatusPoliza, policy.tipo_canal_poliza, sumaAsegurada, deducible, policy.grupo_poliza],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updatePolicy: (fechaDesdePoliza, fechaHastaPoliza, montoPrimaAnual, policy) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza 
                    SET numero_poliza=?, nombre_tomador_poliza=?, tipo_individual_poliza=?, fecha_desde_poliza=?, fecha_hasta_poliza=?, tipo_moneda_poliza=?, prima_anual_poliza=?, estatus_poliza=? 
                    WHERE id_poliza=?`, 
            [policy.numero_poliza, policy.nombre_tomador_poliza, policy.tipo_individual_poliza, fechaDesdePoliza, fechaHastaPoliza, policy.tipo_moneda_poliza, montoPrimaAnual, policy.estatus_poliza, policy.id_poliza], 
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