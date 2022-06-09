// Models
const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const ownAgentModel = require('../models/own_agent');
const polInsInsurerBenefModel = require('../models/pol_insu_insured_benef');
const polInsuInsuredVehiModel = require('../models/pol_insu_insured_vehi');
const receiptModel = require('../models/receipt');
const beneficiaryModel = require('../models/beneficiary');
const executiveModel = require('../models/executive');
const polInsuInsuredExecModel = require('../models/pol_insu_insured_executive');
const policyOwnAgentModel = require('../models/policy_own_agent');
// Serializers
const separateNameSurname = require('../serializers/separateNameSurname');
const convertStringToNumber = require('../serializers/convertStringToNumber');
const convertNumberToString = require('../serializers/convertNumberToString');
const convertStringToCurrency = require('../serializers/convertStringToCurrency');

module.exports = {
/*                  GET                  */
    getVehiclePolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
            res.render('vehiclePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let resultOwnAgent = [];
            let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
            let nameRazonInsured = ''; 
            const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOwnAgent.length !== 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
            }
            const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
            } else {
                const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
            }
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
                primaNetaPoliza = primaNetaPoliza.toFixed(2);
                primaNetaPoliza = Number(primaNetaPoliza);
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            } else {
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            }
            res.render('vehiclePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getVehiclePolicyList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultPolicy = await policyModel.getPolicyLast();
        res.render('vehiclePolicyList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            policy: resultPolicy[0],
            policies: resultsPolicies,
            receipts: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getHealthPolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
            res.render('healthPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let resultsBeneficiaries = [];
            let resultOwnAgent = [];
            let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
            let nameRazonInsured = ''; 
            const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOwnAgent.length !== 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
            }
            const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
            const polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
            for (const beneficiary of polInsInsuredBef) {
                const resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
                resultsBeneficiaries.push(resultBeneficiary[0]);
            }
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
            } else {
                const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
            }
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
                primaNetaPoliza = primaNetaPoliza.toFixed(2);
                primaNetaPoliza = Number(primaNetaPoliza);
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            } else {
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            }
            res.render('healthPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getHealthPolicyList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultPolicy = await policyModel.getPolicyLast();
        res.render('healthPolicyList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            policy: resultPolicy[0],
            policies: resultsPolicies,
            receipts: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getPatrimonialPolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
            res.render('patrimonialPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let resultOwnAgent = [];
            let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
            let nameRazonInsured = ''; 
            const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOwnAgent.length !== 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
            }
            const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
            } else {
                const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
            }
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
                primaNetaPoliza = primaNetaPoliza.toFixed(2);
                primaNetaPoliza = Number(primaNetaPoliza);
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            } else {
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            }
            res.render('patrimonialPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getPatrimonialPolicyList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultPolicy = await policyModel.getPolicyLast();
        res.render('patrimonialPolicyList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            policy: resultPolicy[0],
            policies: resultsPolicies,
            receipts: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getBailPolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
            res.render('bailPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let resultOwnAgent = [];
            let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
            let nameRazonInsured = ''; 
            const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOwnAgent.length !== 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
            }
            const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
            } else {
                const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
            }
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
                primaNetaPoliza = primaNetaPoliza.toFixed(2);
                primaNetaPoliza = Number(primaNetaPoliza);
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            } else {
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            }
            res.render('bailPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getBailPolicyList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultPolicy = await policyModel.getPolicyLast();
        res.render('bailPolicyList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            policy: resultPolicy[0],
            policies: resultsPolicies,
            receipts: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getAnotherBranchPolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
            res.render('anotherBranchPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let resultOwnAgent = [];
            let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
            let nameRazonInsured = ''; 
            const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOwnAgent.length !== 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
            }
            const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
            } else {
                const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
            }
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
                primaNetaPoliza = primaNetaPoliza.toFixed(2);
                primaNetaPoliza = Number(primaNetaPoliza);
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            } else {
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            }
            res.render('anotherBranchPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getAnotherBranchPolicyList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultPolicy = await policyModel.getPolicyLast();
        res.render('anotherBranchPolicyList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            policy: resultPolicy[0],
            policies: resultsPolicies,
            receipts: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },

    getFuneralPolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
            res.render('funeralPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let resultsBeneficiaries = [];
            let resultOwnAgent = [];
            let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
            let nameRazonInsured = ''; 
            const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOwnAgent.length !== 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
            }
            const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
            const polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
            for (const beneficiary of polInsInsuredBef) {
                const resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
                resultsBeneficiaries.push(resultBeneficiary[0]);
            }
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
            } else {
                const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
            }
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
                primaNetaPoliza = primaNetaPoliza.toFixed(2);
                primaNetaPoliza = Number(primaNetaPoliza);
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            } else {
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            }
            res.render('funeralPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getFuneralPolicyList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultPolicy = await policyModel.getPolicyLast();
        res.render('funeralPolicyList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            policy: resultPolicy[0],
            policies: resultsPolicies,
            receipts: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getLifePolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
            res.render('lifePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let resultsBeneficiaries = [];
            let resultOwnAgent = [];
            let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
            let nameRazonInsured = ''; 
            const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOwnAgent.length !== 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
            }
            const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
            const polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
            for (const beneficiary of polInsInsuredBef) {
                const resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
                resultsBeneficiaries.push(resultBeneficiary[0]);
            }
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
            } else {
                const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
            }
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
                primaNetaPoliza = primaNetaPoliza.toFixed(2);
                primaNetaPoliza = Number(primaNetaPoliza);
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            } else {
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            }
            res.render('lifePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getLifePolicyList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultPolicy = await policyModel.getPolicyLast();
        res.render('lifePolicyList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            policy: resultPolicy[0],
            policies: resultsPolicies,
            receipts: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getAPPolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
            res.render('apPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let resultOwnAgent = [];
            let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
            let nameRazonInsured = ''; 
            const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOwnAgent.length !== 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
            }
            const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
            } else {
                const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
            }
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
                primaNetaPoliza = primaNetaPoliza.toFixed(2);
                primaNetaPoliza = Number(primaNetaPoliza);
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            } else {
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            }
            res.render('apPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getAPPolicyList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultPolicy = await policyModel.getPolicyLast();
        res.render('apPolicyList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            policy: resultPolicy[0],
            policies: resultsPolicies,
            receipts: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getTravelPolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
            res.render('travelPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let resultOwnAgent = [];
            let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
            let nameRazonInsured = ''; 
            const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            if (resultPolicyOwnAgent.length !== 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
            }
            const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
            } else {
                const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
            }
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
                primaNetaPoliza = primaNetaPoliza.toFixed(2);
                primaNetaPoliza = Number(primaNetaPoliza);
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            } else {
                primaNetaPoliza = convertNumberToString(primaNetaPoliza);
            }
            res.render('travelPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getTravelPolicyList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultPolicy = await policyModel.getPolicyLast();
        res.render('travelPolicyList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            policy: resultPolicy[0],
            policies: resultsPolicies,
            receipts: resultsReceipts,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getPolicies: async (req, res) => {
        const resultsPolicies =  await policyModel.getPolicies();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        for (let index = 0; index < resultsPII.length; index++) {
            const elementPII = resultsPII[index];
            const resultInsurer = await insurerModel.getInsurer(elementPII.aseguradora_id);
            for (let index = 0; index < resultsPolicies.length; index++) {
                const elementPolicy = resultsPolicies[index];
                if ((index < elementPII.id_paa) && (typeof(elementPolicy.fecha_desde_poliza) !== 'string')) {
                    elementPolicy.prima_neta_poliza = convertNumberToString(elementPolicy.prima_neta_poliza);
                    elementPolicy.igtf_poliza = convertNumberToString(elementPolicy.igtf_poliza);
                    elementPolicy.prima_total_poliza = convertNumberToString(elementPolicy.prima_total_poliza);
                    elementPolicy.prima_neta_poliza = convertStringToCurrency(elementPolicy.tipo_moneda_poliza, elementPolicy.prima_neta_poliza);
                    elementPolicy.igtf_poliza = convertStringToCurrency(elementPolicy.tipo_moneda_poliza, elementPolicy.igtf_poliza);
                    elementPolicy.prima_total_poliza = convertStringToCurrency(elementPolicy.tipo_moneda_poliza, elementPolicy.prima_total_poliza);
                    elementPolicy.fecha_desde_poliza = elementPolicy.fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"); 
                    elementPolicy.fecha_hasta_poliza = elementPolicy.fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
                    elementPolicy.nombre_aseguradora = resultInsurer[0].nombre_aseguradora;
                    break;
                }
            }
        }
        res.render('policies', {
            data: resultsPolicies,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getPoliciesDetail: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            let resultsBeneficiaries = [];
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy);
            const resultsPIIB = await polInsInsurerBenefModel.getPolInsuInsuredBenef(resultPII[0].id_paa);
            for (const resultPIIB of resultsPIIB) {
                const resultBenefiary = await beneficiaryModel.getBeneficiary(resultPIIB.beneficiario_id);
                resultsBeneficiaries.push(resultBenefiary[0]);
            }
            resultsBeneficiaries.forEach(beneficiary => {
                beneficiary.fec_nac_beneficiario = beneficiary.fec_nac_beneficiario.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            });
            res.render('policiesBeneficiaries', {
                data: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
/*                 POST                  */
    postVehiclePolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
        }
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        if (policyInsurerInsured.length === 0) {
            policyInsurerInsured = [{}];
        }
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        if ((policyInsurerInsured[0].asegurado_per_jur_id === null) && (policyInsurerInsured[0].asegurado_per_nat_id !== null)) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else if ((policyInsurerInsured[0].asegurado_per_jur_id !== null) && (policyInsurerInsured[0].asegurado_per_nat_id === null)) {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else if (resultPolicy[0].fraccionamiento_boolean_poliza === 0) {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'AUTOMÓVIL';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(fechaPolizaDesde);
            fechaPolizaHasta = new Date(fechaPolizaHasta);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            const policy = await policyModel.postVehiclePolicyForm(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            const paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, policy.insertId);
            for (const nombreCompletoEjecutivo of arrayEjecutivo) {
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postHealthPolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
        }
        let resultsBeneficiaries = [];
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        if (policyInsurerInsured.length === 0) {
            policyInsurerInsured = [{}];
        }
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        const polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
        for (const beneficiary of polInsInsuredBef) {
            const resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
            resultsBeneficiaries.push(resultBeneficiary[0]);
        }
        if ((policyInsurerInsured[0].asegurado_per_jur_id === null) && (policyInsurerInsured[0].asegurado_per_nat_id !== null)) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else if ((policyInsurerInsured[0].asegurado_per_jur_id !== null) && (policyInsurerInsured[0].asegurado_per_nat_id === null)) {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else if (resultPolicy[0].fraccionamiento_boolean_poliza === 0) {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                tipo_cobertura_poliza: montoCobertura,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                detalle_cliente_poliza: fechaDetalleCliente,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'SALUD';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoCobertura = montoCobertura.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            if (montoCobertura === '') {
                montoCobertura = 0;
            } else {
                montoCobertura = convertStringToNumber(montoCobertura);
            }
            fechaPolizaDesde = new Date(fechaPolizaDesde);
            fechaPolizaHasta = new Date(fechaPolizaHasta);
            fechaDetalleCliente = new Date(fechaDetalleCliente);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            const policy = await policyModel.postHealthPolicyForm(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, montoCobertura, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            const paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, policy.insertId);
            for (const nombreCompletoEjecutivo of arrayEjecutivo) {
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postPatrimonialPolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
        }
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        if (policyInsurerInsured.length === 0) {
            policyInsurerInsured = [{}];
        }
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        if ((policyInsurerInsured[0].asegurado_per_jur_id === null) && (policyInsurerInsured[0].asegurado_per_nat_id !== null)) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else if ((policyInsurerInsured[0].asegurado_per_jur_id !== null) && (policyInsurerInsured[0].asegurado_per_nat_id === null)) {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else if (resultPolicy[0].fraccionamiento_boolean_poliza === 0) {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'PATRIMONIAL';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(fechaPolizaDesde);
            fechaPolizaHasta = new Date(fechaPolizaHasta);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            const policy = await policyModel.postPatrimonialPolicyForm(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            const paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, policy.insertId);
            for (const nombreCompletoEjecutivo of arrayEjecutivo) {
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postBailPolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
        }
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        if (policyInsurerInsured.length === 0) {
            policyInsurerInsured = [{}];
        }
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        if ((policyInsurerInsured[0].asegurado_per_jur_id === null) && (policyInsurerInsured[0].asegurado_per_nat_id !== null)) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else if ((policyInsurerInsured[0].asegurado_per_jur_id !== null) && (policyInsurerInsured[0].asegurado_per_nat_id === null)) {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else if (resultPolicy[0].fraccionamiento_boolean_poliza === 0) {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'FIANZA';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(fechaPolizaDesde);
            fechaPolizaHasta = new Date(fechaPolizaHasta);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            const policy = await policyModel.postBailPolicyForm(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            const paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, policy.insertId);
            for (const nombreCompletoEjecutivo of arrayEjecutivo) {
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postAnotherBranchPolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
        }
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        if (policyInsurerInsured.length === 0) {
            policyInsurerInsured = [{}];
        }
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        if ((policyInsurerInsured[0].asegurado_per_jur_id === null) && (policyInsurerInsured[0].asegurado_per_nat_id !== null)) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else if ((policyInsurerInsured[0].asegurado_per_jur_id !== null) && (policyInsurerInsured[0].asegurado_per_nat_id === null)) {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else if (resultPolicy[0].fraccionamiento_boolean_poliza === 0) {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'OTROS RAMOS';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(fechaPolizaDesde);
            fechaPolizaHasta = new Date(fechaPolizaHasta);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            const policy = await policyModel.postAnotherBranchPolicyForm(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            const paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, policy.insertId);
            for (const nombreCompletoEjecutivo of arrayEjecutivo) {
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postFuneralPolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
        }
        let resultsBeneficiaries = [];
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        if (policyInsurerInsured.length === 0) {
            policyInsurerInsured = [{}];
        }
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        const polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
        for (const beneficiary of polInsInsuredBef) {
            const resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
            resultsBeneficiaries.push(resultBeneficiary[0]);
        }
        if ((policyInsurerInsured[0].asegurado_per_jur_id === null) && (policyInsurerInsured[0].asegurado_per_nat_id !== null)) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else if ((policyInsurerInsured[0].asegurado_per_jur_id !== null) && (policyInsurerInsured[0].asegurado_per_nat_id === null)) {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else if (resultPolicy[0].fraccionamiento_boolean_poliza === 0) {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'FUNERARIO';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(fechaPolizaDesde);
            fechaPolizaHasta = new Date(fechaPolizaHasta);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            const policy = await policyModel.postFuneralPolicyForm(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            const paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, policy.insertId);
            for (const nombreCompletoEjecutivo of arrayEjecutivo) {
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postLifePolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
        }
        let resultsBeneficiaries = [];
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        if (policyInsurerInsured.length === 0) {
            policyInsurerInsured = [{}];
        }
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        const polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
        for (const beneficiary of polInsInsuredBef) {
            const resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
            resultsBeneficiaries.push(resultBeneficiary[0]);
        }
        if ((policyInsurerInsured[0].asegurado_per_jur_id === null) && (policyInsurerInsured[0].asegurado_per_nat_id !== null)) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else if ((policyInsurerInsured[0].asegurado_per_jur_id !== null) && (policyInsurerInsured[0].asegurado_per_nat_id === null)) {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else if (resultPolicy[0].fraccionamiento_boolean_poliza === 0) {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'VIDA';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(fechaPolizaDesde);
            fechaPolizaHasta = new Date(fechaPolizaHasta);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            const policy = await policyModel.postLifePolicyForm(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            const paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, policy.insertId);
            for (const nombreCompletoEjecutivo of arrayEjecutivo) {
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postAPPolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
        }
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        if (policyInsurerInsured.length === 0) {
            policyInsurerInsured = [{}];
        }
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        if ((policyInsurerInsured[0].asegurado_per_jur_id === null) && (policyInsurerInsured[0].asegurado_per_nat_id !== null)) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else if ((policyInsurerInsured[0].asegurado_per_jur_id !== null) && (policyInsurerInsured[0].asegurado_per_nat_id === null)) {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else if (resultPolicy[0].fraccionamiento_boolean_poliza === 0) {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'AP';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(fechaPolizaDesde);
            fechaPolizaHasta = new Date(fechaPolizaHasta);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            const policy = await policyModel.postAPPolicyForm(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            const paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, policy.insertId);
            for (const nombreCompletoEjecutivo of arrayEjecutivo) {
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postTravelPolicyForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            resultPolicy = [{}];
        }
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        if (policyInsurerInsured.length === 0) {
            policyInsurerInsured = [{}];
        }
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        if ((policyInsurerInsured[0].asegurado_per_jur_id === null) && (policyInsurerInsured[0].asegurado_per_nat_id !== null)) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else if ((policyInsurerInsured[0].asegurado_per_jur_id !== null) && (policyInsurerInsured[0].asegurado_per_nat_id === null)) {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else if (resultPolicy[0].fraccionamiento_boolean_poliza === 0) {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'VIAJE';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(fechaPolizaDesde);
            fechaPolizaHasta = new Date(fechaPolizaHasta);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            const policy = await policyModel.postTravelPolicyForm(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                await policyOwnAgentModel.postPolicyOwnAgent(policy.insertId, idAgentePropio);
            }
            const paa = await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, policy.insertId);
            for (const nombreCompletoEjecutivo of arrayEjecutivo) {
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
/*                  PUT                  */
    putHealthPolicy: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            const insurers = await insurerModel.getInsurers();
            const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            const resultsLegalInsureds = await insuredModel.getLegalInsureds();
            const resultPolicy = await policyModel.getPolicy(idPolicy);
            const resultsPolicies = await policyModel.getPoliciesNumbers();
            const resultsReceipts = await receiptModel.getReceipts();
            const resultsExecutives = await executiveModel.getExecutives();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let fechaDetalleCliente = resultPolicy[0].detalle_cliente_poliza;
            let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
            let montoIgtf = resultPolicy[0].igtf_poliza;
            let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
            let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let montoDeducible = resultPolicy[0].deducible_poliza;
            let montoCobertura = resultPolicy[0].tipo_cobertura_poliza;
            montoPrimaNeta = convertNumberToString(montoPrimaNeta);
            montoIgtf = convertNumberToString(montoIgtf);
            montoPrimaTotal = convertNumberToString(montoPrimaTotal);
            montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
            montoDeducible = convertNumberToString(montoDeducible);
            montoCobertura = convertNumberToString(montoCobertura);
            montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
            montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
            montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
            montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
            montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
            montoCobertura = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoCobertura);
            if (fechaDetalleCliente === null) {
                fechaDetalleCliente = '';
            } else {
                fechaDetalleCliente = fechaDetalleCliente.toISOString().substring(0, 10);
            }
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            res.render('editPolicyHealth', {
                fechaDesdePoliza,
                fechaHastaPoliza,
                fechaDetalleCliente,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                montoCobertura,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putVehiclePolicy: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            const insurers = await insurerModel.getInsurers();
            const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            const resultsLegalInsureds = await insuredModel.getLegalInsureds();
            const resultPolicy = await policyModel.getPolicy(idPolicy);
            const resultsPolicies = await policyModel.getPoliciesNumbers();
            const resultsReceipts = await receiptModel.getReceipts();
            const resultsExecutives = await executiveModel.getExecutives();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
            let montoIgtf = resultPolicy[0].igtf_poliza;
            let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
            let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let montoDeducible = resultPolicy[0].deducible_poliza;
            montoPrimaNeta = convertNumberToString(montoPrimaNeta);
            montoIgtf = convertNumberToString(montoIgtf);
            montoPrimaTotal = convertNumberToString(montoPrimaTotal);
            montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
            montoDeducible = convertNumberToString(montoDeducible);
            montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
            montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
            montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
            montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
            montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            res.render('editPolicyVehicle', {
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putPatrimonialPolicy: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            const insurers = await insurerModel.getInsurers();
            const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            const resultsLegalInsureds = await insuredModel.getLegalInsureds();
            const resultPolicy = await policyModel.getPolicy(idPolicy);
            const resultsPolicies = await policyModel.getPoliciesNumbers();
            const resultsReceipts = await receiptModel.getReceipts();
            const resultsExecutives = await executiveModel.getExecutives();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
            let montoIgtf = resultPolicy[0].igtf_poliza;
            let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
            let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let montoDeducible = resultPolicy[0].deducible_poliza;
            montoPrimaNeta = convertNumberToString(montoPrimaNeta);
            montoIgtf = convertNumberToString(montoIgtf);
            montoPrimaTotal = convertNumberToString(montoPrimaTotal);
            montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
            montoDeducible = convertNumberToString(montoDeducible);
            montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
            montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
            montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
            montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
            montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            res.render('editPolicyPatrimonial', {
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putBailPolicy: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            const insurers = await insurerModel.getInsurers();
            const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            const resultsLegalInsureds = await insuredModel.getLegalInsureds();
            const resultPolicy = await policyModel.getPolicy(idPolicy);
            const resultsPolicies = await policyModel.getPoliciesNumbers();
            const resultsReceipts = await receiptModel.getReceipts();
            const resultsExecutives = await executiveModel.getExecutives();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
            let montoIgtf = resultPolicy[0].igtf_poliza;
            let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
            let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let montoDeducible = resultPolicy[0].deducible_poliza;
            montoPrimaNeta = convertNumberToString(montoPrimaNeta);
            montoIgtf = convertNumberToString(montoIgtf);
            montoPrimaTotal = convertNumberToString(montoPrimaTotal);
            montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
            montoDeducible = convertNumberToString(montoDeducible);
            montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
            montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
            montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
            montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
            montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            res.render('editPolicyBail', {
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putAnotherBranchPolicy: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            const insurers = await insurerModel.getInsurers();
            const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            const resultsLegalInsureds = await insuredModel.getLegalInsureds();
            const resultPolicy = await policyModel.getPolicy(idPolicy);
            const resultsPolicies = await policyModel.getPoliciesNumbers();
            const resultsReceipts = await receiptModel.getReceipts();
            const resultsExecutives = await executiveModel.getExecutives();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
            let montoIgtf = resultPolicy[0].igtf_poliza;
            let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
            let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let montoDeducible = resultPolicy[0].deducible_poliza;
            montoPrimaNeta = convertNumberToString(montoPrimaNeta);
            montoIgtf = convertNumberToString(montoIgtf);
            montoPrimaTotal = convertNumberToString(montoPrimaTotal);
            montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
            montoDeducible = convertNumberToString(montoDeducible);
            montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
            montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
            montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
            montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
            montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            res.render('editPolicyAnotherBranch', {
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putFuneralPolicy: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            const insurers = await insurerModel.getInsurers();
            const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            const resultsLegalInsureds = await insuredModel.getLegalInsureds();
            const resultPolicy = await policyModel.getPolicy(idPolicy);
            const resultsPolicies = await policyModel.getPoliciesNumbers();
            const resultsReceipts = await receiptModel.getReceipts();
            const resultsExecutives = await executiveModel.getExecutives();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
            let montoIgtf = resultPolicy[0].igtf_poliza;
            let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
            let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let montoDeducible = resultPolicy[0].deducible_poliza;
            montoPrimaNeta = convertNumberToString(montoPrimaNeta);
            montoIgtf = convertNumberToString(montoIgtf);
            montoPrimaTotal = convertNumberToString(montoPrimaTotal);
            montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
            montoDeducible = convertNumberToString(montoDeducible);
            montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
            montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
            montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
            montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
            montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            res.render('editPolicyFuneral', {
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putLifePolicy: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            const insurers = await insurerModel.getInsurers();
            const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            const resultsLegalInsureds = await insuredModel.getLegalInsureds();
            const resultPolicy = await policyModel.getPolicy(idPolicy);
            const resultsPolicies = await policyModel.getPoliciesNumbers();
            const resultsReceipts = await receiptModel.getReceipts();
            const resultsExecutives = await executiveModel.getExecutives();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
            let montoIgtf = resultPolicy[0].igtf_poliza;
            let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
            let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let montoDeducible = resultPolicy[0].deducible_poliza;
            montoPrimaNeta = convertNumberToString(montoPrimaNeta);
            montoIgtf = convertNumberToString(montoIgtf);
            montoPrimaTotal = convertNumberToString(montoPrimaTotal);
            montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
            montoDeducible = convertNumberToString(montoDeducible);
            montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
            montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
            montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
            montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
            montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            res.render('editPolicyLife', {
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putAPPolicy: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            const insurers = await insurerModel.getInsurers();
            const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            const resultsLegalInsureds = await insuredModel.getLegalInsureds();
            const resultPolicy = await policyModel.getPolicy(idPolicy);
            const resultsPolicies = await policyModel.getPoliciesNumbers();
            const resultsReceipts = await receiptModel.getReceipts();
            const resultsExecutives = await executiveModel.getExecutives();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
            let montoIgtf = resultPolicy[0].igtf_poliza;
            let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
            let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let montoDeducible = resultPolicy[0].deducible_poliza;
            montoPrimaNeta = convertNumberToString(montoPrimaNeta);
            montoIgtf = convertNumberToString(montoIgtf);
            montoPrimaTotal = convertNumberToString(montoPrimaTotal);
            montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
            montoDeducible = convertNumberToString(montoDeducible);
            montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
            montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
            montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
            montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
            montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            res.render('editPolicyAP', {
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putTravelPolicy: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            const insurers = await insurerModel.getInsurers();
            const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            const resultsLegalInsureds = await insuredModel.getLegalInsureds();
            const resultPolicy = await policyModel.getPolicy(idPolicy);
            const resultsPolicies = await policyModel.getPoliciesNumbers();
            const resultsReceipts = await receiptModel.getReceipts();
            const resultsExecutives = await executiveModel.getExecutives();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
            const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
            let montoIgtf = resultPolicy[0].igtf_poliza;
            let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
            let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
            let montoDeducible = resultPolicy[0].deducible_poliza;
            montoPrimaNeta = convertNumberToString(montoPrimaNeta);
            montoIgtf = convertNumberToString(montoIgtf);
            montoPrimaTotal = convertNumberToString(montoPrimaTotal);
            montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
            montoDeducible = convertNumberToString(montoDeducible);
            montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
            montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
            montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
            montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
            montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
            if (resultPolicyOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
            }
            if (resultPII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
            }
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            res.render('editPolicyTravel', {
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    updateHealthPolicy: async (req, res) => {
        const idPolicy = req.body.id_poliza;
        const insurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicy(idPolicy);
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let fechaDetalleCliente = resultPolicy[0].detalle_cliente_poliza;
        let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
        let montoIgtf = resultPolicy[0].igtf_poliza;
        let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
        let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let montoDeducible = resultPolicy[0].deducible_poliza;
        let montoCobertura = resultPolicy[0].tipo_cobertura_poliza;
        montoPrimaNeta = convertNumberToString(montoPrimaNeta);
        montoIgtf = convertNumberToString(montoIgtf);
        montoPrimaTotal = convertNumberToString(montoPrimaTotal);
        montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
        montoDeducible = convertNumberToString(montoDeducible);
        montoCobertura = convertNumberToString(montoCobertura);
        montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
        montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
        montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
        montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
        montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
        montoCobertura = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoCobertura);
        if (fechaDetalleCliente === null) {
            fechaDetalleCliente = '';
        } else {
            fechaDetalleCliente = fechaDetalleCliente.toISOString().substring(0, 10);
        }
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                tipo_cobertura_poliza: montoCobertura,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                detalle_cliente_poliza: fechaDetalleCliente,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'SALUD';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoCobertura = montoCobertura.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            if (montoCobertura === '') {
                montoCobertura = 0;
            } else {
                montoCobertura = convertStringToNumber(montoCobertura);
            }
            fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            fechaDetalleCliente = new Date(req.body.detalle_cliente_poliza);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            await policyModel.updateHealthPolicy(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, montoCobertura, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(idPolicy, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(idPolicy, idAgentePropio);
                } 
            } else {
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(idPolicy, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, idPolicy);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
            for (let index = 0; index < arrayEjecutivo.length; index++) {
                const nombreCompletoEjecutivo = arrayEjecutivo[index];
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                fechaDetalleCliente,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                montoCobertura,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                fechaDetalleCliente,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                montoCobertura,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updateVehiclePolicy: async (req, res) => {
        const idPolicy = req.body.id_poliza;
        const insurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicy(idPolicy);
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
        let montoIgtf = resultPolicy[0].igtf_poliza;
        let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
        let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let montoDeducible = resultPolicy[0].deducible_poliza;
        montoPrimaNeta = convertNumberToString(montoPrimaNeta);
        montoIgtf = convertNumberToString(montoIgtf);
        montoPrimaTotal = convertNumberToString(montoPrimaTotal);
        montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
        montoDeducible = convertNumberToString(montoDeducible);
        montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
        montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
        montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
        montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
        montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'AUTOMÓVIL';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            await policyModel.updateVehiclePolicy(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(idPolicy, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(idPolicy, idAgentePropio);
                } 
            } else {
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(idPolicy, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, idPolicy);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
            for (let index = 0; index < arrayEjecutivo.length; index++) {
                const nombreCompletoEjecutivo = arrayEjecutivo[index];
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updatePatrimomialPolicy: async (req, res) => {
        const idPolicy = req.body.id_poliza;
        const insurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicy(idPolicy);
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
        let montoIgtf = resultPolicy[0].igtf_poliza;
        let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
        let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let montoDeducible = resultPolicy[0].deducible_poliza;
        montoPrimaNeta = convertNumberToString(montoPrimaNeta);
        montoIgtf = convertNumberToString(montoIgtf);
        montoPrimaTotal = convertNumberToString(montoPrimaTotal);
        montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
        montoDeducible = convertNumberToString(montoDeducible);
        montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
        montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
        montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
        montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
        montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'PATRIMONIAL';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            await policyModel.updatePatrimonialPolicy(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(idPolicy, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(idPolicy, idAgentePropio);
                } 
            } else {
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(idPolicy, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, idPolicy);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
            for (let index = 0; index < arrayEjecutivo.length; index++) {
                const nombreCompletoEjecutivo = arrayEjecutivo[index];
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updateBailPolicy: async (req, res) => {
        const idPolicy = req.body.id_poliza;
        const insurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicy(idPolicy);
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
        let montoIgtf = resultPolicy[0].igtf_poliza;
        let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
        let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let montoDeducible = resultPolicy[0].deducible_poliza;
        montoPrimaNeta = convertNumberToString(montoPrimaNeta);
        montoIgtf = convertNumberToString(montoIgtf);
        montoPrimaTotal = convertNumberToString(montoPrimaTotal);
        montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
        montoDeducible = convertNumberToString(montoDeducible);
        montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
        montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
        montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
        montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
        montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'FIANZA';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            await policyModel.updateBailPolicy(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(idPolicy, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(idPolicy, idAgentePropio);
                } 
            } else {
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(idPolicy, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, idPolicy);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
            for (let index = 0; index < arrayEjecutivo.length; index++) {
                const nombreCompletoEjecutivo = arrayEjecutivo[index];
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updateAnotherBranchPolicy: async (req, res) => {
        const idPolicy = req.body.id_poliza;
        const insurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicy(idPolicy);
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
        let montoIgtf = resultPolicy[0].igtf_poliza;
        let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
        let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let montoDeducible = resultPolicy[0].deducible_poliza;
        montoPrimaNeta = convertNumberToString(montoPrimaNeta);
        montoIgtf = convertNumberToString(montoIgtf);
        montoPrimaTotal = convertNumberToString(montoPrimaTotal);
        montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
        montoDeducible = convertNumberToString(montoDeducible);
        montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
        montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
        montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
        montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
        montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'OTROS RAMOS';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            await policyModel.updateAnotherBranchPolicy(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(idPolicy, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(idPolicy, idAgentePropio);
                } 
            } else {
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(idPolicy, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, idPolicy);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
            for (let index = 0; index < arrayEjecutivo.length; index++) {
                const nombreCompletoEjecutivo = arrayEjecutivo[index];
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updateFuneralPolicy: async (req, res) => {
        const idPolicy = req.body.id_poliza;
        const insurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicy(idPolicy);
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
        let montoIgtf = resultPolicy[0].igtf_poliza;
        let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
        let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let montoDeducible = resultPolicy[0].deducible_poliza;
        montoPrimaNeta = convertNumberToString(montoPrimaNeta);
        montoIgtf = convertNumberToString(montoIgtf);
        montoPrimaTotal = convertNumberToString(montoPrimaTotal);
        montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
        montoDeducible = convertNumberToString(montoDeducible);
        montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
        montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
        montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
        montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
        montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'FUNERARIO';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            await policyModel.updateFuneralPolicy(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(idPolicy, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(idPolicy, idAgentePropio);
                } 
            } else {
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(idPolicy, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, idPolicy);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
            for (let index = 0; index < arrayEjecutivo.length; index++) {
                const nombreCompletoEjecutivo = arrayEjecutivo[index];
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updateLifePolicy: async (req, res) => {
        const idPolicy = req.body.id_poliza;
        const insurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicy(idPolicy);
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
        let montoIgtf = resultPolicy[0].igtf_poliza;
        let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
        let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let montoDeducible = resultPolicy[0].deducible_poliza;
        montoPrimaNeta = convertNumberToString(montoPrimaNeta);
        montoIgtf = convertNumberToString(montoIgtf);
        montoPrimaTotal = convertNumberToString(montoPrimaTotal);
        montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
        montoDeducible = convertNumberToString(montoDeducible);
        montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
        montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
        montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
        montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
        montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'VIDA';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            await policyModel.updateLifePolicy(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(idPolicy, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(idPolicy, idAgentePropio);
                } 
            } else {
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(idPolicy, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, idPolicy);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
            for (let index = 0; index < arrayEjecutivo.length; index++) {
                const nombreCompletoEjecutivo = arrayEjecutivo[index];
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updateAPPolicy: async (req, res) => {
        const idPolicy = req.body.id_poliza;
        const insurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicy(idPolicy);
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
        let montoIgtf = resultPolicy[0].igtf_poliza;
        let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
        let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let montoDeducible = resultPolicy[0].deducible_poliza;
        montoPrimaNeta = convertNumberToString(montoPrimaNeta);
        montoIgtf = convertNumberToString(montoIgtf);
        montoPrimaTotal = convertNumberToString(montoPrimaTotal);
        montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
        montoDeducible = convertNumberToString(montoDeducible);
        montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
        montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
        montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
        montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
        montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'AP';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            await policyModel.updateAPPolicy(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(idPolicy, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(idPolicy, idAgentePropio);
                } 
            } else {
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(idPolicy, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, idPolicy);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
            for (let index = 0; index < arrayEjecutivo.length; index++) {
                const nombreCompletoEjecutivo = arrayEjecutivo[index];
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updateTravelPolicy: async (req, res) => {
        const idPolicy = req.body.id_poliza;
        const insurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicy(idPolicy);
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        const fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
        const fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultPolicyOA = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
        const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let montoPrimaNeta = resultPolicy[0].prima_neta_poliza;
        let montoIgtf = resultPolicy[0].igtf_poliza;
        let montoPrimaTotal = resultPolicy[0].prima_total_poliza;
        let montoSumaAsegurada = resultPolicy[0].suma_asegurada_poliza;
        let montoDeducible = resultPolicy[0].deducible_poliza;
        montoPrimaNeta = convertNumberToString(montoPrimaNeta);
        montoIgtf = convertNumberToString(montoIgtf);
        montoPrimaTotal = convertNumberToString(montoPrimaTotal);
        montoSumaAsegurada = convertNumberToString(montoSumaAsegurada);
        montoDeducible = convertNumberToString(montoDeducible);
        montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
        montoIgtf = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIgtf);
        montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
        montoSumaAsegurada = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoSumaAsegurada);
        montoDeducible = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoDeducible);
        if (resultPolicyOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOA[0].agente_propio_id);
        }
        if (resultPII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
        }
        for (const resultPIIE of resultsPIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_poliza: tomadorAsegurado,
                fraccionamiento_boolean_poliza: fraccionamientoBoolean,
                prima_neta_poliza: montoPrimaNeta,
                igtf_poliza: montoIgtf,
                prima_total_poliza: montoPrimaTotal,
                deducible_poliza: montoDeducible,
                suma_asegurada_poliza: montoSumaAsegurada,
                nombre_agentes_propios: nombreCompletoAgente,
                fecha_desde_poliza: fechaPolizaDesde,
                fecha_hasta_poliza: fechaPolizaHasta,
                id_rif_asegurado: idRifAsegurado,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoIndividualPoliza = 'VIAJE';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoSumaAsegurada = montoSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            montoSumaAsegurada = convertStringToNumber(montoSumaAsegurada);
            fechaPolizaDesde = new Date(req.body.fecha_desde_poliza);
            fechaPolizaHasta = new Date(req.body.fecha_hasta_poliza);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (nombreEjecutivoCobranzas === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            await policyModel.updateTravelPolicy(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length === 0) {
                    await policyOwnAgentModel.postPolicyOwnAgent(idPolicy, idAgentePropio);
                } else {
                    await policyOwnAgentModel.updatePolicyOwnAgent(idPolicy, idAgentePropio);
                } 
            } else {
                const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(idPolicy);
                if (resultPOA.length !== 0) {
                    const disablePAP = 1;
                    await policyOwnAgentModel.disablePolicyOwnAgent(idPolicy, disablePAP);
                }
            }
            await policyInsurerInsuredModel.updatePolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, idPolicy);
            const resultPAA = await policyInsurerInsuredModel.getPolicyInsurerInsured(idPolicy);
            const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPAA[0].id_paa);
            for (let index = 0; index < arrayEjecutivo.length; index++) {
                const nombreCompletoEjecutivo = arrayEjecutivo[index];
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
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
                fechaDesdePoliza,
                fechaHastaPoliza,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoSumaAsegurada,
                montoDeducible,
                insurers,
                policy: resultPolicy[0],
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
/*               DELETE                  */
    disablePolicy: async (req, res) => {
        const disablePolicy = 1;
        const disablePolicyInsurerInsured = 1;
        const disablePIIB = 1;
        const disablePIIV = 1;
        const disablePIIE = 1;
        const disablePAP = 1;
        await policyModel.updateDisablePolicy(req.params.id, req.body);
        await policyModel.disablePolicy(req.params.id, disablePolicy);
        await policyOwnAgentModel.disablePolicyOwnAgent(req.params.id, disablePAP);
        const disablePII = await policyInsurerInsuredModel.getPolicyInsurerInsured(req.params.id);
        const resultPIIB = await polInsInsurerBenefModel.getPolInsuInsuredBenef(disablePII[0].id_paa);
        const resultPIIV = await polInsuInsuredVehiModel.getPolInsuInsuredVehi(disablePII[0].id_paa);
        const resultPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(disablePII[0].id_paa);
        for (const itemPIIE of resultPIIE) {
            await polInsuInsuredExecModel.disablePolInsuInsuredExecutive(itemPIIE.id_paae, disablePIIE);
        }
        if (resultPIIV.length === 0) {
            resultPIIB.forEach(async piib => {
                await polInsInsurerBenefModel.disablePolInsuInsuredBenef(piib.id_paab, disablePIIB);
            });
        } else if (resultPIIB.length === 0) {
            resultPIIV.forEach(async piiv => {
                await polInsuInsuredVehiModel.disablePolInsuInsuredVehi(piiv.id_paav, disablePIIV);
            });
        }
        await policyInsurerInsuredModel.disablePolicyInsurerInsured(req.params.id, disablePolicyInsurerInsured);
        res.redirect('/sistema/policies');
    }
}