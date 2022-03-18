const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getReceiptInsured: (receiptId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Recibo_Asegurado 
                    WHERE recibo_id=? AND desahabilitar_recibo_asegurado=0`,
            [receiptId],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getReceiptInsuredId: (receiptId, naturalInsuredId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_recibo_asegurado
                    FROM Recibo_Asegurado 
                    WHERE recibo_id=? AND asegurado_per_nat_id=? AND desahabilitar_recibo_asegurado=0`,
            [receiptId, naturalInsuredId],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postReceiptNaturalInsured: (naturalInsuredId, receiptId) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Recibo_Asegurado (recibo_id, asegurado_per_nat_id) 
                    VALUES (?, ?)`, [receiptId, naturalInsuredId], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    postReceiptLegalInsured: (legalInsuredId, receiptId) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Recibo_Asegurado (recibo_id, asegurado_per_jur_id) 
                    VALUES (?, ?)`, [receiptId, legalInsuredId], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateReceiptNaturalInsured: (legalInsuredId, naturalInsuredId, receiptId) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Recibo_Asegurado 
                    SET asegurado_per_nat_id=?, asegurado_per_jur_id=? 
                    WHERE recibo_id=?`, 
            [naturalInsuredId, legalInsuredId, receiptId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateReceiptLegalInsured: (naturalInsuredId, legalInsuredId, receiptId) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Recibo_Asegurado 
                    SET asegurado_per_nat_id=?, asegurado_per_jur_id=? 
                    WHERE recibo_id=?`, 
            [naturalInsuredId, legalInsuredId, receiptId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateReceiptInsured: (id, legalInsuredId, naturalInsuredId, receiptId) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Recibo_Asegurado 
                    SET recibo_id=?, asegurado_per_nat_id=?, asegurado_per_jur_id=? 
                    WHERE id_recibo_asegurado=?`, 
            [receiptId, naturalInsuredId, legalInsuredId, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableReceiptInsured: (idReceipt, disableReciboAsegurado) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Recibo_Asegurado SET desahabilitar_recibo_asegurado=? WHERE recibo_id=?`, 
            [disableReciboAsegurado, idReceipt], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}