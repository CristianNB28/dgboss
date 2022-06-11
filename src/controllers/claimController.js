// Models
const insuredModel = require('../models/insured');
const refundModel = require('../models/refund');
const letterGuaranteeModel = require('../models/letter_guarentee');
const emergencyModel = require('../models/emergency');
const ampModel = require('../models/amp');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const polInsInsurerBenef = require('../models/pol_insu_insured_benef');
const policyModel = require('../models/policy');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const colInsInsurerBenef = require('../models/col_insu_insured_benef');
const collectiveModel = require('../models/collective');
const beneficiaryModel = require('../models/beneficiary');
const insuredBeneficiaryModel = require('../models/insured_beneficiary');
// Serializers
const convertStringToNumber = require('../serializers/convertStringToNumber');
const convertNumberToString = require('../serializers/convertNumberToString');
const convertStringToCurrency = require('../serializers/convertStringToCurrency');

module.exports = {
/*                  GET                  */
    getRefundForm: async (req, res) => {
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        res.render('refundForm', {
            resultsPII,
            resultsPIIB,
            resultsCII,
            resultsCIIB,
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            policies: resultsPolicies,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getLetterGuaranteeForm: async (req, res) => {
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        res.render('letterGuaranteeForm', {
            resultsPII,
            resultsPIIB,
            resultsCII,
            resultsCIIB,
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            policies: resultsPolicies,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getEmergencyForm: async (req, res) => {
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        res.render('emergencyForm', {
            resultsPII,
            resultsPIIB,
            resultsCII,
            resultsCIIB,
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            policies: resultsPolicies,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getAMPForm: async (req, res) => {
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        res.render('ampForm', {
            resultsPII,
            resultsPIIB,
            resultsCII,
            resultsCIIB,
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            policies: resultsPolicies,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getRefunds: async (req, res) => {
        const resultsRefunds = await refundModel.getRefunds();
        resultsRefunds.forEach(refund => {
            refund.monto_reclamo_reembolso = convertNumberToString(refund.monto_reclamo_reembolso);
            refund.monto_pagado_reembolso = convertNumberToString(refund.monto_pagado_reembolso);
            refund.monto_reclamo_reembolso = convertStringToCurrency(refund.tipo_moneda_reembolso, refund.monto_reclamo_reembolso);
            refund.monto_pagado_reembolso = convertStringToCurrency(refund.tipo_moneda_reembolso, refund.monto_pagado_reembolso);
            refund.fecha_ocurrencia_reembolso = refund.fecha_ocurrencia_reembolso.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            refund.fecha_notificacion_reembolso = refund.fecha_notificacion_reembolso.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
        });
        res.render('refunds',{
            data: resultsRefunds,
            name: req.session.name,
            cookieRol: req.cookies.rol 
        });
    },
    getLettersGuarantee: async (req, res) => {
        const resultsLettersGuarentee = await letterGuaranteeModel.getLettersGuarantee();
        resultsLettersGuarentee.forEach(letterGuarantee => {
            letterGuarantee.monto_reclamado_carta_aval = convertNumberToString(letterGuarantee.monto_reclamado_carta_aval);
            letterGuarantee.monto_pagado_carta_aval = convertNumberToString(letterGuarantee.monto_pagado_carta_aval);
            letterGuarantee.monto_reclamado_carta_aval = convertStringToCurrency(letterGuarantee.tipo_moneda_carta_aval, letterGuarantee.monto_reclamado_carta_aval);
            letterGuarantee.monto_pagado_carta_aval = convertStringToCurrency(letterGuarantee.tipo_moneda_carta_aval, letterGuarantee.monto_pagado_carta_aval);
            letterGuarantee.fecha_ocurrencia_carta_aval = letterGuarantee.fecha_ocurrencia_carta_aval.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            letterGuarantee.fecha_notificacion_carta_aval = letterGuarantee.fecha_notificacion_carta_aval.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
        });
        res.render('lettersGuarentee',{
            data: resultsLettersGuarentee,
            name: req.session.name,
            cookieRol: req.cookies.rol 
        });
    },
    getEmergencies: async (req, res) => {
        const resultsEmergencies = await emergencyModel.getEmergencies();
        resultsEmergencies.forEach(emergency => {
            emergency.monto_reclamado_emergencia = convertNumberToString(emergency.monto_reclamado_emergencia);
            emergency.monto_pagado_emergencia = convertNumberToString(emergency.monto_pagado_emergencia);
            emergency.monto_reclamado_emergencia = convertStringToCurrency(emergency.tipo_moneda_emergencia, emergency.monto_reclamado_emergencia);
            emergency.monto_pagado_emergencia = convertStringToCurrency(emergency.tipo_moneda_emergencia, emergency.monto_pagado_emergencia);
            emergency.fecha_ocurrencia_emergencia = emergency.fecha_ocurrencia_emergencia.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            emergency.fecha_notificacion_emergencia = emergency.fecha_notificacion_emergencia.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
        });
        res.render('emergencies',{
            data: resultsEmergencies,
            name: req.session.name,
            cookieRol: req.cookies.rol 
        });
    },
    getAMP: async (req, res) => {
        const resultsAMP = await ampModel.getAMP(); 
        resultsAMP.forEach(amp => {
            amp.monto_reclamado_amp = convertNumberToString(amp.monto_reclamado_amp);
            amp.monto_pagado_amp = convertNumberToString(amp.monto_pagado_amp);
            amp.monto_reclamado_amp = convertStringToCurrency(amp.tipo_moneda_amp, amp.monto_reclamado_amp);
            amp.monto_pagado_amp = convertStringToCurrency(amp.tipo_moneda_amp, amp.monto_pagado_amp);
            amp.fecha_ocurrencia_amp = amp.fecha_ocurrencia_amp.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            amp.fecha_notificacion_amp = amp.fecha_notificacion_amp.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
        });
        res.render('amp',{
            data: resultsAMP,
            name: req.session.name,
            cookieRol: req.cookies.rol 
        });
    },
/*                 POST                  */
    postRefundForm: async (req, res) => {
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                monto_reclamo_reembolso: montoReclamoReembolso,
                monto_pagado_reembolso: montoPagadoReembolso,
                fecha_ocurrencia_reembolso: fechaOcurrenciaReembolso,
                fecha_notificacion_reembolso: fechaNotificacionReembolso,
                id_rif_asegurado: idRifAsegurado,
                cedula_beneficiario: cedulaBeneficiario,
                numero_poliza: numeroPoliza
            } = req.body;
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let idPolicy = null;
            let idCollective = null;
            const idPolicyArray = resultsPolicies.filter(policy => policy.numero_poliza === numeroPoliza).map(policy => policy.id_poliza);
            const idCollectiveArray = resultsCollectives.filter(collective => collective.numero_colectivo === numeroPoliza).map(collective => collective.id_colectivo);
            fechaOcurrenciaReembolso = new Date(fechaOcurrenciaReembolso);
            fechaNotificacionReembolso = new Date(fechaNotificacionReembolso);
            montoReclamoReembolso = montoReclamoReembolso.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPagadoReembolso = montoPagadoReembolso.replace(/[Bs$€]/g, '').replace(' ', '');
            montoReclamoReembolso = convertStringToNumber(montoReclamoReembolso);
            if (montoPagadoReembolso === '') {
                montoPagadoReembolso = 0;
            } else {
                montoPagadoReembolso = convertStringToNumber(montoPagadoReembolso);
            }
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (idPolicyArray.length !== 0) {
                idPolicy = idPolicyArray[0];
            } else if (idCollectiveArray.length !== 0) {
                idCollective = idCollectiveArray[0];
            }
            const resultBeneficiary = await beneficiaryModel.getIdBeneficiary(cedulaBeneficiario);
            const resultAseguradoBeneficiario = await insuredBeneficiaryModel.postAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario);
            await refundModel.postRefundForm(montoReclamoReembolso, montoPagadoReembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, resultAseguradoBeneficiario.insertId, idPolicy, idCollective, req.body);
            res.render('refundForm', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se registraron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'sistema/add-refund',
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('refundForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-refund',
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postLetterGuaranteeForm: async (req, res) => {
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                monto_reclamado_carta_aval: montoReclamoCartaAval,
                monto_pagado_carta_aval: montoPagadoCartaAval,
                fecha_ocurrencia_carta_aval: fechaOcurrenciaCartaAval,
                fecha_notificacion_carta_aval: fechaNotificacionCartaAval,
                id_rif_asegurado: idRifAsegurado,
                cedula_beneficiario: cedulaBeneficiario,
                numero_poliza: numeroPoliza
            } = req.body;
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let idPolicy = null;
            let idCollective = null;
            const idPolicyArray = resultsPolicies.filter(policy => policy.numero_poliza === numeroPoliza).map(policy => policy.id_poliza);
            const idCollectiveArray = resultsCollectives.filter(collective => collective.numero_colectivo === numeroPoliza).map(collective => collective.id_colectivo);
            fechaOcurrenciaCartaAval = new Date(fechaOcurrenciaCartaAval);
            fechaNotificacionCartaAval = new Date(fechaNotificacionCartaAval);
            montoReclamoCartaAval = montoReclamoCartaAval.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPagadoCartaAval = montoPagadoCartaAval.replace(/[Bs$€]/g, '').replace(' ', '');
            montoReclamoCartaAval = convertStringToNumber(montoReclamoCartaAval);
            if (montoPagadoCartaAval === '') {
                montoPagadoCartaAval = 0;
            } else {
                montoPagadoCartaAval = convertStringToNumber(montoPagadoCartaAval);
            }
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (idPolicyArray.length !== 0) {
                idPolicy = idPolicyArray[0];
            } else if (idCollectiveArray.length !== 0) {
                idCollective = idCollectiveArray[0];
            }
            const resultBeneficiary = await beneficiaryModel.getIdBeneficiary(cedulaBeneficiario);
            const resultAseguradoBeneficiario = await insuredBeneficiaryModel.postAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario);
            await letterGuaranteeModel.postLetterGuaranteeForm(montoReclamoCartaAval, montoPagadoCartaAval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, resultAseguradoBeneficiario.insertId, idPolicy, idCollective, req.body);
            res.render('letterGuaranteeForm', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se registraron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'sistema/add-letter-guarantee',
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('letterGuaranteeForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-letter-guarantee',
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postEmergencyForm: async (req, res) => {
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                monto_reclamado_emergencia: montoReclamoEmergencia,
                monto_pagado_emergencia: montoPagadoEmergencia,
                fecha_ocurrencia_emergencia: fechaOcurrenciaEmergencia,
                fecha_notificacion_emergencia: fechaNotificacionEmergencia,
                id_rif_asegurado: idRifAsegurado,
                cedula_beneficiario: cedulaBeneficiario,
                numero_poliza: numeroPoliza
            } = req.body;
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let idPolicy = null;
            let idCollective = null;
            const idPolicyArray = resultsPolicies.filter(policy => policy.numero_poliza === numeroPoliza).map(policy => policy.id_poliza);
            const idCollectiveArray = resultsCollectives.filter(collective => collective.numero_colectivo === numeroPoliza).map(collective => collective.id_colectivo);
            fechaOcurrenciaEmergencia = new Date(fechaOcurrenciaEmergencia);
            fechaNotificacionEmergencia = new Date(fechaNotificacionEmergencia);
            montoReclamoEmergencia = montoReclamoEmergencia.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPagadoEmergencia = montoPagadoEmergencia.replace(/[Bs$€]/g, '').replace(' ', '');
            montoReclamoEmergencia = convertStringToNumber(montoReclamoEmergencia);
            if (montoPagadoEmergencia === '') {
                montoPagadoEmergencia = 0;
            } else {
                montoPagadoEmergencia = convertStringToNumber(montoPagadoEmergencia);
            }
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (idPolicyArray.length !== 0) {
                idPolicy = idPolicyArray[0];
            } else if (idCollectiveArray.length !== 0) {
                idCollective = idCollectiveArray[0];
            }
            const resultBeneficiary = await beneficiaryModel.getIdBeneficiary(cedulaBeneficiario);
            const resultAseguradoBeneficiario = await insuredBeneficiaryModel.postAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario); 
            await emergencyModel.postEmergencyForm(montoReclamoEmergencia, montoPagadoEmergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, resultAseguradoBeneficiario.insertId, idPolicy, idCollective, req.body);
            res.render('emergencyForm', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se registraron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'sistema/add-emergency',
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            res.render('emergencyForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-emergency',
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postAMPForm: async (req, res) => {
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                monto_reclamado_amp: montoReclamoAMP,
                monto_pagado_amp: montoPagadoAMP,
                fecha_ocurrencia_amp: fechaOcurrenciaAMP,
                fecha_notificacion_amp: fechaNotificacionAMP,
                id_rif_asegurado: idRifAsegurado,
                cedula_beneficiario: cedulaBeneficiario,
                numero_poliza: numeroPoliza
            } = req.body;
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let idPolicy = null;
            let idCollective = null;
            const idPolicyArray = resultsPolicies.filter(policy => policy.numero_poliza === numeroPoliza).map(policy => policy.id_poliza);
            const idCollectiveArray = resultsCollectives.filter(collective => collective.numero_colectivo === numeroPoliza).map(collective => collective.id_colectivo);
            fechaOcurrenciaAMP = new Date(fechaOcurrenciaAMP);
            fechaNotificacionAMP = new Date(fechaNotificacionAMP);
            montoReclamoAMP = montoReclamoAMP.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPagadoAMP = montoPagadoAMP.replace(/[Bs$€]/g, '').replace(' ', '');
            montoReclamoAMP = convertStringToNumber(montoReclamoAMP);
            if (montoPagadoAMP === '') {
                montoPagadoAMP = 0;
            } else {
                montoPagadoAMP = convertStringToNumber(montoPagadoAMP);
            }
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (idPolicyArray.length !== 0) {
                idPolicy = idPolicyArray[0];
            } else if (idCollectiveArray.length !== 0) {
                idCollective = idCollectiveArray[0];
            }
            const resultBeneficiary = await beneficiaryModel.getIdBeneficiary(cedulaBeneficiario);
            const resultAseguradoBeneficiario = await insuredBeneficiaryModel.postAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario); 
            await ampModel.postAMPForm(montoReclamoAMP, montoPagadoAMP, fechaOcurrenciaAMP, fechaNotificacionAMP, resultAseguradoBeneficiario.insertId, idPolicy, idCollective, req.body);
            res.render('ampForm', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se registraron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'sistema/add-amp',
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            res.render('ampForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-amp',
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
/*                  PUT                  */
    putRefund: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idRefund = req.params.id;
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        if (idRefund.match(valoresAceptados)) {
            const resultRefund = await refundModel.getRefund(idRefund);
            const resultInsuredBeneficiary = await insuredBeneficiaryModel.getAseguradoBeneficiario(resultRefund[0].asegurado_beneficiario_id);
            const fechaOcurrenciaReembolso = resultRefund[0].fecha_ocurrencia_reembolso.toISOString().substring(0, 10);
            const fechaNotificacionReembolso = resultRefund[0].fecha_notificacion_reembolso.toISOString().substring(0, 10);
            let montoReclamoReembolso = resultRefund[0].monto_reclamo_reembolso;
            let montoPagadoReembolso = resultRefund[0].monto_pagado_reembolso;
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            let resultBeneficiary = [];
            let numeroPoliza = '';
            let numeroColectivo = '';
            montoReclamoReembolso = convertNumberToString(montoReclamoReembolso);
            montoPagadoReembolso = convertNumberToString(montoPagadoReembolso);
            montoReclamoReembolso = convertStringToCurrency(resultRefund[0].tipo_moneda_reembolso, montoReclamoReembolso);
            montoPagadoReembolso = convertStringToCurrency(resultRefund[0].tipo_moneda_reembolso, montoPagadoReembolso);
            if (resultInsuredBeneficiary[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultInsuredBeneficiary[0].asegurado_per_jur_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultInsuredBeneficiary[0].asegurado_per_nat_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            }
            if (resultRefund[0].poliza_id !== null) {
                const resultPolicy = await policyModel.getPolicy(resultRefund[0].poliza_id);
                numeroPoliza = resultPolicy[0].numero_poliza;
            } else if (resultRefund[0].colectivo_id !== null) {
                const resultCollective = await collectiveModel.getCollective(resultRefund[0].colectivo_id);
                numeroColectivo = resultCollective[0].numero_colectivo;
            }
            res.render('editRefund', {
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                fechaOcurrenciaReembolso,
                fechaNotificacionReembolso,
                montoReclamoReembolso,
                montoPagadoReembolso,
                numeroPoliza,
                numeroColectivo,
                refund: resultRefund[0],
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putLetterGuarentee: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idLetterGuarentee = req.params.id;
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        if (idLetterGuarentee.match(valoresAceptados)) {
            const resultLetterGuarentee = await letterGuaranteeModel.getLetterGuarantee(idLetterGuarentee);
            const resultInsuredBeneficiary = await insuredBeneficiaryModel.getAseguradoBeneficiario(resultLetterGuarentee[0].asegurado_beneficiario_id);
            const fechaOcurrenciaCartaAval = resultLetterGuarentee[0].fecha_ocurrencia_carta_aval.toISOString().substring(0, 10);
            const fechaNotificacionCartaAval = resultLetterGuarentee[0].fecha_notificacion_carta_aval.toISOString().substring(0, 10);
            let montoReclamoCartaAval = resultLetterGuarentee[0].monto_reclamado_carta_aval;
            let montoPagadoCartaAval = resultLetterGuarentee[0].monto_pagado_carta_aval;
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            let resultBeneficiary = [];
            let numeroPoliza = '';
            let numeroColectivo = '';
            montoReclamoCartaAval = convertNumberToString(montoReclamoCartaAval);
            montoPagadoCartaAval = convertNumberToString(montoPagadoCartaAval);
            montoReclamoCartaAval = convertStringToCurrency(resultLetterGuarentee[0].tipo_moneda_carta_aval, montoReclamoCartaAval);
            montoPagadoCartaAval = convertStringToCurrency(resultLetterGuarentee[0].tipo_moneda_carta_aval, montoPagadoCartaAval);
            if (resultInsuredBeneficiary[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultInsuredBeneficiary[0].asegurado_per_jur_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultInsuredBeneficiary[0].asegurado_per_nat_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            }
            if (resultLetterGuarentee[0].poliza_id !== null) {
                const resultPolicy = await policyModel.getPolicy(resultLetterGuarentee[0].poliza_id);
                numeroPoliza = resultPolicy[0].numero_poliza;
            } else if (resultLetterGuarentee[0].colectivo_id !== null) {
                const resultCollective = await collectiveModel.getCollective(resultLetterGuarentee[0].colectivo_id);
                numeroColectivo = resultCollective[0].numero_colectivo;
            }
            res.render('editLetterGuarentee', {
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                fechaOcurrenciaCartaAval,
                fechaNotificacionCartaAval,
                montoReclamoCartaAval,
                montoPagadoCartaAval,
                numeroPoliza,
                numeroColectivo,
                letterGuarentee: resultLetterGuarentee[0],
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putEmergency: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idEmergency = req.params.id;
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        if (idEmergency.match(valoresAceptados)) {
            const resultEmergency = await emergencyModel.getEmergency(idEmergency);
            const resultInsuredBeneficiary = await insuredBeneficiaryModel.getAseguradoBeneficiario(resultEmergency[0].asegurado_beneficiario_id);
            const fechaOcurrenciaEmergencia = resultEmergency[0].fecha_ocurrencia_emergencia.toISOString().substring(0, 10);
            const fechaNotificacionEmergencia = resultEmergency[0].fecha_notificacion_emergencia.toISOString().substring(0, 10);
            let montoReclamoEmergencia = resultEmergency[0].monto_reclamado_emergencia;
            let montoPagadoEmergencia = resultEmergency[0].monto_pagado_emergencia;
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            let resultBeneficiary = [];
            let numeroPoliza = '';
            let numeroColectivo = '';
            montoReclamoEmergencia = convertNumberToString(montoReclamoEmergencia);
            montoPagadoEmergencia = convertNumberToString(montoPagadoEmergencia);
            montoReclamoEmergencia = convertStringToCurrency(resultEmergency[0].tipo_moneda_emergencia, montoReclamoEmergencia);
            montoPagadoEmergencia = convertStringToCurrency(resultEmergency[0].tipo_moneda_emergencia, montoPagadoEmergencia);
            if (resultInsuredBeneficiary[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultInsuredBeneficiary[0].asegurado_per_jur_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultInsuredBeneficiary[0].asegurado_per_nat_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            }
            if (resultEmergency[0].poliza_id !== null) {
                const resultPolicy = await policyModel.getPolicy(resultEmergency[0].poliza_id);
                numeroPoliza = resultPolicy[0].numero_poliza;
            } else if (resultEmergency[0].colectivo_id !== null) {
                const resultCollective = await collectiveModel.getCollective(resultEmergency[0].colectivo_id);
                numeroColectivo = resultCollective[0].numero_colectivo;
            }
            res.render('editEmergency', {
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                fechaOcurrenciaEmergencia,
                fechaNotificacionEmergencia,
                montoReclamoEmergencia,
                montoPagadoEmergencia,
                numeroPoliza,
                numeroColectivo,
                emergency: resultEmergency[0],
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putAMP: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idAMP = req.params.id;
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        if (idAMP.match(valoresAceptados)) {
            const resultAMP = await ampModel.getAMPId(idAMP);
            const resultInsuredBeneficiary = await insuredBeneficiaryModel.getAseguradoBeneficiario(resultAMP[0].asegurado_beneficiario_id);
            const fechaOcurrenciaAMP = resultAMP[0].fecha_ocurrencia_amp.toISOString().substring(0, 10);
            const fechaNotificacionAMP = resultAMP[0].fecha_notificacion_amp.toISOString().substring(0, 10);
            let montoReclamoAMP = resultAMP[0].monto_reclamado_amp;
            let montoPagadoAMP = resultAMP[0].monto_pagado_amp;
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            let resultBeneficiary = [];
            let numeroPoliza = '';
            let numeroColectivo = '';
            montoReclamoAMP = convertNumberToString(montoReclamoAMP);
            montoPagadoAMP = convertNumberToString(montoPagadoAMP);
            montoReclamoAMP = convertStringToCurrency(resultAMP[0].tipo_moneda_amp, montoReclamoAMP);
            montoPagadoAMP = convertStringToCurrency(resultAMP[0].tipo_moneda_amp, montoPagadoAMP);
            if (resultInsuredBeneficiary[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultInsuredBeneficiary[0].asegurado_per_jur_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultInsuredBeneficiary[0].asegurado_per_nat_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            }
            if (resultAMP[0].poliza_id !== null) {
                const resultPolicy = await policyModel.getPolicy(resultAMP[0].poliza_id);
                numeroPoliza = resultPolicy[0].numero_poliza;
            } else if (resultAMP[0].colectivo_id !== null) {
                const resultCollective = await collectiveModel.getCollective(resultAMP[0].colectivo_id);
                numeroColectivo = resultCollective[0].numero_colectivo;
            }
            res.render('editAMP', {
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                fechaOcurrenciaAMP,
                fechaNotificacionAMP,
                montoReclamoAMP,
                montoPagadoAMP,
                numeroPoliza,
                numeroColectivo,
                amp: resultAMP[0],
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    updateRefund: async (req, res) => {
        const idRefund = req.body.id_reembolso;
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        const resultRefund = await refundModel.getRefund(idRefund);
        const resultInsuredBeneficiary = await insuredBeneficiaryModel.getAseguradoBeneficiario(resultRefund[0].asegurado_beneficiario_id);
        const fechaOcurrenciaReembolso = resultRefund[0].fecha_ocurrencia_reembolso.toISOString().substring(0, 10);
        const fechaNotificacionReembolso = resultRefund[0].fecha_notificacion_reembolso.toISOString().substring(0, 10);
        let montoReclamoReembolso = resultRefund[0].monto_reclamo_reembolso;
        let montoPagadoReembolso = resultRefund[0].monto_pagado_reembolso;
        let resultNaturalInsured = [];
        let resultLegalInsured = [];
        let resultBeneficiary = [];
        let numeroPoliza = '';
        let numeroColectivo = '';
        montoReclamoReembolso = convertNumberToString(montoReclamoReembolso);
        montoPagadoReembolso = convertNumberToString(montoPagadoReembolso);
        montoReclamoReembolso = convertStringToCurrency(resultRefund[0].tipo_moneda_reembolso, montoReclamoReembolso);
        montoPagadoReembolso = convertStringToCurrency(resultRefund[0].tipo_moneda_reembolso, montoPagadoReembolso);
        if (resultInsuredBeneficiary[0].asegurado_per_nat_id === null) {
            resultLegalInsured = await insuredModel.getLegalInsured(resultInsuredBeneficiary[0].asegurado_per_jur_id);
            resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
        } else {
            resultNaturalInsured = await insuredModel.getNaturalInsured(resultInsuredBeneficiary[0].asegurado_per_nat_id);
            resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
        }
        if (resultRefund[0].poliza_id !== null) {
            const resultPolicy = await policyModel.getPolicy(resultRefund[0].poliza_id);
            numeroPoliza = resultPolicy[0].numero_poliza;
        } else if (resultRefund[0].colectivo_id !== null) {
            const resultCollective = await collectiveModel.getCollective(resultRefund[0].colectivo_id);
            numeroColectivo = resultCollective[0].numero_colectivo;
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                monto_reclamo_reembolso: montoReclamoReembolso,
                monto_pagado_reembolso: montoPagadoReembolso,
                fecha_ocurrencia_reembolso: fechaOcurrenciaReembolso,
                fecha_notificacion_reembolso: fechaNotificacionReembolso,
                id_rif_asegurado: idRifAsegurado,
                cedula_beneficiario: cedulaBeneficiario,
                numero_poliza: numeroPoliza
            } = req.body;
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let idPolicy = null;
            let idCollective = null;
            const idPolicyArray = resultsPolicies.filter(policy => policy.numero_poliza === numeroPoliza).map(policy => policy.id_poliza);
            const idCollectiveArray = resultsCollectives.filter(collective => collective.numero_colectivo === numeroPoliza).map(collective => collective.id_colectivo);
            fechaOcurrenciaReembolso = new Date(fechaOcurrenciaReembolso);
            fechaNotificacionReembolso = new Date(fechaNotificacionReembolso);
            montoReclamoReembolso = montoReclamoReembolso.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPagadoReembolso = montoPagadoReembolso.replace(/[Bs$€]/g, '').replace(' ', '');
            montoReclamoReembolso = convertStringToNumber(montoReclamoReembolso);
            if (montoPagadoReembolso === '') {
                montoPagadoReembolso = 0;
            } else {
                montoPagadoReembolso = convertStringToNumber(montoPagadoReembolso);
            }
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (idPolicyArray.length !== 0) {
                idPolicy = idPolicyArray[0];
            } else if (idCollectiveArray.length !== 0) {
                idCollective = idCollectiveArray[0];
            }
            const resultBeneficiary = await beneficiaryModel.getIdBeneficiary(cedulaBeneficiario);
            await insuredBeneficiaryModel.updateAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario, resultRefund[0].asegurado_beneficiario_id);
            await refundModel.updateRefund(montoReclamoReembolso, montoPagadoReembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, resultRefund[0].asegurado_beneficiario_id, idPolicy, idCollective, req.body);
            res.render('editRefund', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se registraron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-refund/${idRefund}`,
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                fechaOcurrenciaReembolso,
                fechaNotificacionReembolso,
                montoReclamoReembolso,
                montoPagadoReembolso,
                numeroPoliza,
                numeroColectivo,
                refund: resultRefund[0],
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('editRefund', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-refund/${idRefund}`,
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                fechaOcurrenciaReembolso,
                fechaNotificacionReembolso,
                montoReclamoReembolso,
                montoPagadoReembolso,
                numeroPoliza,
                numeroColectivo,
                refund: resultRefund[0],
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updateLetterGuarentee: async (req, res) => {
        const idLetterGuarentee = req.body.id_carta_aval;
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        const resultLetterGuarentee = await letterGuaranteeModel.getLetterGuarantee(idLetterGuarentee);
        const resultInsuredBeneficiary = await insuredBeneficiaryModel.getAseguradoBeneficiario(resultLetterGuarentee[0].asegurado_beneficiario_id);
        const fechaOcurrenciaCartaAval = resultLetterGuarentee[0].fecha_ocurrencia_carta_aval.toISOString().substring(0, 10);
        const fechaNotificacionCartaAval = resultLetterGuarentee[0].fecha_notificacion_carta_aval.toISOString().substring(0, 10);
        let montoReclamoCartaAval = resultLetterGuarentee[0].monto_reclamado_carta_aval;
        let montoPagadoCartaAval = resultLetterGuarentee[0].monto_pagado_carta_aval;
        let resultNaturalInsured = [];
        let resultLegalInsured = [];
        let resultBeneficiary = [];
        let numeroPoliza = '';
        let numeroColectivo = '';
        montoReclamoCartaAval = convertNumberToString(montoReclamoCartaAval);
        montoPagadoCartaAval = convertNumberToString(montoPagadoCartaAval);
        montoReclamoCartaAval = convertStringToCurrency(resultLetterGuarentee[0].tipo_moneda_carta_aval, montoReclamoCartaAval);
        montoPagadoCartaAval = convertStringToCurrency(resultLetterGuarentee[0].tipo_moneda_carta_aval, montoPagadoCartaAval);
        if (resultInsuredBeneficiary[0].asegurado_per_nat_id === null) {
            resultLegalInsured = await insuredModel.getLegalInsured(resultInsuredBeneficiary[0].asegurado_per_jur_id);
            resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
        } else {
            resultNaturalInsured = await insuredModel.getNaturalInsured(resultInsuredBeneficiary[0].asegurado_per_nat_id);
            resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
        }
        if (resultLetterGuarentee[0].poliza_id !== null) {
            const resultPolicy = await policyModel.getPolicy(resultLetterGuarentee[0].poliza_id);
            numeroPoliza = resultPolicy[0].numero_poliza;
        } else if (resultLetterGuarentee[0].colectivo_id !== null) {
            const resultCollective = await collectiveModel.getCollective(resultLetterGuarentee[0].colectivo_id);
            numeroColectivo = resultCollective[0].numero_colectivo;
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                monto_reclamado_carta_aval: montoReclamoCartaAval,
                monto_pagado_carta_aval: montoPagadoCartaAval,
                fecha_ocurrencia_carta_aval: fechaOcurrenciaCartaAval,
                fecha_notificacion_carta_aval: fechaNotificacionCartaAval,
                id_rif_asegurado: idRifAsegurado,
                cedula_beneficiario: cedulaBeneficiario,
                numero_poliza: numeroPoliza
            } = req.body;
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let idPolicy = null;
            let idCollective = null;
            const idPolicyArray = resultsPolicies.filter(policy => policy.numero_poliza === numeroPoliza).map(policy => policy.id_poliza);
            const idCollectiveArray = resultsCollectives.filter(collective => collective.numero_colectivo === numeroPoliza).map(collective => collective.id_colectivo);
            fechaOcurrenciaCartaAval = new Date(fechaOcurrenciaCartaAval);
            fechaNotificacionCartaAval = new Date(fechaNotificacionCartaAval);
            montoReclamoCartaAval = montoReclamoCartaAval.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPagadoCartaAval = montoPagadoCartaAval.replace(/[Bs$€]/g, '').replace(' ', '');
            montoReclamoCartaAval = convertStringToNumber(montoReclamoCartaAval);
            if (montoPagadoCartaAval === '') {
                montoPagadoCartaAval = 0;
            } else {
                montoPagadoCartaAval = convertStringToNumber(montoPagadoCartaAval);
            }
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (idPolicyArray.length !== 0) {
                idPolicy = idPolicyArray[0];
            } else if (idCollectiveArray.length !== 0) {
                idCollective = idCollectiveArray[0];
            }
            const resultBeneficiary = await beneficiaryModel.getIdBeneficiary(cedulaBeneficiario);
            await insuredBeneficiaryModel.updateAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario, resultLetterGuarentee[0].asegurado_beneficiario_id);
            await letterGuaranteeModel.updateLetterGuarantee(montoReclamoCartaAval, montoPagadoCartaAval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, resultLetterGuarentee[0].asegurado_beneficiario_id, idPolicy, idCollective, req.body);
            res.render('editLetterGuarentee', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se registraron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-letter-guarantee/${idLetterGuarentee}`,
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                fechaOcurrenciaCartaAval,
                fechaNotificacionCartaAval,
                montoReclamoCartaAval,
                montoPagadoCartaAval,
                numeroPoliza,
                numeroColectivo,
                letterGuarentee: resultLetterGuarentee[0],
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('editLetterGuarentee', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-letter-guarantee/${idLetterGuarentee}`,
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                fechaOcurrenciaCartaAval,
                fechaNotificacionCartaAval,
                montoReclamoCartaAval,
                montoPagadoCartaAval,
                numeroPoliza,
                numeroColectivo,
                letterGuarentee: resultLetterGuarentee[0],
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updateEmergency: async (req, res) => {
        const idEmergency = req.body.id_emergencia;
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        const resultEmergency = await emergencyModel.getEmergency(idEmergency);
        const resultInsuredBeneficiary = await insuredBeneficiaryModel.getAseguradoBeneficiario(resultEmergency[0].asegurado_beneficiario_id);
        const fechaOcurrenciaEmergencia = resultEmergency[0].fecha_ocurrencia_emergencia.toISOString().substring(0, 10);
        const fechaNotificacionEmergencia = resultEmergency[0].fecha_notificacion_emergencia.toISOString().substring(0, 10);
        let montoReclamoEmergencia = resultEmergency[0].monto_reclamado_emergencia;
        let montoPagadoEmergencia = resultEmergency[0].monto_pagado_emergencia;
        let resultNaturalInsured = [];
        let resultLegalInsured = [];
        let resultBeneficiary = [];
        let numeroPoliza = '';
        let numeroColectivo = '';
        montoReclamoEmergencia = convertNumberToString(montoReclamoEmergencia);
        montoPagadoEmergencia = convertNumberToString(montoPagadoEmergencia);
        montoReclamoEmergencia = convertStringToCurrency(resultEmergency[0].tipo_moneda_emergencia, montoReclamoEmergencia);
        montoPagadoEmergencia = convertStringToCurrency(resultEmergency[0].tipo_moneda_emergencia, montoPagadoEmergencia);
        if (resultInsuredBeneficiary[0].asegurado_per_nat_id === null) {
            resultLegalInsured = await insuredModel.getLegalInsured(resultInsuredBeneficiary[0].asegurado_per_jur_id);
            resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
        } else {
            resultNaturalInsured = await insuredModel.getNaturalInsured(resultInsuredBeneficiary[0].asegurado_per_nat_id);
            resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
        }
        if (resultEmergency[0].poliza_id !== null) {
            const resultPolicy = await policyModel.getPolicy(resultEmergency[0].poliza_id);
            numeroPoliza = resultPolicy[0].numero_poliza;
        } else if (resultEmergency[0].colectivo_id !== null) {
            const resultCollective = await collectiveModel.getCollective(resultEmergency[0].colectivo_id);
            numeroColectivo = resultCollective[0].numero_colectivo;
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                monto_reclamado_emergencia: montoReclamoEmergencia,
                monto_pagado_emergencia: montoPagadoEmergencia,
                fecha_ocurrencia_emergencia: fechaOcurrenciaEmergencia,
                fecha_notificacion_emergencia: fechaNotificacionEmergencia,
                id_rif_asegurado: idRifAsegurado,
                cedula_beneficiario: cedulaBeneficiario,
                numero_poliza: numeroPoliza
            } = req.body;
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let idPolicy = null;
            let idCollective = null;
            const idPolicyArray = resultsPolicies.filter(policy => policy.numero_poliza === numeroPoliza).map(policy => policy.id_poliza);
            const idCollectiveArray = resultsCollectives.filter(collective => collective.numero_colectivo === numeroPoliza).map(collective => collective.id_colectivo);
            fechaOcurrenciaEmergencia = new Date(fechaOcurrenciaEmergencia);
            fechaNotificacionEmergencia = new Date(fechaNotificacionEmergencia);
            montoReclamoEmergencia = montoReclamoEmergencia.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPagadoEmergencia = montoPagadoEmergencia.replace(/[Bs$€]/g, '').replace(' ', '');
            montoReclamoEmergencia = convertStringToNumber(montoReclamoEmergencia);
            if (montoPagadoEmergencia === '') {
                montoPagadoEmergencia = 0;
            } else {
                montoPagadoEmergencia = convertStringToNumber(montoPagadoEmergencia);
            }
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (idPolicyArray.length !== 0) {
                idPolicy = idPolicyArray[0];
            } else if (idCollectiveArray.length !== 0) {
                idCollective = idCollectiveArray[0];
            }
            const resultBeneficiary = await beneficiaryModel.getIdBeneficiary(cedulaBeneficiario);
            await insuredBeneficiaryModel.updateAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario, resultEmergency[0].asegurado_beneficiario_id);
            await emergencyModel.updateEmergency(montoReclamoEmergencia, montoPagadoEmergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, resultEmergency[0].asegurado_beneficiario_id, idPolicy, idCollective, req.body);
            res.render('editEmergency', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se registraron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-emergency/${idEmergency}`,
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                fechaOcurrenciaEmergencia,
                fechaNotificacionEmergencia,
                montoReclamoEmergencia,
                montoPagadoEmergencia,
                numeroPoliza,
                numeroColectivo,
                emergency: resultEmergency[0],
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('editEmergency', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-emergency/${idEmergency}`,
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                fechaOcurrenciaEmergencia,
                fechaNotificacionEmergencia,
                montoReclamoEmergencia,
                montoPagadoEmergencia,
                numeroPoliza,
                numeroColectivo,
                emergency: resultEmergency[0],
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updateAMP: async (req, res) => {
        const idAmp = req.body.id_amp;
        const resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        const resultsLegalInsured = await insuredModel.getLegalInsureds();
        const resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        const resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        const resultsPolicies = await policyModel.getPolicies();
        const resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        const resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        const resultsCollectives = await collectiveModel.getCollectives();
        const resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        const resultAMP = await ampModel.getAMPId(idAmp);
        const resultInsuredBeneficiary = await insuredBeneficiaryModel.getAseguradoBeneficiario(resultAMP[0].asegurado_beneficiario_id);
        const fechaOcurrenciaAMP = resultAMP[0].fecha_ocurrencia_amp.toISOString().substring(0, 10);
        const fechaNotificacionAMP = resultAMP[0].fecha_notificacion_amp.toISOString().substring(0, 10);
        let montoReclamoAMP = resultAMP[0].monto_reclamado_amp;
        let montoPagadoAMP = resultAMP[0].monto_pagado_amp;
        let resultNaturalInsured = [];
        let resultLegalInsured = [];
        let resultBeneficiary = [];
        let numeroPoliza = '';
        let numeroColectivo = '';
        montoReclamoAMP = convertNumberToString(montoReclamoAMP);
        montoPagadoAMP = convertNumberToString(montoPagadoAMP);
        montoReclamoAMP = convertStringToCurrency(resultAMP[0].tipo_moneda_amp, montoReclamoAMP);
        montoPagadoAMP = convertStringToCurrency(resultAMP[0].tipo_moneda_amp, montoPagadoAMP);
        if (resultInsuredBeneficiary[0].asegurado_per_nat_id === null) {
            resultLegalInsured = await insuredModel.getLegalInsured(resultInsuredBeneficiary[0].asegurado_per_jur_id);
            resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
        } else {
            resultNaturalInsured = await insuredModel.getNaturalInsured(resultInsuredBeneficiary[0].asegurado_per_nat_id);
            resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
        }
        if (resultAMP[0].poliza_id !== null) {
            const resultPolicy = await policyModel.getPolicy(resultAMP[0].poliza_id);
            numeroPoliza = resultPolicy[0].numero_poliza;
        } else if (resultAMP[0].colectivo_id !== null) {
            const resultCollective = await collectiveModel.getCollective(resultAMP[0].colectivo_id);
            numeroColectivo = resultCollective[0].numero_colectivo;
        }
        try {
            let {
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                monto_reclamado_amp: montoReclamoAMP,
                monto_pagado_amp: montoPagadoAMP,
                fecha_ocurrencia_amp: fechaOcurrenciaAMP,
                fecha_notificacion_amp: fechaNotificacionAMP,
                id_rif_asegurado: idRifAsegurado,
                cedula_beneficiario: cedulaBeneficiario,
                numero_poliza: numeroPoliza
            } = req.body;
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            let idPolicy = null;
            let idCollective = null;
            const idPolicyArray = resultsPolicies.filter(policy => policy.numero_poliza === numeroPoliza).map(policy => policy.id_poliza);
            const idCollectiveArray = resultsCollectives.filter(collective => collective.numero_colectivo === numeroPoliza).map(collective => collective.id_colectivo);
            fechaOcurrenciaAMP = new Date(fechaOcurrenciaAMP);
            fechaNotificacionAMP = new Date(fechaNotificacionAMP);
            montoReclamoAMP = montoReclamoAMP.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPagadoAMP = montoPagadoAMP.replace(/[Bs$€]/g, '').replace(' ', '');
            montoReclamoAMP = convertStringToNumber(montoReclamoAMP);
            if (montoPagadoAMP === '') {
                montoPagadoAMP = 0;
            } else {
                montoPagadoAMP = convertStringToNumber(montoPagadoAMP);
            }
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = idRifAsegurado;
            } else {
                cedulaAseguradoNatural = idRifAsegurado;
            }
            if (idPolicyArray.length !== 0) {
                idPolicy = idPolicyArray[0];
            } else if (idCollectiveArray.length !== 0) {
                idCollective = idCollectiveArray[0];
            }
            const resultBeneficiary = await beneficiaryModel.getIdBeneficiary(cedulaBeneficiario);
            await insuredBeneficiaryModel.updateAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario, resultAMP[0].asegurado_beneficiario_id);
            await ampModel.updateAMP(montoReclamoAMP, montoPagadoAMP, fechaOcurrenciaAMP, fechaNotificacionAMP, resultAMP[0].asegurado_beneficiario_id, idPolicy, idCollective, req.body);
            res.render('editAMP', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se registraron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-amp/${idAmp}`,
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                fechaOcurrenciaAMP,
                fechaNotificacionAMP,
                montoReclamoAMP,
                montoPagadoAMP,
                numeroPoliza,
                numeroColectivo,
                amp: resultAMP[0],
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } catch (error) {
            console.log(error);
            res.render('editAMP', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-amp/${idAmp}`,
                resultsPII,
                resultsPIIB,
                resultsCII,
                resultsCIIB,
                fechaOcurrenciaAMP,
                fechaNotificacionAMP,
                montoReclamoAMP,
                montoPagadoAMP,
                numeroPoliza,
                numeroColectivo,
                amp: resultAMP[0],
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                policies: resultsPolicies,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
/*               DELETE                  */
    disableRefund: async (req, res) => {
        const disableRefund = 1;
        const disableInsuredBeneficiary = 1;
        const resultRefund = await refundModel.getRefund(req.params.id);
        await insuredBeneficiaryModel.disableAseguradoBeneficiario(resultRefund[0].asegurado_beneficiario_id, disableInsuredBeneficiary);
        await refundModel.updateDisableRefund(req.params.id, req.body);
        await refundModel.disableRefund(req.params.id, disableRefund);
        res.redirect('/sistema/refunds');
    },
    disableLetterGuarentee: async (req, res) => {
        const disableLetterGuarentee = 1;
        const disableInsuredBeneficiary = 1;
        const resultLetterGuarantee = await letterGuaranteeModel.getLetterGuarantee(req.params.id);
        await insuredBeneficiaryModel.disableAseguradoBeneficiario(resultLetterGuarantee[0].asegurado_beneficiario_id, disableInsuredBeneficiary);
        await letterGuaranteeModel.updateDisableLetterGuarentee(req.params.id, req.body);
        await letterGuaranteeModel.disableLetterGuarentee(req.params.id, disableLetterGuarentee);
        res.redirect('/sistema/letters-guarentee');
    },
    disableEmergency: async (req, res) => {
        const disableEmergency = 1;
        const disableInsuredBeneficiary = 1;
        const resultEmergency = await emergencyModel.getEmergency(req.params.id);
        await insuredBeneficiaryModel.disableAseguradoBeneficiario(resultEmergency[0].asegurado_beneficiario_id, disableInsuredBeneficiary);
        await emergencyModel.updateDisableEmergency(req.params.id, req.body);
        await emergencyModel.disableEmergency(req.params.id, disableEmergency);
        res.redirect('/sistema/emergencies');
    },
    disableAMP: async (req, res) => {
        const disableAMP = 1;
        const disableInsuredBeneficiary = 1;
        const resultAMP = await ampModel.getAMPId(req.params.id);
        await insuredBeneficiaryModel.disableAseguradoBeneficiario(resultAMP[0].asegurado_beneficiario_id, disableInsuredBeneficiary);
        await ampModel.updateDisableAMP(req.params.id, req.body);
        await ampModel.disableAMP(req.params.id, disableAMP);
        res.redirect('/sistema/amp');
    } 
}