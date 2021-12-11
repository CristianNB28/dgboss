const receiptModel = require('../models/receipt');
const collectiveModel = require('../models/collective');
const policyModel = require('../models/policy');
const insuredModel = require('../models/insured');
const ownAgentModel = require('../models/own_agent');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const receiptInsuredModel = require('../models/receipt_insured');

module.exports = {
/*                  GET                  */
    getReceiptForm: async (req, res) => {
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        res.render('receiptForm', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            policies: resultsPolicies,
            collectives: resultsCollectives,
            ownAgents: resultsOwnAgents,
            name: req.session.name
        });
    },
    getReceipts: async (req, res) => {
        let resultsReceipts =  await receiptModel.getReceipts();
        for (const resultReceipt of resultsReceipts) {
            resultReceipt.fecha_desde_recibo = resultReceipt.fecha_desde_recibo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            resultReceipt.fecha_hasta_recibo = resultReceipt.fecha_hasta_recibo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            resultReceipt.monto_prima_recibo = new Intl.NumberFormat('de-DE').format(resultReceipt.monto_prima_recibo);
            resultReceipt.monto_comision_recibo = new Intl.NumberFormat('de-DE').format(resultReceipt.monto_comision_recibo);
        }
        res.render('receipts', {
            data: resultsReceipts,
            name: req.session.name
        });
    },
