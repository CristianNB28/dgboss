const db = require('../../config/database');

module.exports = {
/*                  GET                  */

    getAseguradoBeneficiario: (aseguradoBeneficiarioId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * 
                    FROM Asegurado_Beneficiario 
                    WHERE id_asegurado_beneficiario=? AND desahabilitar_asegurado_beneficiario=0`, 
            [aseguradoBeneficiarioId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*
    getColInsuInsuredBenefs: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * 
                    FROM Col_Aseg_Asegurado_Benef 
                    WHERE deshabilitar_caab=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
*/
/*                  POST                 */
    postAseguradoBeneficiario: async (cedulaAseguradoNatural, rifAseguradoJuridico, beneficiaryId) => {
        let naturalInsuredId = 0;
        let legalInsuredId = 0;
        if (cedulaAseguradoNatural === '') {
            legalInsuredId = await new Promise((resolve, reject) => {
                db.query('SELECT id_asegurado_per_jur FROM Asegurado_Persona_Juridica WHERE rif_asegurado_per_jur=? AND deshabilitar_asegurado_per_jur=0', 
                [rifAseguradoJuridico], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (rifAseguradoJuridico === '') {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query('SELECT id_asegurado_per_nat FROM Asegurado_Persona_Natural WHERE cedula_asegurado_per_nat=? AND deshabilitar_asegurado_per_nat=0', 
                [cedulaAseguradoNatural], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        }
        if (legalInsuredId[0] !== undefined) {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Asegurado_Beneficiario (asegurado_per_jur_id, beneficiario_id) 
                        VALUES (?, ?)`, [legalInsuredId[0].id_asegurado_per_jur, beneficiaryId], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Asegurado_Beneficiario (asegurado_per_nat_id, beneficiario_id) 
                        VALUES (?, ?)`, [naturalInsuredId[0].id_asegurado_per_nat, beneficiaryId], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        }
    },
/*                  PUT                  */
    updateAseguradoBeneficiario: async (cedulaAseguradoNatural, rifAseguradoJuridico, beneficiaryId, insuredBeneficiaryId) => {
        let naturalInsuredId = 0;
        let legalInsuredId = 0;
        if (cedulaAseguradoNatural === '') {
            legalInsuredId = await new Promise((resolve, reject) => {
                db.query('SELECT id_asegurado_per_jur FROM Asegurado_Persona_Juridica WHERE rif_asegurado_per_jur=? AND deshabilitar_asegurado_per_jur=0', 
                [rifAseguradoJuridico], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else if (rifAseguradoJuridico === '') {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query('SELECT id_asegurado_per_nat FROM Asegurado_Persona_Natural WHERE cedula_asegurado_per_nat=? AND deshabilitar_asegurado_per_nat=0', 
                [cedulaAseguradoNatural], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        }
        if (legalInsuredId[0] !== undefined) {
            naturalInsuredId = null;
            return new Promise((resolve, reject) => {
                db.query(`UPDATE Asegurado_Beneficiario 
                        SET asegurado_per_nat_id=?, asegurado_per_jur_id=?, beneficiario_id=? 
                        WHERE id_asegurado_beneficiario=?`, 
                [naturalInsuredId, legalInsuredId[0].id_asegurado_per_jur, beneficiaryId, insuredBeneficiaryId], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else {
            legalInsuredId = null;
            return new Promise((resolve, reject) => {
                db.query(`UPDATE Asegurado_Beneficiario 
                        SET asegurado_per_nat_id=?, asegurado_per_jur_id=?, beneficiario_id=? 
                        WHERE id_asegurado_beneficiario=?`, 
                [naturalInsuredId[0].id_asegurado_per_nat, legalInsuredId, beneficiaryId, insuredBeneficiaryId], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        }
    },
/*               DELETE                  */
    disableAseguradoBeneficiario: (id, disableInsuredBeneficiary) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Asegurado_Beneficiario 
                    SET desahabilitar_asegurado_beneficiario=? 
                    WHERE id_asegurado_beneficiario=?`, 
            [disableInsuredBeneficiary, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
}