const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const ownAgentModel = require('../models/own_agent');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const colInsInsurerBenef = require('../models/col_aseg_asegurado_benef');
const colInsInsurerVehi = require('../models/col_insu_insured_vehi');
const colInsInsurerRiskDiver = require('../models/col_insu_insured_ries_diver');
const receiptModel = require('../models/receipt');
const beneficiaryModel = require('../models/beneficiary');
const vehicleModel = require('../models/vehicle');
const riskDiverseModel = require('../models/risk_diverse');

module.exports = {
/*                  GET                  */
    getHealthCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultCollective = await collectiveModel.getCollectiveLast();
        if (resultCollective.length === 0) {
            res.render('healthCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            let collectiveInsurerInsured = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            if ((collectiveInsurerInsured[0].asegurado_per_jur_id === null) && (collectiveInsurerInsured[0].asegurado_per_nat_id === null)) {
                res.render('healthCollectiveForm', {
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    collective: resultCollective[0],
                    receipt: resultReceipt[0],
                    name: req.session.name
                });
            } else if (collectiveInsurerInsured[0].asegurado_per_nat_id === null) {
                let resultLegalInsured = await insuredModel.getLegalInsured(collectiveInsurerInsured[0].asegurado_per_jur_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                res.render('healthCollectiveForm', {
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    collective: resultCollective[0],
                    ownAgent: resultOwnAgent[0],
                    receipt: resultReceipt[0],
                    name: req.session.name
                });
            } else if (collectiveInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(collectiveInsurerInsured[0].asegurado_per_nat_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                res.render('healthCollectiveForm', {
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    collective: resultCollective[0],
                    ownAgent: resultOwnAgent[0],
                    receipt: resultReceipt[0],
                    name: req.session.name
                });
            }
        }
    },
    getVehicleCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultCollective = await collectiveModel.getCollectiveLast();
        if (resultCollective.length === 0) {
            res.render('vehicleCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            let collectiveInsurerInsured = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            if (collectiveInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(collectiveInsurerInsured[0].asegurado_per_nat_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(collectiveInsurerInsured[0].asegurado_per_jur_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
            }
            res.render('vehicleCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                name: req.session.name
            });
        }
    },
    getRiskDiverseCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultCollective = await collectiveModel.getCollectiveLast();
        if (resultCollective.length === 0) {
            res.render('riskDiverseCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            let collectiveInsurerInsured = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
            let resultOwnAgent = [];
            let resultReceipt = await receiptModel.getReceiptLast();
            if (collectiveInsurerInsured[0].asegurado_per_jur_id === null) {
                let resultNaturalInsured = await insuredModel.getNaturalInsured(collectiveInsurerInsured[0].asegurado_per_nat_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
            } else {
                let resultLegalInsured = await insuredModel.getLegalInsured(collectiveInsurerInsured[0].asegurado_per_jur_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
            }
            res.render('riskDiverseCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                name: req.session.name
            });
        }
    },
    getCollectives: async (req, res) => {
        let resultsCollectives =  await collectiveModel.getCollectives();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        for (let index = 0; index < resultsCII.length; index++) {
            let elementCII = resultsCII[index];
            let resultInsurer = await insurerModel.getInsurer(elementCII.aseguradora_id);
            for (let index = 0; index < resultsCollectives.length; index++) {
                let elementCollective = resultsCollectives[index];
                if ((index < elementCII.id_caa) && (typeof(elementCollective.fecha_desde_colectivo) !== 'string')) {
                    elementCollective.prima_anual_colectivo = new Intl.NumberFormat('de-DE').format(elementCollective.prima_anual_colectivo);
                    elementCollective.fecha_desde_colectivo = elementCollective.fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"); 
                    elementCollective.fecha_hasta_colectivo = elementCollective.fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
                    elementCollective.nombre_aseguradora = resultInsurer[0].nombre_aseguradora;
                    break;
                }
            }
        }
        res.render('collectives', {
            data: resultsCollectives,
            name: req.session.name
        });
    },
    getCollectivesDetail: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idCollective = req.params.id;
        if (idCollective.match(valoresAceptados)) {
            let resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
            let resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenef(resultCII[0].id_caa);
            let resultsCIIV = await colInsInsurerVehi.getColInsuInsuredVehi(resultCII[0].id_caa);
            let resultsCIIRD = await colInsInsurerRiskDiver.getColInsuInsuredRiesDiver(resultCII[0].id_caa);
            if ((resultsCIIV.length === 0) && (resultsCIIRD.length === 0)) {
                let resultsBeneficiaries = [];
                for (const resultCIIB of resultsCIIB) {
                    let resultBenefiary = await beneficiaryModel.getBeneficiary(resultCIIB.beneficiario_id);
                    resultsBeneficiaries.push(resultBenefiary[0]);
                }
                res.render('beneficiaries', {
                    data: resultsBeneficiaries,
                    name: req.session.name
                });
            } else if ((resultsCIIB.length === 0) && (resultsCIIRD.length === 0)) {
                let resultsVehicles = [];
                for (const resultCIIV of resultsCIIV) {
                    let resultVehicle = await vehicleModel.getVehicle(resultCIIV.vehiculo_id);
                    resultsVehicles.push(resultVehicle[0]);
                }
                res.render('vehicles', {
                    data: resultsVehicles,
                    name: req.session.name
                });
            } else if ((resultsCIIB.length === 0) && (resultsCIIV.length === 0)) {
                let resultsVariousRisk = [];
                for (const resultCIIRD of resultsCIIRD) {
                    let resultRiskDiverse = await riskDiverseModel.getRiskDiverse(resultCIIRD.riesgo_diverso_id);
                    resultsVariousRisk.push(resultRiskDiverse[0]);
                }
                res.render('variousRisk', {
                    data: resultsVariousRisk,
                    name: req.session.name
                });
            }
        } else {
            next();
        }
    },
