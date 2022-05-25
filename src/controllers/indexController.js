const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const insurerModel = require('../models/insurer');
const ownAgentModel = require('../models/own_agent');
const receiptModel = require('../models/receipt');
const insuredModel = require('../models/insured');
const commissionModel = require('../models/commission');
const collectiveModel = require('../models/collective');

module.exports = {
/*                  GET                  */
    getIndex: async (req, res) => {
        let healthPolicyCounter = await policyModel.getHealthPolicyCounter();
        let healthColectiveCounter = await collectiveModel.getHealthCollectiveCounter();
        let healthCounter = healthPolicyCounter[0].health + healthColectiveCounter[0].health;
        let autoPolicyCounter = await policyModel.getAutoPolicyCounter();
        let autoColectiveCounter = await collectiveModel.getAutoCollectiveCounter();
        let autoCounter = autoPolicyCounter[0].auto + autoColectiveCounter[0].auto;
        let patrimonialPolicyCounter = await policyModel.getPatrimonialPolicyCounter();
        let bailPolicyCounter = await policyModel.getBailPolicyCounter();
        let anotherBranchPolicyCounter = await policyModel.getAnotherBranchPolicyCounter();
        let funeralPolicyCounter = await policyModel.getFuneralPolicyCounter();
        let lifePolicyCounter = await policyModel.getLifePolicyCounter();
        let apPolicyCounter = await policyModel.getAPPolicyCounter();
        let travelPolicyCounter = await policyModel.getTravelPolicyCounter();
        let riskDiverCollectiveCounter = await collectiveModel.getRiskDiverCollectiveCounter();
        let totalPremiumPolicy = await policyModel.getSummaryPolizaCousins();
        let totalPremiumCollective = await collectiveModel.getSummaryCollectiveCousins();
        let totalCommission = await receiptModel.getSumReceiptCommissions(); 
        let totalPremium = 0;
        if ((totalPremiumPolicy[0].primaTotal !== null) && (totalPremiumCollective[0].primaTotal !== null)) {
            totalPremium = totalPremiumPolicy[0].primaTotal + totalPremiumCollective[0].primaTotal;
            totalPremium = totalPremium.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else if ((totalPremiumPolicy[0].primaTotal === null) && (totalPremiumCollective[0].primaTotal === null)) {
            totalPremium = 0;
        } else if (totalPremiumPolicy[0].primaTotal === null){
            totalPremium = totalPremiumCollective[0].primaTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else if (totalPremiumCollective[0].primaTotal === null) {
            totalPremium = totalPremiumPolicy[0].primaTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        }
        if (totalCommission[0].comisionTotal === null) {
            totalCommission[0].comisionTotal = 0;
            totalCommission = totalCommission[0].comisionTotal;
        } else {
            totalCommission = totalCommission[0].comisionTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        }
        res.render('index', {
            healthPolicyCount: healthCounter,
            autoPolicyCount: autoCounter,
            patrimonialPolicyCount: patrimonialPolicyCounter[0],
            bailPolicyCount: bailPolicyCounter[0],
            anotherBranchPolicyCount: anotherBranchPolicyCounter[0],
            funeralPolicyCount: funeralPolicyCounter[0],
            lifePolicyCount: lifePolicyCounter[0],
            apPolicyCount: apPolicyCounter[0],
            travelPolicyCount: travelPolicyCounter[0],
            riskDiverCollectiveCount: riskDiverCollectiveCounter[0],
            totalPremium,
            totalCommission,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    get404:  (req, res) => {
        res.status(404);
        res.render('404');
    },
/*              POST                */
    postIndexGraphicAccidentRate: async (req, res) => {
        let healthPolicyCounter = await policyModel.getHealthPolicyCounter();
        let healthColectiveCounter = await collectiveModel.getHealthCollectiveCounter();
        let healthCounter = healthPolicyCounter[0].health + healthColectiveCounter[0].health;
        let autoPolicyCounter = await policyModel.getAutoPolicyCounter();
        let autoColectiveCounter = await collectiveModel.getAutoCollectiveCounter();
        let autoCounter = autoPolicyCounter[0].auto + autoColectiveCounter[0].auto;
        let patrimonialPolicyCounter = await policyModel.getPatrimonialPolicyCounter();
        let bailPolicyCounter = await policyModel.getBailPolicyCounter();
        let anotherBranchPolicyCounter = await policyModel.getAnotherBranchPolicyCounter();
        let funeralPolicyCounter = await policyModel.getFuneralPolicyCounter();
        let lifePolicyCounter = await policyModel.getLifePolicyCounter();
        let apPolicyCounter = await policyModel.getAPPolicyCounter();
        let travelPolicyCounter = await policyModel.getTravelPolicyCounter();
        let riskDiverCollectiveCounter = await collectiveModel.getRiskDiverCollectiveCounter();
        let totalPremiumPolicy = await policyModel.getSummaryPolizaCousins();
        let totalPremiumCollective = await collectiveModel.getSummaryCollectiveCousins();
        let totalCommission = await receiptModel.getSumReceiptCommissions(); 
        let totalPremium = 0;
        if ((totalPremiumPolicy[0].primaTotal !== null) && (totalPremiumCollective[0].primaTotal !== null)) {
            totalPremium = totalPremiumPolicy[0].primaTotal + totalPremiumCollective[0].primaTotal;
            totalPremium = totalPremium.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else if ((totalPremiumPolicy[0].primaTotal === null) && (totalPremiumCollective[0].primaTotal === null)) {
            totalPremium = 0;
        } else if (totalPremiumPolicy[0].primaTotal === null){
            totalPremium = totalPremiumCollective[0].primaTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else if (totalPremiumCollective[0].primaTotal === null) {
            totalPremium = totalPremiumPolicy[0].primaTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        }
        if (totalCommission[0].comisionTotal === null) {
            totalCommission[0].comisionTotal = 0;
            totalCommission = totalCommission[0].comisionTotal;
        } else {
            totalCommission = totalCommission[0].comisionTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        }
        let {
            fecha_inicio: fechaInicioPrima, 
            fecha_final: fechaFinPrima,
        } = req.body;
        fechaInicioPrima = new Date(fechaInicioPrima);
        fechaFinPrima = new Date(fechaFinPrima);
        const resultSiniestralidadAuto = await policyModel.getVehicleAccidentSum(fechaInicioPrima, fechaFinPrima);
        const siniestralidadAutoTotal = resultSiniestralidadAuto.map(item => item.siniestralidad_vehiculo).reduce((prev, curr) => prev + curr, 0);
        const resultSiniestralidadSalud = await policyModel.getHealthAccidentSum(fechaInicioPrima, fechaFinPrima);
        const siniestralidadSaludTotal = resultSiniestralidadSalud.map(item => item.siniestralidad_salud).reduce((prev, curr) => prev + curr, 0);
        const resultSiniestralidadPatrimonial = await policyModel.getPatrimonialAccidentSum(fechaInicioPrima, fechaFinPrima);
        const siniestralidadPatrimonialTotal = resultSiniestralidadPatrimonial.map(item => item.siniestralidad_patrimonial).reduce((prev, curr) => prev + curr, 0);
        const resultSiniestralidadFianza = await policyModel.getBailAccidentSum(fechaInicioPrima, fechaFinPrima);
        const siniestralidadFianzaTotal = resultSiniestralidadFianza.map(item => item.siniestralidad_fianza).reduce((prev, curr) => prev + curr, 0);
        const arrayAccidentRate = [siniestralidadAutoTotal, siniestralidadSaludTotal, siniestralidadPatrimonialTotal, siniestralidadFianzaTotal];
        res.render('index', {
            healthPolicyCount: healthCounter,
            autoPolicyCount: autoCounter,
            patrimonialPolicyCount: patrimonialPolicyCounter[0],
            bailPolicyCount: bailPolicyCounter[0],
            anotherBranchPolicyCount: anotherBranchPolicyCounter[0],
            funeralPolicyCount: funeralPolicyCounter[0],
            lifePolicyCount: lifePolicyCounter[0],
            apPolicyCount: apPolicyCounter[0],
            travelPolicyCount: travelPolicyCounter[0],
            riskDiverCollectiveCount: riskDiverCollectiveCounter[0],
            totalPremium,
            totalCommission,
            arrayAccidentRate,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    postIndexGraphicPremiumCollected: async (req, res) => {
        let healthPolicyCounter = await policyModel.getHealthPolicyCounter();
        let healthColectiveCounter = await collectiveModel.getHealthCollectiveCounter();
        let healthCounter = healthPolicyCounter[0].health + healthColectiveCounter[0].health;
        let autoPolicyCounter = await policyModel.getAutoPolicyCounter();
        let autoColectiveCounter = await collectiveModel.getAutoCollectiveCounter();
        let autoCounter = autoPolicyCounter[0].auto + autoColectiveCounter[0].auto;
        let patrimonialPolicyCounter = await policyModel.getPatrimonialPolicyCounter();
        let bailPolicyCounter = await policyModel.getBailPolicyCounter();
        let anotherBranchPolicyCounter = await policyModel.getAnotherBranchPolicyCounter();
        let funeralPolicyCounter = await policyModel.getFuneralPolicyCounter();
        let lifePolicyCounter = await policyModel.getLifePolicyCounter();
        let apPolicyCounter = await policyModel.getAPPolicyCounter();
        let travelPolicyCounter = await policyModel.getTravelPolicyCounter();
        let riskDiverCollectiveCounter = await collectiveModel.getRiskDiverCollectiveCounter();
        let totalPremiumPolicy = await policyModel.getSummaryPolizaCousins();
        let totalPremiumCollective = await collectiveModel.getSummaryCollectiveCousins();
        let totalCommission = await receiptModel.getSumReceiptCommissions(); 
        let totalPremium = 0;
        if ((totalPremiumPolicy[0].primaTotal !== null) && (totalPremiumCollective[0].primaTotal !== null)) {
            totalPremium = totalPremiumPolicy[0].primaTotal + totalPremiumCollective[0].primaTotal;
            totalPremium = totalPremium.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else if ((totalPremiumPolicy[0].primaTotal === null) && (totalPremiumCollective[0].primaTotal === null)) {
            totalPremium = 0;
        } else if (totalPremiumPolicy[0].primaTotal === null){
            totalPremium = totalPremiumCollective[0].primaTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else if (totalPremiumCollective[0].primaTotal === null) {
            totalPremium = totalPremiumPolicy[0].primaTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        }
        if (totalCommission[0].comisionTotal === null) {
            totalCommission[0].comisionTotal = 0;
            totalCommission = totalCommission[0].comisionTotal;
        } else {
            totalCommission = totalCommission[0].comisionTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        }
        let {
            fecha_inicio: fechaInicioPrima, 
            fecha_final: fechaFinPrima,
        } = req.body;
        fechaInicioPrima = new Date(fechaInicioPrima);
        fechaFinPrima = new Date(fechaFinPrima);
        const resultPrimaCobrada = await policyModel.getChargedCounterPremium(fechaInicioPrima, fechaFinPrima);
        const primaCobradaTotal = resultPrimaCobrada.map(item => item.prima_cobrada).reduce((prev, curr) => prev + curr, 0);
        const resultPrimaDevuelta = await policyModel.getPremiumReturnedCounter(fechaInicioPrima, fechaFinPrima);
        const primaDevueltaTotal = resultPrimaDevuelta.map(item => item.prima_devuelta).reduce((prev, curr) => prev + curr, 0);
        const resultPrimaCobradaNeta = await policyModel.getPremiumCollectedNetCounter(fechaInicioPrima, fechaFinPrima);
        const primaCobradaNetaTotal = resultPrimaCobradaNeta.map(item => item.prima_cobrada_neta).reduce((prev, curr) => prev + curr, 0);
        const arrayPremiumCharged = [primaCobradaTotal, primaDevueltaTotal, primaCobradaNetaTotal];
        res.render('index', {
            healthPolicyCount: healthCounter,
            autoPolicyCount: autoCounter,
            patrimonialPolicyCount: patrimonialPolicyCounter[0],
            bailPolicyCount: bailPolicyCounter[0],
            anotherBranchPolicyCount: anotherBranchPolicyCounter[0],
            funeralPolicyCount: funeralPolicyCounter[0],
            lifePolicyCount: lifePolicyCounter[0],
            apPolicyCount: apPolicyCounter[0],
            travelPolicyCount: travelPolicyCounter[0],
            riskDiverCollectiveCount: riskDiverCollectiveCounter[0],
            totalPremium,
            totalCommission,
            arrayPremiumCharged,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    postIndexGraphicPortfolioComposition: async (req, res) => {
        let healthPolicyCounter = await policyModel.getHealthPolicyCounter();
        let healthColectiveCounter = await collectiveModel.getHealthCollectiveCounter();
        let healthCounter = healthPolicyCounter[0].health + healthColectiveCounter[0].health;
        let autoPolicyCounter = await policyModel.getAutoPolicyCounter();
        let autoColectiveCounter = await collectiveModel.getAutoCollectiveCounter();
        let autoCounter = autoPolicyCounter[0].auto + autoColectiveCounter[0].auto;
        let patrimonialPolicyCounter = await policyModel.getPatrimonialPolicyCounter();
        let bailPolicyCounter = await policyModel.getBailPolicyCounter();
        let anotherBranchPolicyCounter = await policyModel.getAnotherBranchPolicyCounter();
        let funeralPolicyCounter = await policyModel.getFuneralPolicyCounter();
        let lifePolicyCounter = await policyModel.getLifePolicyCounter();
        let apPolicyCounter = await policyModel.getAPPolicyCounter();
        let travelPolicyCounter = await policyModel.getTravelPolicyCounter();
        let riskDiverCollectiveCounter = await collectiveModel.getRiskDiverCollectiveCounter();
        let totalPremiumPolicy = await policyModel.getSummaryPolizaCousins();
        let totalPremiumCollective = await collectiveModel.getSummaryCollectiveCousins();
        let totalCommission = await receiptModel.getSumReceiptCommissions(); 
        let totalPremium = 0;
        if ((totalPremiumPolicy[0].primaTotal !== null) && (totalPremiumCollective[0].primaTotal !== null)) {
            totalPremium = totalPremiumPolicy[0].primaTotal + totalPremiumCollective[0].primaTotal;
            totalPremium = totalPremium.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else if ((totalPremiumPolicy[0].primaTotal === null) && (totalPremiumCollective[0].primaTotal === null)) {
            totalPremium = 0;
        } else if (totalPremiumPolicy[0].primaTotal === null){
            totalPremium = totalPremiumCollective[0].primaTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else if (totalPremiumCollective[0].primaTotal === null) {
            totalPremium = totalPremiumPolicy[0].primaTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        }
        if (totalCommission[0].comisionTotal === null) {
            totalCommission[0].comisionTotal = 0;
            totalCommission = totalCommission[0].comisionTotal;
        } else {
            totalCommission = totalCommission[0].comisionTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        }
        let {
            fecha_inicio: fechaInicioPrima, 
            fecha_final: fechaFinPrima,
        } = req.body;
        fechaInicioPrima = new Date(fechaInicioPrima);
        fechaFinPrima = new Date(fechaFinPrima);
        const resultPrimaCobradaNetaAuto = await policyModel.getPremiumCollectedNetVehicleCounter(fechaInicioPrima, fechaFinPrima);
        const primaCobradaNetaAuto = resultPrimaCobradaNetaAuto.map(item => item.prima_cobrada_neta_vehiculo).reduce((prev, curr) => prev + curr, 0);
        const resultPrimaCobradaNetaSalud = await policyModel.getPremiumCollectedNetHealthCounter(fechaInicioPrima, fechaFinPrima);
        const primaCobradaNetaSalud = resultPrimaCobradaNetaSalud.map(item => item.prima_cobrada_neta_salud).reduce((prev, curr) => prev + curr, 0);
        const resultPrimaCobradaNetaPatrimonial = await policyModel.getPremiumCollectedNetPatrimonialCounter(fechaInicioPrima, fechaFinPrima);
        const resultPrimaCobradaNetaFianza = await policyModel.getPremiumCollectedNetBailCounter(fechaInicioPrima, fechaFinPrima);
        const arrayPortfolioComposition = [primaCobradaNetaAuto, primaCobradaNetaSalud, resultPrimaCobradaNetaPatrimonial[0].prima_cobrada_neta_patrimonial, resultPrimaCobradaNetaFianza[0].prima_cobrada_neta_fianza];
        res.render('index', {
            healthPolicyCount: healthCounter,
            autoPolicyCount: autoCounter,
            patrimonialPolicyCount: patrimonialPolicyCounter[0],
            bailPolicyCount: bailPolicyCounter[0],
            anotherBranchPolicyCount: anotherBranchPolicyCounter[0],
            funeralPolicyCount: funeralPolicyCounter[0],
            lifePolicyCount: lifePolicyCounter[0],
            apPolicyCount: apPolicyCounter[0],
            travelPolicyCount: travelPolicyCounter[0],
            riskDiverCollectiveCount: riskDiverCollectiveCounter[0],
            totalPremium,
            totalCommission,
            arrayPortfolioComposition,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    postIndexGraphicPersistence: async (req, res) => {
        let healthPolicyCounter = await policyModel.getHealthPolicyCounter();
        let healthColectiveCounter = await collectiveModel.getHealthCollectiveCounter();
        let healthCounter = healthPolicyCounter[0].health + healthColectiveCounter[0].health;
        let autoPolicyCounter = await policyModel.getAutoPolicyCounter();
        let autoColectiveCounter = await collectiveModel.getAutoCollectiveCounter();
        let autoCounter = autoPolicyCounter[0].auto + autoColectiveCounter[0].auto;
        let patrimonialPolicyCounter = await policyModel.getPatrimonialPolicyCounter();
        let bailPolicyCounter = await policyModel.getBailPolicyCounter();
        let anotherBranchPolicyCounter = await policyModel.getAnotherBranchPolicyCounter();
        let funeralPolicyCounter = await policyModel.getFuneralPolicyCounter();
        let lifePolicyCounter = await policyModel.getLifePolicyCounter();
        let apPolicyCounter = await policyModel.getAPPolicyCounter();
        let travelPolicyCounter = await policyModel.getTravelPolicyCounter();
        let riskDiverCollectiveCounter = await collectiveModel.getRiskDiverCollectiveCounter();
        let totalPremiumPolicy = await policyModel.getSummaryPolizaCousins();
        let totalPremiumCollective = await collectiveModel.getSummaryCollectiveCousins();
        let totalCommission = await receiptModel.getSumReceiptCommissions(); 
        let totalPremium = 0;
        if ((totalPremiumPolicy[0].primaTotal !== null) && (totalPremiumCollective[0].primaTotal !== null)) {
            totalPremium = totalPremiumPolicy[0].primaTotal + totalPremiumCollective[0].primaTotal;
            totalPremium = totalPremium.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else if ((totalPremiumPolicy[0].primaTotal === null) && (totalPremiumCollective[0].primaTotal === null)) {
            totalPremium = 0;
        } else if (totalPremiumPolicy[0].primaTotal === null){
            totalPremium = totalPremiumCollective[0].primaTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else if (totalPremiumCollective[0].primaTotal === null) {
            totalPremium = totalPremiumPolicy[0].primaTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        }
        if (totalCommission[0].comisionTotal === null) {
            totalCommission[0].comisionTotal = 0;
            totalCommission = totalCommission[0].comisionTotal;
        } else {
            totalCommission = totalCommission[0].comisionTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        }
        let {
            fecha_inicio: fechaInicioPrima, 
            fecha_final: fechaFinPrima,
        } = req.body;
        fechaInicioPrima = new Date(fechaInicioPrima);
        fechaFinPrima = new Date(fechaFinPrima);
        const resultPolizaNoRenovadaAuto = await policyModel.getNonRenewedVehiclePolicyCounter(fechaInicioPrima, fechaFinPrima);
        const polizaNoRenovadaAuto = resultPolizaNoRenovadaAuto.map(item => item.poliza_no_renovada_auto).reduce((prev, curr) => prev + curr, 0);
        const resultPolizaNoRenovadaSalud = await policyModel.getNonRenewedHealthPolicyCounter(fechaInicioPrima, fechaFinPrima);
        const polizaNoRenovadaSalud = resultPolizaNoRenovadaSalud.map(item => item.poliza_no_renovada_salud).reduce((prev, curr) => prev + curr, 0);
        const resultPolizaNoRenovadaPatrimonial = await policyModel.getNonRenewedPatrimonialPolicyCounter(fechaInicioPrima, fechaFinPrima);
        const arrayPolizaNoRenovada = [polizaNoRenovadaAuto, polizaNoRenovadaSalud, resultPolizaNoRenovadaPatrimonial[0].poliza_no_renovada_patrimonial];
        const resultPolizaRenovadaAuto = await policyModel.getRenewedVehiclePolicyCounter(fechaInicioPrima, fechaFinPrima);
        const polizaRenovadaAuto = resultPolizaRenovadaAuto.map(item => item.poliza_renovada_auto).reduce((prev, curr) => prev + curr, 0);
        const resultPolizaRenovadaSalud = await policyModel.getRenewedHealthPolicyCounter(fechaInicioPrima, fechaFinPrima);
        const polizaRenovadaSalud = resultPolizaRenovadaSalud.map(item => item.poliza_renovada_salud).reduce((prev, curr) => prev + curr, 0);
        const resultPolizaRenovadaPatrimonial = await policyModel.getRenewedPatrimonialPolicyCounter(fechaInicioPrima, fechaFinPrima);
        const arrayPolizaRenovada = [polizaRenovadaAuto, polizaRenovadaSalud, resultPolizaRenovadaPatrimonial[0].poliza_renovada_patrimonial];
        res.render('index', {
            healthPolicyCount: healthCounter,
            autoPolicyCount: autoCounter,
            patrimonialPolicyCount: patrimonialPolicyCounter[0],
            bailPolicyCount: bailPolicyCounter[0],
            anotherBranchPolicyCount: anotherBranchPolicyCounter[0],
            funeralPolicyCount: funeralPolicyCounter[0],
            lifePolicyCount: lifePolicyCounter[0],
            apPolicyCount: apPolicyCounter[0],
            travelPolicyCount: travelPolicyCounter[0],
            riskDiverCollectiveCount: riskDiverCollectiveCounter[0],
            totalPremium,
            totalCommission,
            arrayPolizaNoRenovada,
            arrayPolizaRenovada,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
}