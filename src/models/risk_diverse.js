const db = require('../../config/database');

module.exports = {
/*                  GET                  */
/*                  POST                 */
    postRiskDiverseForm: async (fileNomRazon, fileAddress, filePhone, fileSumInsured, cedulaArchivo, rifArchivo, movementType, riskDiverse) => {
        if (rifArchivo === '') {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Riesgo_Diverso (nom_razon_riesgo_diverso, cedula_riesgo_diverso, direccion_riesgo_diverso, telefono_riesgo_diverso, correo_riesgo_diverso, suma_asegurada_riesgo_diverso, modelo_riesgo_diverso, serial_riesgo_diverso, tipo_movimiento_riesgo_diverso)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [fileNomRazon, cedulaArchivo, fileAddress, filePhone, riskDiverse.Correo, fileSumInsured, riskDiverse.Modelo, riskDiverse.Serial, movementType.tipo_movimiento_riesgo_diverso], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Riesgo_Diverso (nom_razon_riesgo_diverso, rif_riesgo_diverso, direccion_riesgo_diverso, telefono_riesgo_diverso, correo_riesgo_diverso, suma_asegurada_riesgo_diverso, modelo_riesgo_diverso, serial_riesgo_diverso, tipo_movimiento_riesgo_diverso)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [fileNomRazon, rifArchivo, fileAddress, filePhone, riskDiverse.Correo, fileSumInsured, riskDiverse.Modelo, riskDiverse.Serial, movementType.tipo_movimiento_riesgo_diverso], 
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
/*               DELETE                  */
}