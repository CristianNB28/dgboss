const vehicleModel = require('../models/vehicle');
const polInsuInsuredVehiModel = require('../models/pol_insu_insured_vehi');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const colInsInsurerVehiModel = require('../models/col_insu_insured_vehi');
const xlsx = require('xlsx');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postVehicleForm: async (req, res) => {
        let blindaje = req.body.blindaje_boolean_vehiculo ? 1 : 0;
        let cedulaConductor = '';
        let rifConductor = '';
        let gradoBlindaje = parseInt(req.body.grado_blindaje_vehiculo)
        let montoBlindaje = req.body.monto_blindaje_vehiculo;
        let fechaVehiculoDesde = new Date(req.body.fecha_desde_vehiculo);
        let fechaVehiculoHasta = new Date(req.body.fecha_hasta_vehiculo);
        let yearVehicle = new Date(req.body.year_vehiculo);
        yearVehicle = yearVehicle.getUTCFullYear();
        if (((req.body.id_rif_conductor.startsWith('J')) || (req.body.id_rif_conductor.startsWith('G')) || (req.body.id_rif_conductor.startsWith('V')))) {
            rifConductor = req.body.id_rif_conductor;
        } else {
            cedulaConductor = req.body.id_rif_conductor;
        }
        if ((montoBlindaje.indexOf(',') !== -1) && (montoBlindaje.indexOf('.') !== -1)) {
            montoBlindaje = montoBlindaje.replace(",", ".");
            montoBlindaje = montoBlindaje.replace(".", ",");
            montoBlindaje = parseFloat(montoBlindaje.replace(/,/g,''));
        } else if (montoBlindaje.indexOf(',') !== -1) {
            montoBlindaje = montoBlindaje.replace(",", ".");
            montoBlindaje = parseFloat(montoBlindaje);
        } else if (montoBlindaje.indexOf('.') !== -1) {
            montoBlindaje = montoBlindaje.replace(".", ",");
            montoBlindaje = parseFloat(montoBlindaje.replace(/,/g,''));
        }
        let vehicle = await vehicleModel.postVehicleForm(blindaje, cedulaConductor, rifConductor, gradoBlindaje, montoBlindaje, fechaVehiculoDesde, fechaVehiculoHasta, yearVehicle, req.body);
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
            if (fileShield === 'SÍ') {
                fileShield = 1;
            } else {
                fileShield = 0;
            }
            fileYear = fileYear.toString();
            fileYear = new Date(fileYear);
            fileYear = fileYear.getUTCFullYear();
            let vehicle = await vehicleModel.postVehicleCollectiveForm(fileVersion, fileTransmission, fileShield, fileBody, fileYear, fileVehicleType, fileSumInsured, fileSerialEngine, req.body, itemFile);
            let collectiveInsurerInsured =  await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective[0].id_colectivo);
            await colInsInsurerVehiModel.postColInsuInsuredVehi(collectiveInsurerInsured[0].id_caa, vehicle.insertId);
        }
        res.redirect('/sistema/add-vehicle-collective');
    },
/*                  PUT                  */
    putVehicle: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idVehicle = req.params.id;
        if (idVehicle.match(valoresAceptados)) {
            let resultVehicle = await vehicleModel.getVehicle(idVehicle);
            let resultCIIV = await colInsInsurerVehiModel.getColInsuInsuredVehiId(idVehicle);
            let resultCII = await collectiveInsurerInsuredModel.getCollectiveId(resultCIIV[0].caa_id);
            let sumaAsegurada = resultVehicle[0].suma_asegurada_vehiculo;
            let capacidadCarga = resultVehicle[0].capacidad_carga;
            sumaAsegurada = new Intl.NumberFormat('de-DE').format(sumaAsegurada);
            capacidadCarga = new Intl.NumberFormat('de-DE').format(capacidadCarga);
            res.render('editVehicle', {
                vehicle: resultVehicle[0],
                idCollective: resultCII[0],
                sumaAsegurada: sumaAsegurada,
                capacidadCarga: capacidadCarga,
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updateVehicle: async (req, res) => {
        let blindaje = req.body.blindaje_boolean_vehiculo ? 1 : 0;
        let capacidadCarga = req.body.capacidad_carga;
        let sumaAsegurada = req.body.suma_asegurada_vehiculo;
        if (capacidadCarga.indexOf('.') !== -1) {
            capacidadCarga = capacidadCarga.replace(".", ",");
            capacidadCarga = parseFloat(capacidadCarga.replace(/,/g,''));
        }
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
        let yearVehicle = new Date(req.body.year_vehiculo);
        yearVehicle = yearVehicle.getUTCFullYear();
        await vehicleModel.updateVehicle(blindaje, capacidadCarga, sumaAsegurada, yearVehicle, req.body);
        res.redirect('/sistema');
    },
/*               DELETE                  */
    disableVehicle: async (req, res) => {
        let disableCIIV = 1;
        let disableVehicle = 1;
        let resultCIIV = await colInsInsurerVehiModel.getColInsuInsuredVehiId(req.params.id);
        let resultCII = await collectiveInsurerInsuredModel.getCollectiveId(resultCIIV[0].caa_id);
        await colInsInsurerVehiModel.disableColInsuInsuredVehiId(req.params.id, disableCIIV);
        await vehicleModel.updateDisableVehicle(req.params.id, req.body);
        await vehicleModel.disableVehicle(req.params.id, disableVehicle);
        res.redirect(`/sistema/collectives-detail/${resultCII[0].colectivo_id}`);
    }
}