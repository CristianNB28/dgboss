const commissionModel = require('../models/commission');
const verificationFactorModel = require('../models/verification_factor');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postHealthVerificationFactorForm: async (req, res) => {
        let porcentajePrima = req.body.porcentaje_prima_factor_verificacion;
        porcentajePrima = porcentajePrima.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((porcentajePrima.indexOf(',') !== -1) && (porcentajePrima.indexOf('.') !== -1)) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        } else if (porcentajePrima.indexOf(',') !== -1) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = parseFloat(porcentajePrima);
        } else if (porcentajePrima.indexOf('.') !== -1) {
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        }
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-health-policy');
    },
    postVehicleVerificationFactorForm: async (req, res) => {
        let porcentajePrima = req.body.porcentaje_prima_factor_verificacion;
        porcentajePrima = porcentajePrima.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((porcentajePrima.indexOf(',') !== -1) && (porcentajePrima.indexOf('.') !== -1)) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        } else if (porcentajePrima.indexOf(',') !== -1) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = parseFloat(porcentajePrima);
        } else if (porcentajePrima.indexOf('.') !== -1) {
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        }
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-vehicle-policy');
    },
    postPatrimonialVerificationFactorForm: async (req, res) => {
        let porcentajePrima = req.body.porcentaje_prima_factor_verificacion;
        porcentajePrima = porcentajePrima.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((porcentajePrima.indexOf(',') !== -1) && (porcentajePrima.indexOf('.') !== -1)) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        } else if (porcentajePrima.indexOf(',') !== -1) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = parseFloat(porcentajePrima);
        } else if (porcentajePrima.indexOf('.') !== -1) {
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        }
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-patrimonial-policy');
    },
    postBailVerificationFactorForm: async (req, res) => {
        let porcentajePrima = req.body.porcentaje_prima_factor_verificacion;
        porcentajePrima = porcentajePrima.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((porcentajePrima.indexOf(',') !== -1) && (porcentajePrima.indexOf('.') !== -1)) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        } else if (porcentajePrima.indexOf(',') !== -1) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = parseFloat(porcentajePrima);
        } else if (porcentajePrima.indexOf('.') !== -1) {
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        }
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-bail-policy');
    },
    postAnotherBranchVerificationFactorForm: async (req, res) => {
        let porcentajePrima = req.body.porcentaje_prima_factor_verificacion;
        porcentajePrima = porcentajePrima.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((porcentajePrima.indexOf(',') !== -1) && (porcentajePrima.indexOf('.') !== -1)) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        } else if (porcentajePrima.indexOf(',') !== -1) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = parseFloat(porcentajePrima);
        } else if (porcentajePrima.indexOf('.') !== -1) {
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        }
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-another-branch-policy');
    },
    postFuneralVerificationFactorForm: async (req, res) => {
        let porcentajePrima = req.body.porcentaje_prima_factor_verificacion;
        porcentajePrima = porcentajePrima.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((porcentajePrima.indexOf(',') !== -1) && (porcentajePrima.indexOf('.') !== -1)) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        } else if (porcentajePrima.indexOf(',') !== -1) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = parseFloat(porcentajePrima);
        } else if (porcentajePrima.indexOf('.') !== -1) {
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        }
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-funeral-policy');
    },
    postLifeVerificationFactorForm: async (req, res) => {
        let porcentajePrima = req.body.porcentaje_prima_factor_verificacion;
        porcentajePrima = porcentajePrima.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((porcentajePrima.indexOf(',') !== -1) && (porcentajePrima.indexOf('.') !== -1)) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        } else if (porcentajePrima.indexOf(',') !== -1) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = parseFloat(porcentajePrima);
        } else if (porcentajePrima.indexOf('.') !== -1) {
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        }
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-life-policy');
    },
    postAPVerificationFactorForm: async (req, res) => {
        let porcentajePrima = req.body.porcentaje_prima_factor_verificacion;
        porcentajePrima = porcentajePrima.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((porcentajePrima.indexOf(',') !== -1) && (porcentajePrima.indexOf('.') !== -1)) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        } else if (porcentajePrima.indexOf(',') !== -1) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = parseFloat(porcentajePrima);
        } else if (porcentajePrima.indexOf('.') !== -1) {
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        }
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-ap-policy');
    },
    postTravelVerificationFactorForm: async (req, res) => {
        let porcentajePrima = req.body.porcentaje_prima_factor_verificacion;
        porcentajePrima = porcentajePrima.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((porcentajePrima.indexOf(',') !== -1) && (porcentajePrima.indexOf('.') !== -1)) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        } else if (porcentajePrima.indexOf(',') !== -1) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = parseFloat(porcentajePrima);
        } else if (porcentajePrima.indexOf('.') !== -1) {
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        }
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-travel-policy');
    },
    postHealthVerificationFactorCollectiveForm: async (req, res) => {
        let porcentajePrima = req.body.porcentaje_prima_factor_verificacion;
        porcentajePrima = porcentajePrima.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((porcentajePrima.indexOf(',') !== -1) && (porcentajePrima.indexOf('.') !== -1)) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        } else if (porcentajePrima.indexOf(',') !== -1) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = parseFloat(porcentajePrima);
        } else if (porcentajePrima.indexOf('.') !== -1) {
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        }
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-health-collective');
    },
    postVehicleVerificationFactorCollectiveForm: async (req, res) => {
        let porcentajePrima = req.body.porcentaje_prima_factor_verificacion;
        porcentajePrima = porcentajePrima.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((porcentajePrima.indexOf(',') !== -1) && (porcentajePrima.indexOf('.') !== -1)) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        } else if (porcentajePrima.indexOf(',') !== -1) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = parseFloat(porcentajePrima);
        } else if (porcentajePrima.indexOf('.') !== -1) {
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        }
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-vehicle-collective');
    },
    postRiskDiverseVerificationFactorCollectiveForm: async (req, res) => {
        let porcentajePrima = req.body.porcentaje_prima_factor_verificacion;
        porcentajePrima = porcentajePrima.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((porcentajePrima.indexOf(',') !== -1) && (porcentajePrima.indexOf('.') !== -1)) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        } else if (porcentajePrima.indexOf(',') !== -1) {
            porcentajePrima = porcentajePrima.replace(",", ".");
            porcentajePrima = parseFloat(porcentajePrima);
        } else if (porcentajePrima.indexOf('.') !== -1) {
            porcentajePrima = porcentajePrima.replace(".", ",");
            porcentajePrima = parseFloat(porcentajePrima.replace(/,/g,''));
        }
        let idCommission = await commissionModel.getCommissionLast();
        await verificationFactorModel.postVerificationFactorForm(porcentajePrima, idCommission, req.body);
        res.redirect('/sistema/add-risk-diverse-collective');
    }
/*                  PUT                  */
/*               DELETE                  */
}