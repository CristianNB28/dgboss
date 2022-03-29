const vehicleModel = require('../models/vehicle');
const polInsuInsuredVehiModel = require('../models/pol_insu_insured_vehi');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const colInsInsurerVehiModel = require('../models/col_insu_insured_vehi');
const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const receiptModel = require('../models/receipt');
const executiveModel = require('../models/executive');
const xlsx = require('xlsx');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postVehicleForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPoliciesNumbers();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
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
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                name: req.session.name
            });
        }
    },
    postVehicleCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsCollective = await collectiveModel.getCollectives();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        try {
            const urlFile = req.file.path;
            const fileExtension =
                urlFile.substring(urlFile.lastIndexOf('.') + 1, urlFile.length) || urlFile;
            const workbook = xlsx.readFile(urlFile, {
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
                let temparray, chunk = dataExcel.length;
                const temparrayVehicle = [];
                let idCollective = await collectiveModel.getCollectiveLast();
                temparray = dataExcel.slice(0, 0 + chunk).map(data => {
                    data['Año'] = data['Año'].toString();
                    data['Año'] = new Date(data['Año']);
                    data['Año'] = data['Año'].getUTCFullYear();
                    if (data['Blindaje( si o no)'] === 'si') {
                        data['Blindaje( si o no)'] = 1;
                    } else {
                        data['Blindaje( si o no)'] = 0;
                    }
                    data['Suma Asegurada'] = String(data['Suma Asegurada']);
                    if ((data['Suma Asegurada'].indexOf(',') !== -1) && (data['Suma Asegurada'].indexOf('.') !== -1)) {
                        data['Suma Asegurada'] = data['Suma Asegurada'].replace(",", ".");
                        data['Suma Asegurada'] = data['Suma Asegurada'].replace(".", ",");
                        data['Suma Asegurada'] = parseFloat(data['Suma Asegurada'].replace(/,/g,''));
                    } else if (data['Suma Asegurada'].indexOf(',') !== -1) {
                        data['Suma Asegurada'] = data['Suma Asegurada'].replace(",", ".");
                        data['Suma Asegurada'] = parseFloat(data['Suma Asegurada']);
                    } else if (data['Suma Asegurada'].indexOf('.') !== -1) {
                        data['Suma Asegurada'] = data['Suma Asegurada'].replace(".", ",");
                        data['Suma Asegurada'] = parseFloat(data['Suma Asegurada'].replace(/,/g,''));
                    }
                    data['Suma Asegurada'] = data['Suma Asegurada'].toFixed(2);
                    return [
                            data['Número de certificado'], 
                            data.Placa,
                            data['Año'], 
                            data.Marca,
                            data.Modelo,
                            data.Version, 
                            data['Transmisión( automatico o sincro)'],
                            data['Blindaje( si o no)'],
                            data['Tipo de vehículo'],
                            data.Color,
                            data['Seria del motor'],
                            data['Carrocería'],
                            data.Carga,
                            data['Cédula'],
                            data['Nombre y apellido'],
                            data['Suma Asegurada'],
                            data['Estatus (Emisión, renovación, inclusión)']
                        ]
                });
                let vehicle = await vehicleModel.postVehicleCollectiveForm(temparray);
                let collectiveInsurerInsured =  await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective[0].id_colectivo);
                for (let index = 0; index < temparray.length; index++) {
                    let vehicleId = vehicle.insertId + index;
                    temparrayVehicle.push([collectiveInsurerInsured[0].id_caa, vehicleId]);
                }
                await colInsInsurerVehiModel.postColInsuInsuredVehi(temparrayVehicle);
                res.redirect('/sistema/add-vehicle-collective');
            } else {
                throw new SyntaxError("Ingrese archivo de extensión .csv");
            }
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
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                name: req.session.name
            });
        }
    },
/*                  PUT                  */
    putVehicle: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idVehicle = req.params.id;
        if (idVehicle.match(valoresAceptados)) {
            let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            let resultVehicle = await vehicleModel.getVehicle(idVehicle);
            let resultCIIV = await colInsInsurerVehiModel.getColInsuInsuredVehiId(idVehicle);
            let resultCII = await collectiveInsurerInsuredModel.getCollectiveId(resultCIIV[0].caa_id);
            let sumaAsegurada = resultVehicle[0].suma_asegurada_vehiculo;
            let capacidadCarga = resultVehicle[0].capacidad_carga;
            if (sumaAsegurada.toString().includes('.') === true) {
                sumaAsegurada = sumaAsegurada.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                sumaAsegurada = String(sumaAsegurada).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            capacidadCarga = String(capacidadCarga).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            res.render('editVehicle', {
                vehicle: resultVehicle[0],
                idCollective: resultCII[0],
                sumaAsegurada: sumaAsegurada,
                capacidadCarga: capacidadCarga,
                naturalInsureds: resultsNaturalInsureds,
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