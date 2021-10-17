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
        let bailPolicyCounter = await policyModel.getBailPolicyCounter();
        let anotherBranchPolicyCounter = await policyModel.getAnotherBranchPolicyCounter();
        let funeralPolicyCounter = await policyModel.getFuneralPolicyCounter();
        let lifePolicyCounter = await policyModel.getLifePolicyCounter();
        let apPolicyCounter = await policyModel.getAPPolicyCounter();
        let travelPolicyCounter = await policyModel.getTravelPolicyCounter();
        let resultPolicyInsuInsured = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let totalPremium = await policyModel.getSummaryPolizaCousins();
        let totalCommission = await receiptModel.getSumReceiptCommissions(); 
        let insurers = [];
        let ownAgents = [];
        let dates = [];
        let datesOwnAgentsNatural = [];
        let datesOwnAgentsLegal = [];
        let datesOwnAgents = [];
        let totalInsurancePremiums = [];
        let totalCommissions = [];
        let totalCommissionsNatural = [];
        let totalCommissionsLegal = [];
        let filteredInsurers = [];
        let filteredTotalInsurancePremiums = [];
        let filteredDates = [];
        let filteredTotalComissionsNatural = [];
        let filteredTotalComissionsLegal = [];
        let filteredOwnAgents = [];
        let filteredDatesOwnAgents = [];
        let contComissionsLegal = 0;
        let contComissionsNatural = 0;
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
                            let fechaPolizaDesde = resultPolicy[0].fecha_desde.toISOString().substring(0, 10);
                            dates.push(fechaPolizaDesde);
                        }
                        break;
                    }
                    let resultPolicyNext =  await policyModel.getPolicy(elementPolicyNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde > resultPolicy[0].fecha_desde) {
                        let fechaPolizaDesde = resultPolicyNext[0].fecha_desde.toISOString().substring(0, 10);
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
                            let fechaPolizaDesde = resultPolicy[0].fecha_desde.toISOString().substring(0, 10);
                            dates.push(fechaPolizaDesde);
                        }
                        break;
                    }
                    let resultPolicyNext =  await policyModel.getPolicy(elementPolicyNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde > resultPolicy[0].fecha_desde) {
                        let fechaPolizaDesde = resultPolicyNext[0].fecha_desde.toISOString().substring(0, 10);
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
                            let fechaPolizaDesde = resultPolicy[0].fecha_desde.toISOString().substring(0, 10);
                            dates.push(fechaPolizaDesde);
                        }
                        break;
                    }
                    let resultPolicyNext =  await policyModel.getPolicy(elementPolicyNext.poliza_id);
                    if (resultPolicyNext[0].fecha_desde > resultPolicy[0].fecha_desde) {
                        let fechaPolizaDesde = resultPolicyNext[0].fecha_desde.toISOString().substring(0, 10);
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
        for (let i = 0; i < resultPolicyInsuInsured.length; i++) {
            let elementInsured = resultPolicyInsuInsured[i];
            let elementInsuredNext = resultPolicyInsuInsured[i+1];
            let sumOwnAgentCommisions = 0;
            let contDatesOwnAgentsNatural = 0;
            let contDatesOwnAgentsLegal = 0;
            if (elementInsuredNext === undefined) {
                if (elementInsured.asegurado_per_nat_id !== null) {
                    let ownAgentNatural = await insuredModel.getNaturalInsured(elementInsured.asegurado_per_nat_id);
                    let resultsPolicies = await policyInsurerInsuredModel.getPoliciesIdsNatural(elementInsured.asegurado_per_nat_id);
                    let ownAgent = await ownAgentModel.getOwnAgent(ownAgentNatural[0].agente_propio_id);
                    let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                    for (let index = 0; index < resultsPolicies.length; index++) {
                        let elementPolicy = resultsPolicies[index];
                        let elementPolicyNext = resultsPolicies[index+1];
                        let resultPolicy =  await policyModel.getPolicy(elementPolicy.poliza_id);
                        let commissionReceipt = await receiptModel.getReceiptCommission(elementPolicy.poliza_id);
                        let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicy.poliza_id);
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                        if (elementPolicyNext === undefined) {
                            if (index === 0) {
                                datesOwnAgentsNatural.push(resultPolicy[0].fecha_desde);
                            }
                            break;
                        }
                        let resultPolicyNext =  await policyModel.getPolicy(elementPolicyNext.poliza_id);
                        if (resultPolicyNext[0].fecha_desde > resultPolicy[0].fecha_desde) {
                            datesOwnAgentsNatural.push(resultPolicyNext[0].fecha_desde);
                            contDatesOwnAgentsNatural++;
                            if (contDatesOwnAgentsNatural >= 2) {
                                datesOwnAgentsNatural.splice(datesOwnAgentsNatural.length-2,1);
                            }
                        }
                    }
                    totalCommissionsNatural.push(sumOwnAgentCommisions.toFixed(2));
                    ownAgents.push(fullNameOwnAgent);
                } else {
                    let ownAgentLegal = await insuredModel.getLegalInsured(elementInsured.asegurado_per_jur_id);
                    let resultsPolicies = await policyInsurerInsuredModel.getPoliciesIdsLegal(elementInsured.asegurado_per_jur_id);
                    let ownAgent = await ownAgentModel.getOwnAgent(ownAgentLegal[0].agente_propio_id);
                    let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                    for (let index = 0; index < resultsPolicies.length; index++) {
                        let elementPolicy = resultsPolicies[index];
                        let elementPolicyNext = resultsPolicies[index+1];
                        let resultPolicy =  await policyModel.getPolicy(elementPolicy.poliza_id);
                        let commissionReceipt = await receiptModel.getReceiptCommission(elementPolicy.poliza_id);
                        let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicy.poliza_id);
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                        if (elementPolicyNext === undefined) {
                            if (index === 0) {
                                datesOwnAgentsLegal.push(resultPolicy[0].fecha_desde);
                            }
                            break;
                        }
                        let resultPolicyNext =  await policyModel.getPolicy(elementPolicyNext.poliza_id);
                        if (resultPolicyNext[0].fecha_desde > resultPolicy[0].fecha_desde) {
                            datesOwnAgentsLegal.push(resultPolicyNext[0].fecha_desde);
                            contDatesOwnAgentsLegal++;
                            if (contDatesOwnAgentsLegal >= 2) {
                                datesOwnAgentsLegal.splice(datesOwnAgentsLegal.length-2,1);
                            }
                        }
                    }
                    totalCommissionsLegal.push(sumOwnAgentCommisions.toFixed(2));
                    ownAgents.push(fullNameOwnAgent);
                }
                break;
            }
            if (elementInsured.asegurado_per_nat_id !== null) {
                let ownAgentNatural = await insuredModel.getNaturalInsured(elementInsured.asegurado_per_nat_id);
                let ownAgentNaturalNext = await insuredModel.getNaturalInsured(elementInsuredNext.asegurado_per_nat_id);
                if (ownAgentNaturalNext.length === 0) {
                    let resultsPolicies = await policyInsurerInsuredModel.getPoliciesIdsNatural(elementInsured.asegurado_per_nat_id);
                    let ownAgent = await ownAgentModel.getOwnAgent(ownAgentNatural[0].agente_propio_id);
                    let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                    for (let index = 0; index < resultsPolicies.length; index++) {
                        let elementPolicy = resultsPolicies[index];
                        let elementPolicyNext = resultsPolicies[index+1];
                        let resultPolicy =  await policyModel.getPolicy(elementPolicy.poliza_id);
                        let commissionReceipt = await receiptModel.getReceiptCommission(elementPolicy.poliza_id);
                        let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicy.poliza_id);
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                        if (elementPolicyNext === undefined) {
                            if (index === 0) {
                                datesOwnAgentsNatural.push(resultPolicy[0].fecha_desde);
                            }
                            break;
                        }
                        let resultPolicyNext =  await policyModel.getPolicy(elementPolicyNext.poliza_id);
                        if (resultPolicyNext[0].fecha_desde > resultPolicy[0].fecha_desde) {
                            datesOwnAgentsNatural.push(resultPolicyNext[0].fecha_desde);
                            contDatesOwnAgentsNatural++;
                            if (contDatesOwnAgentsNatural >= 2) {
                                datesOwnAgentsNatural.splice(datesOwnAgentsNatural.length-2,1);
                            }
                        }
                    }
                    if ((elementInsured.asegurado_per_nat_id !== elementInsuredNext.asegurado_per_nat_id) && (contComissionsNatural !== sumOwnAgentCommisions)) {
                        contComissionsNatural += sumOwnAgentCommisions;
                        if (totalCommissionsNatural === []) {
                            totalCommissionsNatural.push(contComissionsNatural.toFixed(2));
                        } else {
                            totalCommissionsNatural.shift();
                            totalCommissionsNatural.push(contComissionsNatural.toFixed(2));
                        }
                    } else if ((elementInsured.asegurado_per_nat_id === elementInsuredNext.asegurado_per_nat_id) && (contComissionsNatural !== sumOwnAgentCommisions)) {
                        totalCommissionsNatural.push(sumOwnAgentCommisions.toFixed(2));
                    }
                    contComissionsNatural = sumOwnAgentCommisions;
                    ownAgents.push(fullNameOwnAgent);
                } else {
                    let resultsPolicies = await policyInsurerInsuredModel.getPoliciesIdsNatural(elementInsured.asegurado_per_nat_id);
                    let ownAgent = await ownAgentModel.getOwnAgent(ownAgentNatural[0].agente_propio_id);
                    let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                    for (let index = 0; index < resultsPolicies.length; index++) {
                        let elementPolicy = resultsPolicies[index];
                        let elementPolicyNext = resultsPolicies[index+1];
                        let resultPolicy =  await policyModel.getPolicy(elementPolicy.poliza_id);
                        let commissionReceipt = await receiptModel.getReceiptCommission(elementPolicy.poliza_id);
                        let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicy.poliza_id);
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                        if (elementPolicyNext === undefined) {
                            if (index === 0) {
                                datesOwnAgentsNatural.push(resultPolicy[0].fecha_desde);
                            }
                            break;
                        }
                        let resultPolicyNext =  await policyModel.getPolicy(elementPolicyNext.poliza_id);
                        if ((resultPolicyNext[0].fecha_desde > resultPolicy[0].fecha_desde) && ownAgentNatural[0].agente_propio_id === ownAgentNaturalNext[0].agente_propio_id) {
                            datesOwnAgentsNatural.push(resultPolicyNext[0].fecha_desde);
                            contDatesOwnAgentsNatural++;
                            if (contDatesOwnAgentsNatural >= 2) {
                                datesOwnAgentsNatural.splice(datesOwnAgentsNatural.length-2,1);
                            }
                        }
                    }
                    if ((elementInsured.asegurado_per_nat_id !== elementInsuredNext.asegurado_per_nat_id) && (ownAgentNatural[0].agente_propio_id === ownAgentNaturalNext[0].agente_propio_id)) {
                        contComissionsNatural += sumOwnAgentCommisions;
                        if (totalCommissionsNatural === []) {
                            totalCommissionsNatural.push(contComissionsNatural.toFixed(2));
                        } else {
                            totalCommissionsNatural.shift();
                            totalCommissionsNatural.push(contComissionsNatural.toFixed(2));
                        }
                    } else {
                        totalCommissionsNatural.push(sumOwnAgentCommisions.toFixed(2));
                    }
                    contComissionsNatural = sumOwnAgentCommisions;
                    ownAgents.push(fullNameOwnAgent);
                }
            } else {
                let ownAgentLegal = await insuredModel.getLegalInsured(elementInsured.asegurado_per_jur_id);
                let ownAgentLegalNext = await insuredModel.getNaturalInsured(elementInsuredNext.asegurado_per_jur_id);
                if (ownAgentLegalNext.length === 0) {
                    let resultsPolicies = await policyInsurerInsuredModel.getPoliciesIdsLegal(elementInsured.asegurado_per_jur_id);
                    let ownAgent = await ownAgentModel.getOwnAgent(ownAgentLegal[0].agente_propio_id);
                    let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                    for (let index = 0; index < resultsPolicies.length; index++) {
                        let elementPolicy = resultsPolicies[index];
                        let elementPolicyNext = resultsPolicies[index+1];
                        let resultPolicy =  await policyModel.getPolicy(elementPolicy.poliza_id);
                        let commissionReceipt = await receiptModel.getReceiptCommission(elementPolicy.poliza_id);
                        let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicy.poliza_id);
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                        if (elementPolicyNext === undefined) {
                            if (index === 0) {
                                datesOwnAgentsLegal.push(resultPolicy[0].fecha_desde);
                            }
                            break;
                        }
                        let resultPolicyNext =  await policyModel.getPolicy(elementPolicyNext.poliza_id);
                        if (resultPolicyNext[0].fecha_desde > resultPolicy[0].fecha_desde) {
                            datesOwnAgentsLegal.push(resultPolicyNext[0].fecha_desde);
                            contDatesOwnAgentsLegal++;
                            if (contDatesOwnAgentsLegal >= 2) {
                                datesOwnAgentsLegal.splice(datesOwnAgentsLegal.length-2,1);
                            }
                        }
                    }
                    if ((elementInsured.asegurado_per_jur_id !== elementInsuredNext.asegurado_per_jur_id) && (contComissionsLegal !== sumOwnAgentCommisions)) {
                        contComissionsLegal += sumOwnAgentCommisions;
                        if (totalCommissionsLegal === []) {
                            totalCommissionsLegal.push(contComissionsLegal.toFixed(2));
                        } else {
                            totalCommissionsLegal.shift();
                            totalCommissionsLegal.push(contComissionsLegal.toFixed(2));
                        }
                    } else if ((elementInsured.asegurado_per_jur_id === elementInsuredNext.asegurado_per_jur_id) && (contComissionsLegal !== sumOwnAgentCommisions)) {
                        totalCommissionsLegal.push(sumOwnAgentCommisions.toFixed(2));
                    }
                    contComissionsLegal = sumOwnAgentCommisions;
                    ownAgents.push(fullNameOwnAgent);
                } else {
                    let resultsPolicies = await policyInsurerInsuredModel.getPoliciesIdsLegal(elementInsured.asegurado_per_jur_id);
                    let ownAgent = await ownAgentModel.getOwnAgent(ownAgentLegal[0].agente_propio_id);
                    let fullNameOwnAgent = ownAgent[0].nombre_agente_propio + ' ' + ownAgent[0].apellido_agente_propio;
                    for (let index = 0; index < resultsPolicies.length; index++) {
                        let elementPolicy = resultsPolicies[index];
                        let elementPolicyNext = resultsPolicies[index+1];
                        let resultPolicy =  await policyModel.getPolicy(elementPolicy.poliza_id);
                        let commissionReceipt = await receiptModel.getReceiptCommission(elementPolicy.poliza_id);
                        let commissionPercentage = await commissionModel.getOwnAgentPercentage(elementPolicy.poliza_id);
                        sumOwnAgentCommisions = (commissionReceipt[0].monto_comision_recibo.toFixed(2) * (commissionPercentage[0].porcentaje_agente_comision / 100) + sumOwnAgentCommisions);
                        if (elementPolicyNext === undefined) {
                            if (index === 0) {
                                datesOwnAgentsLegal.push(resultPolicy[0].fecha_desde);
                            }
                            break;
                        }
                        let resultPolicyNext =  await policyModel.getPolicy(elementPolicyNext.poliza_id);
                        if ((resultPolicyNext[0].fecha_desde > resultPolicy[0].fecha_desde) && (ownAgentLegal[0].agente_propio_id === ownAgentLegalNext[0].agente_propio_id)) {
                            datesOwnAgentsLegal.push(resultPolicyNext[0].fecha_desde);
                            contDatesOwnAgentsLegal++;
                            if (contDatesOwnAgentsLegal >= 2) {
                                datesOwnAgentsLegal.splice(datesOwnAgentsLegal.length-2,1);
                            }
                        }
                    }
                    if ((elementInsured.asegurado_per_jur_id !== elementInsuredNext.asegurado_per_jur_id) && (ownAgentLegal[0].agente_propio_id === ownAgentLegalNext[0].agente_propio_id)) {
                        contComissionsLegal += sumOwnAgentCommisions;
                        if (totalCommissionsLegal === []) {
                            totalCommissionsLegal.push(contComissionsLegal.toFixed(2));
                        } else {
                            totalCommissionsLegal.shift();
                            totalCommissionsLegal.push(contComissionsLegal.toFixed(2));
                        }
                    } else {
                        totalCommissionsLegal.push(sumOwnAgentCommisions.toFixed(2));
                    }
                    contComissionsLegal = sumOwnAgentCommisions;
                    ownAgents.push(fullNameOwnAgent);
                }
            }
        }
        for(i=0; i < ownAgents.length; i++){
            if(filteredOwnAgents.indexOf(ownAgents[i]) === -1) {
                filteredOwnAgents.push(ownAgents[i]);
            } else {
                filteredOwnAgents.splice(filteredOwnAgents.indexOf(ownAgents[i]),1);
                filteredOwnAgents.push(ownAgents[i]);
            }
        }
        for(i=0; i < totalCommissionsNatural.length; i++){
            if(filteredTotalComissionsNatural.indexOf(totalCommissionsNatural[i]) === -1) {
                filteredTotalComissionsNatural.push(totalCommissionsNatural[i]);
            } else {
                filteredTotalComissionsNatural.splice(filteredTotalComissionsNatural.indexOf(totalCommissionsNatural[i]),1);
                filteredTotalComissionsNatural.push(totalCommissionsNatural[i]);
            }
        }
        for(i=0; i < totalCommissionsLegal.length; i++){
            if(filteredTotalComissionsLegal.indexOf(totalCommissionsLegal[i]) === -1) {
                filteredTotalComissionsLegal.push(totalCommissionsLegal[i]);
            } else {
                filteredTotalComissionsLegal.splice(filteredTotalComissionsLegal.indexOf(totalCommissionsLegal[i]),1);
                filteredTotalComissionsLegal.push(totalCommissionsLegal[i]);
            }
        }
        for (let i = 0; i < ownAgents.length; i++) {
            let elementOwnAgent = ownAgents[i];
            let elementOwnAgentNext = ownAgents[i+1];
            if (elementOwnAgentNext === undefined) {
                if (filteredTotalComissionsNatural.length > filteredTotalComissionsLegal.length) {
                    for (let i = 0; i < filteredTotalComissionsNatural.length; i++) {
                        let elementComissionNatural = filteredTotalComissionsNatural[i];
                        if (i > filteredTotalComissionsLegal.length) {
                            elementComissionNatural = parseFloat(elementComissionNatural);
                            totalCommissions.push(elementComissionNatural.toFixed(2));
                        }
                        for (let j = i; j <= filteredTotalComissionsLegal.length; j++) {
                            let elementComissionLegal = filteredTotalComissionsLegal[j];
                            if (elementComissionLegal === undefined) {
                                elementComissionNatural = parseFloat(elementComissionNatural);
                                totalCommissions.push(elementComissionNatural.toFixed(2));
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
                        if (i > filteredTotalComissionsNatural.length) {
                            elementComissionLegal = parseFloat(elementComissionLegal);
                            totalCommissions.push(elementComissionLegal.toFixed(2));
                        }
                        for (let j = i; j <= filteredTotalComissionsNatural.length; j++) {
                            let elementComissionNatural = filteredTotalComissionsNatural[j];
                            if (elementComissionNatural === undefined) {
                                elementComissionLegal = parseFloat(elementComissionLegal);
                                totalCommissions.push(elementComissionLegal.toFixed(2));
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
                if (datesOwnAgentsNatural.length === datesOwnAgentsLegal.length) {
                    for (let i = 0; i < datesOwnAgentsNatural.length; i++) {
                        let elementDateNatural = datesOwnAgentsNatural[i];
                        for (let j = i; j < datesOwnAgentsLegal.length; j++) {
                            let elementDateLegal = datesOwnAgentsLegal[j];
                            if (elementDateNatural > elementDateLegal) {
                                elementDateNatural = elementDateNatural.toISOString().substring(0, 10);
                                datesOwnAgents.push(elementDateNatural);
                                break;
                            } else {
                                elementDateLegal = elementDateLegal.toISOString().substring(0, 10);
                                datesOwnAgents.push(elementDateLegal);
                                break;
                            }
                        }
                    }
                } else if (datesOwnAgentsNatural.length > datesOwnAgentsLegal.length) {
                    for (let i = 0; i < datesOwnAgentsNatural.length; i++) {
                        let elementDateNatural = datesOwnAgentsNatural[i];
                        if ((i > datesOwnAgentsLegal.length)) {
                            elementDateNatural = elementDateNatural.toISOString().substring(0, 10);
                            datesOwnAgents.push(elementDateNatural);
                        }
                        for (let j = i; j <= datesOwnAgentsLegal.length; j++) {
                            let elementDateLegal = datesOwnAgentsLegal[j];
                            if (elementDateLegal === undefined) {
                                elementDateNatural = elementDateNatural.toISOString().substring(0, 10);
                                datesOwnAgents.push(elementDateNatural);
                                break;
                            } else {
                                if (elementDateNatural > elementDateLegal) {
                                    elementDateNatural = elementDateNatural.toISOString().substring(0, 10);
                                    datesOwnAgents.push(elementDateNatural);
                                    break;
                                } else {
                                    elementDateLegal = elementDateLegal.toISOString().substring(0, 10);
                                    datesOwnAgents.push(elementDateLegal);
                                    break;
                                }
                            }
                        }
                    }
                } else if (datesOwnAgentsLegal.length > datesOwnAgentsNatural.length) {
                    for (let i = 0; i < datesOwnAgentsLegal.length; i++) {
                        let elementDateLegal = datesOwnAgentsLegal[i];
                        if (i > datesOwnAgentsNatural.length) {
                            elementDateLegal = elementDateLegal.toISOString().substring(0, 10);
                            datesOwnAgents.push(elementDateLegal);
                        }
                        for (let j = i; j <= datesOwnAgentsNatural.length; j++) {
                            let elementDateNatural = datesOwnAgentsNatural[j];
                            if (elementDateNatural === undefined) {
                                elementDateLegal = elementDateLegal.toISOString().substring(0, 10);
                                datesOwnAgents.push(elementDateLegal);
                                break;
                            } else {
                                if (elementDateLegal > elementDateNatural) {
                                    elementDateLegal = elementDateLegal.toISOString().substring(0, 10);
                                    datesOwnAgents.push(elementDateLegal);
                                    break;
                                } else {
                                    elementDateNatural = elementDateNatural.toISOString().substring(0, 10);
                                    datesOwnAgents.push(elementDateNatural);
                                    break;
                                }
                            }
                        }
                    }
                }
                break;
            }
            if (elementOwnAgent === elementOwnAgentNext) {
                if (filteredTotalComissionsNatural.length > filteredTotalComissionsLegal.length) {
                    for (let i = 0; i < filteredTotalComissionsNatural.length; i++) {
                        let elementComissionNatural = filteredTotalComissionsNatural[i];
                        if (i > filteredTotalComissionsLegal.length) {
                            elementComissionNatural = parseFloat(elementComissionNatural);
                            totalCommissions.push(elementComissionNatural.toFixed(2));
                        }
                        for (let j = i; j <= filteredTotalComissionsLegal.length; j++) {
                            let elementComissionLegal = filteredTotalComissionsLegal[j];
                            if (elementComissionLegal === undefined) {
                                elementComissionNatural = parseFloat(elementComissionNatural);
                                totalCommissions.push(elementComissionNatural.toFixed(2));
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
                        if (i > filteredTotalComissionsNatural.length) {
                            elementComissionLegal = parseFloat(elementComissionLegal);
                            totalCommissions.push(elementComissionLegal.toFixed(2));
                        }
                        for (let j = i; j <= filteredTotalComissionsNatural.length; j++) {
                            let elementComissionNatural = filteredTotalComissionsNatural[j];
                            if (elementComissionNatural === undefined) {
                                elementComissionLegal = parseFloat(elementComissionLegal);
                                totalCommissions.push(elementComissionLegal.toFixed(2));
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
                if (datesOwnAgentsNatural.length === datesOwnAgentsLegal.length) {
                    for (let i = 0; i < datesOwnAgentsNatural.length; i++) {
                        let elementDateNatural = datesOwnAgentsNatural[i];
                        for (let j = i; j < datesOwnAgentsLegal.length; j++) {
                            let elementDateLegal = datesOwnAgentsLegal[j];
                            if (elementDateNatural > elementDateLegal) {
                                elementDateNatural = elementDateNatural.toISOString().substring(0, 10);
                                datesOwnAgents.push(elementDateNatural);
                                break;
                            } else {
                                elementDateLegal = elementDateLegal.toISOString().substring(0, 10);
                                datesOwnAgents.push(elementDateLegal);
                                break;
                            }
                        }
                    }
                } else if (datesOwnAgentsNatural.length > datesOwnAgentsLegal.length) {
                    for (let i = 0; i < datesOwnAgentsNatural.length; i++) {
                        let elementDateNatural = datesOwnAgentsNatural[i];
                        if ((i > datesOwnAgentsLegal.length)) {
                            elementDateNatural = elementDateNatural.toISOString().substring(0, 10);
                            datesOwnAgents.push(elementDateNatural);
                        }
                        for (let j = i; j <= datesOwnAgentsLegal.length; j++) {
                            let elementDateLegal = datesOwnAgentsLegal[j];
                            if (elementDateLegal === undefined) {
                                elementDateNatural = elementDateNatural.toISOString().substring(0, 10);
                                datesOwnAgents.push(elementDateNatural);
                                break;
                            } else {
                                if (elementDateNatural > elementDateLegal) {
                                    elementDateNatural = elementDateNatural.toISOString().substring(0, 10);
                                    datesOwnAgents.push(elementDateNatural);
                                    break;
                                } else {
                                    elementDateLegal = elementDateLegal.toISOString().substring(0, 10);
                                    datesOwnAgents.push(elementDateLegal);
                                    break;
                                }
                            }
                        }
                    }
                } else if (datesOwnAgentsLegal.length > datesOwnAgentsNatural.length) {
                    for (let i = 0; i < datesOwnAgentsLegal.length; i++) {
                        let elementDateLegal = datesOwnAgentsLegal[i];
                        if (i > datesOwnAgentsNatural.length) {
                            elementDateLegal = elementDateLegal.toISOString().substring(0, 10);
                            datesOwnAgents.push(elementDateLegal);
                        }
                        for (let j = i; j <= datesOwnAgentsNatural.length; j++) {
                            let elementDateNatural = datesOwnAgentsNatural[j];
                            if (elementDateNatural === undefined) {
                                elementDateLegal = elementDateLegal.toISOString().substring(0, 10);
                                datesOwnAgents.push(elementDateLegal);
                                break;
                            } else {
                                if (elementDateLegal > elementDateNatural) {
                                    elementDateLegal = elementDateLegal.toISOString().substring(0, 10);
                                    datesOwnAgents.push(elementDateLegal);
                                    break;
                                } else {
                                    elementDateNatural = elementDateNatural.toISOString().substring(0, 10);
                                    datesOwnAgents.push(elementDateNatural);
                                    break;
                                }
                            }
                        }
                    }
                }
            } else {
                for (let i = 0; i < filteredTotalComissionsNatural.length; i++) {
                    let elementComissionNatural = filteredTotalComissionsNatural[i];
                    totalCommissions.push(elementComissionNatural);
                }
                for (let j = 0; j < filteredTotalComissionsLegal.length; j++) {
                    let elementComissionLegal = filteredTotalComissionsLegal[j];
                    totalCommissions.push(elementComissionLegal);
                }
                for (let i = 0; i < datesOwnAgentsNatural.length; i++) {
                    let elementDateNatural = datesOwnAgentsNatural[i];
                    elementDateNatural = elementDateNatural.toISOString().substring(0, 10);
                    datesOwnAgents.push(elementDateNatural);
                }
                for (let j = 0; j < datesOwnAgentsLegal.length; j++) {
                    let elementDateLegal = datesOwnAgentsLegal[j];
                    elementDateLegal = elementDateLegal.toISOString().substring(0, 10);
                    datesOwnAgents.push(elementDateLegal);
                }
            }
        }
        for(i=0; i < datesOwnAgents.length; i++){
            if(filteredDatesOwnAgents.indexOf(datesOwnAgents[i]) === -1) {
                filteredDatesOwnAgents.push(datesOwnAgents[i]);
            } else {
                filteredDatesOwnAgents.splice(filteredDatesOwnAgents.indexOf(datesOwnAgents[i]),1);
                filteredDatesOwnAgents.push(datesOwnAgents[i]);
            }
        }
        let maxDateOwnAgent = 0;
        let minDateOwnAgent = 0;
        if (datesOwnAgents.length !== 0) {
            let arrayDatesOwnAgent = filteredDatesOwnAgents.map((fechaActual) => new Date(fechaActual));
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
            healthPolicyCount: healthPolicyCounter[0],
            autoPolicyCount: autoPolicyCounter[0],
            patrimonialPolicyCount: patrimonialPolicyCounter[0],
            bailPolicyCount: bailPolicyCounter[0],
            anotherBranchPolicyCount: anotherBranchPolicyCounter[0],
            funeralPolicyCount: funeralPolicyCounter[0],
            lifePolicyCount: lifePolicyCounter[0],
            apPolicyCount: apPolicyCounter[0],
            travelPolicyCount: travelPolicyCounter[0],
            totalPremium: totalPremium,
            totalCommission: totalCommission,
            insurers: filteredInsurers,
            InsurersPremium: filteredTotalInsurancePremiums,
            dates: filteredDates,
            maxDate: maxDate,
            minDate: minDate,
            maxDateOwnAgent: maxDateOwnAgent,
            minDateOwnAgent: minDateOwnAgent,
            ownAgents: filteredOwnAgents,
            ownAgentsComission: totalCommissions,
            datesOwnAgents: filteredDatesOwnAgents,
            name: req.session.name
        });
    },
    get404:  (req, res) => {
        res.status(404);
        res.render('404');
    }
}