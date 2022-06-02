const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getPoliciesInsurersInsureds: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_paa, poliza_id, aseguradora_id, asegurado_per_nat_id, asegurado_per_jur_id 
                                FROM Poliza_Aseguradora_Asegurado 
                                WHERE deshabilitar_paa=0`,
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
    getPoliciesIds: (insurerId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT poliza_id 
                                FROM Poliza_Aseguradora_Asegurado 
                                WHERE aseguradora_id=? AND deshabilitar_paa=0`, 
                [insurerId],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
    getPoliciesIdsNatural: (insuredNaturalId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT poliza_id 
                                FROM Poliza_Aseguradora_Asegurado 
                                WHERE asegurado_per_nat_id=? AND deshabilitar_paa=0`, 
                [insuredNaturalId],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
    getPoliciesIdsLegal: (legalInsuredId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT poliza_id 
                                FROM Poliza_Aseguradora_Asegurado 
                                WHERE asegurado_per_jur_id=? AND deshabilitar_paa=0`, 
                [legalInsuredId],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
    getPolicyInsurerInsured: (idPolicy) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_paa, aseguradora_id, asegurado_per_nat_id, asegurado_per_jur_id 
                                FROM Poliza_Aseguradora_Asegurado 
                                WHERE poliza_id=? AND deshabilitar_paa=0`, 
                [idPolicy],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
    getPolicyId: (paaId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT poliza_id 
                                FROM Poliza_Aseguradora_Asegurado 
                                WHERE id_paa=? AND deshabilitar_paa=0`, 
                [paaId],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
/*                  POST                 */
    postPolicyInsurerInsured: async (cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, policyId) => {
        let naturalInsuredId = 0;
        let legalInsuredId = 0;
        if (cedulaAseguradoNatural === '') {
            legalInsuredId = await new Promise((resolve, reject) => {
                db.getConnection((err, connection) => {
                    if(err) { 
                        console.log(err); 
                        return; 
                    }
                    connection.query(`SELECT id_asegurado_per_jur 
                                    FROM Asegurado_Persona_Juridica 
                                    WHERE rif_asegurado_per_jur=? AND deshabilitar_asegurado_per_jur=0`, 
                    [rifAseguradoJuridico],
                    (error, rows) => {
                        connection.release();
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(rows);
                    });
                });
            });
        } else if (rifAseguradoJuridico === '') {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.getConnection((err, connection) => {
                    if(err) { 
                        console.log(err); 
                        return; 
                    }
                    connection.query(`SELECT id_asegurado_per_nat 
                                    FROM Asegurado_Persona_Natural 
                                    WHERE cedula_asegurado_per_nat=? AND deshabilitar_asegurado_per_nat=0`, 
                    [cedulaAseguradoNatural],
                    (error, rows) => {
                        connection.release();
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(rows);
                    });
                });
            });
        }
        const insurerId = await new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_aseguradora 
                                FROM Aseguradora 
                                WHERE nombre_aseguradora=? AND deshabilitar_aseguradora=0`, 
                [nombreAseguradora],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
        if (legalInsuredId[0] !== undefined) {
            return new Promise((resolve, reject) => {
                db.getConnection((err, connection) => {
                    if(err) { 
                        console.log(err); 
                        return; 
                    }
                    connection.query(`INSERT INTO Poliza_Aseguradora_Asegurado (poliza_id, aseguradora_id, asegurado_per_jur_id) 
                                    VALUES (?, ?, ?)`, 
                    [policyId, insurerId[0].id_aseguradora, legalInsuredId[0].id_asegurado_per_jur],
                    (error, rows) => {
                        connection.release();
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(rows);
                    });
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.getConnection((err, connection) => {
                    if(err) { 
                        console.log(err); 
                        return; 
                    }
                    connection.query(`INSERT INTO Poliza_Aseguradora_Asegurado (poliza_id, aseguradora_id, asegurado_per_nat_id) 
                                    VALUES (?, ?, ?)`, 
                    [policyId, insurerId[0].id_aseguradora, naturalInsuredId[0].id_asegurado_per_nat],
                    (error, rows) => {
                        connection.release();
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(rows);
                    });
                });
            });
        }
    },
/*                  PUT                  */
    updatePolicyInsurerInsured: async (cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, policyId) => {
        let naturalInsuredId = 0;
        let legalInsuredId = 0;
        const insurerId = await new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_aseguradora 
                                FROM Aseguradora 
                                WHERE nombre_aseguradora=? AND deshabilitar_aseguradora=0`, 
                [nombreAseguradora],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
        if (cedulaAseguradoNatural === '') {
            legalInsuredId = await new Promise((resolve, reject) => {
                db.getConnection((err, connection) => {
                    if(err) { 
                        console.log(err); 
                        return; 
                    }
                    connection.query(`SELECT id_asegurado_per_jur 
                                    FROM Asegurado_Persona_Juridica 
                                    WHERE rif_asegurado_per_jur=? AND deshabilitar_asegurado_per_jur=0`, 
                    [rifAseguradoJuridico],
                    (error, rows) => {
                        connection.release();
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(rows);
                    });
                });
            });
        } else if (rifAseguradoJuridico === '') {
            naturalInsuredId = await new Promise((resolve, reject) => {
                db.getConnection((err, connection) => {
                    if(err) { 
                        console.log(err); 
                        return; 
                    }
                    connection.query(`SELECT id_asegurado_per_nat 
                                    FROM Asegurado_Persona_Natural 
                                    WHERE cedula_asegurado_per_nat=? AND deshabilitar_asegurado_per_nat=0`, 
                    [cedulaAseguradoNatural],
                    (error, rows) => {
                        connection.release();
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(rows);
                    });
                });
            });
        }
        if (legalInsuredId[0] !== undefined) {
            return new Promise((resolve, reject) => {
                db.getConnection((err, connection) => {
                    if(err) { 
                        console.log(err);
                        return; 
                    }
                    connection.query(`UPDATE Poliza_Aseguradora_Asegurado 
                                    SET aseguradora_id=?, asegurado_per_nat_id=?, asegurado_per_jur_id=? 
                                    WHERE poliza_id=?`, 
                    [insurerId[0].id_aseguradora, null, legalInsuredId[0].id_asegurado_per_jur, policyId],
                    (error, rows) => {
                        connection.release();
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(rows);
                    });
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.getConnection((err, connection) => {
                    if(err) { 
                        console.log(err);
                        return; 
                    }
                    connection.query(`UPDATE Poliza_Aseguradora_Asegurado 
                                    SET aseguradora_id=?, asegurado_per_nat_id=?, asegurado_per_jur_id=?
                                    WHERE poliza_id=?`, 
                    [insurerId[0].id_aseguradora, naturalInsuredId[0].id_asegurado_per_nat, null, policyId],
                    (error, rows) => {
                        connection.release();
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(rows);
                    });
                });
            });
        }
    },
/*               DELETE                  */
    disablePolicyInsurerInsured: (idPolicy, disablePolicyInsurerInsured) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Poliza_Aseguradora_Asegurado 
                                SET deshabilitar_paa=? 
                                WHERE poliza_id=?`, 
                [disablePolicyInsurerInsured, idPolicy],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    }
}