// Models
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const riskDiverseModel = require('../models/risk_diverse');
const colInsInsurerRiskDiverModel = require('../models/col_insu_insured_ries_diver');
const collectiveOwnAgentModel = require('../models/collective_own_agent');
const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const receiptModel = require('../models/receipt');
const executiveModel = require('../models/executive');
const ownAgentModel = require('../models/own_agent');
// Serializers
const convertStringToNumber = require('../serializers/convertStringToNumber');
const convertNumberToString = require('../serializers/convertNumberToString');

const xlsx = require('xlsx');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postRiskDiverseForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultCollective = await collectiveModel.getCollectiveLast();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultOwnAgent = [];
        let primaNetaColectivo = resultCollective[0].prima_neta_colectivo;
        let nameRazonInsured = '';
        const resultcollectiveOwnAgent = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultCollective[0].id_colectivo);
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
        } else if (resultCollective[0].fraccionamiento_boolean_colectivo === 0) {
            primaNetaColectivo = convertNumberToString(primaNetaColectivo);
        }
        try {
            const urlFile = req.file.path;
            const fileExtension =
                urlFile.substring(urlFile.lastIndexOf('.') + 1, urlFile.length) || urlFile;
            const workbook = xlsx.readFile(req.file.path, {
                type: 'binary',
                cellDates: true,
                cellNF: false,
                cellText: false,
                raw: true
            });
            if (fileExtension === 'csv') {
                const workbookSheets = workbook.SheetNames;
                const sheet = workbookSheets[0];
                const dataExcel = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
                const temparrayRiskDiverse = [];
                let temparray, chunk = dataExcel.length;
                let cedulaArchivo = '';
                let rifArchivo = '';
                temparray = dataExcel.slice(0, 0 + chunk).map(data => {
                    data['Cedula o Rif'] = data['Cedula o Rif'].toString();
                    if ((data['Cedula o Rif'].startsWith('J')) || (data['Cedula o Rif'].startsWith('G'))) {
                        rifArchivo = data['Cedula o Rif'];
                        cedulaArchivo = null;
                    } else {
                        if (typeof(data['Cedula o Rif']) === 'string') {
                            cedulaArchivo = data['Cedula o Rif'];
                            rifArchivo = null;
                        } else {
                            const exp = /(\d)(?=(\d{3})+(?!\d))/g;
                            const rep = '$1.';
                            let arr = data['Cedula o Rif'].toString().split('.');
                            arr[0] = arr[0].replace(exp,rep);
                            cedulaArchivo = arr[0];
                            rifArchivo = null;
                        }
                    }
                    data['Suma Asegurada'] = String(data['Suma Asegurada']);
                    data['Suma Asegurada'] = convertStringToNumber(data['Suma Asegurada']);
                    data['Suma Asegurada'] = data['Suma Asegurada'].toFixed(2);
                    return [
                            data['Número de certificado'], 
                            data['Nombre o Razón Social'], 
                            cedulaArchivo,
                            rifArchivo,
                            data['Dirección'], 
                            data['Teléfono'],
                            data.Correo,
                            data['Suma Asegurada'],
                            data.Modelo,
                            data.Serial,
                            data['Estatus (Emisión, renovación, inclusión)']
                        ]
                });
                const riskDiserve = await riskDiverseModel.postRiskDiverseForm(temparray);
                const collectiveInsurerInsured =  await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
                for (let index = 0; index < temparray.length; index++) {
                    let riskDiverseId = riskDiserve.insertId + index;
                    temparrayRiskDiverse.push([collectiveInsurerInsured[0].id_caa, riskDiverseId]);
                }
                await colInsInsurerRiskDiverModel.postColInsuInsuredRiesDiver(temparrayRiskDiverse);
                res.redirect('/sistema/add-risk-diverse-collective');
            } else {
                throw new SyntaxError("Ingrese archivo de extensión .csv");
            }
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
    putRiskDiverse: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idRiskDiverse = req.params.id;
        if (idRiskDiverse.match(valoresAceptados)) {
            const resultRiskDiverse = await riskDiverseModel.getRiskDiverse(idRiskDiverse);
            const resultCIIRD = await colInsInsurerRiskDiverModel.getColInsuInsuredRiesDiverId(idRiskDiverse);
            const resultCII = await collectiveInsurerInsuredModel.getCollectiveId(resultCIIRD[0].caa_id);
            let sumaAsegurada = resultRiskDiverse[0].suma_asegurada_riesgo_diverso;
            sumaAsegurada = convertNumberToString(sumaAsegurada);
            res.render('editRiskDiverse', {
                sumaAsegurada,
                riskDiverse: resultRiskDiverse[0],
                idCollective: resultCII[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    updateRiskDiverse: async (req, res) => {
        const idRiskDiverse = req.body.id_riesgo_diverso;
        const resultRiskDiverse = await riskDiverseModel.getRiskDiverse(idRiskDiverse);
        const resultCIIRD = await colInsInsurerRiskDiverModel.getColInsuInsuredRiesDiverId(idRiskDiverse);
        const resultCII = await collectiveInsurerInsuredModel.getCollectiveId(resultCIIRD[0].caa_id);
        let sumaAsegurada = resultRiskDiverse[0].suma_asegurada_riesgo_diverso;
        sumaAsegurada = convertNumberToString(sumaAsegurada);
        try {
            let {
                suma_asegurada_riesgo_diverso: sumaAsegurada
            } = req.body;
            sumaAsegurada = convertStringToNumber(sumaAsegurada);
            await riskDiverseModel.updateRiskDiverse(sumaAsegurada, req.body);
            res.render('editRiskDiverse', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-risk-diverse/${idRiskDiverse}`,
                sumaAsegurada,
                riskDiverse: resultRiskDiverse[0],
                idCollective: resultCII[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('editRiskDiverse', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-risk-diverse/${idRiskDiverse}`,
                sumaAsegurada,
                riskDiverse: resultRiskDiverse[0],
                idCollective: resultCII[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
/*               DELETE                  */
    disableRiskDiverse: async (req, res) => {
        const disableCIIRD = 1;
        const disableRiskDiverse = 1;
        const resultCIIRD = await colInsInsurerRiskDiverModel.getColInsuInsuredRiesDiverId(req.params.id);
        const resultCII = await collectiveInsurerInsuredModel.getCollectiveId(resultCIIRD[0].caa_id);
        await colInsInsurerRiskDiverModel.disableColInsuInsuredRiesDiverId(req.params.id, disableCIIRD);
        await riskDiverseModel.updateDisableRiskDiverse(req.params.id, req.body);
        await riskDiverseModel.disableRiskDiverse(req.params.id, disableRiskDiverse);
        res.redirect(`/sistema/collectives-detail/${resultCII[0].colectivo_id}`);
    }
}