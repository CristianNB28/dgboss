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
const policyAgentExecutiveModel = require('../models/policy_agent_executive');
const collectiveAgentExecutiveModel = require('../models/collective_agent_executive');
const polInsuInsuredExecModel = require('../models/pol_insu_insured_executive');
const colInsuInsuredExecModel = require('../models/col_insu_insured_executive');

module.exports = {
/*                  GET                  */
    getPremiumsCollected: async (req, res) => {
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds(); 
        let resultPremiumCollection = [];
        try {
            for (let i = 0; i < resultsPII.length; i++) {
                let elementPII = resultsPII[i];
                let resultInsurer = await insurerModel.getInsurer(elementPII.aseguradora_id);
                let resultPolicy = await policyModel.getPolicy(elementPII.poliza_id);
                let primaAnualPoliza = resultPolicy[0].prima_anual_poliza;
                let ownAgents = [];
                let executives = [];
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
                let resultsPAE = await policyAgentExecutiveModel.getPolicyAgentExecutive(elementPII.poliza_id);
                let idsOwnAgents = resultsPAE.map(pae => pae.agente_propio_id).filter(id => id !== null);
                let idsExecutives = resultsPAE.map(pae => pae.ejecutivo_id).filter(id => id !== null);
                let premiumCollection = {};
                if ((idsOwnAgents.length === 0) && (idsExecutives.length === 0)) {
                    premiumCollection = {
                        ownAgent: '',
                        company: '',
                        bouquetType: resultPolicy[0].tipo_individual_poliza,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        premium: primaAnualPoliza
                    };
                } else if (idsOwnAgents.length === 0) {
                    for (const idExecutive of idsExecutives) {
                        let resultExecutive = await executiveModel.getExecutive(idExecutive);
                        executives.push(resultExecutive);
                    }
                    executives = executives.map(executive => {
                        let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                        return nameExecutive;
                    });
                    premiumCollection = {
                        ownAgent: executives,
                        company: '',
                        bouquetType: resultPolicy[0].tipo_individual_poliza,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        premium: primaAnualPoliza
                    };
                } else if (idsExecutives.length === 0) {
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
                        company: '',
                        bouquetType: resultPolicy[0].tipo_individual_poliza,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        premium: primaAnualPoliza
                    };
                } else {
                    for (const idExecutive of idsExecutives) {
                        let resultExecutive = await executiveModel.getExecutive(idExecutive);
                        executives.push(resultExecutive);
                    }
                    for (const idOwnAgent of idsOwnAgents) {
                        let resultOwnAgent = await ownAgentModel.getOwnAgent(idOwnAgent);
                        ownAgents.push(resultOwnAgent);
                    }
                    executives = executives.map(executive => {
                        let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                        return nameExecutive;
                    });
                    ownAgents = ownAgents.map(ownAgent => {
                        let nameOwnAgent = `${ownAgent[0].nombre_agente_propio} ${ownAgent[0].apellido_agente_propio}`;
                        return nameOwnAgent;
                    });
                    const executivesOwnAgents = executives.concat(ownAgents);
                    premiumCollection = {
                        ownAgent: executivesOwnAgents,
                        company: '',
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
                let executives = [];
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
                let resultsCAE = await collectiveAgentExecutiveModel.getCollectiveAgentExecutive(elementCII.colectivo_id);
                let idsOwnAgents = resultsCAE.map(cae => cae.agente_propio_id).filter(id => id !== null);
                let idsExecutives = resultsCAE.map(cae => cae.ejecutivo_id).filter(id => id !== null);
                let premiumCollection = {};
                if ((idsOwnAgents.length === 0) && (idsExecutives.length === 0)) {
                    premiumCollection = {
                        ownAgent: '',
                        company: '',
                        bouquetType: resultCollective[0].tipo_colectivo,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        premium: primaAnualColectivo
                    };
                } else if (idsOwnAgents.length === 0) {
                    for (const idExecutive of idsExecutives) {
                        let resultExecutive = await executiveModel.getExecutive(idExecutive);
                        executives.push(resultExecutive);
                    }
                    executives = executives.map(executive => {
                        let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                        return nameExecutive;
                    });
                    premiumCollection = {
                        ownAgent: executives,
                        company: '',
                        bouquetType: resultCollective[0].tipo_colectivo,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        premium: primaAnualColectivo
                    };
                } else if (idsExecutives.length === 0) {
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
                        company: '',
                        bouquetType: resultCollective[0].tipo_colectivo,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        premium: primaAnualColectivo
                    };
                } else {
                    for (const idExecutive of idsExecutives) {
                        let resultExecutive = await executiveModel.getExecutive(idExecutive);
                        executives.push(resultExecutive);
                    }
                    for (const idOwnAgent of idsOwnAgents) {
                        let resultOwnAgent = await ownAgentModel.getOwnAgent(idOwnAgent);
                        ownAgents.push(resultOwnAgent);
                    }
                    executives = executives.map(executive => {
                        let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                        return nameExecutive;
                    });
                    ownAgents = ownAgents.map(ownAgent => {
                        let nameOwnAgent = `${ownAgent[0].nombre_agente_propio} ${ownAgent[0].apellido_agente_propio}`;
                        return nameOwnAgent;
                    });
                    const executivesOwnAgents = executives.concat(ownAgents);
                    premiumCollection = {
                        ownAgent: executivesOwnAgents,
                        company: '',
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
                name: req.session.name 
            });
        } catch (error) {
            console.log(error);
        }
    },
    getCommissionsCollected: async (req, res) => {
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultCommissionCollection = [];
        try {
            for (let i = 0; i < resultsPII.length; i++) {
                let elementPII = resultsPII[i];
                let resultInsurer = await insurerModel.getInsurer(elementPII.aseguradora_id);
                let resultPolicy = await policyModel.getPolicy(elementPII.poliza_id);
                let resultReceiptCommission = await receiptModel.getReceiptCommissionPolicy(elementPII.poliza_id);
                let reciboComisionPoliza = resultReceiptCommission[0].monto_comision_recibo;
                let ownAgents = [];
                let executivesAgents = [];
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
                let resultsPAE = await policyAgentExecutiveModel.getPolicyAgentExecutive(elementPII.poliza_id);
                let idsOwnAgents = resultsPAE.map(pae => pae.agente_propio_id).filter(id => id !== null);
                let idsExecutivesAgents = resultsPAE.map(pae => pae.ejecutivo_id).filter(id => id !== null);
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
                if ((idsOwnAgents.length === 0) && (idsExecutivesAgents.length === 0)) {
                    commissionCollection = {
                        ownAgent: '',
                        company: '',
                        executive: executives,
                        bouquetType: resultPolicy[0].tipo_individual_poliza,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        commission: reciboComisionPoliza
                    };
                } else if (idsOwnAgents.length === 0) {
                    for (const idExecutive of idsExecutivesAgents) {
                        let resultExecutive = await executiveModel.getExecutive(idExecutive);
                        executivesAgents.push(resultExecutive);
                    }
                    executivesAgents = executivesAgents.map(executive => {
                        let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                        return nameExecutive;
                    });
                    commissionCollection = {
                        ownAgent: executivesAgents,
                        company: '',
                        executive: executives,
                        bouquetType: resultPolicy[0].tipo_individual_poliza,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        commission: reciboComisionPoliza
                    };
                } else if (idsExecutivesAgents.length === 0) {
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
                        company: '',
                        executive: executives,
                        bouquetType: resultPolicy[0].tipo_individual_poliza,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        commission: reciboComisionPoliza
                    };
                } else {
                    for (const idExecutive of idsExecutivesAgents) {
                        let resultExecutive = await executiveModel.getExecutive(idExecutive);
                        executivesAgents.push(resultExecutive);
                    }
                    for (const idOwnAgent of idsOwnAgents) {
                        let resultOwnAgent = await ownAgentModel.getOwnAgent(idOwnAgent);
                        ownAgents.push(resultOwnAgent);
                    }
                    executivesAgents = executivesAgents.map(executive => {
                        let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                        return nameExecutive;
                    });
                    ownAgents = ownAgents.map(ownAgent => {
                        let nameOwnAgent = `${ownAgent[0].nombre_agente_propio} ${ownAgent[0].apellido_agente_propio}`;
                        return nameOwnAgent;
                    });
                    const executivesOwnAgents = executivesAgents.concat(ownAgents);
                    commissionCollection = {
                        ownAgent: executivesOwnAgents,
                        company: '',
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
                let executivesAgents = [];
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
                let resultsCAE = await collectiveAgentExecutiveModel.getCollectiveAgentExecutive(elementCII.colectivo_id);
                let idsOwnAgents = resultsCAE.map(cae => cae.agente_propio_id).filter(id => id !== null);
                let idsExecutivesAgents = resultsCAE.map(cae => cae.ejecutivo_id).filter(id => id !== null);
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
                if ((idsOwnAgents.length === 0) && (idsExecutivesAgents.length === 0)) {
                    commissionCollection = {
                        ownAgent: '',
                        company: '',
                        executive: executives,
                        bouquetType: resultCollective[0].tipo_colectivo,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        commission: reciboComisionColectivo
                    };
                } else if (idsOwnAgents.length === 0) {
                    for (const idExecutive of idsExecutivesAgents) {
                        let resultExecutive = await executiveModel.getExecutive(idExecutive);
                        executivesAgents.push(resultExecutive);
                    }
                    executivesAgents = executivesAgents.map(executive => {
                        let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                        return nameExecutive;
                    });
                    commissionCollection = {
                        ownAgent: executivesAgents,
                        company: '',
                        executive: executives,
                        bouquetType: resultCollective[0].tipo_colectivo,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        commission: reciboComisionColectivo
                    };
                } else if (idsExecutivesAgents.length === 0) {
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
                        company: '',
                        executive: executives,
                        bouquetType: resultCollective[0].tipo_colectivo,
                        insurer: resultInsurer[0].nombre_aseguradora,
                        dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                        commission: reciboComisionColectivo
                    };
                } else {
                    for (const idExecutive of idsExecutivesAgents) {
                        let resultExecutive = await executiveModel.getExecutive(idExecutive);
                        executivesAgents.push(resultExecutive);
                    }
                    for (const idOwnAgent of idsOwnAgents) {
                        let resultOwnAgent = await ownAgentModel.getOwnAgent(idOwnAgent);
                        ownAgents.push(resultOwnAgent);
                    }
                    executivesAgents = executivesAgents.map(executive => {
                        let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                        return nameExecutive;
                    });
                    ownAgents = ownAgents.map(ownAgent => {
                        let nameOwnAgent = `${ownAgent[0].nombre_agente_propio} ${ownAgent[0].apellido_agente_propio}`;
                        return nameOwnAgent;
                    });
                    const executivesOwnAgents = executivesAgents.concat(ownAgents);
                    commissionCollection = {
                        ownAgent: executivesOwnAgents,
                        company: '',
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
                name: req.session.name
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
        let resultPendingPayment = [];
        try {
            for (let i = 0; i < resultsPII.length; i++) {
                let elementPII = resultsPII[i];
                let resultInsurer = await insurerModel.getInsurer(elementPII.aseguradora_id);
                let resultPolicy = await policyModel.getPolicy(elementPII.poliza_id);
                let resultCommission = await commissionModel.getComissionPolicy(elementPII.poliza_id);
                let resultVerificationFactor = await verficationFactorModel.getVerificationFactor(resultCommission[0].id_comision);
                let ownAgents = [];
                let executivesAgents = [];
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
                    let resultsPAE = await policyAgentExecutiveModel.getPolicyAgentExecutive(elementPII.poliza_id);
                    let idsOwnAgents = resultsPAE.map(pae => pae.agente_propio_id).filter(id => id !== null);
                    let idsExecutivesAgents = resultsPAE.map(pae => pae.ejecutivo_id).filter(id => id !== null);
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
                    if ((idsOwnAgents.length === 0) && (idsExecutivesAgents.length === 0)) {
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
                    } else if (idsOwnAgents.length === 0) {
                        for (const idExecutive of idsExecutivesAgents) {
                            let resultExecutive = await executiveModel.getExecutive(idExecutive);
                            executivesAgents.push(resultExecutive);
                        }
                        executivesAgents = executivesAgents.map(executive => {
                            let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                            return nameExecutive;
                        });
                        pendingPayment = {
                            ownAgent: executivesAgents,
                            executive: executives,
                            taker: resultPolicy[0].nombre_tomador_poliza,
                            bouquetType: resultPolicy[0].tipo_individual_poliza,
                            insurer: resultInsurer[0].nombre_aseguradora,
                            dateFrom: resultPolicy[0].fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                            dateTo: resultPolicy[0].fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                            premium: primaPorcentajeVerificacion
                        };
                    } else if (idsExecutivesAgents.length === 0) {
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
                    } else {
                        for (const idExecutive of idsExecutivesAgents) {
                            let resultExecutive = await executiveModel.getExecutive(idExecutive);
                            executivesAgents.push(resultExecutive);
                        }
                        for (const idOwnAgent of idsOwnAgents) {
                            let resultOwnAgent = await ownAgentModel.getOwnAgent(idOwnAgent);
                            ownAgents.push(resultOwnAgent);
                        }
                        executivesAgents = executivesAgents.map(executive => {
                            let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                            return nameExecutive;
                        });
                        ownAgents = ownAgents.map(ownAgent => {
                            let nameOwnAgent = `${ownAgent[0].nombre_agente_propio} ${ownAgent[0].apellido_agente_propio}`;
                            return nameOwnAgent;
                        });
                        const executivesOwnAgents = executivesAgents.concat(ownAgents);
                        pendingPayment = {
                            ownAgent: executivesOwnAgents,
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
                let executivesAgents = [];
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
                    let resultsCAE = await collectiveAgentExecutiveModel.getCollectiveAgentExecutive(elementCII.colectivo_id);
                    let idsOwnAgents = resultsCAE.map(cae => cae.agente_propio_id).filter(id => id !== null);
                    let idsExecutivesAgents = resultsCAE.map(cae => cae.ejecutivo_id).filter(id => id !== null);
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
                    if ((idsOwnAgents.length === 0) && (idsExecutivesAgents.length === 0)) {
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
                    } else if (idsOwnAgents.length === 0) {
                        for (const idExecutive of idsExecutivesAgents) {
                            let resultExecutive = await executiveModel.getExecutive(idExecutive);
                            executivesAgents.push(resultExecutive);
                        }
                        executivesAgents = executivesAgents.map(executive => {
                            let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                            return nameExecutive;
                        });
                        pendingPayment = {
                            ownAgent: executivesAgents,
                            executive: executives,
                            taker: resultCollective[0].nombre_tomador_colectivo,
                            bouquetType: resultCollective[0].tipo_colectivo,
                            insurer: resultInsurer[0].nombre_aseguradora,
                            dateFrom: resultCollective[0].fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                            dateTo: resultCollective[0].fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"),
                            premium: primaPorcentajeVerificacion
                        };
                    } else if (idsExecutivesAgents.length === 0) {
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
                    } else {
                        for (const idExecutive of idsExecutivesAgents) {
                            let resultExecutive = await executiveModel.getExecutive(idExecutive);
                            executivesAgents.push(resultExecutive);
                        }
                        for (const idOwnAgent of idsOwnAgents) {
                            let resultOwnAgent = await ownAgentModel.getOwnAgent(idOwnAgent);
                            ownAgents.push(resultOwnAgent);
                        }
                        executivesAgents = executivesAgents.map(executive => {
                            let nameExecutive = `${executive[0].nombre_ejecutivo} ${executive[0].apellido_ejecutivo}`;
                            return nameExecutive;
                        });
                        ownAgents = ownAgents.map(ownAgent => {
                            let nameOwnAgent = `${ownAgent[0].nombre_agente_propio} ${ownAgent[0].apellido_agente_propio}`;
                            return nameOwnAgent;
                        });
                        const executivesOwnAgents = executivesAgents.concat(ownAgents);
                        pendingPayment = {
                            ownAgent: executivesOwnAgents,
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
                name: req.session.name 
            });
        } catch (error) {
            console.log(error);
        }
    }
/*                 POST                  */
/*                  PUT                  */
/*               DELETE                  */
}