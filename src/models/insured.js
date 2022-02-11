const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getNaturalInsureds: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * 
                    FROM Asegurado_Persona_Natural 
                    WHERE deshabilitar_asegurado_per_nat=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getLegalInsureds: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * 
                    FROM Asegurado_Persona_Juridica 
                    WHERE deshabilitar_asegurado_per_jur=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getNaturalInsured: (idNaturalInsured) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Asegurado_Persona_Natural WHERE id_asegurado_per_nat=?',
            [idNaturalInsured],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getLegalInsured: (idLegalInsured) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Asegurado_Persona_Juridica WHERE id_asegurado_per_jur=?',
            [idLegalInsured],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getNaturalInsuredId: (ciNaturalInsured) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_asegurado_per_nat FROM Asegurado_Persona_Natural WHERE cedula_asegurado_per_nat=?',
            [ciNaturalInsured],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getLegalInsuredId: (rifLegalInsured) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id_asegurado_per_jur FROM Asegurado_Persona_Juridica WHERE rif_asegurado_per_jur=?',
            [rifLegalInsured],
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postNaturalInsuredForm: (fechaNacPerNat, idAgentePropio, naturalInsured) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Asegurado_Persona_Natural (cedula_asegurado_per_nat, nombre_asegurado_per_nat, apellido_asegurado_per_nat, fec_nac_per_nat, telefono_asegurado_per_nat, correo_asegurado_per_nat, celular_per_nat, nombre_emergencia_per_nat, telefono_emergencia_per_nat, direccion_asegurado_per_nat, agente_propio_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [naturalInsured.cedula_asegurado_per_nat, naturalInsured.nombre_asegurado_per_nat, naturalInsured.apellido_asegurado_per_nat, fechaNacPerNat, naturalInsured.telefono_asegurado_per_nat, naturalInsured.correo_asegurado_per_nat, naturalInsured.celular_per_nat, naturalInsured.nombre_emergencia_per_nat, naturalInsured.telefono_emergencia_per_nat, naturalInsured.direccion_asegurado_per_nat, idAgentePropio], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postLegalInsuredForm: (idAgentePropio, legalInsured) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Asegurado_Persona_Juridica (rif_asegurado_per_jur, razon_social_per_jur, telefono_asegurado_per_jur, telefono_opcional_per_jur, celular_asegurado_per_jur, nombre_contacto_per_jur, cargo_contacto_per_jur, celular_contacto_per_jur, correo_contacto_per_jur, correo_asegurado_per_jur, correo_opcional_per_jur, direccion_asegurado_per_jur, agente_propio_id)
                    VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?)`, 
            [legalInsured.rif_asegurado_per_jur, legalInsured.razon_social_per_jur, legalInsured.telefono_asegurado_per_jur, legalInsured.telefono_opcional_per_jur, legalInsured.celular_asegurado_per_jur, legalInsured.nombre_contacto_per_jur, legalInsured.cargo_contacto_per_jur, legalInsured.celular_contacto_per_jur, legalInsured.correo_contacto_per_jur, legalInsured.correo_asegurado_per_nat, legalInsured.correo_opcional_per_jur, legalInsured.direccion_asegurado_per_jur, idAgentePropio], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateNaturalInsured: (fechaNacPerNat, idAgentePropio, naturalInsured) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Asegurado_Persona_Natural 
                    SET cedula_asegurado_per_nat=?, nombre_asegurado_per_nat=?, apellido_asegurado_per_nat=?, fec_nac_per_nat=?, telefono_asegurado_per_nat=?, correo_asegurado_per_nat=?, celular_per_nat=?, nombre_emergencia_per_nat=?, telefono_emergencia_per_nat=?, direccion_asegurado_per_nat=?, agente_propio_id=?
                    WHERE id_asegurado_per_nat=?`, 
            [naturalInsured.cedula_asegurado_per_nat, naturalInsured.nombre_asegurado_per_nat, naturalInsured.apellido_asegurado_per_nat, fechaNacPerNat, naturalInsured.telefono_asegurado_per_nat, naturalInsured.correo_asegurado_per_nat, naturalInsured.celular_per_nat, naturalInsured.nombre_emergencia_per_nat, naturalInsured.telefono_emergencia_per_nat, naturalInsured.direccion_asegurado_per_nat, idAgentePropio, naturalInsured.id_asegurado_per_nat], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateLegalInsured: (idAgentePropio, legalInsured) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Asegurado_Persona_Juridica 
                    SET rif_asegurado_per_jur=?, razon_social_per_jur=?, telefono_asegurado_per_jur=?, telefono_opcional_per_jur=?, celular_asegurado_per_jur=?, nombre_contacto_per_jur=?, cargo_contacto_per_jur=?, celular_contacto_per_jur=?, correo_contacto_per_jur=?, correo_asegurado_per_jur=?, correo_opcional_per_jur=?, direccion_asegurado_per_jur=?, agente_propio_id=?
                    WHERE id_asegurado_per_jur=?`, 
            [legalInsured.rif_asegurado_per_jur, legalInsured.razon_social_per_jur, legalInsured.telefono_asegurado_per_jur, legalInsured.telefono_opcional_per_jur, legalInsured.celular_asegurado_per_jur, legalInsured.nombre_contacto_per_jur, legalInsured.cargo_contacto_per_jur, legalInsured.celular_contacto_per_jur, legalInsured.correo_contacto_per_jur, legalInsured.correo_asegurado_per_nat, legalInsured.correo_opcional_per_jur, legalInsured.direccion_asegurado_per_jur, idAgentePropio, legalInsured.id_asegurado_per_jur], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateDisableNaturalInsured: (id, naturalInsured) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Asegurado_Persona_Natural 
                    SET obser_deshabilitar_per_nat=?
                    WHERE id_asegurado_per_nat=?`, 
            [naturalInsured.obser_deshabilitar_per_nat, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateDisableLegalInsured: (id, legalInsured) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Asegurado_Persona_Juridica 
                    SET obser_deshabilitar_per_jur=?
                    WHERE id_asegurado_per_jur=?`, 
            [legalInsured.obser_deshabilitar_per_jur, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableNaturalInsured: (id, disableNaturalInsured) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Asegurado_Persona_Natural SET deshabilitar_asegurado_per_nat=? WHERE id_asegurado_per_nat=?`, 
            [disableNaturalInsured, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    disableLegalInsured: (id, disableLegalInsured) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Asegurado_Persona_Juridica SET deshabilitar_asegurado_per_jur=? WHERE id_asegurado_per_jur=?`, 
            [disableLegalInsured, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}