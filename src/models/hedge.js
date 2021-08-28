const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getHedges: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_cobertura, descripcion_cobertura FROM Cobertura WHERE deshabilitar_cobertura=0', 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getHedge: (idHedge) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_cobertura, descripcion_cobertura FROM Cobertura WHERE id_cobertura=?', [idHedge],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postHedgeForm: (hedge) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Cobertura (descripcion_cobertura)
                    VALUES (?)`, [hedge.descripcion_cobertura], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateHedge: (hedge) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Cobertura SET descripcion_cobertura=? WHERE id_cobertura=?`, 
            [hedge.descripcion_cobertura, hedge.id_cobertura], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableHedge: (id, disableHedge) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Cobertura SET deshabilitar_cobertura=? WHERE id_cobertura=?`, [disableHedge, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}