/*                 POST                  */
    postHealthCollectiveForm: async (req, res) => {
        let montoPrimaAnual = req.body.prima_anual_colectivo;
        let deducible = req.body.deducible_colectivo;
        let fechaPolizaDesde = new Date(req.body.fecha_desde_colectivo);
        let fechaPolizaHasta = new Date(req.body.fecha_hasta_colectivo);
        let tipoColectivo = 'SALUD';
        let estatusPoliza = '';
        let diasExpiracion = 0;
        let fechaActual = new Date();
        let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
        let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
        diasExpiracion = diferenciaDias.toFixed(0);
        if (diasExpiracion > 0) {
            estatusPoliza = 'VIGENTE';
        } else {
            estatusPoliza = 'ANULADO';
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
        let collective = await collectiveModel.postCollectiveForm(montoPrimaAnual, deducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, req.body);
        await collectiveInsurerInsuredModel.postCollectiveInsurer(req.body.nombre_aseguradora, collective.insertId);
        res.redirect('/sistema/add-health-collective');
    },
    postVehicleCollectiveForm: async (req, res) => {
        let montoPrimaAnual = req.body.prima_anual_colectivo;
        let deducible = req.body.deducible_colectivo;
        let fechaPolizaDesde = new Date(req.body.fecha_desde_colectivo);
        let fechaPolizaHasta = new Date(req.body.fecha_hasta_colectivo);
        let tipoColectivo = 'AUTOMÓVIL';
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
        let collective = await collectiveModel.postCollectiveForm(montoPrimaAnual, deducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, req.body);
        await collectiveInsurerInsuredModel.postCollectiveInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, collective.insertId);
        res.redirect('/sistema/add-vehicle-collective');
    },
    postRiskDiverseCollectiveForm: async (req, res) => {
        let montoPrimaAnual = req.body.prima_anual_colectivo;
        let deducible = req.body.deducible_colectivo;
        let fechaPolizaDesde = new Date(req.body.fecha_desde_colectivo);
        let fechaPolizaHasta = new Date(req.body.fecha_hasta_colectivo);
        let tipoColectivo = 'RIESGOS DIVERSOS';
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
        let collective = await collectiveModel.postCollectiveForm(montoPrimaAnual, deducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, req.body);
        await collectiveInsurerInsuredModel.postCollectiveInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, collective.insertId);
        res.redirect('/sistema/add-risk-diverse-collective');
    },
