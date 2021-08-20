const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getInsurers: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT rif_aseguradora, nombre_aseguradora, telefono_aseguradora, direccion_aseguradora FROM Aseguradora', (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postInsurerForm: (insurer, idEmpresa) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Aseguradora (rif_aseguradora, nombre_aseguradora, telefono_aseguradora, direccion_aseguradora, empresa_id)
                    VALUES (?, ?, ?, ?, ?)`, [insurer.rif_aseguradora, insurer.nombre_aseguradora, insurer.telefono_aseguradora, insurer.direccion_usuario, idEmpresa], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}