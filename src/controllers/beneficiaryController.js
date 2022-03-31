const beneficiaryModel = require('../models/beneficiary');
const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const polInsInsurerBenefModel = require('../models/pol_aseg_asegurado_benef');
const insuredModel = require('../models/insured');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const colInsInsurerBenefModel = require('../models/col_aseg_asegurado_benef');
const insurerModel = require('../models/insurer');
const ownAgentModel = require('../models/own_agent');
const receiptModel = require('../models/receipt');
const executiveModel = require('../models/executive');
const xlsx = require('xlsx');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postHealthBeneficiaryForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        let resultOwnAgent = [];
        let resultsBeneficiaries = [];
        let resultReceipt = await receiptModel.getReceiptLast();
        let polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
        let porcentajeAgentePropio = 0;
        if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
            let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            if (resultNaturalInsured[0].agente_propio_id !== null) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            }
        } else {
            let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            if (resultLegalInsured[0].agente_propio_id !== null) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            }
        }
        for (const beneficiary of polInsInsuredBef) {
            let resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
            resultsBeneficiaries.push(resultBeneficiary[0]);
        }
        let primaPoliza = resultPolicy[0].prima_anual_poliza;
        if (primaPoliza.toString().includes('.') === true) {
            primaPoliza = primaPoliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaPoliza = String(primaPoliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        let comisionRecibo = 0;
        if (resultReceipt.length !== 0) {
            comisionRecibo = resultReceipt[0].monto_comision_recibo;
            if (comisionRecibo.toString().includes('.') === true) {
                comisionRecibo = comisionRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                comisionRecibo = String(comisionRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
        }
        try {
            let fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
            let beneficiary = await beneficiaryModel.postBeneficiaryForm(fechaNacBeneficiario, req.body);
            let policy = await policyModel.getPolicyLast();
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(policy[0].id_poliza);
            await polInsInsurerBenefModel.postPolInsuInsuredBenef(policyInsurerInsured[0].id_paa, beneficiary.insertId);
            res.redirect('/sistema/add-health-policy');
        } catch (error) {
            console.log(error);
            res.render('healthPolicyForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-health-policy',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaPoliza: primaPoliza,
                porcentajeAgentePropio: porcentajeAgentePropio,
                comisionRecibo: comisionRecibo,
                name: req.session.name
            });
        }
    },
    postFuneralBeneficiaryForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        let resultOwnAgent = [];
        let resultsBeneficiaries = [];
        let resultReceipt = await receiptModel.getReceiptLast();
        let polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
        let porcentajeAgentePropio = 0;
        if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
            let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            if (resultNaturalInsured[0].agente_propio_id !== null) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            }
        } else {
            let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            if (resultLegalInsured[0].agente_propio_id !== null) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            }
        }
        for (const beneficiary of polInsInsuredBef) {
            let resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
            resultsBeneficiaries.push(resultBeneficiary[0]);
        }
        let primaPoliza = resultPolicy[0].prima_anual_poliza;
        if (primaPoliza.toString().includes('.') === true) {
            primaPoliza = primaPoliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaPoliza = String(primaPoliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        let comisionRecibo = 0;
        if (resultReceipt.length !== 0) {
            comisionRecibo = resultReceipt[0].monto_comision_recibo;
            if (comisionRecibo.toString().includes('.') === true) {
                comisionRecibo = comisionRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                comisionRecibo = String(comisionRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
        }
        try {
            let fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
            let beneficiary = await beneficiaryModel.postBeneficiaryForm(fechaNacBeneficiario, req.body);
            let policy = await policyModel.getPolicyLast();
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(policy[0].id_poliza);
            await polInsInsurerBenefModel.postPolInsuInsuredBenef(policyInsurerInsured[0].id_paa, beneficiary.insertId);
            res.redirect('/sistema/add-funeral-policy');
        } catch (error) {
            console.log(error);
            res.render('funeralPolicyForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-funeral-policy',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaPoliza: primaPoliza,
                porcentajeAgentePropio: porcentajeAgentePropio,
                comisionRecibo: comisionRecibo,
                name: req.session.name
            });
        }
    },
    postLifeBeneficiaryForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        let resultOwnAgent = [];
        let resultsBeneficiaries = [];
        let resultReceipt = await receiptModel.getReceiptLast();
        let polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
        let porcentajeAgentePropio = 0;
        if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
            let resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            if (resultNaturalInsured[0].agente_propio_id !== null) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            }
        } else {
            let resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            if (resultLegalInsured[0].agente_propio_id !== null) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
                porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            }
        }
        for (const beneficiary of polInsInsuredBef) {
            let resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
            resultsBeneficiaries.push(resultBeneficiary[0]);
        }
        let primaPoliza = resultPolicy[0].prima_anual_poliza;
        if (primaPoliza.toString().includes('.') === true) {
            primaPoliza = primaPoliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaPoliza = String(primaPoliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        let comisionRecibo = 0;
        if (resultReceipt.length !== 0) {
            comisionRecibo = resultReceipt[0].monto_comision_recibo;
            if (comisionRecibo.toString().includes('.') === true) {
                comisionRecibo = comisionRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                comisionRecibo = String(comisionRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
        }
        try {
            let fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
            let beneficiary = await beneficiaryModel.postBeneficiaryForm(fechaNacBeneficiario, req.body);
            let policy = await policyModel.getPolicyLast();
            let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(policy[0].id_poliza);
            await polInsInsurerBenefModel.postPolInsuInsuredBenef(policyInsurerInsured[0].id_paa, beneficiary.insertId);
            res.redirect('/sistema/add-life-policy');
        } catch (error) {
            console.log(error);
            res.render('lifePolicyForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-life-policy',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaPoliza: primaPoliza,
                porcentajeAgentePropio: porcentajeAgentePropio,
                comisionRecibo: comisionRecibo,
                name: req.session.name
            });
        }
    },
    postHealthBeneficiaryCollectiveForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultCollective = await collectiveModel.getCollectiveLast();
        let resultReceipt = await receiptModel.getReceiptLast();
        let resultsCollective = await collectiveModel.getCollectives();
        let resultsReceipts = await receiptModel.getReceipts();
        let resultsExecutives = await executiveModel.getExecutives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let primaColectivo = resultCollective[0].prima_anual_colectivo;
        if (primaColectivo.toString().includes('.') === true) {
            primaColectivo = primaColectivo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaColectivo = String(primaColectivo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        let comisionRecibo = 0;
        if (resultReceipt.length !== 0) {
            comisionRecibo = resultReceipt[0].monto_comision_recibo;
            if (comisionRecibo.toString().includes('.') === true) {
                comisionRecibo = comisionRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                comisionRecibo = String(comisionRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
        }
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
                let idCollective = await collectiveModel.getCollectiveLast();
                let i, j;
                let countHolder = 0;
                let arrayData = [];
                for (let k = 0; k < dataExcel.length; k += arrayData.length) {
                    const element = dataExcel[k];
                    if (element['Tipo de Cliente'] === 'TITULAR') {
                        countHolder++;
                    }
                    arrayData = [];
                    let contData = 0;
                    for (i = k, j = dataExcel.length; i < j; i++) {
                        const elementData = dataExcel[i];
                        if (elementData['Tipo de Cliente'] === 'TITULAR') {
                            contData++;
                            if (contData === 2) {
                                break;
                            }
                        }
                        arrayData.push(elementData);
                    }
                    let temparray, chunk = arrayData.length;
                    let cedulaArchivo = '';
                    let cedulaBenef = '';
                    let idOwnAgent = '';
                    let birthday = '';
                    const temparrayBeneficiary = [];
                    const temparrayNaturalInsured = [];
                    temparray = arrayData.slice(1, 1 + chunk).map(data => {
                        if (typeof(data['Fecha de nacimiento']) === 'string') {
                            let dateString = String(data['Fecha de nacimiento'])
                            let datePieces = dateString.split("/");
                            data['Fecha de nacimiento'] = new Date(datePieces[2], (datePieces[1] - 1), datePieces[0]);
                        }
                        return [
                                data.Nombre, 
                                data.Apellido, 
                                data.Cedula, 
                                data['Fecha de nacimiento'],
                                data.Parentesco,
                                data['Dirección'],
                                data['Teléfono'],
                                data.Correo,
                                data.Banco,
                                data['Tipo de Cuenta'],
                                data['Nro. De Cuenta.'],
                                data['Estatus (Emisión, renovación, inclusión)']
                            ]
                    });
                    const cedulaBenefiario = arrayData.map(data => {
                        if (data['Tipo de Cliente'] === 'TITULAR') {
                            return [
                                data.Nombre, 
                                data.Apellido, 
                                data.Cedula, 
                                data['Fecha de nacimiento'],
                                data['Dirección'],
                                data['Teléfono'],
                                data.Correo
                            ];
                        }
                    });
                    for (let index = 0; index < cedulaBenefiario.length; index++) {
                        const elementCedula = cedulaBenefiario[index];
                        if (elementCedula !== undefined) {
                            cedulaBenef = elementCedula[2];
                            idOwnAgent = null;
                            let dateString = String(elementCedula[3]);
                            let datePieces = dateString.split("/");
                            birthday = new Date(datePieces[2], (datePieces[1] - 1), datePieces[0]);
                            let objectNaturalInsured = {
                                cedula_asegurado_per_nat: cedulaBenef,
                                nombre_asegurado_per_nat: elementCedula[0],
                                apellido_asegurado_per_nat: elementCedula[1],
                                telefono_asegurado_per_nat: null,
                                correo_asegurado_per_nat: elementCedula[6],
                                celular_per_nat: elementCedula[5],
                                nombre_emergencia_per_nat: null,
                                telefono_emergencia_per_nat: null,
                                direccion_asegurado_per_nat: elementCedula[4],
                            };
                            temparrayNaturalInsured.push(objectNaturalInsured);
                        }
                    }
                    let cedulaBeneficiary = cedulaBenef;
                    let idNaturalInsured = [];
                    if (typeof(cedulaBeneficiary) === 'number') {
                        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
                        const rep = '$1.';
                        let arr = cedulaBeneficiary.toString().split('.');
                        arr[0] = arr[0].replace(exp,rep);
                        cedulaArchivo = arr[0];
                        idNaturalInsured = await insuredModel.getNaturalInsuredId(cedulaArchivo);
                    } else {
                        idNaturalInsured = await insuredModel.getNaturalInsuredId(cedulaBeneficiary);
                    }
                    if (idNaturalInsured.length !== 0) {
                        if (countHolder >= 2) {
                            let collectiveInsurerInsured =  await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective[0].id_colectivo);
                            await collectiveInsurerInsuredModel.postCollecInsuNaturalInsu(idNaturalInsured[0].id_asegurado_per_nat, collectiveInsurerInsured[0].aseguradora_id, idCollective[0].id_colectivo);
                        } else {
                            await collectiveInsurerInsuredModel.updateCollectiveInsured(idNaturalInsured[0].id_asegurado_per_nat, idCollective[0].id_colectivo);
                        }
                    } else {
                        let naturalInsured = await insuredModel.postNaturalInsuredForm(birthday, idOwnAgent, temparrayNaturalInsured[0]);
                        if (countHolder >= 2) {
                            let collectiveInsurerInsured =  await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective[0].id_colectivo);
                            await collectiveInsurerInsuredModel.postCollecInsuNaturalInsu(naturalInsured.insertId, collectiveInsurerInsured[0].aseguradora_id, idCollective[0].id_colectivo);
                        } else {
                            await collectiveInsurerInsuredModel.updateCollectiveInsured(naturalInsured.insertId, idCollective[0].id_colectivo);
                        }
                    }
                    let beneficiary = await beneficiaryModel.postExtensiveBeneficiaryForm(temparray);
                    let collectiveInsurerInsured =  await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective[0].id_colectivo);
                    for (let index = 0; index < temparray.length; index++) {
                        let beneficiaryId = beneficiary.insertId + index;
                        temparrayBeneficiary.push([collectiveInsurerInsured[0].id_caa, beneficiaryId]);
                    }
                    await colInsInsurerBenefModel.postColInsuInsuredBenef(temparrayBeneficiary);
                }
                res.redirect('/sistema/add-health-collective');
            } else {
                throw new SyntaxError("Ingrese archivo de extensión .csv");
            }
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
                receipt: resultReceipt[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                primaColectivo: primaColectivo,
                comisionRecibo: comisionRecibo,
                name: req.session.name
            });
        }
    },
