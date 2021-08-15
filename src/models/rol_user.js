const db = require('../../config/database');

module.exports = {
/*                  GET                  */
/*                  POST                 */
    postRolUserForm: async (userId, rol) => {
        let rolId = await new Promise((resolve, reject) => {
            db.query('SELECT id_rol FROM Rol WHERE nombre_rol = ?', [rol], (error, rows) => {
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
    }
}