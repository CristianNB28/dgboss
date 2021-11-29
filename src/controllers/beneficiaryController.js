const beneficiaryModel = require('../models/beneficiary');
const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const polInsInsurerBenefModel = require('../models/pol_aseg_asegurado_benef');
const insuredModel = require('../models/insured');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const colInsInsurerBenefModel = require('../models/col_aseg_asegurado_benef');
const xlsx = require('xlsx');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postHealthBeneficiaryForm: async (req, res) => {
        let fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
        let beneficiary = await beneficiaryModel.postBeneficiaryForm(fechaNacBeneficiario, req.body);
        let policy = await policyModel.getPolicyLast();
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(policy[0].id_poliza);
        await polInsInsurerBenefModel.postPolInsuInsuredBenef(policyInsurerInsured[0].id_paa, beneficiary.insertId);
        res.redirect('/sistema/add-health-policy');
    },
    postFuneralBeneficiaryForm: async (req, res) => {
        let fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
        let beneficiary = await beneficiaryModel.postBeneficiaryForm(fechaNacBeneficiario, req.body);
        let policy = await policyModel.getPolicyLast();
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(policy[0].id_poliza);
        await polInsInsurerBenefModel.postPolInsuInsuredBenef(policyInsurerInsured[0].id_paa, beneficiary.insertId);
        res.redirect('/sistema/add-funeral-policy');
    },
    postLifeBeneficiaryForm: async (req, res) => {
        let fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
        let beneficiary = await beneficiaryModel.postBeneficiaryForm(fechaNacBeneficiario, req.body);
        let policy = await policyModel.getPolicyLast();
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(policy[0].id_poliza);
        await polInsInsurerBenefModel.postPolInsuInsuredBenef(policyInsurerInsured[0].id_paa, beneficiary.insertId);
        res.redirect('/sistema/add-life-policy');
    },
    postHealthBeneficiaryCollectiveForm: async (req, res) => {
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
            let dateFile = itemFile['Fecha de Nacimiento'];
            let clientFile = itemFile['Tipo de Cliente'];
            let accountTypeFile = itemFile['Tipo de Cuenta'];
            let accountNumberFile = itemFile['Nro. de Cuenta'];
            let idCollective = await collectiveModel.getCollectiveLast();
            if (clientFile === 'Titular') {
                let idNaturalInsured = await insuredModel.getNaturalInsuredId(itemFile.Cedula);
                await collectiveInsurerInsuredModel.updateCollectiveInsured(idNaturalInsured[0].id_asegurado_per_nat, idCollective[0].id_colectivo);
            } else {
                let beneficiary = await beneficiaryModel.postExtensiveBeneficiaryForm(dateFile, accountTypeFile, accountNumberFile, req.body, itemFile);
                let collectiveInsurerInsured =  await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(idCollective[0].id_colectivo);
                await colInsInsurerBenefModel.postColInsuInsuredBenef(collectiveInsurerInsured[0].id_caa, beneficiary.insertId);
            }
        }
        res.redirect('/sistema/add-health-collective');
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
    updateBeneficiary: async (req, res) => {
        let fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
        await beneficiaryModel.updateBeneficiary(fechaNacBeneficiario, req.body);
        res.redirect('/sistema');
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
    }
}