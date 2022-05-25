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
const policyOwnAgentModel = require('../models/policy_own_agent');
const collectiveOwnAgentModel = require('../models/collective_own_agent');
const polInsuInsuredExecModel = require('../models/pol_insu_insured_executive');
const colInsuInsuredExecModel = require('../models/col_insu_insured_executive');

module.exports = {
/*                  GET                  */
    getPremiumsCollected: async (req, res) => {
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultPremiumCollection = [];
        let hash = {};
        resultsCII = resultsCII.filter(cii => hash[cii.colectivo_id] ? false : hash[cii.colectivo_id] = true);
        try {
            for (let i = 0; i < resultsPII.length; i++) {
                let elementPII = resultsPII[i];
                let resultInsurer = await insurerModel.getInsurer(elementPII.aseguradora_id);
                let resultPolicy = await policyModel.getPolicy(elementPII.poliza_id);
                let primaAnualPoliza = resultPolicy[0].prima_anual_poliza;
                let ownAgents = [];
                if (primaAnualPoliza.toString().includes('.') === true) {
                    primaAnualPoliza = primaAnualPoliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                } else {
                    primaAnualPoliza = String(primaAnualPoliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                }
                if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
                    primaAnualPoliza = `Bs ${primaAnualPoliza}`;
                } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
                    primaAnualPoliza = `$ ${primaAnualPoliza}`;
                } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
                    primaAnualPoliza = `€ ${primaAnualPoliza}`;
                }
                let resultsPAP = await policyOwnAgentModel.getPolicyOwnAgent(elementPII.poliza_id);
                let idsOwnAgents = resultsPAP.map(pap => pap.agente_propio_id).filter(id => id !== null);
                let premiumCollection = {};
                if (idsOwnAgents.length === 0) {
                    premiumCollection = {
                        ownAgent: '',
                        bouquetType: resultPolicy[0].tipo_individual_poliza,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        premium: primaAnualPoliza
                    };
                } else {
                    for (const idOwnAgent of idsOwnAgents) {
                        let resultOwnAgent = await ownAgentModel.getOwnAgent(idOwnAgent);
                        ownAgents.push(resultOwnAgent);
                    }
                    ownAgents = ownAgents.map(ownAgent => {
                        let nameOwnAgent = `${ownAgent[0].nombre_agente_propio} ${ownAgent[0].apellido_agente_propio}`;
                        return nameOwnAgent;
                    });
                    premiumCollection = {
                        ownAgent: ownAgents,
                        bouquetType: resultPolicy[0].tipo_individual_poliza,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        premium: primaAnualPoliza
                    };
                } 
                resultPremiumCollection.push(premiumCollection);
            }
            for (let i = 0; i < resultsCII.length; i++) {
                let elementCII = resultsCII[i];
                let resultInsurer = await insurerModel.getInsurer(elementCII.aseguradora_id);
                let resultCollective = await collectiveModel.getCollective(elementCII.colectivo_id);
                let primaAnualColectivo = resultCollective[0].prima_anual_colectivo;
                let ownAgents = [];
                if (primaAnualColectivo.toString().includes('.') === true) {
                    primaAnualColectivo = primaAnualColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                } else {
                    primaAnualColectivo = String(primaAnualColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                }
                if (resultCollective[0].tipo_moneda_colectivo === 'BOLÍVAR') {
                    primaAnualColectivo = `Bs ${primaAnualColectivo}`;
                } else if (resultCollective[0].tipo_moneda_colectivo === 'DÓLAR') {
                    primaAnualColectivo = `$ ${primaAnualColectivo}`;
                } else if (resultCollective[0].tipo_moneda_colectivo === 'EUROS') {
                    primaAnualColectivo = `€ ${primaAnualColectivo}`;
                }
                let resultsCAP = await collectiveOwnAgentModel.getCollectiveOwnAgent(elementCII.colectivo_id);
                let idsOwnAgents = resultsCAP.map(cap => cap.agente_propio_id).filter(id => id !== null);
                let premiumCollection = {};
                if (idsOwnAgents.length === 0) {
                    premiumCollection = {
                        ownAgent: '',
                        bouquetType: resultCollective[0].tipo_colectivo,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        premium: primaAnualColectivo
                    };
                } else {
                    for (const idOwnAgent of idsOwnAgents) {
                        let resultOwnAgent = await ownAgentModel.getOwnAgent(idOwnAgent);
                        ownAgents.push(resultOwnAgent);
                    }
                    ownAgents = ownAgents.map(ownAgent => {
                        let nameOwnAgent = `${ownAgent[0].nombre_agente_propio} ${ownAgent[0].apellido_agente_propio}`;
                        return nameOwnAgent;
                    });
                    premiumCollection = {
                        ownAgent: ownAgents,
                        bouquetType: resultCollective[0].tipo_colectivo,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        premium: primaAnualColectivo
                    };
                }
                resultPremiumCollection.push(premiumCollection);
            }
            res.render('premiumsCollected',{
                data: resultPremiumCollection,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
    getCommissionsCollected: async (req, res) => {
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultCommissionCollection = [];
        let hash = {};
        resultsCII = resultsCII.filter(cii => hash[cii.colectivo_id] ? false : hash[cii.colectivo_id] = true);
        try {
            for (let i = 0; i < resultsPII.length; i++) {
                let elementPII = resultsPII[i];
                let resultInsurer = await insurerModel.getInsurer(elementPII.aseguradora_id);
                let resultPolicy = await policyModel.getPolicy(elementPII.poliza_id);
                let resultReceiptCommission = await receiptModel.getReceiptCommissionPolicy(elementPII.poliza_id);
                let reciboComisionPoliza = resultReceiptCommission[0].monto_comision_recibo;
                let ownAgents = [];
                let executives = [];
                if (reciboComisionPoliza.toString().includes('.') === true) {
                    reciboComisionPoliza = reciboComisionPoliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                } else {
                    reciboComisionPoliza = String(reciboComisionPoliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                }
                if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
                    reciboComisionPoliza = `Bs ${reciboComisionPoliza}`;
                } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
                    reciboComisionPoliza = `$ ${reciboComisionPoliza}`;
                } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
                    reciboComisionPoliza = `€ ${reciboComisionPoliza}`;
                }
                let resultsPAP = await policyOwnAgentModel.getPolicyOwnAgent(elementPII.poliza_id);
                let idsOwnAgents = resultsPAP.map(pap => pap.agente_propio_id).filter(id => id !== null);
                let resultsPAAE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(elementPII.id_paa);
                let idsExecutives = resultsPAAE.map(paae => paae.ejecutivo_id).filter(id => id !== null);
                for (const idExecutive of idsExecutives) {
                    let resultExecutive = await executiveModel.getExecutive(idExecutive);
                    executives.push(resultExecutive);
                }
                executives = executives.map(executive => {
                    let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                    return nameExecutive;
                });
                let commissionCollection = {};
                if (idsOwnAgents.length === 0) {
                    commissionCollection = {
                        ownAgent: '',
                        executive: executives,
                        bouquetType: resultPolicy[0].tipo_individual_poliza,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        commission: reciboComisionPoliza
                    };
                } else {
                    for (const idOwnAgent of idsOwnAgents) {
                        let resultOwnAgent = await ownAgentModel.getOwnAgent(idOwnAgent);
                        ownAgents.push(resultOwnAgent);
                    }
                    ownAgents = ownAgents.map(ownAgent => {
                        let nameOwnAgent = `${ownAgent[0].nombre_agente_propio} ${ownAgent[0].apellido_agente_propio}`;
                        return nameOwnAgent;
                    });
                    commissionCollection = {
                        ownAgent: ownAgents,
                        executive: executives,
                        bouquetType: resultPolicy[0].tipo_individual_poliza,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        commission: reciboComisionPoliza
                    };
                }
                resultCommissionCollection.push(commissionCollection);
            }
            for (let i = 0; i < resultsCII.length; i++) {
                let elementCII = resultsCII[i];
                let resultInsurer = await insurerModel.getInsurer(elementCII.aseguradora_id);
                let resultCollective = await collectiveModel.getCollective(elementCII.colectivo_id);
                let resultReceiptCommission = await receiptModel.getReceiptCommissionCollective(elementCII.colectivo_id);
                let reciboComisionColectivo = resultReceiptCommission[0].monto_comision_recibo;
                let ownAgents = [];
                let executives = [];
                if (reciboComisionColectivo.toString().includes('.') === true) {
                    reciboComisionColectivo = reciboComisionColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                } else {
                    reciboComisionColectivo = String(reciboComisionColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                }
                if (resultCollective[0].tipo_moneda_colectivo === 'BOLÍVAR') {
                    reciboComisionColectivo = `Bs ${reciboComisionColectivo}`;
                } else if (resultCollective[0].tipo_moneda_colectivo === 'DÓLAR') {
                    reciboComisionColectivo = `$ ${reciboComisionColectivo}`;
                } else if (resultCollective[0].tipo_moneda_colectivo === 'EUROS') {
                    reciboComisionColectivo = `€ ${reciboComisionColectivo}`;
                }
                let resultsCAP = await collectiveOwnAgentModel.getCollectiveOwnAgent(elementCII.colectivo_id);
                let idsOwnAgents = resultsCAP.map(cae => cae.agente_propio_id).filter(id => id !== null);
                let resultsCAAE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(elementCII.id_caa);
                let idsExecutives = resultsCAAE.map(caae => caae.ejecutivo_id).filter(id => id !== null);
                for (const idExecutive of idsExecutives) {
                    let resultExecutive = await executiveModel.getExecutive(idExecutive);
                    executives.push(resultExecutive);
                }
                executives = executives.map(executive => {
                    let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                    return nameExecutive;
                });
                let commissionCollection = {};
                if (idsOwnAgents.length === 0) {
                    commissionCollection = {
                        ownAgent: '',
                        executive: executives,
                        bouquetType: resultCollective[0].tipo_colectivo,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        commission: reciboComisionColectivo
                    };
                } else {
                    for (const idOwnAgent of idsOwnAgents) {
                        let resultOwnAgent = await ownAgentModel.getOwnAgent(idOwnAgent);
                        ownAgents.push(resultOwnAgent);
                    }
                    ownAgents = ownAgents.map(ownAgent => {
                        let nameOwnAgent = `${ownAgent[0].nombre_agente_propio} ${ownAgent[0].apellido_agente_propio}`;
                        return nameOwnAgent;
                    });
                    commissionCollection = {
                        ownAgent: ownAgents,
                        executive: executives,
                        bouquetType: resultCollective[0].tipo_colectivo,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        commission: reciboComisionColectivo
                    };
                }
                resultCommissionCollection.push(commissionCollection);
            }
            res.render('commissionsCollected', {
                data: resultCommissionCollection,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
        }
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
            name: req.session.name,
            cookieRol: req.cookies.rol
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
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getPendingPayments: async (req, res) => {
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let hash = {};
        resultsCII = resultsCII.filter(cii => hash[cii.colectivo_id] ? false : hash[cii.colectivo_id] = true);
        let resultPendingPayment = [];
        try {
            for (let i = 0; i < resultsPII.length; i++) {
                let elementPII = resultsPII[i];
                let resultInsurer = await insurerModel.getInsurer(elementPII.aseguradora_id);
                let resultPolicy = await policyModel.getPolicy(elementPII.poliza_id);
                let resultCommission = await commissionModel.getComissionPolicy(elementPII.poliza_id);
                let resultVerificationFactor = await verficationFactorModel.getVerificationFactor(resultCommission[0].id_comision);
                let ownAgents = [];
                let executives = [];
                if (resultVerificationFactor[0].estatus_comision_factor_verificacion === 'PENDIENTE') {
                    let primaPorcentajeVerificacion = resultVerificationFactor[0].porcentaje_prima_factor_verificacion;
                    if (primaPorcentajeVerificacion.toString().includes('.') === true) {
                        primaPorcentajeVerificacion = primaPorcentajeVerificacion.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                    } else {
                        primaPorcentajeVerificacion = String(primaPorcentajeVerificacion).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                    }
                    if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
                        primaPorcentajeVerificacion = `Bs ${primaPorcentajeVerificacion}`;
                    } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
                        primaPorcentajeVerificacion = `$ ${primaPorcentajeVerificacion}`;
                    } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
                        primaPorcentajeVerificacion = `€ ${primaPorcentajeVerificacion}`;
                    }
                    let resultsPAP = await policyOwnAgentModel.getPolicyOwnAgent(elementPII.poliza_id);
                    let idsOwnAgents = resultsPAP.map(pap => pap.agente_propio_id).filter(id => id !== null);
                    let resultsPAAE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(elementPII.id_paa);
                    let idsExecutives = resultsPAAE.map(paae => paae.ejecutivo_id).filter(id => id !== null);
                    for (const idExecutive of idsExecutives) {
                        let resultExecutive = await executiveModel.getExecutive(idExecutive);
                        executives.push(resultExecutive);
                    }
                    executives = executives.map(executive => {
                        let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                        return nameExecutive;
                    });
                    let pendingPayment = {};
                    if (idsOwnAgents.length === 0) {
                        pendingPayment = {
                            ownAgent: '',
                            executive: executives,
                            taker: resultPolicy[0].nombre_tomador_poliza,
                            bouquetType: resultPolicy[0].tipo_individual_poliza,
                            insurer: resultInsurer[0].nombre_aseguradora,
                            dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                            dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                            premium: primaPorcentajeVerificacion
                        };
                    } else {
                        for (const idOwnAgent of idsOwnAgents) {
                            let resultOwnAgent = await ownAgentModel.getOwnAgent(idOwnAgent);
                            ownAgents.push(resultOwnAgent);
                        }
                        ownAgents = ownAgents.map(ownAgent => {
                            let nameOwnAgent = `${ownAgent[0].nombre_agente_propio} ${ownAgent[0].apellido_agente_propio}`;
                            return nameOwnAgent;
                        });
                        pendingPayment = {
                            ownAgent: ownAgents,
                            executive: executives,
                            taker: resultPolicy[0].nombre_tomador_poliza,
                            bouquetType: resultPolicy[0].tipo_individual_poliza,
                            insurer: resultInsurer[0].nombre_aseguradora,
                            dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                            dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                            premium: primaPorcentajeVerificacion
                        };
                    }
                    resultPendingPayment.push(pendingPayment);
                }
            }
            for (let i = 0; i < resultsCII.length; i++) {
                let elementCII = resultsCII[i];
                let resultInsurer = await insurerModel.getInsurer(elementCII.aseguradora_id);
                let resultCollective = await collectiveModel.getCollective(elementCII.colectivo_id);
                let resultCommission = await commissionModel.getComissionCollective(elementCII.colectivo_id);
                let resultVerificationFactor = await verficationFactorModel.getVerificationFactor(resultCommission[0].id_comision);
                let ownAgents = [];
                let executives = [];
                if (resultVerificationFactor[0].estatus_comision_factor_verificacion === 'PENDIENTE') {
                    let primaPorcentajeVerificacion = resultVerificationFactor[0].porcentaje_prima_factor_verificacion;
                    if (primaPorcentajeVerificacion.toString().includes('.') === true) {
                        primaPorcentajeVerificacion = primaPorcentajeVerificacion.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                    } else {
                        primaPorcentajeVerificacion = String(primaPorcentajeVerificacion).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                    }
                    if (resultCollective[0].tipo_moneda_colectivo === 'BOLÍVAR') {
                        primaPorcentajeVerificacion = `Bs ${primaPorcentajeVerificacion}`;
                    } else if (resultCollective[0].tipo_moneda_colectivo === 'DÓLAR') {
                        primaPorcentajeVerificacion = `$ ${primaPorcentajeVerificacion}`;
                    } else if (resultCollective[0].tipo_moneda_colectivo === 'EUROS') {
                        primaPorcentajeVerificacion = `€ ${primaPorcentajeVerificacion}`;
                    }
                    let resultsCAP = await collectiveOwnAgentModel.getCollectiveOwnAgent(elementCII.colectivo_id);
                    let idsOwnAgents = resultsCAP.map(cae => cae.agente_propio_id).filter(id => id !== null);
                    let resultsCAAE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(elementCII.id_caa);
                    let idsExecutives = resultsCAAE.map(caae => caae.ejecutivo_id).filter(id => id !== null);
                    for (const idExecutive of idsExecutives) {
                        let resultExecutive = await executiveModel.getExecutive(idExecutive);
                        executives.push(resultExecutive);
                    }
                    executives = executives.map(executive => {
                        let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                        return nameExecutive;
                    });
                    let pendingPayment = {};
                    if (idsOwnAgents.length === 0) {
                        pendingPayment = {
                            ownAgent: '',
                            executive: executives,
                            taker: resultCollective[0].nombre_tomador_colectivo,
                            bouquetType: resultCollective[0].tipo_colectivo,
                            insurer: resultInsurer[0].nombre_aseguradora,
                            dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                            dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                            premium: primaPorcentajeVerificacion
                        };
                    } else {
                        for (const idOwnAgent of idsOwnAgents) {
                            let resultOwnAgent = await ownAgentModel.getOwnAgent(idOwnAgent);
                            ownAgents.push(resultOwnAgent);
                        }
                        ownAgents = ownAgents.map(ownAgent => {
                            let nameOwnAgent = `${ownAgent[0].nombre_agente_propio} ${ownAgent[0].apellido_agente_propio}`;
                            return nameOwnAgent;
                        });
                        pendingPayment = {
                            ownAgent: ownAgents,
                            executive: executives,
                            taker: resultCollective[0].nombre_tomador_colectivo,
                            bouquetType: resultCollective[0].tipo_colectivo,
                            insurer: resultInsurer[0].nombre_aseguradora,
                            dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                            dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                            premium: primaPorcentajeVerificacion
                        };
                    }
                    resultPendingPayment.push(pendingPayment);
                }
            }
            res.render('pendingPayments',{
                data: resultPendingPayment,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
    getPremiumsCollectedDate: async (req, res) => {
        try {
            res.render('premiumsCollectedDate',{
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
    getAccidentRate: async (req, res) => {
        try {
            res.render('accidentRate',{
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
    getPortfolioComposition: async (req, res) => {
        try {
            res.render('portfolioComposition',{
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
    getPersistence: async (req, res) => {
        try {
            res.render('persistence',{
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
/*                 POST                  */
    postPremiumsCollectedDate: async (req, res) => {
        try {
            let {
                fecha_inicio: fechaInicio, 
                fecha_final: fechaFin,
                tipo_moneda: tipoMoneda
            } = req.body;
            fechaInicio = new Date(fechaInicio);
            fechaFin = new Date(fechaFin);
            let data = [];
            const resultPrimaCobrada = await policyModel.getChargedCounterPremiumDate(fechaInicio, fechaFin, tipoMoneda);
            let primaCobradaTotal = resultPrimaCobrada.map(item => item.prima_cobrada_date).reduce((prev, curr) => prev + curr, 0);
            const resultPrimaDevuelta = await policyModel.getPremiumReturnedCounterDate(fechaInicio, fechaFin, tipoMoneda);
            let primaDevueltaTotal = resultPrimaDevuelta.map(item => item.prima_devuelta_date).reduce((prev, curr) => prev + curr, 0);
            const resultPrimaCobradaNeta = await policyModel.getPremiumCollectedNetCounterDate(fechaInicio, fechaFin, tipoMoneda);
            let primaCobradaNetaTotal = resultPrimaCobradaNeta.map(item => item.prima_cobrada_neta_date).reduce((prev, curr) => prev + curr, 0);
            if (primaCobradaTotal.toString().includes('.') === true) {
                primaCobradaTotal = primaCobradaTotal.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaCobradaTotal = String(primaCobradaTotal).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (primaDevueltaTotal.toString().includes('.') === true) {
                primaDevueltaTotal = primaDevueltaTotal.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaDevueltaTotal = String(primaDevueltaTotal).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (primaCobradaNetaTotal.toString().includes('.') === true) {
                primaCobradaNetaTotal = primaCobradaNetaTotal.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaCobradaNetaTotal = String(primaCobradaNetaTotal).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (tipoMoneda === 'BOLÍVAR') {
                primaCobradaTotal = `Bs ${primaCobradaTotal}`;
                primaDevueltaTotal = `Bs ${primaDevueltaTotal}`;
                primaCobradaNetaTotal = `Bs ${primaCobradaNetaTotal}`;
            } else if (tipoMoneda === 'DÓLAR') {
                primaCobradaTotal = `$ ${primaCobradaTotal}`;
                primaDevueltaTotal = `$ ${primaDevueltaTotal}`;
                primaCobradaNetaTotal = `$ ${primaCobradaNetaTotal}`;
            } else if (tipoMoneda === 'EUROS') {
                primaCobradaTotal = `€ ${primaCobradaTotal}`;
                primaDevueltaTotal = `€ ${primaDevueltaTotal}`;
                primaCobradaNetaTotal = `€ ${primaCobradaNetaTotal}`;
            }
            const objectData = {
                'titulo': 'TOTAL',
                'prima_cobrada': primaCobradaTotal,
                'prima_devuelta': primaDevueltaTotal,
                'prima_cobrada_neta': primaCobradaNetaTotal
            }
            data.push(objectData);
            res.render('premiumsCollectedDate',{
                data,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
    postAccidentRate: async (req, res) => {
        try {
            let {
                fecha_inicio: fechaInicio, 
                fecha_final: fechaFin,
                tipo_moneda: tipoMoneda
            } = req.body;
            fechaInicio = new Date(fechaInicio);
            fechaFin = new Date(fechaFin);
            const resultSiniestralidadAuto = await policyModel.getVehicleAccidentRateSum(fechaInicio, fechaFin, tipoMoneda);
            let siniestralidadAutoTotal = resultSiniestralidadAuto.map(item => item.siniestralidad_vehiculo_suma).reduce((prev, curr) => prev + curr, 0);
            const resultSiniestralidadSalud = await policyModel.getHealthAccidentRateSum(fechaInicio, fechaFin, tipoMoneda);
            let siniestralidadSaludTotal = resultSiniestralidadSalud.map(item => item.siniestralidad_salud_suma).reduce((prev, curr) => prev + curr, 0);
            const resultSiniestralidadPatrimonial = await policyModel.getPatrimonialAccidentRateSum(fechaInicio, fechaFin, tipoMoneda);
            let siniestralidadPatrimonialTotal = resultSiniestralidadPatrimonial.map(item => item.siniestralidad_patrimonial_suma).reduce((prev, curr) => prev + curr, 0);
            const resultSiniestralidadFianza = await policyModel.getBailAccidentRateSum(fechaInicio, fechaFin, tipoMoneda);
            let siniestralidadFianzaTotal = resultSiniestralidadFianza.map(item => item.siniestralidad_fianza_suma).reduce((prev, curr) => prev + curr, 0);
            if (siniestralidadAutoTotal.toString().includes('.') === true) {
                siniestralidadAutoTotal = siniestralidadAutoTotal.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                siniestralidadAutoTotal = String(siniestralidadAutoTotal).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (siniestralidadSaludTotal.toString().includes('.') === true) {
                siniestralidadSaludTotal = siniestralidadSaludTotal.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                siniestralidadSaludTotal = String(siniestralidadSaludTotal).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (siniestralidadPatrimonialTotal.toString().includes('.') === true) {
                siniestralidadPatrimonialTotal = siniestralidadPatrimonialTotal.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                siniestralidadPatrimonialTotal = String(siniestralidadPatrimonialTotal).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (siniestralidadFianzaTotal.toString().includes('.') === true) {
                siniestralidadFianzaTotal = siniestralidadFianzaTotal.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                siniestralidadFianzaTotal = String(siniestralidadFianzaTotal).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (tipoMoneda === 'BOLÍVAR') {
                siniestralidadAutoTotal = `Bs ${siniestralidadAutoTotal}`;
                siniestralidadSaludTotal = `Bs ${siniestralidadSaludTotal}`;
                siniestralidadPatrimonialTotal = `Bs ${siniestralidadPatrimonialTotal}`;
                siniestralidadFianzaTotal = `Bs ${siniestralidadFianzaTotal}`;
            } else if (tipoMoneda === 'DÓLAR') {
                siniestralidadAutoTotal = `$ ${siniestralidadAutoTotal}`;
                siniestralidadSaludTotal = `$ ${siniestralidadSaludTotal}`;
                siniestralidadPatrimonialTotal = `$ ${siniestralidadPatrimonialTotal}`;
                siniestralidadFianzaTotal = `$ ${siniestralidadFianzaTotal}`;
            } else if (tipoMoneda === 'EUROS') {
                siniestralidadAutoTotal = `€ ${siniestralidadAutoTotal}`;
                siniestralidadSaludTotal = `€ ${siniestralidadSaludTotal}`;
                siniestralidadPatrimonialTotal = `€ ${siniestralidadPatrimonialTotal}`;
                siniestralidadFianzaTotal = `€ ${siniestralidadFianzaTotal}`;
            }
            const data = [ 
                {
                    'tipo_poliza': 'AUTOMÓVIL',
                    'prima_devengada': siniestralidadAutoTotal
                },
                {
                    'tipo_poliza': 'SALUD',
                    'prima_devengada': siniestralidadSaludTotal
                },
                {
                    'tipo_poliza': 'PATRIMONIAL',
                    'prima_devengada': siniestralidadPatrimonialTotal
                },
                {
                    'tipo_poliza': 'FIANZA',
                    'prima_devengada': siniestralidadFianzaTotal
                }
            ];
            res.render('accidentRate',{
                data,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
    postPortfolioComposition: async (req, res) => {
        try {
            let {
                fecha_inicio: fechaInicio, 
                fecha_final: fechaFin,
                tipo_moneda: tipoMoneda
            } = req.body;
            fechaInicio = new Date(fechaInicio);
            fechaFin = new Date(fechaFin);
            const resultPrimaCobradaNetaAuto = await policyModel.getPremiumCollectedNetVehicleSum(fechaInicio, fechaFin, tipoMoneda);
            let primaCobradaNetaAuto = resultPrimaCobradaNetaAuto.map(item => item.prima_cobrada_neta_vehiculo_suma).reduce((prev, curr) => prev + curr, 0);
            const resultPrimaCobradaNetaSalud = await policyModel.getPremiumCollectedNetHealthSum(fechaInicio, fechaFin, tipoMoneda);
            let primaCobradaNetaSalud = resultPrimaCobradaNetaSalud.map(item => item.prima_cobrada_neta_salud_suma).reduce((prev, curr) => prev + curr, 0);
            const resultPrimaCobradaNetaPatrimonial = await policyModel.getPremiumCollectedNetPatrimonialSum(fechaInicio, fechaFin, tipoMoneda);
            let primaCobradaNetaPatrimonial = resultPrimaCobradaNetaPatrimonial[0].prima_cobrada_neta_patrimonial_suma;
            const resultPrimaCobradaNetaFianza = await policyModel.getPremiumCollectedNetBailSum(fechaInicio, fechaFin, tipoMoneda);
            let primaCobradaNetaFianza = resultPrimaCobradaNetaFianza[0].prima_cobrada_neta_fianza_suma;
            if (primaCobradaNetaPatrimonial === null) {
                primaCobradaNetaPatrimonial = 0;
            }
            if (primaCobradaNetaFianza === null) {
                primaCobradaNetaFianza = 0;
            }
            if (primaCobradaNetaAuto.toString().includes('.') === true) {
                primaCobradaNetaAuto = primaCobradaNetaAuto.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaCobradaNetaAuto = String(primaCobradaNetaAuto).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (primaCobradaNetaSalud.toString().includes('.') === true) {
                primaCobradaNetaSalud = primaCobradaNetaSalud.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaCobradaNetaSalud = String(primaCobradaNetaSalud).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (primaCobradaNetaPatrimonial.toString().includes('.') === true) {
                primaCobradaNetaPatrimonial = primaCobradaNetaPatrimonial.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaCobradaNetaPatrimonial = String(primaCobradaNetaPatrimonial).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (primaCobradaNetaFianza.toString().includes('.') === true) {
                primaCobradaNetaFianza = primaCobradaNetaFianza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaCobradaNetaFianza = String(primaCobradaNetaFianza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (tipoMoneda === 'BOLÍVAR') {
                primaCobradaNetaAuto = `Bs ${primaCobradaNetaAuto}`;
                primaCobradaNetaSalud = `Bs ${primaCobradaNetaSalud}`;
                primaCobradaNetaPatrimonial = `Bs ${primaCobradaNetaPatrimonial}`;
                primaCobradaNetaFianza = `Bs ${primaCobradaNetaFianza}`;
            } else if (tipoMoneda === 'DÓLAR') {
                primaCobradaNetaAuto = `$ ${primaCobradaNetaAuto}`;
                primaCobradaNetaSalud = `$ ${primaCobradaNetaSalud}`;
                primaCobradaNetaPatrimonial = `$ ${primaCobradaNetaPatrimonial}`;
                primaCobradaNetaFianza = `$ ${primaCobradaNetaFianza}`;
            } else if (tipoMoneda === 'EUROS') {
                primaCobradaNetaAuto = `€ ${primaCobradaNetaAuto}`;
                primaCobradaNetaSalud = `€ ${primaCobradaNetaSalud}`;
                primaCobradaNetaPatrimonial = `€ ${primaCobradaNetaPatrimonial}`;
                primaCobradaNetaFianza = `€ ${primaCobradaNetaFianza}`;
            }
            const data = [ 
                {
                    'tipo_poliza': 'AUTOMÓVIL',
                    'prima_cobrada_neta': primaCobradaNetaAuto
                },
                {
                    'tipo_poliza': 'SALUD',
                    'prima_cobrada_neta': primaCobradaNetaSalud
                },
                {
                    'tipo_poliza': 'PATRIMONIAL',
                    'prima_cobrada_neta': primaCobradaNetaPatrimonial
                },
                {
                    'tipo_poliza': 'FIANZA',
                    'prima_cobrada_neta': primaCobradaNetaFianza
                }
            ];
            res.render('portfolioComposition',{
                data,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
    postPersistence: async (req, res) => {
        try {
            let {
                fecha_inicio: fechaInicio, 
                fecha_final: fechaFin,
                tipo_moneda: tipoMoneda
            } = req.body;
            fechaInicio = new Date(fechaInicio);
            fechaFin = new Date(fechaFin);
            const resultPolizaNoRenovadaAuto = await policyModel.getNonRenewedVehiclePolicyCount(fechaInicio, fechaFin, tipoMoneda);
            let polizaNoRenovadaAuto = resultPolizaNoRenovadaAuto.map(item => item.poliza_no_renovada_auto_contador).reduce((prev, curr) => prev + curr, 0);
            const resultPolizaNoRenovadaSalud = await policyModel.getNonRenewedHealthPolicyCount(fechaInicio, fechaFin, tipoMoneda);
            let polizaNoRenovadaSalud = resultPolizaNoRenovadaSalud.map(item => item.poliza_no_renovada_salud_contador).reduce((prev, curr) => prev + curr, 0);
            const resultPolizaNoRenovadaPatrimonial = await policyModel.getNonRenewedPatrimonialPolicyCount(fechaInicio, fechaFin, tipoMoneda);
            let polizaNoRenovadaPatrimonial = resultPolizaNoRenovadaPatrimonial[0].poliza_no_renovada_patrimonial_contador;
            const resultPolizaRenovadaAuto = await policyModel.getRenewedVehiclePolicyCount(fechaInicio, fechaFin, tipoMoneda);
            let polizaRenovadaAuto = resultPolizaRenovadaAuto.map(item => item.poliza_renovada_auto_contador).reduce((prev, curr) => prev + curr, 0);
            const resultPolizaRenovadaSalud = await policyModel.getRenewedHealthPolicyCount(fechaInicio, fechaFin, tipoMoneda);
            let polizaRenovadaSalud = resultPolizaRenovadaSalud.map(item => item.poliza_renovada_salud_contador).reduce((prev, curr) => prev + curr, 0);
            const resultPolizaRenovadaPatrimonial = await policyModel.getRenewedPatrimonialPolicyCount(fechaInicio, fechaFin, tipoMoneda);
            let polizaRenovadaPatrimonial = resultPolizaRenovadaPatrimonial[0].poliza_renovada_patrimonial_contador;
            if (polizaNoRenovadaPatrimonial === null) {
                polizaNoRenovadaPatrimonial = 0;
            }
            if (polizaRenovadaPatrimonial === null) {
                polizaRenovadaPatrimonial = 0;
            }
            const totalBaseAuto = polizaNoRenovadaAuto + polizaRenovadaAuto;
            const totalBaseSalud = polizaNoRenovadaSalud + polizaRenovadaSalud;
            const totalBasePatrimonial = polizaNoRenovadaPatrimonial + polizaRenovadaPatrimonial;
            const data = [ 
                {
                    'tipo_poliza': 'AUTOMÓVIL',
                    'poliza_renovada': polizaRenovadaAuto,
                    'poliza_no_renovada': polizaNoRenovadaAuto,
                    'total_base': totalBaseAuto
                },
                {
                    'tipo_poliza': 'SALUD',
                    'poliza_renovada': polizaRenovadaSalud,
                    'poliza_no_renovada': polizaNoRenovadaSalud,
                    'total_base': totalBaseSalud
                },
                {
                    'tipo_poliza': 'PATRIMONIAL',
                    'poliza_renovada': polizaRenovadaPatrimonial,
                    'poliza_no_renovada': polizaNoRenovadaPatrimonial,
                    'total_base': totalBasePatrimonial
                }
            ];
            res.render('persistence',{
                data,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
/*                  PUT                  */
/*               DELETE                  */
}