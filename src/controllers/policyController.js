const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const ownAgentModel = require('../models/own_agent');
const polInsInsurerBenefModel = require('../models/pol_aseg_asegurado_benef');
const polInsuInsuredVehiModel = require('../models/pol_insu_insured_vehi');
const receiptModel = require('../models/receipt');
const beneficiaryModel = require('../models/beneficiary');

module.exports = {
/*                  GET                  */
    getVehiclePolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            res.render('vehiclePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
            }
            res.render('vehiclePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                name: req.session.name
            });
        }
    },
    getHealthPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            res.render('healthPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultsBeneficiaries = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            let polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
            }
            for (const beneficiary of polInsInsuredBef) {
                let resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
                resultsBeneficiaries.push(resultBeneficiary[0]);
            }
            res.render('healthPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                name: req.session.name
            });
        }
    },
    getPatrimonialPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            res.render('patrimonialPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
            }
            res.render('patrimonialPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                name: req.session.name
            });
        }
    },
    getBailPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            res.render('bailPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
            }
            res.render('bailPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                name: req.session.name
            });
        }
    },
    getAnotherBranchPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            res.render('anotherBranchPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
            }
            res.render('anotherBranchPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                name: req.session.name
            });
        }
    },
    getFuneralPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            res.render('funeralPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultsBeneficiaries = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            let polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
            }
            for (const beneficiary of polInsInsuredBef) {
                let resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
                resultsBeneficiaries.push(resultBeneficiary[0]);
            }
            res.render('funeralPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                name: req.session.name
            });
        }
    },
    getLifePolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            res.render('lifePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultsBeneficiaries = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            let polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
            }
            for (const beneficiary of polInsInsuredBef) {
                let resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
                resultsBeneficiaries.push(resultBeneficiary[0]);
            }
            res.render('lifePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                name: req.session.name
            });
        }
    },
    getAPPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            res.render('apPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
            }
            res.render('apPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                name: req.session.name
            });
        }
    },
    getTravelPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy.length === 0) {
            res.render('travelPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
            }
            res.render('travelPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
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
                    elementPolicy.prima_anual_poliza = elementPolicy.prima_anual_poliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
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
        let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
        let montoTasa = req.body.tasa_poliza;
        let montoPrimaAnual = req.body.prima_anual_poliza;
        let deducible = req.body.deducible_poliza;
        let sumaAsegurada = req.body.suma_asegurada_poliza;
        if ((montoTasa.indexOf(',') !== -1) && (montoTasa.indexOf('.') !== -1)) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        } else if (montoTasa.indexOf(',') !== -1) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = parseFloat(montoTasa);
        } else if (montoTasa.indexOf('.') !== -1) {
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        }
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
        if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'VIGENTE';
        } else {
            estatusPoliza = 'ANULADO';
        }
        let policy = await policyModel.postVehiclePolicyForm(tomadorAsegurado, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
        await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
        res.redirect('/sistema/add-vehicle-policy');
    },
    postHealthPolicyForm: async (req, res) => {
        let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
        let montoPrimaAnual = req.body.prima_anual_poliza;
        let deducible = req.body.deducible_poliza;
        let sumaAsegurada = req.body.suma_asegurada_poliza;
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
        let tipoIndividualPoliza = 'SALUD';
        let cedulaAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        let estatusPoliza = '';
        let diasExpiracion = 0;
        let fechaActual = new Date();
        let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
        let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
        diasExpiracion = diferenciaDias.toFixed(0);
        if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'VIGENTE';
        } else {
            estatusPoliza = 'ANULADO';
        }
        let policy = await policyModel.postHealthPolicyForm(tomadorAsegurado, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
        await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
        res.redirect('/sistema/add-health-policy');
    },
    postPatrimonialPolicyForm: async (req, res) => {
        let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
        let montoTasa = req.body.tasa_poliza;
        let montoPrimaAnual = req.body.prima_anual_poliza;
        let deducible = req.body.deducible_poliza;
        let sumaAsegurada = req.body.suma_asegurada_poliza;
        if ((montoTasa.indexOf(',') !== -1) && (montoTasa.indexOf('.') !== -1)) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        } else if (montoTasa.indexOf(',') !== -1) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = parseFloat(montoTasa);
        } else if (montoTasa.indexOf('.') !== -1) {
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        }
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
        if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'VIGENTE';
        } else {
            estatusPoliza = 'ANULADO';
        }
        let policy = await policyModel.postPatrimonialPolicyForm(tomadorAsegurado, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
        await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
        res.redirect('/sistema/add-patrimonial-policy');
    },
    postBailPolicyForm: async (req, res) => {
        let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
        let montoTasa = req.body.tasa_poliza;
        let montoPrimaAnual = req.body.prima_anual_poliza;
        let deducible = req.body.deducible_poliza;
        let sumaAsegurada = req.body.suma_asegurada_poliza;
        if ((montoTasa.indexOf(',') !== -1) && (montoTasa.indexOf('.') !== -1)) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        } else if (montoTasa.indexOf(',') !== -1) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = parseFloat(montoTasa);
        } else if (montoTasa.indexOf('.') !== -1) {
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        }
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
        if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'VIGENTE';
        } else {
            estatusPoliza = 'ANULADO';
        }
        let policy = await policyModel.postBailPolicyForm(tomadorAsegurado, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
        await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
        res.redirect('/sistema/add-bail-policy');
    },
    postAnotherBranchPolicyForm: async (req, res) => {
        let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
        let montoTasa = req.body.tasa_poliza;
        let montoPrimaAnual = req.body.prima_anual_poliza;
        let deducible = req.body.deducible_poliza;
        let sumaAsegurada = req.body.suma_asegurada_poliza;
        if ((montoTasa.indexOf(',') !== -1) && (montoTasa.indexOf('.') !== -1)) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        } else if (montoTasa.indexOf(',') !== -1) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = parseFloat(montoTasa);
        } else if (montoTasa.indexOf('.') !== -1) {
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        }
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
        if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'VIGENTE';
        } else {
            estatusPoliza = 'ANULADO';
        }
        let policy = await policyModel.postAnotherBranchPolicyForm(tomadorAsegurado, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
        await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
        res.redirect('/sistema/add-another-branch-policy');
    },
    postFuneralPolicyForm: async (req, res) => {
        let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
        let montoTasa = req.body.tasa_poliza;
        let montoPrimaAnual = req.body.prima_anual_poliza;
        let deducible = req.body.deducible_poliza;
        let sumaAsegurada = req.body.suma_asegurada_poliza;
        if ((montoTasa.indexOf(',') !== -1) && (montoTasa.indexOf('.') !== -1)) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        } else if (montoTasa.indexOf(',') !== -1) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = parseFloat(montoTasa);
        } else if (montoTasa.indexOf('.') !== -1) {
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        }
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
        if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'VIGENTE';
        } else {
            estatusPoliza = 'ANULADO';
        }
        let policy = await policyModel.postFuneralPolicyForm(tomadorAsegurado, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
        await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
        res.redirect('/sistema/add-funeral-policy');
    },
    postLifePolicyForm: async (req, res) => {
        let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
        let montoTasa = req.body.tasa_poliza;
        let montoPrimaAnual = req.body.prima_anual_poliza;
        let deducible = req.body.deducible_poliza;
        let sumaAsegurada = req.body.suma_asegurada_poliza;
        if ((montoTasa.indexOf(',') !== -1) && (montoTasa.indexOf('.') !== -1)) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        } else if (montoTasa.indexOf(',') !== -1) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = parseFloat(montoTasa);
        } else if (montoTasa.indexOf('.') !== -1) {
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        }
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
        if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'VIGENTE';
        } else {
            estatusPoliza = 'ANULADO';
        }
        let policy = await policyModel.postLifePolicyForm(tomadorAsegurado, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
        await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
        res.redirect('/sistema/add-life-policy');
    },
    postAPPolicyForm: async (req, res) => {
        let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
        let montoTasa = req.body.tasa_poliza;
        let montoPrimaAnual = req.body.prima_anual_poliza;
        let deducible = req.body.deducible_poliza;
        let sumaAsegurada = req.body.suma_asegurada_poliza;
        if ((montoTasa.indexOf(',') !== -1) && (montoTasa.indexOf('.') !== -1)) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        } else if (montoTasa.indexOf(',') !== -1) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = parseFloat(montoTasa);
        } else if (montoTasa.indexOf('.') !== -1) {
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        }
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
        if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'VIGENTE';
        } else {
            estatusPoliza = 'ANULADO';
        }
        let policy = await policyModel.postAPPolicyForm(tomadorAsegurado, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
        await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
        res.redirect('/sistema/add-ap-policy');
    },
    postTravelPolicyForm: async (req, res) => {
        let tomadorAsegurado = req.body.tomador_asegurado_poliza ? 1 : 0;
        let montoTasa = req.body.tasa_poliza;
        let montoPrimaAnual = req.body.prima_anual_poliza;
        let deducible = req.body.deducible_poliza;
        let sumaAsegurada = req.body.suma_asegurada_poliza;
        if ((montoTasa.indexOf(',') !== -1) && (montoTasa.indexOf('.') !== -1)) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        } else if (montoTasa.indexOf(',') !== -1) {
            montoTasa = montoTasa.replace(",", ".");
            montoTasa = parseFloat(montoTasa);
        } else if (montoTasa.indexOf('.') !== -1) {
            montoTasa = montoTasa.replace(".", ",");
            montoTasa = parseFloat(montoTasa.replace(/,/g,''));
        }
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
        if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'VIGENTE';
        } else {
            estatusPoliza = 'ANULADO';
        }
        let policy = await policyModel.postTravelPolicyForm(tomadorAsegurado, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoIndividualPoliza, estatusPoliza, req.body);
        await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
        res.redirect('/sistema/add-travel-policy');
    },
