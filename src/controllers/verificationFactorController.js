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
    postHealthVerificationFactorCollectiveForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-health-collective');
    },
    postVehicleVerificationFactorCollectiveForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-health-collective');
    },
    postRiskDiverseVerificationFactorCollectiveForm: async (req, res) => {
        let porcentajePrima = parseFloat(req.body.porcentaje_prima_factor_verificacion);
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-risk-diverse-collective');
    }
/*                  PUT                  */
/*               DELETE                  */
}