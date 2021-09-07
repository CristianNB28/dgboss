const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getExecutives: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Ejecutivo WHERE deshabilitar_ejecutivo=0', 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getExecutive: (idExecutive) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Ejecutivo WHERE id_ejecutivo=?', 
            [idExecutive],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postExecutiveForm: (cedulaEjecutivo, rifEjecutivo, executive) => {
        if (cedulaEjecutivo === '') {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Ejecutivo (cedula_ejecutivo, rif_ejecutivo, nombre_ejecutivo, apellido_ejecutivo, celular_ejecutivo, correo_ejecutivo)
                        VALUES (?, ?, ?, ?, ?, ?)`, 
                [cedulaEjecutivo, rifEjecutivo, executive.nombre_ejecutivo, executive.apellido_ejecutivo, executive.celular_ejecutivo, executive.correo_ejecutivo], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Ejecutivo (cedula_ejecutivo, rif_ejecutivo, nombre_ejecutivo, apellido_ejecutivo, celular_ejecutivo, correo_ejecutivo)
                        VALUES (?, ?, ?, ?, ?, ?)`, 
                [cedulaEjecutivo, rifEjecutivo, executive.nombre_ejecutivo, executive.apellido_ejecutivo, executive.celular_ejecutivo, executive.correo_ejecutivo], 
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
    updateExecutive: (cedulaEjecutivo, rifEjecutivo, executive) => {
        if (cedulaEjecutivo === '') {
            return new Promise((resolve, reject) => {
                db.query(`UPDATE Ejecutivo 
                        SET cedula_ejecutivo=?, rif_ejecutivo=?, nombre_ejecutivo=?, apellido_ejecutivo=?, celular_ejecutivo=?, correo_ejecutivo=?       
                        WHERE id_ejecutivo=?`, 
                [cedulaEjecutivo, rifEjecutivo, executive.nombre_ejecutivo, executive.apellido_ejecutivo, executive.celular_ejecutivo, executive.correo_ejecutivo, executive.id_ejecutivo], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`UPDATE Ejecutivo 
                        SET cedula_ejecutivo=?, rif_ejecutivo=?, nombre_ejecutivo=?, apellido_ejecutivo=?, celular_ejecutivo=?, correo_ejecutivo=?       
                        WHERE id_ejecutivo=?`, 
                [cedulaEjecutivo, rifEjecutivo, executive.nombre_ejecutivo, executive.apellido_ejecutivo, executive.celular_ejecutivo, executive.correo_ejecutivo, executive.id_ejecutivo], 
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
    disableExecutive: (id, disableExecutive) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Ejecutivo SET deshabilitar_ejecutivo=? WHERE id_ejecutivo=?`, [disableExecutive, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}