/*                  PUT                  */
    putPolicy: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            let resultPolicy = await policyModel.getPolicy(idPolicy);
            let resultPolicies = await policyModel.getPolicies();
            let resultsTaker = await policyModel.getPolicyHolder();
            let fechaDesdePoliza = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
            let fechaHastaPoliza = resultPolicy[0].fecha_hasta_poliza.toISOString().substring(0, 10);
            let primaAnual = resultPolicy[0].prima_anual_poliza;
            primaAnual = primaAnual.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            let insurers = await insurerModel.getInsurers();
            let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            res.render('editPolicy', {
                policy: resultPolicy[0],
                policies: resultPolicies,
                takerNames: resultsTaker,
                fechaDesdePoliza: fechaDesdePoliza,
                fechaHastaPoliza: fechaHastaPoliza,
                primaAnual: primaAnual,
                insurers: insurers,
                insurer: resultInsurer[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updatePolicy: async (req, res) => {
        let fechaDesdePoliza = new Date(req.body.fecha_desde_poliza);
        let fechaHastaPoliza = new Date(req.body.fecha_hasta_poliza);
        let montoPrimaAnual = req.body.prima_anual_poliza;
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
        await policyModel.updatePolicy(fechaDesdePoliza, fechaHastaPoliza, montoPrimaAnual, req.body);
        await policyInsurerInsuredModel.updatePolicyInsurerInsured(req.body.nombre_aseguradora, req.body.id_poliza);
        res.redirect('/sistema');
    },
/*               DELETE                  */
    disablePolicy: async (req, res) => {
        let disablePolicy = 1;
        let disablePolicyInsurerInsured = 1;
        let disablePIIB = 1;
        let disablePIIV = 1;
        await policyModel.updateDisablePolicy(req.params.id, req.body);
        await policyModel.disablePolicy(req.params.id, disablePolicy);
        await policyInsurerInsuredModel.disablePolicyInsurerInsured(req.params.id, disablePolicyInsurerInsured);
        let disablePII = await policyInsurerInsuredModel.getPolicyInsurerInsured(req.params.id);
        let resultPIIB = await polInsInsurerBenefModel.getPolInsuInsuredBenef(disablePII[0].id_paa);
        let resultPIIV = await polInsuInsuredVehiModel.getPolInsuInsuredVehi(disablePII[0].id_paa);
        if (resultPIIV.length === 0) {
            for (const itemPIIB of resultPIIB) {
                await polInsInsurerBenefModel.disablePolInsuInsuredBenef(itemPIIB.id_paab, disablePIIB);
            }
        } else if (resultPIIB.length === 0) {
            for (const itemPIIV of resultPIIV) {
                await polInsuInsuredVehiModel.disablePolInsuInsuredVehi(itemPIIV.id_paav, disablePIIV);
            }
        }
        res.redirect('/sistema/policies');
    }
}