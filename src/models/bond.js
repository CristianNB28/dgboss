const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getBonds: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_bono, tipo_bono, descripcion_bono FROM Bono WHERE deshabilitar_bono=0', (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getBond: (idBond) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_bono, tipo_bono, descripcion_bono FROM Bono WHERE id_bono=?', [idBond],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postBondForm: (bond) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Bono (tipo_bono, descripcion_bono)
                    VALUES (?, ?)`, [bond.tipo_bono, bond.descripcion_bono], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateBond: (bond) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Bono SET tipo_bono=?, descripcion_bono=? WHERE id_bono=?`, 
            [bond.tipo_bono, bond.descripcion_bono, bond.id_bono], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableBond: (id, disableBond) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Bono SET deshabilitar_bono=? WHERE id_bono=?`, [disableBond, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}