/*                 POST                  */
    postVehicleReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = req.body.monto_comision_recibo;
        if ((montoComisionAsociado.indexOf(',') !== -1) && (montoComisionAsociado.indexOf('.') !== -1)) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        } else if (montoComisionAsociado.indexOf(',') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = parseFloat(montoComisionAsociado);
        } else if (montoComisionAsociado.indexOf('.') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        }
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        res.redirect('/sistema/add-vehicle-policy');
    },
    postHealthReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = req.body.monto_comision_recibo;
        if ((montoComisionAsociado.indexOf(',') !== -1) && (montoComisionAsociado.indexOf('.') !== -1)) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        } else if (montoComisionAsociado.indexOf(',') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = parseFloat(montoComisionAsociado);
        } else if (montoComisionAsociado.indexOf('.') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        }
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        let idPolicy = await policyModel.getPolicyLast();
        let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
        let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        if (resultPII[0].asegurado_per_jur_id === null) {
            await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
        } else {
            await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
        }
        res.redirect('/sistema/add-health-policy');
    },
    postPatrimonialReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = req.body.monto_comision_recibo;
        if ((montoComisionAsociado.indexOf(',') !== -1) && (montoComisionAsociado.indexOf('.') !== -1)) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        } else if (montoComisionAsociado.indexOf(',') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = parseFloat(montoComisionAsociado);
        } else if (montoComisionAsociado.indexOf('.') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        }
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        let idPolicy = await policyModel.getPolicyLast();
        let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
        let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        if (resultPII[0].asegurado_per_jur_id === null) {
            await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
        } else {
            await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
        }
        res.redirect('/sistema/add-patrimonial-policy');
    },
    postBailReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = req.body.monto_comision_recibo;
        if ((montoComisionAsociado.indexOf(',') !== -1) && (montoComisionAsociado.indexOf('.') !== -1)) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        } else if (montoComisionAsociado.indexOf(',') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = parseFloat(montoComisionAsociado);
        } else if (montoComisionAsociado.indexOf('.') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        }
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        let idPolicy = await policyModel.getPolicyLast();
        let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
        let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        if (resultPII[0].asegurado_per_jur_id === null) {
            await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
        } else {
            await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
        }
        res.redirect('/sistema/add-bail-policy');
    },
    postAnotherBranchReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = req.body.monto_comision_recibo;
        if ((montoComisionAsociado.indexOf(',') !== -1) && (montoComisionAsociado.indexOf('.') !== -1)) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        } else if (montoComisionAsociado.indexOf(',') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = parseFloat(montoComisionAsociado);
        } else if (montoComisionAsociado.indexOf('.') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        }
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        let idPolicy = await policyModel.getPolicyLast();
        let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
        let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        if (resultPII[0].asegurado_per_jur_id === null) {
            await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
        } else {
            await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
        }
        res.redirect('/sistema/add-another-branch-policy');
    },
    postFuneralReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = req.body.monto_comision_recibo;
        if ((montoComisionAsociado.indexOf(',') !== -1) && (montoComisionAsociado.indexOf('.') !== -1)) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        } else if (montoComisionAsociado.indexOf(',') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = parseFloat(montoComisionAsociado);
        } else if (montoComisionAsociado.indexOf('.') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        }
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        let idPolicy = await policyModel.getPolicyLast();
        let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
        let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        if (resultPII[0].asegurado_per_jur_id === null) {
            await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
        } else {
            await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
        }
        res.redirect('/sistema/add-funeral-policy');
    },
    postLifeReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = req.body.monto_comision_recibo;
        if ((montoComisionAsociado.indexOf(',') !== -1) && (montoComisionAsociado.indexOf('.') !== -1)) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        } else if (montoComisionAsociado.indexOf(',') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = parseFloat(montoComisionAsociado);
        } else if (montoComisionAsociado.indexOf('.') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        }
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        let idPolicy = await policyModel.getPolicyLast();
        let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
        let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        if (resultPII[0].asegurado_per_jur_id === null) {
            await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
        } else {
            await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
        }
        res.redirect('/sistema/add-life-policy');
    },
    postAPReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = req.body.monto_comision_recibo;
        if ((montoComisionAsociado.indexOf(',') !== -1) && (montoComisionAsociado.indexOf('.') !== -1)) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        } else if (montoComisionAsociado.indexOf(',') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = parseFloat(montoComisionAsociado);
        } else if (montoComisionAsociado.indexOf('.') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        }
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        let idPolicy = await policyModel.getPolicyLast();
        let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
        let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        if (resultPII[0].asegurado_per_jur_id === null) {
            await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
        } else {
            await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
        }
        res.redirect('/sistema/add-ap-policy');
    },
    postTravelReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = req.body.monto_comision_recibo;
        if ((montoComisionAsociado.indexOf(',') !== -1) && (montoComisionAsociado.indexOf('.') !== -1)) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        } else if (montoComisionAsociado.indexOf(',') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = parseFloat(montoComisionAsociado);
        } else if (montoComisionAsociado.indexOf('.') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        }
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        let idPolicy = await policyModel.getPolicyLast();
        let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
        let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        if (resultPII[0].asegurado_per_jur_id === null) {
            await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
        } else {
            await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
        }
        res.redirect('/sistema/add-travel-policy');
    },
    postHealthReceiptCollectiveForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = req.body.monto_comision_recibo;
        if ((montoComisionAsociado.indexOf(',') !== -1) && (montoComisionAsociado.indexOf('.') !== -1)) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        } else if (montoComisionAsociado.indexOf(',') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = parseFloat(montoComisionAsociado);
        } else if (montoComisionAsociado.indexOf('.') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        }
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        let idCollective = await collectiveModel.getCollectiveLast();
        let resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective[0].id_colectivo);
        let receipt = await receiptModel.postReceiptCollectiveForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, idCollective, req.body);
        if (resultCII[0].asegurado_per_jur_id === null) {
            await receiptInsuredModel.postReceiptNaturalInsured(resultCII[0].asegurado_per_nat_id, receipt.insertId);
        } else {
            await receiptInsuredModel.postReceiptLegalInsured(resultCII[0].asegurado_per_jur_id, receipt.insertId);
        }
        res.redirect('/sistema/add-health-collective');
    },
    postVehicleReceiptCollectiveForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = req.body.monto_comision_recibo;
        if ((montoComisionAsociado.indexOf(',') !== -1) && (montoComisionAsociado.indexOf('.') !== -1)) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        } else if (montoComisionAsociado.indexOf(',') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = parseFloat(montoComisionAsociado);
        } else if (montoComisionAsociado.indexOf('.') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        }
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        let idCollective = await collectiveModel.getCollectiveLast();
        let resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective[0].id_colectivo);
        let receipt = await receiptModel.postReceiptCollectiveForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, idCollective, req.body);
        if (resultCII[0].asegurado_per_jur_id === null) {
            await receiptInsuredModel.postReceiptNaturalInsured(resultCII[0].asegurado_per_nat_id, receipt.insertId);
        } else {
            await receiptInsuredModel.postReceiptLegalInsured(resultCII[0].asegurado_per_jur_id, receipt.insertId);
        }
        res.redirect('/sistema/add-vehicle-collective');
    },
    postRiskDiverseReceiptCollectiveForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = req.body.monto_comision_recibo;
        if ((montoComisionAsociado.indexOf(',') !== -1) && (montoComisionAsociado.indexOf('.') !== -1)) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        } else if (montoComisionAsociado.indexOf(',') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = parseFloat(montoComisionAsociado);
        } else if (montoComisionAsociado.indexOf('.') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        }
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        let idCollective = await collectiveModel.getCollectiveLast();
        let resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective[0].id_colectivo);
        let receipt = await receiptModel.postReceiptCollectiveForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, idCollective, req.body);
        if (resultCII[0].asegurado_per_jur_id === null) {
            await receiptInsuredModel.postReceiptNaturalInsured(resultCII[0].asegurado_per_nat_id, receipt.insertId);
        } else {
            await receiptInsuredModel.postReceiptLegalInsured(resultCII[0].asegurado_per_jur_id, receipt.insertId);
        }
        res.redirect('/sistema/add-risk-diverse-collective');
    },
    postReceiptForm: async (req, res) => {
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = req.body.monto_prima_recibo;
        let montoComisionAsociado = req.body.monto_comision_recibo;
        let cedulaAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        let resultPolicyId = await policyModel.getPolicyNumberId(req.body.numero_poliza_colectivo);
        let resultCollectiveId = await collectiveModel.getCollectiveNumberId(req.body.numero_poliza_colectivo);
        if ((montoPrimaRecibo.indexOf(',') !== -1) && (montoPrimaRecibo.indexOf('.') !== -1)) {
            montoPrimaRecibo = montoPrimaRecibo.replace(",", ".");
            montoPrimaRecibo = montoPrimaRecibo.replace(".", ",");
            montoPrimaRecibo = parseFloat(montoPrimaRecibo.replace(/,/g,''));
        } else if (montoPrimaRecibo.indexOf(',') !== -1) {
            montoPrimaRecibo = montoPrimaRecibo.replace(",", ".");
            montoPrimaRecibo = parseFloat(montoPrimaRecibo);
        } else if (montoPrimaRecibo.indexOf('.') !== -1) {
            montoPrimaRecibo = montoPrimaRecibo.replace(".", ",");
            montoPrimaRecibo = parseFloat(montoPrimaRecibo.replace(/,/g,''));
        }
        if ((montoComisionAsociado.indexOf(',') !== -1) && (montoComisionAsociado.indexOf('.') !== -1)) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        } else if (montoComisionAsociado.indexOf(',') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(",", ".");
            montoComisionAsociado = parseFloat(montoComisionAsociado);
        } else if (montoComisionAsociado.indexOf('.') !== -1) {
            montoComisionAsociado = montoComisionAsociado.replace(".", ",");
            montoComisionAsociado = parseFloat(montoComisionAsociado.replace(/,/g,''));
        }
        if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (resultPolicyId.length === 0) {
            let receipt = await receiptModel.postReceiptCollectiveForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, resultCollectiveId, req.body);
            if (rifAseguradoJuridico === '') {
                let resultNaturalId = await insuredModel.getNaturalInsuredId(cedulaAseguradoNatural);
                await receiptInsuredModel.postReceiptNaturalInsured(resultNaturalId[0].id_asegurado_per_nat, receipt.insertId);
            } else {
                let resultLegalId = await insuredModel.getLegalInsuredId(rifAseguradoJuridico);
                await receiptInsuredModel.postReceiptLegalInsured(resultLegalId[0].id_asegurado_per_jur, receipt.insertId);
            }
        } else {
            let receipt = await receiptModel.postReceiptPolicyForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, resultPolicyId, req.body);
            if (rifAseguradoJuridico === '') {
                let resultNaturalId = await insuredModel.getNaturalInsuredId(cedulaAseguradoNatural);
                await receiptInsuredModel.postReceiptNaturalInsured(resultNaturalId[0].id_asegurado_per_nat, receipt.insertId);
            } else {
                let resultLegalId = await insuredModel.getLegalInsuredId(rifAseguradoJuridico);
                await receiptInsuredModel.postReceiptLegalInsured(resultLegalId[0].id_asegurado_per_jur, receipt.insertId);
            }
        }
        res.render('receiptForm', {
            alert: true,
            alertTitle: 'Exitoso',
            alertMessage: 'Se registraron los datos exitosamente',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'sistema',
            name: req.session.name,
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            policies: resultsPolicies,
            collectives: resultsCollectives,
            ownAgents: resultsOwnAgents,
        });
    },
