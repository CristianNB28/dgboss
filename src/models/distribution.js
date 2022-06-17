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
    postDistributionForm: async (montoComision, montoBonificacion, montoComisionBonificacion, totalComision, porcentajeBonificacion, porcentajeIslr, porcentajeAgentePropio, porcentajeCasoEspecial, porcentajeAtina, porcentajeFundatina, porcentajeDirector, porcentajeSocio, porcentajeGerente, porcentajeCoordinadorSuscripcion, porcentajeCoordinadorReclamo, porcentajeCoordinadorAdministracion, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoReclamo, porcentajeEjecutivoCobranza, idDivision) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Distribucion (monto_comision_distribucion, porcentaje_bonificacion_distribucion, monto_bonificacion_distribucion, monto_comision_bonificacion, porcentaje_islr_distribucion, total_comision_distribuir, porcentaje_agente_distribucion, caso_especial_distribucion, porcentaje_atina_distribucion, porcentaje_fundatina_distribucion, porcentaje_director_distribucion, porcentaje_socio_distribucion, porcentaje_gerente_distribucion, porcentaje_coordinador_suscripcion, porcentaje_coordinador_reclamo, porcentaje_coordinador_administracion, porcentaje_ejecutivo_suscripcion, porcentaje_ejecutivo_reclamo, porcentaje_ejecutivo_cobranza, fraccionamiento_id)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [montoComision, porcentajeBonificacion, montoBonificacion, montoComisionBonificacion, porcentajeIslr, totalComision, porcentajeAgentePropio, porcentajeCasoEspecial, porcentajeAtina, porcentajeFundatina, porcentajeDirector, porcentajeSocio, porcentajeGerente, porcentajeCoordinadorSuscripcion, porcentajeCoordinadorReclamo, porcentajeCoordinadorAdministracion, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoReclamo, porcentajeEjecutivoCobranza, idDivision],
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