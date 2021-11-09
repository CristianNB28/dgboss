const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const riskDiverseModel = require('../models/risk_diverse');
const colInsInsurerRiskDiver = require('../models/col_insu_insured_ries_diver');
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
            await colInsInsurerRiskDiver.postColInsuInsuredRiesDiver(collectiveInsurerInsured[0].id_caa, riskDiserve.insertId);
        }
        res.redirect('/sistema/add-risk-diverse-collective');
    },
/*                  PUT                  */
/*               DELETE                  */
}