const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getPoliciesInsurersInsureds: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_paa, aseguradora_id, asegurado_id FROM Poliza_Aseguradora_Asegurado WHERE deshabilitar_paa=0', 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getPolicyInsurerInsured: (idPolicy) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_paa, aseguradora_id, asegurado_id FROM Poliza_Aseguradora_Asegurado WHERE poliza_id=?', [idPolicy], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postPolicyInsurerInsured: async (cedulaAseguradoNatural, rifAseguradoNatural, rifAseguradoJuridico, nombre_aseguradora, policyId) => {
        let naturalInsuredId = 0;
        let legalInsuredId = 0;
        if ((cedulaAseguradoNatural === '') && (rifAseguradoNatural == '')) {
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
        } else if ((rifAseguradoJuridico === '') && (rifAseguradoNatural == '')) {
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
        } else if ((rifAseguradoJuridico === '') && (cedulaAseguradoNatural == '')) {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.query('SELECT id_asegurado_per_nat FROM Asegurado_Persona_Natural WHERE rif_asegurado_per_nat=? AND deshabilitar_asegurado_per_nat=0', 
                [rifAseguradoNatural], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        }
        let insurerId = await  new Promise((resolve, reject) => {
            db.query('SELECT id_aseguradora FROM Aseguradora WHERE nombre_aseguradora=? AND deshabilitar_aseguradora=0', [nombre_aseguradora], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
        if (legalInsuredId[0] !== undefined) {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Poliza_Aseguradora_Asegurado (poliza_id, aseguradora_id, asegurado_per_jur_id) 
                        VALUES (?, ?, ?)`, [policyId, insurerId[0].id_aseguradora, legalInsuredId[0].id_asegurado_per_jur], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Poliza_Aseguradora_Asegurado (poliza_id, aseguradora_id, asegurado_per_nat_id) 
                        VALUES (?, ?, ?)`, [policyId, insurerId[0].id_aseguradora, naturalInsuredId[0].id_asegurado_per_nat], 
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
    updatePolicyInsurerInsured: async (nombreTomador, nombreAseguradora, idPolicy) => {
        let insuredId = await  new Promise((resolve, reject) => {
            db.query('SELECT id_asegurado FROM Asegurado WHERE nombre_asegurado=?', [nombreTomador], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
        let insurerId = await  new Promise((resolve, reject) => {
            db.query('SELECT id_aseguradora FROM Aseguradora WHERE nombre_aseguradora=?', [nombreAseguradora], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza_Aseguradora_Asegurado SET aseguradora_id=?, asegurado_id=? WHERE poliza_id=?`, 
            [insurerId[0].id_aseguradora, insuredId[0].id_asegurado, idPolicy], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disablePolicyInsurerInsured: (idPolicy, disablePolicyInsurerInsured) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Poliza_Aseguradora_Asegurado SET deshabilitar_paa=? WHERE poliza_id=?`, 
            [disablePolicyInsurerInsured, idPolicy], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}