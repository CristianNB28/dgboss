const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const riskDiverseModel = require('../models/risk_diverse');
const colInsInsurerRiskDiverModel = require('../models/col_insu_insured_ries_diver');
const xlsx = require('xlsx');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postRiskDiverseForm: async (req, res) => {
        const workbook = xlsx.readFile(req.file.path, {
            type: 'binary',
            cellDates: true,
            cellNF: false,
            cellText: false
        });
        const workbookSheets = workbook.SheetNames;
        const sheet = workbookSheets[0];
        const dataExcel = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
        for (const itemFile of dataExcel) {
            let fileNomRazon = itemFile['Nombre o Razón Social'];
            let fileIdRif = itemFile['Cedula o Rif'];
            let fileAddress = itemFile['Dirección'];
            let filePhone = itemFile['Teléfono'];
            let fileSumInsured = itemFile['Suma Asegurada'];
            let cedulaArchivo = '';
            let rifArchivo = '';
            let idCollective = await collectiveModel.getCollectiveLast();
            fileIdRif = fileIdRif.toString();
            if ((fileIdRif.startsWith('J')) || (fileIdRif.startsWith('G'))) {
                rifArchivo = fileIdRif;
            } else {
                cedulaArchivo = fileIdRif;
            }
            let riskDiserve = await riskDiverseModel.postRiskDiverseForm(fileNomRazon, fileAddress, filePhone, fileSumInsured, cedulaArchivo, rifArchivo, req.body, itemFile);
            let collectiveInsurerInsured =  await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective[0].id_colectivo);
            await colInsInsurerRiskDiverModel.postColInsuInsuredRiesDiver(collectiveInsurerInsured[0].id_caa, riskDiserve.insertId);
        }
        res.redirect('/sistema/add-risk-diverse-collective');
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
            sumaAsegurada = new Intl.NumberFormat('de-DE').format(sumaAsegurada);
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