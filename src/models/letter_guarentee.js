const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getLettersGuarantee: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Carta_Aval 
                    WHERE deshabilitar_carta_aval=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getLetterGuarantee: (idLetterGuarentee) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Carta_Aval 
                    WHERE id_carta_aval=?`, 
            [idLetterGuarentee], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postLetterGuaranteeForm: async (montoReclamoCartaAval, montoPagadoCartaAval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, insuredBeneficiaryId, letterGuarantee) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Carta_Aval (patologia_carta_aval, clinica_carta_aval, fecha_ocurrencia_carta_aval, fecha_notificacion_carta_aval, monto_reclamado_carta_aval, monto_pagado_carta_aval, observacion_carta_aval, tipo_moneda_carta_aval, estatus_carta_aval, numero_siniestro_carta_aval, asegurado_beneficiario_id) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [letterGuarantee.patologia_carta_aval, letterGuarantee.clinica_carta_aval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, montoReclamoCartaAval, montoPagadoCartaAval, letterGuarantee.observacion_carta_aval, letterGuarantee.tipo_moneda_reclamo, letterGuarantee.estatus, letterGuarantee.numero_siniestro_carta_aval, insuredBeneficiaryId], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateLetterGuarantee: async (montoReclamoCartaAval, montoPagadoCartaAval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, insuredBeneficiaryId, letterGuarantee) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Carta_Aval 
                    SET patologia_carta_aval=?, clinica_carta_aval=?, fecha_ocurrencia_carta_aval=?, fecha_notificacion_carta_aval=?, monto_reclamado_carta_aval=?, monto_pagado_carta_aval=?, observacion_carta_aval=?, tipo_moneda_carta_aval=?, estatus_carta_aval=?, numero_siniestro_carta_aval=?, asegurado_beneficiario_id=?
                    WHERE id_carta_aval=?`, 
            [letterGuarantee.patologia_carta_aval, letterGuarantee.clinica_carta_aval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, montoReclamoCartaAval, montoPagadoCartaAval, letterGuarantee.observacion_carta_aval, letterGuarantee.tipo_moneda_reclamo, letterGuarantee.estatus, letterGuarantee.numero_siniestro_carta_aval, insuredBeneficiaryId, letterGuarantee.id_carta_aval], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    updateDisableLetterGuarentee: (id, letterGuarantee) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Carta_Aval 
                    SET obser_deshabilitar_carta_aval=?    
                    WHERE id_carta_aval=?`, 
            [letterGuarantee.obser_deshabilitar_carta_aval, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableLetterGuarentee: (id, disableLetterGuarentee) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Carta_Aval SET deshabilitar_carta_aval=? WHERE id_carta_aval=?`, 
            [disableLetterGuarentee, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}