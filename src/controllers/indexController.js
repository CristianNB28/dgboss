const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const insurerModel = require('../models/insurer');
const ownAgentModel = require('../models/own_agent');
const receiptModel = require('../models/receipt');
const insuredModel = require('../models/insured');
const commissionModel = require('../models/commission');
const collectiveModel = require('../models/collective');

module.exports = {
/*                  GET                  */
    getIndex: async (req, res) => {
        let healthPolicyCounter = await policyModel.getHealthPolicyCounter();
        let healthColectiveCounter = await collectiveModel.getHealthCollectiveCounter();
        let healthCounter = healthPolicyCounter[0].health + healthColectiveCounter[0].health;
        let autoPolicyCounter = await policyModel.getAutoPolicyCounter();
        let autoColectiveCounter = await collectiveModel.getAutoCollectiveCounter();
        let autoCounter = autoPolicyCounter[0].auto + autoColectiveCounter[0].auto;
        let patrimonialPolicyCounter = await policyModel.getPatrimonialPolicyCounter();
        let bailPolicyCounter = await policyModel.getBailPolicyCounter();
        let anotherBranchPolicyCounter = await policyModel.getAnotherBranchPolicyCounter();
        let funeralPolicyCounter = await policyModel.getFuneralPolicyCounter();
        let lifePolicyCounter = await policyModel.getLifePolicyCounter();
        let apPolicyCounter = await policyModel.getAPPolicyCounter();
        let travelPolicyCounter = await policyModel.getTravelPolicyCounter();
        let RiskDiverCollectiveCounter = await collectiveModel.getRiskDiverCollectiveCounter();
        let resultPolicyInsuInsured = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let totalPremiumPolicy = await policyModel.getSummaryPolizaCousins();
        let totalPremiumCollective = await collectiveModel.getSummaryCollectiveCousins();
        let totalCommission = await receiptModel.getSumReceiptCommissions(); 
        let insurers = [];
        let objectInsuredNatural = [];
        let objectInsuredLegal = [];
        let dates = [];
        let ownAgents = [];
        let datesOwnAgents = [];
        let totalInsurancePremiums = [];
        let totalCommissions = [];
        let filteredInsurers = [];
        let filteredTotalInsurancePremiums = [];
        let filteredDates = [];
        let totalPremium = 0;
        if ((totalPremiumPolicy[0].primaTotal !== null) && (totalPremiumCollective[0].primaTotal !== null)) {
            totalPremium = totalPremiumPolicy[0].primaTotal + totalPremiumCollective[0].primaTotal;
            totalPremium = totalPremium.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else if ((totalPremiumPolicy[0].primaTotal === null) && (totalPremiumCollective[0].primaTotal === null)) {
            totalPremium = 0;
        } else if (totalPremiumPolicy[0].primaTotal === null){
            totalPremium = totalPremiumCollective[0].primaTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else if (totalPremiumCollective[0].primaTotal === null) {
            totalPremium = totalPremiumPolicy[0].primaTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        }
        if (totalCommission[0].comisionTotal === null) {
            totalCommission[0].comisionTotal = 0;
            totalCommission = totalCommission[0].comisionTotal;
        } else {
            totalCommission = totalCommission[0].comisionTotal.toFixed(2).toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        }
        for (let i = 0; i < resultPolicyInsuInsured.length; i++) {
            let element = resultPolicyInsuInsured[i];
            let elementNext = resultPolicyInsuInsured[i+1];
            if ((elementNext === undefined) && (i === 0)) {
                let resultInsurer = await insurerModel.getInsurer(element.aseguradora_id);
                let resultsPolicies = await policyInsurerInsuredModel.getPoliciesIds(element.aseguradora_id);
                let sumInsurancePremiums = 0;
                for (let index = 0; index < resultsPolicies.length; index++) {
                    let elementPolicy = resultsPolicies[index];
                    let elementPolicyNext = resultsPolicies[index+1];
                    let resultPolicy =  await policyModel.getPolicy(elementPolicy.poliza_id);
                    sumInsurancePremiums += resultPolicy[0].prima_anual_poliza;
                    if (elementPolicyNext === undefined) {
                        if (index === 0) {
                            let fechaPolizaDesde = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
                            dates.push(fechaPolizaDesde);
                        }
                        break;
                    }
                    let resultPolicyNext =  await policyModel.getPolicy(elementPolicyNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        let fechaPolizaDesde = resultPolicyNext[0].fecha_desde_poliza.toISOString().substring(0, 10);
                        dates.push(fechaPolizaDesde);
                    }
                }
                sumInsurancePremiums = sumInsurancePremiums.toFixed(2);
                totalInsurancePremiums.push(sumInsurancePremiums);
                insurers.push(resultInsurer[0].nombre_aseguradora);
                break;
            } else if (elementNext === undefined) {
                break;
            } else if (i === 0) {
                let resultInsurer = await insurerModel.getInsurer(element.aseguradora_id);
                let resultsPolicies = await policyInsurerInsuredModel.getPoliciesIds(element.aseguradora_id);
                let sumInsurancePremiums = 0;
                let contDates = 0;
                for (let index = 0; index < resultsPolicies.length; index++) {
                    let elementPolicy = resultsPolicies[index];
                    let elementPolicyNext = resultsPolicies[index+1];
                    let resultPolicy =  await policyModel.getPolicy(elementPolicy.poliza_id);
                    sumInsurancePremiums += resultPolicy[0].prima_anual_poliza;
                    if (elementPolicyNext === undefined) {
                        if (index === 0) {
                            let fechaPolizaDesde = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
                            dates.push(fechaPolizaDesde);
                        }
                        break;
                    }
                    let resultPolicyNext =  await policyModel.getPolicy(elementPolicyNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        let fechaPolizaDesde = resultPolicyNext[0].fecha_desde_poliza.toISOString().substring(0, 10);
                        dates.push(fechaPolizaDesde);
                        contDates++;
                        if (contDates >= 2) {
                            dates.splice(dates.length-2,1);
                        }
                    } else if (resultPolicyNext[0].fecha_desde_poliza.getTime() === resultPolicy[0].fecha_desde_poliza.getTime()) {
                        let fechaPolizaDesde = resultPolicyNext[0].fecha_desde_poliza.toISOString().substring(0, 10);
                        dates.push(fechaPolizaDesde);
                        contDates++;
                        if (contDates >= 2) {
                            dates.splice(dates.length-2,1);
                        }
                    }
                }
                sumInsurancePremiums = sumInsurancePremiums.toFixed(2);
                totalInsurancePremiums.push(sumInsurancePremiums);
                insurers.push(resultInsurer[0].nombre_aseguradora);
            }
            if (element.aseguradora_id !== elementNext.aseguradora_id) {
                let resultInsurer = await insurerModel.getInsurer(elementNext.aseguradora_id);
                let resultsPolicies = await policyInsurerInsuredModel.getPoliciesIds(elementNext.aseguradora_id);
                let sumInsurancePremiums = 0;
                let contDates = 0;
                for (let index = 0; index < resultsPolicies.length; index++) {
                    let elementPolicy = resultsPolicies[index];
                    let elementPolicyNext = resultsPolicies[index+1];
                    let resultPolicy =  await policyModel.getPolicy(elementPolicy.poliza_id);
                    sumInsurancePremiums += resultPolicy[0].prima_anual_poliza;
                    if (elementPolicyNext === undefined) {
                        if (index === 0) {
                            let fechaPolizaDesde = resultPolicy[0].fecha_desde_poliza.toISOString().substring(0, 10);
                            dates.push(fechaPolizaDesde);
                        }
                        break;
                    }
                    let resultPolicyNext =  await policyModel.getPolicy(elementPolicyNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        let fechaPolizaDesde = resultPolicyNext[0].fecha_desde_poliza.toISOString().substring(0, 10);
                        dates.push(fechaPolizaDesde);
                        contDates++;
                        if (contDates >= 2) {
                            dates.splice(dates.length-2,1);
                        }
                    }
                }
                sumInsurancePremiums = sumInsurancePremiums.toFixed(2);
                totalInsurancePremiums.push(sumInsurancePremiums);
                insurers.push(resultInsurer[0].nombre_aseguradora);
            }
        }
        for(i=0; i < insurers.length; i++){
            if(filteredInsurers.indexOf(insurers[i]) === -1) {
                filteredInsurers.push(insurers[i]);
            } else {
                filteredInsurers.splice(filteredInsurers.indexOf(insurers[i]),1);
                filteredInsurers.push(insurers[i]);
            }
        }
        for(i=0; i < totalInsurancePremiums.length; i++){
            if(filteredTotalInsurancePremiums.indexOf(totalInsurancePremiums[i]) === -1) {
                filteredTotalInsurancePremiums.push(totalInsurancePremiums[i]);
            } else {
                filteredTotalInsurancePremiums.splice(filteredTotalInsurancePremiums.indexOf(totalInsurancePremiums[i]),1);
                filteredTotalInsurancePremiums.push(totalInsurancePremiums[i]);
            }
        }
        for(i=0; i < dates.length; i++){
            if(filteredDates.indexOf(dates[i]) === -1) {
                filteredDates.push(dates[i]);
            } else {
                filteredDates.splice(filteredDates.indexOf(dates[i]),1);
                filteredDates.push(dates[i]);
            }
        }
        let maxDate = 0;
        let minDate = 0;
        if (dates.length !== 0) {
            let arrayDates = filteredDates.map((fechaActual) => new Date(fechaActual));
            maxDate = new Date(Math.max.apply(null,arrayDates));
            maxDate = maxDate.toISOString().substring(0, 10);
            minDate = new Date(Math.min.apply(null,arrayDates));
            minDate = minDate.toISOString().substring(0, 10);
        } else {
            maxDate = new Date();
            maxDate = maxDate.toISOString().substring(0, 10);
            minDate = new Date();
            minDate = minDate.toISOString().substring(0, 10);
        }
        let resultNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultLegalInsured = await insuredModel.getLegalInsureds();
        for (let i = 0; i < resultNaturalInsured.length; i++) {
            let elementNaturalInsured = resultNaturalInsured[i];
            let elementNaturalInsuredNext = resultNaturalInsured[i+1];
            let sumOwnAgentCommisions = 0;
            if ((elementNaturalInsuredNext === undefined) && (i === 0)) {
                let resultPolicyId = await policyInsurerInsuredModel.getPoliciesIdsNatural(elementNaturalInsured.id_asegurado_per_nat);
                let ownAgent = await ownAgentModel.getOwnAgent(elementNaturalInsured.agente_propio_id);
                let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                let dateMax = 0;
                for (let j = 0; j < resultPolicyId.length; j++) {
                    let elementPolicyId = resultPolicyId[j];
                    let elementPolicyIdNext = resultPolicyId[j+1];
                    let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                    let commissionReceipt = await receiptModel.getReceiptCommissionPolicy(elementPolicyId.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicyId.poliza_id);
                    if (commissionReceipt.length !== 0) {
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                    }
                    if (elementPolicyIdNext === undefined) {
                        if (j === 0) {
                            dateMax = resultPolicy[0].fecha_desde_poliza;
                        }
                        break;
                    }
                    let resultPolicyNext = await policyModel.getPolicy(elementPolicyIdNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza.getTime() === resultPolicy[0].fecha_desde_poliza.getTime()) {
                        dateMax = resultPolicyNext[0].fecha_desde_poliza;
                    } else if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        dateMax = resultPolicyNext[0].fecha_desde_poliza;
                    } 
                }
                if (resultPolicyId.length !== 0) {
                    let insuredNatural = {
                        ownAgent: fullNameOwnAgent,
                        commission: sumOwnAgentCommisions.toFixed(2),
                        date: dateMax
                    };
                    objectInsuredNatural.push(insuredNatural);
                }
            } else if (elementNaturalInsuredNext === undefined) {
                break;
            } else if ((i === 0) && (elementNaturalInsured.agente_propio_id !== elementNaturalInsuredNext.agente_propio_id)) {
                let resultPolicyId = await policyInsurerInsuredModel.getPoliciesIdsNatural(elementNaturalInsured.id_asegurado_per_nat);
                let ownAgent = await ownAgentModel.getOwnAgent(elementNaturalInsured.agente_propio_id);
                let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                let ownAgentNext = await ownAgentModel.getOwnAgent(elementNaturalInsuredNext.agente_propio_id);
                let fullNameOwnAgentNext = ownAgentNext[0].nombre_agente_propio + ' ' + ownAgentNext[0].apellido_agente_propio;
                let dateMax = 0;
                let dateMaxNext = 0;
                for (let j = 0; j < resultPolicyId.length; j++) {
                    let elementPolicyId = resultPolicyId[j];
                    let elementPolicyIdNext = resultPolicyId[j+1];
                    let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                    let commissionReceipt = await receiptModel.getReceiptCommissionPolicy(elementPolicyId.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicyId.poliza_id);
                    if (commissionReceipt.length !== 0) {
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                    }
                    if (elementPolicyIdNext === undefined) {
                        if (j === 0) {
                            dateMax = resultPolicy[0].fecha_desde_poliza;
                        }
                        break;
                    }
                    let resultPolicyNext = await policyModel.getPolicy(elementPolicyIdNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        dateMax = resultPolicyNext[0].fecha_desde_poliza;
                    }
                }
                if (resultPolicyId.length !== 0) {
                    let insuredNatural = {
                        ownAgent: fullNameOwnAgent,
                        commission: sumOwnAgentCommisions.toFixed(2),
                        date: dateMax
                    }
                    objectInsuredNatural.push(insuredNatural);
                }
                sumOwnAgentCommisions = 0;
                let resultPolicyIdNext = await policyInsurerInsuredModel.getPoliciesIdsNatural(elementNaturalInsuredNext.id_asegurado_per_nat);
                for (let k = 0; k < resultPolicyIdNext.length; k++) {
                    let elementPolicyId = resultPolicyIdNext[k];
                    let elementPolicyIdNext = resultPolicyIdNext[k+1];
                    let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                    let commissionReceipt = await receiptModel.getReceiptCommissionPolicy(elementPolicyId.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicyId.poliza_id);
                    if (commissionReceipt.length !== 0) {
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                    }
                    if (elementPolicyIdNext === undefined) {
                        if (k === 0) {
                            dateMaxNext = resultPolicy[0].fecha_desde_poliza;
                        }
                        break;
                    }
                    let resultPolicyNext = await policyModel.getPolicy(elementPolicyIdNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        dateMaxNext = resultPolicyNext[0].fecha_desde_poliza;
                    }
                }
                if (resultPolicyIdNext.length !== 0) {
                    let insuredNaturalNext = {
                        ownAgent: fullNameOwnAgentNext,
                        commission: sumOwnAgentCommisions.toFixed(2),
                        date: dateMaxNext,
                    };
                    objectInsuredNatural.push(insuredNaturalNext);
                }
            } else if (elementNaturalInsured.agente_propio_id === elementNaturalInsuredNext.agente_propio_id) {
                let resultPolicyId = await policyInsurerInsuredModel.getPoliciesIdsNatural(elementNaturalInsured.id_asegurado_per_nat);
                let ownAgent = await ownAgentModel.getOwnAgent(elementNaturalInsured.agente_propio_id);
                let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                let dateMax = 0;
                let dateMaxNext = 0;
                let date = 0;
                for (let j = 0; j < resultPolicyId.length; j++) {
                    let elementPolicyId = resultPolicyId[j];
                    let elementPolicyIdNext = resultPolicyId[j+1];
                    let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                    let commissionReceipt = await receiptModel.getReceiptCommissionPolicy(elementPolicyId.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicyId.poliza_id);
                    if (commissionReceipt.length !== 0) {
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                    }
                    if (elementPolicyIdNext === undefined) {
                        if (j === 0) {
                            dateMax = resultPolicy[0].fecha_desde_poliza;
                        }
                        break;
                    }
                    let resultPolicyNext = await policyModel.getPolicy(elementPolicyIdNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        dateMax = resultPolicyNext[0].fecha_desde_poliza;
                    }
                }
                let resultPolicyIdNext = await policyInsurerInsuredModel.getPoliciesIdsNatural(elementNaturalInsuredNext.id_asegurado_per_nat);
                for (let k = 0; k < resultPolicyIdNext.length; k++) {
                    let elementPolicyId = resultPolicyIdNext[k];
                    let elementPolicyIdNext = resultPolicyIdNext[k+1];
                    let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                    let commissionReceipt = await receiptModel.getReceiptCommissionPolicy(elementPolicyId.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicyId.poliza_id);
                    if (commissionReceipt.length !== 0) {
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                    }
                    if (elementPolicyIdNext === undefined) {
                        if (k === 0) {
                            dateMaxNext = resultPolicy[0].fecha_desde_poliza;
                        }
                        break;
                    }
                    let resultPolicyNext = await policyModel.getPolicy(elementPolicyIdNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        dateMaxNext = resultPolicyNext[0].fecha_desde_poliza;
                    }
                }
                if (dateMaxNext > dateMax) {
                    date = dateMaxNext;
                } else if (dateMax > dateMaxNext) {
                    date = dateMax;
                } else if (dateMax === dateMaxNext) {
                    date = dateMax;
                }
                if ((resultPolicyId.length !== 0) || (resultPolicyIdNext.length !== 0)) {
                    let insuredNatural = {
                        ownAgent: fullNameOwnAgent,
                        commission: sumOwnAgentCommisions.toFixed(2),
                        date: date
                    };
                    objectInsuredNatural.push(insuredNatural);
                }
            } else if (elementNaturalInsured.agente_propio_id !== elementNaturalInsuredNext.agente_propio_id) {
                let resultPolicyId = await policyInsurerInsuredModel.getPoliciesIdsNatural(elementNaturalInsured.id_asegurado_per_nat);
                let ownAgent = await ownAgentModel.getOwnAgent(elementNaturalInsured.agente_propio_id);
                let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                let ownAgentNext = await ownAgentModel.getOwnAgent(elementNaturalInsuredNext.agente_propio_id);
                let fullNameOwnAgentNext = ownAgentNext[0].nombre_agente_propio + ' ' + ownAgentNext[0].apellido_agente_propio;
                let dateMax = 0;
                let dateMaxNext = 0;
                for (let j = 0; j < resultPolicyId.length; j++) {
                    let elementPolicyId = resultPolicyId[j];
                    let elementPolicyIdNext = resultPolicyId[j+1];
                    let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                    let commissionReceipt = await receiptModel.getReceiptCommissionPolicy(elementPolicyId.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicyId.poliza_id);
                    if (commissionReceipt.length !== 0) {
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                    }
                    if (elementPolicyIdNext === undefined) {
                        if (j === 0) {
                            dateMax = resultPolicy[0].fecha_desde_poliza;
                        }
                        break;
                    }
                    let resultPolicyNext = await policyModel.getPolicy(elementPolicyIdNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        dateMax = resultPolicyNext[0].fecha_desde_poliza;
                    }
                }
                if (resultPolicyId.length !== 0) {
                    let insuredNatural = {
                        ownAgent: fullNameOwnAgent,
                        commission: sumOwnAgentCommisions.toFixed(2),
                        date: dateMax
                    }
                    objectInsuredNatural.push(insuredNatural);
                }
                sumOwnAgentCommisions = 0;
                let resultPolicyIdNext = await policyInsurerInsuredModel.getPoliciesIdsNatural(elementNaturalInsuredNext.id_asegurado_per_nat);
                for (let k = 0; k < resultPolicyIdNext.length; k++) {
                    let elementPolicyId = resultPolicyIdNext[k];
                    let elementPolicyIdNext = resultPolicyIdNext[k+1];
                    let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                    let commissionReceipt = await receiptModel.getReceiptCommissionPolicy(elementPolicyId.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicyId.poliza_id);
                    if (commissionReceipt.length !== 0) {
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                    }
                    if (elementPolicyIdNext === undefined) {
                        if (k === 0) {
                            dateMaxNext = resultPolicy[0].fecha_desde_poliza;
                        }
                        break;
                    }
                    let resultPolicyNext = await policyModel.getPolicy(elementPolicyIdNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        dateMaxNext = resultPolicyNext[0].fecha_desde_poliza;
                    }
                }
                if (resultPolicyIdNext.length !== 0) {
                    insuredNaturalNext = {
                        ownAgent: fullNameOwnAgentNext,
                        commission: sumOwnAgentCommisions.toFixed(2),
                        date: dateMaxNext,
                    };
                    objectInsuredNatural.push(insuredNaturalNext);
                }
            }
        }
        for (let i = 0; i < resultLegalInsured.length; i++) {
            let elementLegalInsured = resultLegalInsured[i];
            let elementLegalInsuredNext = resultLegalInsured[i+1];
            let sumOwnAgentCommisions = 0;
            if ((elementLegalInsuredNext === undefined) && (i === 0)) {
                let resultPolicyId = await policyInsurerInsuredModel.getPoliciesIdsLegal(elementLegalInsured.id_asegurado_per_jur);
                let ownAgent = await ownAgentModel.getOwnAgent(elementLegalInsured.agente_propio_id);
                let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                let dateMax = 0;
                for (let j = 0; j < resultPolicyId.length; j++) {
                    let elementPolicyId = resultPolicyId[j];
                    let elementPolicyIdNext = resultPolicyId[j+1];
                    let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                    let commissionReceipt = await receiptModel.getReceiptCommissionPolicy(elementPolicyId.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicyId.poliza_id);
                    if (commissionReceipt.length !== 0) {
                        if (commissionReceipt.length !== 0) {
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                    }
                    }
                    if (elementPolicyIdNext === undefined) {
                        if (j === 0) {
                            dateMax = resultPolicy[0].fecha_desde_poliza;
                        }
                        break;
                    }
                    let resultPolicyNext = await policyModel.getPolicy(elementPolicyIdNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        dateMax = resultPolicyNext[0].fecha_desde_poliza;
                    } else if (resultPolicyNext[0].fecha_desde_poliza.getTime() === resultPolicy[0].fecha_desde_poliza.getTime()) {
                        dateMax = resultPolicyNext[0].fecha_desde_poliza;
                    }
                }
                if (resultPolicyId.length !== 0) {
                    let insuredLegal = {
                        ownAgent: fullNameOwnAgent,
                        commission: sumOwnAgentCommisions.toFixed(2),
                        date: dateMax
                    };
                    objectInsuredLegal.push(insuredLegal);
                }
            } else if (elementLegalInsuredNext === undefined) {
                break;
            } else if ((i === 0) && (elementLegalInsured.agente_propio_id !== elementLegalInsuredNext.agente_propio_id)) {
                let resultPolicyId = await policyInsurerInsuredModel.getPoliciesIdsLegal(elementLegalInsured.id_asegurado_per_jur);
                let ownAgent = await ownAgentModel.getOwnAgent(elementLegalInsured.agente_propio_id);
                let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                let ownAgentNext = await ownAgentModel.getOwnAgent(elementLegalInsuredNext.agente_propio_id);
                let fullNameOwnAgentNext = ownAgentNext[0].nombre_agente_propio + ' ' + ownAgentNext[0].apellido_agente_propio;
                let dateMax = 0;
                let dateMaxNext = 0;
                for (let j = 0; j < resultPolicyId.length; j++) {
                    let elementPolicyId = resultPolicyId[j];
                    let elementPolicyIdNext = resultPolicyId[j+1];
                    let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                    let commissionReceipt = await receiptModel.getReceiptCommissionPolicy(elementPolicyId.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicyId.poliza_id);
                    if (commissionReceipt.length !== 0) {
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                    }
                    if (elementPolicyIdNext === undefined) {
                        if (j === 0) {
                            dateMax = resultPolicy[0].fecha_desde_poliza;
                        }
                        break;
                    }
                    let resultPolicyNext = await policyModel.getPolicy(elementPolicyIdNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        dateMax = resultPolicyNext[0].fecha_desde_poliza;
                    }
                }
                if (resultPolicyId.length !== 0) {
                    let insuredLegal = {
                        ownAgent: fullNameOwnAgent,
                        commission: sumOwnAgentCommisions.toFixed(2),
                        date: dateMax
                    };
                    objectInsuredLegal.push(insuredLegal);
                }
                sumOwnAgentCommisions = 0;
                let resultPolicyIdNext = await policyInsurerInsuredModel.getPoliciesIdsLegal(elementLegalInsuredNext.id_asegurado_per_jur);
                for (let k = 0; k < resultPolicyIdNext.length; k++) {
                    let elementPolicyId = resultPolicyIdNext[k];
                    let elementPolicyIdNext = resultPolicyIdNext[k+1];
                    let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                    let commissionReceipt = await receiptModel.getReceiptCommissionPolicy(elementPolicyId.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicyId.poliza_id);
                    if (commissionReceipt.length !== 0) {
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                    }
                    if (elementPolicyIdNext === undefined) {
                        if (k === 0) {
                            dateMaxNext = resultPolicy[0].fecha_desde_poliza;
                        }
                        break;
                    }
                    let resultPolicyNext = await policyModel.getPolicy(elementPolicyIdNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        dateMaxNext = resultPolicyNext[0].fecha_desde_poliza;
                    }
                }
                if (resultPolicyIdNext.length !== 0) {
                    let insuredLegalNext = {
                        ownAgent: fullNameOwnAgentNext,
                        commission: sumOwnAgentCommisions.toFixed(2),
                        date: dateMaxNext
                    };
                    objectInsuredLegal.push(insuredLegalNext);
                }
            } else if (elementLegalInsured.agente_propio_id === elementLegalInsuredNext.agente_propio_id) {
                let resultPolicyId = await policyInsurerInsuredModel.getPoliciesIdsLegal(elementLegalInsured.id_asegurado_per_jur);
                let ownAgent = await ownAgentModel.getOwnAgent(elementLegalInsured.agente_propio_id);
                let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                let dateMax = 0;
                let dateMaxNext = 0;
                let date = 0;
                for (let j = 0; j < resultPolicyId.length; j++) {
                    let elementPolicyId = resultPolicyId[j];
                    let elementPolicyIdNext = resultPolicyId[j+1];
                    let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                    let commissionReceipt = await receiptModel.getReceiptCommissionPolicy(elementPolicyId.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicyId.poliza_id);
                    if (commissionReceipt.length !== 0) {
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                    }
                    if (elementPolicyIdNext === undefined) {
                        if (j === 0) {
                            dateMax = resultPolicy[0].fecha_desde_poliza;
                        }
                        break;
                    }
                    let resultPolicyNext = await policyModel.getPolicy(elementPolicyIdNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        dateMax = resultPolicyNext[0].fecha_desde_poliza;
                    }
                }
                let resultPolicyIdNext = await policyInsurerInsuredModel.getPoliciesIdsLegal(elementLegalInsuredNext.id_asegurado_per_jur);
                for (let k = 0; k < resultPolicyIdNext.length; k++) {
                    let elementPolicyId = resultPolicyIdNext[k];
                    let elementPolicyIdNext = resultPolicyIdNext[k+1];
                    let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                    let commissionReceipt = await receiptModel.getReceiptCommissionPolicy(elementPolicyId.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicyId.poliza_id);
                    if (commissionReceipt.length !== 0) {
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                    }
                    if (elementPolicyIdNext === undefined) {
                        if (k === 0) {
                            dateMaxNext = resultPolicy[0].fecha_desde_poliza;
                        }
                        break;
                    }
                    let resultPolicyNext = await policyModel.getPolicy(elementPolicyIdNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        dateMaxNext = resultPolicyNext[0].fecha_desde_poliza;
                    }
                }
                if (dateMaxNext > dateMax) {
                    date = dateMaxNext;
                } else if (dateMax > dateMaxNext) {
                    date = dateMax;
                } else if (dateMax === dateMaxNext) {
                    date = dateMax;
                }
                if ((resultPolicyId.length !== 0) || (resultPolicyIdNext.length !== 0)) {
                    let insuredLegal = {
                        ownAgent: fullNameOwnAgent,
                        commission: sumOwnAgentCommisions.toFixed(2),
                        date: date
                    };
                    objectInsuredLegal.push(insuredLegal);
                }
            } else if (elementLegalInsured.agente_propio_id !== elementLegalInsuredNext.agente_propio_id) {
                let resultPolicyId = await policyInsurerInsuredModel.getPoliciesIdsLegal(elementLegalInsured.id_asegurado_per_jur);
                let ownAgent = await ownAgentModel.getOwnAgent(elementLegalInsured.agente_propio_id);
                let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                let ownAgentNext = await ownAgentModel.getOwnAgent(elementLegalInsuredNext.agente_propio_id);
                let fullNameOwnAgentNext = ownAgentNext[0].nombre_agente_propio + ' ' + ownAgentNext[0].apellido_agente_propio;
                let dateMax = 0;
                let dateMaxNext = 0;
                for (let j = 0; j < resultPolicyId.length; j++) {
                    let elementPolicyId = resultPolicyId[j];
                    let elementPolicyIdNext = resultPolicyId[j+1];
                    let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                    let commissionReceipt = await receiptModel.getReceiptCommissionPolicy(elementPolicyId.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicyId.poliza_id);
                    if (commissionReceipt.length !== 0) {
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                    }
                    if (elementPolicyIdNext === undefined) {
                        if (j === 0) {
                            dateMax = resultPolicy[0].fecha_desde_poliza;
                        }
                        break;
                    }
                    let resultPolicyNext = await policyModel.getPolicy(elementPolicyIdNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        dateMax = resultPolicyNext[0].fecha_desde_poliza;
                    }
                }
                if (resultPolicyId.length !== 0) {
                    let insuredLegal = {
                        ownAgent: fullNameOwnAgent,
                        commission: sumOwnAgentCommisions.toFixed(2),
                        date: dateMax
                    };
                    objectInsuredLegal.push(insuredLegal);
                }
                sumOwnAgentCommisions = 0;
                let resultPolicyIdNext = await policyInsurerInsuredModel.getPoliciesIdsLegal(elementLegalInsuredNext.id_asegurado_per_jur);
                for (let k = 0; k < resultPolicyIdNext.length; k++) {
                    let elementPolicyId = resultPolicyIdNext[k];
                    let elementPolicyIdNext = resultPolicyIdNext[k+1];
                    let resultPolicy = await policyModel.getPolicy(elementPolicyId.poliza_id);
                    let commissionReceipt = await receiptModel.getReceiptCommissionPolicy(elementPolicyId.poliza_id);
                    let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicyId.poliza_id);
                    if (commissionReceipt.length !== 0) {
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                    }
                    if (elementPolicyIdNext === undefined) {
                        if (k === 0) {
                            dateMaxNext = resultPolicy[0].fecha_desde_poliza;
                        }
                        break;
                    }
                    let resultPolicyNext = await policyModel.getPolicy(elementPolicyIdNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde_poliza > resultPolicy[0].fecha_desde_poliza) {
                        dateMaxNext = resultPolicyNext[0].fecha_desde_poliza;
                    }
                }
                if (resultPolicyIdNext.length !== 0) {
                    let insuredLegalNext = {
                        ownAgent: fullNameOwnAgentNext,
                        commission: sumOwnAgentCommisions.toFixed(2),
                        date: dateMaxNext
                    };
                    objectInsuredLegal.push(insuredLegalNext);
                }
            }
        }
        if (objectInsuredNatural.length > objectInsuredLegal.length) {
            if (objectInsuredLegal.length === 0) {
                for (let i = 0; i < objectInsuredNatural.length; i++) {
                    let elementInsuredNatural = objectInsuredNatural[i];
                    resultComission = parseFloat(elementInsuredNatural.commission);
                    totalCommissions.push(resultComission.toFixed(2));
                    ownAgents.push(elementInsuredNatural.ownAgent);
                    datesOwnAgents.push(elementInsuredNatural.date.toISOString().substring(0, 10));
                }
            }
            for (let i = 0; i < objectInsuredLegal.length; i++) {
                let elementInsuredLegal = objectInsuredLegal[i];
                let counter = 1;
                for (let j = 0; j < objectInsuredNatural.length; j++) {
                    let elementInsuredNatural = objectInsuredNatural[j];
                    let resultComission = 0;
                    if (elementInsuredNatural.ownAgent === elementInsuredLegal.ownAgent) {
                        elementInsuredNaturalNext = objectInsuredNatural[j+1];
                        if (elementInsuredNaturalNext === undefined) {
                            resultComission = parseFloat(elementInsuredNatural.commission) + parseFloat(elementInsuredLegal.commission);
                            totalCommissions.push(resultComission.toFixed(2));
                            ownAgents.push(elementInsuredNatural.ownAgent);
                            if (elementInsuredNatural.date > elementInsuredLegal.date) {
                                datesOwnAgents.push(elementInsuredNatural.date.toISOString().substring(0, 10));
                            } else {
                                datesOwnAgents.push(elementInsuredLegal.date.toISOString().substring(0, 10));
                            }
                        } else if (elementInsuredNatural.ownAgent !== elementInsuredNaturalNext.ownAgent) {
                            resultComission = parseFloat(elementInsuredNatural.commission) + parseFloat(elementInsuredLegal.commission);
                            totalCommissions.push(resultComission.toFixed(2));
                            ownAgents.push(elementInsuredNatural.ownAgent);
                            if (elementInsuredNatural.date > elementInsuredLegal.date) {
                                datesOwnAgents.push(elementInsuredNatural.date.toISOString().substring(0, 10));
                            } else {
                                datesOwnAgents.push(elementInsuredLegal.date.toISOString().substring(0, 10));
                            }
                        } else if (elementInsuredNatural.ownAgent === elementInsuredNaturalNext.ownAgent) {
                            let resultComissionNatural = parseFloat(elementInsuredNatural.commission) + parseFloat(elementInsuredNaturalNext.commission);
                            resultComission = resultComissionNatural + parseFloat(elementInsuredLegal.commission);
                            ownAgents.push(elementInsuredNatural.ownAgent);
                            if (elementInsuredNatural.date > elementInsuredLegal.date) {
                                datesOwnAgents.push(elementInsuredNatural.date.toISOString().substring(0, 10));
                            } else {
                                datesOwnAgents.push(elementInsuredLegal.date.toISOString().substring(0, 10));
                            }
                        }
                    }                     
                    else if (elementInsuredLegal.ownAgent !== elementInsuredNatural.ownAgent) {
                        totalCommissions.push(elementInsuredNatural.commission);
                        ownAgents.push(elementInsuredNatural.ownAgent);
                        if (elementInsuredNatural.date > elementInsuredLegal.date) {
                            datesOwnAgents.push(elementInsuredNatural.date.toISOString().substring(0, 10));
                        } else {
                            datesOwnAgents.push(elementInsuredLegal.date.toISOString().substring(0, 10));
                        }
                    }
                    counter++;
                    if (counter >= 2) {
                        for (let i = 0; i < ownAgents.length; i++) {
                            let elementOwnAgent = ownAgents[i];
                            let elementOwnAgentNext = ownAgents[i+1];
                            if (elementOwnAgentNext === undefined) {
                                break;
                            } else if (elementOwnAgent === elementOwnAgentNext) {
                                ownAgents.splice(i, 1);
                                totalCommissions.splice(i+1, 1);
                                for (let k = i; k < datesOwnAgents.length; k++) {
                                    let elementDatesOwnAgents = datesOwnAgents[k];
                                    let elementDatesOwnAgentsNext = datesOwnAgents[k+1];
                                    if (elementDatesOwnAgentsNext === undefined) {
                                        break;
                                    }
                                    elementDatesOwnAgents = new Date(elementDatesOwnAgents);
                                    elementDatesOwnAgentsNext =  new Date(elementDatesOwnAgentsNext);
                                    if (elementDatesOwnAgents > elementDatesOwnAgentsNext) {
                                        datesOwnAgents.splice(i, 1);
                                        datesOwnAgents.splice(i, 1, elementDatesOwnAgents.toISOString().substring(0, 10));
                                    } else {
                                        datesOwnAgents.splice(i, 1);
                                        datesOwnAgents.splice(i, 1, elementDatesOwnAgentsNext.toISOString().substring(0, 10));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if (objectInsuredLegal.length > objectInsuredNatural.length) {
            if (objectInsuredNatural.length === 0) {
                for (let i = 0; i < objectInsuredLegal.length; i++) {
                    let elementInsuredLegal = objectInsuredLegal[i];
                    resultComission = parseFloat(elementInsuredLegal.commission);
                    totalCommissions.push(resultComission.toFixed(2));
                    ownAgents.push(elementInsuredLegal.ownAgent);
                    datesOwnAgents.push(elementInsuredLegal.date.toISOString().substring(0, 10));
                }
            }
            for (let i = 0; i < objectInsuredNatural.length; i++) {
                let elementInsuredNatural = objectInsuredNatural[i];
                let counter = 1;
                for (let j = 0; j < objectInsuredLegal.length; j++) {
                    let elementInsuredLegal = objectInsuredLegal[j];
                    let resultComission = 0;
                    if (elementInsuredLegal.ownAgent === elementInsuredNatural.ownAgent) {
                        elementInsuredLegalNext = objectInsuredLegal[j+1];
                        if (elementInsuredLegalNext === undefined) {
                            resultComission = parseFloat(elementInsuredLegal.commission) + parseFloat(elementInsuredLegal.commission);
                            totalCommissions.push(resultComission.toFixed(2));
                            ownAgents.push(elementInsuredLegal.ownAgent);
                            if (elementInsuredNatural.date > elementInsuredLegal.date) {
                                datesOwnAgents.push(elementInsuredNatural.date.toISOString().substring(0, 10));
                            } else {
                                datesOwnAgents.push(elementInsuredLegal.date.toISOString().substring(0, 10));
                            }
                        } else if (elementInsuredLegal.ownAgent !== elementInsuredLegalNext.ownAgent) {
                            resultComission = parseFloat(elementInsuredNatural.commission) + parseFloat(elementInsuredLegal.commission);
                            totalCommissions.push(resultComission.toFixed(2));
                            ownAgents.push(elementInsuredLegal.ownAgent);
                            if (elementInsuredNatural.date > elementInsuredLegal.date) {
                                datesOwnAgents.push(elementInsuredNatural.date.toISOString().substring(0, 10));
                            } else {
                                datesOwnAgents.push(elementInsuredLegal.date.toISOString().substring(0, 10));
                            }
                        } else if (elementInsuredLegal.ownAgent === elementInsuredLegalNext.ownAgent) {
                            let resultComissionNatural = parseFloat(elementInsuredLegal.commission) + parseFloat(elementInsuredLegalNext.commission);
                            resultComission = resultComissionNatural + parseFloat(elementInsuredLegal.commission);
                            totalCommissions.push(resultComission.toFixed(2));
                            ownAgents.push(elementInsuredLegal.ownAgent);
                            if (elementInsuredNatural.date > elementInsuredLegal.date) {
                                datesOwnAgents.push(elementInsuredNatural.date.toISOString().substring(0, 10));
                            } else {
                                datesOwnAgents.push(elementInsuredLegal.date.toISOString().substring(0, 10));
                            }
                        }
                    } else if (elementInsuredLegal.ownAgent !== elementInsuredNatural.ownAgent){
                        totalCommissions.push(elementInsuredLegal.commission);
                        ownAgents.push(elementInsuredLegal.ownAgent);
                        datesOwnAgents.push(elementInsuredLegal.date.toISOString().substring(0, 10));
                    }
                    counter++;
                    if (counter >= 2) {
                        for (let i = 0; i < ownAgents.length; i++) {
                            let elementOwnAgent = ownAgents[i];
                            let elementOwnAgentNext = ownAgents[i+1];
                            if (elementOwnAgentNext === undefined) {
                                break;
                            } else if (elementOwnAgent === elementOwnAgentNext) {
                                ownAgents.splice(i, 1);
                                totalCommissions.splice(i+1, 1);
                                for (let k = i; k < datesOwnAgents.length; k++) {
                                    let elementDatesOwnAgents = datesOwnAgents[k];
                                    let elementDatesOwnAgentsNext = datesOwnAgents[k+1];
                                    if (elementDatesOwnAgentsNext === undefined) {
                                        break;
                                    }
                                    elementDatesOwnAgents = new Date(elementDatesOwnAgents);
                                    elementDatesOwnAgentsNext =  new Date(elementDatesOwnAgentsNext);
                                    if (elementDatesOwnAgents > elementDatesOwnAgentsNext) {
                                        datesOwnAgents.splice(i, 1);
                                        datesOwnAgents.splice(i, 1, elementDatesOwnAgents.toISOString().substring(0, 10));
                                    } else {
                                        datesOwnAgents.splice(i, 1);
                                        datesOwnAgents.splice(i, 1, elementDatesOwnAgentsNext.toISOString().substring(0, 10));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if (objectInsuredNatural.length === objectInsuredLegal.length) {
            for (let i = 0; i < objectInsuredNatural.length; i++) {
                let elementInsuredNatural = objectInsuredNatural[i];
                let equalCounter = 1;
                for (let j = i; j < objectInsuredLegal.length; j++) {
                    let elementInsuredLegal = objectInsuredLegal[j];
                    if (elementInsuredLegal.ownAgent === elementInsuredNatural.ownAgent) {
                        let resultComission = parseFloat(elementInsuredNatural.commission) + parseFloat(elementInsuredLegal.commission);
                        totalCommissions.push(resultComission.toFixed(2));
                        ownAgents.push(elementInsuredLegal.ownAgent);
                        if (elementInsuredLegal.date > elementInsuredNatural.date) {
                            datesOwnAgents.push(elementInsuredLegal.date.toISOString().substring(0, 10));
                        } else {
                            datesOwnAgents.push(elementInsuredNatural.date.toISOString().substring(0, 10));
                        }
                        equalCounter++;
                        if (equalCounter >= 2) {
                            for (let i = 0; i < ownAgents.length; i++) {
                                let elementOwnAgent = ownAgents[i];
                                let elementOwnAgentNext = ownAgents[i+1];
                                if (elementOwnAgentNext === undefined) {
                                    break;
                                } else if (elementOwnAgent === elementOwnAgentNext) {
                                    ownAgents.splice(i, 1);
                                    for (let j = i; j < totalCommissions.length; j++) {
                                        let elementTotalCommissions = totalCommissions[j];
                                        let elementTotalCommissionsNext = totalCommissions[j+1];
                                        if (elementTotalCommissionsNext === undefined) {
                                            break;
                                        }
                                        let resultTotalCommissions = parseFloat(elementTotalCommissions) + parseFloat(elementTotalCommissionsNext);
                                        totalCommissions.splice(i+1, 1);
                                        totalCommissions.splice(i, 1, resultTotalCommissions);
                                    }
                                    for (let k = i; k < datesOwnAgents.length; k++) {
                                        let elementDatesOwnAgents = datesOwnAgents[k];
                                        let elementDatesOwnAgentsNext = datesOwnAgents[k+1];
                                        if (elementDatesOwnAgentsNext === undefined) {
                                            break;
                                        }
                                        elementDatesOwnAgents = new Date(elementDatesOwnAgents);
                                        elementDatesOwnAgentsNext =  new Date(elementDatesOwnAgentsNext);
                                        if (elementDatesOwnAgents > elementDatesOwnAgentsNext) {
                                            datesOwnAgents.splice(i+1, 1);
                                            datesOwnAgents.splice(i, 1, elementDatesOwnAgents.toISOString().substring(0, 10));
                                        } else {
                                            datesOwnAgents.splice(i+1, 1);
                                            datesOwnAgents.splice(i, 1, elementDatesOwnAgentsNext.toISOString().substring(0, 10));
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    } else if (elementInsuredLegal.ownAgent !== elementInsuredNatural.ownAgent){
                        totalCommissions.push(elementInsuredLegal.commission);
                        ownAgents.push(elementInsuredLegal.ownAgent);
                        totalCommissions.push(elementInsuredNatural.commission);
                        ownAgents.push(elementInsuredNatural.ownAgent);
                        if (elementInsuredLegal.date > elementInsuredNatural.date) {
                            datesOwnAgents.push(elementInsuredNatural.date.toISOString().substring(0, 10));
                            datesOwnAgents.push(elementInsuredLegal.date.toISOString().substring(0, 10));
                        } else {
                            datesOwnAgents.push(elementInsuredLegal.date.toISOString().substring(0, 10));
                            datesOwnAgents.push(elementInsuredNatural.date.toISOString().substring(0, 10));
                        }
                        break;
                    }
                }
            }
        }
        let maxDateOwnAgent = 0;
        let minDateOwnAgent = 0;
        if (datesOwnAgents.length !== 0) {
            let arrayDatesOwnAgent = datesOwnAgents.map((fechaActual) => new Date(fechaActual));
            maxDateOwnAgent = new Date(Math.max.apply(null,arrayDatesOwnAgent));
            maxDateOwnAgent = maxDateOwnAgent.toISOString().substring(0, 10);
            minDateOwnAgent = new Date(Math.min.apply(null,arrayDatesOwnAgent));
            minDateOwnAgent = minDateOwnAgent.toISOString().substring(0, 10);
        } else {
            maxDateOwnAgent = new Date();
            maxDateOwnAgent = maxDateOwnAgent.toISOString().substring(0, 10);
            minDateOwnAgent = new Date();
            minDateOwnAgent = minDateOwnAgent.toISOString().substring(0, 10);
        }
        res.render('index', {
            healthPolicyCount: healthCounter,
            autoPolicyCount: autoCounter,
            patrimonialPolicyCount: patrimonialPolicyCounter[0],
            bailPolicyCount: bailPolicyCounter[0],
            anotherBranchPolicyCount: anotherBranchPolicyCounter[0],
            funeralPolicyCount: funeralPolicyCounter[0],
            lifePolicyCount: lifePolicyCounter[0],
            apPolicyCount: apPolicyCounter[0],
            travelPolicyCount: travelPolicyCounter[0],
            RiskDiverCollectiveCount: RiskDiverCollectiveCounter[0],
            totalPremium: totalPremium,
            totalCommission: totalCommission,
            insurers: filteredInsurers,
            InsurersPremium: filteredTotalInsurancePremiums,
            dates: filteredDates,
            maxDate: maxDate,
            minDate: minDate,
            maxDateOwnAgent: maxDateOwnAgent,
            minDateOwnAgent: minDateOwnAgent,
            ownAgents: ownAgents,
            ownAgentsComission: totalCommissions,
            datesOwnAgents: datesOwnAgents,
            name: req.session.name
        });
    },
    get404:  (req, res) => {
        res.status(404);
        res.render('404');
    }
}