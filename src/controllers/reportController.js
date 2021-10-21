const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const policyModel = require('../models/policy');
const ownAgentModel = require('../models/own_agent');
const executiveModel = require('../models/executive');
const receiptModel = require('../models/receipt');

module.exports = {
/*                  GET                  */
    getPremiumsCollected: async (req, res) => {
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsExecutives = await executiveModel.getExecutives(); 
        let resultPremiumCollection = [];
        for (let i = 0; i < resultsPII.length; i++) {
            let elementPII = resultsPII[i];
            let resultInsurer = await insurerModel.getInsurer(elementPII.aseguradora_id);
            let resultPolicy = await policyModel.getPolicy(elementPII.poliza_id);
            if (elementPII.asegurado_per_nat_id !== null) {
                let resultInsuredNatural = await insuredModel.getNaturalInsured(elementPII.asegurado_per_nat_id);
                let resultsOwnAgentNatural = await ownAgentModel.getOwnAgent(resultInsuredNatural[0].agente_propio_id);
                let premiumCollection = {
                    ownAgent: resultsOwnAgentNatural[0].nombre_agente_propio + ' ' + resultsOwnAgentNatural[0].apellido_agente_propio,
                    company: ' ',
                    executive: resultsExecutives[0].nombre_ejecutivo + ' ' + resultsExecutives[0].apellido_ejecutivo,
                    bouquetType: resultPolicy[0].tipo_individual_poliza,
                    insurer: resultInsurer[0].nombre_aseguradora,
                    premium: resultPolicy[0].prima_anual_poliza
                };
                resultPremiumCollection.push(premiumCollection);
            } else {
                let resultInsuredLegal = await insuredModel.getLegalInsured(elementPII.asegurado_per_jur_id);
                let resultsOwnAgentLegal = await ownAgentModel.getOwnAgent(resultInsuredLegal[0].agente_propio_id);
                let premiumCollection = {
                    ownAgent: resultsOwnAgentLegal[0].nombre_agente_propio + ' ' + resultsOwnAgentLegal[0].apellido_agente_propio,
                    company: resultInsuredLegal[0].razon_social_per_jur,
                    executive: resultsExecutives[0].nombre_ejecutivo + ' ' + resultsExecutives[0].apellido_ejecutivo,
                    bouquetType: resultPolicy[0].tipo_individual_poliza,
                    insurer: resultInsurer[0].nombre_aseguradora,
                    premium: resultPolicy[0].prima_anual_poliza
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
        let resultsExecutives = await executiveModel.getExecutives(); 
        let resultCommissionCollection = [];
        for (let i = 0; i < resultsPII.length; i++) {
            let elementPII = resultsPII[i];
            let resultInsurer = await insurerModel.getInsurer(elementPII.aseguradora_id);
            let resultPolicy = await policyModel.getPolicy(elementPII.poliza_id);
            let resultReceiptCommission = await receiptModel.getReceiptCommission(elementPII.poliza_id);
            if (elementPII.asegurado_per_nat_id !== null) {
                let resultInsuredNatural = await insuredModel.getNaturalInsured(elementPII.asegurado_per_nat_id);
                let resultsOwnAgentNatural = await ownAgentModel.getOwnAgent(resultInsuredNatural[0].agente_propio_id);
                let commissionCollection = {
                    ownAgent: resultsOwnAgentNatural[0].nombre_agente_propio + ' ' + resultsOwnAgentNatural[0].apellido_agente_propio,
                    company: ' ',
                    executive: resultsExecutives[0].nombre_ejecutivo + ' ' + resultsExecutives[0].apellido_ejecutivo,
                    bouquetType: resultPolicy[0].tipo_individual_poliza,
                    insurer: resultInsurer[0].nombre_aseguradora,
                    commission: resultReceiptCommission[0].monto_comision_recibo,
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
                    commission: resultReceiptCommission[0].monto_comision_recibo,
                };
                resultCommissionCollection.push(commissionCollection);
            }
        }
        res.render('commissionsCollected', {
            data: resultCommissionCollection,
            name: req.session.name
        });
    },
/*                 POST                  */
/*                  PUT                  */
/*               DELETE                  */
}