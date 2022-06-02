const receiptModel = require('../models/receipt');
const collectiveModel = require('../models/collective');
const policyModel = require('../models/policy');
const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const ownAgentModel = require('../models/own_agent');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const executiveModel = require('../models/executive');

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
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getReceipts: async (req, res) => {
        let resultsReceipts =  await receiptModel.getReceipts();
        for (const resultReceipt of resultsReceipts) {
            let resultPolicy = [];
            let resultCollective = [];
            if (resultReceipt.colectivo_id === null) {
                resultPolicy = await policyModel.getPolicy(resultReceipt.poliza_id);
            } else if (resultReceipt.poliza_id === null) {
                resultCollective = await collectiveModel.getCollective(resultReceipt.colectivo_id);
            }
            if (resultReceipt.fecha_desde_recibo === null) {
                resultReceipt.fecha_desde_recibo = '';
            } else {
                resultReceipt.fecha_desde_recibo = resultReceipt.fecha_desde_recibo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
                resultReceipt.fecha_hasta_recibo = resultReceipt.fecha_hasta_recibo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            }
            let primaReceipt = resultReceipt.monto_prima_recibo;
            let comisionReceipt = resultReceipt.monto_comision_recibo;
            if (primaReceipt.toString().includes('.') === true) {
                resultReceipt.monto_prima_recibo = resultReceipt.monto_prima_recibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                resultReceipt.monto_prima_recibo = String(resultReceipt.monto_prima_recibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (comisionReceipt.toString().includes('.') === true) {
                resultReceipt.monto_comision_recibo = resultReceipt.monto_comision_recibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                resultReceipt.monto_comision_recibo = String(resultReceipt.monto_comision_recibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultCollective.length === 0) {
                if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
                    resultReceipt.monto_prima_recibo = `Bs ${resultReceipt.monto_prima_recibo}`;
                    resultReceipt.monto_comision_recibo = `Bs ${resultReceipt.monto_comision_recibo}`;
                } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
                    resultReceipt.monto_prima_recibo = `$ ${resultReceipt.monto_prima_recibo}`;
                    resultReceipt.monto_comision_recibo = `$ ${resultReceipt.monto_comision_recibo}`;
                } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
                    resultReceipt.monto_prima_recibo = `€ ${resultReceipt.monto_prima_recibo}`;
                    resultReceipt.monto_comision_recibo = `€ ${resultReceipt.monto_comision_recibo}`;
                }
            } else {
                if (resultCollective[0].tipo_moneda_colectivo === 'BOLÍVAR') {
                    resultReceipt.monto_prima_recibo = `Bs ${resultReceipt.monto_prima_recibo}`;
                    resultReceipt.monto_comision_recibo = `Bs ${resultReceipt.monto_comision_recibo}`;
                } else if (resultCollective[0].tipo_moneda_colectivo === 'DÓLAR') {
                    resultReceipt.monto_prima_recibo = `$ ${resultReceipt.monto_prima_recibo}`;
                    resultReceipt.monto_comision_recibo = `$ ${resultReceipt.monto_comision_recibo}`;
                } else if (resultCollective[0].tipo_moneda_colectivo === 'EUROS') {
                    resultReceipt.monto_prima_recibo = `€ ${resultReceipt.monto_prima_recibo}`;
                    resultReceipt.monto_comision_recibo = `€ ${resultReceipt.monto_comision_recibo}`;
                }
            }
        }
        res.render('receipts', {
            data: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
/*                 POST                  */
    postVehicleReceiptForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsPolicies = await policyModel.getPolicies();
        try {
            let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
            let montoPrimaRecibo = req.body.monto_prima_recibo;
            let montoComisionAsociado = req.body.monto_comision_recibo;
            let fechaDesdeRecibo = null;
            let fechaHastaRecibo = null;
            let fechaPagoRecibo = null;
            montoPrimaRecibo = montoPrimaRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionAsociado = montoComisionAsociado.replace(/[Bs$€]/g, '').replace(' ', '');
            if (req.body.fecha_pago_recibo !== '') {
                fechaPagoRecibo = new Date(req.body.fecha_pago_recibo);
            }
            if (req.body.fecha_desde_recibo !== '') {
                fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
            }
            if (req.body.fecha_hasta_recibo !== '') {
                fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
            }
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
            let idPolicy = await policyModel.getPolicyLast();
            let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
            let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, req.body);
            if (resultPII[0].asegurado_per_jur_id === null) {
                await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
            } else {
                await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
            }
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.redirect('/sistema/add-vehicle-policy');
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.redirect('/sistema/add-subscription-vehicle-policy');
            }
        } catch (error) {
            console.log(error);
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.render('vehiclePolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-vehicle-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgents: resultsOwnAgents,
                    executives: resultsExecutives,
                    receipts: resultsReceipts,
                    policies: resultsPolicies,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.render('subscriptionVehiclePolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-subscription-vehicle-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    policies: resultsPolicies,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    postHealthReceiptForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsPolicies = await policyModel.getPolicies();
        try {
            let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
            let montoPrimaRecibo = req.body.monto_prima_recibo;
            let montoComisionAsociado = req.body.monto_comision_recibo;
            let fechaDesdeRecibo = null;
            let fechaHastaRecibo = null;
            let fechaPagoRecibo = null;
            montoPrimaRecibo = montoPrimaRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionAsociado = montoComisionAsociado.replace(/[Bs$€]/g, '').replace(' ', '');
            if (req.body.fecha_pago_recibo !== '') {
                fechaPagoRecibo = new Date(req.body.fecha_pago_recibo);
            }
            if (req.body.fecha_desde_recibo !== '') {
                fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
            }
            if (req.body.fecha_hasta_recibo !== '') {
                fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
            }
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
            let idPolicy = await policyModel.getPolicyLast();
            let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
            let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, req.body);
            if (resultPII[0].asegurado_per_jur_id === null) {
                await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
            } else {
                await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
            }
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.redirect('/sistema/add-health-policy');
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.redirect('/sistema/add-subscription-health-policy');
            }
        } catch (error) {
            console.log(error);
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.render('healthPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-health-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgents: resultsOwnAgents,
                    executives: resultsExecutives,
                    receipts: resultsReceipts,
                    policies: resultsPolicies,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.render('subscriptionHealthPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-subscription-health-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    policies: resultsPolicies,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    postPatrimonialReceiptForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsPolicies = await policyModel.getPolicies();
        try {
            let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
            let montoPrimaRecibo = req.body.monto_prima_recibo;
            let montoComisionAsociado = req.body.monto_comision_recibo;
            let fechaDesdeRecibo = null;
            let fechaHastaRecibo = null;
            let fechaPagoRecibo = null;
            montoPrimaRecibo = montoPrimaRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionAsociado = montoComisionAsociado.replace(/[Bs$€]/g, '').replace(' ', '');
            if (req.body.fecha_pago_recibo !== '') {
                fechaPagoRecibo = new Date(req.body.fecha_pago_recibo);
            }
            if (req.body.fecha_desde_recibo !== '') {
                fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
            }
            if (req.body.fecha_hasta_recibo !== '') {
                fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
            }
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
            let idPolicy = await policyModel.getPolicyLast();
            let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
            let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, req.body);
            if (resultPII[0].asegurado_per_jur_id === null) {
                await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
            } else {
                await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
            }
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.redirect('/sistema/add-patrimonial-policy');
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.redirect('/sistema/add-subscription-patrimonial-policy');
            }
        } catch (error) {
            console.log(error);
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.render('patrimonialPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-patrimonial-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgents: resultsOwnAgents,
                    executives: resultsExecutives,
                    receipts: resultsReceipts,
                    policies: resultsPolicies,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.render('subscriptionPatrimonialPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-subscription-patrimonial-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    policies: resultsPolicies,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    postBailReceiptForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsPolicies = await policyModel.getPolicies();
        try {
            let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
            let montoPrimaRecibo = req.body.monto_prima_recibo;
            let montoComisionAsociado = req.body.monto_comision_recibo;
            let fechaDesdeRecibo = null;
            let fechaHastaRecibo = null;
            let fechaPagoRecibo = null;
            montoPrimaRecibo = montoPrimaRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionAsociado = montoComisionAsociado.replace(/[Bs$€]/g, '').replace(' ', '');
            if (req.body.fecha_pago_recibo !== '') {
                fechaPagoRecibo = new Date(req.body.fecha_pago_recibo);
            }
            if (req.body.fecha_desde_recibo !== '') {
                fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
            }
            if (req.body.fecha_hasta_recibo !== '') {
                fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
            }
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
            let idPolicy = await policyModel.getPolicyLast();
            let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
            let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, req.body);
            if (resultPII[0].asegurado_per_jur_id === null) {
                await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
            } else {
                await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
            }
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.redirect('/sistema/add-bail-policy');
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.redirect('/sistema/add-subscription-bail-policy');
            }
        } catch (error) {
            console.log(error);
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.render('bailPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-bail-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgents: resultsOwnAgents,
                    executives: resultsExecutives,
                    receipts: resultsReceipts,
                    policies: resultsPolicies,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.render('subscriptionBailPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-subscription-bail-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    policies: resultsPolicies,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    postAnotherBranchReceiptForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsPolicies = await policyModel.getPolicies();
        try {
            let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
            let montoPrimaRecibo = req.body.monto_prima_recibo;
            let montoComisionAsociado = req.body.monto_comision_recibo;
            let fechaDesdeRecibo = null;
            let fechaHastaRecibo = null;
            let fechaPagoRecibo = null;
            montoPrimaRecibo = montoPrimaRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionAsociado = montoComisionAsociado.replace(/[Bs$€]/g, '').replace(' ', '');
            if (req.body.fecha_pago_recibo !== '') {
                fechaPagoRecibo = new Date(req.body.fecha_pago_recibo);
            }
            if (req.body.fecha_desde_recibo !== '') {
                fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
            }
            if (req.body.fecha_hasta_recibo !== '') {
                fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
            }
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
            let idPolicy = await policyModel.getPolicyLast();
            let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
            let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, req.body);
            if (resultPII[0].asegurado_per_jur_id === null) {
                await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
            } else {
                await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
            }
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.redirect('/sistema/add-another-branch-policy');
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.redirect('/sistema/add-subscription-another-branch-policy');
            }
        } catch (error) {
            console.log(error);
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.render('anotherBranchPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-another-branch-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgents: resultsOwnAgents,
                    executives: resultsExecutives,
                    receipts: resultsReceipts,
                    policies: resultsPolicies,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.render('subscriptionAnotherBranchPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-subscription-another-branch-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    policies: resultsPolicies,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    postFuneralReceiptForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsPolicies = await policyModel.getPolicies();
        try {
            let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
            let montoPrimaRecibo = req.body.monto_prima_recibo;
            let montoComisionAsociado = req.body.monto_comision_recibo;
            let fechaDesdeRecibo = null;
            let fechaHastaRecibo = null;
            let fechaPagoRecibo = null;
            montoPrimaRecibo = montoPrimaRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionAsociado = montoComisionAsociado.replace(/[Bs$€]/g, '').replace(' ', '');
            if (req.body.fecha_pago_recibo !== '') {
                fechaPagoRecibo = new Date(req.body.fecha_pago_recibo);
            }
            if (req.body.fecha_desde_recibo !== '') {
                fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
            }
            if (req.body.fecha_hasta_recibo !== '') {
                fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
            }
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
            let idPolicy = await policyModel.getPolicyLast();
            let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
            let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, req.body);
            if (resultPII[0].asegurado_per_jur_id === null) {
                await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
            } else {
                await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
            }
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.redirect('/sistema/add-funeral-policy');
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.redirect('/sistema/add-subscription-funeral-policy');
            }
        } catch (error) {
            console.log(error);
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.render('funeralPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-funeral-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgents: resultsOwnAgents,
                    executives: resultsExecutives,
                    receipts: resultsReceipts,
                    policies: resultsPolicies,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.render('subscriptionFuneralPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-subscription-funeral-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    policies: resultsPolicies,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    postLifeReceiptForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsPolicies = await policyModel.getPolicies();
        try {
            let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
            let montoPrimaRecibo = req.body.monto_prima_recibo;
            let montoComisionAsociado = req.body.monto_comision_recibo;
            let fechaDesdeRecibo = null;
            let fechaHastaRecibo = null;
            let fechaPagoRecibo = null;
            montoPrimaRecibo = montoPrimaRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionAsociado = montoComisionAsociado.replace(/[Bs$€]/g, '').replace(' ', '');
            if (req.body.fecha_pago_recibo !== '') {
                fechaPagoRecibo = new Date(req.body.fecha_pago_recibo);
            }
            if (req.body.fecha_desde_recibo !== '') {
                fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
            }
            if (req.body.fecha_hasta_recibo !== '') {
                fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
            }
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
            let idPolicy = await policyModel.getPolicyLast();
            let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
            let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, req.body);
            if (resultPII[0].asegurado_per_jur_id === null) {
                await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
            } else {
                await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
            }
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.redirect('/sistema/add-life-policy');
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.redirect('/sistema/add-subscription-life-policy');
            }
        } catch (error) {
            console.log(error);
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.render('lifePolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-life-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgents: resultsOwnAgents,
                    executives: resultsExecutives,
                    receipts: resultsReceipts,
                    policies: resultsPolicies,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.render('subscriptionLifePolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-subscription-life-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    policies: resultsPolicies,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    postAPReceiptForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsPolicies = await policyModel.getPolicies();
        try {
            let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
            let montoPrimaRecibo = req.body.monto_prima_recibo;
            let montoComisionAsociado = req.body.monto_comision_recibo;
            let fechaDesdeRecibo = null;
            let fechaHastaRecibo = null;
            let fechaPagoRecibo = null;
            montoPrimaRecibo = montoPrimaRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionAsociado = montoComisionAsociado.replace(/[Bs$€]/g, '').replace(' ', '');
            if (req.body.fecha_pago_recibo !== '') {
                fechaPagoRecibo = new Date(req.body.fecha_pago_recibo);
            }
            if (req.body.fecha_desde_recibo !== '') {
                fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
            }
            if (req.body.fecha_hasta_recibo !== '') {
                fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
            }
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
            let idPolicy = await policyModel.getPolicyLast();
            let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
            let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, req.body);
            if (resultPII[0].asegurado_per_jur_id === null) {
                await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
            } else {
                await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
            }
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.redirect('/sistema/add-ap-policy');
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.redirect('/sistema/add-subscription-ap-policy');
            }
        } catch (error) {
            console.log(error);
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.render('apPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-ap-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgents: resultsOwnAgents,
                    executives: resultsExecutives,
                    receipts: resultsReceipts,
                    policies: resultsPolicies,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.render('subscriptionApPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-subscription-ap-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    policies: resultsPolicies,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    postTravelReceiptForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsPolicies = await policyModel.getPolicies();
        try {
            let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
            let montoPrimaRecibo = req.body.monto_prima_recibo;
            let montoComisionAsociado = req.body.monto_comision_recibo;
            let fechaDesdeRecibo = null;
            let fechaHastaRecibo = null;
            let fechaPagoRecibo = null;
            montoPrimaRecibo = montoPrimaRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionAsociado = montoComisionAsociado.replace(/[Bs$€]/g, '').replace(' ', '');
            if (req.body.fecha_pago_recibo !== '') {
                fechaPagoRecibo = new Date(req.body.fecha_pago_recibo);
            }
            if (req.body.fecha_desde_recibo !== '') {
                fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
            }
            if (req.body.fecha_hasta_recibo !== '') {
                fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
            }
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
            let idPolicy = await policyModel.getPolicyLast();
            let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy[0].id_poliza);
            let receipt = await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, req.body);
            if (resultPII[0].asegurado_per_jur_id === null) {
                await receiptInsuredModel.postReceiptNaturalInsured(resultPII[0].asegurado_per_nat_id, receipt.insertId);
            } else {
                await receiptInsuredModel.postReceiptLegalInsured(resultPII[0].asegurado_per_jur_id, receipt.insertId);
            }
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.redirect('/sistema/add-travel-policy');
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.redirect('/sistema/add-subscription-travel-policy');
            }
        } catch (error) {
            console.log(error);
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.render('travelPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-travel-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgents: resultsOwnAgents,
                    executives: resultsExecutives,
                    receipts: resultsReceipts,
                    policies: resultsPolicies,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.render('subscriptionTravelPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-subscription-travel-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    policies: resultsPolicies,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    postHealthReceiptCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsCollective = await collectiveModel.getCollectives();
        try {
            let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
            let montoPrimaRecibo = req.body.monto_prima_recibo;
            let montoComisionAsociado = req.body.monto_comision_recibo;
            let fechaDesdeRecibo = null;
            let fechaHastaRecibo = null;
            let fechaPagoRecibo = null;
            montoPrimaRecibo = montoPrimaRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionAsociado = montoComisionAsociado.replace(/[Bs$€]/g, '').replace(' ', '');
            if (req.body.fecha_pago_recibo !== '') {
                fechaPagoRecibo = new Date(req.body.fecha_pago_recibo);
            }
            if (req.body.fecha_desde_recibo !== '') {
                fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
            }
            if (req.body.fecha_hasta_recibo !== '') {
                fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
            }
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
            let idCollective = await collectiveModel.getCollectiveLast();
            let resultsCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective[0].id_colectivo);
            let receipt = await receiptModel.postReceiptCollectiveForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, idCollective, req.body);
            if (resultsCII[0].asegurado_per_jur_id === null) {
                for (const resultCII of resultsCII) {
                    await receiptInsuredModel.postReceiptNaturalInsured(resultCII.asegurado_per_nat_id, receipt.insertId);
                }
            } else {
                for (const resultCII of resultsCII) {
                    await receiptInsuredModel.postReceiptLegalInsured(resultCII.asegurado_per_jur_id, receipt.insertId);
                }
            }
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.redirect('/sistema/add-health-collective');
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.redirect('/sistema/add-subscription-health-collective');
            }
        } catch (error) {
            console.log(error);
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.render('healthCollectiveForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-health-collective',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgents: resultsOwnAgents,
                    executives: resultsExecutives,
                    receipts: resultsReceipts,
                    collectives: resultsCollective,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.render('subscriptionHealthCollectiveForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-subscription-health-collective',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgents: resultsOwnAgents,
                    executives: resultsExecutives,
                    receipts: resultsReceipts,
                    collectives: resultsCollective,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    postVehicleReceiptCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsCollective = await collectiveModel.getCollectives();
        try {
            let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
            let montoPrimaRecibo = req.body.monto_prima_recibo;
            let montoComisionAsociado = req.body.monto_comision_recibo;
            let fechaDesdeRecibo = null;
            let fechaHastaRecibo = null;
            let fechaPagoRecibo = null;
            montoPrimaRecibo = montoPrimaRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionAsociado = montoComisionAsociado.replace(/[Bs$€]/g, '').replace(' ', '');
            if (req.body.fecha_pago_recibo !== '') {
                fechaPagoRecibo = new Date(req.body.fecha_pago_recibo);
            }
            if (req.body.fecha_desde_recibo !== '') {
                fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
            }
            if (req.body.fecha_hasta_recibo !== '') {
                fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
            }
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
            let idCollective = await collectiveModel.getCollectiveLast();
            let resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective[0].id_colectivo);
            let receipt = await receiptModel.postReceiptCollectiveForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, idCollective, req.body);
            if (resultCII[0].asegurado_per_jur_id === null) {
                await receiptInsuredModel.postReceiptNaturalInsured(resultCII[0].asegurado_per_nat_id, receipt.insertId);
            } else {
                await receiptInsuredModel.postReceiptLegalInsured(resultCII[0].asegurado_per_jur_id, receipt.insertId);
            }
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.redirect('/sistema/add-vehicle-collective');
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.redirect('/sistema/add-subscription-vehicle-collective');
            }
        } catch (error) {
            console.log(error);
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.render('vehicleCollectiveForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-vehicle-collective',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgents: resultsOwnAgents,
                    executives: resultsExecutives,
                    receipts: resultsReceipts,
                    collectives: resultsCollective,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.render('subscriptionVehicleCollectiveForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-subscription-vehicle-collective',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgents: resultsOwnAgents,
                    executives: resultsExecutives,
                    receipts: resultsReceipts,
                    collectives: resultsCollective,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    postRiskDiverseReceiptCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsCollective = await collectiveModel.getCollectives();
        try {
            let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
            let montoPrimaRecibo = req.body.monto_prima_recibo;
            let montoComisionAsociado = req.body.monto_comision_recibo;
            let fechaDesdeRecibo = null;
            let fechaHastaRecibo = null;
            let fechaPagoRecibo = null;
            montoPrimaRecibo = montoPrimaRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionAsociado = montoComisionAsociado.replace(/[Bs$€]/g, '').replace(' ', '');
            if (req.body.fecha_pago_recibo !== '') {
                fechaPagoRecibo = new Date(req.body.fecha_pago_recibo);
            }
            if (req.body.fecha_desde_recibo !== '') {
                fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
            }
            if (req.body.fecha_hasta_recibo !== '') {
                fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
            }
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
            let idCollective = await collectiveModel.getCollectiveLast();
            let resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective[0].id_colectivo);
            let receipt = await receiptModel.postReceiptCollectiveForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, idCollective, req.body);
            if (resultCII[0].asegurado_per_jur_id === null) {
                await receiptInsuredModel.postReceiptNaturalInsured(resultCII[0].asegurado_per_nat_id, receipt.insertId);
            } else {
                await receiptInsuredModel.postReceiptLegalInsured(resultCII[0].asegurado_per_jur_id, receipt.insertId);
            }
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.redirect('/sistema/add-risk-diverse-collective');
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.redirect('/sistema/add-subscription-risk-diverse-collective');
            }
        } catch (error) {
            console.log(error);
            if (req.cookies.rol === 'ADMINISTRATIVO') {
                res.render('riskDiverseCollectiveForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-risk-diverse-collective',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgents: resultsOwnAgents,
                    executives: resultsExecutives,
                    receipts: resultsReceipts,
                    collectives: resultsCollective,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.render('subscriptionRiskDiverseCollectiveForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-subscription-risk-diverse-collective',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgents: resultsOwnAgents,
                    executives: resultsExecutives,
                    receipts: resultsReceipts,
                    collectives: resultsCollective,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    postReceiptForm: async (req, res) => {
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
            let montoPrimaRecibo = req.body.monto_prima_recibo;
            let montoComisionAsociado = req.body.monto_comision_recibo;
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let fechaDesdeRecibo = null;
            let fechaHastaRecibo = null;
            let fechaPagoRecibo = null;
            montoPrimaRecibo = montoPrimaRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionAsociado = montoComisionAsociado.replace(/[Bs$€]/g, '').replace(' ', '');
            if (req.body.fecha_pago_recibo !== '') {
                fechaPagoRecibo = new Date(req.body.fecha_pago_recibo);
            }
            if (req.body.fecha_desde_recibo !== '') {
                fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
            }
            if (req.body.fecha_hasta_recibo !== '') {
                fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
            }
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
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (resultPolicyId.length === 0) {
                let receipt = await receiptModel.postReceiptCollectiveForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, resultCollectiveId, req.body);
                if (rifAseguradoJuridico === '') {
                    let resultNaturalId = await insuredModel.getNaturalInsuredId(cedulaAseguradoNatural);
                    await receiptInsuredModel.postReceiptNaturalInsured(resultNaturalId[0].id_asegurado_per_nat, receipt.insertId);
                    const resultNaturalInsured = resultsNaturalInsureds.filter(naturalInsured => naturalInsured.id_asegurado_per_nat === resultNaturalId[0].id_asegurado_per_nat);
                    if (resultNaturalInsured[0].agente_propio_id === null) {
                        nombreCompletoAgentePropio = req.body.nombre_agente_propio;
                        let nombreAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
                        let apellidoAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
                        let idAgentePropio = await ownAgentModel.getOwnAgentId(nombreAgentePropio, apellidoAgentePropio);
                        await insuredModel.updateOwnAgentNaturalInsured(resultNaturalId[0].id_asegurado_per_nat, idAgentePropio[0].id_agente_propio);
                    }
                } else {
                    let resultLegalId = await insuredModel.getLegalInsuredId(rifAseguradoJuridico);
                    await receiptInsuredModel.postReceiptLegalInsured(resultLegalId[0].id_asegurado_per_jur, receipt.insertId);
                    const resultLegalInsured = resultsLegalInsureds.filter(legalInsured => legalInsured.id_asegurado_per_jur === resultLegalId[0].id_asegurado_per_jur);
                    if (resultLegalInsured[0].agente_propio_id === null) {
                        nombreCompletoAgentePropio = req.body.nombre_agente_propio;
                        let nombreAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
                        let apellidoAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
                        let idAgentePropio = await ownAgentModel.getOwnAgentId(nombreAgentePropio, apellidoAgentePropio);
                        await insuredModel.updateOwnAgentLegalInsured(resultLegalId[0].id_asegurado_per_jur, idAgentePropio[0].id_agente_propio);
                    }
                }
            } else {
                let receipt = await receiptModel.postReceiptPolicyForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, resultPolicyId, req.body);
                if (rifAseguradoJuridico === '') {
                    let resultNaturalId = await insuredModel.getNaturalInsuredId(cedulaAseguradoNatural);
                    await receiptInsuredModel.postReceiptNaturalInsured(resultNaturalId[0].id_asegurado_per_nat, receipt.insertId);
                    const resultNaturalInsured = resultsNaturalInsureds.filter(naturalInsured => naturalInsured.id_asegurado_per_nat === resultNaturalId[0].id_asegurado_per_nat);
                    if (resultNaturalInsured[0].agente_propio_id === null) {
                        nombreCompletoAgentePropio = req.body.nombre_agente_propio;
                        let nombreAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
                        let apellidoAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
                        let idAgentePropio = await ownAgentModel.getOwnAgentId(nombreAgentePropio, apellidoAgentePropio);
                        await insuredModel.updateOwnAgentNaturalInsured(resultNaturalId[0].id_asegurado_per_nat, idAgentePropio[0].id_agente_propio);
                    }
                } else {
                    let resultLegalId = await insuredModel.getLegalInsuredId(rifAseguradoJuridico);
                    await receiptInsuredModel.postReceiptLegalInsured(resultLegalId[0].id_asegurado_per_jur, receipt.insertId);
                    const resultLegalInsured = resultsLegalInsureds.filter(legalInsured => legalInsured.id_asegurado_per_jur === resultLegalId[0].id_asegurado_per_jur);
                    if (resultLegalInsured[0].agente_propio_id === null) {
                        nombreCompletoAgentePropio = req.body.nombre_agente_propio;
                        let nombreAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
                        let apellidoAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
                        let idAgentePropio = await ownAgentModel.getOwnAgentId(nombreAgentePropio, apellidoAgentePropio);
                        await insuredModel.updateOwnAgentLegalInsured(resultLegalId[0].id_asegurado_per_jur, idAgentePropio[0].id_agente_propio);
                    }
                }
            }
            res.render('receiptForm', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se registraron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'sistema/add-receipt',
                name: req.session.name,
                cookieRol: req.cookies.rol,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                ownAgents: resultsOwnAgents,
            });
        } catch (error) {
            console.log(error);
            res.render('receiptForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-receipt',
                name: req.session.name,
                cookieRol: req.cookies.rol,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                ownAgents: resultsOwnAgents,
            });
        }
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
            let resultsNaturalInsured = [];
            let namesNaturalInsured = [];
            let idNaturalInsured = []; 
            let fechaDesdeRecibo = resultReceipt[0].fecha_desde_recibo;
            let fechaHastaRecibo = resultReceipt[0].fecha_hasta_recibo;
            let fechaPagoRecibo = resultReceipt[0].fecha_pago_recibo;
            let primaRecibo = resultReceipt[0].monto_prima_recibo;
            let comisionRecibo = resultReceipt[0].monto_comision_recibo;
            if (primaRecibo.toString().includes('.') === true) {
                primaRecibo = primaRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaRecibo = String(primaRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (comisionRecibo.toString().includes('.') === true) {
                comisionRecibo = comisionRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                comisionRecibo = String(comisionRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (fechaPagoRecibo === null) {
                fechaPagoRecibo = '';
            } else {
                fechaPagoRecibo = fechaPagoRecibo.toISOString().substring(0, 10);
            }
            if (fechaDesdeRecibo === null) {
                fechaDesdeRecibo = '';
            } else {
                fechaDesdeRecibo = fechaDesdeRecibo.toISOString().substring(0, 10);
            }
            if (fechaHastaRecibo === null) {
                fechaHastaRecibo = '';
            } else {
                fechaHastaRecibo = fechaHastaRecibo.toISOString().substring(0, 10);
            }
            if (resultReceipt[0].colectivo_id === null) {
                resultPolicy = await policyModel.getPolicy(resultReceipt[0].poliza_id);
                if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
                    primaRecibo = `Bs ${primaRecibo}`;
                    comisionRecibo = `Bs ${comisionRecibo}`;
                } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
                    primaRecibo = `$ ${primaRecibo}`;
                    comisionRecibo = `$ ${comisionRecibo}`;
                } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
                    primaRecibo = `€ ${primaRecibo}`;
                    comisionRecibo = `€ ${comisionRecibo}`;
                }
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
                if (resultCollective[0].tipo_moneda_colectivo === 'BOLÍVAR') {
                    primaRecibo = `Bs ${primaRecibo}`;
                    comisionRecibo = `Bs ${comisionRecibo}`;
                } else if (resultCollective[0].tipo_moneda_colectivo === 'DÓLAR') {
                    primaRecibo = `$ ${primaRecibo}`;
                    comisionRecibo = `$ ${comisionRecibo}`;
                } else if (resultCollective[0].tipo_moneda_colectivo === 'EUROS') {
                    primaRecibo = `€ ${primaRecibo}`;
                    comisionRecibo = `€ ${comisionRecibo}`;
                }
                let resultReceiptInsured = await receiptInsuredModel.getReceiptInsured(resultReceipt[0].id_recibo);
                if (resultReceiptInsured[0].asegurado_per_jur_id === null) {
                    if (resultReceiptInsured.length > 1) {
                        for (const receiptInsured of resultReceiptInsured) {
                            resultNaturalInsured = await insuredModel.getNaturalInsured(receiptInsured.asegurado_per_nat_id);
                            resultsNaturalInsured.push(resultNaturalInsured);
                            namesNaturalInsured = resultsNaturalInsured.map(naturalInsured => {
                                let names = naturalInsured[0].nombre_asegurado_per_nat + naturalInsured[0].apellido_asegurado_per_nat;
                                return names;
                            });
                            idNaturalInsured = resultsNaturalInsured.map(naturalInsured => naturalInsured[0].cedula_asegurado_per_nat);
                            resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                        }
                    } else {
                        resultNaturalInsured = await insuredModel.getNaturalInsured(resultReceiptInsured[0].asegurado_per_nat_id);
                        resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                    }
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
                fechaPagoRecibo: fechaPagoRecibo,
                primaRecibo: primaRecibo,
                comisionRecibo: comisionRecibo,
                policy: resultPolicy[0],
                collective: resultCollective[0],
                naturalInsured: resultNaturalInsured[0],
                resultsNaturalInsured: resultsNaturalInsured,
                namesNaturalInsured: namesNaturalInsured,
                idNaturalInsured: idNaturalInsured,
                legalInsured: resultLegalInsured[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    updateReceipt: async (req, res) => {
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let idReceipt = req.body.id_recibo;
        let resultReceipt = await receiptModel.getReceipt(idReceipt);
        let resultPolicy = [];
        let resultCollective = [];
        let resultNaturalInsured = [];
        let resultLegalInsured = [];
        let resultOwnAgent = [];
        let resultsNaturalInsured = [];
        let namesNaturalInsured = [];
        let idNaturalInsured = []; 
        let fechaDesdeRecibo = resultReceipt[0].fecha_desde_recibo;
        let fechaHastaRecibo = resultReceipt[0].fecha_hasta_recibo;
        let fechaPagoRecibo = resultReceipt[0].fecha_pago_recibo;
        let primaRecibo = resultReceipt[0].monto_prima_recibo;
        let comisionRecibo = resultReceipt[0].monto_comision_recibo;
        if (primaRecibo.toString().includes('.') === true) {
            primaRecibo = primaRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaRecibo = String(primaRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (comisionRecibo.toString().includes('.') === true) {
            comisionRecibo = comisionRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            comisionRecibo = String(comisionRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (fechaPagoRecibo === null) {
            fechaPagoRecibo = '';
        } else {
            fechaPagoRecibo = fechaPagoRecibo.toISOString().substring(0, 10);
        }
        if (fechaDesdeRecibo === null) {
            fechaDesdeRecibo = '';
        } else {
            fechaDesdeRecibo = fechaDesdeRecibo.toISOString().substring(0, 10);
        }
        if (fechaHastaRecibo === null) {
            fechaHastaRecibo = '';
        } else {
            fechaHastaRecibo = fechaHastaRecibo.toISOString().substring(0, 10);
        }
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
                if (resultReceiptInsured.length > 1) {
                    for (const receiptInsured of resultReceiptInsured) {
                        resultNaturalInsured = await insuredModel.getNaturalInsured(receiptInsured.asegurado_per_nat_id);
                        resultsNaturalInsured.push(resultNaturalInsured);
                        namesNaturalInsured = resultsNaturalInsured.map(naturalInsured => {
                            let names = naturalInsured[0].nombre_asegurado_per_nat + naturalInsured[0].apellido_asegurado_per_nat;
                            return names;
                        });
                        idNaturalInsured = resultsNaturalInsured.map(naturalInsured => naturalInsured[0].cedula_asegurado_per_nat);
                    }
                } else {
                    resultNaturalInsured = await insuredModel.getNaturalInsured(resultReceiptInsured[0].asegurado_per_nat_id);
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                }
            } else {
                resultLegalInsured = await insuredModel.getLegalInsured(resultReceiptInsured[0].asegurado_per_jur_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
            }
        }
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
            let montoPrimaRecibo = req.body.monto_prima_recibo;
            let montoComisionRecibo = req.body.monto_comision_recibo;
            let numeroPago = parseInt(req.body.numero_pago_recibo);
            let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
            let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
            let fechaPagoRecibo = new Date(req.body.fecha_pago_recibo);
            let resultPolicyId = await policyModel.getPolicyNumberId(req.body.numero_poliza_colectivo);
            let resultCollectiveId = await collectiveModel.getCollectiveNumberId(req.body.numero_poliza_colectivo);
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            montoPrimaRecibo = montoPrimaRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionRecibo = montoComisionRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            if ((montoPrimaRecibo.indexOf(',') !== -1) && (montoPrimaRecibo.indexOf('.') !== -1)) {
                montoPrimaRecibo = montoPrimaRecibo.replace(",", ".");
                montoPrimaRecibo = montoPrimaRecibo.replace(".", ",");
                montoPrimaRecibo = parseFloat(montoPrimaRecibo.replace(/,/g,''));
            } else if (montoPrimaRecibo.indexOf(',') !== -1) {
                montoPrimaRecibo = montoPrimaRecibo.replace(",", ".");
                montoPrimaRecibo = parseFloat(montoPrimaRecibo);
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
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (resultPolicyId.length === 0) {
                let policyId = null;
                await receiptModel.updateReceiptCollective(fraccionamiento, montoPrimaRecibo, montoComisionRecibo, numeroPago, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, policyId, resultCollectiveId, req.body);
                if (rifAseguradoJuridico === '') {
                    let legalId = null;
                    if (cedulaAseguradoNatural.includes(',') === false) {
                        let resultNaturalId = await insuredModel.getNaturalInsuredId(cedulaAseguradoNatural);
                        await receiptInsuredModel.updateReceiptNaturalInsured(legalId, resultNaturalId[0].id_asegurado_per_nat, req.body.id_recibo);
                        const resultNaturalInsured = resultsNaturalInsureds.filter(naturalInsured => naturalInsured.id_asegurado_per_nat === resultNaturalId[0].id_asegurado_per_nat);
                        if (resultNaturalInsured[0].agente_propio_id === null) {
                            nombreCompletoAgentePropio = req.body.nombre_agente_propio;
                            let nombreAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
                            let apellidoAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
                            let idAgentePropio = await ownAgentModel.getOwnAgentId(nombreAgentePropio, apellidoAgentePropio);
                            await insuredModel.updateOwnAgentNaturalInsured(resultNaturalId[0].id_asegurado_per_nat, idAgentePropio[0].id_agente_propio);
                        }
                    } else {
                        arrIdNaturalInsured = cedulaAseguradoNatural.split(',');
                        nombreCompletoAgentePropio = req.body.nombre_agente_propio;
                        let nombreAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
                        let apellidoAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
                        let idAgentePropio = await ownAgentModel.getOwnAgentId(nombreAgentePropio, apellidoAgentePropio);
                        for (const idNaturalInsured of arrIdNaturalInsured) {
                            let resultNaturalId = await insuredModel.getNaturalInsuredId(idNaturalInsured);
                            await insuredModel.updateOwnAgentNaturalInsured(resultNaturalId[0].id_asegurado_per_nat, idAgentePropio[0].id_agente_propio);
                            let resultReceiptInsured = await receiptInsuredModel.getReceiptInsuredId(req.body.id_recibo, resultNaturalId[0].id_asegurado_per_nat);
                            await receiptInsuredModel.updateReceiptInsured(resultReceiptInsured[0].id_recibo_asegurado, legalId, resultNaturalId[0].id_asegurado_per_nat, req.body.id_recibo);
                        }
                    }
                } else {
                    let naturalId = null;
                    let resultLegalId = await insuredModel.getLegalInsuredId(rifAseguradoJuridico);
                    await receiptInsuredModel.updateReceiptLegalInsured(naturalId, resultLegalId[0].id_asegurado_per_jur, req.body.id_recibo);
                    const resultLegalInsured = resultsLegalInsureds.filter(legalInsured => legalInsured.id_asegurado_per_jur === resultLegalId[0].id_asegurado_per_jur);
                    if (resultLegalInsured[0].agente_propio_id === null) {
                        nombreCompletoAgentePropio = req.body.nombre_agente_propio;
                        let nombreAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
                        let apellidoAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
                        let idAgentePropio = await ownAgentModel.getOwnAgentId(nombreAgentePropio, apellidoAgentePropio);
                        await insuredModel.updateOwnAgentLegalInsured(resultLegalId[0].id_asegurado_per_jur, idAgentePropio[0].id_agente_propio);
                    }
                }
            } else {
                let collectiveId = null;
                await receiptModel.updateReceiptPolicy(fraccionamiento, montoPrimaRecibo, montoComisionRecibo, numeroPago, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, collectiveId, resultPolicyId, req.body);
                if (rifAseguradoJuridico === '') {
                    let legalId = null;
                    let resultNaturalId = await insuredModel.getNaturalInsuredId(cedulaAseguradoNatural);
                    await receiptInsuredModel.updateReceiptNaturalInsured(legalId, resultNaturalId[0].id_asegurado_per_nat, req.body.id_recibo);
                    const resultNaturalInsured = resultsNaturalInsureds.filter(naturalInsured => naturalInsured.id_asegurado_per_nat === resultNaturalId[0].id_asegurado_per_nat);
                    if (resultNaturalInsured[0].agente_propio_id === null) {
                        nombreCompletoAgentePropio = req.body.nombre_agente_propio;
                        let nombreAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
                        let apellidoAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
                        let idAgentePropio = await ownAgentModel.getOwnAgentId(nombreAgentePropio, apellidoAgentePropio);
                        await insuredModel.updateOwnAgentNaturalInsured(resultNaturalId[0].id_asegurado_per_nat, idAgentePropio[0].id_agente_propio);
                    }
                } else {
                    let naturalId = null;
                    let resultLegalId = await insuredModel.getLegalInsuredId(rifAseguradoJuridico);
                    await receiptInsuredModel.updateReceiptLegalInsured(naturalId, resultLegalId[0].id_asegurado_per_jur, req.body.id_recibo);
                    const resultLegalInsured = resultsLegalInsureds.filter(legalInsured => legalInsured.id_asegurado_per_jur === resultLegalId[0].id_asegurado_per_jur);
                    if (resultLegalInsured[0].agente_propio_id === null) {
                        nombreCompletoAgentePropio = req.body.nombre_agente_propio;
                        let nombreAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
                        let apellidoAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
                        let idAgentePropio = await ownAgentModel.getOwnAgentId(nombreAgentePropio, apellidoAgentePropio);
                        await insuredModel.updateOwnAgentLegalInsured(resultLegalId[0].id_asegurado_per_jur, idAgentePropio[0].id_agente_propio);
                    }
                }
            }
            res.render('editReceipt', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-receipt/${idReceipt}`,
                name: req.session.name,
                cookieRol: req.cookies.rol,
                resultsNaturalInsured: resultsNaturalInsured,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                ownAgents: resultsOwnAgents,
                fechaDesdeRecibo: fechaDesdeRecibo,
                fechaHastaRecibo: fechaHastaRecibo,
                fechaPagoRecibo: fechaPagoRecibo,
                primaRecibo: primaRecibo,
                comisionRecibo: comisionRecibo,
                policy: resultPolicy[0],
                collective: resultCollective[0],
                naturalInsured: resultNaturalInsured[0],
                naturalInsureds: resultsNaturalInsured,
                namesNaturalInsured: namesNaturalInsured,
                idNaturalInsured: idNaturalInsured,
                legalInsured: resultLegalInsured[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0]
            });
        } catch (error) {
            console.log(error);
            res.render('editReceipt', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-receipt/${idReceipt}`,
                name: req.session.name,
                cookieRol: req.cookies.rol,
                resultsNaturalInsured: resultsNaturalInsured,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                ownAgents: resultsOwnAgents,
                fechaDesdeRecibo: fechaDesdeRecibo,
                fechaHastaRecibo: fechaHastaRecibo,
                fechaPagoRecibo: fechaPagoRecibo,
                primaRecibo: primaRecibo,
                comisionRecibo: comisionRecibo,
                policy: resultPolicy[0],
                collective: resultCollective[0],
                naturalInsured: resultNaturalInsured[0],
                naturalInsureds: resultsNaturalInsured,
                namesNaturalInsured: namesNaturalInsured,
                idNaturalInsured: idNaturalInsured,
                legalInsured: resultLegalInsured[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0]
            });
        }
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