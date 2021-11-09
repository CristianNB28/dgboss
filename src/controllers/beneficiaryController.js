const beneficiaryModel = require('../models/beneficiary');
const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const polInsInsurerBenef = require('../models/pol_aseg_asegurado_benef');
const insuredModel = require('../models/insured');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const colInsInsurerBenef = require('../models/col_aseg_asegurado_benef');
const xlsx = require('xlsx');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postHealthBeneficiaryForm: async (req, res) => {
        let fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
        let beneficiary = await beneficiaryModel.postBeneficiaryForm(fechaNacBeneficiario, req.body);
        let policy = await policyModel.getPolicyLast();
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(policy[0].id_poliza);
        await polInsInsurerBenef.postPolInsuInsuredBenef(policyInsurerInsured[0].id_paa, beneficiary.insertId);
        res.redirect('/sistema/add-health-policy');
    },
    postFuneralBeneficiaryForm: async (req, res) => {
        let fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
        let beneficiary = await beneficiaryModel.postBeneficiaryForm(fechaNacBeneficiario, req.body);
        let policy = await policyModel.getPolicyLast();
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(policy[0].id_poliza);
        await polInsInsurerBenef.postPolInsuInsuredBenef(policyInsurerInsured[0].id_paa, beneficiary.insertId);
        res.redirect('/sistema/add-funeral-policy');
    },
    postLifeBeneficiaryForm: async (req, res) => {
        let fechaNacBeneficiario = new Date(req.body.fec_nac_beneficiario);
        let beneficiary = await beneficiaryModel.postBeneficiaryForm(fechaNacBeneficiario, req.body);
        let policy = await policyModel.getPolicyLast();
        let policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(policy[0].id_poliza);
        await polInsInsurerBenef.postPolInsuInsuredBenef(policyInsurerInsured[0].id_paa, beneficiary.insertId);
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
                await colInsInsurerBenef.postColInsuInsuredBenef(collectiveInsurerInsured[0].id_caa, beneficiary.insertId);
            }
        }
        res.redirect('/sistema/add-health-collective');
    },
/*                  PUT                  */
/*               DELETE                  */
}