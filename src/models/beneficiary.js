const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getBeneficiaries: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Beneficiario 
                                WHERE deshabilitar_beneficiario=0`,
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
    getBeneficiary: (beneficiaryId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Beneficiario 
                                WHERE id_beneficiario=? AND deshabilitar_beneficiario=0`, 
                [beneficiaryId],
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
    getIdBeneficiary: (IdBeneficiary) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Beneficiario 
                                WHERE cedula_beneficiario=? AND deshabilitar_beneficiario=0`, 
                [IdBeneficiary],
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
    postBeneficiaryForm: async (fechaNacBeneficiario, beneficiary) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Beneficiario (nombre_beneficiario, apellido_beneficiario, cedula_beneficiario, tipo_cedula_beneficiario, fec_nac_beneficiario, parentesco_beneficiario)
                                VALUES (?, ?, ?, ?, ?, ?)`, 
                [beneficiary.nombre_beneficiario, beneficiary.apellido_beneficiario, beneficiary.cedula_beneficiario, beneficiary.tipo_cedula_beneficiario, fechaNacBeneficiario, beneficiary.parentesco_beneficiario],
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
    postExtensiveBeneficiaryForm: async (temparray) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Beneficiario (nombre_beneficiario, apellido_beneficiario, cedula_beneficiario, tipo_cedula_beneficiario, fec_nac_beneficiario, parentesco_beneficiario, direccion_beneficiario, telefono_beneficiario, correo_beneficiario, banco_beneficiario, tipo_cuenta_beneficiario, nro_cuenta_beneficiario, tipo_movimiento_beneficiario)
                                VALUES ?`, 
                [temparray],
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
    updateBeneficiary: (fechaNacBeneficiario, beneficiary) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Beneficiario 
                                SET nombre_beneficiario=?, apellido_beneficiario=?, cedula_beneficiario=?, fec_nac_beneficiario=?, parentesco_beneficiario=?, direccion_beneficiario=?, telefono_beneficiario=?, correo_beneficiario=?, banco_beneficiario=?, tipo_cuenta_beneficiario=?, nro_cuenta_beneficiario=?, tipo_movimiento_beneficiario=?   
                                WHERE id_beneficiario=?`, 
                [beneficiary.nombre_beneficiario, beneficiary.apellido_beneficiario, beneficiary.cedula_beneficiario, fechaNacBeneficiario, beneficiary.parentesco_beneficiario, beneficiary.direccion_beneficiario, beneficiary.telefono_beneficiario, beneficiary.correo_beneficiario, beneficiary.banco_beneficiario, beneficiary.tipo_cuenta_beneficiario, beneficiary.nro_cuenta_beneficiario, beneficiary.tipo_movimiento_beneficiario, beneficiary.id_beneficiario],
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
    updatePolicyBeneficiary: (fechaNacBeneficiario, beneficiary) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Beneficiario 
                                SET nombre_beneficiario=?, apellido_beneficiario=?, cedula_beneficiario=?, tipo_cedula_beneficiario=?, fec_nac_beneficiario=?, parentesco_beneficiario=?  
                                WHERE id_beneficiario=?`, 
                [beneficiary.nombre_beneficiario, beneficiary.apellido_beneficiario, beneficiary.cedula_beneficiario, beneficiary.tipo_cedula_beneficiario, fechaNacBeneficiario, beneficiary.parentesco_beneficiario, beneficiary.id_beneficiario],
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
    updateDisableBeneficiary: (id, beneficiary) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Beneficiario SET obser_deshabilitar_beneficiario=? WHERE id_beneficiario=?`, 
                [beneficiary.obser_deshabilitar_beneficiario, id],
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
    disableBeneficiary: (id, disableBeneficiary) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Beneficiario 
                                SET deshabilitar_beneficiario=? 
                                WHERE id_beneficiario=?`, 
                [disableBeneficiary, id],
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