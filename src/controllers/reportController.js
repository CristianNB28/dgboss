// Models
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const policyModel = require('../models/policy');
const ownAgentModel = require('../models/own_agent');
const receiptModel = require('../models/receipt');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const policyOwnAgentModel = require('../models/policy_own_agent');
const collectiveOwnAgentModel = require('../models/collective_own_agent');
const divisionModel = require('../models/division');
const refundModel = require('../models/refund');
const letterGuaranteeModel = require('../models/letter_guarentee');
const emergencyModel = require('../models/emergency');
const ampModel = require('../models/amp');
const insuredBeneficiaryModel = require('../models/insured_beneficiary');
// Serializers
const convertNumberToString = require('../serializers/convertNumberToString');
const convertStringToCurrency = require('../serializers/convertStringToCurrency');

module.exports = {
/*                  GET                  */
    getPremiumsCollected: async (req, res) => {
        try {
            const resultsInsurers = await insurerModel.getInsurers();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            res.render('premiumsCollected', {
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
    getPremiumsPending: async (req, res) => {
        try {
            const resultsInsurers = await insurerModel.getInsurers();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            res.render('premiumsPending', {
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
    getCommissionTransit: async (req, res) => {
        try {
            const resultsInsurers = await insurerModel.getInsurers();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            res.render('commissionTransit', {
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
    getCommissionDistribution: async (req, res) => {
        try {
            const resultsInsurers = await insurerModel.getInsurers();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            res.render('commissionDistribution', {
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
    getCommissionPaid: async (req, res) => {
        try {
            const resultsInsurers = await insurerModel.getInsurers();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            res.render('commissionPaid', {
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
    getAccidentRate: async (req, res) => {
        try {
            const resultsInsurers = await insurerModel.getInsurers();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            const resultsPolicies = await policyModel.getPolicies();
            const resultsCollectives = await collectiveModel.getCollectives();
            res.render('accidentRate',{
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
    getPortfolioComposition: async (req, res) => {
        try {
            const resultsInsurers = await insurerModel.getInsurers();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            res.render('portfolioComposition', {
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
    getPersistence: async (req, res) => {
        try {
            const resultsInsurers = await insurerModel.getInsurers();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            res.render('persistence', {
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
/*                 POST                  */
    postPremiumsCollected: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            let {
                fecha_desde: fechaDesde,
                fecha_hasta: fechaHasta,
                nombre_aseguradora: nombreAseguradora,
                ramo_poliza: ramoPoliza,
                nombre_agente_propio: nombreAgentePropio, 
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                id_rif_asegurado: idRifAsegurado
            } = req.body;
            let hash = {};
            const filters = [];
            const resultsDivisions = await divisionModel.getFractionationCollected();
            if (fechaDesde !== '') {
                fechaDesde = new Date(fechaDesde);
                fechaHasta = new Date(fechaHasta);
                filters.push(premiumsCollected => (premiumsCollected.fecha_desde.getTime() >= fechaDesde.getTime()) && (premiumsCollected.fecha_desde.getTime() <= fechaHasta.getTime()));
            }
            if (nombreAseguradora !== '') {
                filters.push(premiumsCollected => premiumsCollected.nombre_aseguradora === nombreAseguradora);
            }
            if (ramoPoliza !== '') {
                filters.push(premiumsCollected => premiumsCollected.tipo_individual_poliza === ramoPoliza);
            }
            if (nombreAgentePropio !== '') {
                filters.push(premiumsCollected => premiumsCollected.nombre_agente_propio === nombreAgentePropio);
            }
            if (idRifAsegurado !== '') {
                filters.push(premiumsCollected => premiumsCollected.cedula_rif_asegurado === idRifAsegurado && premiumsCollected.tipo_cedula_rif_asegurado === tipoIdRifAsegurado);
            }
            let data = await Promise.all(
                resultsDivisions.map(async (division) => {
                    const resultReceipt = await receiptModel.getReceipt(division.recibo_id);
                    const premiumNet = await divisionModel.getPremiumCollectedSum(division.recibo_id);
                    if (resultReceipt[0].poliza_id !== null) { 
                        const resultPolicy = await policyModel.getPolicy(resultReceipt[0].poliza_id);
                        const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(resultReceipt[0].poliza_id);
                        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultReceipt[0].poliza_id);
                        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
                        const resultNaturalInsured = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
                        const resultLegalInsured = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
                        if (resultLegalInsured.length === 0) {
                            if (resultPOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            }
                        } else {
                            if (resultPOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            }
                        }
                    } else if (resultReceipt[0].colectivo_id !== null) {
                        const resultCollective = await collectiveModel.getCollective(resultReceipt[0].colectivo_id);
                        const resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultReceipt[0].colectivo_id);
                        const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultReceipt[0].colectivo_id);
                        const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
                        const resultNaturalInsured = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
                        const resultLegalInsured = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
                        if (resultLegalInsured.length === 0) {
                            if (resultCOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultCOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            }
                        } else {
                            if (resultCOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultCOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            }
                        }
                    }
                })
            );
            data = data.filter(data => hash[data.numero_poliza] ? false : hash[data.numero_poliza] = true);
            data = data.filter(premiumsCollected => filters.every(filterPolicy => filterPolicy(premiumsCollected)));
            const totalPrimaNetaBolivar = data.filter(item => item.tipo_moneda_poliza === 'BOLÍVAR').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalPrimaNetaDolar = data.filter(item => item.tipo_moneda_poliza === 'DÓLAR').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalPrimaNetaEuro = data.filter(item => item.tipo_moneda_poliza === 'EUROS').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const objectTotalPrimaNetaBolivar = {
                'nombre_agente_propio': '',
                'numero_poliza': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'BOLÍVAR',
                'prima_neta': totalPrimaNetaBolivar,
                'fecha_desde': ''
            }
            const objectTotalPrimaNetaDolar = {
                'nombre_agente_propio': '',
                'numero_poliza': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'DÓLAR',
                'prima_neta': totalPrimaNetaDolar,
                'fecha_desde': ''
            }
            const objectTotalPrimaNetaEuro = {
                'nombre_agente_propio': '',
                'numero_poliza': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'EUROS',
                'prima_neta': totalPrimaNetaEuro,
                'fecha_desde': ''
            }
            data.push(objectTotalPrimaNetaBolivar, objectTotalPrimaNetaDolar, objectTotalPrimaNetaEuro);
            data.forEach(item => {
                item.prima_neta = Math.round((item.prima_neta + Number.EPSILON) * 100) / 100;
                item.prima_neta = convertNumberToString(item.prima_neta);
                item.prima_neta = convertStringToCurrency(item.tipo_moneda_poliza , item.prima_neta);
            });
            res.render('premiumsCollected',{
                data,
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('premiumsCollected', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/premiums-collected',
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postPremiumsPending: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            let {
                fecha_desde: fechaDesde,
                fecha_hasta: fechaHasta,
                nombre_aseguradora: nombreAseguradora,
                ramo_poliza: ramoPoliza,
                nombre_agente_propio: nombreAgentePropio, 
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                id_rif_asegurado: idRifAsegurado
            } = req.body;
            let hash = {};
            const filters = [];
            const resultsDivisions = await divisionModel.getFractionationPending();
            if (fechaDesde !== '') {
                fechaDesde = new Date(fechaDesde);
                fechaHasta = new Date(fechaHasta);
                filters.push(premiumsPending => (premiumsPending.fecha_desde.getTime() >= fechaDesde.getTime()) && (premiumsPending.fecha_desde.getTime() <= fechaHasta.getTime()));
            }
            if (nombreAseguradora !== '') {
                filters.push(premiumsPending => premiumsPending.nombre_aseguradora === nombreAseguradora);
            }
            if (ramoPoliza !== '') {
                filters.push(premiumsPending => premiumsPending.tipo_individual_poliza === ramoPoliza);
            }
            if (nombreAgentePropio !== '') {
                filters.push(premiumsPending => premiumsPending.nombre_agente_propio === nombreAgentePropio);
            }
            if (idRifAsegurado !== '') {
                filters.push(premiumsPending => premiumsPending.cedula_rif_asegurado === idRifAsegurado && premiumsPending.tipo_cedula_rif_asegurado === tipoIdRifAsegurado);
            }
            let data = await Promise.all(
                resultsDivisions.map(async (division) => {
                    const resultReceipt = await receiptModel.getReceipt(division.recibo_id);
                    const premiumNet = await divisionModel.getPremiumPendingSum(division.recibo_id);
                    if (resultReceipt[0].poliza_id !== null) { 
                        const resultPolicy = await policyModel.getPolicy(resultReceipt[0].poliza_id);
                        const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(resultReceipt[0].poliza_id);
                        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultReceipt[0].poliza_id);
                        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
                        const resultNaturalInsured = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
                        const resultLegalInsured = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
                        if (resultLegalInsured.length === 0) {
                            if (resultPOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            }
                        } else {
                            if (resultPOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            }
                        }
                    } else if (resultReceipt[0].colectivo_id !== null) {
                        const resultCollective = await collectiveModel.getCollective(resultReceipt[0].colectivo_id);
                        const resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultReceipt[0].colectivo_id);
                        const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultReceipt[0].colectivo_id);
                        const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
                        const resultNaturalInsured = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
                        const resultLegalInsured = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
                        if (resultLegalInsured.length === 0) {
                            if (resultCOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultCOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            }
                        } else {
                            if (resultCOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultCOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            }
                        }
                    }
                })
            );
            data = data.filter(data => hash[data.numero_poliza] ? false : hash[data.numero_poliza] = true);
            data = data.filter(premiumsPending => filters.every(filterPolicy => filterPolicy(premiumsPending)));
            const totalPrimaNetaBolivar = data.filter(item => item.tipo_moneda_poliza === 'BOLÍVAR').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalPrimaNetaDolar = data.filter(item => item.tipo_moneda_poliza === 'DÓLAR').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalPrimaNetaEuro = data.filter(item => item.tipo_moneda_poliza === 'EUROS').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const objectTotalPrimaNetaBolivar = {
                'nombre_agente_propio': '',
                'numero_poliza': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'BOLÍVAR',
                'prima_neta': totalPrimaNetaBolivar,
                'fecha_desde': ''
            }
            const objectTotalPrimaNetaDolar = {
                'nombre_agente_propio': '',
                'numero_poliza': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'DÓLAR',
                'prima_neta': totalPrimaNetaDolar,
                'fecha_desde': ''
            }
            const objectTotalPrimaNetaEuro = {
                'nombre_agente_propio': '',
                'numero_poliza': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'EUROS',
                'prima_neta': totalPrimaNetaEuro,
                'fecha_desde': ''
            }
            data.push(objectTotalPrimaNetaBolivar, objectTotalPrimaNetaDolar, objectTotalPrimaNetaEuro);
            data.forEach(item => {
                item.prima_neta = Math.round((item.prima_neta + Number.EPSILON) * 100) / 100;
                item.prima_neta = convertNumberToString(item.prima_neta);
                item.prima_neta = convertStringToCurrency(item.tipo_moneda_poliza , item.prima_neta);
            });
            res.render('premiumsPending',{
                data,
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('premiumsPending', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/premiums-pending',
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postCommissionTransit: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            let {
                fecha_desde: fechaDesde,
                fecha_hasta: fechaHasta,
                nombre_aseguradora: nombreAseguradora,
                ramo_poliza: ramoPoliza,
                nombre_agente_propio: nombreAgentePropio, 
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                id_rif_asegurado: idRifAsegurado
            } = req.body;
            let hash = {};
            const filters = [];
            const resultsDivisions = await divisionModel.getCommissionTransit();
            if (fechaDesde !== '') {
                fechaDesde = new Date(fechaDesde);
                fechaHasta = new Date(fechaHasta);
                filters.push(commissionTransit => (commissionTransit.fecha_desde.getTime() >= fechaDesde.getTime()) && (commissionTransit.fecha_desde.getTime() <= fechaHasta.getTime()));
            }
            if (nombreAseguradora !== '') {
                filters.push(commissionTransit => commissionTransit.nombre_aseguradora === nombreAseguradora);
            }
            if (ramoPoliza !== '') {
                filters.push(commissionTransit => commissionTransit.tipo_individual_poliza === ramoPoliza);
            }
            if (nombreAgentePropio !== '') {
                filters.push(commissionTransit => commissionTransit.nombre_agente_propio === nombreAgentePropio);
            }
            if (idRifAsegurado !== '') {
                filters.push(commissionTransit => commissionTransit.cedula_rif_asegurado === idRifAsegurado && commissionTransit.tipo_cedula_rif_asegurado === tipoIdRifAsegurado);
            }
            let data = await Promise.all(
                resultsDivisions.map(async (division) => {
                    const resultReceipt = await receiptModel.getReceipt(division.recibo_id);
                    const premiumNet = await divisionModel.getPremiumCommissionPendingSum(division.recibo_id);
                    const commissionAmount = await divisionModel.getCommissionPendingSum(division.recibo_id);
                    if (resultReceipt[0].poliza_id !== null) { 
                        const resultPolicy = await policyModel.getPolicy(resultReceipt[0].poliza_id);
                        const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(resultReceipt[0].poliza_id);
                        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultReceipt[0].poliza_id);
                        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
                        const resultNaturalInsured = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
                        const resultLegalInsured = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
                        if (resultLegalInsured.length === 0) {
                            if (resultPOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'monto_comision': commissionAmount[0].comision_pendiente_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'monto_comision': commissionAmount[0].comision_pendiente_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            }
                        } else {
                            if (resultPOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'monto_comision': commissionAmount[0].comision_pendiente_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'monto_comision': commissionAmount[0].comision_pendiente_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            }
                        }
                    } else if (resultReceipt[0].colectivo_id !== null) {
                        const resultCollective = await collectiveModel.getCollective(resultReceipt[0].colectivo_id);
                        const resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultReceipt[0].colectivo_id);
                        const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultReceipt[0].colectivo_id);
                        const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
                        const resultNaturalInsured = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
                        const resultLegalInsured = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
                        if (resultLegalInsured.length === 0) {
                            if (resultCOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultCOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'monto_comision': commissionAmount[0].comision_pendiente_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'monto_comision': commissionAmount[0].comision_pendiente_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            }
                        } else {
                            if (resultCOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultCOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'monto_comision': commissionAmount[0].comision_pendiente_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_pendiente_total,
                                    'monto_comision': commissionAmount[0].comision_pendiente_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            }
                        }
                    }
                })
            );
            data = data.filter(data => hash[data.numero_poliza] ? false : hash[data.numero_poliza] = true);
            data = data.filter(commissionTransit => filters.every(filterPolicy => filterPolicy(commissionTransit)));
            const totalPrimaNetaBolivar = data.filter(item => item.tipo_moneda_poliza === 'BOLÍVAR').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalComisionBolivar = data.filter(item => item.tipo_moneda_poliza === 'BOLÍVAR').map(item => item.monto_comision).reduce((prev, curr) => prev + curr, 0);
            const totalPrimaNetaDolar = data.filter(item => item.tipo_moneda_poliza === 'DÓLAR').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalComisionDolar = data.filter(item => item.tipo_moneda_poliza === 'DÓLAR').map(item => item.monto_comision).reduce((prev, curr) => prev + curr, 0);
            const totalPrimaNetaEuro = data.filter(item => item.tipo_moneda_poliza === 'EUROS').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalComisionEuro = data.filter(item => item.tipo_moneda_poliza === 'EUROS').map(item => item.monto_comision).reduce((prev, curr) => prev + curr, 0);
            const objectTotalPrimaNetaBolivar = {
                'nombre_agente_propio': '',
                'numero_poliza': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'BOLÍVAR',
                'prima_neta': totalPrimaNetaBolivar,
                'monto_comision': totalComisionBolivar,
                'fecha_desde': ''
            }
            const objectTotalPrimaNetaDolar = {
                'nombre_agente_propio': '',
                'numero_poliza': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'DÓLAR',
                'prima_neta': totalPrimaNetaDolar,
                'monto_comision': totalComisionDolar,
                'fecha_desde': ''
            }
            const objectTotalPrimaNetaEuro = {
                'nombre_agente_propio': '',
                'numero_poliza': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'EUROS',
                'prima_neta': totalPrimaNetaEuro,
                'monto_comision': totalComisionEuro,
                'fecha_desde': ''
            }
            data.push(objectTotalPrimaNetaBolivar, objectTotalPrimaNetaDolar, objectTotalPrimaNetaEuro);
            data.forEach(item => {
                item.prima_neta = Math.round((item.prima_neta + Number.EPSILON) * 100) / 100;
                item.prima_neta = convertNumberToString(item.prima_neta);
                item.prima_neta = convertStringToCurrency(item.tipo_moneda_poliza, item.prima_neta);
                item.monto_comision = Math.round((item.monto_comision + Number.EPSILON) * 100) / 100;
                item.monto_comision = convertNumberToString(item.monto_comision);
                item.monto_comision = convertStringToCurrency(item.tipo_moneda_poliza, item.monto_comision);
            });
            res.render('commissionTransit',{
                data,
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('commissionTransit', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/commission-transits',
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postCommissionDistribution: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            let {
                fecha_desde: fechaDesde,
                fecha_hasta: fechaHasta,
                nombre_aseguradora: nombreAseguradora,
                ramo_poliza: ramoPoliza,
                nombre_agente_propio: nombreAgentePropio, 
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                id_rif_asegurado: idRifAsegurado
            } = req.body;
            let hash = {};
            const filters = [];
            const resultsDivisions = await divisionModel.getCommissionDistribution();
            if (fechaDesde !== '') {
                fechaDesde = new Date(fechaDesde);
                fechaHasta = new Date(fechaHasta);
                filters.push(commissionTransit => (commissionTransit.fecha_desde.getTime() >= fechaDesde.getTime()) && (commissionTransit.fecha_desde.getTime() <= fechaHasta.getTime()));
            }
            if (nombreAseguradora !== '') {
                filters.push(commissionTransit => commissionTransit.nombre_aseguradora === nombreAseguradora);
            }
            if (ramoPoliza !== '') {
                filters.push(commissionTransit => commissionTransit.tipo_individual_poliza === ramoPoliza);
            }
            if (nombreAgentePropio !== '') {
                filters.push(commissionTransit => commissionTransit.nombre_agente_propio === nombreAgentePropio);
            }
            if (idRifAsegurado !== '') {
                filters.push(commissionTransit => commissionTransit.cedula_rif_asegurado === idRifAsegurado && commissionTransit.tipo_cedula_rif_asegurado === tipoIdRifAsegurado);
            }
            let data = await Promise.all(
                resultsDivisions.map(async (division) => {
                    const resultReceipt = await receiptModel.getReceipt(division.recibo_id);
                    const premiumNet = await divisionModel.getPremiumCommissionDistributionSum(division.recibo_id);
                    const commissionAmount = await divisionModel.getCommissionDistributionSum(division.recibo_id);
                    if (resultReceipt[0].poliza_id !== null) { 
                        const resultPolicy = await policyModel.getPolicy(resultReceipt[0].poliza_id);
                        const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(resultReceipt[0].poliza_id);
                        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultReceipt[0].poliza_id);
                        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
                        const resultNaturalInsured = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
                        const resultLegalInsured = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
                        if (resultLegalInsured.length === 0) {
                            if (resultPOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_distribucion_total,
                                    'monto_comision': commissionAmount[0].comision_distribucion_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_distribucion_total,
                                    'monto_comision': commissionAmount[0].comision_distribucion_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            }
                        } else {
                            if (resultPOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_distribucion_total,
                                    'monto_comision': commissionAmount[0].comision_distribucion_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_distribucion_total,
                                    'monto_comision': commissionAmount[0].comision_distribucion_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            }
                        }
                    } else if (resultReceipt[0].colectivo_id !== null) {
                        const resultCollective = await collectiveModel.getCollective(resultReceipt[0].colectivo_id);
                        const resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultReceipt[0].colectivo_id);
                        const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultReceipt[0].colectivo_id);
                        const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
                        const resultNaturalInsured = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
                        const resultLegalInsured = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
                        if (resultLegalInsured.length === 0) {
                            if (resultCOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultCOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_distribucion_total,
                                    'monto_comision': commissionAmount[0].comision_distribucion_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_distribucion_total,
                                    'monto_comision': commissionAmount[0].comision_distribucion_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            }
                        } else {
                            if (resultCOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultCOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_distribucion_total,
                                    'monto_comision': commissionAmount[0].comision_distribucion_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_distribucion_total,
                                    'monto_comision': commissionAmount[0].comision_distribucion_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            }
                        }
                    }
                })
            );
            data = data.filter(data => hash[data.numero_poliza] ? false : hash[data.numero_poliza] = true);
            data = data.filter(commissionTransit => filters.every(filterPolicy => filterPolicy(commissionTransit)));
            const totalPrimaNetaBolivar = data.filter(item => item.tipo_moneda_poliza === 'BOLÍVAR').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalComisionBolivar = data.filter(item => item.tipo_moneda_poliza === 'BOLÍVAR').map(item => item.monto_comision).reduce((prev, curr) => prev + curr, 0);
            const totalPrimaNetaDolar = data.filter(item => item.tipo_moneda_poliza === 'DÓLAR').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalComisionDolar = data.filter(item => item.tipo_moneda_poliza === 'DÓLAR').map(item => item.monto_comision).reduce((prev, curr) => prev + curr, 0);
            const totalPrimaNetaEuro = data.filter(item => item.tipo_moneda_poliza === 'EUROS').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalComisionEuro = data.filter(item => item.tipo_moneda_poliza === 'EUROS').map(item => item.monto_comision).reduce((prev, curr) => prev + curr, 0);
            const objectTotalPrimaNetaBolivar = {
                'nombre_agente_propio': '',
                'numero_poliza': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'BOLÍVAR',
                'prima_neta': totalPrimaNetaBolivar,
                'monto_comision': totalComisionBolivar,
                'fecha_desde': ''
            }
            const objectTotalPrimaNetaDolar = {
                'nombre_agente_propio': '',
                'numero_poliza': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'DÓLAR',
                'prima_neta': totalPrimaNetaDolar,
                'monto_comision': totalComisionDolar,
                'fecha_desde': ''
            }
            const objectTotalPrimaNetaEuro = {
                'nombre_agente_propio': '',
                'numero_poliza': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'EUROS',
                'prima_neta': totalPrimaNetaEuro,
                'monto_comision': totalComisionEuro,
                'fecha_desde': ''
            }
            data.push(objectTotalPrimaNetaBolivar, objectTotalPrimaNetaDolar, objectTotalPrimaNetaEuro);
            data.forEach(item => {
                item.prima_neta = Math.round((item.prima_neta + Number.EPSILON) * 100) / 100;
                item.prima_neta = convertNumberToString(item.prima_neta);
                item.prima_neta = convertStringToCurrency(item.tipo_moneda_poliza, item.prima_neta);
                item.monto_comision = Math.round((item.monto_comision + Number.EPSILON) * 100) / 100;
                item.monto_comision = convertNumberToString(item.monto_comision);
                item.monto_comision = convertStringToCurrency(item.tipo_moneda_poliza, item.monto_comision);
            });
            res.render('commissionDistribution',{
                data,
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('commissionDistribution', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/commission-distribution',
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postCommissionPaid: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            let {
                fecha_desde: fechaDesde,
                fecha_hasta: fechaHasta,
                nombre_aseguradora: nombreAseguradora,
                ramo_poliza: ramoPoliza,
                nombre_agente_propio: nombreAgentePropio, 
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                id_rif_asegurado: idRifAsegurado
            } = req.body;
            let hash = {};
            const filters = [];
            const resultsDivisions = await divisionModel.getFractionationCollected();
            if (fechaDesde !== '') {
                fechaDesde = new Date(fechaDesde);
                fechaHasta = new Date(fechaHasta);
                filters.push(commissionTransit => (commissionTransit.fecha_desde.getTime() >= fechaDesde.getTime()) && (commissionTransit.fecha_desde.getTime() <= fechaHasta.getTime()));
            }
            if (nombreAseguradora !== '') {
                filters.push(commissionTransit => commissionTransit.nombre_aseguradora === nombreAseguradora);
            }
            if (ramoPoliza !== '') {
                filters.push(commissionTransit => commissionTransit.tipo_individual_poliza === ramoPoliza);
            }
            if (nombreAgentePropio !== '') {
                filters.push(commissionTransit => commissionTransit.nombre_agente_propio === nombreAgentePropio);
            }
            if (idRifAsegurado !== '') {
                filters.push(commissionTransit => commissionTransit.cedula_rif_asegurado === idRifAsegurado && commissionTransit.tipo_cedula_rif_asegurado === tipoIdRifAsegurado);
            }
            let data = await Promise.all(
                resultsDivisions.map(async (division) => {
                    const resultReceipt = await receiptModel.getReceipt(division.recibo_id);
                    const premiumNet = await divisionModel.getPremiumCollectedSum(division.recibo_id);
                    const commissionAmount = await divisionModel.getCommissionPaidSum(division.recibo_id);
                    if (resultReceipt[0].poliza_id !== null) { 
                        const resultPolicy = await policyModel.getPolicy(resultReceipt[0].poliza_id);
                        const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(resultReceipt[0].poliza_id);
                        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultReceipt[0].poliza_id);
                        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
                        const resultNaturalInsured = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
                        const resultLegalInsured = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
                        if (resultLegalInsured.length === 0) {
                            if (resultPOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'monto_comision': commissionAmount[0].comision_bonificacion_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'monto_comision': commissionAmount[0].comision_bonificacion_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            }
                        } else {
                            if (resultPOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'monto_comision': commissionAmount[0].comision_bonificacion_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultPolicy[0].tipo_moneda_poliza,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'monto_comision': commissionAmount[0].comision_bonificacion_total,
                                    'fecha_desde': resultPolicy[0].fecha_desde_poliza
                                }
                            }
                        }
                    } else if (resultReceipt[0].colectivo_id !== null) {
                        const resultCollective = await collectiveModel.getCollective(resultReceipt[0].colectivo_id);
                        const resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultReceipt[0].colectivo_id);
                        const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultReceipt[0].colectivo_id);
                        const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
                        const resultNaturalInsured = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
                        const resultLegalInsured = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
                        if (resultLegalInsured.length === 0) {
                            if (resultCOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultCOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'monto_comision': commissionAmount[0].comision_bonificacion_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'monto_comision': commissionAmount[0].comision_bonificacion_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            }
                        } else {
                            if (resultCOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultCOA[0].agente_propio_id);
                                return {
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'monto_comision': commissionAmount[0].comision_bonificacion_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            } else {
                                return {
                                    'nombre_agente_propio': 'ATINA',
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_moneda_poliza': resultCollective[0].tipo_moneda_colectivo,
                                    'prima_neta': premiumNet[0].prima_cobrada_total,
                                    'monto_comision': commissionAmount[0].comision_bonificacion_total,
                                    'fecha_desde': resultCollective[0].fecha_desde_colectivo
                                }
                            }
                        }
                    }
                })
            );
            data = data.filter(data => hash[data.numero_poliza] ? false : hash[data.numero_poliza] = true);
            data = data.filter(commissionTransit => filters.every(filterPolicy => filterPolicy(commissionTransit)));
            const totalPrimaNetaBolivar = data.filter(item => item.tipo_moneda_poliza === 'BOLÍVAR').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalComisionBolivar = data.filter(item => item.tipo_moneda_poliza === 'BOLÍVAR').map(item => item.monto_comision).reduce((prev, curr) => prev + curr, 0);
            const totalPrimaNetaDolar = data.filter(item => item.tipo_moneda_poliza === 'DÓLAR').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalComisionDolar = data.filter(item => item.tipo_moneda_poliza === 'DÓLAR').map(item => item.monto_comision).reduce((prev, curr) => prev + curr, 0);
            const totalPrimaNetaEuro = data.filter(item => item.tipo_moneda_poliza === 'EUROS').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalComisionEuro = data.filter(item => item.tipo_moneda_poliza === 'EUROS').map(item => item.monto_comision).reduce((prev, curr) => prev + curr, 0);
            const objectTotalPrimaNetaBolivar = {
                'nombre_agente_propio': '',
                'numero_poliza': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'BOLÍVAR',
                'prima_neta': totalPrimaNetaBolivar,
                'monto_comision': totalComisionBolivar,
                'fecha_desde': ''
            }
            const objectTotalPrimaNetaDolar = {
                'nombre_agente_propio': '',
                'numero_poliza': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'DÓLAR',
                'prima_neta': totalPrimaNetaDolar,
                'monto_comision': totalComisionDolar,
                'fecha_desde': ''
            }
            const objectTotalPrimaNetaEuro = {
                'nombre_agente_propio': '',
                'numero_poliza': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'EUROS',
                'prima_neta': totalPrimaNetaEuro,
                'monto_comision': totalComisionEuro,
                'fecha_desde': ''
            }
            data.push(objectTotalPrimaNetaBolivar, objectTotalPrimaNetaDolar, objectTotalPrimaNetaEuro);
            data.forEach(item => {
                item.prima_neta = Math.round((item.prima_neta + Number.EPSILON) * 100) / 100;
                item.prima_neta = convertNumberToString(item.prima_neta);
                item.prima_neta = convertStringToCurrency(item.tipo_moneda_poliza, item.prima_neta);
                item.monto_comision = Math.round((item.monto_comision + Number.EPSILON) * 100) / 100;
                item.monto_comision = convertNumberToString(item.monto_comision);
                item.monto_comision = convertStringToCurrency(item.tipo_moneda_poliza, item.monto_comision);
            });
            res.render('commissionPaid',{
                data,
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('commissionPaid', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/commission-paid',
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postAccidentRate: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCollectives = await collectiveModel.getCollectives();
        try {
            let {
                fecha_desde: fechaDesde,
                fecha_hasta: fechaHasta,
                nombre_aseguradora: nombreAseguradora,
                numero_poliza: numeroPoliza,
                ramo_poliza: ramoPoliza,
                nombre_agente_propio: nombreAgentePropio, 
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                id_rif_asegurado: idRifAsegurado,
                tipo_siniestro: tipoSiniestro
            } = req.body;
            const filters = [];
            const resultsRefunds = await refundModel.getRefunds();
            const resultsLettersGuarantee = await letterGuaranteeModel.getLettersGuarantee();
            const resultsEmergencies = await emergencyModel.getEmergencies();
            const resultsAMP = await ampModel.getAMP();
            if (fechaDesde !== '') {
                fechaDesde = new Date(fechaDesde);
                fechaHasta = new Date(fechaHasta);
                filters.push(accidentRate => (accidentRate.fecha_desde.getTime() >= fechaDesde.getTime()) && (accidentRate.fecha_desde.getTime() <= fechaHasta.getTime()));
            }
            if (nombreAseguradora !== '') {
                filters.push(accidentRate => accidentRate.nombre_aseguradora === nombreAseguradora);
            }
            if (numeroPoliza !== '') {
                filters.push(accidentRate => accidentRate.numero_poliza === numeroPoliza);
            }
            if (ramoPoliza !== '') {
                filters.push(accidentRate => accidentRate.tipo_individual_poliza === ramoPoliza);
            }
            if (nombreAgentePropio !== '') {
                filters.push(accidentRate => accidentRate.nombre_agente_propio === nombreAgentePropio);
            }
            if (idRifAsegurado !== '') {
                filters.push(accidentRate => accidentRate.cedula_rif_asegurado === idRifAsegurado && accidentRate.tipo_cedula_rif_asegurado === tipoIdRifAsegurado);
            }
            if (tipoSiniestro !== '') {
                filters.push(accidentRate => accidentRate.tipo_siniestro === tipoSiniestro);
            }
            const arrayRefunds = resultsRefunds.map(refund => {
                return {
                    'patologia_siniestro': refund.patologia_reembolso,
                    'fecha_ocurrencia_siniestro': refund.fecha_ocurrencia_reembolso,
                    'monto_siniestro': refund.monto_reclamo_reembolso,
                    'tipo_moneda_siniestro': refund.tipo_moneda_reembolso,
                    'estatus_siniestro': refund.estatus_reembolso,
                    'numero_siniestro': refund.numero_siniestro_reembolso,
                    'asegurado_beneficiario_id': refund.asegurado_beneficiario_id,
                    'poliza_id': refund.poliza_id,
                    'colectivo_id': refund.colectivo_id,
                    'tipo_siniestro': 'REEMBOLSO'
                }
            });
            const arrayLettersGuarantee = resultsLettersGuarantee.map(letterGuarantee => {
                return {
                    'patologia_siniestro': letterGuarantee.patologia_carta_aval,
                    'fecha_ocurrencia_siniestro': letterGuarantee.fecha_ocurrencia_carta_aval,
                    'monto_siniestro': letterGuarantee.monto_reclamado_carta_aval,
                    'tipo_moneda_siniestro': letterGuarantee.tipo_moneda_carta_aval,
                    'estatus_siniestro': letterGuarantee.estatus_carta_aval,
                    'numero_siniestro': letterGuarantee.numero_siniestro_carta_aval,
                    'asegurado_beneficiario_id': letterGuarantee.asegurado_beneficiario_id,
                    'poliza_id': letterGuarantee.poliza_id,
                    'colectivo_id': letterGuarantee.colectivo_id,
                    'tipo_siniestro': 'CARTA AVAL'
                }
            });
            const arrayEmergencies = resultsEmergencies.map(emergency => {
                return {
                    'patologia_siniestro': emergency.patologia_emergencia,
                    'fecha_ocurrencia_siniestro': emergency.fecha_ocurrencia_emergencia,
                    'monto_siniestro': emergency.monto_reclamado_emergencia,
                    'tipo_moneda_siniestro': emergency.tipo_moneda_emergencia,
                    'estatus_siniestro': emergency.estatus_emergencia,
                    'numero_siniestro': emergency.numero_siniestro_emergencia,
                    'asegurado_beneficiario_id': emergency.asegurado_beneficiario_id,
                    'poliza_id': emergency.poliza_id,
                    'colectivo_id': emergency.colectivo_id,
                    'tipo_siniestro': 'EMERGENCIA'
                }
            });
            const arrayAMP = resultsAMP.map(amp => {
                return {
                    'patologia_siniestro': amp.patologia_amp,
                    'fecha_ocurrencia_siniestro': amp.fecha_ocurrencia_amp,
                    'monto_siniestro': amp.monto_reclamado_amp,
                    'tipo_moneda_siniestro': amp.tipo_moneda_amp,
                    'estatus_siniestro': amp.estatus_amp,
                    'numero_siniestro': amp.numero_siniestro_amp,
                    'asegurado_beneficiario_id': amp.asegurado_beneficiario_id,
                    'poliza_id': amp.poliza_id,
                    'colectivo_id': amp.colectivo_id,
                    'tipo_siniestro': 'AMP'
                }
            });
            const resultsSinister = arrayRefunds.concat(arrayLettersGuarantee, arrayEmergencies, arrayAMP);
            let data = await Promise.all(
                resultsSinister.map(async (sinister) => {
                    const resultInsuredBeneficiary = await insuredBeneficiaryModel.getBeneficiaryNames(sinister.asegurado_beneficiario_id);
                    if (sinister.poliza_id !== null) { 
                        const resultPolicy = await policyModel.getPolicy(sinister.poliza_id);
                        const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(sinister.poliza_id);
                        const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(sinister.poliza_id);
                        const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
                        const resultNaturalInsured = await insuredModel.getNaturalInsured(resultInsuredBeneficiary[0].asegurado_per_nat_id);
                        const resultLegalInsured = await insuredModel.getLegalInsured(resultInsuredBeneficiary[0].asegurado_per_jur_id);
                        if (resultLegalInsured.length === 0) {
                            if (resultPOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                                return {
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'numero_siniestro': sinister.numero_siniestro,
                                    'ci_tomador_poliza': resultPolicy[0].id_rif_tomador,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'cedula_beneficiario': resultInsuredBeneficiary[0].cedula_beneficiario,
                                    'nombre_completo_beneficiario': `${resultInsuredBeneficiary[0].nombre_beneficiario} ${resultInsuredBeneficiary[0].apellido_beneficiario}`,
                                    'patologia_siniestro': sinister.patologia_siniestro,
                                    'tipo_siniestro': sinister.tipo_siniestro,
                                    'monto_siniestro': sinister.monto_siniestro,
                                    'estatus_siniestro': sinister.estatus_siniestro,
                                    'fecha_desde': sinister.fecha_ocurrencia_siniestro,
                                    'tipo_moneda_siniestro': sinister.tipo_moneda_siniestro,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                }
                            } else {
                                return {
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'numero_siniestro': sinister.numero_siniestro,
                                    'ci_tomador_poliza': resultPolicy[0].id_rif_tomador,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'cedula_beneficiario': resultInsuredBeneficiary[0].cedula_beneficiario,
                                    'nombre_completo_beneficiario': `${resultInsuredBeneficiary[0].nombre_beneficiario} ${resultInsuredBeneficiary[0].apellido_beneficiario}`,
                                    'patologia_siniestro': sinister.patologia_siniestro,
                                    'tipo_siniestro': sinister.tipo_siniestro,
                                    'monto_siniestro': sinister.monto_siniestro,
                                    'estatus_siniestro': sinister.estatus_siniestro,
                                    'fecha_desde': sinister.fecha_ocurrencia_siniestro,
                                    'tipo_moneda_siniestro': sinister.tipo_moneda_siniestro,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_agente_propio': 'ATINA',
                                }
                            }
                        } else { 
                            if (resultPOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                                return {
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'numero_siniestro': sinister.numero_siniestro,
                                    'ci_tomador_poliza': resultPolicy[0].id_rif_tomador,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'cedula_beneficiario': resultInsuredBeneficiary[0].cedula_beneficiario,
                                    'nombre_completo_beneficiario': `${resultInsuredBeneficiary[0].nombre_beneficiario} ${resultInsuredBeneficiary[0].apellido_beneficiario}`,
                                    'patologia_siniestro': sinister.patologia_siniestro,
                                    'tipo_siniestro': sinister.tipo_siniestro,
                                    'monto_siniestro': sinister.monto_siniestro,
                                    'estatus_siniestro': sinister.estatus_siniestro,
                                    'fecha_desde': sinister.fecha_ocurrencia_siniestro,
                                    'tipo_moneda_siniestro': sinister.tipo_moneda_siniestro,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                }
                            } else {
                                return {
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'numero_poliza': resultPolicy[0].numero_poliza,
                                    'numero_siniestro': sinister.numero_siniestro,
                                    'ci_tomador_poliza': resultPolicy[0].id_rif_tomador,
                                    'nombre_tomador_poliza': resultPolicy[0].nombre_tomador_poliza,
                                    'cedula_beneficiario': resultInsuredBeneficiary[0].cedula_beneficiario,
                                    'nombre_completo_beneficiario': `${resultInsuredBeneficiary[0].nombre_beneficiario} ${resultInsuredBeneficiary[0].apellido_beneficiario}`,
                                    'patologia_siniestro': sinister.patologia_siniestro,
                                    'tipo_siniestro': sinister.tipo_siniestro,
                                    'monto_siniestro': sinister.monto_siniestro,
                                    'estatus_siniestro': sinister.estatus_siniestro,
                                    'fecha_desde': sinister.fecha_ocurrencia_siniestro,
                                    'tipo_moneda_siniestro': sinister.tipo_moneda_siniestro,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_individual_poliza': `${resultPolicy[0].tipo_individual_poliza} INDIVIDUAL`,
                                    'nombre_agente_propio': 'ATINA',
                                }
                            }
                        }
                    } else if (sinister.colectivo_id !== null) {
                        const resultCollective = await collectiveModel.getCollective(sinister.colectivo_id);
                        const resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(sinister.colectivo_id);
                        const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(sinister.colectivo_id);
                        const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
                        const resultNaturalInsured = await insuredModel.getNaturalInsured(resultInsuredBeneficiary[0].asegurado_per_nat_id);
                        const resultLegalInsured = await insuredModel.getLegalInsured(resultInsuredBeneficiary[0].asegurado_per_jur_id);
                        if (resultLegalInsured.length === 0) {
                            if (resultCOA.length !== 0) {
                                const resultOwnAgent = await ownAgentModel.getOwnAgent(resultCOA[0].agente_propio_id);
                                return {
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'numero_siniestro': sinister.numero_siniestro,
                                    'ci_tomador_poliza': resultCollective[0].id_rif_tomador,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'cedula_beneficiario': resultInsuredBeneficiary[0].cedula_beneficiario,
                                    'nombre_completo_beneficiario': `${resultInsuredBeneficiary[0].nombre_beneficiario} ${resultInsuredBeneficiary[0].apellido_beneficiario}`,
                                    'patologia_siniestro': sinister.patologia_siniestro,
                                    'tipo_siniestro': sinister.tipo_siniestro,
                                    'monto_siniestro': sinister.monto_siniestro,
                                    'estatus_siniestro': sinister.estatus_siniestro,
                                    'fecha_desde': sinister.fecha_ocurrencia_siniestro,
                                    'tipo_moneda_siniestro': sinister.tipo_moneda_siniestro,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                }
                            } else {
                                return {
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'numero_poliza': resultCollective[0].numero_colectivo,
                                    'numero_siniestro': sinister.numero_siniestro,
                                    'ci_tomador_poliza': resultCollective[0].id_rif_tomador,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_colectivo,
                                    'cedula_beneficiario': resultInsuredBeneficiary[0].cedula_beneficiario,
                                    'nombre_completo_beneficiario': `${resultInsuredBeneficiary[0].nombre_beneficiario} ${resultInsuredBeneficiary[0].apellido_beneficiario}`,
                                    'patologia_siniestro': sinister.patologia_siniestro,
                                    'tipo_siniestro': sinister.tipo_siniestro,
                                    'monto_siniestro': sinister.monto_siniestro,
                                    'estatus_siniestro': sinister.estatus_siniestro,
                                    'fecha_desde': sinister.fecha_ocurrencia_siniestro,
                                    'tipo_moneda_siniestro': sinister.tipo_moneda_siniestro,
                                    'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                    'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_agente_propio': 'ATINA',
                                }
                            }
                        } else {
                            if (resultCOA.length !== 0) {
                                return {
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'numero_poliza': resultCollective[0].numero_poliza,
                                    'numero_siniestro': sinister.numero_siniestro,
                                    'ci_tomador_poliza': resultCollective[0].id_rif_tomador,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_poliza,
                                    'cedula_beneficiario': resultInsuredBeneficiary[0].cedula_beneficiario,
                                    'nombre_completo_beneficiario': `${resultInsuredBeneficiary[0].nombre_beneficiario} ${resultInsuredBeneficiary[0].apellido_beneficiario}`,
                                    'patologia_siniestro': sinister.patologia_siniestro,
                                    'tipo_siniestro': sinister.tipo_siniestro,
                                    'monto_siniestro': sinister.monto_siniestro,
                                    'estatus_siniestro': sinister.estatus_siniestro,
                                    'fecha_desde': sinister.fecha_ocurrencia_siniestro,
                                    'tipo_moneda_siniestro': sinister.tipo_moneda_siniestro,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                }
                            } else {
                                return {
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'numero_poliza': resultCollective[0].numero_poliza,
                                    'numero_siniestro': sinister.numero_siniestro,
                                    'ci_tomador_poliza': resultCollective[0].id_rif_tomador,
                                    'nombre_tomador_poliza': resultCollective[0].nombre_tomador_poliza,
                                    'cedula_beneficiario': resultInsuredBeneficiary[0].cedula_beneficiario,
                                    'nombre_completo_beneficiario': `${resultInsuredBeneficiary[0].nombre_beneficiario} ${resultInsuredBeneficiary[0].apellido_beneficiario}`,
                                    'patologia_siniestro': sinister.patologia_siniestro,
                                    'tipo_siniestro': sinister.tipo_siniestro,
                                    'monto_siniestro': sinister.monto_siniestro,
                                    'estatus_siniestro': sinister.estatus_siniestro,
                                    'fecha_desde': sinister.fecha_ocurrencia_siniestro,
                                    'tipo_moneda_siniestro': sinister.tipo_moneda_siniestro,
                                    'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                    'tipo_individual_poliza': `${resultCollective[0].tipo_colectivo} COLECTIVO`,
                                    'nombre_agente_propio': 'ATINA',
                                }
                            }
                        }
                    }
                })
            );
            data = data.filter(accidentRate => filters.every(filterSinister => filterSinister(accidentRate)));
            const totalMontoBolivar = data.filter(item => item.tipo_moneda_siniestro === 'BOLÍVAR').map(item => item.monto_siniestro).reduce((prev, curr) => prev + curr, 0);
            const totalMontoDolar = data.filter(item => item.tipo_moneda_siniestro === 'DÓLAR').map(item => item.monto_siniestro).reduce((prev, curr) => prev + curr, 0);
            const totalMontoEuro = data.filter(item => item.tipo_moneda_siniestro === 'EUROS').map(item => item.monto_siniestro).reduce((prev, curr) => prev + curr, 0);
            const objectTotalPrimaNetaBolivar = {
                'nombre_aseguradora': '',
                'numero_poliza': '',
                'numero_siniestro': '',
                'ci_tomador_poliza': '',
                'nombre_tomador_poliza': '',
                'cedula_beneficiario': '',
                'nombre_completo_beneficiario': '',
                'patologia_siniestro': '',
                'tipo_siniestro': '',
                'monto_siniestro': totalMontoBolivar,
                'estatus_siniestro': '',
                'fecha_desde': '',
                'tipo_moneda_siniestro': 'BOLÍVAR',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_individual_poliza': '',
                'nombre_agente_propio': '',
            }
            const objectTotalPrimaNetaDolar = {
                'nombre_aseguradora': '',
                'numero_poliza': '',
                'numero_siniestro': '',
                'ci_tomador_poliza': '',
                'nombre_tomador_poliza': '',
                'cedula_beneficiario': '',
                'nombre_completo_beneficiario': '',
                'patologia_siniestro': '',
                'tipo_siniestro': '',
                'monto_siniestro': totalMontoDolar,
                'estatus_siniestro': '',
                'fecha_desde': '',
                'tipo_moneda_siniestro': 'DÓLAR',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_individual_poliza': '',
                'nombre_agente_propio': '',
            }
            const objectTotalPrimaNetaEuro = {
                'nombre_aseguradora': '',
                'numero_poliza': '',
                'numero_siniestro': '',
                'ci_tomador_poliza': '',
                'nombre_tomador_poliza': '',
                'cedula_beneficiario': '',
                'nombre_completo_beneficiario': '',
                'patologia_siniestro': '',
                'tipo_siniestro': '',
                'monto_siniestro': totalMontoEuro,
                'estatus_siniestro': '',
                'fecha_desde': '',
                'tipo_moneda_siniestro': 'EUROS',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_individual_poliza': '',
                'nombre_agente_propio': '',
            }
            data.push(objectTotalPrimaNetaBolivar, objectTotalPrimaNetaDolar, objectTotalPrimaNetaEuro);
            data.forEach(item => {
                item.monto_siniestro = Math.round((item.monto_siniestro + Number.EPSILON) * 100) / 100;
                item.monto_siniestro = convertNumberToString(item.monto_siniestro);
                item.monto_siniestro = convertStringToCurrency(item.tipo_moneda_siniestro, item.monto_siniestro);
            });
            res.render('accidentRate', {
                data,
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('accidentRate', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/accident-rate',
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postPortfolioComposition: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            let {
                fecha_desde: fechaDesde,
                fecha_hasta: fechaHasta,
                nombre_aseguradora: nombreAseguradora,
                ramo_poliza: ramoPoliza,
                nombre_agente_propio: nombreAgentePropio, 
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                id_rif_asegurado: idRifAsegurado
            } = req.body;
            let hash = {};
            const filters = [];
            const resultsPolicies = await policyModel.getPolicies();
            const resultsCollectives = await collectiveModel.getCollectives();
            if (fechaDesde !== '') {
                fechaDesde = new Date(fechaDesde);
                fechaHasta = new Date(fechaHasta);
                filters.push(portfolioComposition => (portfolioComposition.fecha_desde.getTime() >= fechaDesde.getTime()) && (portfolioComposition.fecha_desde.getTime() <= fechaHasta.getTime()));
            }
            if (nombreAseguradora !== '') {
                filters.push(portfolioComposition => portfolioComposition.nombre_aseguradora === nombreAseguradora);
            }
            if (ramoPoliza !== '') {
                filters.push(portfolioComposition => portfolioComposition.tipo_individual_poliza === ramoPoliza);
            }
            if (nombreAgentePropio !== '') {
                filters.push(portfolioComposition => portfolioComposition.nombre_agente_propio === nombreAgentePropio);
            }
            if (idRifAsegurado !== '') {
                filters.push(portfolioComposition => portfolioComposition.cedula_rif_asegurado === idRifAsegurado && portfolioComposition.tipo_cedula_rif_asegurado === tipoIdRifAsegurado);
            }
            const arrayPolicies = await Promise.all(
                resultsPolicies.map(async (policy) => {
                    const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(policy.id_poliza);
                    const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(policy.id_poliza);
                    const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
                    const resultNaturalInsured = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
                    const resultLegalInsured = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
                    const countSumPremium = await policyModel.getSumPremiumCounter(policy.tipo_individual_poliza, policy.tipo_moneda_poliza);
                    if (resultLegalInsured.length === 0) {
                        if (resultPOA.length !== 0) {
                            const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                            return {
                                'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${policy.tipo_individual_poliza} INDIVIDUAL`,
                                'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                'tipo_moneda_poliza': policy.tipo_moneda_poliza,
                                'cantidad_poliza': countSumPremium[0].poliza_contador_tipo,
                                'prima_neta': countSumPremium[0].prima_total,
                                'fecha_desde': policy.fecha_desde_poliza
                            }
                        } else {
                            return {
                                'nombre_agente_propio': 'ATINA',
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${policy.tipo_individual_poliza} INDIVIDUAL`,
                                'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                'tipo_moneda_poliza': policy.tipo_moneda_poliza,
                                'cantidad_poliza': countSumPremium[0].poliza_contador_tipo,
                                'prima_neta': countSumPremium[0].prima_total,
                                'fecha_desde': policy.fecha_desde_poliza
                            }
                        }
                    } else {
                        if (resultPOA.length !== 0) {
                            const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                            return {
                                'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${policy.tipo_individual_poliza} INDIVIDUAL`,
                                'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                'tipo_moneda_poliza': policy.tipo_moneda_poliza,
                                'cantidad_poliza': countSumPremium[0].poliza_contador_tipo,
                                'prima_neta': countSumPremium[0].prima_total,
                                'fecha_desde': policy.fecha_desde_poliza
                            }
                        } else {
                            return {
                                'nombre_agente_propio': 'ATINA',
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${policy.tipo_individual_poliza} INDIVIDUAL`,
                                'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                'tipo_moneda_poliza': policy.tipo_moneda_poliza,
                                'cantidad_poliza': countSumPremium[0].poliza_contador_tipo,
                                'prima_neta': countSumPremium[0].prima_total,
                                'fecha_desde': policy.fecha_desde_poliza
                            }
                        }
                    }
                })
            );
            const arrayCollectives = await Promise.all(
                resultsCollectives.map(async (collective) => {
                    const resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(collective.id_colectivo);
                    const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(collective.id_colectivo);
                    const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
                    const resultNaturalInsured = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
                    const resultLegalInsured = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
                    const countSumPremium = await collectiveModel.getSumPremiumCounter(collective.tipo_colectivo, collective.tipo_moneda_colectivo);
                    if (resultLegalInsured.length === 0) {
                        if (resultCOA.length !== 0) {
                            const resultOwnAgent = await ownAgentModel.getOwnAgent(resultCOA[0].agente_propio_id);
                            return {
                                'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${collective.tipo_colectivo} COLECTIVO`,
                                'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                'tipo_moneda_poliza': collective.tipo_moneda_colectivo,
                                'cantidad_poliza': countSumPremium[0].colectivo_contador_tipo,
                                'prima_neta': countSumPremium[0].prima_total,
                                'fecha_desde': collective.fecha_desde_colectivo
                            }
                        } else {
                            return {
                                'nombre_agente_propio': 'ATINA',
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${collective.tipo_colectivo} COLECTIVO`,
                                'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                'tipo_moneda_poliza': collective.tipo_moneda_colectivo,
                                'cantidad_poliza': countSumPremium[0].colectivo_contador_tipo,
                                'prima_neta': countSumPremium[0].prima_total,
                                'fecha_desde': collective.fecha_desde_colectivo
                            }
                        }
                    } else {
                        if (resultCOA.length !== 0) {
                            const resultOwnAgent = await ownAgentModel.getOwnAgent(resultCOA[0].agente_propio_id);
                            return {
                                'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${collective.tipo_colectivo} COLECTIVO`,
                                'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                'tipo_moneda_poliza': collective.tipo_moneda_colectivo,
                                'cantidad_poliza': countSumPremium[0].colectivo_contador_tipo,
                                'prima_neta': countSumPremium[0].prima_total,
                                'fecha_desde': collective.fecha_desde_colectivo
                            }
                        } else {
                            return {
                                'nombre_agente_propio': 'ATINA',
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${collective.tipo_colectivo} COLECTIVO`,
                                'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                'tipo_moneda_poliza': collective.tipo_moneda_colectivo,
                                'cantidad_poliza': countSumPremium[0].colectivo_contador_tipo,
                                'prima_neta': countSumPremium[0].prima_total,
                                'fecha_desde': collective.fecha_desde_colectivo
                            }
                        }
                    }
                })
            );
            let data = arrayPolicies.concat(arrayCollectives);
            data = data.filter(data => ((hash[data.tipo_individual_poliza]) && (hash[data.tipo_moneda_poliza]) ? false : (hash[data.tipo_individual_poliza] = true) && ((hash[data.tipo_moneda_poliza] = true))));
            data = data.filter(commissionTransit => filters.every(filterPolicy => filterPolicy(commissionTransit)));
            const totalCantidadPoliza = data.map(item => item.cantidad_poliza).reduce((prev, curr) => prev + curr, 0);
            const totalMontoBolivar = data.filter(item => item.tipo_moneda_poliza === 'BOLÍVAR').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalMontoDolar = data.filter(item => item.tipo_moneda_poliza === 'DÓLAR').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalMontoEuro = data.filter(item => item.tipo_moneda_poliza === 'EUROS').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            let porcetanjePolizaTotal = (totalCantidadPoliza * 100) / totalCantidadPoliza;
            const objectTotalPrimaNetaBolivar = {
                'porcentaje_poliza': porcetanjePolizaTotal.toString(),
                'nombre_agente_propio': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'BOLÍVAR',
                'cantidad_poliza': '',
                'prima_neta': totalMontoBolivar,
                'fecha_desde': ''
            }
            const objectTotalPrimaNetaDolar = {
                'porcentaje_poliza': porcetanjePolizaTotal.toString(),
                'nombre_agente_propio': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'DÓLAR',
                'cantidad_poliza': '',
                'prima_neta': totalMontoDolar,
                'fecha_desde': ''
            }
            const objectTotalPrimaNetaEuro = {
                'porcentaje_poliza': porcetanjePolizaTotal.toString(),
                'nombre_agente_propio': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'EUROS',
                'cantidad_poliza': '',
                'prima_neta': totalMontoEuro,
                'fecha_desde': ''
            }
            data = data.map((item, i) => {
                let policyPercentage = (item.cantidad_poliza * 100) / totalCantidadPoliza;
                policyPercentage = policyPercentage.toFixed(2);
                const objectData = {
                    'porcentaje_poliza': policyPercentage
                }
                return Object.assign({}, objectData, data[i]);
            });
            data.push(objectTotalPrimaNetaBolivar, objectTotalPrimaNetaDolar, objectTotalPrimaNetaEuro);
            data.forEach(item => {
                item.porcentaje_poliza = `${item.porcentaje_poliza}%`;
                item.prima_neta = convertNumberToString(item.prima_neta);
                item.prima_neta = convertStringToCurrency(item.tipo_moneda_poliza , item.prima_neta);
            });
            res.render('portfolioComposition',{
                data,
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('portfolioComposition', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/portfolio-composition',
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postPersistence: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            let {
                fecha_desde: fechaDesde,
                fecha_hasta: fechaHasta,
                nombre_aseguradora: nombreAseguradora,
                ramo_poliza: ramoPoliza,
                nombre_agente_propio: nombreAgentePropio, 
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                id_rif_asegurado: idRifAsegurado
            } = req.body;
            const filters = [];
            const resultsPolicies = await policyModel.getPolicies();
            const resultsCollectives = await collectiveModel.getCollectives();
            if (fechaDesde !== '') {
                fechaDesde = new Date(fechaDesde);
                fechaHasta = new Date(fechaHasta);
                filters.push(persistence => (persistence.fecha_desde.getTime() >= fechaDesde.getTime()) && (persistence.fecha_desde.getTime() <= fechaHasta.getTime()));
            }
            if (nombreAseguradora !== '') {
                filters.push(persistence => persistence.nombre_aseguradora === nombreAseguradora);
            }
            if (ramoPoliza !== '') {
                filters.push(persistence => persistence.tipo_individual_poliza === ramoPoliza);
            }
            if (nombreAgentePropio !== '') {
                filters.push(persistence => persistence.nombre_agente_propio === nombreAgentePropio);
            }
            if (idRifAsegurado !== '') {
                filters.push(persistence => persistence.cedula_rif_asegurado === idRifAsegurado && persistence.tipo_cedula_rif_asegurado === tipoIdRifAsegurado);
            }
            const arrayPolicies = await Promise.all(
                resultsPolicies.map(async (policy) => {
                    const resultPOA = await policyOwnAgentModel.getPolicyOwnAgent(policy.id_poliza);
                    const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(policy.id_poliza);
                    const resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
                    const resultNaturalInsured = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
                    const resultLegalInsured = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
                    if (resultLegalInsured.length === 0) {
                        if (resultPOA.length !== 0) {
                            const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                            return {
                                'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${policy.tipo_individual_poliza} INDIVIDUAL`,
                                'nombre_tomador_poliza': policy.nombre_tomador_poliza,
                                'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                'tipo_moneda_poliza': policy.tipo_moneda_poliza,
                                'prima_neta': policy.prima_neta_poliza,
                                'tipo_poliza': 'INDIVIDUAL',
                                'fecha_desde': policy.fecha_desde_poliza
                            }
                        } else {
                            return {
                                'nombre_agente_propio': 'ATINA',
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${policy.tipo_individual_poliza} INDIVIDUAL`,
                                'nombre_tomador_poliza': policy.nombre_tomador_poliza,
                                'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                'tipo_moneda_poliza': policy.tipo_moneda_poliza,
                                'prima_neta': policy.prima_neta_poliza,
                                'tipo_poliza': 'INDIVIDUAL',
                                'fecha_desde': policy.fecha_desde_poliza
                            }
                        }
                    } else {
                        if (resultPOA.length !== 0) {
                            const resultOwnAgent = await ownAgentModel.getOwnAgent(resultPOA[0].agente_propio_id);
                            return {
                                'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${policy.tipo_individual_poliza} INDIVIDUAL`,
                                'nombre_tomador_poliza': policy.nombre_tomador_poliza,
                                'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                'tipo_moneda_poliza': policy.tipo_moneda_poliza,
                                'prima_neta': policy.prima_neta_poliza,
                                'tipo_poliza': 'INDIVIDUAL',
                                'fecha_desde': policy.fecha_desde_poliza
                            }
                        } else {
                            return {
                                'nombre_agente_propio': 'ATINA',
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${policy.tipo_individual_poliza} INDIVIDUAL`,
                                'nombre_tomador_poliza': policy.nombre_tomador_poliza,
                                'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                'tipo_moneda_poliza': policy.tipo_moneda_poliza,
                                'prima_neta': policy.prima_neta_poliza,
                                'tipo_poliza': 'INDIVIDUAL',
                                'fecha_desde': policy.fecha_desde_poliza
                            }
                        }
                    }
                })
            );
            const arrayCollectives = await Promise.all(
                resultsCollectives.map(async (collective) => {
                    const resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(collective.id_colectivo);
                    const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(collective.id_colectivo);
                    const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
                    const resultNaturalInsured = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
                    const resultLegalInsured = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
                    if (resultLegalInsured.length === 0) {
                        if (resultCOA.length !== 0) {
                            const resultOwnAgent = await ownAgentModel.getOwnAgent(resultCOA[0].agente_propio_id);
                            return {
                                'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${collective.tipo_colectivo} COLECTIVO`,
                                'nombre_tomador_poliza': collective.nombre_tomador_colectivo,
                                'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                'tipo_moneda_poliza': collective.tipo_moneda_colectivo,
                                'prima_neta': collective.prima_neta_colectivo,
                                'tipo_poliza': 'COLECTIVO',
                                'fecha_desde': collective.fecha_desde_colectivo
                            }
                        } else {
                            return {
                                'nombre_agente_propio': 'ATINA',
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${collective.tipo_colectivo} COLECTIVO`,
                                'nombre_tomador_poliza': collective.nombre_tomador_colectivo,
                                'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                                'tipo_moneda_poliza': collective.tipo_moneda_colectivo,
                                'prima_neta': collective.prima_neta_colectivo,
                                'tipo_poliza': 'COLECTIVO',
                                'fecha_desde': collective.fecha_desde_colectivo
                            }
                        }
                    } else {
                        if (resultCOA.length !== 0) {
                            const resultOwnAgent = await ownAgentModel.getOwnAgent(resultCOA[0].agente_propio_id);
                            return {
                                'nombre_agente_propio': `${resultOwnAgent[0].nombre_agente_propio} ${resultOwnAgent[0].apellido_agente_propio}`,
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${collective.tipo_colectivo} COLECTIVO`,
                                'nombre_tomador_poliza': collective.nombre_tomador_colectivo,
                                'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                'tipo_moneda_poliza': collective.tipo_moneda_colectivo,
                                'prima_neta': collective.prima_neta_colectivo,
                                'tipo_poliza': 'COLECTIVO',
                                'fecha_desde': collective.fecha_desde_colectivo
                            }
                        } else {
                            return {
                                'nombre_agente_propio': 'ATINA',
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'tipo_individual_poliza': `${collective.tipo_colectivo} COLECTIVO`,
                                'nombre_tomador_poliza': collective.nombre_tomador_colectivo,
                                'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                                'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                                'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                                'tipo_moneda_poliza': collective.tipo_moneda_colectivo,
                                'prima_neta': collective.prima_neta_colectivo,
                                'tipo_poliza': 'COLECTIVO',
                                'fecha_desde': collective.fecha_desde_colectivo
                            }
                        }
                    }
                })
            );
            let data = arrayPolicies.concat(arrayCollectives);
            data = data.filter(persistence => filters.every(filterPolicy => filterPolicy(persistence)));
            const totalMontoBolivar = data.filter(item => item.tipo_moneda_poliza === 'BOLÍVAR').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalMontoDolar = data.filter(item => item.tipo_moneda_poliza === 'DÓLAR').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const totalMontoEuro = data.filter(item => item.tipo_moneda_poliza === 'EUROS').map(item => item.prima_neta).reduce((prev, curr) => prev + curr, 0);
            const objectTotalPrimaNetaBolivar = {
                'nombre_agente_propio': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'BOLÍVAR',
                'prima_neta': totalMontoBolivar,
                'tipo_poliza': '',
                'fecha_desde': ''
            }
            const objectTotalPrimaNetaDolar = {
                'nombre_agente_propio': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'DÓLAR',
                'prima_neta': totalMontoDolar,
                'tipo_poliza': '',
                'fecha_desde': ''
            }
            const objectTotalPrimaNetaEuro = {
                'nombre_agente_propio': '',
                'nombre_aseguradora': '',
                'tipo_individual_poliza': '',
                'nombre_tomador_poliza': '',
                'nombre_completo_razon_social_asegurado': '',
                'tipo_cedula_rif_asegurado': '',
                'cedula_rif_asegurado': '',
                'tipo_moneda_poliza': 'EUROS',
                'prima_neta': totalMontoEuro,
                'tipo_poliza': '',
                'fecha_desde': ''
            }
            data.push(objectTotalPrimaNetaBolivar, objectTotalPrimaNetaDolar, objectTotalPrimaNetaEuro);
            data.forEach(item => {
                item.prima_neta = Math.round((item.prima_neta + Number.EPSILON) * 100) / 100;
                item.prima_neta = convertNumberToString(item.prima_neta);
                item.prima_neta = convertStringToCurrency(item.tipo_moneda_poliza , item.prima_neta);
            });
            res.render('persistence',{
                data,
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('persistence', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/persistence',
                insurers: resultsInsurers,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
/*                  PUT                  */
/*               DELETE                  */
}