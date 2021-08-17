const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getRol: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT nombre_rol, descripcion_rol FROM Rol', (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}
