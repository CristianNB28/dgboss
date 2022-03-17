const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getCollectiveInsurerInsured: (idCollective) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_caa, aseguradora_id, asegurado_per_nat_id, asegurado_per_jur_id FROM Colectivo_Aseguradora_Asegurado WHERE colectivo_id=?',
            [idCollective], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getCollectivesInsurersInsureds: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_caa, colectivo_id, aseguradora_id, asegurado_per_nat_id, asegurado_per_jur_id 
                    FROM Colectivo_Aseguradora_Asegurado 
                    WHERE deshabilitar_caa=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getCollectivesIdsNatural: (insuredNaturalId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT colectivo_id FROM Colectivo_Aseguradora_Asegurado WHERE asegurado_per_nat_id=? AND deshabilitar_caa=0',
            [insuredNaturalId],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getCollectivesIdsLegal: (legalInsuredId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT colectivo_id FROM Colectivo_Aseguradora_Asegurado WHERE asegurado_per_jur_id=? AND deshabilitar_caa=0',
            [legalInsuredId],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getCollectiveId: (caaId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT colectivo_id FROM Colectivo_Aseguradora_Asegurado WHERE id_caa=? AND deshabilitar_caa=0',
            [caaId],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postCollectiveInsurer: async (nombre_aseguradora, collectiveId) => {
        let insurerId = await  new Promise((resolve, reject) => {
            db.query('SELECT id_aseguradora FROM Aseguradora WHERE nombre_aseguradora=? AND deshabilitar_aseguradora=0', [nombre_aseguradora], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Colectivo_Aseguradora_Asegurado (colectivo_id, aseguradora_id) 
                    VALUES (?, ?)`, [collectiveId, insurerId[0].id_aseguradora], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    postCollectiveInsurerInsured: async (cedulaAseguradoNatural, rifAseguradoJuridico, nombre_aseguradora, collectiveId) => {
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
                db.query(`INSERT INTO Colectivo_Aseguradora_Asegurado (colectivo_id, aseguradora_id, asegurado_per_jur_id) 
                        VALUES (?, ?, ?)`, [collectiveId, insurerId[0].id_aseguradora, legalInsuredId[0].id_asegurado_per_jur], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Colectivo_Aseguradora_Asegurado (colectivo_id, aseguradora_id, asegurado_per_nat_id) 
                        VALUES (?, ?, ?)`, [collectiveId, insurerId[0].id_aseguradora, naturalInsuredId[0].id_asegurado_per_nat], 
                (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(rows);
                });
            });
        }
    },
    postCollecInsuNaturalInsu: async (naturalInsuredId, insurerId, collectiveId) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Colectivo_Aseguradora_Asegurado (colectivo_id, aseguradora_id, asegurado_per_nat_id) 
                    VALUES (?, ?, ?)`, 
            [collectiveId, insurerId, naturalInsuredId], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateCollectiveInsured: async (idNaturalInsured, idCollective) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Colectivo_Aseguradora_Asegurado SET asegurado_per_nat_id=? WHERE colectivo_id=?`, 
            [idNaturalInsured, idCollective], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateCollectiveInsurer: async (nombreAseguradora, idCollective) => {
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
            db.query(`UPDATE Colectivo_Aseguradora_Asegurado SET aseguradora_id=? WHERE colectivo_id=?`, 
            [insurerId[0].id_aseguradora, idCollective], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableCollectiveInsurerInsured: (idCollective, disableCollectiveInsurerInsured) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Colectivo_Aseguradora_Asegurado SET deshabilitar_caa=? WHERE colectivo_id=?`, 
            [disableCollectiveInsurerInsured, idCollective], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}