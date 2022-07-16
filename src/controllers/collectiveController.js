// Models
const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const ownAgentModel = require('../models/own_agent');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const colInsInsurerBenef = require('../models/col_insu_insured_benef');
const colInsInsurerVehi = require('../models/col_insu_insured_vehi');
const colInsInsurerRiskDiver = require('../models/col_insu_insured_ries_diver');
const receiptModel = require('../models/receipt');
const beneficiaryModel = require('../models/beneficiary');
const vehicleModel = require('../models/vehicle');
const riskDiverseModel = require('../models/risk_diverse');
const executiveModel = require('../models/executive');
const colInsuInsuredExecModel = require('../models/col_insu_insured_executive');
const collectiveOwnAgentModel = require('../models/collective_own_agent');
// Serializers
const separateNameSurname = require('../serializers/separateNameSurname');
const convertStringToNumber = require('../serializers/convertStringToNumber');
const convertNumberToString = require('../serializers/convertNumberToString');
const convertStringToCurrency = require('../serializers/convertStringToCurrency');

module.exports = {
/*                  GET                  */
    getHealthCollectiveForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultCollective = await collectiveModel.getCollectiveLast();
        if (resultCollective.length === 0) {
            resultCollective = [{}];
            res.render('healthCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let resultOwnAgent = [];
            let primaNetaColectivo = resultCollective[0].prima_neta_colectivo;
            let nameRazonInsured = '';
            const resultcollectiveOwnAgent = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultCollective[0].id_colectivo);
            resultCollective[0].fecha_desde_colectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
            resultCollective[0].fecha_hasta_colectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
            if (resultcollectiveOwnAgent.length !== 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultcollectiveOwnAgent[0].agente_propio_id);
            }
            const collectiveInsurerInsured = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
            const resultInsurer = await insurerModel.getInsurer(collectiveInsurerInsured[0].aseguradora_id);
            if ((collectiveInsurerInsured[0].asegurado_per_jur_id === null) && (collectiveInsurerInsured[0].asegurado_per_nat_id !== null)) {
                const resultNaturalInsured = await insuredModel.getNaturalInsured(collectiveInsurerInsured[0].asegurado_per_nat_id);
                nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
            } else if ((collectiveInsurerInsured[0].asegurado_per_jur_id !== null) && (collectiveInsurerInsured[0].asegurado_per_nat_id === null)) {
                const resultLegalInsured = await insuredModel.getLegalInsured(collectiveInsurerInsured[0].asegurado_per_jur_id);
                nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
            }
            if (resultCollective[0].fraccionamiento_boolean_colectivo === 1) {
                primaNetaColectivo = primaNetaColectivo / resultCollective[0].numero_pago_colectivo;
                primaNetaColectivo = primaNetaColectivo.toFixed(2);
                primaNetaColectivo = Number(primaNetaColectivo);
                primaNetaColectivo = convertNumberToString(primaNetaColectivo);
            } else {
                primaNetaColectivo = convertNumberToString(primaNetaColectivo);
            }
            res.render('healthCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaColectivo,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getHealthCollectiveList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultCollective = await collectiveModel.getCollectiveLast();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        res.render('healthCollectiveList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            collective: resultCollective[0],
            collectives: resultsCollective,
            receipts: resultsReceipts,
            ownAgents: resultsOwnAgents,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getVehicleCollectiveForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultCollective = await collectiveModel.getCollectiveLast();
        if (resultCollective.length === 0) {
            resultCollective = [{}];
            res.render('vehicleCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let resultOwnAgent = [];
            let primaNetaColectivo = resultCollective[0].prima_neta_colectivo;
            let nameRazonInsured = '';
            const resultcollectiveOwnAgent = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultCollective[0].id_colectivo);
            resultCollective[0].fecha_desde_colectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
            resultCollective[0].fecha_hasta_colectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
            if (resultcollectiveOwnAgent.length !== 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultcollectiveOwnAgent[0].agente_propio_id);
            }
            const collectiveInsurerInsured = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
            const resultInsurer = await insurerModel.getInsurer(collectiveInsurerInsured[0].aseguradora_id);
            if ((collectiveInsurerInsured[0].asegurado_per_jur_id === null) && (collectiveInsurerInsured[0].asegurado_per_nat_id !== null)) {
                const resultNaturalInsured = await insuredModel.getNaturalInsured(collectiveInsurerInsured[0].asegurado_per_nat_id);
                nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
            } else if ((collectiveInsurerInsured[0].asegurado_per_jur_id !== null) && (collectiveInsurerInsured[0].asegurado_per_nat_id === null)) {
                const resultLegalInsured = await insuredModel.getLegalInsured(collectiveInsurerInsured[0].asegurado_per_jur_id);
                nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
            }
            if (resultCollective[0].fraccionamiento_boolean_colectivo === 1) {
                primaNetaColectivo = primaNetaColectivo / resultCollective[0].numero_pago_colectivo;
                primaNetaColectivo = primaNetaColectivo.toFixed(2);
                primaNetaColectivo = Number(primaNetaColectivo);
                primaNetaColectivo = convertNumberToString(primaNetaColectivo);
            } else {
                primaNetaColectivo = convertNumberToString(primaNetaColectivo);
            }
            res.render('vehicleCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaColectivo,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getVehicleCollectiveList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultCollective = await collectiveModel.getCollectiveLast();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        res.render('vehicleCollectiveList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            collective: resultCollective[0],
            collectives: resultsCollective,
            receipts: resultsReceipts,
            ownAgents: resultsOwnAgents,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getRiskDiverseCollectiveForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultCollective = await collectiveModel.getCollectiveLast();
        if (resultCollective.length === 0) {
            resultCollective = [{}];
            res.render('riskDiverseCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            let resultOwnAgent = [];
            let primaNetaColectivo = resultCollective[0].prima_neta_colectivo;
            let nameRazonInsured = '';
            const resultcollectiveOwnAgent = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultCollective[0].id_colectivo);
            resultCollective[0].fecha_desde_colectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
            resultCollective[0].fecha_hasta_colectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
            if (resultcollectiveOwnAgent.length !== 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultcollectiveOwnAgent[0].agente_propio_id);
            }
            const collectiveInsurerInsured = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
            const resultInsurer = await insurerModel.getInsurer(collectiveInsurerInsured[0].aseguradora_id);
            if ((collectiveInsurerInsured[0].asegurado_per_jur_id === null) && (collectiveInsurerInsured[0].asegurado_per_nat_id !== null)) {
                const resultNaturalInsured = await insuredModel.getNaturalInsured(collectiveInsurerInsured[0].asegurado_per_nat_id);
                nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
            } else if ((collectiveInsurerInsured[0].asegurado_per_jur_id !== null) && (collectiveInsurerInsured[0].asegurado_per_nat_id === null)) {
                const resultLegalInsured = await insuredModel.getLegalInsured(collectiveInsurerInsured[0].asegurado_per_jur_id);
                nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
            }
            if (resultCollective[0].fraccionamiento_boolean_colectivo === 1) {
                primaNetaColectivo = primaNetaColectivo / resultCollective[0].numero_pago_colectivo;
                primaNetaColectivo = primaNetaColectivo.toFixed(2);
                primaNetaColectivo = Number(primaNetaColectivo);
                primaNetaColectivo = convertNumberToString(primaNetaColectivo);
            } else {
                primaNetaColectivo = convertNumberToString(primaNetaColectivo);
            }
            res.render('riskDiverseCollectiveForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaColectivo,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    getRiskDiverseCollectiveList: async (req, res) => {
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultCollective = await collectiveModel.getCollectiveLast();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        res.render('riskDiverseCollectiveList', {
            naturalInsureds: resultsNaturalInsureds,
            legalInsureds: resultsLegalInsureds,
            collective: resultCollective[0],
            collectives: resultsCollective,
            receipts: resultsReceipts,
            ownAgents: resultsOwnAgents,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getCollectives: async (req, res) => {
        const resultsCollectives =  await collectiveModel.getCollectives();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        for (let index = 0; index < resultsCII.length; index++) {
            const elementCII = resultsCII[index];
            const resultInsurer = await insurerModel.getInsurer(elementCII.aseguradora_id);
            for (let index = 0; index < resultsCollectives.length; index++) {
                const elementCollective = resultsCollectives[index];
                if ((index < elementCII.id_caa) && (typeof(elementCollective.fecha_desde_colectivo) !== 'string')) {
                    elementCollective.prima_neta_colectivo = convertNumberToString(elementCollective.prima_neta_colectivo);
                    elementCollective.igtf_colectivo = convertNumberToString(elementCollective.igtf_colectivo);
                    elementCollective.prima_total_colectivo = convertNumberToString(elementCollective.prima_total_colectivo);
                    elementCollective.prima_neta_colectivo = convertStringToCurrency(elementCollective.tipo_moneda_colectivo, elementCollective.prima_neta_colectivo);
                    elementCollective.igtf_colectivo = convertStringToCurrency(elementCollective.tipo_moneda_colectivo, elementCollective.igtf_colectivo);
                    elementCollective.prima_total_colectivo = convertStringToCurrency(elementCollective.tipo_moneda_colectivo, elementCollective.prima_total_colectivo);
                    elementCollective.fecha_desde_colectivo = elementCollective.fecha_desde_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"); 
                    elementCollective.fecha_hasta_colectivo = elementCollective.fecha_hasta_colectivo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
                    elementCollective.nombre_aseguradora = resultInsurer[0].nombre_aseguradora;
                    break;
                }
            }
        }
        res.render('collectives', {
            data: resultsCollectives,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getCollectivesDetail: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idCollective = req.params.id;
        if (idCollective.match(valoresAceptados)) {
            let resultCIIBeneficiary = [];
            const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
            let resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenef(resultCII[0].id_caa);
            const resultsCIIV = await colInsInsurerVehi.getColInsuInsuredVehi(resultCII[0].id_caa);
            const resultsCIIRD = await colInsInsurerRiskDiver.getColInsuInsuredRiesDiver(resultCII[0].id_caa);
            if ((resultsCIIV.length === 0) && (resultsCIIRD.length === 0)) {
                let resultsBeneficiaries = [];
                for (let index = 0; index < resultCII.length; index++) {
                    const elementCII = resultCII[index];
                    resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenef(elementCII.id_caa);
                    resultCIIBeneficiary.push(resultsCIIB.map((ciib) => ciib.beneficiario_id));
                    resultCIIBeneficiary = resultCIIBeneficiary.flat(1);
                }
                for (const ciiBeneficiary of resultCIIBeneficiary) {
                    const resultBenefiary = await beneficiaryModel.getBeneficiary(ciiBeneficiary);
                    resultsBeneficiaries.push(resultBenefiary[0]);
                }
                res.render('beneficiaries', {
                    data: resultsBeneficiaries,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if ((resultsCIIB.length === 0) && (resultsCIIRD.length === 0)) {
                let resultsVehicles = [];
                for (const resultCIIV of resultsCIIV) {
                    const resultVehicle = await vehicleModel.getVehicle(resultCIIV.vehiculo_id);
                    resultsVehicles.push(resultVehicle[0]);
                }
                res.render('vehicles', {
                    data: resultsVehicles,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if ((resultsCIIB.length === 0) && (resultsCIIV.length === 0)) {
                let resultsVariousRisk = [];
                for (const resultCIIRD of resultsCIIRD) {
                    const resultRiskDiverse = await riskDiverseModel.getRiskDiverse(resultCIIRD.riesgo_diverso_id);
                    resultRiskDiverse[0].suma_asegurada_riesgo_diverso = convertNumberToString(resultRiskDiverse[0].suma_asegurada_riesgo_diverso);
                    resultsVariousRisk.push(resultRiskDiverse[0]);
                }
                res.render('variousRisk', {
                    data: resultsVariousRisk,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        } else {
            next();
        }
    },
/*                 POST                  */
    postHealthCollectiveForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultCollective = await collectiveModel.getCollectiveLast();
        if (resultCollective.length === 0) {
            resultCollective = [{}];
        }
        let resultOwnAgent = [];
        let primaNetaColectivo = resultCollective[0].prima_neta_colectivo;
        let nameRazonInsured = '';
        const resultcollectiveOwnAgent = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultCollective[0].id_colectivo);
        if (resultcollectiveOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultcollectiveOwnAgent[0].agente_propio_id);
        }
        let collectiveInsurerInsured = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
        if (collectiveInsurerInsured.length === 0) {
            collectiveInsurerInsured = [{}];
        }
        const resultInsurer = await insurerModel.getInsurer(collectiveInsurerInsured[0].aseguradora_id);
        if ((collectiveInsurerInsured[0].asegurado_per_jur_id === null) && (collectiveInsurerInsured[0].asegurado_per_nat_id !== null)) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(collectiveInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else if ((collectiveInsurerInsured[0].asegurado_per_jur_id !== null) && (collectiveInsurerInsured[0].asegurado_per_nat_id === null)) {
            const resultLegalInsured = await insuredModel.getLegalInsured(collectiveInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultCollective[0].fraccionamiento_boolean_colectivo === 1) {
            primaNetaColectivo = primaNetaColectivo / resultCollective[0].numero_pago_colectivo;
            primaNetaColectivo = primaNetaColectivo.toFixed(2);
            primaNetaColectivo = Number(primaNetaColectivo);
            primaNetaColectivo = convertNumberToString(primaNetaColectivo);
        } else if (resultCollective[0].fraccionamiento_boolean_colectivo === 0) {
            primaNetaColectivo = convertNumberToString(primaNetaColectivo);
        }
        try {
            let {
                fraccionamiento_boolean_colectivo: fraccionamientoBoolean,
                prima_neta_colectivo: montoPrimaNeta,
                igtf_colectivo: montoIgtf,
                prima_total_colectivo: montoPrimaTotal,
                deducible_colectivo: montoDeducible,
                cobertura_suma_asegurada_colectivo: montoCoberturaSumaAsegurada,
                nombre_agente_propio: nombreCompletoAgente,
                fecha_desde_colectivo: fechaPolizaDesde,
                fecha_hasta_colectivo: fechaPolizaHasta,
                detalle_cliente_colectivo: fechaDetalleCliente,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            const tipoColectivo = 'SALUD';
            const estatusPoliza = 'ACTIVA';
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoCoberturaSumaAsegurada = montoCoberturaSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            if (montoCoberturaSumaAsegurada === '') {
                montoCoberturaSumaAsegurada = 0;
            } else {
                montoCoberturaSumaAsegurada = convertStringToNumber(montoCoberturaSumaAsegurada);
            }
            fechaPolizaDesde = new Date(fechaPolizaDesde);
            fechaPolizaHasta = new Date(fechaPolizaHasta);
            fechaDetalleCliente = new Date(fechaDetalleCliente);
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            const collective = await collectiveModel.postCollectiveHealthForm(fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoCoberturaSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoColectivo, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                await collectiveOwnAgentModel.postCollectiveOwnAgent(collective.insertId, idAgentePropio);
            }
            const caa = await collectiveInsurerInsuredModel.postCollectiveInsurer(nombreAseguradora, collective.insertId);
            for (const nombreCompletoEjecutivo of arrayEjecutivo) {
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
                await colInsuInsuredExecModel.postColInsuInsuredExecutive(caa.insertId, idEjecutivo[0].id_ejecutivo);
            }
            res.redirect('/sistema/add-health-collective');
        } catch (error) {
            console.log(error);
            res.render('healthCollectiveForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-health-collective',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaColectivo,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postVehicleCollectiveForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultCollective = await collectiveModel.getCollectiveLast();
        if (resultCollective.length === 0) {
            resultCollective = [{}];
        }
        let resultOwnAgent = [];
        let primaNetaColectivo = resultCollective[0].prima_neta_colectivo;
        let nameRazonInsured = '';
        const resultcollectiveOwnAgent = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultCollective[0].id_colectivo);
        if (resultcollectiveOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultcollectiveOwnAgent[0].agente_propio_id);
        }
        let collectiveInsurerInsured = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
        if (collectiveInsurerInsured.length === 0) {
            collectiveInsurerInsured = [{}];
        }
        const resultInsurer = await insurerModel.getInsurer(collectiveInsurerInsured[0].aseguradora_id);
        if ((collectiveInsurerInsured[0].asegurado_per_jur_id === null) && (collectiveInsurerInsured[0].asegurado_per_nat_id !== null)) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(collectiveInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else if ((collectiveInsurerInsured[0].asegurado_per_jur_id !== null) && (collectiveInsurerInsured[0].asegurado_per_nat_id === null)) {
            const resultLegalInsured = await insuredModel.getLegalInsured(collectiveInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultCollective[0].fraccionamiento_boolean_colectivo === 1) {
            primaNetaColectivo = primaNetaColectivo / resultCollective[0].numero_pago_colectivo;
            primaNetaColectivo = primaNetaColectivo.toFixed(2);
            primaNetaColectivo = Number(primaNetaColectivo);
            primaNetaColectivo = convertNumberToString(primaNetaColectivo);
        } else if (resultCollective[0].fraccionamiento_boolean_colectivo === 0) {
            primaNetaColectivo = convertNumberToString(primaNetaColectivo);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_colectivo: tomadorAsegurado,
                fraccionamiento_boolean_colectivo: fraccionamientoBoolean,
                prima_neta_colectivo: montoPrimaNeta,
                igtf_colectivo: montoIgtf,
                prima_total_colectivo: montoPrimaTotal,
                deducible_colectivo: montoDeducible,
                nombre_agente_propio: nombreCompletoAgente,
                fecha_desde_colectivo: fechaPolizaDesde,
                fecha_hasta_colectivo: fechaPolizaHasta,
                detalle_cliente_colectivo: fechaDetalleCliente,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoColectivo = 'AUTOMÓVIL';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            fechaPolizaDesde = new Date(fechaPolizaDesde);
            fechaPolizaHasta = new Date(fechaPolizaHasta);
            fechaDetalleCliente = new Date(fechaDetalleCliente);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            const collective = await collectiveModel.postCollectiveForm(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                await collectiveOwnAgentModel.postCollectiveOwnAgent(collective.insertId, idAgentePropio);
            }
            const caa = await collectiveInsurerInsuredModel.postCollectiveInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, collective.insertId);
            for (const nombreCompletoEjecutivo of arrayEjecutivo) {
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
                await colInsuInsuredExecModel.postColInsuInsuredExecutive(caa.insertId, idEjecutivo[0].id_ejecutivo);
            }
            res.redirect('/sistema/add-vehicle-collective');
        } catch (error) {
            console.log(error);
            res.render('vehicleCollectiveForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-vehicle-collective',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaColectivo,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postRiskDiverseCollectiveForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultCollective = await collectiveModel.getCollectiveLast();
        if (resultCollective.length === 0) {
            resultCollective = [{}];
        }
        let resultOwnAgent = [];
        let primaNetaColectivo = resultCollective[0].prima_neta_colectivo;
        let nameRazonInsured = '';
        const resultcollectiveOwnAgent = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultCollective[0].id_colectivo);
        if (resultcollectiveOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultcollectiveOwnAgent[0].agente_propio_id);
        }
        let collectiveInsurerInsured = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
        if (collectiveInsurerInsured.length === 0) {
            collectiveInsurerInsured = [{}];
        }
        const resultInsurer = await insurerModel.getInsurer(collectiveInsurerInsured[0].aseguradora_id);
        if ((collectiveInsurerInsured[0].asegurado_per_jur_id === null) && (collectiveInsurerInsured[0].asegurado_per_nat_id !== null)) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(collectiveInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else if ((collectiveInsurerInsured[0].asegurado_per_jur_id !== null) && (collectiveInsurerInsured[0].asegurado_per_nat_id === null)) {
            const resultLegalInsured = await insuredModel.getLegalInsured(collectiveInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultCollective[0].fraccionamiento_boolean_colectivo === 1) {
            primaNetaColectivo = primaNetaColectivo / resultCollective[0].numero_pago_colectivo;
            primaNetaColectivo = primaNetaColectivo.toFixed(2);
            primaNetaColectivo = Number(primaNetaColectivo);
            primaNetaColectivo = convertNumberToString(primaNetaColectivo);
        } else if (resultCollective[0].fraccionamiento_boolean_colectivo === 0) {
            primaNetaColectivo = convertNumberToString(primaNetaColectivo);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_colectivo: tomadorAsegurado,
                fraccionamiento_boolean_colectivo: fraccionamientoBoolean,
                prima_neta_colectivo: montoPrimaNeta,
                igtf_colectivo: montoIgtf,
                prima_total_colectivo: montoPrimaTotal,
                deducible_colectivo: montoDeducible,
                nombre_agente_propio: nombreCompletoAgente,
                fecha_desde_colectivo: fechaPolizaDesde,
                fecha_hasta_colectivo: fechaPolizaHasta,
                detalle_cliente_colectivo: fechaDetalleCliente,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoColectivo = 'RIESGOS DIVERSOS';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            fechaPolizaDesde = new Date(fechaPolizaDesde);
            fechaPolizaHasta = new Date(fechaPolizaHasta);
            fechaDetalleCliente = new Date(fechaDetalleCliente);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            const collective = await collectiveModel.postCollectiveForm(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                await collectiveOwnAgentModel.postCollectiveOwnAgent(collective.insertId, idAgentePropio);
            }
            const caa = await collectiveInsurerInsuredModel.postCollectiveInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, collective.insertId);
            for (const nombreCompletoEjecutivo of arrayEjecutivo) {
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
                await colInsuInsuredExecModel.postColInsuInsuredExecutive(caa.insertId, idEjecutivo[0].id_ejecutivo);
            }
            res.redirect('/sistema/add-risk-diverse-collective');
        } catch (error) {
            console.log(error);
            res.render('riskDiverseCollectiveForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-risk-diverse-collective',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaColectivo,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
/*                  PUT                  */
    putHealthCollective: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idCollective = req.params.id;
        if (idCollective.match(valoresAceptados)) {
            const insurers = await insurerModel.getInsurers();
            const resultsExecutives = await executiveModel.getExecutives();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            const resultsLegalInsureds = await insuredModel.getLegalInsureds();
            const resultsCollective = await collectiveModel.getCollectivesNumbers();
            const resultsReceipts = await receiptModel.getReceipts();
            const resultCollective = await collectiveModel.getCollective(idCollective);
            const fechaDesdeColectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
            const fechaHastaColectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
            const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
            const resultCollectiveOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
            const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
            const resultsCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCII[0].id_caa);
            let executives = [];
            let resultOwnAgent = [];
            let fechaDetalleCliente = resultCollective[0].detalle_cliente_colectivo;
            let montoPrimaNeta = resultCollective[0].prima_neta_colectivo;
            let montoIgtf = resultCollective[0].igtf_colectivo;
            let montoPrimaTotal = resultCollective[0].prima_total_colectivo;
            let montoCoberturaSumaAsegurada = resultCollective[0].cobertura_suma_asegurada_colectivo;
            let montoDeducible = resultCollective[0].deducible_colectivo;
            montoPrimaNeta = convertNumberToString(montoPrimaNeta);
            montoIgtf = convertNumberToString(montoIgtf);
            montoPrimaTotal = convertNumberToString(montoPrimaTotal);
            montoDeducible = convertNumberToString(montoDeducible);
            montoCoberturaSumaAsegurada = convertNumberToString(montoCoberturaSumaAsegurada);
            montoPrimaNeta = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoPrimaNeta);
            montoIgtf = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoIgtf);
            montoPrimaTotal = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoPrimaTotal);
            montoDeducible = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoDeducible);
            montoCoberturaSumaAsegurada = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoCoberturaSumaAsegurada);
            if (fechaDetalleCliente === null) {
                fechaDetalleCliente = '';
            } else {
                fechaDetalleCliente = fechaDetalleCliente.toISOString().substring(0, 10);
            }
            if (resultCollectiveOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultCollectiveOA[0].agente_propio_id);
            }
            for (const resultCIIE of resultsCIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultCIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            res.render('editCollectiveHealth', {
                fechaDesdeColectivo,
                fechaHastaColectivo,
                fechaDetalleCliente,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoDeducible,
                montoCoberturaSumaAsegurada,
                insurers,
                collective: resultCollective[0],
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putVehicleCollective: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idCollective = req.params.id;
        if (idCollective.match(valoresAceptados)) {
            const insurers = await insurerModel.getInsurers();
            const resultsExecutives = await executiveModel.getExecutives();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            const resultsLegalInsureds = await insuredModel.getLegalInsureds();
            const resultsCollective = await collectiveModel.getCollectivesNumbers();
            const resultsReceipts = await receiptModel.getReceipts();
            const resultCollective = await collectiveModel.getCollective(idCollective);
            const fechaDesdeColectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
            const fechaHastaColectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
            const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
            const resultCollectiveOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
            const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
            const resultsCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCII[0].id_caa);
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let montoPrimaNeta = resultCollective[0].prima_neta_colectivo;
            let montoIgtf = resultCollective[0].igtf_colectivo;
            let montoPrimaTotal = resultCollective[0].prima_total_colectivo;
            let montoDeducible = resultCollective[0].deducible_colectivo;
            montoPrimaNeta = convertNumberToString(montoPrimaNeta);
            montoIgtf = convertNumberToString(montoIgtf);
            montoPrimaTotal = convertNumberToString(montoPrimaTotal);
            montoDeducible = convertNumberToString(montoDeducible);
            montoPrimaNeta = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoPrimaNeta);
            montoIgtf = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoIgtf);
            montoPrimaTotal = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoPrimaTotal);
            montoDeducible = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoDeducible);
            if (resultCollectiveOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultCollectiveOA[0].agente_propio_id);
            }
            if (resultCII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
            }
            for (const resultCIIE of resultsCIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultCIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            res.render('editCollectiveVehicle', {
                fechaDesdeColectivo,
                fechaHastaColectivo,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoDeducible,
                insurers,
                collective: resultCollective[0],
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putRiskDiverseCollective: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idCollective = req.params.id;
        if (idCollective.match(valoresAceptados)) {
            const insurers = await insurerModel.getInsurers();
            const resultsExecutives = await executiveModel.getExecutives();
            const resultsOwnAgents = await ownAgentModel.getOwnAgents();
            const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            const resultsLegalInsureds = await insuredModel.getLegalInsureds();
            const resultsCollective = await collectiveModel.getCollectivesNumbers();
            const resultsReceipts = await receiptModel.getReceipts();
            const resultCollective = await collectiveModel.getCollective(idCollective);
            const fechaDesdeColectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
            const fechaHastaColectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
            const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
            const resultCollectiveOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
            const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
            const resultsCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCII[0].id_caa);
            let resultInsuredNatural = [];
            let resultInsuredLegal = [];
            let executives = [];
            let resultOwnAgent = [];
            let montoPrimaNeta = resultCollective[0].prima_neta_colectivo;
            let montoIgtf = resultCollective[0].igtf_colectivo;
            let montoPrimaTotal = resultCollective[0].prima_total_colectivo;
            let montoDeducible = resultCollective[0].deducible_colectivo;
            montoPrimaNeta = convertNumberToString(montoPrimaNeta);
            montoIgtf = convertNumberToString(montoIgtf);
            montoPrimaTotal = convertNumberToString(montoPrimaTotal);
            montoDeducible = convertNumberToString(montoDeducible);
            montoPrimaNeta = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoPrimaNeta);
            montoIgtf = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoIgtf);
            montoPrimaTotal = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoPrimaTotal);
            montoDeducible = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoDeducible);
            if (resultCollectiveOA.length > 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultCollectiveOA[0].agente_propio_id);
            }
            if (resultCII[0].asegurado_per_jur_id === null) {
                resultInsuredNatural = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
            } else {
                resultInsuredLegal = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
            }
            for (const resultCIIE of resultsCIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultCIIE.ejecutivo_id);
                executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
            }
            res.render('editCollectiveRiskDiverse', {
                fechaDesdeColectivo,
                fechaHastaColectivo,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoDeducible,
                insurers,
                collective: resultCollective[0],
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    updateHealthCollective: async (req, res) => {
        const idCollective = req.body.id_colectivo;
        const insurers = await insurerModel.getInsurers();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultCollective = await collectiveModel.getCollective(idCollective);
        const fechaDesdeColectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
        const fechaHastaColectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
        const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
        const resultCollectiveOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
        const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
        const resultsCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCII[0].id_caa);
        let executives = [];
        let resultOwnAgent = [];
        let fechaDetalleCliente = resultCollective[0].detalle_cliente_colectivo;
        let montoPrimaNeta = resultCollective[0].prima_neta_colectivo;
        let montoIgtf = resultCollective[0].igtf_colectivo;
        let montoPrimaTotal = resultCollective[0].prima_total_colectivo;
        let montoCoberturaSumaAsegurada = resultCollective[0].cobertura_suma_asegurada_colectivo;
        let montoDeducible = resultCollective[0].deducible_colectivo;
        montoPrimaNeta = convertNumberToString(montoPrimaNeta);
        montoIgtf = convertNumberToString(montoIgtf);
        montoPrimaTotal = convertNumberToString(montoPrimaTotal);
        montoDeducible = convertNumberToString(montoDeducible);
        montoCoberturaSumaAsegurada = convertNumberToString(montoCoberturaSumaAsegurada);
        montoPrimaNeta = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoPrimaNeta);
        montoIgtf = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoIgtf);
        montoPrimaTotal = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoPrimaTotal);
        montoDeducible = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoDeducible);
        montoCoberturaSumaAsegurada = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoCoberturaSumaAsegurada);
        if (fechaDetalleCliente === null) {
            fechaDetalleCliente = '';
        } else {
            fechaDetalleCliente = fechaDetalleCliente.toISOString().substring(0, 10);
        }
        if (resultCollectiveOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultCollectiveOA[0].agente_propio_id);
        }
        for (const resultCIIE of resultsCIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultCIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        try {
            let {
                fraccionamiento_boolean_colectivo: fraccionamientoBoolean,
                prima_neta_colectivo: montoPrimaNeta,
                igtf_colectivo: montoIgtf,
                prima_total_colectivo: montoPrimaTotal,
                deducible_colectivo: montoDeducible,
                cobertura_suma_asegurada_colectivo: montoCoberturaSumaAsegurada,
                nombre_agente_propio: nombreCompletoAgente,
                fecha_desde_colectivo: fechaPolizaDesde,
                fecha_hasta_colectivo: fechaPolizaHasta,
                detalle_cliente_colectivo: fechaDetalleCliente,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            const tipoColectivo = 'SALUD';
            const estatusPoliza = 'ACTIVA';
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoCoberturaSumaAsegurada = montoCoberturaSumaAsegurada.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            if (montoCoberturaSumaAsegurada === '') {
                montoCoberturaSumaAsegurada = 0;
            } else {
                montoCoberturaSumaAsegurada = convertStringToNumber(montoCoberturaSumaAsegurada);
            }
            fechaPolizaDesde = new Date(fechaPolizaDesde);
            fechaPolizaHasta = new Date(fechaPolizaHasta);
            fechaDetalleCliente = new Date(fechaDetalleCliente);
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            await collectiveModel.updateCollectiveHealth(fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, montoCoberturaSumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, fechaDetalleCliente, tipoColectivo, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                const resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
                if (resultCOA.length === 0) {
                    await collectiveOwnAgentModel.postCollectiveOwnAgent(idCollective, idAgentePropio);
                } else {
                    await collectiveOwnAgentModel.updateCollectiveOwnAgent(idCollective, idAgentePropio);
                } 
            } else {
                const resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
                if (resultCOA.length !== 0) {
                    const disableCAP = 1;
                    await collectiveOwnAgentModel.disableCollectiveOwnAgent(idCollective, disableCAP);
                }
            }
            await collectiveInsurerInsuredModel.updateCollectiveInsurer(nombreAseguradora, idCollective);
            const resultCAA = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
            const resultCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCAA[0].id_caa);
            for (let index = 0; index < arrayEjecutivo.length; index++) {
                const nombreCompletoEjecutivo = arrayEjecutivo[index];
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
                await colInsuInsuredExecModel.updateColInsuInsuredExecutive(resultCIIE[index].id_caae, idEjecutivo[0].id_ejecutivo);
            }
            res.render('editCollectiveHealth', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-collective-health/${idCollective}`,
                fechaDesdeColectivo,
                fechaHastaColectivo,
                fechaDetalleCliente,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoDeducible,
                montoCoberturaSumaAsegurada,
                insurers,
                collective: resultCollective[0],
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('editCollectiveHealth', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-collective-health/${idCollective}`,
                fechaDesdeColectivo,
                fechaHastaColectivo,
                fechaDetalleCliente,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoDeducible,
                montoCoberturaSumaAsegurada,
                insurers,
                collective: resultCollective[0],
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updateVehicleCollective: async (req, res) => {
        const idCollective = req.body.id_colectivo;
        const insurers = await insurerModel.getInsurers();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultCollective = await collectiveModel.getCollective(idCollective);
        const fechaDesdeColectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
        const fechaHastaColectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
        const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
        const resultCollectiveOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
        const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
        const resultsCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCII[0].id_caa);
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let montoPrimaNeta = resultCollective[0].prima_neta_colectivo;
        let montoIgtf = resultCollective[0].igtf_colectivo;
        let montoPrimaTotal = resultCollective[0].prima_total_colectivo;
        let montoDeducible = resultCollective[0].deducible_colectivo;
        montoPrimaNeta = convertNumberToString(montoPrimaNeta);
        montoIgtf = convertNumberToString(montoIgtf);
        montoPrimaTotal = convertNumberToString(montoPrimaTotal);
        montoDeducible = convertNumberToString(montoDeducible);
        montoPrimaNeta = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoPrimaNeta);
        montoIgtf = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoIgtf);
        montoPrimaTotal = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoPrimaTotal);
        montoDeducible = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoDeducible);
        if (resultCollectiveOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultCollectiveOA[0].agente_propio_id);
        }
        if (resultCII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
        }
        for (const resultCIIE of resultsCIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultCIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_colectivo: tomadorAsegurado,
                fraccionamiento_boolean_colectivo: fraccionamientoBoolean,
                prima_neta_colectivo: montoPrimaNeta,
                igtf_colectivo: montoIgtf,
                prima_total_colectivo: montoPrimaTotal,
                deducible_colectivo: montoDeducible,
                nombre_agente_propio: nombreCompletoAgente,
                fecha_desde_colectivo: fechaPolizaDesde,
                fecha_hasta_colectivo: fechaPolizaHasta,
                detalle_cliente_colectivo: fechaDetalleCliente,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoColectivo = 'AUTOMÓVIL';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            fechaPolizaDesde = new Date(fechaPolizaDesde);
            fechaPolizaHasta = new Date(fechaPolizaHasta);
            fechaDetalleCliente = new Date(fechaDetalleCliente);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            await collectiveModel.updateCollective(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                const resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
                if (resultCOA.length === 0) {
                    await collectiveOwnAgentModel.postCollectiveOwnAgent(idCollective, idAgentePropio);
                } else {
                    await collectiveOwnAgentModel.updateCollectiveOwnAgent(idCollective, idAgentePropio);
                } 
            } else {
                const resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
                if (resultCOA.length !== 0) {
                    const disableCAP = 1;
                    await collectiveOwnAgentModel.disableCollectiveOwnAgent(idCollective, disableCAP);
                }
            }
            await collectiveInsurerInsuredModel.updateCollectiveInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, idCollective);
            const resultCAA = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
            const resultCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCAA[0].id_caa);
            for (let index = 0; index < arrayEjecutivo.length; index++) {
                const nombreCompletoEjecutivo = arrayEjecutivo[index];
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
                await colInsuInsuredExecModel.updateColInsuInsuredExecutive(resultCIIE[index].id_caae, idEjecutivo[0].id_ejecutivo);
            }
            res.render('editCollectiveVehicle', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-collective-vehicle/${idCollective}`,
                fechaDesdeColectivo,
                fechaHastaColectivo,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoDeducible,
                insurers,
                collective: resultCollective[0],
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('editCollectiveVehicle', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-collective-vehicle/${idCollective}`,
                fechaDesdeColectivo,
                fechaHastaColectivo,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoDeducible,
                insurers,
                collective: resultCollective[0],
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updateRiskDiverseCollective: async (req, res) => {
        const idCollective = req.body.id_colectivo;
        const insurers = await insurerModel.getInsurers();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultCollective = await collectiveModel.getCollective(idCollective);
        const fechaDesdeColectivo = resultCollective[0].fecha_desde_colectivo.toISOString().substring(0, 10);
        const fechaHastaColectivo = resultCollective[0].fecha_hasta_colectivo.toISOString().substring(0, 10);
        const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
        const resultCollectiveOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
        const resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
        const resultsCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCII[0].id_caa);
        let resultInsuredNatural = [];
        let resultInsuredLegal = [];
        let executives = [];
        let resultOwnAgent = [];
        let montoPrimaNeta = resultCollective[0].prima_neta_colectivo;
        let montoIgtf = resultCollective[0].igtf_colectivo;
        let montoPrimaTotal = resultCollective[0].prima_total_colectivo;
        let montoDeducible = resultCollective[0].deducible_colectivo;
        montoPrimaNeta = convertNumberToString(montoPrimaNeta);
        montoIgtf = convertNumberToString(montoIgtf);
        montoPrimaTotal = convertNumberToString(montoPrimaTotal);
        montoDeducible = convertNumberToString(montoDeducible);
        montoPrimaNeta = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoPrimaNeta);
        montoIgtf = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoIgtf);
        montoPrimaTotal = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoPrimaTotal);
        montoDeducible = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, montoDeducible);
        if (resultCollectiveOA.length > 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultCollectiveOA[0].agente_propio_id);
        }
        if (resultCII[0].asegurado_per_jur_id === null) {
            resultInsuredNatural = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
        } else {
            resultInsuredLegal = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
        }
        for (const resultCIIE of resultsCIIE) {
            const resultExecutive = await executiveModel.getExecutive(resultCIIE.ejecutivo_id);
            executives.push(`${resultExecutive[0].nombre_ejecutivo} ${resultExecutive[0].apellido_ejecutivo}`);
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                tomador_asegurado_colectivo: tomadorAsegurado,
                fraccionamiento_boolean_colectivo: fraccionamientoBoolean,
                prima_neta_colectivo: montoPrimaNeta,
                igtf_colectivo: montoIgtf,
                prima_total_colectivo: montoPrimaTotal,
                deducible_colectivo: montoDeducible,
                nombre_agente_propio: nombreCompletoAgente,
                fecha_desde_colectivo: fechaPolizaDesde,
                fecha_hasta_colectivo: fechaPolizaHasta,
                detalle_cliente_colectivo: fechaDetalleCliente,
                nombre_ejecutivo_coordinador: nombreEjecutivoCoordinador,
                nombre_ejecutivo_suscripcion: nombreEjecutivoSuscripcion,
                nombre_ejecutivo_siniestros: nombreEjecutivoSiniestros,
                nombre_ejecutivo_cobranzas: nombreEjecutivoCobranzas,
                nombre_aseguradora: nombreAseguradora
            } = req.body;
            let arrayEjecutivo = [];
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            const tipoColectivo = 'RIESGOS DIVERSOS';
            const estatusPoliza = 'ACTIVA';
            tomadorAsegurado = tomadorAsegurado ? 1 : 0;
            fraccionamientoBoolean = fraccionamientoBoolean ? 1 : 0;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoDeducible = montoDeducible.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoDeducible = convertStringToNumber(montoDeducible);
            fechaPolizaDesde = new Date(fechaPolizaDesde);
            fechaPolizaHasta = new Date(fechaPolizaHasta);
            fechaDetalleCliente = new Date(fechaDetalleCliente);
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (nombreCompletoAgente === undefined) {
                nombreCompletoAgente = '';
            }
            arrayEjecutivo = [nombreEjecutivoCoordinador, nombreEjecutivoSuscripcion, nombreEjecutivoSiniestros, nombreEjecutivoCobranzas];
            await collectiveModel.updateCollective(tomadorAsegurado, fraccionamientoBoolean, montoPrimaNeta, montoIgtf, montoPrimaTotal, montoDeducible, fechaPolizaDesde, fechaPolizaHasta, tipoColectivo, estatusPoliza, req.body);
            if (nombreCompletoAgente !== '') {
                const nombresAgentePropio = separateNameSurname(nombreCompletoAgente);
                const idAgentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio.names, nombresAgentePropio.surnames);
                const resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
                if (resultCOA.length === 0) {
                    await collectiveOwnAgentModel.postCollectiveOwnAgent(idCollective, idAgentePropio);
                } else {
                    await collectiveOwnAgentModel.updateCollectiveOwnAgent(idCollective, idAgentePropio);
                } 
            } else {
                const resultCOA = await collectiveOwnAgentModel.getCollectiveOwnAgent(idCollective);
                if (resultCOA.length !== 0) {
                    const disableCAP = 1;
                    await collectiveOwnAgentModel.disableCollectiveOwnAgent(idCollective, disableCAP);
                }
            }
            await collectiveInsurerInsuredModel.updateCollectiveInsurerInsured(cedulaAseguradoNatural, rifAseguradoJuridico, nombreAseguradora, idCollective);
            const resultCAA = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective);
            const resultCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCAA[0].id_caa);
            for (let index = 0; index < arrayEjecutivo.length; index++) {
                const nombreCompletoEjecutivo = arrayEjecutivo[index];
                const nombresCompletoEjecutivo = separateNameSurname(nombreCompletoEjecutivo);
                const idEjecutivo = await executiveModel.getExecutiveId(nombresCompletoEjecutivo.names, nombresCompletoEjecutivo.surnames);
                await colInsuInsuredExecModel.updateColInsuInsuredExecutive(resultCIIE[index].id_caae, idEjecutivo[0].id_ejecutivo);
            }
            res.render('editCollectiveRiskDiverse', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-collective-risk-diverse/${idCollective}`,
                fechaDesdeColectivo,
                fechaHastaColectivo,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoDeducible,
                insurers,
                collective: resultCollective[0],
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('editCollectiveRiskDiverse', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-collective-risk-diverse/${idCollective}`,
                fechaDesdeColectivo,
                fechaHastaColectivo,
                montoPrimaNeta,
                montoIgtf,
                montoPrimaTotal,
                montoDeducible,
                insurers,
                collective: resultCollective[0],
                insurer: resultInsurer[0],
                naturalInsureds: resultsNaturalInsureds,
                naturalInsured: resultInsuredNatural[0],
                legalInsureds: resultsLegalInsureds,
                legalInsured: resultInsuredLegal[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                executivesNames: executives,
                ownAgents: resultsOwnAgents,
                ownAgent: resultOwnAgent[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
/*               DELETE                  */
    disableCollective: async (req, res) => {
        const disableCollective = 1;
        const disableCollectiveInsurerInsured = 1;
        const disableReceiptCollective = 1;
        const disableCIIB = 1;
        const disableCIIV = 1;
        const disableCIIRD = 1;
        const disableCIIE = 1;
        const disableCAP = 1;
        await collectiveModel.updateDisableCollective(req.params.id, req.body);
        await collectiveModel.disableCollective(req.params.id, disableCollective);
        await collectiveOwnAgentModel.disableCollectiveOwnAgent(req.params.id, disableCAP);
        await receiptModel.disableReceiptCollective(req.params.id, disableReceiptCollective);
        const disableCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(req.params.id);
        const resultCIIB = await colInsInsurerBenef.getColInsuInsuredBenef(disableCII[0].id_caa);
        const resultCIIV = await colInsInsurerVehi.getColInsuInsuredVehi(disableCII[0].id_caa);
        const resultCIIRD = await colInsInsurerRiskDiver.getColInsuInsuredRiesDiver(disableCII[0].id_caa);
        const resultCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(disableCII[0].id_caa);
        for (const itemCIIE of resultCIIE) {
            await colInsuInsuredExecModel.disableColInsuInsuredExecutive(itemCIIE.id_caae, disableCIIE);
        }
        if ((resultCIIV.length === 0) && (resultCIIRD.length === 0)) {
            resultCIIB.forEach(async ciib => {
                await colInsInsurerBenef.disableColInsuInsuredBenef(ciib.id_caab, disableCIIB);
            });
        } else if ((resultCIIB.length === 0) && (resultCIIRD.length === 0)) {
            resultCIIV.forEach(async ciiv => {
                await colInsInsurerVehi.disableColInsuInsuredVehi(ciiv.id_caav, disableCIIV);
            });
        } else if ((resultCIIB.length === 0) && (resultCIIV.length === 0)) {
            resultCIIRD.forEach(async ciird => {
                await colInsInsurerRiskDiver.disableColInsuInsuredRiesDiver(ciird.id_caard, disableCIIRD);
            });
        }
        await collectiveInsurerInsuredModel.disableCollectiveInsurerInsured(req.params.id, disableCollectiveInsurerInsured);
        res.redirect('/sistema/collectives');
    }
}