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
        let porcentajeEjecutivoSuscripcion = parseFloat(req.body.porcentaje_ejecutivo_suscripcion);
        let porcentajeEjecutivoReclamo = parseFloat(req.body.porcentaje_ejecutivo_reclamo);
        if (req.body.caso_especial_comision === '') {
            casoEspecialComision = 0;
        } else {
            casoEspecialComision = parseFloat(req.body.caso_especial_comision);
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoReclamo);
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
        let porcentajeEjecutivoSuscripcion = parseFloat(req.body.porcentaje_ejecutivo_suscripcion);
        let porcentajeEjecutivoReclamo = parseFloat(req.body.porcentaje_ejecutivo_reclamo);
        if (req.body.caso_especial_comision === '') {
            casoEspecialComision = 0;
        } else {
            casoEspecialComision = parseFloat(req.body.caso_especial_comision);
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoReclamo);
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
        let porcentajeEjecutivoSuscripcion = parseFloat(req.body.porcentaje_ejecutivo_suscripcion);
        let porcentajeEjecutivoReclamo = parseFloat(req.body.porcentaje_ejecutivo_reclamo);
        if (req.body.caso_especial_comision === '') {
            casoEspecialComision = 0;
        } else {
            casoEspecialComision = parseFloat(req.body.caso_especial_comision);
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoReclamo);
        res.redirect('/sistema/add-patrimonial-policy');
    },
    postBailCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision
        let porcentajeEjecutivoComision = parseFloat(req.body.porcentaje_ejecutivo_comision);
        let porcentajeFundatinaComision = parseFloat(req.body.porcentaje_fundatina_comision);
        let porcentajeDirectorComision = parseFloat(req.body.porcentaje_director_comision);
        let porcentajeSocioComision = parseFloat(req.body.porcentaje_socio_comision);
        let porcentajeAtinaComision = parseFloat(req.body.porcentaje_atina_comision);
        let porcentajeEjecutivoSuscripcion = parseFloat(req.body.porcentaje_ejecutivo_suscripcion);
        let porcentajeEjecutivoReclamo = parseFloat(req.body.porcentaje_ejecutivo_reclamo);
        if (req.body.caso_especial_comision === '') {
            casoEspecialComision = 0;
        } else {
            casoEspecialComision = parseFloat(req.body.caso_especial_comision);
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoReclamo);
        res.redirect('/sistema/add-bail-policy');
    },
    postAnotherBranchCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision
        let porcentajeEjecutivoComision = parseFloat(req.body.porcentaje_ejecutivo_comision);
        let porcentajeFundatinaComision = parseFloat(req.body.porcentaje_fundatina_comision);
        let porcentajeDirectorComision = parseFloat(req.body.porcentaje_director_comision);
        let porcentajeSocioComision = parseFloat(req.body.porcentaje_socio_comision);
        let porcentajeAtinaComision = parseFloat(req.body.porcentaje_atina_comision);
        let porcentajeEjecutivoSuscripcion = parseFloat(req.body.porcentaje_ejecutivo_suscripcion);
        let porcentajeEjecutivoReclamo = parseFloat(req.body.porcentaje_ejecutivo_reclamo);
        if (req.body.caso_especial_comision === '') {
            casoEspecialComision = 0;
        } else {
            casoEspecialComision = parseFloat(req.body.caso_especial_comision);
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoReclamo);
        res.redirect('/sistema/add-another-branch-policy');
    },
    postFuneralCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision
        let porcentajeEjecutivoComision = parseFloat(req.body.porcentaje_ejecutivo_comision);
        let porcentajeFundatinaComision = parseFloat(req.body.porcentaje_fundatina_comision);
        let porcentajeDirectorComision = parseFloat(req.body.porcentaje_director_comision);
        let porcentajeSocioComision = parseFloat(req.body.porcentaje_socio_comision);
        let porcentajeAtinaComision = parseFloat(req.body.porcentaje_atina_comision);
        let porcentajeEjecutivoSuscripcion = parseFloat(req.body.porcentaje_ejecutivo_suscripcion);
        let porcentajeEjecutivoReclamo = parseFloat(req.body.porcentaje_ejecutivo_reclamo);
        if (req.body.caso_especial_comision === '') {
            casoEspecialComision = 0;
        } else {
            casoEspecialComision = parseFloat(req.body.caso_especial_comision);
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoReclamo);
        res.redirect('/sistema/add-funeral-policy');
    },
    postLifeCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision
        let porcentajeEjecutivoComision = parseFloat(req.body.porcentaje_ejecutivo_comision);
        let porcentajeFundatinaComision = parseFloat(req.body.porcentaje_fundatina_comision);
        let porcentajeDirectorComision = parseFloat(req.body.porcentaje_director_comision);
        let porcentajeSocioComision = parseFloat(req.body.porcentaje_socio_comision);
        let porcentajeAtinaComision = parseFloat(req.body.porcentaje_atina_comision);
        let porcentajeEjecutivoSuscripcion = parseFloat(req.body.porcentaje_ejecutivo_suscripcion);
        let porcentajeEjecutivoReclamo = parseFloat(req.body.porcentaje_ejecutivo_reclamo);
        if (req.body.caso_especial_comision === '') {
            casoEspecialComision = 0;
        } else {
            casoEspecialComision = parseFloat(req.body.caso_especial_comision);
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoReclamo);
        res.redirect('/sistema/add-life-policy');
    },
    postAPCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision
        let porcentajeEjecutivoComision = parseFloat(req.body.porcentaje_ejecutivo_comision);
        let porcentajeFundatinaComision = parseFloat(req.body.porcentaje_fundatina_comision);
        let porcentajeDirectorComision = parseFloat(req.body.porcentaje_director_comision);
        let porcentajeSocioComision = parseFloat(req.body.porcentaje_socio_comision);
        let porcentajeAtinaComision = parseFloat(req.body.porcentaje_atina_comision);
        let porcentajeEjecutivoSuscripcion = parseFloat(req.body.porcentaje_ejecutivo_suscripcion);
        let porcentajeEjecutivoReclamo = parseFloat(req.body.porcentaje_ejecutivo_reclamo);
        if (req.body.caso_especial_comision === '') {
            casoEspecialComision = 0;
        } else {
            casoEspecialComision = parseFloat(req.body.caso_especial_comision);
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoReclamo);
        res.redirect('/sistema/add-ap-policy');
    },
    postTravelCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision
        let porcentajeEjecutivoComision = parseFloat(req.body.porcentaje_ejecutivo_comision);
        let porcentajeFundatinaComision = parseFloat(req.body.porcentaje_fundatina_comision);
        let porcentajeDirectorComision = parseFloat(req.body.porcentaje_director_comision);
        let porcentajeSocioComision = parseFloat(req.body.porcentaje_socio_comision);
        let porcentajeAtinaComision = parseFloat(req.body.porcentaje_atina_comision);
        let porcentajeEjecutivoSuscripcion = parseFloat(req.body.porcentaje_ejecutivo_suscripcion);
        let porcentajeEjecutivoReclamo = parseFloat(req.body.porcentaje_ejecutivo_reclamo);
        if (req.body.caso_especial_comision === '') {
            casoEspecialComision = 0;
        } else {
            casoEspecialComision = parseFloat(req.body.caso_especial_comision);
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoReclamo);
        res.redirect('/sistema/add-travel-policy');
    }
/*                  PUT                  */
/*               DELETE                  */
}