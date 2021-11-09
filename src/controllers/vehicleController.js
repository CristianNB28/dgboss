const vehicleModel = require('../models/vehicle');
const polInsuInsuredVehiModel = require('../models/pol_insu_insured_vehi');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const colInsInsurerVehi = require('../models/col_insu_insured_vehi');
const xlsx = require('xlsx');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postVehicleForm: async (req, res) => {
        let blindaje = req.body.blindaje_boolean_vehiculo ? 1 : 0;
        let cedulaConductor = '';
        let rifConductor = '';
        let yearVehicle = new Date(req.body.year_vehiculo)
        yearVehicle = yearVehicle.getUTCFullYear();
        if (((req.body.id_rif_conductor.startsWith('J')) || (req.body.id_rif_conductor.startsWith('G')) || (req.body.id_rif_conductor.startsWith('V')))) {
            rifConductor = req.body.id_rif_conductor;
        } else {
            cedulaConductor = req.body.id_rif_conductor;
        }
        let vehicle = await vehicleModel.postVehicleForm(blindaje, cedulaConductor, rifConductor, yearVehicle, req.body);
        await polInsuInsuredVehiModel.postPolInsuInsuredVehi(vehicle.insertId);
        res.redirect('/sistema/add-vehicle-policy');
    },
    postVehicleCollectiveForm: async (req, res) => {
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
            let fileVersion = itemFile['Versión'];
            let fileTransmission = itemFile['Transmisión'];
            let fileShield = itemFile['Blindaje'];
            let fileBody = itemFile['Carrocería'];
            let fileYear = itemFile['Año'];
            let fileVehicleType = itemFile['Tipo de Vehículo'];
            let fileSumInsured = itemFile['Suma Asegurada'];
            let fileSerialEngine = itemFile['Serial del Motor'];
            let idCollective = await collectiveModel.getCollectiveLast();
            if (fileShield === 'Si') {
                fileShield = 1;
            } else {
                fileShield = 0;
            }
            fileYear = fileYear.toString();
            fileYear = new Date(fileYear);
            fileYear = fileYear.getUTCFullYear();
            let vehicle = await vehicleModel.postVehicleCollectiveForm(fileVersion, fileTransmission, fileShield, fileBody, fileYear, fileVehicleType, fileSumInsured, fileSerialEngine, req.body, itemFile);
            let collectiveInsurerInsured =  await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective[0].id_colectivo);
            await colInsInsurerVehi.postColInsuInsuredVehi(collectiveInsurerInsured[0].id_caa, vehicle.insertId);
        }
        res.redirect('/sistema/add-vehicle-collective');
    },
/*                  PUT                  */
/*               DELETE                  */
}