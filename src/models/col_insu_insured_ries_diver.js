const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getColInsuInsuredRiesDiver: (caaId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * 
                    FROM Col_Aseg_Asegurado_Ries_Diver 
                    WHERE caa_id=? AND deshabilitar_caard=0`, 
            [caaId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getColInsuInsuredRiesDiverId: (riskDiverseId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * 
                    FROM Col_Aseg_Asegurado_Ries_Diver 
                    WHERE riesgo_diverso_id=? AND deshabilitar_caard=0`, 
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
    postColInsuInsuredRiesDiver: async (caaId, riskDiverseId) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Col_Aseg_Asegurado_Ries_Diver (caa_id, riesgo_diverso_id) 
                    VALUES ?`, 
            [caaId, riskDiverseId], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
/*               DELETE                  */
    disableColInsuInsuredRiesDiver: (id, disableCIIRD) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Col_Aseg_Asegurado_Ries_Diver SET deshabilitar_caard=? WHERE id_caard=?`, 
            [disableCIIRD, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    disableColInsuInsuredRiesDiverId: (idRiskDiverse, disableCIIRD) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Col_Aseg_Asegurado_Ries_Diver SET deshabilitar_caard=? WHERE riesgo_diverso_id=?`, 
            [disableCIIRD, idRiskDiverse], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}