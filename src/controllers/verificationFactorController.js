const commissionModel = require('../models/commission');
const verificationFactorModel = require('../models/verification_factor');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postHealthVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-health-policy');
    },
    postVehicleVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-vehicle-policy');
    },
    postPatrimonialVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-patrimonial-policy');
    },
    postBailVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-patrimonial-policy');
    },
    postAnotherBranchVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-another-branch-policy');
    },
    postFuneralVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-funeral-policy');
    },
    postLifeVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-life-policy');
    },
    postAPVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-ap-policy');
    },
    postTravelVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-travel-policy');
    },
    /*
    postHealthCommissionCollectiveForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision
        let porcentajeEjecutivoComision = parseFloat(req.body.porcentaje_ejecutivo_comision);
        let porcentajeFundatinaComision = parseFloat(req.body.porcentaje_fundatina_comision);
        let porcentajeDirectorComision = parseFloat(req.body.porcentaje_director_comision);
        let porcentajeSocioComision = parseFloat(req.body.porcentaje_socio_comision);
        let porcentajeAtinaComision = parseFloat(req.body.porcentaje_atina_comision);
        let porcentajeEjecutivoSuscripcion = parseFloat(req.body.porcentaje_ejecutivo_suscripcion);
        let porcentajeEjecutivoReclamo = parseFloat(req.body.porcentaje_ejecutivo_reclamo);
        let idCollective = await collectiveModel.getCollectiveLast();
        if (req.body.caso_especial_comision === '') {
            casoEspecialComision = 0;
        } else {
            casoEspecialComision = parseFloat(req.body.caso_especial_comision);
        }
        await commissionModel.postCommissionCollectiveForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoReclamo, idCollective);
        res.redirect('/sistema/add-health-collective');
    },
    postVehicleCommissionCollectiveForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision
        let porcentajeEjecutivoComision = parseFloat(req.body.porcentaje_ejecutivo_comision);
        let porcentajeFundatinaComision = parseFloat(req.body.porcentaje_fundatina_comision);
        let porcentajeDirectorComision = parseFloat(req.body.porcentaje_director_comision);
        let porcentajeSocioComision = parseFloat(req.body.porcentaje_socio_comision);
        let porcentajeAtinaComision = parseFloat(req.body.porcentaje_atina_comision);
        let porcentajeEjecutivoSuscripcion = parseFloat(req.body.porcentaje_ejecutivo_suscripcion);
        let porcentajeEjecutivoReclamo = parseFloat(req.body.porcentaje_ejecutivo_reclamo);
        let idCollective = await collectiveModel.getCollectiveLast();
        if (req.body.caso_especial_comision === '') {
            casoEspecialComision = 0;
        } else {
            casoEspecialComision = parseFloat(req.body.caso_especial_comision);
        }
        await commissionModel.postCommissionCollectiveForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoReclamo, idCollective);
        res.redirect('/sistema/add-vehicle-collective');
    },
    postRiskDiverseCommissionCollectiveForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision
        let porcentajeEjecutivoComision = parseFloat(req.body.porcentaje_ejecutivo_comision);
        let porcentajeFundatinaComision = parseFloat(req.body.porcentaje_fundatina_comision);
        let porcentajeDirectorComision = parseFloat(req.body.porcentaje_director_comision);
        let porcentajeSocioComision = parseFloat(req.body.porcentaje_socio_comision);
        let porcentajeAtinaComision = parseFloat(req.body.porcentaje_atina_comision);
        let porcentajeEjecutivoSuscripcion = parseFloat(req.body.porcentaje_ejecutivo_suscripcion);
        let porcentajeEjecutivoReclamo = parseFloat(req.body.porcentaje_ejecutivo_reclamo);
        let idCollective = await collectiveModel.getCollectiveLast();
        if (req.body.caso_especial_comision === '') {
            casoEspecialComision = 0;
        } else {
            casoEspecialComision = parseFloat(req.body.caso_especial_comision);
        }
        await commissionModel.postCommissionCollectiveForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoComision, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoReclamo, idCollective);
        res.redirect('/sistema/add-risk-diverse-collective');
    },
    */
/*                  PUT                  */
/*               DELETE                  */
}