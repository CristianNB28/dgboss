const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const ownAgentModel = require('../models/own_agent');
const polInsInsurerBenefModel = require('../models/pol_aseg_asegurado_benef');
const polInsuInsuredVehiModel = require('../models/pol_insu_insured_vehi');
const receiptModel = require('../models/receipt');
const beneficiaryModel = require('../models/beneficiary');
const executiveModel = require('../models/executive');
const polInsuInsuredExecModel = require('../models/pol_insu_insured_executive');
const policyOwnAgentModel = require('../models/policy_own_agent');

module.exports = {
/*                  GET                  */
    getVehiclePolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (resultPolicy.length === 0) {
            res.render('vehiclePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            let porcentajeAgentePropio = 0;
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                if (resultNaturalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                if (resultLegalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            }
            let primaPoliza = resultPolicy[0].prima_anual_poliza;
            if (primaPoliza.toString().includes('.') === true) {
                primaPoliza = primaPoliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaPoliza = String(primaPoliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
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
            res.render('vehiclePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaPoliza: primaPoliza,
                porcentajeAgentePropio: porcentajeAgentePropio,
                comisionRecibo: comisionRecibo,
                name: req.session.name
            });
        }
    },
    getHealthPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (resultPolicy.length === 0) {
            res.render('healthPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultsBeneficiaries = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            let polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
            let porcentajeAgentePropio = 0;
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                if (resultNaturalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                if (resultLegalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            }
            for (const beneficiary of polInsInsuredBef) {
                let resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
                resultsBeneficiaries.push(resultBeneficiary[0]);
            }
            let primaPoliza = resultPolicy[0].prima_anual_poliza;
            if (primaPoliza.toString().includes('.') === true) {
                primaPoliza = primaPoliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaPoliza = String(primaPoliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
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
            res.render('healthPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaPoliza: primaPoliza,
                porcentajeAgentePropio: porcentajeAgentePropio,
                comisionRecibo: comisionRecibo,
                name: req.session.name
            });
        }
    },
    getPatrimonialPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (resultPolicy.length === 0) {
            res.render('patrimonialPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            let porcentajeAgentePropio = 0;
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                if (resultNaturalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                if (resultLegalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            }
            let primaPoliza = resultPolicy[0].prima_anual_poliza;
            if (primaPoliza.toString().includes('.') === true) {
                primaPoliza = primaPoliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaPoliza = String(primaPoliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
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
            res.render('patrimonialPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaPoliza: primaPoliza,
                porcentajeAgentePropio: porcentajeAgentePropio,
                comisionRecibo: comisionRecibo,
                name: req.session.name
            });
        }
    },
    getBailPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (resultPolicy.length === 0) {
            res.render('bailPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            let porcentajeAgentePropio = 0;
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                if (resultNaturalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                if (resultLegalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            }
            let primaPoliza = resultPolicy[0].prima_anual_poliza;
            if (primaPoliza.toString().includes('.') === true) {
                primaPoliza = primaPoliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaPoliza = String(primaPoliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
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
            res.render('bailPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaPoliza: primaPoliza,
                porcentajeAgentePropio: porcentajeAgentePropio,
                comisionRecibo: comisionRecibo,
                name: req.session.name
            });
        }
    },
    getAnotherBranchPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (resultPolicy.length === 0) {
            res.render('anotherBranchPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            let porcentajeAgentePropio = 0;
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                if (resultNaturalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                if (resultLegalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            }
            let primaPoliza = resultPolicy[0].prima_anual_poliza;
            if (primaPoliza.toString().includes('.') === true) {
                primaPoliza = primaPoliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaPoliza = String(primaPoliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
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
            res.render('anotherBranchPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaPoliza: primaPoliza,
                porcentajeAgentePropio: porcentajeAgentePropio,
                comisionRecibo: comisionRecibo,
                name: req.session.name
            });
        }
    },
    getFuneralPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (resultPolicy.length === 0) {
            res.render('funeralPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultsBeneficiaries = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            let polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
            let porcentajeAgentePropio = 0;
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                if (resultNaturalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                if (resultLegalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            }
            for (const beneficiary of polInsInsuredBef) {
                let resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
                resultsBeneficiaries.push(resultBeneficiary[0]);
            }
            let primaPoliza = resultPolicy[0].prima_anual_poliza;
            if (primaPoliza.toString().includes('.') === true) {
                primaPoliza = primaPoliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaPoliza = String(primaPoliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
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
            res.render('funeralPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaPoliza: primaPoliza,
                porcentajeAgentePropio: porcentajeAgentePropio,
                comisionRecibo: comisionRecibo,
                name: req.session.name
            });
        }
    },
    getLifePolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (resultPolicy.length === 0) {
            res.render('lifePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultsBeneficiaries = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            let polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
            let porcentajeAgentePropio = 0;
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                if (resultNaturalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                if (resultLegalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            }
            for (const beneficiary of polInsInsuredBef) {
                let resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
                resultsBeneficiaries.push(resultBeneficiary[0]);
            }
            let primaPoliza = resultPolicy[0].prima_anual_poliza;
            if (primaPoliza.toString().includes('.') === true) {
                primaPoliza = primaPoliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaPoliza = String(primaPoliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
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
            res.render('lifePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaPoliza: primaPoliza,
                porcentajeAgentePropio: porcentajeAgentePropio,
                comisionRecibo: comisionRecibo,
                name: req.session.name
            });
        }
    },
    getAPPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (resultPolicy.length === 0) {
            res.render('apPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            let porcentajeAgentePropio = 0;
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                if (resultNaturalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                if (resultLegalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            }
            let primaPoliza = resultPolicy[0].prima_anual_poliza;
            if (primaPoliza.toString().includes('.') === true) {
                primaPoliza = primaPoliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaPoliza = String(primaPoliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
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
            res.render('apPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaPoliza: primaPoliza,
                porcentajeAgentePropio: porcentajeAgentePropio,
                comisionRecibo: comisionRecibo,
                name: req.session.name
            });
        }
    },
    getTravelPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (resultPolicy.length === 0) {
            res.render('travelPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            let porcentajeAgentePropio = 0;
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                if (resultNaturalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                if (resultLegalInsured[0].agente_propio_id !== null) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                    porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                    porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                }
            }
            let primaPoliza = resultPolicy[0].prima_anual_poliza;
            if (primaPoliza.toString().includes('.') === true) {
                primaPoliza = primaPoliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaPoliza = String(primaPoliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
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
            res.render('travelPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaPoliza: primaPoliza,
                porcentajeAgentePropio: porcentajeAgentePropio,
                comisionRecibo: comisionRecibo,
                name: req.session.name
            });
        }
    },
    getPolicies: async (req, res) => {
        let resultsPolicies =  await policyModel.getPolicies();
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        for (let index = 0; index < resultsPII.length; index++) {
            let elementPII = resultsPII[index];
            let resultInsurer = await insurerModel.getInsurer(elementPII.aseguradora_id);
            for (let index = 0; index < resultsPolicies.length; index++) {
                let elementPolicy = resultsPolicies[index];
                if ((index < elementPII.id_paa) && (typeof(elementPolicy.fecha_desde_poliza) !== 'string')) {
                    let primaPoliza = elementPolicy.prima_anual_poliza;
                    if (primaPoliza.toString().includes('.') === true) {
                        elementPolicy.prima_anual_poliza = elementPolicy.prima_anual_poliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                    } else {
                        elementPolicy.prima_anual_poliza = String(elementPolicy.prima_anual_poliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                    }
                    if (elementPolicy.tipo_moneda_poliza === 'BOLÍVAR') {
                        elementPolicy.prima_anual_poliza = `Bs ${elementPolicy.prima_anual_poliza}`;
                    } else if (elementPolicy.tipo_moneda_poliza === 'DÓLAR') {
                        elementPolicy.prima_anual_poliza = `$ ${elementPolicy.prima_anual_poliza}`;
                    } else if (elementPolicy.tipo_moneda_poliza === 'EUROS') {
                        elementPolicy.prima_anual_poliza = `€ ${elementPolicy.prima_anual_poliza}`;
                    }
                    elementPolicy.fecha_desde_poliza = elementPolicy.fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"); 
                    elementPolicy.fecha_hasta_poliza = elementPolicy.fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
                    elementPolicy.nombre_aseguradora = resultInsurer[0].nombre_aseguradora;
                    break;
                }
            }
        }
        res.render('policies', {
            data: resultsPolicies,
            name: req.session.name
        });
    },
    getPoliciesDetail: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            let resultsBeneficiaries = [];
            let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy);
            let resultsPIIB = await polInsInsurerBenefModel.getPolInsuInsuredBenef(resultPII[0].id_paa);
            for (const resultPIIB of resultsPIIB) {
                let resultBenefiary = await beneficiaryModel.getBeneficiary(resultPIIB.beneficiario_id);
                resultsBeneficiaries.push(resultBenefiary[0]);
            }
            for (const resultBeneficiary of resultsBeneficiaries) {
                resultBeneficiary.fec_nac_beneficiario = resultBeneficiary.fec_nac_beneficiario.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            }
            res.render('policiesBeneficiaries', {
                data: resultsBeneficiaries,
                name: req.session.name
            });
        } else {
            next();
        }
    },
/*                 POST                  */
    postVehiclePolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'AUTOMÓVIL';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            let policy = await policyModel.postVehiclePolicyForm(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            let paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
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
                await polInsuInsuredExecModel.postPolInsuInsuredExecutive(paa.insertId, idEjecutivo[0].id_ejecutivo);
            }
            res.redirect('/sistema/add-vehicle-policy');
        } catch (error) {
            console.log(error);
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
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        }
    },
    postHealthPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let cobertura = req.body.tipo_cobertura_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            cobertura = cobertura.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            if (cobertura === '') {
                cobertura = 0;
            } else {
                if ((cobertura.indexOf(',') !== -1) && (cobertura.indexOf('.') !== -1)) {
                    cobertura = cobertura.replace(",", ".");
                    cobertura = cobertura.replace(".", ",");
                    cobertura = parseFloat(cobertura.replace(/,/g,''));
                } else if (cobertura.indexOf(',') !== -1) {
                    cobertura = cobertura.replace(",", ".");
                    cobertura = parseFloat(cobertura);
                } else if (cobertura.indexOf('.') !== -1) {
                    cobertura = cobertura.replace(".", ",");
                    cobertura = parseFloat(cobertura.replace(/,/g,''));
                }
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let fechaDetalleCliente = new Date(req.body.detalle_cliente_poliza);
            let tipoIndividualPoliza = 'SALUD';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            let policy = await policyModel.postHealthPolicyForm(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, cobertura, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoIndividualPoliza, estatusPoliza, req.body);
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
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            let paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
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
                await polInsuInsuredExecModel.postPolInsuInsuredExecutive(paa.insertId, idEjecutivo[0].id_ejecutivo);
            }
            res.redirect('/sistema/add-health-policy');
        } catch (error) {
            console.log(error);
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
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        }
    },
    postPatrimonialPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'PATRIMONIAL';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            let policy = await policyModel.postPatrimonialPolicyForm(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            let paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
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
                await polInsuInsuredExecModel.postPolInsuInsuredExecutive(paa.insertId, idEjecutivo[0].id_ejecutivo);
            }
            res.redirect('/sistema/add-patrimonial-policy');
        } catch (error) {
            console.log(error);
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
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        }
    },
    postBailPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'FIANZA';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            let policy = await policyModel.postBailPolicyForm(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            let paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
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
                await polInsuInsuredExecModel.postPolInsuInsuredExecutive(paa.insertId, idEjecutivo[0].id_ejecutivo);
            }
            res.redirect('/sistema/add-bail-policy');
        } catch (error) {
            console.log(error);
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
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        }
    },
    postAnotherBranchPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'OTROS RAMOS';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            let policy = await policyModel.postAnotherBranchPolicyForm(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            let paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
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
                await polInsuInsuredExecModel.postPolInsuInsuredExecutive(paa.insertId, idEjecutivo[0].id_ejecutivo);
            }
            res.redirect('/sistema/add-another-branch-policy');
        } catch (error) {
            console.log(error);
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
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        }
    },
    postFuneralPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'FUNERARIO';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            let policy = await policyModel.postFuneralPolicyForm(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            let paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
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
                await polInsuInsuredExecModel.postPolInsuInsuredExecutive(paa.insertId, idEjecutivo[0].id_ejecutivo);
            }
            res.redirect('/sistema/add-funeral-policy');
        } catch (error) {
            console.log(error);
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
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        }
    },
    postLifePolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'VIDA';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            let policy = await policyModel.postLifePolicyForm(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            let paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
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
                await polInsuInsuredExecModel.postPolInsuInsuredExecutive(paa.insertId, idEjecutivo[0].id_ejecutivo);
            }
            res.redirect('/sistema/add-life-policy');
        } catch (error) {
            console.log(error);
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
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        }
    },
    postAPPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'AP';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            let policy = await policyModel.postAPPolicyForm(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            let paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
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
                await polInsuInsuredExecModel.postPolInsuInsuredExecutive(paa.insertId, idEjecutivo[0].id_ejecutivo);
            }
            res.redirect('/sistema/add-ap-policy');
        } catch (error) {
            console.log(error);
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
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        }
    },
    postTravelPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'VIAJE';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            let policy = await policyModel.postTravelPolicyForm(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            let paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
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
                await polInsuInsuredExecModel.postPolInsuInsuredExecutive(paa.insertId, idEjecutivo[0].id_ejecutivo);
            }
            res.redirect('/sistema/add-travel-policy');
        } catch (error) {
            console.log(error);
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
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        }
    },
