const commissionModel = require('../models/commission');
const verificationFactorModel = require('../models/verification_factor');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postHealthVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema');
    },
    postVehicleVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema');
    },
    postPatrimonialVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema');
    },
    postBailVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema');
    },
    postAnotherBranchVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema');
    },
    postFuneralVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema');
    },
    postLifeVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema');
    },
    postAPVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema');
    },
    postTravelVerificationFactorForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema');
    },
    postHealthVerificationFactorCollectiveForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema');
    },
    postVehicleVerificationFactorCollectiveForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema');
    },
    postRiskDiverseVerificationFactorCollectiveForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema');
    }
/*                  PUT                  */
/*               DELETE                  */
}