const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getInsurers: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_aseguradora, rif_aseguradora, nombre_aseguradora, telefono_aseguradora, direccion_aseguradora FROM Aseguradora WHERE deshabilitar_aseguradora=0', 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getInsurer: (idInsurer) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_aseguradora, rif_aseguradora, nombre_aseguradora, telefono_aseguradora, direccion_aseguradora FROM Aseguradora WHERE id_aseguradora = ?', 
            [idInsurer],
            (error, rows) => {
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
                    VALUES (?, ?, ?, ?, ?)`, [insurer.rif_aseguradora, insurer.nombre_aseguradora, insurer.telefono_aseguradora, insurer.direccion_aseguradora, idEmpresa], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateInsurer: (insurer) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Aseguradora SET rif_aseguradora=?, nombre_aseguradora=?, direccion_aseguradora=?, telefono_aseguradora=? WHERE id_aseguradora=?`, 
            [insurer.rif_aseguradora, insurer.nombre_aseguradora, insurer.direccion_aseguradora, insurer.telefono_aseguradora, insurer.id_aseguradora], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableInsurer: (id, disableInsurer) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Aseguradora SET deshabilitar_aseguradora=? WHERE id_aseguradora=?`, [disableInsurer, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}