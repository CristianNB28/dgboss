const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const insurerModel = require('../models/insurer');
const ownAgentModel = require('../models/own_agent');
const receiptModel = require('../models/receipt');
const insuredModel = require('../models/insured');
const commissionModel = require('../models/commission');

module.exports = {
/*                  GET                  */
    getIndex: async (req, res) => {
        let healthPolicyCounter = await policyModel.getHealthPolicyCounter();
        let autoPolicyCounter = await policyModel.getAutoPolicyCounter();
        let patrimonialPolicyCounter = await policyModel.getPatrimonialPolicyCounter();
        let resultPolicyInsuInsured = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let totalPremium = await policyModel.getSummaryPolizaCousins();
        let totalCommission = await receiptModel.getSumReceiptCommissions(); 
        let insurers = [];
        let ownAgents = [];
        let totalInsurancePremiums = [];
        let totalCommissions = [];
        let totalCommissionsNatural = [];
        let totalCommissionsLegal = [];
        if ((totalPremium[0].primaTotal === null) && (totalCommission[0].comisionTotal === null)) {
            totalPremium[0].primaTotal = 0;
            totalCommission[0].comisionTotal = 0;
            totalPremium = totalPremium[0].primaTotal;
            totalCommission = totalCommission[0].comisionTotal;
        } else if (totalPremium[0].primaTotal === null) {
            totalPremium[0].primaTotal = 0;
            totalPremium = totalPremium[0].primaTotal;
        } else if (totalCommission[0].comisionTotal === null) {
            totalCommission[0].comisionTotal = 0;
            totalCommission = totalCommission[0].comisionTotal;
        } else {
            totalPremium = totalPremium[0].primaTotal.toLocaleString();
            totalCommission = totalCommission[0].comisionTotal.toLocaleString();
        }
        for (let i = 0; i < resultPolicyInsuInsured.length; i++) {
            let element = resultPolicyInsuInsured[i];
            let elementNext = resultPolicyInsuInsured[i+1];
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
                    sumInsurancePremiums += resultPolicy[0].prima_anual_poliza;
                }
                totalInsurancePremiums.push(sumInsurancePremiums);
                insurers.push(resultInsurer[0].nombre_aseguradora);
            }
        }
        const filteredInsurers = insurers.filter(function(element , pos){
            return insurers.indexOf(element) == pos;
        });
        const filteredTotalInsurancePremiums = totalInsurancePremiums.filter(function(element , pos){
            return totalInsurancePremiums.indexOf(element) == pos;
        });
        for (let i = 0; i < resultPolicyInsuInsured.length; i++) {
            const elementInsured = resultPolicyInsuInsured[i];
            if (elementInsured.asegurado_per_nat_id !== null) {
                let ownAgentNatural = await insuredModel.getNaturalInsured(elementInsured.asegurado_per_nat_id);
                let resultsPolicies = await policyInsurerInsuredModel.getPoliciesIdsNatural(elementInsured.asegurado_per_nat_id);
                let ownAgent = await ownAgentModel.getOwnAgent(ownAgentNatural[0].agente_propio_id);
                let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                let sumOwnAgentCommisions = 0;
                for (let index = 0; index < resultsPolicies.length; index++) {
                    let elementPolicy = resultsPolicies[index];
                    let commissionReceipt = await receiptModel.getReceiptCommission(elementPolicy.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicy.poliza_id);
                    sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                }
                ownAgents.push(fullNameOwnAgent);
                totalCommissionsNatural.push(sumOwnAgentCommisions.toFixed(2));
            } else {
                let ownAgentLegal = await insuredModel.getLegalInsured(elementInsured.asegurado_per_jur_id);
                let resultsPolicies = await policyInsurerInsuredModel.getPoliciesIdsLegal(elementInsured.asegurado_per_jur_id);
                let ownAgent = await ownAgentModel.getOwnAgent(ownAgentLegal[0].agente_propio_id);
                let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                let sumOwnAgentCommisions = 0;
                for (let index = 0; index < resultsPolicies.length; index++) {
                    let elementPolicy = resultsPolicies[index];
                    let commissionReceipt = await receiptModel.getReceiptCommission(elementPolicy.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicy.poliza_id);
                    sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                }
                ownAgents.push(fullNameOwnAgent);
                totalCommissionsLegal.push(sumOwnAgentCommisions.toFixed(2));
            }
        }
        const filteredTotalComissionsNatural = totalCommissionsNatural.filter(function(element , pos){
            return totalCommissionsNatural.indexOf(element) == pos;
        });
        const filteredTotalComissionsLegal = totalCommissionsLegal.filter(function(element , pos){
            return totalCommissionsLegal.indexOf(element) == pos;
        });
        if (filteredTotalComissionsNatural.length > filteredTotalComissionsLegal.length) {
            for (let i = 0; i < filteredTotalComissionsNatural.length; i++) {
                let elementComissionNatural = filteredTotalComissionsNatural[i];
                for (let j = i; j <= filteredTotalComissionsLegal.length; j++) {
                    let elementComissionLegal = filteredTotalComissionsLegal[j];
                    if (elementComissionLegal === undefined) {
                        elementComissionNatural = parseFloat(elementComissionNatural);
                        totalCommissions.push(elementComissionNatural);
                        break;
                    } else {
                        let resultComission = parseFloat(elementComissionNatural) + parseFloat(elementComissionLegal);
                        totalCommissions.push(resultComission.toFixed(2));
                        break;
                    }
                }
            }
        } else if (filteredTotalComissionsLegal.length > filteredTotalComissionsNatural.length) {
            for (let i = 0; i < filteredTotalComissionsLegal.length; i++) {
                let elementComissionLegal = filteredTotalComissionsLegal[i];
                for (let j = i; j <= filteredTotalComissionsNatural.length; j++) {
                    let elementComissionNatural = filteredTotalComissionsNatural[j];
                    if (elementComissionNatural === undefined) {
                        elementComissionLegal = parseFloat(elementComissionLegal);
                        totalCommissions.push(elementComissionLegal);
                        break;
                    } else {
                        let resultComission = parseFloat(elementComissionNatural) + parseFloat(elementComissionLegal);
                        totalCommissions.push(resultComission.toFixed(2));
                        break;
                    }
                }
            }
        } else if (filteredTotalComissionsNatural.length === filteredTotalComissionsLegal.length) {
            for (let i = 0; i < filteredTotalComissionsNatural.length; i++) {
                let elementComissionNatural = filteredTotalComissionsNatural[i];
                for (let j = i; j < filteredTotalComissionsLegal.length; j++) {
                    let elementComissionLegal = filteredTotalComissionsLegal[j];
                    let resultComission = parseFloat(elementComissionNatural) + parseFloat(elementComissionLegal);
                    totalCommissions.push(resultComission.toFixed(2));
                    break;
                }
            }
        }
        const filteredOwnAgents = ownAgents.filter(function(element , pos){
            return ownAgents.indexOf(element) == pos;
        });
        res.render('index', {
            healthPolicyCount: healthPolicyCounter[0],
            autoPolicyCount: autoPolicyCounter[0],
            patrimonialPolicyCount: patrimonialPolicyCounter[0],
            totalPremium: totalPremium,
            totalCommission: totalCommission,
            insurers: filteredInsurers,
            InsurersPremium: filteredTotalInsurancePremiums,
            ownAgents: filteredOwnAgents,
            ownAgentsComission: totalCommissions,
            name: req.session.name
        });
    },
    get404:  (req, res) => {
        res.status(404);
        res.render('404');
    }
}