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
        res.redirect('/sistema');
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
        res.redirect('/sistema');
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
        res.redirect('/sistema');
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
        res.redirect('/sistema');
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
        res.redirect('/sistema');
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
        res.redirect('/sistema');
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
        res.redirect('/sistema');
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
        res.redirect('/sistema');
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
        res.redirect('/sistema');
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
        res.redirect('/sistema');
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
        res.redirect('/sistema');
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
        res.redirect('/sistema');
    }
/*                  PUT                  */
/*               DELETE                  */
}