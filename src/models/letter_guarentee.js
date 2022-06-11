const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getLettersGuarantee: () => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Carta_Aval 
                                WHERE deshabilitar_carta_aval=0`,
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
    getLetterGuarantee: (idLetterGuarentee) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Carta_Aval 
                                WHERE id_carta_aval=?`,
                [idLetterGuarentee],
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
    postLetterGuaranteeForm: async (montoReclamoCartaAval, montoPagadoCartaAval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, insuredBeneficiaryId, idPolicy, idCollective, letterGuarantee) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Carta_Aval (patologia_carta_aval, clinica_carta_aval, fecha_ocurrencia_carta_aval, fecha_notificacion_carta_aval, monto_reclamado_carta_aval, monto_pagado_carta_aval, observacion_carta_aval, tipo_moneda_carta_aval, estatus_carta_aval, numero_siniestro_carta_aval, asegurado_beneficiario_id, poliza_id, colectivo_id) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [letterGuarantee.patologia_carta_aval, letterGuarantee.clinica_carta_aval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, montoReclamoCartaAval, montoPagadoCartaAval, letterGuarantee.observacion_carta_aval, letterGuarantee.tipo_moneda_reclamo, letterGuarantee.estatus, letterGuarantee.numero_siniestro_carta_aval, insuredBeneficiaryId, idPolicy, idCollective],
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
    updateLetterGuarantee: async (montoReclamoCartaAval, montoPagadoCartaAval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, insuredBeneficiaryId, idPolicy, idCollective, letterGuarantee) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Carta_Aval 
                                SET patologia_carta_aval=?, clinica_carta_aval=?, fecha_ocurrencia_carta_aval=?, fecha_notificacion_carta_aval=?, monto_reclamado_carta_aval=?, monto_pagado_carta_aval=?, observacion_carta_aval=?, tipo_moneda_carta_aval=?, estatus_carta_aval=?, numero_siniestro_carta_aval=?, asegurado_beneficiario_id=?, poliza_id=?, colectivo_id=?
                                WHERE id_carta_aval=?`, 
                [letterGuarantee.patologia_carta_aval, letterGuarantee.clinica_carta_aval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, montoReclamoCartaAval, montoPagadoCartaAval, letterGuarantee.observacion_carta_aval, letterGuarantee.tipo_moneda_reclamo, letterGuarantee.estatus, letterGuarantee.numero_siniestro_carta_aval, insuredBeneficiaryId, idPolicy, idCollective, letterGuarantee.id_carta_aval],
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
    updateDisableLetterGuarentee: (id, letterGuarantee) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Carta_Aval 
                                SET obser_deshabilitar_carta_aval=?    
                                WHERE id_carta_aval=?`, 
                [letterGuarantee.obser_deshabilitar_carta_aval, id],
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
    disableLetterGuarentee: (id, disableLetterGuarentee) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Carta_Aval 
                                SET deshabilitar_carta_aval=? 
                                WHERE id_carta_aval=?`, 
                [disableLetterGuarentee, id],
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