const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getAMP: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM AMP 
                    WHERE deshabilitar_amp=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getAMPId: (idAMP) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM AMP 
                    WHERE id_amp=?`, 
            [idAMP], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postAMPForm: async (montoReclamoAMP, montoPagadoAMP, fechaOcurrenciaAMP, fechaNotificacionAMP, insuredBeneficiaryId, amp) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO AMP (patologia_amp, clinica_amp, fecha_ocurrencia_amp, fecha_notificacion_amp, monto_reclamado_amp, monto_pagado_amp, observacion_amp, tipo_moneda_amp, estatus_amp, numero_siniestro_amp, asegurado_beneficiario_id) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [amp.patologia_amp, amp.clinica_amp, fechaOcurrenciaAMP, fechaNotificacionAMP, montoReclamoAMP, montoPagadoAMP, amp.observacion_amp, amp.tipo_moneda_amp, amp.estatus, amp.numero_siniestro_amp, insuredBeneficiaryId], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateAMP: async (montoReclamoAMP, montoPagadoAMP, fechaOcurrenciaAMP, fechaNotificacionAMP, insuredBeneficiaryId, amp) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE AMP 
                    SET patologia_amp=?, clinica_amp=?, fecha_ocurrencia_amp=?, fecha_notificacion_amp=?, monto_reclamado_amp=?, monto_pagado_amp=?, observacion_amp=?, tipo_moneda_amp=?, estatus_amp=?, numero_siniestro_amp=?, asegurado_beneficiario_id=?
                    WHERE id_amp=?`, 
            [amp.patologia_amp, amp.clinica_amp, fechaOcurrenciaAMP, fechaNotificacionAMP, montoReclamoAMP, montoPagadoAMP, amp.observacion_amp, amp.tipo_moneda_amp, amp.estatus, amp.numero_siniestro_amp, insuredBeneficiaryId, amp.id_amp], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    updateDisableAMP: (id, amp) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE AMP 
                    SET obser_deshabilitar_amp=?    
                    WHERE id_amp=?`, 
            [amp.obser_deshabilitar_amp, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableAMP: (id, disableAMP) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE AMP SET deshabilitar_amp=? WHERE id_amp=?`, [disableAMP, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}