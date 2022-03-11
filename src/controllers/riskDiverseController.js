const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const riskDiverseModel = require('../models/risk_diverse');
const colInsInsurerRiskDiverModel = require('../models/col_insu_insured_ries_diver');
const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const receiptModel = require('../models/receipt');
const xlsx = require('xlsx');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postRiskDiverseForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsCollective = await collectiveModel.getCollectives();
        let resultsReceipts = await receiptModel.getReceipts();
        try {
            const urlFile = req.file.path;
            const fileExtension =
                urlFile.substring(urlFile.lastIndexOf('.') + 1, urlFile.length) || urlFile;
            const workbook = xlsx.readFile(req.file.path, {
                type: 'binary',
                cellDates: true,
                cellNF: false,
                cellText: false
            });
            if (fileExtension === 'csv') {
                const workbookSheets = workbook.SheetNames;
                const sheet = workbookSheets[0];
                const dataExcel = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
                let temparray, chunk = dataExcel.length;
                const temparrayRiskDiverse = [];
                let cedulaArchivo = '';
                let rifArchivo = '';
                let idCollective = await collectiveModel.getCollectiveLast();
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
                let riskDiserve = await riskDiverseModel.postRiskDiverseForm(temparray);
                let collectiveInsurerInsured =  await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective[0].id_colectivo);
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
                collectives: resultsCollective,
                receipts: resultsReceipts,
                name: req.session.name
            });
        }
    },
/*                  PUT                  */
    putRiskDiverse: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idRiskDiverse = req.params.id;
        if (idRiskDiverse.match(valoresAceptados)) {
            let resultRiskDiverse = await riskDiverseModel.getRiskDiverse(idRiskDiverse);
            let resultCIIRD = await colInsInsurerRiskDiverModel.getColInsuInsuredRiesDiverId(idRiskDiverse);
            let resultCII = await collectiveInsurerInsuredModel.getCollectiveId(resultCIIRD[0].caa_id);
            let sumaAsegurada = resultRiskDiverse[0].suma_asegurada_riesgo_diverso;
            sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            res.render('editRiskDiverse', {
                riskDiverse: resultRiskDiverse[0],
                idCollective: resultCII[0],
                sumaAsegurada: sumaAsegurada,
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updateRiskDiverse: async (req, res) => {
        let sumaAsegurada = req.body.suma_asegurada_riesgo_diverso;
        if ((sumaAsegurada.indexOf(',') !== -1) && (sumaAsegurada.indexOf('.') !== -1)) {
            sumaAsegurada = sumaAsegurada.replace(",", ".");
            sumaAsegurada = sumaAsegurada.replace(".", ",");
            sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
        } else if (sumaAsegurada.indexOf(',') !== -1) {
            sumaAsegurada = sumaAsegurada.replace(",", ".");
            sumaAsegurada = parseFloat(sumaAsegurada);
        } else if (sumaAsegurada.indexOf('.') !== -1) {
            sumaAsegurada = sumaAsegurada.replace(".", ",");
            sumaAsegurada = parseFloat(sumaAsegurada.replace(/,/g,''));
        }
        await riskDiverseModel.updateRiskDiverse(sumaAsegurada, req.body);
        res.redirect('/sistema');
    },
/*               DELETE                  */
    disableRiskDiverse: async (req, res) => {
        let disableCIIRD = 1;
        let disableRiskDiverse = 1;
        let resultCIIRD = await colInsInsurerRiskDiverModel.getColInsuInsuredRiesDiverId(req.params.id);
        let resultCII = await collectiveInsurerInsuredModel.getCollectiveId(resultCIIRD[0].caa_id);
        await colInsInsurerRiskDiverModel.disableColInsuInsuredRiesDiverId(req.params.id, disableCIIRD);
        await riskDiverseModel.updateDisableRiskDiverse(req.params.id, req.body);
        await riskDiverseModel.disableRiskDiverse(req.params.id, disableRiskDiverse);
        res.redirect(`/sistema/collectives-detail/${resultCII[0].colectivo_id}`);
    }
}