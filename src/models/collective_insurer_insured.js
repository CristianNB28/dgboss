const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getCollectiveInsurerInsured: (idCollective) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Colectivo_Aseguradora_Asegurado 
                                WHERE colectivo_id=?`, 
                [idCollective],
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
    getCollectivesInsurersInsureds: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_caa, colectivo_id, aseguradora_id, asegurado_per_nat_id, asegurado_per_jur_id 
                                FROM Colectivo_Aseguradora_Asegurado 
                                WHERE deshabilitar_caa=0`,
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
    getCollectivesIdsNatural: (insuredNaturalId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT colectivo_id 
                                FROM Colectivo_Aseguradora_Asegurado 
                                WHERE asegurado_per_nat_id=? AND deshabilitar_caa=0`, 
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
    getCollectivesIdsLegal: (legalInsuredId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT colectivo_id 
                                FROM Colectivo_Aseguradora_Asegurado 
                                WHERE asegurado_per_jur_id=? AND deshabilitar_caa=0`, 
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
    getCollectiveId: (caaId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT colectivo_id 
                                FROM Colectivo_Aseguradora_Asegurado 
                                WHERE id_caa=? AND deshabilitar_caa=0`, 
                [caaId],
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
    postCollectiveInsurer: async (nombreAseguradora, collectiveId) => {
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
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Colectivo_Aseguradora_Asegurado (colectivo_id, aseguradora_id) 
                                VALUES (?, ?)`, 
                [collectiveId, insurerId[0].id_aseguradora],
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
    postCollectiveInsurerInsured: async (cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, collectiveId) => {
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
                    connection.query(`INSERT INTO Colectivo_Aseguradora_Asegurado (colectivo_id, aseguradora_id, asegurado_per_jur_id) 
                                    VALUES (?, ?, ?)`, 
                    [collectiveId, insurerId[0].id_aseguradora, legalInsuredId[0].id_asegurado_per_jur],
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
                    connection.query(`INSERT INTO Colectivo_Aseguradora_Asegurado (colectivo_id, aseguradora_id, asegurado_per_nat_id) 
                                    VALUES (?, ?, ?)`, 
                    [collectiveId, insurerId[0].id_aseguradora, naturalInsuredId[0].id_asegurado_per_nat],
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
    postCollecInsuNaturalInsu: async (naturalInsuredId, insurerId, collectiveId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Colectivo_Aseguradora_Asegurado (colectivo_id, aseguradora_id, asegurado_per_nat_id) 
                                VALUES (?, ?, ?)`, 
                [collectiveId, insurerId, naturalInsuredId],
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
/*                  PUT                  */
    updateCollectiveInsured: async (idNaturalInsured, idCollective) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Colectivo_Aseguradora_Asegurado 
                                SET asegurado_per_nat_id=? 
                                WHERE colectivo_id=?`, 
                [idNaturalInsured, idCollective],
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
    updateCollectiveInsurer: async (nombreAseguradora, idCollective) => {
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
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Colectivo_Aseguradora_Asegurado 
                                SET aseguradora_id=? 
                                WHERE colectivo_id=?`, 
                [insurerId[0].id_aseguradora, idCollective],
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
    updateCollectiveInsurerInsured: async (cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, collectiveId) => {
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
                    connection.query(`UPDATE Colectivo_Aseguradora_Asegurado 
                                    SET aseguradora_id=?, asegurado_per_nat_id=?, asegurado_per_jur_id=? 
                                    WHERE colectivo_id=?`, 
                    [insurerId[0].id_aseguradora, null, legalInsuredId[0].id_asegurado_per_jur, collectiveId],
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
                    connection.query(`UPDATE Colectivo_Aseguradora_Asegurado 
                    SET aseguradora_id=?, asegurado_per_nat_id=?, asegurado_per_jur_id=?
                    WHERE colectivo_id=?`, 
                    [insurerId[0].id_aseguradora, naturalInsuredId[0].id_asegurado_per_nat, null, collectiveId],
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
    disableCollectiveInsurerInsured: (idCollective, disableCollectiveInsurerInsured) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Colectivo_Aseguradora_Asegurado 
                                SET deshabilitar_caa=? 
                                WHERE colectivo_id=?`, 
                [disableCollectiveInsurerInsured, idCollective],
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