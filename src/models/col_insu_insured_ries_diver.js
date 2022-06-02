const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getColInsuInsuredRiesDiver: (caaId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Col_Aseg_Asegurado_Ries_Diver 
                                WHERE caa_id=? AND deshabilitar_caard=0`, 
                [caaId],
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
    getColInsuInsuredRiesDiverId: (riskDiverseId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Col_Aseg_Asegurado_Ries_Diver 
                                WHERE riesgo_diverso_id=? AND deshabilitar_caard=0`, 
                [riskDiverseId],
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
    postColInsuInsuredRiesDiver: async (caaId, riskDiverseId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Col_Aseg_Asegurado_Ries_Diver (caa_id, riesgo_diverso_id) 
                                VALUES ?`, 
                [caaId, riskDiverseId],
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
/*               DELETE                  */
    disableColInsuInsuredRiesDiver: (id, disableCIIRD) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Col_Aseg_Asegurado_Ries_Diver 
                                SET deshabilitar_caard=? 
                                WHERE id_caard=?`, 
                [disableCIIRD, id],
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
    disableColInsuInsuredRiesDiverId: (idRiskDiverse, disableCIIRD) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Col_Aseg_Asegurado_Ries_Diver 
                                SET deshabilitar_caard=? 
                                WHERE riesgo_diverso_id=?`, 
                [disableCIIRD, idRiskDiverse],
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