const beneficiaryModel = require('../models/beneficiary');
const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const polInsInsurerBenef = require('../models/pol_aseg_asegurado_benef');

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
        }
    /*                  PUT                  */
    /*               DELETE                  */
    }