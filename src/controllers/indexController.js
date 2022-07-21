// Models
const policyModel = require('../models/policy');
const receiptModel = require('../models/receipt');
const collectiveModel = require('../models/collective');
// Serializers
const convertNumberToString = require('../serializers/convertNumberToString');

module.exports = {
/*                  GET                  */
    getIndex: async (req, res) => {
        const healthPolicyCounter = await policyModel.getHealthPolicyCounter();
        const healthColectiveCounter = await collectiveModel.getHealthCollectiveCounter();
        const healthCounter = healthPolicyCounter[0].health + healthColectiveCounter[0].health;
        const autoPolicyCounter = await policyModel.getAutoPolicyCounter();
        const autoColectiveCounter = await collectiveModel.getAutoCollectiveCounter();
        const autoCounter = autoPolicyCounter[0].auto + autoColectiveCounter[0].auto;
        const patrimonialPolicyCounter = await policyModel.getPatrimonialPolicyCounter();
        const bailPolicyCounter = await policyModel.getBailPolicyCounter();
        const anotherBranchPolicyCounter = await policyModel.getAnotherBranchPolicyCounter();
        const funeralPolicyCounter = await policyModel.getFuneralPolicyCounter();
        const lifePolicyCounter = await policyModel.getLifePolicyCounter();
        const apPolicyCounter = await policyModel.getAPPolicyCounter();
        const travelPolicyCounter = await policyModel.getTravelPolicyCounter();
        const riskDiverCollectiveCounter = await collectiveModel.getRiskDiverCollectiveCounter();
        const totalPremiumPolicy = await policyModel.getSummaryPolizaCousins();
        const totalPremiumCollective = await collectiveModel.getSummaryCollectiveCousins();
        const totalCommissionPolicy = await receiptModel.getSumReceiptCommissionsPolicy(); 
        const totalCommissionCollective = await receiptModel.getSumReceiptCommissionsCollective();
        let totalPremium = 0;
        let totalCommission = 0;
        if ((totalPremiumPolicy[0].primaTotalPoliza !== null) && (totalPremiumCollective[0].primaTotalColectivo !== null)) {
            totalPremium = totalPremiumPolicy[0].primaTotalPoliza + totalPremiumCollective[0].primaTotalColectivo;
        } else if (totalPremiumPolicy[0].primaTotalPoliza === null){
            totalPremium = totalPremiumCollective[0].primaTotalColectivo;
        } else if (totalPremiumCollective[0].primaTotalColectivo === null) {
            totalPremium = totalPremiumPolicy[0].primaTotalPoliza;
        }
        totalPremium = convertNumberToString(totalPremium);
        if ((totalCommissionPolicy[0].comisionTotalPoliza !== null) && (totalCommissionCollective[0].comisionTotalColectivo !== null)) {
            totalCommission = totalCommissionPolicy[0].comisionTotalPoliza + totalCommissionCollective[0].comisionTotalColectivo;
        } else if (totalCommissionPolicy[0].comisionTotalPoliza === null){
            totalCommission = totalCommissionCollective[0].comisionTotalColectivo;
        } else if (totalCommissionCollective[0].comisionTotalColectivo === null) {
            totalCommission = totalCommissionPolicy[0].comisionTotalPoliza;
        }
        totalCommission = convertNumberToString(totalCommission);
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
        const healthPolicyCounter = await policyModel.getHealthPolicyCounter();
        const healthColectiveCounter = await collectiveModel.getHealthCollectiveCounter();
        const healthCounter = healthPolicyCounter[0].health + healthColectiveCounter[0].health;
        const autoPolicyCounter = await policyModel.getAutoPolicyCounter();
        const autoColectiveCounter = await collectiveModel.getAutoCollectiveCounter();
        const autoCounter = autoPolicyCounter[0].auto + autoColectiveCounter[0].auto;
        const patrimonialPolicyCounter = await policyModel.getPatrimonialPolicyCounter();
        const bailPolicyCounter = await policyModel.getBailPolicyCounter();
        const anotherBranchPolicyCounter = await policyModel.getAnotherBranchPolicyCounter();
        const funeralPolicyCounter = await policyModel.getFuneralPolicyCounter();
        const lifePolicyCounter = await policyModel.getLifePolicyCounter();
        const apPolicyCounter = await policyModel.getAPPolicyCounter();
        const travelPolicyCounter = await policyModel.getTravelPolicyCounter();
        const riskDiverCollectiveCounter = await collectiveModel.getRiskDiverCollectiveCounter();
        const totalPremiumPolicy = await policyModel.getSummaryPolizaCousins();
        const totalPremiumCollective = await collectiveModel.getSummaryCollectiveCousins();
        const totalCommissionPolicy = await receiptModel.getSumReceiptCommissionsPolicy(); 
        const totalCommissionCollective = await receiptModel.getSumReceiptCommissionsCollective();
        let totalPremium = 0;
        let totalCommission = 0;
        if ((totalPremiumPolicy[0].primaTotalPoliza !== null) && (totalPremiumCollective[0].primaTotalColectivo !== null)) {
            totalPremium = totalPremiumPolicy[0].primaTotalPoliza + totalPremiumCollective[0].primaTotalColectivo;
        } else if (totalPremiumPolicy[0].primaTotalPoliza === null){
            totalPremium = totalPremiumCollective[0].primaTotalColectivo;
        } else if (totalPremiumCollective[0].primaTotalColectivo === null) {
            totalPremium = totalPremiumPolicy[0].primaTotalPoliza;
        }
        totalPremium = convertNumberToString(totalPremium);
        if ((totalCommissionPolicy[0].comisionTotalPoliza !== null) && (totalCommissionCollective[0].comisionTotalColectivo !== null)) {
            totalCommission = totalCommissionPolicy[0].comisionTotalPoliza + totalCommissionCollective[0].comisionTotalColectivo;
        } else if (totalCommissionPolicy[0].comisionTotalPoliza === null){
            totalCommission = totalCommissionCollective[0].comisionTotalColectivo;
        } else if (totalCommissionCollective[0].comisionTotalColectivo === null) {
            totalCommission = totalCommissionPolicy[0].comisionTotalPoliza;
        }
        totalCommission = convertNumberToString(totalCommission);
        try {
            let {
                fecha_inicio: fechaInicioPrima, 
                fecha_final: fechaFinPrima,
            } = req.body;
            fechaInicioPrima = new Date(fechaInicioPrima);
            fechaFinPrima = new Date(fechaFinPrima);
            const resultSiniestralidadAutoPoliza = await policyModel.getVehicleAccidentSumPolicy(fechaInicioPrima, fechaFinPrima);
            const resultSiniestralidadAutoColectivo = await collectiveModel.getVehicleAccidentSumCollective(fechaInicioPrima, fechaFinPrima);
            const siniestralidadAutoTotal = resultSiniestralidadAutoPoliza.map(item => item.siniestralidadVehiculoPoliza).reduce((prev, curr) => prev + curr, 0) + 
                                            resultSiniestralidadAutoColectivo.map(item => item.siniestralidadVehiculoColectivo).reduce((prev, curr) => prev + curr, 0);
            const resultSiniestralidadSaludPoliza = await policyModel.getHealthAccidentSumPolicy(fechaInicioPrima, fechaFinPrima);
            const resultSiniestralidadSaludColectivo = await collectiveModel.getHealthAccidentSumCollective(fechaInicioPrima, fechaFinPrima);
            const siniestralidadSaludTotal = resultSiniestralidadSaludPoliza.map(item => item.siniestralidadSaludPoliza).reduce((prev, curr) => prev + curr, 0) +
                                            resultSiniestralidadSaludColectivo.map(item => item.siniestralidadSaludColectivo).reduce((prev, curr) => prev + curr, 0);
            const resultSiniestralidadPatrimonial = await policyModel.getPatrimonialAccidentSum(fechaInicioPrima, fechaFinPrima);
            const siniestralidadPatrimonialTotal = resultSiniestralidadPatrimonial.map(item => item.siniestralidadPatrimonialPoliza).reduce((prev, curr) => prev + curr, 0);
            const resultSiniestralidadFianza = await policyModel.getBailAccidentSum(fechaInicioPrima, fechaFinPrima);
            const siniestralidadFianzaTotal = resultSiniestralidadFianza.map(item => item.siniestralidadFianzaPoliza).reduce((prev, curr) => prev + curr, 0);
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
        } catch (error) {
            console.log(error);
            res.render('index', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema',
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
        }
    },
    postIndexGraphicPremiumCollected: async (req, res) => {
        const healthPolicyCounter = await policyModel.getHealthPolicyCounter();
        const healthColectiveCounter = await collectiveModel.getHealthCollectiveCounter();
        const healthCounter = healthPolicyCounter[0].health + healthColectiveCounter[0].health;
        const autoPolicyCounter = await policyModel.getAutoPolicyCounter();
        const autoColectiveCounter = await collectiveModel.getAutoCollectiveCounter();
        const autoCounter = autoPolicyCounter[0].auto + autoColectiveCounter[0].auto;
        const patrimonialPolicyCounter = await policyModel.getPatrimonialPolicyCounter();
        const bailPolicyCounter = await policyModel.getBailPolicyCounter();
        const anotherBranchPolicyCounter = await policyModel.getAnotherBranchPolicyCounter();
        const funeralPolicyCounter = await policyModel.getFuneralPolicyCounter();
        const lifePolicyCounter = await policyModel.getLifePolicyCounter();
        const apPolicyCounter = await policyModel.getAPPolicyCounter();
        const travelPolicyCounter = await policyModel.getTravelPolicyCounter();
        const riskDiverCollectiveCounter = await collectiveModel.getRiskDiverCollectiveCounter();
        const totalPremiumPolicy = await policyModel.getSummaryPolizaCousins();
        const totalPremiumCollective = await collectiveModel.getSummaryCollectiveCousins();
        const totalCommissionPolicy = await receiptModel.getSumReceiptCommissionsPolicy(); 
        const totalCommissionCollective = await receiptModel.getSumReceiptCommissionsCollective();
        let totalPremium = 0;
        let totalCommission = 0;
        if ((totalPremiumPolicy[0].primaTotalPoliza !== null) && (totalPremiumCollective[0].primaTotalColectivo !== null)) {
            totalPremium = totalPremiumPolicy[0].primaTotalPoliza + totalPremiumCollective[0].primaTotalColectivo;
        } else if (totalPremiumPolicy[0].primaTotalPoliza === null){
            totalPremium = totalPremiumCollective[0].primaTotalColectivo;
        } else if (totalPremiumCollective[0].primaTotalColectivo === null) {
            totalPremium = totalPremiumPolicy[0].primaTotalPoliza;
        }
        totalPremium = convertNumberToString(totalPremium);
        if ((totalCommissionPolicy[0].comisionTotalPoliza !== null) && (totalCommissionCollective[0].comisionTotalColectivo !== null)) {
            totalCommission = totalCommissionPolicy[0].comisionTotalPoliza + totalCommissionCollective[0].comisionTotalColectivo;
        } else if (totalCommissionPolicy[0].comisionTotalPoliza === null){
            totalCommission = totalCommissionCollective[0].comisionTotalColectivo;
        } else if (totalCommissionCollective[0].comisionTotalColectivo === null) {
            totalCommission = totalCommissionPolicy[0].comisionTotalPoliza;
        }
        totalCommission = convertNumberToString(totalCommission);
        try {
            let {
                fecha_inicio: fechaInicioPrima, 
                fecha_final: fechaFinPrima,
            } = req.body;
            fechaInicioPrima = new Date(fechaInicioPrima);
            fechaFinPrima = new Date(fechaFinPrima);
            const resultPrimaCobrada = await policyModel.getChargedCounterPremium(fechaInicioPrima, fechaFinPrima);
            const primaCobradaTotal = resultPrimaCobrada.map(item => item.prima_cobrada_total).reduce((prev, curr) => prev + curr, 0);
            const resultPrimaDevuelta = await policyModel.getPremiumReturnedCounter(fechaInicioPrima, fechaFinPrima);
            const primaDevueltaTotal = resultPrimaDevuelta.map(item => item.prima_devuelta_total).reduce((prev, curr) => prev + curr, 0);
            const resultPrimaCobradaNeta = await policyModel.getPremiumCollectedNetCounter(fechaInicioPrima, fechaFinPrima);
            const primaCobradaNetaTotal = resultPrimaCobradaNeta.map(item => item.prima_cobrada_neta_total).reduce((prev, curr) => prev + curr, 0);
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
        } catch (error) {
            console.log(error);
            res.render('index', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema',
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
        }
    },
    postIndexGraphicPortfolioComposition: async (req, res) => {
        const healthPolicyCounter = await policyModel.getHealthPolicyCounter();
        const healthColectiveCounter = await collectiveModel.getHealthCollectiveCounter();
        const healthCounter = healthPolicyCounter[0].health + healthColectiveCounter[0].health;
        const autoPolicyCounter = await policyModel.getAutoPolicyCounter();
        const autoColectiveCounter = await collectiveModel.getAutoCollectiveCounter();
        const autoCounter = autoPolicyCounter[0].auto + autoColectiveCounter[0].auto;
        const patrimonialPolicyCounter = await policyModel.getPatrimonialPolicyCounter();
        const bailPolicyCounter = await policyModel.getBailPolicyCounter();
        const anotherBranchPolicyCounter = await policyModel.getAnotherBranchPolicyCounter();
        const funeralPolicyCounter = await policyModel.getFuneralPolicyCounter();
        const lifePolicyCounter = await policyModel.getLifePolicyCounter();
        const apPolicyCounter = await policyModel.getAPPolicyCounter();
        const travelPolicyCounter = await policyModel.getTravelPolicyCounter();
        const riskDiverCollectiveCounter = await collectiveModel.getRiskDiverCollectiveCounter();
        const totalPremiumPolicy = await policyModel.getSummaryPolizaCousins();
        const totalPremiumCollective = await collectiveModel.getSummaryCollectiveCousins();
        const totalCommissionPolicy = await receiptModel.getSumReceiptCommissionsPolicy(); 
        const totalCommissionCollective = await receiptModel.getSumReceiptCommissionsCollective();
        let totalPremium = 0;
        let totalCommission = 0;
        if ((totalPremiumPolicy[0].primaTotalPoliza !== null) && (totalPremiumCollective[0].primaTotalColectivo !== null)) {
            totalPremium = totalPremiumPolicy[0].primaTotalPoliza + totalPremiumCollective[0].primaTotalColectivo;
        } else if (totalPremiumPolicy[0].primaTotalPoliza === null){
            totalPremium = totalPremiumCollective[0].primaTotalColectivo;
        } else if (totalPremiumCollective[0].primaTotalColectivo === null) {
            totalPremium = totalPremiumPolicy[0].primaTotalPoliza;
        }
        totalPremium = convertNumberToString(totalPremium);
        if ((totalCommissionPolicy[0].comisionTotalPoliza !== null) && (totalCommissionCollective[0].comisionTotalColectivo !== null)) {
            totalCommission = totalCommissionPolicy[0].comisionTotalPoliza + totalCommissionCollective[0].comisionTotalColectivo;
        } else if (totalCommissionPolicy[0].comisionTotalPoliza === null){
            totalCommission = totalCommissionCollective[0].comisionTotalColectivo;
        } else if (totalCommissionCollective[0].comisionTotalColectivo === null) {
            totalCommission = totalCommissionPolicy[0].comisionTotalPoliza;
        }
        totalCommission = convertNumberToString(totalCommission);
        try {
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
        } catch (error) {
            console.log(error);
            res.render('index', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema',
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
        }
    },
    postIndexGraphicPersistence: async (req, res) => {
        const healthPolicyCounter = await policyModel.getHealthPolicyCounter();
        const healthColectiveCounter = await collectiveModel.getHealthCollectiveCounter();
        const healthCounter = healthPolicyCounter[0].health + healthColectiveCounter[0].health;
        const autoPolicyCounter = await policyModel.getAutoPolicyCounter();
        const autoColectiveCounter = await collectiveModel.getAutoCollectiveCounter();
        const autoCounter = autoPolicyCounter[0].auto + autoColectiveCounter[0].auto;
        const patrimonialPolicyCounter = await policyModel.getPatrimonialPolicyCounter();
        const bailPolicyCounter = await policyModel.getBailPolicyCounter();
        const anotherBranchPolicyCounter = await policyModel.getAnotherBranchPolicyCounter();
        const funeralPolicyCounter = await policyModel.getFuneralPolicyCounter();
        const lifePolicyCounter = await policyModel.getLifePolicyCounter();
        const apPolicyCounter = await policyModel.getAPPolicyCounter();
        const travelPolicyCounter = await policyModel.getTravelPolicyCounter();
        const riskDiverCollectiveCounter = await collectiveModel.getRiskDiverCollectiveCounter();
        const totalPremiumPolicy = await policyModel.getSummaryPolizaCousins();
        const totalPremiumCollective = await collectiveModel.getSummaryCollectiveCousins();
        const totalCommissionPolicy = await receiptModel.getSumReceiptCommissionsPolicy(); 
        const totalCommissionCollective = await receiptModel.getSumReceiptCommissionsCollective();
        let totalPremium = 0;
        let totalCommission = 0;
        if ((totalPremiumPolicy[0].primaTotalPoliza !== null) && (totalPremiumCollective[0].primaTotalColectivo !== null)) {
            totalPremium = totalPremiumPolicy[0].primaTotalPoliza + totalPremiumCollective[0].primaTotalColectivo;
        } else if (totalPremiumPolicy[0].primaTotalPoliza === null){
            totalPremium = totalPremiumCollective[0].primaTotalColectivo;
        } else if (totalPremiumCollective[0].primaTotalColectivo === null) {
            totalPremium = totalPremiumPolicy[0].primaTotalPoliza;
        }
        totalPremium = convertNumberToString(totalPremium);
        if ((totalCommissionPolicy[0].comisionTotalPoliza !== null) && (totalCommissionCollective[0].comisionTotalColectivo !== null)) {
            totalCommission = totalCommissionPolicy[0].comisionTotalPoliza + totalCommissionCollective[0].comisionTotalColectivo;
        } else if (totalCommissionPolicy[0].comisionTotalPoliza === null){
            totalCommission = totalCommissionCollective[0].comisionTotalColectivo;
        } else if (totalCommissionCollective[0].comisionTotalColectivo === null) {
            totalCommission = totalCommissionPolicy[0].comisionTotalPoliza;
        }
        totalCommission = convertNumberToString(totalCommission);
        try {
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
        } catch (error) {
            console.log(error);
            res.render('index', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema',
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
        }
    },
}