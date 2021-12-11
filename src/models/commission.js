const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getOwnAgentPercentage: (policyId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT porcentaje_agente_comision
                    FROM Comision 
                    WHERE poliza_id=? AND deshabilitar_comision=0`,
            [policyId],
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getComissionPolicy: (policyId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Comision 
                    WHERE poliza_id=? AND deshabilitar_comision=0`,
            [policyId],
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getComissionCollective: (collectiveId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *
                    FROM Comision 
                    WHERE colectivo_id=? AND deshabilitar_comision=0`,
            [collectiveId],
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
    getCommissionLast: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_comision
                    FROM Comision 
                    WHERE deshabilitar_comision=0
                    ORDER BY id_comision DESC
                    LIMIT 1;`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postCommissionForm: async (porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision) => {
        let policyId = await new Promise((resolve, reject) => {
            db.query(`SELECT id_poliza 
                    FROM Poliza 
                    WHERE deshabilitar_poliza=0
                    ORDER BY id_poliza DESC
                    LIMIT 1;`, 
            (error, rows) => {
                if (error) {
                    reject(error);
                }
                resolve(rows);
            });
        });
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Comision (porcentaje_agente_comision, caso_especial_comision, porcentaje_ejecutivo_suscripcion, porcentaje_ejecutivo_siniestro, porcentaje_ejecutivo_cobranza, porcentaje_fundatina_comision, porcentaje_director_comision, porcentaje_socio_comision, porcentaje_atina_comision, monto_comision_comision, poliza_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision, policyId[0].id_poliza], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postCommissionCollectiveForm: async (porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision, collectiveId) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Comision (porcentaje_agente_comision, caso_especial_comision, porcentaje_ejecutivo_suscripcion, porcentaje_ejecutivo_siniestro, porcentaje_ejecutivo_cobranza, porcentaje_fundatina_comision, porcentaje_director_comision, porcentaje_socio_comision, porcentaje_atina_comision, monto_comision_comision, colectivo_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision, collectiveId[0].id_colectivo], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
/*                  PUT                  */
/*               DELETE                  */
}