/*                  PUT                  */
    putReceipt: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idReceipt = req.params.id;
        if (idReceipt.match(valoresAceptados)) {
            let resultReceipt = await receiptModel.getReceipt(idReceipt);
            let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            let resultsLegalInsureds = await insuredModel.getLegalInsureds();
            let resultsPolicies = await policyModel.getPolicies();
            let resultsCollectives = await collectiveModel.getCollectives();
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultPolicy = [];
            let resultCollective = [];
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            let resultOwnAgent = [];
            let fechaDesdeRecibo = resultReceipt[0].fecha_desde_recibo.toISOString().substring(0, 10);
            let fechaHastaRecibo = resultReceipt[0].fecha_hasta_recibo.toISOString().substring(0, 10);
            let primaRecibo = resultReceipt[0].monto_prima_recibo;
            primaRecibo = new Intl.NumberFormat('de-DE').format(primaRecibo);
            let comisionRecibo = resultReceipt[0].monto_comision_recibo;
            comisionRecibo = new Intl.NumberFormat('de-DE').format(comisionRecibo);
            if (resultReceipt[0].colectivo_id === null) {
                resultPolicy = await policyModel.getPolicy(resultReceipt[0].poliza_id);
                let resultReceiptInsured = await receiptInsuredModel.getReceiptInsured(resultReceipt[0].id_recibo);
                if (resultReceiptInsured[0].asegurado_per_jur_id === null) {
                    resultNaturalInsured = await insuredModel.getNaturalInsured(resultReceiptInsured[0].asegurado_per_nat_id);
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                } else {
                    resultLegalInsured = await insuredModel.getLegalInsured(resultReceiptInsured[0].asegurado_per_jur_id);
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                }
            } else {
                resultCollective = await collectiveModel.getCollective(resultReceipt[0].colectivo_id);
                let resultReceiptInsured = await receiptInsuredModel.getReceiptInsured(resultReceipt[0].id_recibo);
                if (resultReceiptInsured[0].asegurado_per_jur_id === null) {
                    resultNaturalInsured = await insuredModel.getNaturalInsured(resultReceiptInsured[0].asegurado_per_nat_id);
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                } else {
                    resultLegalInsured = await insuredModel.getLegalInsured(resultReceiptInsured[0].asegurado_per_jur_id);
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                }
            }
            res.render('editReceipt', {
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                ownAgents: resultsOwnAgents,
                fechaDesdeRecibo: fechaDesdeRecibo,
                fechaHastaRecibo: fechaHastaRecibo,
                primaRecibo: primaRecibo,
                comisionRecibo: comisionRecibo,
                policy: resultPolicy[0],
                collective: resultCollective[0],
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updateReceipt: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = req.body.monto_prima_recibo;
        let montoComisionRecibo = req.body.monto_comision_recibo;
        let numeroPago = parseInt(req.body.numero_pago_recibo);
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        let resultPolicyId = await policyModel.getPolicyNumberId(req.body.numero_poliza_colectivo);
        let resultCollectiveId = await collectiveModel.getCollectiveNumberId(req.body.numero_poliza_colectivo);
        let cedulaAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        if ((montoPrimaRecibo.indexOf(',') !== -1) && (montoPrimaRecibo.indexOf('.') !== -1)) {
            montoPrimaRecibo = montoPrimaRecibo.replace(",", ".");
            montoPrimaRecibo = montoPrimaRecibo.replace(".", ",");
            montoPrimaRecibo = parseFloat(montoPrimaRecibo.replace(/,/g,''));
        } else if (montoPrimaRecibo.indexOf(',') !== -1) {
            montoPrimaRecibo = montoPrimaRecibo.replace(",", ".");
            montoPrimaRecibo = parseFloat(montoPrimaRecibo);
        } else if (montoPrimaRecibo.indexOf('.') !== -1) {
            montoPrimaRecibo = montoPrimaRecibo.replace(".", ",");
            montoPrimaRecibo = parseFloat(montoPrimaRecibo.replace(/,/g,''));
        }
        if ((montoComisionRecibo.indexOf(',') !== -1) && (montoComisionRecibo.indexOf('.') !== -1)) {
            montoComisionRecibo = montoComisionRecibo.replace(",", ".");
            montoComisionRecibo = montoComisionRecibo.replace(".", ",");
            montoComisionRecibo = parseFloat(montoComisionRecibo.replace(/,/g,''));
        } else if (montoComisionRecibo.indexOf(',') !== -1) {
            montoComisionRecibo = montoComisionRecibo.replace(",", ".");
            montoComisionRecibo = parseFloat(montoComisionRecibo);
        } else if (montoComisionRecibo.indexOf('.') !== -1) {
            montoComisionRecibo = montoComisionRecibo.replace(".", ",");
            montoComisionRecibo = parseFloat(montoComisionRecibo.replace(/,/g,''));
        }
        if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (resultPolicyId.length === 0) {
            let policyId = null;
            await receiptModel.updateReceiptCollective(fraccionamiento, montoPrimaRecibo, montoComisionRecibo, numeroPago, fechaDesdeRecibo, fechaHastaRecibo, policyId, resultCollectiveId, req.body);
            if (rifAseguradoJuridico === '') {
                let legalId = null;
                let resultNaturalId = await insuredModel.getNaturalInsuredId(cedulaAseguradoNatural);
                await receiptInsuredModel.updateReceiptNaturalInsured(legalId, resultNaturalId[0].id_asegurado_per_nat, req.body.id_recibo);
            } else {
                let naturalId = null;
                let resultLegalId = await insuredModel.getLegalInsuredId(rifAseguradoJuridico);
                await receiptInsuredModel.updateReceiptLegalInsured(naturalId, resultLegalId[0].id_asegurado_per_jur, req.body.id_recibo);
            }
        } else {
            let collectiveId = null;
            await receiptModel.updateReceiptPolicy(fraccionamiento, montoPrimaRecibo, montoComisionRecibo, numeroPago, fechaDesdeRecibo, fechaHastaRecibo, collectiveId, resultPolicyId, req.body);
            if (rifAseguradoJuridico === '') {
                let legalId = null;
                let resultNaturalId = await insuredModel.getNaturalInsuredId(cedulaAseguradoNatural);
                await receiptInsuredModel.updateReceiptNaturalInsured(legalId, resultNaturalId[0].id_asegurado_per_nat, req.body.id_recibo);
            } else {
                let naturalId = null;
                let resultLegalId = await insuredModel.getLegalInsuredId(rifAseguradoJuridico);
                await receiptInsuredModel.updateReceiptLegalInsured(naturalId, resultLegalId[0].id_asegurado_per_jur, req.body.id_recibo);
            }
        }
        res.redirect('/sistema');
    },
/*               DELETE                  */
    disableReceipt: async (req, res) => {
        let disableReceipt = 1;
        let disableReciboAsegurado = 1;
        let resultReceipt = await receiptModel.getReceipt(req.params.id);
        await receiptInsuredModel.disableReceiptInsured(resultReceipt[0].id_recibo, disableReciboAsegurado);
        await receiptModel.updateDisableReceipt(req.params.id, req.body);
        await receiptModel.disableReceipt(req.params.id, disableReceipt); 
        res.redirect('/sistema/receipts');
    } 
}