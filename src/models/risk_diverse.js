const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getRiskDiverse: (riskDiverseId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * 
                    FROM Riesgo_Diverso 
                    WHERE id_riesgo_diverso=? AND deshabilitar_riesgo_diverso=0`,
            [riskDiverseId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postRiskDiverseForm: async (fileNumCerti, fileNomRazon, fileAddress, filePhone, fileSumInsured, cedulaArchivo, rifArchivo, movementType, riskDiverse) => {
        if (rifArchivo === '') {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Riesgo_Diverso (numero_certificado_riesgo_diverso, nom_razon_riesgo_diverso, cedula_riesgo_diverso, direccion_riesgo_diverso, telefono_riesgo_diverso, correo_riesgo_diverso, suma_asegurada_riesgo_diverso, modelo_riesgo_diverso, serial_riesgo_diverso, tipo_movimiento_riesgo_diverso)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [fileNumCerti, fileNomRazon, cedulaArchivo, fileAddress, filePhone, riskDiverse.Correo, fileSumInsured, riskDiverse.Modelo, riskDiverse.Serial, movementType.tipo_movimiento_riesgo_diverso], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Riesgo_Diverso (numero_certificado_riesgo_diverso, nom_razon_riesgo_diverso, rif_riesgo_diverso, direccion_riesgo_diverso, telefono_riesgo_diverso, correo_riesgo_diverso, suma_asegurada_riesgo_diverso, modelo_riesgo_diverso, serial_riesgo_diverso, tipo_movimiento_riesgo_diverso)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [fileNumCerti, fileNomRazon, rifArchivo, fileAddress, filePhone, riskDiverse.Correo, fileSumInsured, riskDiverse.Modelo, riskDiverse.Serial, movementType.tipo_movimiento_riesgo_diverso], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        }
    },
/*                  PUT                  */
    updateRiskDiverse: (sumaAsegurada, riskDiverse) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Riesgo_Diverso 
                    SET nom_razon_riesgo_diverso=?, cedula_riesgo_diverso=?, rif_riesgo_diverso=?, direccion_riesgo_diverso=?, telefono_riesgo_diverso=?, correo_riesgo_diverso=?, suma_asegurada_riesgo_diverso=?, modelo_riesgo_diverso=?, serial_riesgo_diverso=?, tipo_movimiento_riesgo_diverso=?    
                    WHERE id_riesgo_diverso=?`, 
            [riskDiverse.nom_razon_riesgo_diverso, riskDiverse.cedula_riesgo_diverso, riskDiverse.rif_riesgo_diverso, riskDiverse.direccion_riesgo_diverso, riskDiverse.telefono_riesgo_diverso, riskDiverse.correo_riesgo_diverso, sumaAsegurada, riskDiverse.modelo_riesgo_diverso, riskDiverse.serial_riesgo_diverso, riskDiverse.tipo_movimiento_riesgo_diverso, riskDiverse.id_riesgo_diverso], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateDisableRiskDiverse: (id, riskDiverse) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Riesgo_Diverso SET obser_deshabilitar_riesgo_diverso=? WHERE id_riesgo_diverso=?`, 
            [riskDiverse.obser_deshabilitar_riesgo_diverso, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableRiskDiverse: (id, disableRiskDiverse) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Riesgo_Diverso SET deshabilitar_riesgo_diverso=? WHERE id_riesgo_diverso=?`, 
            [disableRiskDiverse, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}