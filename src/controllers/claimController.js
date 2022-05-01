const insuredModel = require('../models/insured');
const refundModel = require('../models/refund');
const letterGuaranteeModel = require('../models/letter_guarentee');
const emergencyModel = require('../models/emergency');
const ampModel = require('../models/amp');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const polInsInsurerBenef = require('../models/pol_aseg_asegurado_benef');
const policyModel = require('../models/policy');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const colInsInsurerBenef = require('../models/col_aseg_asegurado_benef');
const collectiveModel = require('../models/collective');
const beneficiaryModel = require('../models/beneficiary');
const insuredBeneficiaryModel = require('../models/insured_beneficiary');

module.exports = {
/*                  GET                  */
    getRefundForm: async (req, res) => {
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        res.render('refundForm', {
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            resultsPII: resultsPII,
            resultsPIIB: resultsPIIB,
            policies: resultsPolicies,
            resultsCII: resultsCII,
            resultsCIIB: resultsCIIB,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getLetterGuaranteeForm: async (req, res) => {
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        res.render('letterGuaranteeForm', {
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            resultsPII: resultsPII,
            resultsPIIB: resultsPIIB,
            policies: resultsPolicies,
            resultsCII: resultsCII,
            resultsCIIB: resultsCIIB,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getEmergencyForm: async (req, res) => {
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        res.render('emergencyForm', {
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            resultsPII: resultsPII,
            resultsPIIB: resultsPIIB,
            policies: resultsPolicies,
            resultsCII: resultsCII,
            resultsCIIB: resultsCIIB,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getAMPForm: async (req, res) => {
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        res.render('ampForm', {
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            resultsPII: resultsPII,
            resultsPIIB: resultsPIIB,
            policies: resultsPolicies,
            resultsCII: resultsCII,
            resultsCIIB: resultsCIIB,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getRefunds: async (req, res) => {
        let resultsRefunds = await refundModel.getRefunds();
        for (let i = 0; i < resultsRefunds.length; i++) {
            let elementRefund = resultsRefunds[i];
            let claimRefund = elementRefund.monto_reclamo_reembolso;
            let paidRefund = elementRefund.monto_pagado_reembolso; 
            if (claimRefund.toString().includes('.') === true) {
                elementRefund.monto_reclamo_reembolso = elementRefund.monto_reclamo_reembolso.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                elementRefund.monto_reclamo_reembolso = String(elementRefund.monto_reclamo_reembolso).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (paidRefund.toString().includes('.') === true) {
                elementRefund.monto_pagado_reembolso = elementRefund.monto_pagado_reembolso.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                elementRefund.monto_pagado_reembolso = String(elementRefund.monto_pagado_reembolso).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (elementRefund.tipo_moneda_reembolso === 'BOLÍVAR') {
                elementRefund.monto_reclamo_reembolso = `Bs ${elementRefund.monto_reclamo_reembolso}`;
                elementRefund.monto_pagado_reembolso = `Bs ${elementRefund.monto_pagado_reembolso}`;
            } else if (elementRefund.tipo_moneda_reembolso === 'DÓLAR') {
                elementRefund.monto_reclamo_reembolso = `$ ${elementRefund.monto_reclamo_reembolso}`;
                elementRefund.monto_pagado_reembolso = `$ ${elementRefund.monto_pagado_reembolso}`;
            } else if (elementRefund.tipo_moneda_reembolso === 'EUROS') {
                elementRefund.monto_reclamo_reembolso = `€ ${elementRefund.monto_reclamo_reembolso}`;
                elementRefund.monto_pagado_reembolso = `$ ${elementRefund.monto_pagado_reembolso}`;
            }
            elementRefund.fecha_ocurrencia_reembolso = elementRefund.fecha_ocurrencia_reembolso.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            elementRefund.fecha_notificacion_reembolso = elementRefund.fecha_notificacion_reembolso.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
        }
        res.render('refunds',{
            data: resultsRefunds,
            name: req.session.name,
            cookieRol: req.cookies.rol 
        });
    },
    getLettersGuarantee: async (req, res) => {
        let resultsLettersGuarentee = await letterGuaranteeModel.getLettersGuarantee();
        for (let i = 0; i < resultsLettersGuarentee.length; i++) {
            let elementLettersGuarantee = resultsLettersGuarentee[i];
            let claimLettersGuarantee = elementLettersGuarantee.monto_reclamado_carta_aval;
            let paidLettersGuarantee = elementLettersGuarantee.monto_pagado_carta_aval; 
            if (claimLettersGuarantee.toString().includes('.') === true) {
                elementLettersGuarantee.monto_reclamado_carta_aval = elementLettersGuarantee.monto_reclamado_carta_aval.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                elementLettersGuarantee.monto_reclamado_carta_aval = String(elementLettersGuarantee.monto_reclamado_carta_aval).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (paidLettersGuarantee.toString().includes('.') === true) {
                elementLettersGuarantee.monto_pagado_carta_aval = elementLettersGuarantee.monto_pagado_carta_aval.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                elementLettersGuarantee.monto_pagado_carta_aval = String(elementLettersGuarantee.monto_pagado_carta_aval).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (elementLettersGuarantee.tipo_moneda_carta_aval === 'BOLÍVAR') {
                elementLettersGuarantee.monto_reclamado_carta_aval = `Bs ${elementLettersGuarantee.monto_reclamado_carta_aval}`;
                elementLettersGuarantee.monto_pagado_carta_aval = `Bs ${elementLettersGuarantee.monto_pagado_carta_aval}`;
            } else if (elementLettersGuarantee.tipo_moneda_carta_aval === 'DÓLAR') {
                elementLettersGuarantee.monto_reclamado_carta_aval = `$ ${elementLettersGuarantee.monto_reclamado_carta_aval}`;
                elementLettersGuarantee.monto_pagado_carta_aval = `$ ${elementLettersGuarantee.monto_pagado_carta_aval}`;
            } else if (elementLettersGuarantee.tipo_moneda_carta_aval === 'EUROS') {
                elementLettersGuarantee.monto_reclamado_carta_aval = `€ ${elementLettersGuarantee.monto_reclamado_carta_aval}`;
                elementLettersGuarantee.monto_pagado_carta_aval = `$ ${elementLettersGuarantee.monto_pagado_carta_aval}`;
            }
            elementLettersGuarantee.fecha_ocurrencia_carta_aval = elementLettersGuarantee.fecha_ocurrencia_carta_aval.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            elementLettersGuarantee.fecha_notificacion_carta_aval = elementLettersGuarantee.fecha_notificacion_carta_aval.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
        }
        res.render('lettersGuarentee',{
            data: resultsLettersGuarentee,
            name: req.session.name,
            cookieRol: req.cookies.rol 
        });
    },
    getEmergencies: async (req, res) => {
        let resultsEmergencies = await emergencyModel.getEmergencies();
        for (let i = 0; i < resultsEmergencies.length; i++) {
            let elementEmergencies = resultsEmergencies[i];
            let claimEmergencies = elementEmergencies.monto_reclamado_emergencia;
            let paidEmergencies = elementEmergencies.monto_pagado_emergencia; 
            if (claimEmergencies.toString().includes('.') === true) {
                elementEmergencies.monto_reclamado_emergencia = elementEmergencies.monto_reclamado_emergencia.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                elementEmergencies.monto_reclamado_emergencia = String(elementEmergencies.monto_reclamado_emergencia).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (paidEmergencies.toString().includes('.') === true) {
                elementEmergencies.monto_pagado_emergencia = elementEmergencies.monto_pagado_emergencia.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                elementEmergencies.monto_pagado_emergencia = String(elementEmergencies.monto_pagado_emergencia).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (elementEmergencies.tipo_moneda_emergencia === 'BOLÍVAR') {
                elementEmergencies.monto_reclamado_emergencia = `Bs ${elementEmergencies.monto_reclamado_emergencia}`;
                elementEmergencies.monto_pagado_emergencia = `Bs ${elementEmergencies.monto_pagado_emergencia}`;
            } else if (elementEmergencies.tipo_moneda_emergencia === 'DÓLAR') {
                elementEmergencies.monto_reclamado_emergencia = `$ ${elementEmergencies.monto_reclamado_emergencia}`;
                elementEmergencies.monto_pagado_emergencia = `$ ${elementEmergencies.monto_pagado_emergencia}`;
            } else if (elementEmergencies.tipo_moneda_emergencia === 'EUROS') {
                elementEmergencies.monto_reclamado_emergencia = `€ ${elementEmergencies.monto_reclamado_emergencia}`;
                elementEmergencies.monto_pagado_emergencia = `$ ${elementEmergencies.monto_pagado_emergencia}`;
            }
            elementEmergencies.fecha_ocurrencia_emergencia = elementEmergencies.fecha_ocurrencia_emergencia.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            elementEmergencies.fecha_notificacion_emergencia = elementEmergencies.fecha_notificacion_emergencia.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
        }
        res.render('emergencies',{
            data: resultsEmergencies,
            name: req.session.name,
            cookieRol: req.cookies.rol 
        });
    },
    getAMP: async (req, res) => {
        let resultsAMP = await ampModel.getAMP(); 
        for (let i = 0; i < resultsAMP.length; i++) {
            let elementAMP = resultsAMP[i];
            let claimAMP = elementAMP.monto_reclamado_amp;
            let paidAMP = elementAMP.monto_pagado_amp; 
            if (claimAMP.toString().includes('.') === true) {
                elementAMP.monto_reclamado_amp = elementAMP.monto_reclamado_amp.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                elementAMP.monto_reclamado_amp = String(elementAMP.monto_reclamado_amp).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (paidAMP.toString().includes('.') === true) {
                elementAMP.monto_pagado_amp = elementAMP.monto_pagado_amp.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                elementAMP.monto_pagado_amp = String(elementAMP.monto_pagado_amp).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (elementAMP.tipo_moneda_amp === 'BOLÍVAR') {
                elementAMP.monto_reclamado_amp = `Bs ${elementAMP.monto_reclamado_amp}`;
                elementAMP.monto_pagado_amp = `Bs ${elementAMP.monto_pagado_amp}`;
            } else if (elementAMP.tipo_moneda_amp === 'DÓLAR') {
                elementAMP.monto_reclamado_amp = `$ ${elementAMP.monto_reclamado_amp}`;
                elementAMP.monto_pagado_amp = `$ ${elementAMP.monto_pagado_amp}`;
            } else if (elementAMP.tipo_moneda_amp === 'EUROS') {
                elementAMP.monto_reclamado_amp = `€ ${elementAMP.monto_reclamado_amp}`;
                elementAMP.monto_pagado_amp = `$ ${elementAMP.monto_pagado_amp}`;
            }
            elementAMP.fecha_ocurrencia_amp = elementAMP.fecha_ocurrencia_amp.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            elementAMP.fecha_notificacion_amp = elementAMP.fecha_notificacion_amp.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
        }
        res.render('amp',{
            data: resultsAMP,
            name: req.session.name,
            cookieRol: req.cookies.rol 
        });
    },
/*                 POST                  */
    postRefundForm: async (req, res) => {
        const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
        let montoReclamoReembolso = req.body.monto_reclamo_reembolso;
        let montoPagadoReembolso = req.body.monto_pagado_reembolso;
        let fechaOcurrenciaReembolso = new Date(req.body.fecha_ocurrencia_reembolso);
        let fechaNotificacionReembolso = new Date(req.body.fecha_notificacion_reembolso);
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        let cedulaAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        montoReclamoReembolso = montoReclamoReembolso.replace(/[Bs$€]/g, '').replace(' ', '');
        montoPagadoReembolso = montoPagadoReembolso.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((montoReclamoReembolso.indexOf(',') !== -1) && (montoReclamoReembolso.indexOf('.') !== -1)) {
            montoReclamoReembolso = montoReclamoReembolso.replace(",", ".");
            montoReclamoReembolso = montoReclamoReembolso.replace(".", ",");
            montoReclamoReembolso = parseFloat(montoReclamoReembolso.replace(/,/g,''));
        } else if (montoReclamoReembolso.indexOf(',') !== -1) {
            montoReclamoReembolso = montoReclamoReembolso.replace(",", ".");
            montoReclamoReembolso = parseFloat(montoReclamoReembolso);
        } else if (montoReclamoReembolso.indexOf('.') !== -1) {
            montoReclamoReembolso = montoReclamoReembolso.replace(".", ",");
            montoReclamoReembolso = parseFloat(montoReclamoReembolso.replace(/,/g,''));
        }
        if (montoPagadoReembolso === '') {
            montoPagadoReembolso = 0;
        } else {
            if ((montoPagadoReembolso.indexOf(',') !== -1) && (montoPagadoReembolso.indexOf('.') !== -1)) {
                montoPagadoReembolso = montoPagadoReembolso.replace(",", ".");
                montoPagadoReembolso = montoPagadoReembolso.replace(".", ",");
                montoPagadoReembolso = parseFloat(montoPagadoReembolso.replace(/,/g,''));
            } else if (montoPagadoReembolso.indexOf(',') !== -1) {
                montoPagadoReembolso = montoPagadoReembolso.replace(",", ".");
                montoPagadoReembolso = parseFloat(montoPagadoReembolso);
            } else if (montoPagadoReembolso.indexOf('.') !== -1) {
                montoPagadoReembolso = montoPagadoReembolso.replace(".", ",");
                montoPagadoReembolso = parseFloat(montoPagadoReembolso.replace(/,/g,''));
            }
        }
        if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        let resultBeneficiary = await beneficiaryModel.getIdBeneficiary(req.body.cedula_beneficiario);
        let resultAseguradoBeneficiario = await insuredBeneficiaryModel.postAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario); 
        await refundModel.postRefundForm(montoReclamoReembolso, montoPagadoReembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, resultAseguradoBeneficiario.insertId, req.body);
        res.render('refundForm', {
            alert: true,
            alertTitle: 'Exitoso',
            alertMessage: 'Se registraron los datos exitosamente',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'sistema/add-refund',
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            resultsPII: resultsPII,
            resultsPIIB: resultsPIIB,
            policies: resultsPolicies,
            resultsCII: resultsCII,
            resultsCIIB: resultsCIIB,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    postLetterGuaranteeForm: async (req, res) => {
        const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
        let montoReclamoCartaAval = req.body.monto_reclamado_carta_aval;
        let montoPagadoCartaAval = req.body.monto_pagado_carta_aval;
        let fechaOcurrenciaCartaAval = new Date(req.body.fecha_ocurrencia_carta_aval);
        let fechaNotificacionCartaAval = new Date(req.body.fecha_notificacion_carta_aval);
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        let cedulaAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        montoReclamoCartaAval = montoReclamoCartaAval.replace(/[Bs$€]/g, '').replace(' ', '');
        montoPagadoCartaAval = montoPagadoCartaAval.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((montoReclamoCartaAval.indexOf(',') !== -1) && (montoReclamoCartaAval.indexOf('.') !== -1)) {
            montoReclamoCartaAval = montoReclamoCartaAval.replace(",", ".");
            montoReclamoCartaAval = montoReclamoCartaAval.replace(".", ",");
            montoReclamoCartaAval = parseFloat(montoReclamoCartaAval.replace(/,/g,''));
        } else if (montoReclamoCartaAval.indexOf(',') !== -1) {
            montoReclamoCartaAval = montoReclamoCartaAval.replace(",", ".");
            montoReclamoCartaAval = parseFloat(montoReclamoCartaAval);
        } else if (montoReclamoCartaAval.indexOf('.') !== -1) {
            montoReclamoCartaAval = montoReclamoCartaAval.replace(".", ",");
            montoReclamoCartaAval = parseFloat(montoReclamoCartaAval.replace(/,/g,''));
        }
        if (montoPagadoCartaAval === '') {
            montoPagadoCartaAval = 0;
        } else {
            if ((montoPagadoCartaAval.indexOf(',') !== -1) && (montoPagadoCartaAval.indexOf('.') !== -1)) {
                montoPagadoCartaAval = montoPagadoCartaAval.replace(",", ".");
                montoPagadoCartaAval = montoPagadoCartaAval.replace(".", ",");
                montoPagadoCartaAval = parseFloat(montoPagadoCartaAval.replace(/,/g,''));
            } else if (montoPagadoCartaAval.indexOf(',') !== -1) {
                montoPagadoCartaAval = montoPagadoCartaAval.replace(",", ".");
                montoPagadoCartaAval = parseFloat(montoPagadoCartaAval);
            } else if (montoPagadoCartaAval.indexOf('.') !== -1) {
                montoPagadoCartaAval = montoPagadoCartaAval.replace(".", ",");
                montoPagadoCartaAval = parseFloat(montoPagadoCartaAval.replace(/,/g,''));
            }
        }
        if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        let resultBeneficiary = await beneficiaryModel.getIdBeneficiary(req.body.cedula_beneficiario);
        let resultAseguradoBeneficiario = await insuredBeneficiaryModel.postAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario); 
        await letterGuaranteeModel.postLetterGuaranteeForm(montoReclamoCartaAval, montoPagadoCartaAval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, resultAseguradoBeneficiario.insertId, req.body);
        res.render('letterGuaranteeForm', {
            alert: true,
            alertTitle: 'Exitoso',
            alertMessage: 'Se registraron los datos exitosamente',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'sistema/add-letter-guarantee',
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            resultsPII: resultsPII,
            resultsPIIB: resultsPIIB,
            policies: resultsPolicies,
            resultsCII: resultsCII,
            resultsCIIB: resultsCIIB,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    postEmergencyForm: async (req, res) => {
        const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
        let montoReclamoEmergencia = req.body.monto_reclamado_emergencia;
        let montoPagadoEmergencia = req.body.monto_pagado_emergencia;
        let fechaOcurrenciaEmergencia = new Date(req.body.fecha_ocurrencia_emergencia);
        let fechaNotificacionEmergencia = new Date(req.body.fecha_notificacion_emergencia);
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        let cedulaAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        montoReclamoEmergencia = montoReclamoEmergencia.replace(/[Bs$€]/g, '').replace(' ', '');
        montoPagadoEmergencia = montoPagadoEmergencia.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((montoReclamoEmergencia.indexOf(',') !== -1) && (montoReclamoEmergencia.indexOf('.') !== -1)) {
            montoReclamoEmergencia = montoReclamoEmergencia.replace(",", ".");
            montoReclamoEmergencia = montoReclamoEmergencia.replace(".", ",");
            montoReclamoEmergencia = parseFloat(montoReclamoEmergencia.replace(/,/g,''));
        } else if (montoReclamoEmergencia.indexOf(',') !== -1) {
            montoReclamoEmergencia = montoReclamoEmergencia.replace(",", ".");
            montoReclamoEmergencia = parseFloat(montoReclamoEmergencia);
        } else if (montoReclamoEmergencia.indexOf('.') !== -1) {
            montoReclamoEmergencia = montoReclamoEmergencia.replace(".", ",");
            montoReclamoEmergencia = parseFloat(montoReclamoEmergencia.replace(/,/g,''));
        }
        if (montoPagadoEmergencia === '') {
            montoPagadoEmergencia = 0;
        } else {
            if ((montoPagadoEmergencia.indexOf(',') !== -1) && (montoPagadoEmergencia.indexOf('.') !== -1)) {
                montoPagadoEmergencia = montoPagadoEmergencia.replace(",", ".");
                montoPagadoEmergencia = montoPagadoEmergencia.replace(".", ",");
                montoPagadoEmergencia = parseFloat(montoPagadoEmergencia.replace(/,/g,''));
            } else if (montoPagadoEmergencia.indexOf(',') !== -1) {
                montoPagadoEmergencia = montoPagadoEmergencia.replace(",", ".");
                montoPagadoEmergencia = parseFloat(montoPagadoEmergencia);
            } else if (montoPagadoEmergencia.indexOf('.') !== -1) {
                montoPagadoEmergencia = montoPagadoEmergencia.replace(".", ",");
                montoPagadoEmergencia = parseFloat(montoPagadoEmergencia.replace(/,/g,''));
            }
        }
        if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        let resultBeneficiary = await beneficiaryModel.getIdBeneficiary(req.body.cedula_beneficiario);
        let resultAseguradoBeneficiario = await insuredBeneficiaryModel.postAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario); 
        await emergencyModel.postEmergencyForm(montoReclamoEmergencia, montoPagadoEmergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, resultAseguradoBeneficiario.insertId, req.body);
        res.render('emergencyForm', {
            alert: true,
            alertTitle: 'Exitoso',
            alertMessage: 'Se registraron los datos exitosamente',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'sistema/add-emergency',
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            resultsPII: resultsPII,
            resultsPIIB: resultsPIIB,
            policies: resultsPolicies,
            resultsCII: resultsCII,
            resultsCIIB: resultsCIIB,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    postAMPForm: async (req, res) => {
        const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
        let montoReclamoAMP = req.body.monto_reclamado_amp;
        let montoPagadoAMP = req.body.monto_pagado_amp;
        let fechaOcurrenciaAMP = new Date(req.body.fecha_ocurrencia_amp);
        let fechaNotificacionAMP = new Date(req.body.fecha_notificacion_amp);
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        let cedulaAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        montoReclamoAMP = montoReclamoAMP.replace(/[Bs$€]/g, '').replace(' ', '');
        montoPagadoAMP = montoPagadoAMP.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((montoReclamoAMP.indexOf(',') !== -1) && (montoReclamoAMP.indexOf('.') !== -1)) {
            montoReclamoAMP = montoReclamoAMP.replace(",", ".");
            montoReclamoAMP = montoReclamoAMP.replace(".", ",");
            montoReclamoAMP = parseFloat(montoReclamoAMP.replace(/,/g,''));
        } else if (montoReclamoAMP.indexOf(',') !== -1) {
            montoReclamoAMP = montoReclamoAMP.replace(",", ".");
            montoReclamoAMP = parseFloat(montoReclamoAMP);
        } else if (montoReclamoAMP.indexOf('.') !== -1) {
            montoReclamoAMP = montoReclamoAMP.replace(".", ",");
            montoReclamoAMP = parseFloat(montoReclamoAMP.replace(/,/g,''));
        }
        if (montoPagadoAMP === '') {
            montoPagadoAMP = 0;
        } else {
            if ((montoPagadoAMP.indexOf(',') !== -1) && (montoPagadoAMP.indexOf('.') !== -1)) {
                montoPagadoAMP = montoPagadoAMP.replace(",", ".");
                montoPagadoAMP = montoPagadoAMP.replace(".", ",");
                montoPagadoAMP = parseFloat(montoPagadoAMP.replace(/,/g,''));
            } else if (montoPagadoAMP.indexOf(',') !== -1) {
                montoPagadoAMP = montoPagadoAMP.replace(",", ".");
                montoPagadoAMP = parseFloat(montoPagadoAMP);
            } else if (montoPagadoAMP.indexOf('.') !== -1) {
                montoPagadoAMP = montoPagadoAMP.replace(".", ",");
                montoPagadoAMP = parseFloat(montoPagadoAMP.replace(/,/g,''));
            }
        }
        if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        let resultBeneficiary = await beneficiaryModel.getIdBeneficiary(req.body.cedula_beneficiario);
        let resultAseguradoBeneficiario = await insuredBeneficiaryModel.postAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario); 
        await ampModel.postAMPForm(montoReclamoAMP, montoPagadoAMP, fechaOcurrenciaAMP, fechaNotificacionAMP, resultAseguradoBeneficiario.insertId, req.body);
        res.render('ampForm', {
            alert: true,
            alertTitle: 'Exitoso',
            alertMessage: 'Se registraron los datos exitosamente',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'sistema/add-amp',
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            resultsPII: resultsPII,
            resultsPIIB: resultsPIIB,
            policies: resultsPolicies,
            resultsCII: resultsCII,
            resultsCIIB: resultsCIIB,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
/*                  PUT                  */
    putRefund: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        let idRefund = req.params.id;
        if (idRefund.match(valoresAceptados)) {
            let resultRefund = await refundModel.getRefund(idRefund);
            let resultInsuredBeneficiary = await insuredBeneficiaryModel.getAseguradoBeneficiario(resultRefund[0].asegurado_beneficiario_id);
            let fechaOcurrenciaReembolso = resultRefund[0].fecha_ocurrencia_reembolso.toISOString().substring(0, 10);
            let fechaNotificacionReembolso = resultRefund[0].fecha_notificacion_reembolso.toISOString().substring(0, 10);
            let montoReclamoReembolso = resultRefund[0].monto_reclamo_reembolso;
            let montoPagadoReembolso = resultRefund[0].monto_pagado_reembolso;
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            let resultBeneficiary = [];
            if (montoReclamoReembolso.toString().includes('.') === true) {
                montoReclamoReembolso = montoReclamoReembolso.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                montoReclamoReembolso = String(montoReclamoReembolso).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (montoPagadoReembolso.toString().includes('.') === true) {
                montoPagadoReembolso = montoPagadoReembolso.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.'); 
            } else {
                montoPagadoReembolso = String(montoPagadoReembolso).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultInsuredBeneficiary[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultInsuredBeneficiary[0].asegurado_per_jur_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultInsuredBeneficiary[0].asegurado_per_nat_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            }
            if (resultRefund[0].tipo_moneda_reembolso === 'BOLÍVAR') {
                montoReclamoReembolso = `Bs ${montoReclamoReembolso}`;
                montoPagadoReembolso = `Bs ${montoPagadoReembolso}`;
            } else if (resultRefund[0].tipo_moneda_reembolso === 'DÓLAR') {
                montoReclamoReembolso = `$ ${montoReclamoReembolso}`;
                montoPagadoReembolso = `$ ${montoPagadoReembolso}`;
            } else if (resultRefund[0].tipo_moneda_reembolso === 'EUROS') {
                montoReclamoReembolso = `€ ${montoReclamoReembolso}`;
                montoPagadoReembolso = `€ ${montoPagadoReembolso}`;
            }
            res.render('editRefund', {
                refund: resultRefund[0],
                fechaOcurrenciaReembolso: fechaOcurrenciaReembolso,
                fechaNotificacionReembolso: fechaNotificacionReembolso,
                montoReclamoReembolso: montoReclamoReembolso,
                montoPagadoReembolso: montoPagadoReembolso,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                resultsPII: resultsPII,
                resultsPIIB: resultsPIIB,
                policies: resultsPolicies,
                resultsCII: resultsCII,
                resultsCIIB: resultsCIIB,
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
        let valoresAceptados = /^[0-9]+$/;
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        let idLetterGuarentee = req.params.id;
        if (idLetterGuarentee.match(valoresAceptados)) {
            let resultLetterGuarentee = await letterGuaranteeModel.getLetterGuarantee(idLetterGuarentee);
            let resultInsuredBeneficiary = await insuredBeneficiaryModel.getAseguradoBeneficiario(resultLetterGuarentee[0].asegurado_beneficiario_id);
            let fechaOcurrenciaCartaAval = resultLetterGuarentee[0].fecha_ocurrencia_carta_aval.toISOString().substring(0, 10);
            let fechaNotificacionCartaAval = resultLetterGuarentee[0].fecha_notificacion_carta_aval.toISOString().substring(0, 10);
            let montoReclamoCartaAval = resultLetterGuarentee[0].monto_reclamado_carta_aval;
            let montoPagadoCartaAval = resultLetterGuarentee[0].monto_pagado_carta_aval;
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            let resultBeneficiary = [];
            if (montoReclamoCartaAval.toString().includes('.') === true) {
                montoReclamoCartaAval = montoReclamoCartaAval.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                montoReclamoCartaAval = String(montoReclamoCartaAval).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (montoPagadoCartaAval.toString().includes('.') === true) {
                montoPagadoCartaAval = montoPagadoCartaAval.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.'); 
            } else {
                montoPagadoCartaAval = String(montoPagadoCartaAval).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultInsuredBeneficiary[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultInsuredBeneficiary[0].asegurado_per_jur_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultInsuredBeneficiary[0].asegurado_per_nat_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            }
            if (resultLetterGuarentee[0].tipo_moneda_carta_aval === 'BOLÍVAR') {
                montoReclamoCartaAval = `Bs ${montoReclamoCartaAval}`;
                montoPagadoCartaAval = `Bs ${montoPagadoCartaAval}`;
            } else if (resultLetterGuarentee[0].tipo_moneda_carta_aval === 'DÓLAR') {
                montoReclamoCartaAval = `$ ${montoReclamoCartaAval}`;
                montoPagadoCartaAval = `$ ${montoPagadoCartaAval}`;
            } else if (resultLetterGuarentee[0].tipo_moneda_carta_aval === 'EUROS') {
                montoReclamoCartaAval = `€ ${montoReclamoCartaAval}`;
                montoPagadoCartaAval = `€ ${montoPagadoCartaAval}`;
            }
            res.render('editLetterGuarentee', {
                letterGuarentee: resultLetterGuarentee[0],
                fechaOcurrenciaCartaAval: fechaOcurrenciaCartaAval,
                fechaNotificacionCartaAval: fechaNotificacionCartaAval,
                montoReclamoCartaAval: montoReclamoCartaAval,
                montoPagadoCartaAval: montoPagadoCartaAval,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                resultsPII: resultsPII,
                resultsPIIB: resultsPIIB,
                policies: resultsPolicies,
                resultsCII: resultsCII,
                resultsCIIB: resultsCIIB,
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
        let valoresAceptados = /^[0-9]+$/;
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        let idEmergency = req.params.id;
        if (idEmergency.match(valoresAceptados)) {
            let resultEmergency = await emergencyModel.getEmergency(idEmergency);
            let resultInsuredBeneficiary = await insuredBeneficiaryModel.getAseguradoBeneficiario(resultEmergency[0].asegurado_beneficiario_id);
            let fechaOcurrenciaEmergencia = resultEmergency[0].fecha_ocurrencia_emergencia.toISOString().substring(0, 10);
            let fechaNotificacionEmergencia = resultEmergency[0].fecha_notificacion_emergencia.toISOString().substring(0, 10);
            let montoReclamoEmergencia = resultEmergency[0].monto_reclamado_emergencia;
            let montoPagadoEmergencia = resultEmergency[0].monto_pagado_emergencia;
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            let resultBeneficiary = [];
            if (montoReclamoEmergencia.toString().includes('.') === true) {
                montoReclamoEmergencia = montoReclamoEmergencia.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                montoReclamoEmergencia = String(montoReclamoEmergencia).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (montoPagadoEmergencia.toString().includes('.') === true) {
                montoPagadoEmergencia = montoPagadoEmergencia.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.'); 
            } else {
                montoPagadoEmergencia = String(montoPagadoEmergencia).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultInsuredBeneficiary[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultInsuredBeneficiary[0].asegurado_per_jur_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultInsuredBeneficiary[0].asegurado_per_nat_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            }
            if (resultEmergency[0].tipo_moneda_emergencia === 'BOLÍVAR') {
                montoReclamoEmergencia = `Bs ${montoReclamoEmergencia}`;
                montoPagadoEmergencia = `Bs ${montoPagadoEmergencia}`;
            } else if (resultEmergency[0].tipo_moneda_emergencia === 'DÓLAR') {
                montoReclamoEmergencia = `$ ${montoReclamoEmergencia}`;
                montoPagadoEmergencia = `$ ${montoPagadoEmergencia}`;
            } else if (resultEmergency[0].tipo_moneda_emergencia === 'EUROS') {
                montoReclamoEmergencia = `€ ${montoReclamoEmergencia}`;
                montoPagadoEmergencia = `€ ${montoPagadoEmergencia}`;
            }
            res.render('editEmergency', {
                emergency: resultEmergency[0],
                fechaOcurrenciaEmergencia: fechaOcurrenciaEmergencia,
                fechaNotificacionEmergencia: fechaNotificacionEmergencia,
                montoReclamoEmergencia: montoReclamoEmergencia,
                montoPagadoEmergencia: montoPagadoEmergencia,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                resultsPII: resultsPII,
                resultsPIIB: resultsPIIB,
                policies: resultsPolicies,
                resultsCII: resultsCII,
                resultsCIIB: resultsCIIB,
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
        let valoresAceptados = /^[0-9]+$/;
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        let resultsPIIB = await polInsInsurerBenef.getPolInsuInsuredBenefs();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
        let resultsCIIB = await colInsInsurerBenef.getColInsuInsuredBenefs();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsBeneficiaries = await beneficiaryModel.getBeneficiaries();
        let idAMP = req.params.id;
        if (idAMP.match(valoresAceptados)) {
            let resultAMP = await ampModel.getAMPId(idAMP);
            let resultInsuredBeneficiary = await insuredBeneficiaryModel.getAseguradoBeneficiario(resultAMP[0].asegurado_beneficiario_id);
            let fechaOcurrenciaAMP = resultAMP[0].fecha_ocurrencia_amp.toISOString().substring(0, 10);
            let fechaNotificacionAMP = resultAMP[0].fecha_notificacion_amp.toISOString().substring(0, 10);
            let montoReclamoAMP = resultAMP[0].monto_reclamado_amp;
            let montoPagadoAMP = resultAMP[0].monto_pagado_amp;
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            let resultBeneficiary = [];
            if (montoReclamoAMP.toString().includes('.') === true) {
                montoReclamoAMP = montoReclamoAMP.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                montoReclamoAMP = String(montoReclamoAMP).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (montoPagadoAMP.toString().includes('.') === true) {
                montoPagadoAMP = montoPagadoAMP.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.'); 
            } else {
                montoPagadoAMP = String(montoPagadoAMP).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (resultInsuredBeneficiary[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultInsuredBeneficiary[0].asegurado_per_jur_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultInsuredBeneficiary[0].asegurado_per_nat_id);
                resultBeneficiary = await beneficiaryModel.getBeneficiary(resultInsuredBeneficiary[0].beneficiario_id);
            }
            if (resultAMP[0].tipo_moneda_amp === 'BOLÍVAR') {
                montoReclamoAMP = `Bs ${montoReclamoAMP}`;
                montoPagadoAMP = `Bs ${montoPagadoAMP}`;
            } else if (resultAMP[0].tipo_moneda_amp === 'DÓLAR') {
                montoReclamoAMP = `$ ${montoReclamoAMP}`;
                montoPagadoAMP = `$ ${montoPagadoAMP}`;
            } else if (resultAMP[0].tipo_moneda_amp === 'EUROS') {
                montoReclamoAMP = `€ ${montoReclamoAMP}`;
                montoPagadoAMP = `€ ${montoPagadoAMP}`;
            }
            res.render('editAMP', {
                amp: resultAMP[0],
                fechaOcurrenciaAMP: fechaOcurrenciaAMP,
                fechaNotificacionAMP: fechaNotificacionAMP,
                montoReclamoAMP: montoReclamoAMP,
                montoPagadoAMP: montoPagadoAMP,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                beneficiary: resultBeneficiary[0],
                resultsPII: resultsPII,
                resultsPIIB: resultsPIIB,
                policies: resultsPolicies,
                resultsCII: resultsCII,
                resultsCIIB: resultsCIIB,
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
        const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
        const idRefund = req.body.id_reembolso;
        let montoReclamoReembolso = req.body.monto_reclamo_reembolso;
        let montoPagadoReembolso = req.body.monto_pagado_reembolso;
        let fechaOcurrenciaReembolso = new Date(req.body.fecha_ocurrencia_reembolso);
        let fechaNotificacionReembolso = new Date(req.body.fecha_notificacion_reembolso);
        let cedulaAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        let resultRefund = await refundModel.getRefund(idRefund);
        montoReclamoReembolso = montoReclamoReembolso.replace(/[Bs$€]/g, '').replace(' ', '');
        montoPagadoReembolso = montoPagadoReembolso.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((montoReclamoReembolso.indexOf(',') !== -1) && (montoReclamoReembolso.indexOf('.') !== -1)) {
            montoReclamoReembolso = montoReclamoReembolso.replace(",", ".");
            montoReclamoReembolso = montoReclamoReembolso.replace(".", ",");
            montoReclamoReembolso = parseFloat(montoReclamoReembolso.replace(/,/g,''));
        } else if (montoReclamoReembolso.indexOf(',') !== -1) {
            montoReclamoReembolso = montoReclamoReembolso.replace(",", ".");
            montoReclamoReembolso = parseFloat(montoReclamoReembolso);
        } else if (montoReclamoReembolso.indexOf('.') !== -1) {
            montoReclamoReembolso = montoReclamoReembolso.replace(".", ",");
            montoReclamoReembolso = parseFloat(montoReclamoReembolso.replace(/,/g,''));
        }
        if (montoPagadoReembolso === '') {
            montoPagadoReembolso = 0;
        } else {
            if ((montoPagadoReembolso.indexOf(',') !== -1) && (montoPagadoReembolso.indexOf('.') !== -1)) {
                montoPagadoReembolso = montoPagadoReembolso.replace(",", ".");
                montoPagadoReembolso = montoPagadoReembolso.replace(".", ",");
                montoPagadoReembolso = parseFloat(montoPagadoReembolso.replace(/,/g,''));
            } else if (montoPagadoReembolso.indexOf(',') !== -1) {
                montoPagadoReembolso = montoPagadoReembolso.replace(",", ".");
                montoPagadoReembolso = parseFloat(montoPagadoReembolso);
            } else if (montoPagadoReembolso.indexOf('.') !== -1) {
                montoPagadoReembolso = montoPagadoReembolso.replace(".", ",");
                montoPagadoReembolso = parseFloat(montoPagadoReembolso.replace(/,/g,''));
            }
        }
        if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        let resultBeneficiary = await beneficiaryModel.getIdBeneficiary(req.body.cedula_beneficiario);
        await insuredBeneficiaryModel.updateAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario, resultRefund[0].asegurado_beneficiario_id);
        await refundModel.updateRefund(montoReclamoReembolso, montoPagadoReembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, resultRefund[0].asegurado_beneficiario_id, req.body);
        res.redirect(`/sistema/edit-refund/${idRefund}`);
    },
    updateLetterGuarentee: async (req, res) => {
        const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
        const idLetterGuarentee = req.body.id_carta_aval;
        let montoReclamoCartaAval = req.body.monto_reclamado_carta_aval;
        let montoPagadoCartaAval = req.body.monto_pagado_carta_aval;
        let fechaOcurrenciaCartaAval = new Date(req.body.fecha_ocurrencia_carta_aval);
        let fechaNotificacionCartaAval = new Date(req.body.fecha_notificacion_carta_aval);
        let cedulaAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        let resultLetterGuarantee = await letterGuaranteeModel.getLetterGuarantee(idLetterGuarentee);
        montoReclamoCartaAval = montoReclamoCartaAval.replace(/[Bs$€]/g, '').replace(' ', '');
        montoPagadoCartaAval = montoPagadoCartaAval.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((montoReclamoCartaAval.indexOf(',') !== -1) && (montoReclamoCartaAval.indexOf('.') !== -1)) {
            montoReclamoCartaAval = montoReclamoCartaAval.replace(",", ".");
            montoReclamoCartaAval = montoReclamoCartaAval.replace(".", ",");
            montoReclamoCartaAval = parseFloat(montoReclamoCartaAval.replace(/,/g,''));
        } else if (montoReclamoCartaAval.indexOf(',') !== -1) {
            montoReclamoCartaAval = montoReclamoCartaAval.replace(",", ".");
            montoReclamoCartaAval = parseFloat(montoReclamoCartaAval);
        } else if (montoReclamoCartaAval.indexOf('.') !== -1) {
            montoReclamoCartaAval = montoReclamoCartaAval.replace(".", ",");
            montoReclamoCartaAval = parseFloat(montoReclamoCartaAval.replace(/,/g,''));
        }
        if (montoPagadoCartaAval === '') {
            montoPagadoCartaAval = 0;
        } else {
            if ((montoPagadoCartaAval.indexOf(',') !== -1) && (montoPagadoCartaAval.indexOf('.') !== -1)) {
                montoPagadoCartaAval = montoPagadoCartaAval.replace(",", ".");
                montoPagadoCartaAval = montoPagadoCartaAval.replace(".", ",");
                montoPagadoCartaAval = parseFloat(montoPagadoCartaAval.replace(/,/g,''));
            } else if (montoPagadoCartaAval.indexOf(',') !== -1) {
                montoPagadoCartaAval = montoPagadoCartaAval.replace(",", ".");
                montoPagadoCartaAval = parseFloat(montoPagadoCartaAval);
            } else if (montoPagadoCartaAval.indexOf('.') !== -1) {
                montoPagadoCartaAval = montoPagadoCartaAval.replace(".", ",");
                montoPagadoCartaAval = parseFloat(montoPagadoCartaAval.replace(/,/g,''));
            }
        }
        if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        let resultBeneficiary = await beneficiaryModel.getIdBeneficiary(req.body.cedula_beneficiario);
        await insuredBeneficiaryModel.updateAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario, resultLetterGuarantee[0].asegurado_beneficiario_id);
        await letterGuaranteeModel.updateLetterGuarantee(montoReclamoCartaAval, montoPagadoCartaAval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, resultLetterGuarantee[0].asegurado_beneficiario_id, req.body);
        res.redirect(`/sistema/edit-letter-guarantee/${idLetterGuarentee}`);
    },
    updateEmergency: async (req, res) => {
        const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
        const idEmergency = req.body.id_emergencia;
        let montoReclamoEmergencia = req.body.monto_reclamado_emergencia;
        let montoPagadoEmergencia = req.body.monto_pagado_emergencia;
        let fechaOcurrenciaEmergencia = new Date(req.body.fecha_ocurrencia_emergencia);
        let fechaNotificacionEmergencia = new Date(req.body.fecha_notificacion_emergencia);
        let cedulaAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        let resultEmergency = await emergencyModel.getEmergency(idEmergency);
        montoReclamoEmergencia = montoReclamoEmergencia.replace(/[Bs$€]/g, '').replace(' ', '');
        montoPagadoEmergencia = montoPagadoEmergencia.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((montoReclamoEmergencia.indexOf(',') !== -1) && (montoReclamoEmergencia.indexOf('.') !== -1)) {
            montoReclamoEmergencia = montoReclamoEmergencia.replace(",", ".");
            montoReclamoEmergencia = montoReclamoEmergencia.replace(".", ",");
            montoReclamoEmergencia = parseFloat(montoReclamoEmergencia.replace(/,/g,''));
        } else if (montoReclamoEmergencia.indexOf(',') !== -1) {
            montoReclamoEmergencia = montoReclamoEmergencia.replace(",", ".");
            montoReclamoEmergencia = parseFloat(montoReclamoEmergencia);
        } else if (montoReclamoEmergencia.indexOf('.') !== -1) {
            montoReclamoEmergencia = montoReclamoEmergencia.replace(".", ",");
            montoReclamoEmergencia = parseFloat(montoReclamoEmergencia.replace(/,/g,''));
        }
        if (montoPagadoEmergencia === '') {
            montoPagadoEmergencia = 0;
        } else {
            if ((montoPagadoEmergencia.indexOf(',') !== -1) && (montoPagadoEmergencia.indexOf('.') !== -1)) {
                montoPagadoEmergencia = montoPagadoEmergencia.replace(",", ".");
                montoPagadoEmergencia = montoPagadoEmergencia.replace(".", ",");
                montoPagadoEmergencia = parseFloat(montoPagadoEmergencia.replace(/,/g,''));
            } else if (montoPagadoEmergencia.indexOf(',') !== -1) {
                montoPagadoEmergencia = montoPagadoEmergencia.replace(",", ".");
                montoPagadoEmergencia = parseFloat(montoPagadoEmergencia);
            } else if (montoPagadoEmergencia.indexOf('.') !== -1) {
                montoPagadoEmergencia = montoPagadoEmergencia.replace(".", ",");
                montoPagadoEmergencia = parseFloat(montoPagadoEmergencia.replace(/,/g,''));
            }
        }
        if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        let resultBeneficiary = await beneficiaryModel.getIdBeneficiary(req.body.cedula_beneficiario);
        await insuredBeneficiaryModel.updateAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario, resultEmergency[0].asegurado_beneficiario_id);
        await emergencyModel.updateEmergency(montoReclamoEmergencia, montoPagadoEmergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, resultEmergency[0].asegurado_beneficiario_id, req.body);
        res.redirect(`/sistema/edit-emergency/${idEmergency}`);
    },
    updateAMP: async (req, res) => {
        const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
        const idAmp = req.body.id_amp;
        let montoReclamoAMP = req.body.monto_reclamado_amp;
        let montoPagadoAMP = req.body.monto_pagado_amp;
        let fechaOcurrenciaAMP = new Date(req.body.fecha_ocurrencia_amp);
        let fechaNotificacionAMP = new Date(req.body.fecha_notificacion_amp);
        let cedulaAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        let resultAMP = await ampModel.getAMPId(idAmp);
        montoReclamoAMP = montoReclamoAMP.replace(/[Bs$€]/g, '').replace(' ', '');
        montoPagadoAMP = montoPagadoAMP.replace(/[Bs$€]/g, '').replace(' ', '');
        if ((montoReclamoAMP.indexOf(',') !== -1) && (montoReclamoAMP.indexOf('.') !== -1)) {
            montoReclamoAMP = montoReclamoAMP.replace(",", ".");
            montoReclamoAMP = montoReclamoAMP.replace(".", ",");
            montoReclamoAMP = parseFloat(montoReclamoAMP.replace(/,/g,''));
        } else if (montoReclamoAMP.indexOf(',') !== -1) {
            montoReclamoAMP = montoReclamoAMP.replace(",", ".");
            montoReclamoAMP = parseFloat(montoReclamoAMP);
        } else if (montoReclamoAMP.indexOf('.') !== -1) {
            montoReclamoAMP = montoReclamoAMP.replace(".", ",");
            montoReclamoAMP = parseFloat(montoReclamoAMP.replace(/,/g,''));
        }
        if (montoPagadoAMP === '') {
            montoPagadoAMP = 0;
        } else {
            if ((montoPagadoAMP.indexOf(',') !== -1) && (montoPagadoAMP.indexOf('.') !== -1)) {
                montoPagadoAMP = montoPagadoAMP.replace(",", ".");
                montoPagadoAMP = montoPagadoAMP.replace(".", ",");
                montoPagadoAMP = parseFloat(montoPagadoAMP.replace(/,/g,''));
            } else if (montoPagadoAMP.indexOf(',') !== -1) {
                montoPagadoAMP = montoPagadoAMP.replace(",", ".");
                montoPagadoAMP = parseFloat(montoPagadoAMP);
            } else if (montoPagadoAMP.indexOf('.') !== -1) {
                montoPagadoAMP = montoPagadoAMP.replace(".", ",");
                montoPagadoAMP = parseFloat(montoPagadoAMP.replace(/,/g,''));
            }
        }
        if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        let resultBeneficiary = await beneficiaryModel.getIdBeneficiary(req.body.cedula_beneficiario);
        await insuredBeneficiaryModel.updateAseguradoBeneficiario(cedulaAseguradoNatural, rifAseguradoJuridico, resultBeneficiary[0].id_beneficiario, resultAMP[0].asegurado_beneficiario_id);
        await ampModel.updateAMP(montoReclamoAMP, montoPagadoAMP, fechaOcurrenciaAMP, fechaNotificacionAMP, resultAMP[0].asegurado_beneficiario_id, req.body);
        res.redirect(`/sistema/edit-amp/${idAmp}`);
    },
/*               DELETE                  */
    disableRefund: async (req, res) => {
        let disableRefund = 1;
        let disableInsuredBeneficiary = 1;
        let resultRefund = await refundModel.getRefund(req.params.id);
        await insuredBeneficiaryModel.disableAseguradoBeneficiario(resultRefund[0].asegurado_beneficiario_id, disableInsuredBeneficiary);
        await refundModel.updateDisableRefund(req.params.id, req.body);
        await refundModel.disableRefund(req.params.id, disableRefund);
        res.redirect('/sistema/refunds');
    },
    disableLetterGuarentee: async (req, res) => {
        let disableLetterGuarentee = 1;
        let disableInsuredBeneficiary = 1;
        let resultLetterGuarantee = await letterGuaranteeModel.getLetterGuarantee(req.params.id);
        await insuredBeneficiaryModel.disableAseguradoBeneficiario(resultLetterGuarantee[0].asegurado_beneficiario_id, disableInsuredBeneficiary);
        await letterGuaranteeModel.updateDisableLetterGuarentee(req.params.id, req.body);
        await letterGuaranteeModel.disableLetterGuarentee(req.params.id, disableLetterGuarentee);
        res.redirect('/sistema/letters-guarentee');
    },
    disableEmergency: async (req, res) => {
        let disableEmergency = 1;
        let disableInsuredBeneficiary = 1;
        let resultEmergency = await emergencyModel.getEmergency(req.params.id);
        await insuredBeneficiaryModel.disableAseguradoBeneficiario(resultEmergency[0].asegurado_beneficiario_id, disableInsuredBeneficiary);
        await emergencyModel.updateDisableEmergency(req.params.id, req.body);
        await emergencyModel.disableEmergency(req.params.id, disableEmergency);
        res.redirect('/sistema/emergencies');
    },
    disableAMP: async (req, res) => {
        let disableAMP = 1;
        let disableInsuredBeneficiary = 1;
        let resultAMP = await ampModel.getAMPId(req.params.id);
        await insuredBeneficiaryModel.disableAseguradoBeneficiario(resultAMP[0].asegurado_beneficiario_id, disableInsuredBeneficiary);
        await ampModel.updateDisableAMP(req.params.id, req.body);
        await ampModel.disableAMP(req.params.id, disableAMP);
        res.redirect('/sistema/amp');
    } 
}