// Models
const vehicleModel = require('../models/vehicle');
const polInsuInsuredVehiModel = require('../models/pol_insu_insured_vehi');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const colInsInsurerVehiModel = require('../models/col_insu_insured_vehi');
const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const receiptModel = require('../models/receipt');
const executiveModel = require('../models/executive');
const ownAgentModel = require('../models/own_agent');
const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const policyOwnAgentModel = require('../models/policy_own_agent');
// Serializers
const convertStringToNumber = require('../serializers/convertStringToNumber');
const convertNumberToString = require('../serializers/convertNumberToString');

const xlsx = require('xlsx');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postVehicleForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicyLast();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                blindaje_boolean_vehiculo: blindaje,
                year_vehiculo: yearVehicle,
                grado_blindaje_vehiculo: gradoBlindaje,
                monto_blindaje_vehiculo: montoBlindaje,
            } = req.body;
            blindaje = blindaje ? 1 : 0;
            yearVehicle = new Date(yearVehicle);
            yearVehicle = yearVehicle.getUTCFullYear();
            if (gradoBlindaje === '') {
                gradoBlindaje = 0;
            } else {
                gradoBlindaje = parseInt(gradoBlindaje);
            }
            if (montoBlindaje === '') {
                montoBlindaje = 0;
            } else {
                montoBlindaje = convertStringToNumber(montoBlindaje);
            }
            const vehicle = await vehicleModel.postVehicleForm(blindaje, gradoBlindaje, montoBlindaje, yearVehicle, req.body);
            await polInsuInsuredVehiModel.postPolInsuInsuredVehi(policyInsurerInsured[0].id_paa, vehicle.insertId);
            res.redirect('/sistema/add-vehicle-policy');
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
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
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
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
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
                            data['Tipo de Cedula'],
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
                if (req.cookies.rol === 'ADMINISTRATIVO') {
                    res.redirect('/sistema/add-vehicle-collective');
                } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                    res.redirect('/sistema/add-subscription-vehicle-collective');
                }
            } else {
                throw new SyntaxError("Ingrese archivo de extensión .csv");
            }
        } catch (error) {
            console.log(error);
            if (req.cookies.rol === 'ADMINISTRATIVO') {
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
                    ownAgents: resultsOwnAgents,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else if (req.cookies.rol === 'SUSCRIPCIÓN') {
                res.render('subscriptionVehicleCollectiveForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: error.message,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-subscription-vehicle-collective',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    collectives: resultsCollective,
                    receipts: resultsReceipts,
                    executives: resultsExecutives,
                    ownAgents: resultsOwnAgents,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
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
                name: req.session.name,
                cookieRol: req.cookies.rol
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
        res.redirect(`/sistema/edit-vehicle/${req.body.id_vehiculo}`);
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