/*                  PUT                  */
    putCollective: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idCollective = req.params.id;
        if (idCollective.match(valoresAceptados)) {
            let resultCollective = await collectiveModel.getCollective(idCollective);
            let resultsTaker = await collectiveModel.getCollectiveHolder();
            let fechaDesdeColectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
            let fechaHastaColectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
            let primaAnual = resultCollective[0].prima_anual_colectivo;
            primaAnual = new Intl.NumberFormat('de-DE').format(primaAnual);
            let insurers = await insurerModel.getInsurers();
            let resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
            let resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
            res.render('editCollective', {
                collective: resultCollective[0],
                takerNames: resultsTaker,
                fechaDesdeColectivo: fechaDesdeColectivo,
                fechaHastaColectivo: fechaHastaColectivo,
                primaAnual: primaAnual,
                insurers: insurers,
                insurer: resultInsurer[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updateCollective: async (req, res) => {
        let fechaDesdeColectivo = new Date(req.body.fecha_desde_colectivo);
        let fechaHastaColectivo = new Date(req.body.fecha_hasta_colectivo);
        let montoPrimaAnual = req.body.prima_anual_colectivo;
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
        await collectiveModel.updateCollective(fechaDesdeColectivo, fechaHastaColectivo, montoPrimaAnual, req.body);
        await collectiveInsurerInsuredModel.updateCollectiveInsurer(req.body.nombre_aseguradora, req.body.id_colectivo);
        res.redirect('/sistema');
    },
/*               DELETE                  */
    disableCollective: async (req, res) => {
        let disableCollective = 1;
        let disableCollectiveInsurerInsured = 1;
        let disableCIIB = 1;
        let disableCIIV = 1;
        let disableCIIRD = 1;
        await collectiveModel.updateDisableCollective(req.params.id, req.body);
        await collectiveModel.disableCollective(req.params.id, disableCollective);
        await collectiveInsurerInsuredModel.disableCollectiveInsurerInsured(req.params.id, disableCollectiveInsurerInsured);
        let disableCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(req.params.id);
        let resultCIIB = await colInsInsurerBenef.getColInsuInsuredBenef(disableCII[0].id_caa);
        let resultCIIV = await colInsInsurerVehi.getColInsuInsuredVehi(disableCII[0].id_caa);
        let resultCIIRD = await colInsInsurerRiskDiver.getColInsuInsuredRiesDiver(disableCII[0].id_caa);
        if ((resultCIIV.length === 0) && (resultCIIRD.length === 0)) {
            for (const itemCIIB of resultCIIB) {
                await colInsInsurerBenef.disableColInsuInsuredBenef(itemCIIB.id_caab, disableCIIB);
            }
        } else if ((resultCIIB.length === 0) && (resultCIIRD.length === 0)) {
            for (const itemCIIV of resultCIIV) {
                await colInsInsurerVehi.disableColInsuInsuredVehi(itemCIIV.id_caav, disableCIIV);
            }
        } else if ((resultCIIB.length === 0) && (resultCIIV.length === 0)) {
            for (const itemCIIRD of resultCIIRD) {
                await colInsInsurerRiskDiver.disableColInsuInsuredRiesDiver(itemCIIRD.id_caard, disableCIIRD);
            }
        }
        res.redirect('/sistema/collectives');
    }
}