/*                  PUT                  */
    putBeneficiary: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idBeneficiary = req.params.id;
        if (idBeneficiary.match(valoresAceptados)) {
            let resultBeneficiary = await beneficiaryModel.getBeneficiary(idBeneficiary);
            let fechaNacBeneficiario = resultBeneficiary[0].fec_nac_beneficiario.toISOString().substring(0, 10);
            let resultCIIB = await colInsInsurerBenefModel.getColInsuInsuredBenefId(idBeneficiary);
            let resultCII = await collectiveInsurerInsuredModel.getCollectiveId(resultCIIB[0].caa_id);
            res.render('editBeneficiary', {
                beneficiary: resultBeneficiary[0],
                fechaNacBeneficiario: fechaNacBeneficiario,
                idCollective: resultCII[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    putPolicyBeneficiary: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idBeneficiary = req.params.id;
        if (idBeneficiary.match(valoresAceptados)) {
            let resultBeneficiary = await beneficiaryModel.getBeneficiary(idBeneficiary);
            let fechaNacBeneficiario = resultBeneficiary[0].fec_nac_beneficiario.toISOString().substring(0, 10);
            let resultPIIB = await polInsInsurerBenefModel.getPolInsuInsuredBenefId(idBeneficiary);
            let resultPII = await policyInsurerInsuredModel.getPolicyId(resultPIIB[0].paa_id);
            res.render('editPolicyBeneficiary', {
                beneficiary: resultBeneficiary[0],
                fechaNacBeneficiario: fechaNacBeneficiario,
                idPolicy: resultPII[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updateBeneficiary: async (req, res) => {
        let idBeneficiary = req.body.id_beneficiario;
        let resultBeneficiary = await beneficiaryModel.getBeneficiary(idBeneficiary);
        let fechaNacBeneficiario = resultBeneficiary[0].fec_nac_beneficiario.toISOString().substring(0, 10);
        let resultCIIB = await colInsInsurerBenefModel.getColInsuInsuredBenefId(idBeneficiary);
        let resultCII = await collectiveInsurerInsuredModel.getCollectiveId(resultCIIB[0].caa_id);
        try {
            let fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
            await beneficiaryModel.updateBeneficiary(fechaNacBeneficiario, req.body);
            res.render('editBeneficiary', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'sistema',
                beneficiary: resultBeneficiary[0],
                fechaNacBeneficiario: fechaNacBeneficiario,
                idCollective: resultCII[0],
                name: req.session.name
            });
        } catch (error) {
            console.log(error);
            res.render('editBeneficiary', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-beneficiary/${idBeneficiary}`,
                beneficiary: resultBeneficiary[0],
                fechaNacBeneficiario: fechaNacBeneficiario,
                idCollective: resultCII[0],
                name: req.session.name
            });
        }
    },
    updatePolicyBeneficiary: async (req, res) => {
        let idBeneficiary = req.body.id_beneficiario;
        let resultBeneficiary = await beneficiaryModel.getBeneficiary(idBeneficiary);
        let fechaNacBeneficiario = resultBeneficiary[0].fec_nac_beneficiario.toISOString().substring(0, 10);
        let resultPIIB = await polInsInsurerBenefModel.getPolInsuInsuredBenefId(idBeneficiary);
        let resultPII = await policyInsurerInsuredModel.getPolicyId(resultPIIB[0].paa_id);
        try {
            let fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
            await beneficiaryModel.updatePolicyBeneficiary(fechaNacBeneficiario, req.body);
            res.render('editPolicyBeneficiary', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'sistema',
                beneficiary: resultBeneficiary[0],
                fechaNacBeneficiario: fechaNacBeneficiario,
                idPolicy: resultPII[0],
                name: req.session.name
            });
        } catch (error) {
            console.log(error);
            res.render('editPolicyBeneficiary', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-policy-beneficiary/${idBeneficiary}`,
                beneficiary: resultBeneficiary[0],
                fechaNacBeneficiario: fechaNacBeneficiario,
                idPolicy: resultPII[0],
                name: req.session.name
            });
        }
    },
/*               DELETE                  */
    disableBeneficiary: async (req, res) => {
        let disableCIIB = 1;
        let disableBeneficiary = 1;
        let resultCIIB = await colInsInsurerBenefModel.getColInsuInsuredBenefId(req.params.id);
        let resultCII = await collectiveInsurerInsuredModel.getCollectiveId(resultCIIB[0].caa_id);
        await colInsInsurerBenefModel.disableColInsuInsuredBenefId(req.params.id, disableCIIB);
        await beneficiaryModel.updateDisableBeneficiary(req.params.id, req.body);
        await beneficiaryModel.disableBeneficiary(req.params.id, disableBeneficiary);
        res.redirect(`/sistema/collectives-detail/${resultCII[0].colectivo_id}`);
    },
    disablePolicyBeneficiary: async (req, res) => {
        let disablePIIB = 1;
        let disableBeneficiary = 1;
        let resultPIIB = await polInsInsurerBenefModel.getPolInsuInsuredBenefId(req.params.id);
        let resultPII = await policyInsurerInsuredModel.getPolicyId(resultPIIB[0].paa_id);
        await polInsInsurerBenefModel.disablePolInsuInsuredBenefId(req.params.id, disablePIIB);
        await beneficiaryModel.updateDisableBeneficiary(req.params.id, req.body);
        await beneficiaryModel.disableBeneficiary(req.params.id, disableBeneficiary);
        res.redirect(`/sistema/policies-detail/${resultPII[0].poliza_id}`);
    },
    disableHealthBeneficiary: async (req, res) => {
        let disablePIIB = 1;
        let disableBeneficiary = 1;
        await polInsInsurerBenefModel.disablePolInsuInsuredBenefId(req.params.id, disablePIIB);
        await beneficiaryModel.updateDisableBeneficiary(req.params.id, req.body);
        await beneficiaryModel.disableBeneficiary(req.params.id, disableBeneficiary);
        res.redirect('/sistema/add-health-policy');
    },
    disableFuneralBeneficiary: async (req, res) => {
        let disablePIIB = 1;
        let disableBeneficiary = 1;
        await polInsInsurerBenefModel.disablePolInsuInsuredBenefId(req.params.id, disablePIIB);
        await beneficiaryModel.updateDisableBeneficiary(req.params.id, req.body);
        await beneficiaryModel.disableBeneficiary(req.params.id, disableBeneficiary);
        res.redirect('/sistema/add-funeral-policy');
    },
    disableLifeBeneficiary: async (req, res) => {
        let disablePIIB = 1;
        let disableBeneficiary = 1;
        await polInsInsurerBenefModel.disablePolInsuInsuredBenefId(req.params.id, disablePIIB);
        await beneficiaryModel.updateDisableBeneficiary(req.params.id, req.body);
        await beneficiaryModel.disableBeneficiary(req.params.id, disableBeneficiary);
        res.redirect('/sistema/add-life-policy');
    }
}