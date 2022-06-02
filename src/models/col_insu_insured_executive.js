const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getColInsuInsuredExecutive: (caaId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Col_Aseg_Asegurado_Ejecu 
                                WHERE caa_id=? AND deshabilitar_caae=0`, 
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
/*                  POST                 */
    postColInsuInsuredExecutive: async (caaId, executiveId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Col_Aseg_Asegurado_Ejecu (caa_id, ejecutivo_id) 
                                VALUES (?, ?)`, 
                [caaId, executiveId],
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
    updateColInsuInsuredExecutive: async (caaeId, executiveId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Col_Aseg_Asegurado_Ejecu 
                                SET ejecutivo_id=? 
                                WHERE id_caae=?`, 
                [executiveId, caaeId],
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
    disableColInsuInsuredExecutive: (id, disableCIIE) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Col_Aseg_Asegurado_Ejecu 
                                SET deshabilitar_caae=? 
                                WHERE id_caae=?`, 
                [disableCIIE, id],
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