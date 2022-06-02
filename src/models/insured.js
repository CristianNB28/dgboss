const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getNaturalInsureds: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Asegurado_Persona_Natural 
                                WHERE deshabilitar_asegurado_per_nat=0`,
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
    getLegalInsureds: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Asegurado_Persona_Juridica 
                                WHERE deshabilitar_asegurado_per_jur=0`,
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
    getNaturalInsured: (idNaturalInsured) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Asegurado_Persona_Natural 
                                WHERE id_asegurado_per_nat=?`, 
                [idNaturalInsured],
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
    getLegalInsured: (idLegalInsured) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Asegurado_Persona_Juridica 
                                WHERE id_asegurado_per_jur=?`, 
                [idLegalInsured],
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
    getNaturalInsuredId: (ciNaturalInsured) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_asegurado_per_nat 
                                FROM Asegurado_Persona_Natural 
                                WHERE cedula_asegurado_per_nat=?`, 
                [ciNaturalInsured],
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
    getLegalInsuredId: (rifLegalInsured) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT id_asegurado_per_jur 
                                FROM Asegurado_Persona_Juridica 
                                WHERE rif_asegurado_per_jur=?`, 
                [rifLegalInsured],
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
    postNaturalInsuredForm: (fechaNacPerNat, idAgentePropio, nombrePerNat, apellidoPerNat, naturalInsured) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Asegurado_Persona_Natural (cedula_asegurado_per_nat, tipo_cedula_asegurado_per_nat, nombre_asegurado_per_nat, apellido_asegurado_per_nat, fec_nac_per_nat, telefono_asegurado_per_nat, correo_asegurado_per_nat, celular_per_nat, nombre_emergencia_per_nat, telefono_emergencia_per_nat, direccion_asegurado_per_nat, agente_propio_id)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [naturalInsured.cedula_asegurado_per_nat, naturalInsured.tipo_cedula_asegurado_per_nat, nombrePerNat, apellidoPerNat, fechaNacPerNat, naturalInsured.telefono_asegurado_per_nat, naturalInsured.correo_asegurado_per_nat, naturalInsured.celular_per_nat, naturalInsured.nombre_emergencia_per_nat, naturalInsured.telefono_emergencia_per_nat, naturalInsured.direccion_asegurado_per_nat, idAgentePropio],
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
    postLegalInsuredForm: (idAgentePropio, razonSocialPerJur, legalInsured) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Asegurado_Persona_Juridica (rif_asegurado_per_jur, tipo_rif_asegurado_per_jur, razon_social_per_jur, telefono_asegurado_per_jur, telefono_opcional_per_jur, celular_asegurado_per_jur, nombre_contacto_per_jur, cargo_contacto_per_jur, celular_contacto_per_jur, correo_contacto_per_jur, correo_asegurado_per_jur, correo_opcional_per_jur, direccion_asegurado_per_jur, agente_propio_id)
                                VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?)`, 
                [legalInsured.rif_asegurado_per_jur, legalInsured.tipo_rif_asegurado_per_jur, razonSocialPerJur, legalInsured.telefono_asegurado_per_jur, legalInsured.telefono_opcional_per_jur, legalInsured.celular_asegurado_per_jur, legalInsured.nombre_contacto_per_jur, legalInsured.cargo_contacto_per_jur, legalInsured.celular_contacto_per_jur, legalInsured.correo_contacto_per_jur, legalInsured.correo_asegurado_per_nat, legalInsured.correo_opcional_per_jur, legalInsured.direccion_asegurado_per_jur, idAgentePropio],
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
    updateNaturalInsured: (fechaNacPerNat, nombrePerNat, apellidoPerNat, idAgentePropio, naturalInsured) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Asegurado_Persona_Natural 
                                SET cedula_asegurado_per_nat=?, tipo_cedula_asegurado_per_nat=?, nombre_asegurado_per_nat=?, apellido_asegurado_per_nat=?, fec_nac_per_nat=?, telefono_asegurado_per_nat=?, correo_asegurado_per_nat=?, celular_per_nat=?, nombre_emergencia_per_nat=?, telefono_emergencia_per_nat=?, direccion_asegurado_per_nat=?, agente_propio_id=?
                                WHERE id_asegurado_per_nat=?`, 
                [naturalInsured.cedula_asegurado_per_nat, naturalInsured.tipo_cedula_asegurado_per_nat, nombrePerNat, apellidoPerNat, fechaNacPerNat, naturalInsured.telefono_asegurado_per_nat, naturalInsured.correo_asegurado_per_nat, naturalInsured.celular_per_nat, naturalInsured.nombre_emergencia_per_nat, naturalInsured.telefono_emergencia_per_nat, naturalInsured.direccion_asegurado_per_nat, idAgentePropio, naturalInsured.id_asegurado_per_nat],
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
    updateLegalInsured: (idAgentePropio, razonSocialPerJur, legalInsured) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Asegurado_Persona_Juridica 
                                SET rif_asegurado_per_jur=?, tipo_rif_asegurado_per_jur=?, razon_social_per_jur=?, telefono_asegurado_per_jur=?, telefono_opcional_per_jur=?, celular_asegurado_per_jur=?, nombre_contacto_per_jur=?, cargo_contacto_per_jur=?, celular_contacto_per_jur=?, correo_contacto_per_jur=?, correo_asegurado_per_jur=?, correo_opcional_per_jur=?, direccion_asegurado_per_jur=?, agente_propio_id=?
                                WHERE id_asegurado_per_jur=?`, 
                [legalInsured.rif_asegurado_per_jur, legalInsured.tipo_rif_asegurado_per_jur, razonSocialPerJur, legalInsured.telefono_asegurado_per_jur, legalInsured.telefono_opcional_per_jur, legalInsured.celular_asegurado_per_jur, legalInsured.nombre_contacto_per_jur, legalInsured.cargo_contacto_per_jur, legalInsured.celular_contacto_per_jur, legalInsured.correo_contacto_per_jur, legalInsured.correo_asegurado_per_nat, legalInsured.correo_opcional_per_jur, legalInsured.direccion_asegurado_per_jur, idAgentePropio, legalInsured.id_asegurado_per_jur],
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
    updateDisableNaturalInsured: (id, naturalInsured) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Asegurado_Persona_Natural 
                                SET obser_deshabilitar_per_nat=?
                                WHERE id_asegurado_per_nat=?`, 
                [naturalInsured.obser_deshabilitar_per_nat, id],
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
    updateDisableLegalInsured: (id, legalInsured) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Asegurado_Persona_Juridica 
                                SET obser_deshabilitar_per_jur=?
                                WHERE id_asegurado_per_jur=?`, 
                [legalInsured.obser_deshabilitar_per_jur, id],
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
    updateOwnAgentNaturalInsured: (id, idOwnAgent) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Asegurado_Persona_Natural 
                                SET agente_propio_id=?
                                WHERE id_asegurado_per_nat=?`, 
                [idOwnAgent, id],
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
    updateOwnAgentLegalInsured: (id, idOwnAgent) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Asegurado_Persona_Juridica 
                                SET agente_propio_id=?
                                WHERE id_asegurado_per_jur=?`, 
                [idOwnAgent, id],
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
/*               DELETE                  */
    disableNaturalInsured: (id, disableNaturalInsured) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Asegurado_Persona_Natural 
                                SET deshabilitar_asegurado_per_nat=? 
                                WHERE id_asegurado_per_nat=?`, 
                [disableNaturalInsured, id],
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
    disableLegalInsured: (id, disableLegalInsured) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Asegurado_Persona_Juridica 
                                SET deshabilitar_asegurado_per_jur=? 
                                WHERE id_asegurado_per_jur=?`, 
                [disableLegalInsured, id],
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