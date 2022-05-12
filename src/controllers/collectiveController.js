const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const ownAgentModel = require('../models/own_agent');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const colInsInsurerBenef = require('../models/col_aseg_asegurado_benef');
const colInsInsurerVehi = require('../models/col_insu_insured_vehi');
const colInsInsurerRiskDiver = require('../models/col_insu_insured_ries_diver');
const receiptModel = require('../models/receipt');
const beneficiaryModel = require('../models/beneficiary');
const vehicleModel = require('../models/vehicle');
const riskDiverseModel = require('../models/risk_diverse');
const executiveModel = require('../models/executive');
const colInsuInsuredExecModel = require('../models/col_insu_insured_executive');
const collectiveOwnAgentModel = require('../models/collective_own_agent');

module.exports = {
/*                  GET                  */
    getHealthCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultCollective = await collectiveModel.getCollectiveLast();
        let resultsCollective = await collectiveModel.getCollectivesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (resultCollective.length === 0) {
            res.render('healthCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let collectiveInsurerInsured = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            if ((collectiveInsurerInsured[0].asegurado_per_jur_id === null) && (collectiveInsurerInsured[0].asegurado_per_nat_id === null)) {
                let primaColectivo = resultCollective[0].prima_anual_colectivo;
                if (primaColectivo.toString().includes('.') === true) {
                    primaColectivo = primaColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                } else {
                    primaColectivo = String(primaColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                }
                let comisionRecibo = 0;
                if (resultReceipt.length !== 0) {
                    comisionRecibo = resultReceipt[0].monto_comision_recibo;
                    if (comisionRecibo.toString().includes('.') === true) {
                        comisionRecibo = comisionRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                    } else {
                        comisionRecibo = String(comisionRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                    }
                }
                res.render('healthCollectiveForm', {
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    receipt: resultReceipt[0],
                    collective: resultCollective,
                    collectives: resultsCollective,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    primaColectivo: primaColectivo,
                    comisionRecibo: comisionRecibo,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (collectiveInsurerInsured[0].asegurado_per_nat_id === null) {
                let resultLegalInsured = await insuredModel.getLegalInsured(collectiveInsurerInsured[0].asegurado_per_jur_id);
                let porcentajeAgentePropio = 0;
                if (resultLegalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
                let primaColectivo = resultCollective[0].prima_anual_colectivo;
                if (primaColectivo.toString().includes('.') === true) {
                    primaColectivo = primaColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                } else {
                    primaColectivo = String(primaColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                }
                let comisionRecibo = 0;
                if (resultReceipt.length !== 0) {
                    comisionRecibo = resultReceipt[0].monto_comision_recibo;
                    if (comisionRecibo.toString().includes('.') === true) {
                        comisionRecibo = comisionRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                    } else {
                        comisionRecibo = String(comisionRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                    }
                }
                res.render('healthCollectiveForm', {
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgent: resultOwnAgent[0],
                    receipt: resultReceipt[0],
                    collective: resultCollective,
                    collectives: resultsCollective,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    primaColectivo: primaColectivo,
                    porcentajeAgentePropio: porcentajeAgentePropio,
                    comisionRecibo: comisionRecibo,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (collectiveInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(collectiveInsurerInsured[0].asegurado_per_nat_id);
                let porcentajeAgentePropio = 0;
                if (resultNaturalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
                let primaColectivo = resultCollective[0].prima_anual_colectivo;
                if (primaColectivo.toString().includes('.') === true) {
                    primaColectivo = primaColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                } else {
                    primaColectivo = String(primaColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                }
                let comisionRecibo = 0;
                if (resultReceipt.length !== 0) {
                    comisionRecibo = resultReceipt[0].monto_comision_recibo;
                    if (comisionRecibo.toString().includes('.') === true) {
                        comisionRecibo = comisionRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                    } else {
                        comisionRecibo = String(comisionRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                    }
                }
                res.render('healthCollectiveForm', {
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    ownAgent: resultOwnAgent[0],
                    receipt: resultReceipt[0],
                    collective: resultCollective,
                    collectives: resultsCollective,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    primaColectivo: primaColectivo,
                    porcentajeAgentePropio: porcentajeAgentePropio,
                    comisionRecibo: comisionRecibo,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    getSubscriptionHealthCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultCollective = await collectiveModel.getCollectiveLast();
        let resultsCollective = await collectiveModel.getCollectivesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (resultCollective.length === 0) {
            res.render('subscriptionHealthCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let resultReceipt = await receiptModel.getReceiptLast();
            let primaColectivo = resultCollective[0].prima_anual_colectivo;
            if (primaColectivo.toString().includes('.') === true) {
                primaColectivo = primaColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaColectivo = String(primaColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            res.render('subscriptionHealthCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                receipt: resultReceipt[0],
                collective: resultCollective,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaColectivo: primaColectivo,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getHealthCollectiveList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultCollective = await collectiveModel.getCollectiveLast();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        res.render('healthCollectiveList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            collective: resultCollective,
            collectives: resultsCollective,
            receipts: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getSubscriptionHealthCollectiveList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultCollective = await collectiveModel.getCollectiveLast();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        res.render('subscriptionHealthCollectiveList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            collective: resultCollective,
            collectives: resultsCollective,
            receipts: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getVehicleCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultCollective = await collectiveModel.getCollectiveLast();
        let resultsCollective = await collectiveModel.getCollectivesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (resultCollective.length === 0) {
            res.render('vehicleCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let collectiveInsurerInsured = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            let porcentajeAgentePropio = 0;
            if ((collectiveInsurerInsured[0].asegurado_per_jur_id === null) && (collectiveInsurerInsured[0].asegurado_per_nat_id === null)) {
                let primaColectivo = resultCollective[0].prima_anual_colectivo;
                if (primaColectivo.toString().includes('.') === true) {
                    primaColectivo = primaColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                } else {
                    primaColectivo = String(primaColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                }
                let comisionRecibo = 0;
                if (resultReceipt.length !== 0) {
                    comisionRecibo = resultReceipt[0].monto_comision_recibo;
                    if (comisionRecibo.toString().includes('.') === true) {
                        comisionRecibo = comisionRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                    } else {
                        comisionRecibo = String(comisionRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                    }
                }
                res.render('vehicleCollectiveForm', {
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    receipt: resultReceipt[0],
                    collective: resultCollective,
                    collectives: resultsCollective,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    primaColectivo: primaColectivo,
                    comisionRecibo: comisionRecibo,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (collectiveInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(collectiveInsurerInsured[0].asegurado_per_nat_id);
                if (resultNaturalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            } else if (collectiveInsurerInsured[0].asegurado_per_nat_id === null) {
                let resultLegalInsured = await insuredModel.getLegalInsured(collectiveInsurerInsured[0].asegurado_per_jur_id);
                if (resultLegalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            }
            let primaColectivo = resultCollective[0].prima_anual_colectivo;
            if (primaColectivo.toString().includes('.') === true) {
                primaColectivo = primaColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaColectivo = String(primaColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            let comisionRecibo = 0;
            if (resultReceipt.length !== 0) {
                comisionRecibo = resultReceipt[0].monto_comision_recibo;
                if (comisionRecibo.toString().includes('.') === true) {
                    comisionRecibo = comisionRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                } else {
                    comisionRecibo = String(comisionRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                }
            }
            res.render('vehicleCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                collective: resultCollective,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaColectivo: primaColectivo,
                porcentajeAgentePropio: porcentajeAgentePropio,
                comisionRecibo: comisionRecibo,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getSubscriptionVehicleCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultCollective = await collectiveModel.getCollectiveLast();
        let resultsCollective = await collectiveModel.getCollectivesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (resultCollective.length === 0) {
            res.render('subscriptionVehicleCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let resultReceipt = await receiptModel.getReceiptLast();
            let primaColectivo = resultCollective[0].prima_anual_colectivo;
            if (primaColectivo.toString().includes('.') === true) {
                primaColectivo = primaColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaColectivo = String(primaColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            res.render('subscriptionVehicleCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                receipt: resultReceipt[0],
                collective: resultCollective,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaColectivo: primaColectivo,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getVehicleCollectiveList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultCollective = await collectiveModel.getCollectiveLast();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        res.render('vehicleCollectiveList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            collective: resultCollective,
            collectives: resultsCollective,
            receipts: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getSubscriptionVehicleCollectiveList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultCollective = await collectiveModel.getCollectiveLast();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        res.render('subscriptionVehicleCollectiveList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            collective: resultCollective,
            collectives: resultsCollective,
            receipts: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getRiskDiverseCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultCollective = await collectiveModel.getCollectiveLast();
        let resultsCollective = await collectiveModel.getCollectivesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (resultCollective.length === 0) {
            res.render('riskDiverseCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let collectiveInsurerInsured = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            let porcentajeAgentePropio = 0;
            if ((collectiveInsurerInsured[0].asegurado_per_jur_id === null) && (collectiveInsurerInsured[0].asegurado_per_nat_id === null)) {
                let primaColectivo = resultCollective[0].prima_anual_colectivo;
                if (primaColectivo.toString().includes('.') === true) {
                    primaColectivo = primaColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                } else {
                    primaColectivo = String(primaColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                }
                let comisionRecibo = 0;
                if (resultReceipt.length !== 0) {
                    comisionRecibo = resultReceipt[0].monto_comision_recibo;
                    if (comisionRecibo.toString().includes('.') === true) {
                        comisionRecibo = comisionRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                    } else {
                        comisionRecibo = String(comisionRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                    }
                }
                res.render('riskDiverseCollectiveForm', {
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    receipt: resultReceipt[0],
                    collective: resultCollective,
                    collectives: resultsCollective,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    primaColectivo: primaColectivo,
                    comisionRecibo: comisionRecibo,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (collectiveInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(collectiveInsurerInsured[0].asegurado_per_nat_id);
                if (resultNaturalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            } else if (collectiveInsurerInsured[0].asegurado_per_nat_id === null) {
                let resultLegalInsured = await insuredModel.getLegalInsured(collectiveInsurerInsured[0].asegurado_per_jur_id);
                if (resultLegalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            }
            let primaColectivo = resultCollective[0].prima_anual_colectivo;
            if (primaColectivo.toString().includes('.') === true) {
                primaColectivo = primaColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaColectivo = String(primaColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            let comisionRecibo = 0;
            if (resultReceipt.length !== 0) {
                comisionRecibo = resultReceipt[0].monto_comision_recibo;
                if (comisionRecibo.toString().includes('.') === true) {
                    comisionRecibo = comisionRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                } else {
                    comisionRecibo = String(comisionRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                }
            }
            res.render('riskDiverseCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                collective: resultCollective,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaColectivo: primaColectivo,
                porcentajeAgentePropio: porcentajeAgentePropio,
                comisionRecibo: comisionRecibo,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getSubscriptionRiskDiverseCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultCollective = await collectiveModel.getCollectiveLast();
        let resultsCollective = await collectiveModel.getCollectivesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (resultCollective.length === 0) {
            res.render('subscriptionRiskDiverseCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let resultReceipt = await receiptModel.getReceiptLast();
            let primaColectivo = resultCollective[0].prima_anual_colectivo;
            if (primaColectivo.toString().includes('.') === true) {
                primaColectivo = primaColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaColectivo = String(primaColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            res.render('subscriptionRiskDiverseCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                receipt: resultReceipt[0],
                collective: resultCollective,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaColectivo: primaColectivo,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getRiskDiverseCollectiveList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultCollective = await collectiveModel.getCollectiveLast();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        res.render('riskDiverseCollectiveList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            collective: resultCollective,
            collectives: resultsCollective,
            receipts: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getSubscriptionRiskDiverseCollectiveList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultCollective = await collectiveModel.getCollectiveLast();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        res.render('subscriptionRiskDiverseCollectiveList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            collective: resultCollective,
            collectives: resultsCollective,
            receipts: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getCollectives: async (req, res) => {
        let resultsCollectives =  await collectiveModel.getCollectives();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        for (let index = 0; index < resultsCII.length; index++) {
            let elementCII = resultsCII[index];
            let resultInsurer = await insurerModel.getInsurer(elementCII.aseguradora_id);
            for (let index = 0; index < resultsCollectives.length; index++) {
                let elementCollective = resultsCollectives[index];
                if ((index < elementCII.id_caa) && (typeof(elementCollective.fecha_desde_colectivo) !== 'string')) {
                    let primaCollective = elementCollective.prima_anual_colectivo;
                    if (primaCollective.toString().includes('.') === true) {
                        elementCollective.prima_anual_colectivo = elementCollective.prima_anual_colectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                    } else {
                        elementCollective.prima_anual_colectivo = String(elementCollective.prima_anual_colectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                    }
                    if (elementCollective.tipo_moneda_colectivo === 'BOLÍVAR') {
                        elementCollective.prima_anual_colectivo = `Bs ${elementCollective.prima_anual_colectivo}`;
                    } else if (elementCollective.tipo_moneda_colectivo === 'DÓLAR') {
                        elementCollective.prima_anual_colectivo = `$ ${elementCollective.prima_anual_colectivo}`;
                    } else if (elementCollective.tipo_moneda_colectivo === 'EUROS') {
                        elementCollective.prima_anual_colectivo = `€ ${elementCollective.prima_anual_colectivo}`;
                    }
                    elementCollective.fecha_desde_colectivo = elementCollective.fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"); 
                    elementCollective.fecha_hasta_colectivo = elementCollective.fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
                    elementCollective.nombre_aseguradora = resultInsurer[0].nombre_aseguradora;
                    break;
                }
            }
        }
        res.render('collectives', {
            data: resultsCollectives,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getCollectivesDetail: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idCollective = req.params.id;
        if (idCollective.match(valoresAceptados)) {
            let resultCIIBeneficiary = [];
            let resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
            let resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenef(resultCII[0].id_caa);
            let resultsCIIV = await colInsInsurerVehi.getColInsuInsuredVehi(resultCII[0].id_caa);
            let resultsCIIRD = await colInsInsurerRiskDiver.getColInsuInsuredRiesDiver(resultCII[0].id_caa);
            if ((resultsCIIV.length === 0) && (resultsCIIRD.length === 0)) {
                let resultsBeneficiaries = [];
                for (let index = 0; index < resultCII.length; index++) {
                    const elementCII = resultCII[index];
                    resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenef(elementCII.id_caa);
                    resultCIIBeneficiary.push(resultsCIIB.map((ciib) => ciib.beneficiario_id));
                    resultCIIBeneficiary = resultCIIBeneficiary.flat(1);
                }
                for (const ciiBeneficiary of resultCIIBeneficiary) {
                    let resultBenefiary = await beneficiaryModel.getBeneficiary(ciiBeneficiary);
                    resultsBeneficiaries.push(resultBenefiary[0]);
                }
                res.render('beneficiaries', {
                    data: resultsBeneficiaries,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if ((resultsCIIB.length === 0) && (resultsCIIRD.length === 0)) {
                let resultsVehicles = [];
                for (const resultCIIV of resultsCIIV) {
                    let resultVehicle = await vehicleModel.getVehicle(resultCIIV.vehiculo_id);
                    resultsVehicles.push(resultVehicle[0]);
                }
                res.render('vehicles', {
                    data: resultsVehicles,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if ((resultsCIIB.length === 0) && (resultsCIIV.length === 0)) {
                let resultsVariousRisk = [];
                for (const resultCIIRD of resultsCIIRD) {
                    let resultRiskDiverse = await riskDiverseModel.getRiskDiverse(resultCIIRD.riesgo_diverso_id);
                    let sumaAsegurada = resultRiskDiverse[0].suma_asegurada_riesgo_diverso;
                    if (sumaAsegurada.toString().includes('.') === true) {
                        resultRiskDiverse[0].suma_asegurada_riesgo_diverso = resultRiskDiverse[0].suma_asegurada_riesgo_diverso.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                    } else {
                        resultRiskDiverse[0].suma_asegurada_riesgo_diverso = String(resultRiskDiverse[0].suma_asegurada_riesgo_diverso).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                    }
                    resultsVariousRisk.push(resultRiskDiverse[0]);
                }
                res.render('variousRisk', {
                    data: resultsVariousRisk,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        } else {
            next();
        }
    },
/*                 POST                  */
    postHealthCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultCollective = await collectiveModel.getCollectiveLast();
        let resultsCollective = await collectiveModel.getCollectivesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let primaColectivo = resultCollective[0].prima_anual_colectivo;
        if (primaColectivo.toString().includes('.') === true) {
            primaColectivo = primaColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaColectivo = String(primaColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        try {
            let montoPrimaAnual = req.body.prima_anual_colectivo;
            let deducible = req.body.deducible_colectivo;
            let coberturaSumaAsegurada = req.body.cobertura_suma_asegurada_colectivo;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            coberturaSumaAsegurada = coberturaSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            let fechaPolizaDesde = new Date(req.body.fecha_desde_colectivo);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_colectivo);
            let fechaDetalleCliente = new Date(req.body.detalle_cliente_colectivo);
            let tipoColectivo = 'SALUD';
            const estatusPoliza = 'ACTIVA';
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            if ((montoPrimaAnual.indexOf(',') !== -1) && (montoPrimaAnual.indexOf('.') !== -1)) {
                montoPrimaAnual = montoPrimaAnual.replace(",", ".");
                montoPrimaAnual = montoPrimaAnual.replace(".", ",");
                montoPrimaAnual = parseFloat(montoPrimaAnual.replace(/,/g,''));
            } else if (montoPrimaAnual.indexOf(',') !== -1) {
                montoPrimaAnual = montoPrimaAnual.replace(",", ".");
                montoPrimaAnual = parseFloat(montoPrimaAnual);
            } else if (montoPrimaAnual.indexOf('.') !== -1) {
                montoPrimaAnual = montoPrimaAnual.replace(".", ",");
                montoPrimaAnual = parseFloat(montoPrimaAnual.replace(/,/g,''));
            }
            if ((deducible.indexOf(',') !== -1) && (deducible.indexOf('.') !== -1)) {
                deducible = deducible.replace(",", ".");
                deducible = deducible.replace(".", ",");
                deducible = parseFloat(deducible.replace(/,/g,''));
            } else if (deducible.indexOf(',') !== -1) {
                deducible = deducible.replace(",", ".");
                deducible = parseFloat(deducible);
            } else if (deducible.indexOf('.') !== -1) {
                deducible = deducible.replace(".", ",");
                deducible = parseFloat(deducible.replace(/,/g,''));
            }
            if (coberturaSumaAsegurada === '') {
                coberturaSumaAsegurada = 0;
            } else {
                if ((coberturaSumaAsegurada.indexOf(',') !== -1) && (coberturaSumaAsegurada.indexOf('.') !== -1)) {
                    coberturaSumaAsegurada = coberturaSumaAsegurada.replace(",", ".");
                    coberturaSumaAsegurada = coberturaSumaAsegurada.replace(".", ",");
                    coberturaSumaAsegurada = parseFloat(coberturaSumaAsegurada.replace(/,/g,''));
                } else if (coberturaSumaAsegurada.indexOf(',') !== -1) {
                    coberturaSumaAsegurada = coberturaSumaAsegurada.replace(",", ".");
                    coberturaSumaAsegurada = parseFloat(coberturaSumaAsegurada);
                } else if (coberturaSumaAsegurada.indexOf('.') !== -1) {
                    coberturaSumaAsegurada = coberturaSumaAsegurada.replace(".", ",");
                    coberturaSumaAsegurada = parseFloat(coberturaSumaAsegurada.replace(/,/g,''));
                }
            }
            let collective = await collectiveModel.postCollectiveHealthForm(montoPrimaAnual, deducible, coberturaSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoColectivo, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                let nombresAgentePropio;
                let apellidosAgentePropio;
                if (nombreCompletoAgente.split(" ").length === 2) {
                    nombresAgentePropio = nombreCompletoAgente.split(' ', 1).join(' ');
                    apellidosAgentePropio = nombreCompletoAgente.split(' ').slice(1,2).join(' ');
                } else {
                    nombresAgentePropio = nombreCompletoAgente.split(' ', 2).join(' ');
                    apellidosAgentePropio = nombreCompletoAgente.split(' ').slice(2,4).join(' ');
                }
                let idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio, apellidosAgentePropio);
                await collectiveOwnAgentModel.postCollectiveOwnAgent(collective.insertId, idAgentePropio);
            }
            let caa = await collectiveInsurerInsuredModel.postCollectiveInsurer(req.body.nombre_aseguradora, collective.insertId);
            for (const nombreCompletoEjecutivo of arrayEjecutivo) {
                let nombresEjecutivo;
                let apellidosEjecutivo;
                if (nombreCompletoEjecutivo.split(" ").length === 2) {
                    nombresEjecutivo = nombreCompletoEjecutivo.split(' ', 1).join(' ');
                    apellidosEjecutivo = nombreCompletoEjecutivo.split(' ').slice(1,2).join(' ');
                } else {
                    nombresEjecutivo = nombreCompletoEjecutivo.split(' ', 2).join(' ');
                    apellidosEjecutivo = nombreCompletoEjecutivo.split(' ').slice(2,4).join(' ');
                }
                let idEjecutivo = await executiveModel.getExecutiveId(nombresEjecutivo, apellidosEjecutivo);
                await colInsuInsuredExecModel.postColInsuInsuredExecutive(caa.insertId, idEjecutivo[0].id_ejecutivo);
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
                    collective: resultCollective,
                    collectives: resultsCollective,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    primaColectivo,
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
                    collective: resultCollective,
                    collectives: resultsCollective,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    primaColectivo,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    postVehicleCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsCollective = await collectiveModel.getCollectivesNumbers();
        let resultCollective = await collectiveModel.getCollectiveLast();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let primaColectivo = resultCollective[0].prima_anual_colectivo;
        if (primaColectivo.toString().includes('.') === true) {
            primaColectivo = primaColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaColectivo = String(primaColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_colectivo ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_colectivo;
            let deducible = req.body.deducible_colectivo;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            let fechaPolizaDesde = new Date(req.body.fecha_desde_colectivo);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_colectivo);
            let tipoColectivo = 'AUTOMÓVIL';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const estatusPoliza = 'ACTIVA';
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            if ((montoPrimaAnual.indexOf(',') !== -1) && (montoPrimaAnual.indexOf('.') !== -1)) {
                montoPrimaAnual = montoPrimaAnual.replace(",", ".");
                montoPrimaAnual = montoPrimaAnual.replace(".", ",");
                montoPrimaAnual = parseFloat(montoPrimaAnual.replace(/,/g,''));
            } else if (montoPrimaAnual.indexOf(',') !== -1) {
                montoPrimaAnual = montoPrimaAnual.replace(",", ".");
                montoPrimaAnual = parseFloat(montoPrimaAnual);
            } else if (montoPrimaAnual.indexOf('.') !== -1) {
                montoPrimaAnual = montoPrimaAnual.replace(".", ",");
                montoPrimaAnual = parseFloat(montoPrimaAnual.replace(/,/g,''));
            }
            if ((deducible.indexOf(',') !== -1) && (deducible.indexOf('.') !== -1)) {
                deducible = deducible.replace(",", ".");
                deducible = deducible.replace(".", ",");
                deducible = parseFloat(deducible.replace(/,/g,''));
            } else if (deducible.indexOf(',') !== -1) {
                deducible = deducible.replace(",", ".");
                deducible = parseFloat(deducible);
            } else if (deducible.indexOf('.') !== -1) {
                deducible = deducible.replace(".", ",");
                deducible = parseFloat(deducible.replace(/,/g,''));
            }
            let collective = await collectiveModel.postCollectiveForm(tomadorAsegurado, montoPrimaAnual, deducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                let nombresAgentePropio;
                let apellidosAgentePropio;
                if (nombreCompletoAgente.split(" ").length === 2) {
                    nombresAgentePropio = nombreCompletoAgente.split(' ', 1).join(' ');
                    apellidosAgentePropio = nombreCompletoAgente.split(' ').slice(1,2).join(' ');
                } else {
                    nombresAgentePropio = nombreCompletoAgente.split(' ', 2).join(' ');
                    apellidosAgentePropio = nombreCompletoAgente.split(' ').slice(2,4).join(' ');
                }
                let idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio, apellidosAgentePropio);
                await collectiveOwnAgentModel.postCollectiveOwnAgent(collective.insertId, idAgentePropio);
            }
            let caa = await collectiveInsurerInsuredModel.postCollectiveInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, collective.insertId);
            for (const nombreCompletoEjecutivo of arrayEjecutivo) {
                let nombresEjecutivo;
                let apellidosEjecutivo;
                if (nombreCompletoEjecutivo.split(" ").length === 2) {
                    nombresEjecutivo = nombreCompletoEjecutivo.split(' ', 1).join(' ');
                    apellidosEjecutivo = nombreCompletoEjecutivo.split(' ').slice(1,2).join(' ');
                } else {
                    nombresEjecutivo = nombreCompletoEjecutivo.split(' ', 2).join(' ');
                    apellidosEjecutivo = nombreCompletoEjecutivo.split(' ').slice(2,4).join(' ');
                }
                let idEjecutivo = await executiveModel.getExecutiveId(nombresEjecutivo, apellidosEjecutivo);
                await colInsuInsuredExecModel.postColInsuInsuredExecutive(caa.insertId, idEjecutivo[0].id_ejecutivo);
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
                    collective: resultCollective,
                    collectives: resultsCollective,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    primaColectivo,
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
                    collective: resultCollective,
                    collectives: resultsCollective,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    primaColectivo,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    postRiskDiverseCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsCollective = await collectiveModel.getCollectivesNumbers();
        let resultCollective = await collectiveModel.getCollectiveLast();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let primaColectivo = resultCollective[0].prima_anual_colectivo;
        if (primaColectivo.toString().includes('.') === true) {
            primaColectivo = primaColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaColectivo = String(primaColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_colectivo ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_colectivo;
            let deducible = req.body.deducible_colectivo;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            let fechaPolizaDesde = new Date(req.body.fecha_desde_colectivo);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_colectivo);
            let tipoColectivo = 'RIESGOS DIVERSOS';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const estatusPoliza = 'ACTIVA';
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            if ((montoPrimaAnual.indexOf(',') !== -1) && (montoPrimaAnual.indexOf('.') !== -1)) {
                montoPrimaAnual = montoPrimaAnual.replace(",", ".");
                montoPrimaAnual = montoPrimaAnual.replace(".", ",");
                montoPrimaAnual = parseFloat(montoPrimaAnual.replace(/,/g,''));
            } else if (montoPrimaAnual.indexOf(',') !== -1) {
                montoPrimaAnual = montoPrimaAnual.replace(",", ".");
                montoPrimaAnual = parseFloat(montoPrimaAnual);
            } else if (montoPrimaAnual.indexOf('.') !== -1) {
                montoPrimaAnual = montoPrimaAnual.replace(".", ",");
                montoPrimaAnual = parseFloat(montoPrimaAnual.replace(/,/g,''));
            }
            if ((deducible.indexOf(',') !== -1) && (deducible.indexOf('.') !== -1)) {
                deducible = deducible.replace(",", ".");
                deducible = deducible.replace(".", ",");
                deducible = parseFloat(deducible.replace(/,/g,''));
            } else if (deducible.indexOf(',') !== -1) {
                deducible = deducible.replace(",", ".");
                deducible = parseFloat(deducible);
            } else if (deducible.indexOf('.') !== -1) {
                deducible = deducible.replace(".", ",");
                deducible = parseFloat(deducible.replace(/,/g,''));
            }
            let collective = await collectiveModel.postCollectiveForm(tomadorAsegurado, montoPrimaAnual, deducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                let nombresAgentePropio;
                let apellidosAgentePropio;
                if (nombreCompletoAgente.split(" ").length === 2) {
                    nombresAgentePropio = nombreCompletoAgente.split(' ', 1).join(' ');
                    apellidosAgentePropio = nombreCompletoAgente.split(' ').slice(1,2).join(' ');
                } else {
                    nombresAgentePropio = nombreCompletoAgente.split(' ', 2).join(' ');
                    apellidosAgentePropio = nombreCompletoAgente.split(' ').slice(2,4).join(' ');
                }
                let idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio, apellidosAgentePropio);
                await collectiveOwnAgentModel.postCollectiveOwnAgent(collective.insertId, idAgentePropio);
            }
            let caa = await collectiveInsurerInsuredModel.postCollectiveInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, collective.insertId);
            for (const nombreCompletoEjecutivo of arrayEjecutivo) {
                let nombresEjecutivo;
                let apellidosEjecutivo;
                if (nombreCompletoEjecutivo.split(" ").length === 2) {
                    nombresEjecutivo = nombreCompletoEjecutivo.split(' ', 1).join(' ');
                    apellidosEjecutivo = nombreCompletoEjecutivo.split(' ').slice(1,2).join(' ');
                } else {
                    nombresEjecutivo = nombreCompletoEjecutivo.split(' ', 2).join(' ');
                    apellidosEjecutivo = nombreCompletoEjecutivo.split(' ').slice(2,4).join(' ');
                }
                let idEjecutivo = await executiveModel.getExecutiveId(nombresEjecutivo, apellidosEjecutivo);
                await colInsuInsuredExecModel.postColInsuInsuredExecutive(caa.insertId, idEjecutivo[0].id_ejecutivo);
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
                    collective: resultCollective,
                    collectives: resultsCollective,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    primaColectivo,
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
                    collective: resultCollective,
                    collectives: resultsCollective,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    primaColectivo,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
/*                  PUT                  */
    putHealthCollective: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idCollective = req.params.id;
        if (idCollective.match(valoresAceptados)) {
            let executives = [];
            let resultOwnAgent = [];
            const insurers = await insurerModel.getInsurers();
            let resultsExecutives = await executiveModel.getExecutives();
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            let resultsLegalInsureds = await insuredModel.getLegalInsureds();
            let resultsCollective = await collectiveModel.getCollectivesNumbers();
            let resultsReceipts = await receiptModel.getReceipts();
            let resultCollective = await collectiveModel.getCollective(idCollective);
            let fechaDesdeColectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
            let fechaHastaColectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
            let primaAnual = resultCollective[0].prima_anual_colectivo;
            let coberturaSumaAsegurada = resultCollective[0].cobertura_suma_asegurada_colectivo;
            let deducible = resultCollective[0].deducible_colectivo;
            let fechaDetalleCliente = resultCollective[0].detalle_cliente_colectivo;
            if (fechaDetalleCliente === null) {
                fechaDetalleCliente = '';
            } else {
                fechaDetalleCliente = fechaDetalleCliente.toISOString().substring(0, 10);
            }
            if (primaAnual.toString().includes('.') === true) {
                primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (coberturaSumaAsegurada.toString().includes('.') === true) {
                coberturaSumaAsegurada = coberturaSumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                coberturaSumaAsegurada = String(coberturaSumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (deducible.toString().includes('.') === true) {
                deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultCollective[0].tipo_moneda_colectivo === 'BOLÍVAR') {
                primaAnual = `Bs ${primaAnual}`;
                coberturaSumaAsegurada = `Bs ${coberturaSumaAsegurada}`;
                deducible = `Bs ${deducible}`;
            } else if (resultCollective[0].tipo_moneda_colectivo === 'DÓLAR') {
                primaAnual = `$ ${primaAnual}`;
                coberturaSumaAsegurada = `$ ${coberturaSumaAsegurada}`;
                deducible = `$ ${deducible}`;
            } else if (resultCollective[0].tipo_moneda_colectivo === 'EUROS') {
                primaAnual = `€ ${primaAnual}`;
                coberturaSumaAsegurada = `€ ${coberturaSumaAsegurada}`;
                deducible = `€ ${deducible}`;
            }
            const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
            const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
            const resultsCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCII[0].id_caa);
            for (const resultCIIE of resultsCIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultCIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            const resultCollectiveOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
            if (resultCollectiveOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultCollectiveOA[0].agente_propio_id);
            }
            res.render('editCollectiveHealth', {
                collective: resultCollective,
                fechaDesdeColectivo,
                fechaHastaColectivo,
                fechaDetalleCliente,
                primaAnual,
                coberturaSumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putVehicleCollective: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idCollective = req.params.id;
        if (idCollective.match(valoresAceptados)) {
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            const insurers = await insurerModel.getInsurers();
            let resultsExecutives = await executiveModel.getExecutives();
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            let resultsLegalInsureds = await insuredModel.getLegalInsureds();
            let resultsCollective = await collectiveModel.getCollectivesNumbers();
            let resultsReceipts = await receiptModel.getReceipts();
            let resultCollective = await collectiveModel.getCollective(idCollective);
            let fechaDesdeColectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
            let fechaHastaColectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
            let primaAnual = resultCollective[0].prima_anual_colectivo;
            let deducible = resultCollective[0].deducible_colectivo;
            if (primaAnual.toString().includes('.') === true) {
                primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (deducible.toString().includes('.') === true) {
                deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultCollective[0].tipo_moneda_colectivo === 'BOLÍVAR') {
                primaAnual = `Bs ${primaAnual}`;
                deducible = `Bs ${deducible}`;
            } else if (resultCollective[0].tipo_moneda_colectivo === 'DÓLAR') {
                primaAnual = `$ ${primaAnual}`;
                deducible = `$ ${deducible}`;
            } else if (resultCollective[0].tipo_moneda_colectivo === 'EUROS') {
                primaAnual = `€ ${primaAnual}`;
                deducible = `€ ${deducible}`;
            }
            const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
            const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
            const resultsCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCII[0].id_caa);
            for (const resultCIIE of resultsCIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultCIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            const resultCollectiveOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
            if (resultCollectiveOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultCollectiveOA[0].agente_propio_id);
            }
            if (resultCII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
            }
            res.render('editCollectiveVehicle', {
                collective: resultCollective,
                fechaDesdeColectivo,
                fechaHastaColectivo,
                primaAnual,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putRiskDiverseCollective: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idCollective = req.params.id;
        if (idCollective.match(valoresAceptados)) {
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            const insurers = await insurerModel.getInsurers();
            let resultsExecutives = await executiveModel.getExecutives();
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            let resultsLegalInsureds = await insuredModel.getLegalInsureds();
            let resultsCollective = await collectiveModel.getCollectivesNumbers();
            let resultsReceipts = await receiptModel.getReceipts();
            let resultCollective = await collectiveModel.getCollective(idCollective);
            let fechaDesdeColectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
            let fechaHastaColectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
            let primaAnual = resultCollective[0].prima_anual_colectivo;
            let deducible = resultCollective[0].deducible_colectivo;
            if (primaAnual.toString().includes('.') === true) {
                primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (deducible.toString().includes('.') === true) {
                deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultCollective[0].tipo_moneda_colectivo === 'BOLÍVAR') {
                primaAnual = `Bs ${primaAnual}`;
                deducible = `Bs ${deducible}`;
            } else if (resultCollective[0].tipo_moneda_colectivo === 'DÓLAR') {
                primaAnual = `$ ${primaAnual}`;
                deducible = `$ ${deducible}`;
            } else if (resultCollective[0].tipo_moneda_colectivo === 'EUROS') {
                primaAnual = `€ ${primaAnual}`;
                deducible = `€ ${deducible}`;
            }
            const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
            const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
            const resultsCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCII[0].id_caa);
            for (const resultCIIE of resultsCIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultCIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            const resultCollectiveOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
            if (resultCollectiveOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultCollectiveOA[0].agente_propio_id);
            }
            if (resultCII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
            }
            res.render('editCollectiveRiskDiverse', {
                collective: resultCollective,
                fechaDesdeColectivo,
                fechaHastaColectivo,
                primaAnual,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    updateHealthCollective: async (req, res) => {
        const idCollective = req.body.id_colectivo;
        let executives = [];
        let resultOwnAgent = [];
        const insurers = await insurerModel.getInsurers();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsCollective = await collectiveModel.getCollectivesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultCollective = await collectiveModel.getCollective(idCollective);
        let fechaDesdeColectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
        let fechaHastaColectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
        let primaAnual = resultCollective[0].prima_anual_colectivo;
        let coberturaSumaAsegurada = resultCollective[0].cobertura_suma_asegurada_colectivo;
        let deducible = resultCollective[0].deducible_colectivo;
        let fechaDetalleCliente = resultCollective[0].detalle_cliente_colectivo;
        if (fechaDetalleCliente === null) {
            fechaDetalleCliente = '';
        } else {
            fechaDetalleCliente = fechaDetalleCliente.toISOString().substring(0, 10);
        }
        if (primaAnual.toString().includes('.') === true) {
            primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (coberturaSumaAsegurada.toString().includes('.') === true) {
            coberturaSumaAsegurada = coberturaSumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            coberturaSumaAsegurada = String(coberturaSumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (deducible.toString().includes('.') === true) {
            deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (resultCollective[0].tipo_moneda_colectivo === 'BOLÍVAR') {
            primaAnual = `Bs ${primaAnual}`;
            coberturaSumaAsegurada = `Bs ${coberturaSumaAsegurada}`;
            deducible = `Bs ${deducible}`;
        } else if (resultCollective[0].tipo_moneda_colectivo === 'DÓLAR') {
            primaAnual = `$ ${primaAnual}`;
            coberturaSumaAsegurada = `$ ${coberturaSumaAsegurada}`;
            deducible = `$ ${deducible}`;
        } else if (resultCollective[0].tipo_moneda_colectivo === 'EUROS') {
            primaAnual = `€ ${primaAnual}`;
            coberturaSumaAsegurada = `€ ${coberturaSumaAsegurada}`;
            deducible = `€ ${deducible}`;
        }
        const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
        const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
        const resultsCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCII[0].id_caa);
        for (const resultCIIE of resultsCIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultCIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        const resultCollectiveOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
        if (resultCollectiveOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultCollectiveOA[0].agente_propio_id);
        }
        try {
            let montoPrimaAnual = req.body.prima_anual_colectivo;
            let deducible = req.body.deducible_colectivo;
            let coberturaSumaAsegurada = req.body.cobertura_suma_asegurada_colectivo;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            coberturaSumaAsegurada = coberturaSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            let fechaPolizaDesde = new Date(req.body.fecha_desde_colectivo);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_colectivo);
            let fechaDetalleCliente = new Date(req.body.detalle_cliente_colectivo);
            let tipoColectivo = 'SALUD';
            const estatusPoliza = 'ACTIVA';
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            if ((montoPrimaAnual.indexOf(',') !== -1) && (montoPrimaAnual.indexOf('.') !== -1)) {
                montoPrimaAnual = montoPrimaAnual.replace(",", ".");
                montoPrimaAnual = montoPrimaAnual.replace(".", ",");
                montoPrimaAnual = parseFloat(montoPrimaAnual.replace(/,/g,''));
            } else if (montoPrimaAnual.indexOf(',') !== -1) {
                montoPrimaAnual = montoPrimaAnual.replace(",", ".");
                montoPrimaAnual = parseFloat(montoPrimaAnual);
            } else if (montoPrimaAnual.indexOf('.') !== -1) {
                montoPrimaAnual = montoPrimaAnual.replace(".", ",");
                montoPrimaAnual = parseFloat(montoPrimaAnual.replace(/,/g,''));
            }
            if ((deducible.indexOf(',') !== -1) && (deducible.indexOf('.') !== -1)) {
                deducible = deducible.replace(",", ".");
                deducible = deducible.replace(".", ",");
                deducible = parseFloat(deducible.replace(/,/g,''));
            } else if (deducible.indexOf(',') !== -1) {
                deducible = deducible.replace(",", ".");
                deducible = parseFloat(deducible);
            } else if (deducible.indexOf('.') !== -1) {
                deducible = deducible.replace(".", ",");
                deducible = parseFloat(deducible.replace(/,/g,''));
            }
            if (coberturaSumaAsegurada === '') {
                coberturaSumaAsegurada = 0;
            } else {
                if ((coberturaSumaAsegurada.indexOf(',') !== -1) && (coberturaSumaAsegurada.indexOf('.') !== -1)) {
                    coberturaSumaAsegurada = coberturaSumaAsegurada.replace(",", ".");
                    coberturaSumaAsegurada = coberturaSumaAsegurada.replace(".", ",");
                    coberturaSumaAsegurada = parseFloat(coberturaSumaAsegurada.replace(/,/g,''));
                } else if (coberturaSumaAsegurada.indexOf(',') !== -1) {
                    coberturaSumaAsegurada = coberturaSumaAsegurada.replace(",", ".");
                    coberturaSumaAsegurada = parseFloat(coberturaSumaAsegurada);
                } else if (coberturaSumaAsegurada.indexOf('.') !== -1) {
                    coberturaSumaAsegurada = coberturaSumaAsegurada.replace(".", ",");
                    coberturaSumaAsegurada = parseFloat(coberturaSumaAsegurada.replace(/,/g,''));
                }
            }
            await collectiveModel.updateCollectiveHealth(montoPrimaAnual, deducible, coberturaSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoColectivo, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                let nombresAgentePropio;
                let apellidosAgentePropio;
                if (nombreCompletoAgente.split(" ").length === 2) {
                    nombresAgentePropio = nombreCompletoAgente.split(' ', 1).join(' ');
                    apellidosAgentePropio = nombreCompletoAgente.split(' ').slice(1,2).join(' ');
                } else {
                    nombresAgentePropio = nombreCompletoAgente.split(' ', 2).join(' ');
                    apellidosAgentePropio = nombreCompletoAgente.split(' ').slice(2,4).join(' ');
                }
                let idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio, apellidosAgentePropio);
                let resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
                if (resultCOA.length === 0) {
                    await collectiveOwnAgentModel.postCollectiveOwnAgent(idCollective, idAgentePropio);
                } else {
                    await collectiveOwnAgentModel.updateCollectiveOwnAgent(idCollective, idAgentePropio);
                } 
            } else {
                let resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
                if (resultCOA.length !== 0) {
                    const disableCAP = 1;
                    await collectiveOwnAgentModel.disableCollectiveOwnAgent(idCollective, disableCAP);
                }
            }
            await collectiveInsurerInsuredModel.updateCollectiveInsurer(req.body.nombre_aseguradora, idCollective);
            const resultCAA = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
            const resultCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCAA[0].id_caa);
            for (let index = 0; index < arrayEjecutivo.length; index++) {
                const nombreCompletoEjecutivo = arrayEjecutivo[index];
                let nombresEjecutivo;
                let apellidosEjecutivo;
                if (nombreCompletoEjecutivo.split(" ").length === 2) {
                    nombresEjecutivo = nombreCompletoEjecutivo.split(' ', 1).join(' ');
                    apellidosEjecutivo = nombreCompletoEjecutivo.split(' ').slice(1,2).join(' ');
                } else {
                    nombresEjecutivo = nombreCompletoEjecutivo.split(' ', 2).join(' ');
                    apellidosEjecutivo = nombreCompletoEjecutivo.split(' ').slice(2,4).join(' ');
                }
                let idEjecutivo = await executiveModel.getExecutiveId(nombresEjecutivo, apellidosEjecutivo);
                await colInsuInsuredExecModel.updateColInsuInsuredExecutive(resultCIIE[index].id_caae, idEjecutivo[0].id_ejecutivo);
            }
            res.render('editCollectiveHealth', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-collective-health/${idCollective}`,
                collective: resultCollective,
                fechaDesdeColectivo,
                fechaHastaColectivo,
                fechaDetalleCliente,
                primaAnual,
                coberturaSumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('editCollectiveHealth', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-collective-health/${idCollective}`,
                collective: resultCollective,
                fechaDesdeColectivo,
                fechaHastaColectivo,
                fechaDetalleCliente,
                primaAnual,
                coberturaSumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updateVehicleCollective: async (req, res) => {
        const idCollective = req.body.id_colectivo;
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        const insurers = await insurerModel.getInsurers();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsCollective = await collectiveModel.getCollectivesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultCollective = await collectiveModel.getCollective(idCollective);
        let fechaDesdeColectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
        let fechaHastaColectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
        let primaAnual = resultCollective[0].prima_anual_colectivo;
        let deducible = resultCollective[0].deducible_colectivo;
        if (primaAnual.toString().includes('.') === true) {
            primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (deducible.toString().includes('.') === true) {
            deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (resultCollective[0].tipo_moneda_colectivo === 'BOLÍVAR') {
            primaAnual = `Bs ${primaAnual}`;
            deducible = `Bs ${deducible}`;
        } else if (resultCollective[0].tipo_moneda_colectivo === 'DÓLAR') {
            primaAnual = `$ ${primaAnual}`;
            deducible = `$ ${deducible}`;
        } else if (resultCollective[0].tipo_moneda_colectivo === 'EUROS') {
            primaAnual = `€ ${primaAnual}`;
            deducible = `€ ${deducible}`;
        }
        const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
        const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
        const resultsCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCII[0].id_caa);
        for (const resultCIIE of resultsCIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultCIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        const resultCollectiveOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
        if (resultCollectiveOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultCollectiveOA[0].agente_propio_id);
        }
        if (resultCII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
        }
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_colectivo ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_colectivo;
            let deducible = req.body.deducible_colectivo;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            let fechaPolizaDesde = new Date(req.body.fecha_desde_colectivo);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_colectivo);
            let tipoColectivo = 'AUTOMÓVIL';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const estatusPoliza = 'ACTIVA';
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            if ((montoPrimaAnual.indexOf(',') !== -1) && (montoPrimaAnual.indexOf('.') !== -1)) {
                montoPrimaAnual = montoPrimaAnual.replace(",", ".");
                montoPrimaAnual = montoPrimaAnual.replace(".", ",");
                montoPrimaAnual = parseFloat(montoPrimaAnual.replace(/,/g,''));
            } else if (montoPrimaAnual.indexOf(',') !== -1) {
                montoPrimaAnual = montoPrimaAnual.replace(",", ".");
                montoPrimaAnual = parseFloat(montoPrimaAnual);
            } else if (montoPrimaAnual.indexOf('.') !== -1) {
                montoPrimaAnual = montoPrimaAnual.replace(".", ",");
                montoPrimaAnual = parseFloat(montoPrimaAnual.replace(/,/g,''));
            }
            if ((deducible.indexOf(',') !== -1) && (deducible.indexOf('.') !== -1)) {
                deducible = deducible.replace(",", ".");
                deducible = deducible.replace(".", ",");
                deducible = parseFloat(deducible.replace(/,/g,''));
            } else if (deducible.indexOf(',') !== -1) {
                deducible = deducible.replace(",", ".");
                deducible = parseFloat(deducible);
            } else if (deducible.indexOf('.') !== -1) {
                deducible = deducible.replace(".", ",");
                deducible = parseFloat(deducible.replace(/,/g,''));
            }
            await collectiveModel.updateCollective(tomadorAsegurado, montoPrimaAnual, deducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                let nombresAgentePropio;
                let apellidosAgentePropio;
                if (nombreCompletoAgente.split(" ").length === 2) {
                    nombresAgentePropio = nombreCompletoAgente.split(' ', 1).join(' ');
                    apellidosAgentePropio = nombreCompletoAgente.split(' ').slice(1,2).join(' ');
                } else {
                    nombresAgentePropio = nombreCompletoAgente.split(' ', 2).join(' ');
                    apellidosAgentePropio = nombreCompletoAgente.split(' ').slice(2,4).join(' ');
                }
                let idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio, apellidosAgentePropio);
                let resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
                if (resultCOA.length === 0) {
                    await collectiveOwnAgentModel.postCollectiveOwnAgent(idCollective, idAgentePropio);
                } else {
                    await collectiveOwnAgentModel.updateCollectiveOwnAgent(idCollective, idAgentePropio);
                } 
            } else {
                let resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
                if (resultCOA.length !== 0) {
                    const disableCAP = 1;
                    await collectiveOwnAgentModel.disableCollectiveOwnAgent(idCollective, disableCAP);
                }
            }
            await collectiveInsurerInsuredModel.updateCollectiveInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, idCollective);
            const resultCAA = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
            const resultCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCAA[0].id_caa);
            for (let index = 0; index < arrayEjecutivo.length; index++) {
                const nombreCompletoEjecutivo = arrayEjecutivo[index];
                let nombresEjecutivo;
                let apellidosEjecutivo;
                if (nombreCompletoEjecutivo.split(" ").length === 2) {
                    nombresEjecutivo = nombreCompletoEjecutivo.split(' ', 1).join(' ');
                    apellidosEjecutivo = nombreCompletoEjecutivo.split(' ').slice(1,2).join(' ');
                } else {
                    nombresEjecutivo = nombreCompletoEjecutivo.split(' ', 2).join(' ');
                    apellidosEjecutivo = nombreCompletoEjecutivo.split(' ').slice(2,4).join(' ');
                }
                let idEjecutivo = await executiveModel.getExecutiveId(nombresEjecutivo, apellidosEjecutivo);
                await colInsuInsuredExecModel.updateColInsuInsuredExecutive(resultCIIE[index].id_caae, idEjecutivo[0].id_ejecutivo);
            }
            res.render('editCollectiveVehicle', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-collective-vehicle/${idCollective}`,
                collective: resultCollective,
                fechaDesdeColectivo,
                fechaHastaColectivo,
                primaAnual,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('editCollectiveVehicle', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-collective-vehicle/${idCollective}`,
                collective: resultCollective,
                fechaDesdeColectivo,
                fechaHastaColectivo,
                primaAnual,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updateRiskDiverseCollective: async (req, res) => {
        const idCollective = req.body.id_colectivo;
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        const insurers = await insurerModel.getInsurers();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsCollective = await collectiveModel.getCollectivesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultCollective = await collectiveModel.getCollective(idCollective);
        let fechaDesdeColectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
        let fechaHastaColectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
        let primaAnual = resultCollective[0].prima_anual_colectivo;
        let deducible = resultCollective[0].deducible_colectivo;
        if (primaAnual.toString().includes('.') === true) {
            primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (deducible.toString().includes('.') === true) {
            deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (resultCollective[0].tipo_moneda_colectivo === 'BOLÍVAR') {
            primaAnual = `Bs ${primaAnual}`;
            deducible = `Bs ${deducible}`;
        } else if (resultCollective[0].tipo_moneda_colectivo === 'DÓLAR') {
            primaAnual = `$ ${primaAnual}`;
            deducible = `$ ${deducible}`;
        } else if (resultCollective[0].tipo_moneda_colectivo === 'EUROS') {
            primaAnual = `€ ${primaAnual}`;
            deducible = `€ ${deducible}`;
        }
        const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
        const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
        const resultsCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCII[0].id_caa);
        for (const resultCIIE of resultsCIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultCIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        const resultCollectiveOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
        if (resultCollectiveOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultCollectiveOA[0].agente_propio_id);
        }
        if (resultCII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
        }
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_colectivo ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_colectivo;
            let deducible = req.body.deducible_colectivo;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            let fechaPolizaDesde = new Date(req.body.fecha_desde_colectivo);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_colectivo);
            let tipoColectivo = 'RIESGOS DIVERSOS';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const estatusPoliza = 'ACTIVA';
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            if ((montoPrimaAnual.indexOf(',') !== -1) && (montoPrimaAnual.indexOf('.') !== -1)) {
                montoPrimaAnual = montoPrimaAnual.replace(",", ".");
                montoPrimaAnual = montoPrimaAnual.replace(".", ",");
                montoPrimaAnual = parseFloat(montoPrimaAnual.replace(/,/g,''));
            } else if (montoPrimaAnual.indexOf(',') !== -1) {
                montoPrimaAnual = montoPrimaAnual.replace(",", ".");
                montoPrimaAnual = parseFloat(montoPrimaAnual);
            } else if (montoPrimaAnual.indexOf('.') !== -1) {
                montoPrimaAnual = montoPrimaAnual.replace(".", ",");
                montoPrimaAnual = parseFloat(montoPrimaAnual.replace(/,/g,''));
            }
            if ((deducible.indexOf(',') !== -1) && (deducible.indexOf('.') !== -1)) {
                deducible = deducible.replace(",", ".");
                deducible = deducible.replace(".", ",");
                deducible = parseFloat(deducible.replace(/,/g,''));
            } else if (deducible.indexOf(',') !== -1) {
                deducible = deducible.replace(",", ".");
                deducible = parseFloat(deducible);
            } else if (deducible.indexOf('.') !== -1) {
                deducible = deducible.replace(".", ",");
                deducible = parseFloat(deducible.replace(/,/g,''));
            }
            await collectiveModel.updateCollective(tomadorAsegurado, montoPrimaAnual, deducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                let nombresAgentePropio;
                let apellidosAgentePropio;
                if (nombreCompletoAgente.split(" ").length === 2) {
                    nombresAgentePropio = nombreCompletoAgente.split(' ', 1).join(' ');
                    apellidosAgentePropio = nombreCompletoAgente.split(' ').slice(1,2).join(' ');
                } else {
                    nombresAgentePropio = nombreCompletoAgente.split(' ', 2).join(' ');
                    apellidosAgentePropio = nombreCompletoAgente.split(' ').slice(2,4).join(' ');
                }
                let idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio, apellidosAgentePropio);
                let resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
                if (resultCOA.length === 0) {
                    await collectiveOwnAgentModel.postCollectiveOwnAgent(idCollective, idAgentePropio);
                } else {
                    await collectiveOwnAgentModel.updateCollectiveOwnAgent(idCollective, idAgentePropio);
                } 
            } else {
                let resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
                if (resultCOA.length !== 0) {
                    const disableCAP = 1;
                    await collectiveOwnAgentModel.disableCollectiveOwnAgent(idCollective, disableCAP);
                }
            }
            await collectiveInsurerInsuredModel.updateCollectiveInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, idCollective);
            const resultCAA = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
            const resultCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCAA[0].id_caa);
            for (let index = 0; index < arrayEjecutivo.length; index++) {
                const nombreCompletoEjecutivo = arrayEjecutivo[index];
                let nombresEjecutivo;
                let apellidosEjecutivo;
                if (nombreCompletoEjecutivo.split(" ").length === 2) {
                    nombresEjecutivo = nombreCompletoEjecutivo.split(' ', 1).join(' ');
                    apellidosEjecutivo = nombreCompletoEjecutivo.split(' ').slice(1,2).join(' ');
                } else {
                    nombresEjecutivo = nombreCompletoEjecutivo.split(' ', 2).join(' ');
                    apellidosEjecutivo = nombreCompletoEjecutivo.split(' ').slice(2,4).join(' ');
                }
                let idEjecutivo = await executiveModel.getExecutiveId(nombresEjecutivo, apellidosEjecutivo);
                await colInsuInsuredExecModel.updateColInsuInsuredExecutive(resultCIIE[index].id_caae, idEjecutivo[0].id_ejecutivo);
            }
            res.render('editCollectiveRiskDiverse', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-collective-risk-diverse/${idCollective}`,
                collective: resultCollective,
                fechaDesdeColectivo,
                fechaHastaColectivo,
                primaAnual,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('editCollectiveRiskDiverse', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-collective-risk-diverse/${idCollective}`,
                collective: resultCollective,
                fechaDesdeColectivo,
                fechaHastaColectivo,
                primaAnual,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
/*               DELETE                  */
    disableCollective: async (req, res) => {
        let disableCollective = 1;
        let disableCollectiveInsurerInsured = 1;
        let disableCIIB = 1;
        let disableCIIV = 1;
        let disableCIIRD = 1;
        let disableCIIE = 1;
        let disableCAP = 1;
        await collectiveModel.updateDisableCollective(req.params.id, req.body);
        await collectiveModel.disableCollective(req.params.id, disableCollective);
        await collectiveOwnAgentModel.disableCollectiveOwnAgent(req.params.id, disableCAP);
        let disableCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(req.params.id);
        let resultCIIB = await colInsInsurerBenef.getColInsuInsuredBenef(disableCII[0].id_caa);
        let resultCIIV = await colInsInsurerVehi.getColInsuInsuredVehi(disableCII[0].id_caa);
        let resultCIIRD = await colInsInsurerRiskDiver.getColInsuInsuredRiesDiver(disableCII[0].id_caa);
        let resultCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(disableCII[0].id_caa);
        for (const itemCIIE of resultCIIE) {
            await colInsuInsuredExecModel.disableColInsuInsuredExecutive(itemCIIE.id_caae, disableCIIE);
        }
        if ((resultCIIV.length === 0) && (resultCIIRD.length === 0)) {
            for (const itemCIIB of resultCIIB) {
                await colInsInsurerBenef.disableColInsuInsuredBenef(itemCIIB.id_caab, disableCIIB);
            }
        } else if ((resultCIIB.length === 0) && (resultCIIRD.length === 0)) {
            for (const itemCIIV of resultCIIV) {
                await colInsInsurerVehi.disableColInsuInsuredVehi(itemCIIV.id_caav, disableCIIV);
            }
        } else if ((resultCIIB.length === 0) && (resultCIIV.length === 0)) {
            for (const itemCIIRD of resultCIIRD) {
                await colInsInsurerRiskDiver.disableColInsuInsuredRiesDiver(itemCIIRD.id_caard, disableCIIRD);
            }
        }
        await collectiveInsurerInsuredModel.disableCollectiveInsurerInsured(req.params.id, disableCollectiveInsurerInsured);
        res.redirect('/sistema/collectives');
    }
}