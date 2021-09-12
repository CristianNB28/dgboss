const commissionModel = require('../models/commission');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postVehicleCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision
        let porcentajeEjecutivoComision = parseFloat(req.body.porcentaje_ejecutivo_comision);
        let porcentajeFundatinaComision = parseFloat(req.body.porcentaje_fundatina_comision);
        let porcentajeDirectorComision = parseFloat(req.body.porcentaje_director_comision);
        let porcentajeSocioComision = parseFloat(req.body.porcentaje_socio_comision);
        let porcentajeAtinaComision = parseFloat(req.body.porcentaje_atina_comision);
        if (req.body.caso_especial_comision === '') {
            casoEspecialComision = 0;
        } else {
            casoEspecialComision = parseFloat(req.body.caso_especial_comision);
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision);
        res.redirect('/sistema/add-vehicle-policy');
    },
    postHealthCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision
        let porcentajeEjecutivoComision = parseFloat(req.body.porcentaje_ejecutivo_comision);
        let porcentajeFundatinaComision = parseFloat(req.body.porcentaje_fundatina_comision);
        let porcentajeDirectorComision = parseFloat(req.body.porcentaje_director_comision);
        let porcentajeSocioComision = parseFloat(req.body.porcentaje_socio_comision);
        let porcentajeAtinaComision = parseFloat(req.body.porcentaje_atina_comision);
        if (req.body.caso_especial_comision === '') {
            casoEspecialComision = 0;
        } else {
            casoEspecialComision = parseFloat(req.body.caso_especial_comision);
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision);
        res.redirect('/sistema/add-health-policy');
    },
    postPatrimonialCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision
        let porcentajeEjecutivoComision = parseFloat(req.body.porcentaje_ejecutivo_comision);
        let porcentajeFundatinaComision = parseFloat(req.body.porcentaje_fundatina_comision);
        let porcentajeDirectorComision = parseFloat(req.body.porcentaje_director_comision);
        let porcentajeSocioComision = parseFloat(req.body.porcentaje_socio_comision);
        let porcentajeAtinaComision = parseFloat(req.body.porcentaje_atina_comision);
        if (req.body.caso_especial_comision === '') {
            casoEspecialComision = 0;
        } else {
            casoEspecialComision = parseFloat(req.body.caso_especial_comision);
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision);
        res.redirect('/sistema/add-patrimonial-policy');
    }
/*                  PUT                  */
/*               DELETE                  */
}