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
    getExecutiveId: (nombreEjecutivo, apellidoEjecutivo) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_ejecutivo FROM Ejecutivo WHERE nombre_ejecutivo=? AND apellido_ejecutivo=?', 
            [nombreEjecutivo, apellidoEjecutivo],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postExecutiveForm: (nombreEjecutivo, apellidoEjecutivo, executive) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Ejecutivo (cedula_ejecutivo, nombre_ejecutivo, apellido_ejecutivo, celular_ejecutivo, correo_ejecutivo, direccion_ejecutivo, tipo_ejecutivo)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`, 
            [executive.cedula_ejecutivo, nombreEjecutivo, apellidoEjecutivo, executive.celular_ejecutivo, executive.correo_ejecutivo, executive.direccion_ejecutivo, executive.tipo_ejecutivo], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateExecutive: (nombreEjecutivo, apellidoEjecutivo, executive) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Ejecutivo 
                    SET cedula_ejecutivo=?, nombre_ejecutivo=?, apellido_ejecutivo=?, celular_ejecutivo=?, correo_ejecutivo=?, direccion_ejecutivo=?, tipo_ejecutivo=?       
                    WHERE id_ejecutivo=?`, 
            [executive.cedula_ejecutivo, nombreEjecutivo, apellidoEjecutivo, executive.celular_ejecutivo, executive.correo_ejecutivo, executive.direccion_ejecutivo, executive.tipo_ejecutivo, executive.id_ejecutivo], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateDisableExecutive: (id, executive) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Ejecutivo 
                    SET obser_deshabilitar_ejecutivo=?       
                    WHERE id_ejecutivo=?`, 
            [executive.obser_deshabilitar_ejecutivo, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
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