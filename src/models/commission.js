const db = require('../../config/database');

module.exports = {
/*                  GET                  */
/*                  POST                 */
    postCommissionForm: async (porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision) => {
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
            db.query(`INSERT INTO Comision (porcentaje_agente_comision, caso_especial_comision, porcentaje_ejecutivo_comision, porcentaje_fundatina_comision, porcentaje_director_comision, porcentaje_socio_comision, porcentaje_atina_comision, poliza_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, policyId[0].id_poliza], 
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