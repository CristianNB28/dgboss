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
    postExecutiveForm: (executive) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Ejecutivo (cedula_ejecutivo, nombre_ejecutivo, apellido_ejecutivo, celular_ejecutivo, correo_ejecutivo, direccion_ejecutivo, tipo_ejecutivo)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`, 
            [executive.cedula_ejecutivo, executive.nombre_ejecutivo, executive.apellido_ejecutivo, executive.celular_ejecutivo, executive.correo_ejecutivo, executive.direccion_ejecutivo, executive.tipo_ejecutivo], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateExecutive: (executive) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Ejecutivo 
                    SET cedula_ejecutivo=?, nombre_ejecutivo=?, apellido_ejecutivo=?, celular_ejecutivo=?, correo_ejecutivo=?, direccion_ejecutivo=?, tipo_ejecutivo=?       
                    WHERE id_ejecutivo=?`, 
            [executive.cedula_ejecutivo, executive.nombre_ejecutivo, executive.apellido_ejecutivo, executive.celular_ejecutivo, executive.correo_ejecutivo, executive.direccion_ejecutivo, executive.tipo_ejecutivo, executive.id_ejecutivo], 
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