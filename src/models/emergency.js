const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getEmergencies: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Emergencia 
                    WHERE deshabilitar_emergencia=0`, 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    getEmergency: (idEmergency) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Emergencia 
                    WHERE id_emergencia=?`, 
            [idEmergency], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postEmergencyForm: async (montoReclamoEmergencia, montoPagadoEmergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, insuredBeneficiaryId, emergency) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Emergencia (patologia_emergencia, clinica_emergencia, fecha_ocurrencia_emergencia, fecha_notificacion_emergencia, monto_reclamado_emergencia, monto_pagado_emergencia, observacion_emergencia, tipo_moneda_emergencia, estatus_emergencia, numero_siniestro_emergencia, asegurado_beneficiario_id) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [emergency.patologia_emergencia, emergency.clinica_emergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, montoReclamoEmergencia, montoPagadoEmergencia, emergency.observacion_emergencia, emergency.tipo_moneda_reclamo, emergency.estatus, emergency.numero_siniestro_emergencia, insuredBeneficiaryId], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateEmergency: async (montoReclamoEmergencia, montoPagadoEmergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, insuredBeneficiaryId, emergency) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Emergencia 
                    SET patologia_emergencia=?, clinica_emergencia=?, fecha_ocurrencia_emergencia=?, fecha_notificacion_emergencia=?, monto_reclamado_emergencia=?, monto_pagado_emergencia=?, observacion_emergencia=?, tipo_moneda_emergencia=?, estatus_emergencia=?, numero_siniestro_emergencia=?, asegurado_beneficiario_id=?
                    WHERE id_emergencia=?`, 
            [emergency.patologia_emergencia, emergency.clinica_emergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, montoReclamoEmergencia, montoPagadoEmergencia, emergency.observacion_emergencia, emergency.tipo_moneda_reclamo, emergency.estatus, emergency.numero_siniestro_emergencia, insuredBeneficiaryId, emergency.id_emergencia], 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    updateDisableEmergency: (id, emergency) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Emergencia 
                    SET obser_deshabilitar_emergencia=?    
                    WHERE id_emergencia=?`, 
            [emergency.obser_deshabilitar_emergencia, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableEmergency: (id, disableEmergency) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Emergencia SET deshabilitar_emergencia=? WHERE id_emergencia=?`, [disableEmergency, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}