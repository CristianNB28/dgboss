const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const policyModel = require('../models/policy');
const ownAgentModel = require('../models/own_agent');
const executiveModel = require('../models/executive');
const receiptModel = require('../models/receipt');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const commissionModel = require('../models/commission');
const verficationFactorModel = require('../models/verification_factor');

module.exports = {
/*                  GET                  */
    getPremiumsCollected: async (req, res) => {
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds(); 
        let resultPremiumCollection = [];
        for (let i = 0; i < resultsPII.length; i++) {
            let elementPII = resultsPII[i];
            let resultInsurer = await insurerModel.getInsurer(elementPII.aseguradora_id);
            let resultPolicy = await policyModel.getPolicy(elementPII.poliza_id);
            let primaAnualPoliza = new Intl.NumberFormat('de-DE').format(resultPolicy[0].prima_anual_poliza);
            if (elementPII.asegurado_per_nat_id !== null) {
                let resultInsuredNatural = await insuredModel.getNaturalInsured(elementPII.asegurado_per_nat_id);
                let resultsOwnAgentNatural = await ownAgentModel.getOwnAgent(resultInsuredNatural[0].agente_propio_id);
                let premiumCollection = {
                    ownAgent: resultsOwnAgentNatural[0].nombre_agente_propio + ' ' + resultsOwnAgentNatural[0].apellido_agente_propio,
                    company: ' ',
                    bouquetType: resultPolicy[0].tipo_individual_poliza,
                    insurer: resultInsurer[0].nombre_aseguradora,
                    dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    premium: primaAnualPoliza
                };
                resultPremiumCollection.push(premiumCollection);
            } else {
                let resultInsuredLegal = await insuredModel.getLegalInsured(elementPII.asegurado_per_jur_id);
                let resultsOwnAgentLegal = await ownAgentModel.getOwnAgent(resultInsuredLegal[0].agente_propio_id);
                let premiumCollection = {
                    ownAgent: resultsOwnAgentLegal[0].nombre_agente_propio + ' ' + resultsOwnAgentLegal[0].apellido_agente_propio,
                    company: resultInsuredLegal[0].razon_social_per_jur,
                    bouquetType: resultPolicy[0].tipo_individual_poliza,
                    insurer: resultInsurer[0].nombre_aseguradora,
                    dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    premium: primaAnualPoliza
                };
                resultPremiumCollection.push(premiumCollection);
            }
        }
        for (let i = 0; i < resultsCII.length; i++) {
            let elementCII = resultsCII[i];
            let resultInsurer = await insurerModel.getInsurer(elementCII.aseguradora_id);
            let resultCollective = await collectiveModel.getCollective(elementCII.colectivo_id);
            let primaAnualColectivo = new Intl.NumberFormat('de-DE').format(resultCollective[0].prima_anual_colectivo);
            if (elementCII.asegurado_per_nat_id !== null) {
                let resultInsuredNatural = await insuredModel.getNaturalInsured(elementCII.asegurado_per_nat_id);
                let resultsOwnAgentNatural = await ownAgentModel.getOwnAgent(resultInsuredNatural[0].agente_propio_id);
                let premiumCollection = {
                    ownAgent: resultsOwnAgentNatural[0].nombre_agente_propio + ' ' + resultsOwnAgentNatural[0].apellido_agente_propio,
                    company: ' ',
                    bouquetType: resultCollective[0].tipo_colectivo,
                    insurer: resultInsurer[0].nombre_aseguradora,
                    dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    premium: primaAnualColectivo
                };
                resultPremiumCollection.push(premiumCollection);
            } else {
                let resultInsuredLegal = await insuredModel.getLegalInsured(elementCII.asegurado_per_jur_id);
                let resultsOwnAgentLegal = await ownAgentModel.getOwnAgent(resultInsuredLegal[0].agente_propio_id);
                let premiumCollection = {
                    ownAgent: resultsOwnAgentLegal[0].nombre_agente_propio + ' ' + resultsOwnAgentLegal[0].apellido_agente_propio,
                    company: resultInsuredLegal[0].razon_social_per_jur,
                    bouquetType: resultCollective[0].tipo_colectivo,
                    insurer: resultInsurer[0].nombre_aseguradora,
                    dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    premium: primaAnualColectivo
                };
                resultPremiumCollection.push(premiumCollection);
            }
        }
        res.render('premiumsCollected',{
            data: resultPremiumCollection,
            name: req.session.name 
        });
    },
    getCommissionsCollected: async (req, res) => {
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultsExecutives = await executiveModel.getExecutives(); 
        let resultCommissionCollection = [];
        for (let i = 0; i < resultsPII.length; i++) {
            let elementPII = resultsPII[i];
            let resultInsurer = await insurerModel.getInsurer(elementPII.aseguradora_id);
            let resultPolicy = await policyModel.getPolicy(elementPII.poliza_id);
            let resultReceiptCommission = await receiptModel.getReceiptCommissionPolicy(elementPII.poliza_id);
            let reciboComisionPoliza = new Intl.NumberFormat('de-DE').format(resultReceiptCommission[0].monto_comision_recibo);
            if (elementPII.asegurado_per_nat_id !== null) {
                let resultInsuredNatural = await insuredModel.getNaturalInsured(elementPII.asegurado_per_nat_id);
                let resultsOwnAgentNatural = await ownAgentModel.getOwnAgent(resultInsuredNatural[0].agente_propio_id);
                let commissionCollection = {
                    ownAgent: resultsOwnAgentNatural[0].nombre_agente_propio + ' ' + resultsOwnAgentNatural[0].apellido_agente_propio,
                    company: ' ',
                    executive: resultsExecutives[0].nombre_ejecutivo + ' ' + resultsExecutives[0].apellido_ejecutivo,
                    bouquetType: resultPolicy[0].tipo_individual_poliza,
                    insurer: resultInsurer[0].nombre_aseguradora,
                    dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    commission: reciboComisionPoliza
                };
                resultCommissionCollection.push(commissionCollection);
            } else {
                let resultInsuredLegal = await insuredModel.getLegalInsured(elementPII.asegurado_per_jur_id);
                let resultsOwnAgentLegal = await ownAgentModel.getOwnAgent(resultInsuredLegal[0].agente_propio_id);
                let commissionCollection = {
                    ownAgent: resultsOwnAgentLegal[0].nombre_agente_propio + ' ' + resultsOwnAgentLegal[0].apellido_agente_propio,
                    company: resultInsuredLegal[0].razon_social_per_jur,
                    executive: resultsExecutives[0].nombre_ejecutivo + ' ' + resultsExecutives[0].apellido_ejecutivo,
                    bouquetType: resultPolicy[0].tipo_individual_poliza,
                    insurer: resultInsurer[0].nombre_aseguradora,
                    dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    commission: reciboComisionPoliza
                };
                resultCommissionCollection.push(commissionCollection);
            }
        }
        for (let i = 0; i < resultsCII.length; i++) {
            let elementCII = resultsCII[i];
            let resultInsurer = await insurerModel.getInsurer(elementCII.aseguradora_id);
            let resultCollective = await collectiveModel.getCollective(elementCII.colectivo_id);
            let resultReceiptCommission = await receiptModel.getReceiptCommissionCollective(elementCII.colectivo_id);
            let reciboComisionColectivo = new Intl.NumberFormat('de-DE').format(resultReceiptCommission[0].monto_comision_recibo);
            if (elementCII.asegurado_per_nat_id !== null) {
                let resultInsuredNatural = await insuredModel.getNaturalInsured(elementCII.asegurado_per_nat_id);
                let resultsOwnAgentNatural = await ownAgentModel.getOwnAgent(resultInsuredNatural[0].agente_propio_id);
                let commissionCollection = {
                    ownAgent: resultsOwnAgentNatural[0].nombre_agente_propio + ' ' + resultsOwnAgentNatural[0].apellido_agente_propio,
                    company: ' ',
                    executive: resultsExecutives[0].nombre_ejecutivo + ' ' + resultsExecutives[0].apellido_ejecutivo,
                    bouquetType: resultCollective[0].tipo_colectivo,
                    insurer: resultInsurer[0].nombre_aseguradora,
                    dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    commission: reciboComisionColectivo
                };
                resultCommissionCollection.push(commissionCollection);
            } else {
                let resultInsuredLegal = await insuredModel.getLegalInsured(elementCII.asegurado_per_jur_id);
                let resultsOwnAgentLegal = await ownAgentModel.getOwnAgent(resultInsuredLegal[0].agente_propio_id);
                let commissionCollection = {
                    ownAgent: resultsOwnAgentLegal[0].nombre_agente_propio + ' ' + resultsOwnAgentLegal[0].apellido_agente_propio,
                    company: resultInsuredLegal[0].razon_social_per_jur,
                    executive: resultsExecutives[0].nombre_ejecutivo + ' ' + resultsExecutives[0].apellido_ejecutivo,
                    bouquetType: resultCollective[0].tipo_colectivo,
                    insurer: resultInsurer[0].nombre_aseguradora,
                    dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                    commission: reciboComisionColectivo,
                };
                resultCommissionCollection.push(commissionCollection);
            }
        }
        res.render('commissionsCollected', {
            data: resultCommissionCollection,
            name: req.session.name
        });
    },
    getPolicyClaims: async (req, res) => {
        let resultNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultLegalInsured = await insuredModel.getLegalInsureds();
        let resultPolicyClaims = [];
        for (let i = 0; i < resultNaturalInsured.length; i++) {
            let elementNaturalInsured = resultNaturalInsured[i];
            let resultPolicyId = await policyInsurerInsuredModel.getPoliciesIdsNatural(elementNaturalInsured.id_asegurado_per_nat);
            let resultCollectiveId = await collectiveInsurerInsuredModel.getCollectivesIdsNatural(elementNaturalInsured.id_asegurado_per_nat);
            let totalPremium = 0;
            let naturalInsured = {};
            for (let j = 0; j < resultPolicyId.length; j++) {
                let elementPolicyId = resultPolicyId[j];
                let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                totalPremium += resultPolicy[0].prima_anual_poliza;
            }
            for (let k = 0; k < resultCollectiveId.length; k++) {
                let elementCollectiveId = resultCollectiveId[k];
                let resultCollective = await collectiveModel.getCollective(elementCollectiveId.colectivo_id);
                totalPremium += resultCollective[0].prima_anual_colectivo;
            }
            naturalInsured = {
                insured: elementNaturalInsured.cedula_asegurado_per_nat,
                totalPremium: totalPremium 
            }
            resultPolicyClaims.push(naturalInsured);
        }
        for (let i = 0; i < resultLegalInsured.length; i++) {
            let elementLegalInsured = resultLegalInsured[i];
            let resultPolicyId = await policyInsurerInsuredModel.getPoliciesIdsLegal(elementLegalInsured.id_asegurado_per_jur);
            let resultCollectiveId = await collectiveInsurerInsuredModel.getCollectivesIdsLegal(elementLegalInsured.id_asegurado_per_jur);
            let totalPremium = 0;
            for (let j = 0; j < resultPolicyId.length; j++) {
                let elementPolicyId = resultPolicyId[j];
                let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                totalPremium += resultPolicy[0].prima_anual_poliza;
            }
            for (let k = 0; k < resultCollectiveId.length; k++) {
                let elementCollectiveId = resultCollectiveId[k];
                let resultCollective = await collectiveModel.getCollective(elementCollectiveId.colectivo_id);
                totalPremium += resultCollective[0].prima_anual_colectivo;
            }
            let legalInsured = {
                insured: elementLegalInsured.rif_asegurado_per_jur,
                totalPremium: totalPremium
            };
            resultPolicyClaims.push(legalInsured);
        }
        res.render('policyClaims', {
            resultPolicyClaims: resultPolicyClaims,
            name: req.session.name
        });
    },
    getGlobalLossRatio: async (req, res) => {
        let resultPolicy = await policyModel.getPolicies();
        let resultCollective = await collectiveModel.getCollectives();
        let totalPremiumPolicy = 0;
        let totalPremiumCollective = 0;
        let totalPremium = 0;
        for (const itemPolicy of resultPolicy) {
            totalPremiumPolicy += itemPolicy.prima_anual_poliza;
        }
        for (const itemCollective of resultCollective) {
            totalPremiumCollective += itemCollective.prima_anual_colectivo; 
        }
        totalPremium = totalPremiumPolicy + totalPremiumCollective; 
        res.render('globalLossRatio', {
            totalPremium: totalPremium,
            name: req.session.name
        });
    },
    getPendingPayments: async (req, res) => {
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultPendingPayment = [];
        for (let i = 0; i < resultsPII.length; i++) {
            let elementPII = resultsPII[i];
            let resultInsurer = await insurerModel.getInsurer(elementPII.aseguradora_id);
            let resultPolicy = await policyModel.getPolicy(elementPII.poliza_id);
            let resultCommission = await commissionModel.getComissionPolicy(elementPII.poliza_id);
            let resultVerificationFactor = await verficationFactorModel.getVerificationFactor(resultCommission[0].id_comision);
            if (resultVerificationFactor[0].estatus_comision_factor_verificacion === 'PENDIENTE') {
                let primaPorcentajeVerificacion = new Intl.NumberFormat('de-DE').format(resultVerificationFactor[0].porcentaje_prima_factor_verificacion);
                if (elementPII.asegurado_per_nat_id !== null) {
                    let resultInsuredNatural = await insuredModel.getNaturalInsured(elementPII.asegurado_per_nat_id);
                    let resultsOwnAgentNatural = await ownAgentModel.getOwnAgent(resultInsuredNatural[0].agente_propio_id);
                    let pendingPayment = {
                        ownAgent: resultsOwnAgentNatural[0].nombre_agente_propio + ' ' + resultsOwnAgentNatural[0].apellido_agente_propio,
                        executive: resultsExecutives[0].nombre_ejecutivo + ' ' + resultsExecutives[0].apellido_ejecutivo,
                        taker: resultPolicy[0].nombre_tomador_poliza,
                        bouquetType: resultPolicy[0].tipo_individual_poliza,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        premium: primaPorcentajeVerificacion
                    };
                    resultPendingPayment.push(pendingPayment);
                } else {
                    let resultInsuredLegal = await insuredModel.getLegalInsured(elementPII.asegurado_per_jur_id);
                    let resultsOwnAgentLegal = await ownAgentModel.getOwnAgent(resultInsuredLegal[0].agente_propio_id);
                    let pendingPayment = {
                        ownAgent: resultsOwnAgentLegal[0].nombre_agente_propio + ' ' + resultsOwnAgentLegal[0].apellido_agente_propio,
                        executive: resultsExecutives[0].nombre_ejecutivo + ' ' + resultsExecutives[0].apellido_ejecutivo,
                        taker: resultPolicy[0].nombre_tomador_poliza,
                        bouquetType: resultPolicy[0].tipo_individual_poliza,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        premium: primaPorcentajeVerificacion
                    };
                    resultPendingPayment.push(pendingPayment);
                }
            }
        }
        for (let i = 0; i < resultsCII.length; i++) {
            let elementCII = resultsCII[i];
            let resultInsurer = await insurerModel.getInsurer(elementCII.aseguradora_id);
            let resultCollective = await collectiveModel.getCollective(elementCII.colectivo_id);
            let resultCommission = await commissionModel.getComissionCollective(elementCII.colectivo_id);
            let resultVerificationFactor = await verficationFactorModel.getVerificationFactor(resultCommission[0].id_comision);
            if (resultVerificationFactor[0].estatus_comision_factor_verificacion === 'PENDIENTE') {
                let primaPorcentajeVerificacion = new Intl.NumberFormat('de-DE').format(resultVerificationFactor[0].porcentaje_prima_factor_verificacion);
                if (elementCII.asegurado_per_nat_id !== null) {
                    let resultInsuredNatural = await insuredModel.getNaturalInsured(elementCII.asegurado_per_nat_id);
                    let resultsOwnAgentNatural = await ownAgentModel.getOwnAgent(resultInsuredNatural[0].agente_propio_id);
                    let pendingPayment = {
                        ownAgent: resultsOwnAgentNatural[0].nombre_agente_propio + ' ' + resultsOwnAgentNatural[0].apellido_agente_propio,
                        executive: resultsExecutives[0].nombre_ejecutivo + ' ' + resultsExecutives[0].apellido_ejecutivo,
                        taker: resultCollective[0].nombre_tomador_colectivo,
                        bouquetType: resultCollective[0].tipo_colectivo,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        premium: primaPorcentajeVerificacion
                    };
                    resultPendingPayment.push(pendingPayment);
                } else {
                    let resultInsuredLegal = await insuredModel.getLegalInsured(elementCII.asegurado_per_jur_id);
                    let resultsOwnAgentLegal = await ownAgentModel.getOwnAgent(resultInsuredLegal[0].agente_propio_id);
                    let pendingPayment = {
                        ownAgent: resultsOwnAgentLegal[0].nombre_agente_propio + ' ' + resultsOwnAgentLegal[0].apellido_agente_propio,
                        executive: resultsExecutives[0].nombre_ejecutivo + ' ' + resultsExecutives[0].apellido_ejecutivo,
                        taker: resultCollective[0].nombre_tomador_colectivo,
                        bouquetType: resultCollective[0].tipo_colectivo,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        premium: primaPorcentajeVerificacion
                    };
                    resultPendingPayment.push(pendingPayment);
                }
            }
        }
        res.render('pendingPayments',{
            data: resultPendingPayment,
            name: req.session.name 
        });
    }
/*                 POST                  */
/*                  PUT                  */
/*               DELETE                  */
}