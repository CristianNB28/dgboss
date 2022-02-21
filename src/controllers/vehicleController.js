const vehicleModel = require('../models/vehicle');
const polInsuInsuredVehiModel = require('../models/pol_insu_insured_vehi');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const colInsInsurerVehiModel = require('../models/col_insu_insured_vehi');
const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const xlsx = require('xlsx');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postVehicleForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        try {
            let blindaje = req.body.blindaje_boolean_vehiculo ? 1 : 0;
            let cedulaConductor = req.body.cedula_conductor;
            let gradoBlindaje;
            let montoBlindaje;
            let yearVehicle = new Date(req.body.year_vehiculo);
            yearVehicle = yearVehicle.getUTCFullYear();
            if (req.body.grado_blindaje_vehiculo === '') {
                gradoBlindaje = 0;
            } else {
                gradoBlindaje = parseInt(req.body.grado_blindaje_vehiculo)
            }
            if (req.body.monto_blindaje_vehiculo === '') {
                montoBlindaje = 0;
            } else {
                montoBlindaje = req.body.monto_blindaje_vehiculo;
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
            }
            let vehicle = await vehicleModel.postVehicleForm(blindaje, cedulaConductor, gradoBlindaje, montoBlindaje, yearVehicle, req.body);
            await polInsuInsuredVehiModel.postPolInsuInsuredVehi(vehicle.insertId);
            res.redirect('/sistema/add-vehicle-policy');
            throw new Error('Error');
        } catch (error) {
            console.log(error);
            res.render('vehiclePolicyForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-vehicle-policy',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        }
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
            let fileTransmission = itemFile['transmisión( automatico o sincro)'];
            let fileShield = itemFile['Blindaje( si o no)'];
            let fileBody = itemFile['Carrocería'];
            let fileYear = itemFile['Año'];
            let fileVehicleType = itemFile['Tipo de vehículo'];
            let fileSumInsured = itemFile['Suma Asegurada'];
            let fileSerialEngine = itemFile['Serial del moto'];
            let idCollective = await collectiveModel.getCollectiveLast();
            if (fileShield === 'si') {
                fileShield = 1;
            } else {
                fileShield = 0;
            }
            fileYear = fileYear.toString();
            fileYear = new Date(fileYear);
            fileYear = fileYear.getUTCFullYear();
            let vehicle = await vehicleModel.postVehicleCollectiveForm(fileTransmission, fileShield, fileBody, fileYear, fileVehicleType, fileSumInsured, fileSerialEngine, req.body, itemFile);
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