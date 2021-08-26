const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getInsureds: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_asegurado, cedula_asegurado, rif_asegurado, nombre_asegurado, telefono_asegurado, correo_asegurado FROM Asegurado WHERE deshabilitar_asegurado=0', 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getInsured: (idInsured) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_asegurado, cedula_asegurado, rif_asegurado, nombre_asegurado, telefono_asegurado, correo_asegurado FROM Asegurado WHERE id_asegurado=?',
            [idInsured],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postInsuredForm: (insured, idEmpresa) => {
        if ((insured.id_rif_asegurado.startsWith('J')) || (insured.id_rif_asegurado.startsWith('V')) || (insured.id_rif_asegurado.startsWith('G'))) {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Asegurado (rif_asegurado, nombre_asegurado, telefono_asegurado, correo_asegurado, empresa_id)
                        VALUES (?, ?, ?, ?, ?)`, [insured.id_rif_asegurado, insured.nombre_asegurado, insured.telefono_asegurado, insured.correo_asegurado, idEmpresa], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Asegurado (cedula_asegurado, nombre_asegurado, telefono_asegurado, correo_asegurado, empresa_id)
                        VALUES (?, ?, ?, ?, ?)`, [insured.id_rif_asegurado, insured.nombre_asegurado, insured.telefono_asegurado, insured.correo_asegurado, idEmpresa], 
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
    updateInsured: (cedulaAsegurado, rifAsegurado, insured) => {
        if (cedulaAsegurado === '') {
            return new Promise((resolve, reject) => {
                db.query(`UPDATE Asegurado SET cedula_asegurado=?, rif_asegurado=?, nombre_asegurado=?, telefono_asegurado=?, correo_asegurado=? WHERE id_asegurado=?`, 
                [cedulaAsegurado, rifAsegurado, insured.nombre_asegurado, insured.telefono_asegurado, insured.correo_asegurado, insured.id_asegurado], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`UPDATE Asegurado SET cedula_asegurado=?, rif_asegurado=?, nombre_asegurado=?, telefono_asegurado=?, correo_asegurado=? WHERE id_asegurado=?`, 
                [cedulaAsegurado, rifAsegurado, insured.nombre_asegurado, insured.telefono_asegurado, insured.correo_asegurado, insured.id_asegurado], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        }
    },
/*               DELETE                  */
    disableInsured: (id, disableInsured) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Asegurado SET deshabilitar_asegurado=? WHERE id_asegurado=?`, [disableInsured, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}