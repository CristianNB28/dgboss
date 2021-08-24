const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getRolUser: (idUser) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT rol_id FROM Usuario_Rol WHERE usuario_id=?', [idUser],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postRolUserForm: async (userId, rol) => {
        let rolId = await new Promise((resolve, reject) => {
            db.query('SELECT id_rol FROM Rol WHERE nombre_rol=?', [rol], (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Usuario_Rol (usuario_id, rol_id) VALUES (?, ?)', [userId, rolId[0].id_rol], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateRolUser: async (userId, rolName) => {
        let rolId = await new Promise((resolve, reject) => {
            db.query('SELECT id_rol FROM Rol WHERE nombre_rol=?', [rolName], (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Usuario_Rol SET rol_id=? WHERE usuario_id=?`, [rolId[0].id_rol, userId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    deleteRolUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM Usuario_Rol WHERE usuario_id=?`, [userId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}