/*                  PUT                  */
    putHealthPolicy: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            let resultsLegalInsureds = await insuredModel.getLegalInsureds();
            let resultsPolicies = await policyModel.getPoliciesNumbers();
            let resultsReceipts = await receiptModel.getReceipts();
            let insurers = await insurerModel.getInsurers();
            let resultsExecutives = await executiveModel.getExecutives();
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultPolicy = await policyModel.getPolicy(idPolicy);
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            let fechaDetalleCliente = resultPolicy[0].detalle_cliente_poliza;
            let primaAnual = resultPolicy[0].prima_anual_poliza;
            let cobertura = resultPolicy[0].tipo_cobertura_poliza;
            let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let deducible = resultPolicy[0].deducible_poliza;
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
            if (cobertura.toString().includes('.') === true) {
                cobertura = cobertura.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                cobertura = String(cobertura).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (sumaAsegurada.toString().includes('.') === true) {
                sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (deducible.toString().includes('.') === true) {
                deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
                primaAnual = `Bs ${primaAnual}`;
                cobertura = `Bs ${cobertura}`;
                sumaAsegurada = `Bs ${sumaAsegurada}`;
                deducible = `Bs ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
                primaAnual = `$ ${primaAnual}`;
                cobertura = `$ ${cobertura}`;
                sumaAsegurada = `$ ${sumaAsegurada}`;
                deducible = `$ ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
                primaAnual = `€ ${primaAnual}`;
                cobertura = `€ ${cobertura}`;
                sumaAsegurada = `€ ${sumaAsegurada}`;
                deducible = `€ ${deducible}`;
            }
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            res.render('editPolicyHealth', {
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                fechaDetalleCliente,
                primaAnual,
                cobertura,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    putVehiclePolicy: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            let resultsLegalInsureds = await insuredModel.getLegalInsureds();
            let resultsPolicies = await policyModel.getPoliciesNumbers();
            let resultsReceipts = await receiptModel.getReceipts();
            let insurers = await insurerModel.getInsurers();
            let resultsExecutives = await executiveModel.getExecutives();
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultPolicy = await policyModel.getPolicy(idPolicy);
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            let primaAnual = resultPolicy[0].prima_anual_poliza;
            let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let deducible = resultPolicy[0].deducible_poliza;
            if (primaAnual.toString().includes('.') === true) {
                primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (sumaAsegurada.toString().includes('.') === true) {
                sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (deducible.toString().includes('.') === true) {
                deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
                primaAnual = `Bs ${primaAnual}`;
                sumaAsegurada = `Bs ${sumaAsegurada}`;
                deducible = `Bs ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
                primaAnual = `$ ${primaAnual}`;
                sumaAsegurada = `$ ${sumaAsegurada}`;
                deducible = `$ ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
                primaAnual = `€ ${primaAnual}`;
                sumaAsegurada = `€ ${sumaAsegurada}`;
                deducible = `€ ${deducible}`;
            }
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            res.render('editPolicyVehicle', {
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    putPatrimonialPolicy: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            let resultsLegalInsureds = await insuredModel.getLegalInsureds();
            let resultsPolicies = await policyModel.getPoliciesNumbers();
            let resultsReceipts = await receiptModel.getReceipts();
            let insurers = await insurerModel.getInsurers();
            let resultsExecutives = await executiveModel.getExecutives();
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultPolicy = await policyModel.getPolicy(idPolicy);
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            let primaAnual = resultPolicy[0].prima_anual_poliza;
            let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let deducible = resultPolicy[0].deducible_poliza;
            if (primaAnual.toString().includes('.') === true) {
                primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (sumaAsegurada.toString().includes('.') === true) {
                sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (deducible.toString().includes('.') === true) {
                deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
                primaAnual = `Bs ${primaAnual}`;
                sumaAsegurada = `Bs ${sumaAsegurada}`;
                deducible = `Bs ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
                primaAnual = `$ ${primaAnual}`;
                sumaAsegurada = `$ ${sumaAsegurada}`;
                deducible = `$ ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
                primaAnual = `€ ${primaAnual}`;
                sumaAsegurada = `€ ${sumaAsegurada}`;
                deducible = `€ ${deducible}`;
            }
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            res.render('editPolicyPatrimonial', {
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    putBailPolicy: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            let resultsLegalInsureds = await insuredModel.getLegalInsureds();
            let resultsPolicies = await policyModel.getPoliciesNumbers();
            let resultsReceipts = await receiptModel.getReceipts();
            let insurers = await insurerModel.getInsurers();
            let resultsExecutives = await executiveModel.getExecutives();
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultPolicy = await policyModel.getPolicy(idPolicy);
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            let primaAnual = resultPolicy[0].prima_anual_poliza;
            let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let deducible = resultPolicy[0].deducible_poliza;
            if (primaAnual.toString().includes('.') === true) {
                primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (sumaAsegurada.toString().includes('.') === true) {
                sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (deducible.toString().includes('.') === true) {
                deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
                primaAnual = `Bs ${primaAnual}`;
                sumaAsegurada = `Bs ${sumaAsegurada}`;
                deducible = `Bs ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
                primaAnual = `$ ${primaAnual}`;
                sumaAsegurada = `$ ${sumaAsegurada}`;
                deducible = `$ ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
                primaAnual = `€ ${primaAnual}`;
                sumaAsegurada = `€ ${sumaAsegurada}`;
                deducible = `€ ${deducible}`;
            }
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            res.render('editPolicyBail', {
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    putAnotherBranchPolicy: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            let resultsLegalInsureds = await insuredModel.getLegalInsureds();
            let resultsPolicies = await policyModel.getPoliciesNumbers();
            let resultsReceipts = await receiptModel.getReceipts();
            let insurers = await insurerModel.getInsurers();
            let resultsExecutives = await executiveModel.getExecutives();
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultPolicy = await policyModel.getPolicy(idPolicy);
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            let primaAnual = resultPolicy[0].prima_anual_poliza;
            let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let deducible = resultPolicy[0].deducible_poliza;
            if (primaAnual.toString().includes('.') === true) {
                primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (sumaAsegurada.toString().includes('.') === true) {
                sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (deducible.toString().includes('.') === true) {
                deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
                primaAnual = `Bs ${primaAnual}`;
                sumaAsegurada = `Bs ${sumaAsegurada}`;
                deducible = `Bs ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
                primaAnual = `$ ${primaAnual}`;
                sumaAsegurada = `$ ${sumaAsegurada}`;
                deducible = `$ ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
                primaAnual = `€ ${primaAnual}`;
                sumaAsegurada = `€ ${sumaAsegurada}`;
                deducible = `€ ${deducible}`;
            }
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            res.render('editPolicyAnotherBranch', {
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    putFuneralPolicy: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            let resultsLegalInsureds = await insuredModel.getLegalInsureds();
            let resultsPolicies = await policyModel.getPoliciesNumbers();
            let resultsReceipts = await receiptModel.getReceipts();
            let insurers = await insurerModel.getInsurers();
            let resultsExecutives = await executiveModel.getExecutives();
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultPolicy = await policyModel.getPolicy(idPolicy);
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            let primaAnual = resultPolicy[0].prima_anual_poliza;
            let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let deducible = resultPolicy[0].deducible_poliza;
            if (primaAnual.toString().includes('.') === true) {
                primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (sumaAsegurada.toString().includes('.') === true) {
                sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (deducible.toString().includes('.') === true) {
                deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
                primaAnual = `Bs ${primaAnual}`;
                sumaAsegurada = `Bs ${sumaAsegurada}`;
                deducible = `Bs ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
                primaAnual = `$ ${primaAnual}`;
                sumaAsegurada = `$ ${sumaAsegurada}`;
                deducible = `$ ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
                primaAnual = `€ ${primaAnual}`;
                sumaAsegurada = `€ ${sumaAsegurada}`;
                deducible = `€ ${deducible}`;
            }
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            res.render('editPolicyFuneral', {
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    putLifePolicy: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            let resultsLegalInsureds = await insuredModel.getLegalInsureds();
            let resultsPolicies = await policyModel.getPoliciesNumbers();
            let resultsReceipts = await receiptModel.getReceipts();
            let insurers = await insurerModel.getInsurers();
            let resultsExecutives = await executiveModel.getExecutives();
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultPolicy = await policyModel.getPolicy(idPolicy);
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            let primaAnual = resultPolicy[0].prima_anual_poliza;
            let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let deducible = resultPolicy[0].deducible_poliza;
            if (primaAnual.toString().includes('.') === true) {
                primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (sumaAsegurada.toString().includes('.') === true) {
                sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (deducible.toString().includes('.') === true) {
                deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
                primaAnual = `Bs ${primaAnual}`;
                sumaAsegurada = `Bs ${sumaAsegurada}`;
                deducible = `Bs ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
                primaAnual = `$ ${primaAnual}`;
                sumaAsegurada = `$ ${sumaAsegurada}`;
                deducible = `$ ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
                primaAnual = `€ ${primaAnual}`;
                sumaAsegurada = `€ ${sumaAsegurada}`;
                deducible = `€ ${deducible}`;
            }
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            res.render('editPolicyLife', {
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    putAPPolicy: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            let resultsLegalInsureds = await insuredModel.getLegalInsureds();
            let resultsPolicies = await policyModel.getPoliciesNumbers();
            let resultsReceipts = await receiptModel.getReceipts();
            let insurers = await insurerModel.getInsurers();
            let resultsExecutives = await executiveModel.getExecutives();
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultPolicy = await policyModel.getPolicy(idPolicy);
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            let primaAnual = resultPolicy[0].prima_anual_poliza;
            let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let deducible = resultPolicy[0].deducible_poliza;
            if (primaAnual.toString().includes('.') === true) {
                primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (sumaAsegurada.toString().includes('.') === true) {
                sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (deducible.toString().includes('.') === true) {
                deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
                primaAnual = `Bs ${primaAnual}`;
                sumaAsegurada = `Bs ${sumaAsegurada}`;
                deducible = `Bs ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
                primaAnual = `$ ${primaAnual}`;
                sumaAsegurada = `$ ${sumaAsegurada}`;
                deducible = `$ ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
                primaAnual = `€ ${primaAnual}`;
                sumaAsegurada = `€ ${sumaAsegurada}`;
                deducible = `€ ${deducible}`;
            }
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            res.render('editPolicyAP', {
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    putTravelPolicy: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            let resultsLegalInsureds = await insuredModel.getLegalInsureds();
            let resultsPolicies = await policyModel.getPoliciesNumbers();
            let resultsReceipts = await receiptModel.getReceipts();
            let insurers = await insurerModel.getInsurers();
            let resultsExecutives = await executiveModel.getExecutives();
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultPolicy = await policyModel.getPolicy(idPolicy);
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            let primaAnual = resultPolicy[0].prima_anual_poliza;
            let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let deducible = resultPolicy[0].deducible_poliza;
            if (primaAnual.toString().includes('.') === true) {
                primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (sumaAsegurada.toString().includes('.') === true) {
                sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (deducible.toString().includes('.') === true) {
                deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
                primaAnual = `Bs ${primaAnual}`;
                sumaAsegurada = `Bs ${sumaAsegurada}`;
                deducible = `Bs ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
                primaAnual = `$ ${primaAnual}`;
                sumaAsegurada = `$ ${sumaAsegurada}`;
                deducible = `$ ${deducible}`;
            } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
                primaAnual = `€ ${primaAnual}`;
                sumaAsegurada = `€ ${sumaAsegurada}`;
                deducible = `€ ${deducible}`;
            }
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            res.render('editPolicyTravel', {
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updateHealthPolicy: async (req, res) => {
        let idPolicy = req.body.id_poliza;
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let insurers = await insurerModel.getInsurers();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicy(idPolicy);
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        let fechaDetalleCliente = resultPolicy[0].detalle_cliente_poliza;
        let primaAnual = resultPolicy[0].prima_anual_poliza;
        let cobertura = resultPolicy[0].tipo_cobertura_poliza;
        let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let deducible = resultPolicy[0].deducible_poliza;
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
        if (cobertura.toString().includes('.') === true) {
            cobertura = cobertura.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            cobertura = String(cobertura).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (sumaAsegurada.toString().includes('.') === true) {
            sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (deducible.toString().includes('.') === true) {
            deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
            primaAnual = `Bs ${primaAnual}`;
            cobertura = `Bs ${cobertura}`;
            sumaAsegurada = `Bs ${sumaAsegurada}`;
            deducible = `Bs ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
            primaAnual = `$ ${primaAnual}`;
            cobertura = `$ ${cobertura}`;
            sumaAsegurada = `$ ${sumaAsegurada}`;
            deducible = `$ ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
            primaAnual = `€ ${primaAnual}`;
            cobertura = `€ ${cobertura}`;
            sumaAsegurada = `€ ${sumaAsegurada}`;
            deducible = `€ ${deducible}`;
        }
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let cobertura = req.body.tipo_cobertura_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            cobertura = cobertura.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            if (cobertura === '') {
                cobertura = 0;
            } else {
                if ((cobertura.indexOf(',') !== -1) && (cobertura.indexOf('.') !== -1)) {
                    cobertura = cobertura.replace(",", ".");
                    cobertura = cobertura.replace(".", ",");
                    cobertura = parseFloat(cobertura.replace(/,/g,''));
                } else if (cobertura.indexOf(',') !== -1) {
                    cobertura = cobertura.replace(",", ".");
                    cobertura = parseFloat(cobertura);
                } else if (cobertura.indexOf('.') !== -1) {
                    cobertura = cobertura.replace(".", ",");
                    cobertura = parseFloat(cobertura.replace(/,/g,''));
                }
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let fechaDetalleCliente = new Date(req.body.detalle_cliente_poliza);
            let tipoIndividualPoliza = 'SALUD';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            await policyModel.updateHealthPolicy(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, cobertura, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoIndividualPoliza, estatusPoliza, req.body);
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
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } 
            } else {
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(req.body.id_poliza, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, req.body.id_poliza);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(req.body.id_poliza);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
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
                await polInsuInsuredExecModel.updatePolInsuInsuredExecutive(resultPIIE[index].id_paae, idEjecutivo[0].id_ejecutivo);
            }
            res.render('editPolicyHealth', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-policy-health/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                fechaDetalleCliente,
                primaAnual,
                cobertura,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } catch (error) {
            console.log(error);
            res.render('editPolicyHealth', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-policy-health/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                fechaDetalleCliente,
                primaAnual,
                cobertura,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        }
    },
    updateVehiclePolicy: async (req, res) => {
        let idPolicy = req.body.id_poliza;
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let insurers = await insurerModel.getInsurers();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicy(idPolicy);
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        let primaAnual = resultPolicy[0].prima_anual_poliza;
        let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let deducible = resultPolicy[0].deducible_poliza;
        if (primaAnual.toString().includes('.') === true) {
            primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (sumaAsegurada.toString().includes('.') === true) {
            sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (deducible.toString().includes('.') === true) {
            deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
            primaAnual = `Bs ${primaAnual}`;
            sumaAsegurada = `Bs ${sumaAsegurada}`;
            deducible = `Bs ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
            primaAnual = `$ ${primaAnual}`;
            sumaAsegurada = `$ ${sumaAsegurada}`;
            deducible = `$ ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
            primaAnual = `€ ${primaAnual}`;
            sumaAsegurada = `€ ${sumaAsegurada}`;
            deducible = `€ ${deducible}`;
        }
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'AUTOMÓVIL';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            await policyModel.updateVehiclePolicy(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } 
            } else {
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(req.body.id_poliza, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, req.body.id_poliza);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(req.body.id_poliza);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
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
                await polInsuInsuredExecModel.updatePolInsuInsuredExecutive(resultPIIE[index].id_paae, idEjecutivo[0].id_ejecutivo);
            }
            res.render('editPolicyVehicle', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-policy-vehicle/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } catch (error) {
            console.log(error);
            res.render('editPolicyVehicle', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-policy-vehicle/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        }
    },
    updatePatrimomialPolicy: async (req, res) => {
        let idPolicy = req.body.id_poliza;
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let insurers = await insurerModel.getInsurers();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicy(idPolicy);
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        let primaAnual = resultPolicy[0].prima_anual_poliza;
        let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let deducible = resultPolicy[0].deducible_poliza;
        if (primaAnual.toString().includes('.') === true) {
            primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (sumaAsegurada.toString().includes('.') === true) {
            sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (deducible.toString().includes('.') === true) {
            deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
            primaAnual = `Bs ${primaAnual}`;
            sumaAsegurada = `Bs ${sumaAsegurada}`;
            deducible = `Bs ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
            primaAnual = `$ ${primaAnual}`;
            sumaAsegurada = `$ ${sumaAsegurada}`;
            deducible = `$ ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
            primaAnual = `€ ${primaAnual}`;
            sumaAsegurada = `€ ${sumaAsegurada}`;
            deducible = `€ ${deducible}`;
        }
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'PATRIMONIAL';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            await policyModel.updatePatrimonialPolicy(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } 
            } else {
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(req.body.id_poliza, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, req.body.id_poliza);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(req.body.id_poliza);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
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
                await polInsuInsuredExecModel.updatePolInsuInsuredExecutive(resultPIIE[index].id_paae, idEjecutivo[0].id_ejecutivo);
            }
            res.render('editPolicyPatrimonial', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-policy-patrimonial/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } catch (error) {
            console.log(error);
            res.render('editPolicyPatrimonial', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-policy-patrimonial/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        }
    },
    updateBailPolicy: async (req, res) => {
        let idPolicy = req.body.id_poliza;
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let insurers = await insurerModel.getInsurers();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicy(idPolicy);
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        let primaAnual = resultPolicy[0].prima_anual_poliza;
        let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let deducible = resultPolicy[0].deducible_poliza;
        if (primaAnual.toString().includes('.') === true) {
            primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (sumaAsegurada.toString().includes('.') === true) {
            sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (deducible.toString().includes('.') === true) {
            deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
            primaAnual = `Bs ${primaAnual}`;
            sumaAsegurada = `Bs ${sumaAsegurada}`;
            deducible = `Bs ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
            primaAnual = `$ ${primaAnual}`;
            sumaAsegurada = `$ ${sumaAsegurada}`;
            deducible = `$ ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
            primaAnual = `€ ${primaAnual}`;
            sumaAsegurada = `€ ${sumaAsegurada}`;
            deducible = `€ ${deducible}`;
        }
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'FIANZA';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            await policyModel.updateBailPolicy(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } 
            } else {
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(req.body.id_poliza, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, req.body.id_poliza);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(req.body.id_poliza);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
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
                await polInsuInsuredExecModel.updatePolInsuInsuredExecutive(resultPIIE[index].id_paae, idEjecutivo[0].id_ejecutivo);
            }
            res.render('editPolicyBail', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-policy-bail/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } catch (error) {
            console.log(error);
            res.render('editPolicyBail', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-policy-bail/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        }
    },
    updateAnotherBranchPolicy: async (req, res) => {
        let idPolicy = req.body.id_poliza;
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let insurers = await insurerModel.getInsurers();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicy(idPolicy);
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        let primaAnual = resultPolicy[0].prima_anual_poliza;
        let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let deducible = resultPolicy[0].deducible_poliza;
        if (primaAnual.toString().includes('.') === true) {
            primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (sumaAsegurada.toString().includes('.') === true) {
            sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (deducible.toString().includes('.') === true) {
            deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
            primaAnual = `Bs ${primaAnual}`;
            sumaAsegurada = `Bs ${sumaAsegurada}`;
            deducible = `Bs ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
            primaAnual = `$ ${primaAnual}`;
            sumaAsegurada = `$ ${sumaAsegurada}`;
            deducible = `$ ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
            primaAnual = `€ ${primaAnual}`;
            sumaAsegurada = `€ ${sumaAsegurada}`;
            deducible = `€ ${deducible}`;
        }
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'OTROS RAMOS';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            await policyModel.updateAnotherBranchPolicy(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } 
            } else {
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(req.body.id_poliza, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, req.body.id_poliza);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(req.body.id_poliza);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
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
                await polInsuInsuredExecModel.updatePolInsuInsuredExecutive(resultPIIE[index].id_paae, idEjecutivo[0].id_ejecutivo);
            }
            res.render('editPolicyAnotherBranch', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-policy-another-branch/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } catch (error) {
            console.log(error);
            res.render('editPolicyAnotherBranch', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-policy-another-branch/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        }
    },
    updateFuneralPolicy: async (req, res) => {
        let idPolicy = req.body.id_poliza;
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let insurers = await insurerModel.getInsurers();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicy(idPolicy);
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        let primaAnual = resultPolicy[0].prima_anual_poliza;
        let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let deducible = resultPolicy[0].deducible_poliza;
        if (primaAnual.toString().includes('.') === true) {
            primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (sumaAsegurada.toString().includes('.') === true) {
            sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (deducible.toString().includes('.') === true) {
            deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
            primaAnual = `Bs ${primaAnual}`;
            sumaAsegurada = `Bs ${sumaAsegurada}`;
            deducible = `Bs ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
            primaAnual = `$ ${primaAnual}`;
            sumaAsegurada = `$ ${sumaAsegurada}`;
            deducible = `$ ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
            primaAnual = `€ ${primaAnual}`;
            sumaAsegurada = `€ ${sumaAsegurada}`;
            deducible = `€ ${deducible}`;
        }
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'FUNERARIO';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            await policyModel.updateFuneralPolicy(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } 
            } else {
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(req.body.id_poliza, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, req.body.id_poliza);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(req.body.id_poliza);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
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
                await polInsuInsuredExecModel.updatePolInsuInsuredExecutive(resultPIIE[index].id_paae, idEjecutivo[0].id_ejecutivo);
            }
            res.render('editPolicyFuneral', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-policy-funeral/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } catch (error) {
            console.log(error);
            res.render('editPolicyFuneral', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-policy-funeral/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        }
    },
    updateLifePolicy: async (req, res) => {
        let idPolicy = req.body.id_poliza;
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let insurers = await insurerModel.getInsurers();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicy(idPolicy);
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        let primaAnual = resultPolicy[0].prima_anual_poliza;
        let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let deducible = resultPolicy[0].deducible_poliza;
        if (primaAnual.toString().includes('.') === true) {
            primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (sumaAsegurada.toString().includes('.') === true) {
            sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (deducible.toString().includes('.') === true) {
            deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
            primaAnual = `Bs ${primaAnual}`;
            sumaAsegurada = `Bs ${sumaAsegurada}`;
            deducible = `Bs ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
            primaAnual = `$ ${primaAnual}`;
            sumaAsegurada = `$ ${sumaAsegurada}`;
            deducible = `$ ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
            primaAnual = `€ ${primaAnual}`;
            sumaAsegurada = `€ ${sumaAsegurada}`;
            deducible = `€ ${deducible}`;
        }
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'VIDA';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            await policyModel.updateLifePolicy(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } 
            } else {
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(req.body.id_poliza, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, req.body.id_poliza);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(req.body.id_poliza);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
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
                await polInsuInsuredExecModel.updatePolInsuInsuredExecutive(resultPIIE[index].id_paae, idEjecutivo[0].id_ejecutivo);
            }
            res.render('editPolicyLife', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-policy-life/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } catch (error) {
            console.log(error);
            res.render('editPolicyLife', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-policy-life/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        }
    },
    updateAPPolicy: async (req, res) => {
        let idPolicy = req.body.id_poliza;
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let insurers = await insurerModel.getInsurers();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicy(idPolicy);
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        let primaAnual = resultPolicy[0].prima_anual_poliza;
        let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let deducible = resultPolicy[0].deducible_poliza;
        if (primaAnual.toString().includes('.') === true) {
            primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (sumaAsegurada.toString().includes('.') === true) {
            sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (deducible.toString().includes('.') === true) {
            deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
            primaAnual = `Bs ${primaAnual}`;
            sumaAsegurada = `Bs ${sumaAsegurada}`;
            deducible = `Bs ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
            primaAnual = `$ ${primaAnual}`;
            sumaAsegurada = `$ ${sumaAsegurada}`;
            deducible = `$ ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
            primaAnual = `€ ${primaAnual}`;
            sumaAsegurada = `€ ${sumaAsegurada}`;
            deducible = `€ ${deducible}`;
        }
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'AP';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            await policyModel.updateAPPolicy(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } 
            } else {
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(req.body.id_poliza, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, req.body.id_poliza);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(req.body.id_poliza);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
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
                await polInsuInsuredExecModel.updatePolInsuInsuredExecutive(resultPIIE[index].id_paae, idEjecutivo[0].id_ejecutivo);
            }
            res.render('editPolicyAP', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-policy-ap/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } catch (error) {
            console.log(error);
            res.render('editPolicyAP', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-policy-ap/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        }
    },
    updateTravelPolicy: async (req, res) => {
        let idPolicy = req.body.id_poliza;
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let insurers = await insurerModel.getInsurers();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicy(idPolicy);
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        let primaAnual = resultPolicy[0].prima_anual_poliza;
        let sumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let deducible = resultPolicy[0].deducible_poliza;
        if (primaAnual.toString().includes('.') === true) {
            primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaAnual = String(primaAnual).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (sumaAsegurada.toString().includes('.') === true) {
            sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (deducible.toString().includes('.') === true) {
            deducible = deducible.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            deducible = String(deducible).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
            primaAnual = `Bs ${primaAnual}`;
            sumaAsegurada = `Bs ${sumaAsegurada}`;
            deducible = `Bs ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
            primaAnual = `$ ${primaAnual}`;
            sumaAsegurada = `$ ${sumaAsegurada}`;
            deducible = `$ ${deducible}`;
        } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
            primaAnual = `€ ${primaAnual}`;
            sumaAsegurada = `€ ${sumaAsegurada}`;
            deducible = `€ ${deducible}`;
        }
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
            let montoPrimaAnual = req.body.prima_anual_poliza;
            let deducible = req.body.deducible_poliza;
            let sumaAsegurada = req.body.suma_asegurada_poliza;
            let arrayEjecutivo = [];
            let nombreCompletoAgente = req.body.nombre_agentes_propios;
            montoPrimaAnual = montoPrimaAnual.replace(/[Bs$€]/g, '').replace(' ', '');
            deducible = deducible.replace(/[Bs$€]/g, '').replace(' ', '');
            sumaAsegurada = sumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
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
            if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            } else if (sumaAsegurada.indexOf(',') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(",", ".");
                sumaAsegurada = parseFloat(sumaAsegurada);
            } else if (sumaAsegurada.indexOf('.') !== -1) {
                sumaAsegurada = sumaAsegurada.replace(".", ",");
                sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
            }
            let fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            let fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            let tipoIndividualPoliza = 'VIAJE';
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let estatusPoliza = '';
            let diasExpiracion = 0;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            diasExpiracion = diferenciaDias.toFixed(0);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (diasExpiracion > 0) {
                estatusPoliza = 'VIGENTE';
            } else {
                estatusPoliza = 'ANULADO';
            }
            arrayEjecutivo = [req.body.nombre_ejecutivo_coordinador, req.body.nombre_ejecutivo_suscripcion, req.body.nombre_ejecutivo_siniestros, req.body.nombre_ejecutivo_cobranzas];
            await policyModel.updateTravelPolicy(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
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
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(req.body.id_poliza, idAgentePropio);
                } 
            } else {
                let resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(req.body.id_poliza);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(req.body.id_poliza, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, req.body.id_poliza);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(req.body.id_poliza);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
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
                await polInsuInsuredExecModel.updatePolInsuInsuredExecutive(resultPIIE[index].id_paae, idEjecutivo[0].id_ejecutivo);
            }
            res.render('editPolicyTravel', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-policy-travel/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        } catch (error) {
            console.log(error);
            res.render('editPolicyTravel', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-policy-travel/${idPolicy}`,
                policy: resultPolicy[0],
                fechaDesdePoliza,
                fechaHastaPoliza,
                primaAnual,
                sumaAsegurada,
                deducible,
                insurers,
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name
            });
        }
    },
/*               DELETE                  */
    disablePolicy: async (req, res) => {
        let disablePolicy = 1;
        let disablePolicyInsurerInsured = 1;
        let disablePIIB = 1;
        let disablePIIV = 1;
        let disablePIIE = 1;
        let disablePAP = 1;
        await policyModel.updateDisablePolicy(req.params.id, req.body);
        await policyModel.disablePolicy(req.params.id, disablePolicy);
        await policyOwnAgentModel.disablePolicyOwnAgent(req.params.id, disablePAP);
        let disablePII = await policyInsurerInsuredModel.getPolicyInsurerInsured(req.params.id);
        let resultPIIB = await polInsInsurerBenefModel.getPolInsuInsuredBenef(disablePII[0].id_paa);
        let resultPIIV = await polInsuInsuredVehiModel.getPolInsuInsuredVehi(disablePII[0].id_paa);
        let resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(disablePII[0].id_paa);
        for (const itemPIIE of resultPIIE) {
            await polInsuInsuredExecModel.disablePolInsuInsuredExecutive(itemPIIE.id_paae, disablePIIE);
        }
        if (resultPIIV.length === 0) {
            for (const itemPIIB of resultPIIB) {
                await polInsInsurerBenefModel.disablePolInsuInsuredBenef(itemPIIB.id_paab, disablePIIB);
            }
        } else if (resultPIIB.length === 0) {
            for (const itemPIIV of resultPIIV) {
                await polInsuInsuredVehiModel.disablePolInsuInsuredVehi(itemPIIV.id_paav, disablePIIV);
            }
        }
        await policyInsurerInsuredModel.disablePolicyInsurerInsured(req.params.id, disablePolicyInsurerInsured);
        res.redirect('/sistema/policies');
    }
}