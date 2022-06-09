// Models
const beneficiaryModel = require('../models/beneficiary');
const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const polInsInsurerBenefModel = require('../models/pol_insu_insured_benef');
const insuredModel = require('../models/insured');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const colInsInsurerBenefModel = require('../models/col_insu_insured_benef');
const collectiveOwnAgentModel = require('../models/collective_own_agent');
const insurerModel = require('../models/insurer');
const ownAgentModel = require('../models/own_agent');
const receiptModel = require('../models/receipt');
const executiveModel = require('../models/executive');
const policyOwnAgentModel = require('../models/policy_own_agent');
// Serializers
const convertNumberToString = require('../serializers/convertNumberToString');

const xlsx = require('xlsx');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postHealthBeneficiaryForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicyLast();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsBeneficiaries = [];
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        const polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
        for (const beneficiary of polInsInsuredBef) {
            const resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
            resultsBeneficiaries.push(resultBeneficiary[0]);
        }
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
            const fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
            const beneficiary = await beneficiaryModel.postBeneficiaryForm(fechaNacBeneficiario, req.body);
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
    postFuneralBeneficiaryForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicyLast();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsBeneficiaries = [];
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        const polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
        for (const beneficiary of polInsInsuredBef) {
            const resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
            resultsBeneficiaries.push(resultBeneficiary[0]);
        }
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
            const fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
            const beneficiary = await beneficiaryModel.postBeneficiaryForm(fechaNacBeneficiario, req.body);
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
    postLifeBeneficiaryForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicyLast();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsBeneficiaries = [];
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        const polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
        for (const beneficiary of polInsInsuredBef) {
            const resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
            resultsBeneficiaries.push(resultBeneficiary[0]);
        }
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
            const fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
            const beneficiary = await beneficiaryModel.postBeneficiaryForm(fechaNacBeneficiario, req.body);
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
    postHealthBeneficiaryCollectiveForm: async (req, res) => {
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
                let i, j;
                let countHolder = 0;
                let countCaa = 0;
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
                    let nombrePerNat = '';
                    let apellidoPerNat = '';
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
                                data['Tipo de Cedula'], 
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
                                data['Tipo de Cedula'], 
                                data['Fecha de nacimiento'],
                                data['Dirección'],
                                data['Teléfono'],
                                data.Correo
                            ];
                        }
                    });
                    cedulaBenefiario.forEach(elementCedula => {
                        if (elementCedula !== undefined) {
                            cedulaBenef = elementCedula[2];
                            idOwnAgent = null;
                            const dateString = String(elementCedula[4]);
                            const datePieces = dateString.split("/");
                            birthday = new Date(datePieces[2], (datePieces[1] - 1), datePieces[0]);
                            nombrePerNat = elementCedula[0];
                            apellidoPerNat = elementCedula[1];
                            let objectNaturalInsured = {
                                cedula_asegurado_per_nat: cedulaBenef,
                                tipo_cedula_asegurado_per_nat: elementCedula[3],
                                telefono_asegurado_per_nat: null,
                                correo_asegurado_per_nat: elementCedula[7],
                                celular_per_nat: elementCedula[6],
                                nombre_emergencia_per_nat: null,
                                telefono_emergencia_per_nat: null,
                                direccion_asegurado_per_nat: elementCedula[5],
                            };
                            temparrayNaturalInsured.push(objectNaturalInsured);
                        }
                    });
                    const cedulaBeneficiary = cedulaBenef;
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
                            const collectiveInsurerInsured =  await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
                            await collectiveInsurerInsuredModel.postCollecInsuNaturalInsu(idNaturalInsured[0].id_asegurado_per_nat, collectiveInsurerInsured[0].aseguradora_id, resultCollective[0].id_colectivo);
                        } else {
                            await collectiveInsurerInsuredModel.updateCollectiveInsured(idNaturalInsured[0].id_asegurado_per_nat, resultCollective[0].id_colectivo);
                        }
                    } else {
                        let naturalInsured = await insuredModel.postNaturalInsuredForm(birthday, idOwnAgent, nombrePerNat, apellidoPerNat, temparrayNaturalInsured[0]);
                        if (countHolder >= 2) {
                            let collectiveInsurerInsured =  await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
                            await collectiveInsurerInsuredModel.postCollecInsuNaturalInsu(naturalInsured.insertId, collectiveInsurerInsured[0].aseguradora_id, resultCollective[0].id_colectivo);
                        } else {
                            await collectiveInsurerInsuredModel.updateCollectiveInsured(naturalInsured.insertId, resultCollective[0].id_colectivo);
                        }
                    }
                    const beneficiary = await beneficiaryModel.postExtensiveBeneficiaryForm(temparray);
                    const collectiveInsurerInsured =  await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
                    for (let index = 0; index < temparray.length; index++) {
                        let beneficiaryId = beneficiary.insertId + index;
                        temparrayBeneficiary.push([collectiveInsurerInsured[countCaa].id_caa, beneficiaryId]);
                    }
                    await colInsInsurerBenefModel.postColInsuInsuredBenef(temparrayBeneficiary);
                    if (element['Tipo de Cliente'] === 'TITULAR') {
                        countCaa++;
                    }
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
    putBeneficiary: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idBeneficiary = req.params.id;
        if (idBeneficiary.match(valoresAceptados)) {
            const resultBeneficiary = await beneficiaryModel.getBeneficiary(idBeneficiary);
            const fechaNacBeneficiario = resultBeneficiary[0].fec_nac_beneficiario.toISOString().substring(0, 10);
            const resultCIIB = await colInsInsurerBenefModel.getColInsuInsuredBenefId(idBeneficiary);
            const resultCII = await collectiveInsurerInsuredModel.getCollectiveId(resultCIIB[0].caa_id);
            res.render('editBeneficiary', {
                fechaNacBeneficiario,
                beneficiary: resultBeneficiary[0],
                idCollective: resultCII[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putPolicyBeneficiary: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idBeneficiary = req.params.id;
        if (idBeneficiary.match(valoresAceptados)) {
            const resultBeneficiary = await beneficiaryModel.getBeneficiary(idBeneficiary);
            const fechaNacBeneficiario = resultBeneficiary[0].fec_nac_beneficiario.toISOString().substring(0, 10);
            const resultPIIB = await polInsInsurerBenefModel.getPolInsuInsuredBenefId(idBeneficiary);
            const resultPII = await policyInsurerInsuredModel.getPolicyId(resultPIIB[0].paa_id);
            res.render('editPolicyBeneficiary', {
                fechaNacBeneficiario,
                beneficiary: resultBeneficiary[0],
                idPolicy: resultPII[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    updateBeneficiary: async (req, res) => {
        const idBeneficiary = req.body.id_beneficiario;
        const resultBeneficiary = await beneficiaryModel.getBeneficiary(idBeneficiary);
        const fechaNacBeneficiario = resultBeneficiary[0].fec_nac_beneficiario.toISOString().substring(0, 10);
        const resultCIIB = await colInsInsurerBenefModel.getColInsuInsuredBenefId(idBeneficiary);
        const resultCII = await collectiveInsurerInsuredModel.getCollectiveId(resultCIIB[0].caa_id);
        try {
            const fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
            await beneficiaryModel.updateBeneficiary(fechaNacBeneficiario, req.body);
            res.render('editBeneficiary', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-beneficiary/${idBeneficiary}`,
                fechaNacBeneficiario,
                beneficiary: resultBeneficiary[0],
                idCollective: resultCII[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
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
                fechaNacBeneficiario,
                beneficiary: resultBeneficiary[0],
                idCollective: resultCII[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updatePolicyBeneficiary: async (req, res) => {
        const idBeneficiary = req.body.id_beneficiario;
        const resultBeneficiary = await beneficiaryModel.getBeneficiary(idBeneficiary);
        const fechaNacBeneficiario = resultBeneficiary[0].fec_nac_beneficiario.toISOString().substring(0, 10);
        const resultPIIB = await polInsInsurerBenefModel.getPolInsuInsuredBenefId(idBeneficiary);
        const resultPII = await policyInsurerInsuredModel.getPolicyId(resultPIIB[0].paa_id);
        try {
            const fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
            await beneficiaryModel.updatePolicyBeneficiary(fechaNacBeneficiario, req.body);
            res.render('editPolicyBeneficiary', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-policy-beneficiary/${idBeneficiary}`,
                fechaNacBeneficiario,
                beneficiary: resultBeneficiary[0],
                idPolicy: resultPII[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
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
                fechaNacBeneficiario,
                beneficiary: resultBeneficiary[0],
                idPolicy: resultPII[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
/*               DELETE                  */
    disableBeneficiary: async (req, res) => {
        const disableCIIB = 1;
        const disableBeneficiary = 1;
        const resultCIIB = await colInsInsurerBenefModel.getColInsuInsuredBenefId(req.params.id);
        const resultCII = await collectiveInsurerInsuredModel.getCollectiveId(resultCIIB[0].caa_id);
        await colInsInsurerBenefModel.disableColInsuInsuredBenefId(req.params.id, disableCIIB);
        await beneficiaryModel.updateDisableBeneficiary(req.params.id, req.body);
        await beneficiaryModel.disableBeneficiary(req.params.id, disableBeneficiary);
        res.redirect(`/sistema/collectives-detail/${resultCII[0].colectivo_id}`);
    },
    disablePolicyBeneficiary: async (req, res) => {
        const disablePIIB = 1;
        const disableBeneficiary = 1;
        const resultPIIB = await polInsInsurerBenefModel.getPolInsuInsuredBenefId(req.params.id);
        const resultPII = await policyInsurerInsuredModel.getPolicyId(resultPIIB[0].paa_id);
        await polInsInsurerBenefModel.disablePolInsuInsuredBenefId(req.params.id, disablePIIB);
        await beneficiaryModel.updateDisableBeneficiary(req.params.id, req.body);
        await beneficiaryModel.disableBeneficiary(req.params.id, disableBeneficiary);
        res.redirect(`/sistema/policies-detail/${resultPII[0].poliza_id}`);
    },
    disableHealthBeneficiary: async (req, res) => {
        const disablePIIB = 1;
        const disableBeneficiary = 1;
        await polInsInsurerBenefModel.disablePolInsuInsuredBenefId(req.params.id, disablePIIB);
        await beneficiaryModel.updateDisableBeneficiary(req.params.id, req.body);
        await beneficiaryModel.disableBeneficiary(req.params.id, disableBeneficiary);
        res.redirect('/sistema/add-health-policy');
    },
    disableFuneralBeneficiary: async (req, res) => {
        const disablePIIB = 1;
        const disableBeneficiary = 1;
        await polInsInsurerBenefModel.disablePolInsuInsuredBenefId(req.params.id, disablePIIB);
        await beneficiaryModel.updateDisableBeneficiary(req.params.id, req.body);
        await beneficiaryModel.disableBeneficiary(req.params.id, disableBeneficiary);
        res.redirect('/sistema/add-funeral-policy');
    },
    disableLifeBeneficiary: async (req, res) => {
        const disablePIIB = 1;
        const disableBeneficiary = 1;
        await polInsInsurerBenefModel.disablePolInsuInsuredBenefId(req.params.id, disablePIIB);
        await beneficiaryModel.updateDisableBeneficiary(req.params.id, req.body);
        await beneficiaryModel.disableBeneficiary(req.params.id, disableBeneficiary);
        res.redirect('/sistema/add-life-policy');
    }
}