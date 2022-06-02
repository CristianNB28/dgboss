const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getPolInsuInsuredBenefs: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Pol_Aseg_Asegurado_Benef 
                                WHERE deshabilitar_paab=0`,
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
    getPolInsuInsuredBenef: (paaId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Pol_Aseg_Asegurado_Benef 
                                WHERE paa_id=? AND deshabilitar_paab=0`, 
                [paaId],
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
    getPolInsuInsuredBenefId: (beneficiaryId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_paab, paa_id
                                FROM Pol_Aseg_Asegurado_Benef 
                                WHERE beneficiario_id=? AND deshabilitar_paab=0`, 
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
    postPolInsuInsuredBenef: async (paaId, BeneficiaryId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Pol_Aseg_Asegurado_Benef (paa_id, beneficiario_id) 
                                VALUES (?, ?)`, 
                [paaId, BeneficiaryId],
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
    disablePolInsuInsuredBenef: (id, disablePIIB) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Pol_Aseg_Asegurado_Benef 
                                SET deshabilitar_paab=? 
                                WHERE id_paab=?`, 
                [disablePIIB, id],
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
    disablePolInsuInsuredBenefId: (idBeneficiary, disablePIIB) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Pol_Aseg_Asegurado_Benef 
                                SET deshabilitar_paab=? 
                                WHERE beneficiario_id=?`, 
                [disablePIIB, idBeneficiary],
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