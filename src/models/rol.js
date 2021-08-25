const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getRoles: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_rol, nombre_rol, descripcion_rol FROM Rol WHERE deshabilitar_rol=0', (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getRol: (idRol) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Rol WHERE id_rol = ?', [idRol],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postRolForm: (rol) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Rol (nombre_rol, descripcion_rol)
                    VALUES (?, ?)`, [rol.nombre_rol, rol.descripcion_rol], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateRol: (rol) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Rol SET nombre_rol=?, descripcion_rol=? WHERE id_rol=?`, [rol.nombre_rol, rol.descripcion_rol, rol.id_rol], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableRol: (id, disableRol) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Rol SET deshabilitar_rol=? WHERE id_rol=?`, [disableRol, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}
