const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getColInsuInsuredBenef: (caaId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Col_Aseg_Asegurado_Benef 
                                WHERE caa_id=? AND deshabilitar_caab=0`, 
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
    getColInsuInsuredBenefs: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Col_Aseg_Asegurado_Benef 
                                WHERE deshabilitar_caab=0`,
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
    getColInsuInsuredBenefId: (beneficiaryId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_caab, caa_id 
                                FROM Col_Aseg_Asegurado_Benef 
                                WHERE beneficiario_id=? AND deshabilitar_caab=0`, 
                [beneficiaryId],
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
    postColInsuInsuredBenef: async (temparrayBeneficiary) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Col_Aseg_Asegurado_Benef (caa_id, beneficiario_id) 
                                VALUES ?`, 
                [temparrayBeneficiary],
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
    disableColInsuInsuredBenef: (id, disableCIIB) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Col_Aseg_Asegurado_Benef SET deshabilitar_caab=? WHERE id_caab=?`, 
                [disableCIIB, id],
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
    disableColInsuInsuredBenefId: (idBeneficiary, disableCIIB) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Col_Aseg_Asegurado_Benef 
                                SET deshabilitar_caab=? 
                                WHERE beneficiario_id=?`, 
                [disableCIIB, idBeneficiary],
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