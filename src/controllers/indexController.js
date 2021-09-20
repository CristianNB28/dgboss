const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const insurerModel = require('../models/insurer');
const ownAgentModel = require('../models/own_agent');

module.exports = {
/*                  GET                  */
    getIndex: async (req, res) => {
        let healthPolicyCounter = await policyModel.getHealthPolicyCounter();
        let autoPolicyCounter = await policyModel.getAutoPolicyCounter();
        let patrimonialPolicyCounter = await policyModel.getPatrimonialPolicyCounter();
        let resultPolicyInsuInsured = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultOwnAgents = await ownAgentModel.getOwnAgents();
        let totalPremium = await policyModel.getSummaryPolizaCousins();
        let totalCommission = await policyModel.getSumPolicyCommissions(); 
        let insurers = [];
        let ownAgents = [];
        let totalInsurancePremiums = [];
        totalPremium = totalPremium[0].primaTotal.toLocaleString();
        totalCommission = totalCommission[0].comisionTotal.toLocaleString();
        for (let index = 0; index < resultPolicyInsuInsured.length; index++) {
            let element = resultPolicyInsuInsured[index];
            let elementNext = resultPolicyInsuInsured[index + 1];
            if (elementNext === undefined) {
                break;
            }
            if (element.aseguradora_id !== elementNext.aseguradora_id) {
                let resultInsurer = await insurerModel.getInsurer(elementNext.aseguradora_id);
                let resultsPolicies = await policyInsurerInsuredModel.getPoliciesIds(elementNext.aseguradora_id);
                let sumInsurancePremiums = 0;
                for (let index = 0; index < resultsPolicies.length; index++) {
                    let elementPolicy = resultsPolicies[index];
                    let resultPolicy =  await policyModel.getPolicy(elementPolicy.poliza_id);
                    sumInsurancePremiums += resultPolicy[0].monto_prima;
                }
                totalInsurancePremiums.push(sumInsurancePremiums);
                insurers.push(resultInsurer[0].nombre_aseguradora);
            }
        }
        for (let index = 0; index < resultOwnAgents.length; index++) {
            const elementOwnAgent = resultOwnAgents[index];
            let fullNameOwnAgent = elementOwnAgent.nombre_agente_propio + ' ' + elementOwnAgent.apellido_agente_propio;  
            ownAgents.push(fullNameOwnAgent);
        }
        res.render('index', {
            healthPolicyCount: healthPolicyCounter[0],
            autoPolicyCount: autoPolicyCounter[0],
            patrimonialPolicyCount: patrimonialPolicyCounter[0],
            totalPremium: totalPremium,
            totalCommission: totalCommission,
            insurers: insurers,
            InsurersPremium: totalInsurancePremiums,
            ownAgents: ownAgents,
            name: req.session.name
        });
    },
    get404:  (req, res) => {
        res.status(404);
        res.render('404');
    }
}