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
            name: req.session.name
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
            name: req.session.name
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
            name: req.session.name
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
            name: req.session.name
        });
    },
    getRefunds: async (req, res) => {
        let resultsRefunds = await refundModel.getRefunds();
        for (let i = 0; i < resultsRefunds.length; i++) {
            let elementRefund = resultsRefunds[i];
            elementRefund.fecha_ocurrencia_reembolso = elementRefund.fecha_ocurrencia_reembolso.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            elementRefund.fecha_notificacion_reembolso = elementRefund.fecha_notificacion_reembolso.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
        }
        res.render('refunds',{
            data: resultsRefunds,
            name: req.session.name 
        });
    },
    getLettersGuarantee: async (req, res) => {
        let resultsLettersGuarentee = await letterGuaranteeModel.getLettersGuarantee();
        for (let i = 0; i < resultsLettersGuarentee.length; i++) {
            let elementLettersGuarantee = resultsLettersGuarentee[i];
            elementLettersGuarantee.fecha_ocurrencia_carta_aval = elementLettersGuarantee.fecha_ocurrencia_carta_aval.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            elementLettersGuarantee.fecha_notificacion_carta_aval = elementLettersGuarantee.fecha_notificacion_carta_aval.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
        }
        res.render('lettersGuarentee',{
            data: resultsLettersGuarentee,
            name: req.session.name 
        });
    },
    getEmergencies: async (req, res) => {
        let resultsEmergencies = await emergencyModel.getEmergencies();
        for (let i = 0; i < resultsEmergencies.length; i++) {
            let elementEmergencies = resultsEmergencies[i];
            elementEmergencies.fecha_ocurrencia_emergencia = elementEmergencies.fecha_ocurrencia_emergencia.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            elementEmergencies.fecha_notificacion_emergencia = elementEmergencies.fecha_notificacion_emergencia.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
        }
        res.render('emergencies',{
            data: resultsEmergencies,
            name: req.session.name 
        });
    },
    getAMP: async (req, res) => {
        let resultsAMP = await ampModel.getAMP(); 
        for (let i = 0; i < resultsAMP.length; i++) {
            let elementAMP = resultsAMP[i];
            elementAMP.fecha_ocurrencia_amp = elementAMP.fecha_ocurrencia_amp.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            elementAMP.fecha_notificacion_amp = elementAMP.fecha_notificacion_amp.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
        }
        res.render('amp',{
            data: resultsAMP,
            name: req.session.name 
        });
    },
/*                 POST                  */
    postRefundForm: async (req, res) => {
        let montoReclamoReembolso = parseFloat(req.body.monto_reclamo_reembolso);
        let montoPagadoReembolso;
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
        if (req.body.monto_pagado === '') {
            montoPagadoReembolso = 0;
        } else {
            montoPagadoReembolso = parseFloat(req.body.monto_pagado);
        }
        await refundModel.postRefundForm(montoReclamoReembolso, montoPagadoReembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, req.body);
        res.render('refundForm', {
            alert: true,
            alertTitle: 'Exitoso',
            alertMessage: 'Se registraron los datos exitosamente',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'sistema',
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            resultsPII: resultsPII,
            resultsPIIB: resultsPIIB,
            policies: resultsPolicies,
            resultsCII: resultsCII,
            resultsCIIB: resultsCIIB,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name
        });
    },
    postLetterGuaranteeForm: async (req, res) => {
        let montoReclamoCartaAval = parseFloat(req.body.monto_reclamado_carta_aval);
        let montoPagadoCartaAval;
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
        if (req.body.monto_pagado === '') {
            montoPagadoCartaAval = 0;
        } else {
            montoPagadoCartaAval = parseFloat(req.body.monto_pagado);
        }
        await letterGuaranteeModel.postLetterGuaranteeForm(montoReclamoCartaAval, montoPagadoCartaAval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, req.body);
        res.render('letterGuaranteeForm', {
            alert: true,
            alertTitle: 'Exitoso',
            alertMessage: 'Se registraron los datos exitosamente',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'sistema',
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            resultsPII: resultsPII,
            resultsPIIB: resultsPIIB,
            policies: resultsPolicies,
            resultsCII: resultsCII,
            resultsCIIB: resultsCIIB,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name
        });
    },
    postEmergencyForm: async (req, res) => {
        let montoReclamoEmergencia = parseFloat(req.body.monto_reclamado_emergencia);
        let montoPagadoEmergencia;
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
        if (req.body.monto_pagado === '') {
            montoPagadoEmergencia = 0;
        } else {
            montoPagadoEmergencia = parseFloat(req.body.monto_pagado);
        }
        await emergencyModel.postEmergencyForm(montoReclamoEmergencia, montoPagadoEmergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, req.body);
        res.render('emergencyForm', {
            alert: true,
            alertTitle: 'Exitoso',
            alertMessage: 'Se registraron los datos exitosamente',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'sistema',
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            resultsPII: resultsPII,
            resultsPIIB: resultsPIIB,
            policies: resultsPolicies,
            resultsCII: resultsCII,
            resultsCIIB: resultsCIIB,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name
        });
    },
    postAMPForm: async (req, res) => {
        let montoReclamoAMP = parseFloat(req.body.monto_reclamado_amp);
        let montoPagadoAMP = parseFloat(req.body.monto_pagado);
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
        if (req.body.monto_pagado === '') {
            montoPagadoAMP = 0;
        } else {
            montoPagadoAMP = parseFloat(req.body.monto_pagado);
        }
        await ampModel.postAMPForm(montoReclamoAMP, montoPagadoAMP, fechaOcurrenciaAMP, fechaNotificacionAMP, req.body);
        res.render('ampForm', {
            alert: true,
            alertTitle: 'Exitoso',
            alertMessage: 'Se registraron los datos exitosamente',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'sistema',
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            resultsPII: resultsPII,
            resultsPIIB: resultsPIIB,
            policies: resultsPolicies,
            resultsCII: resultsCII,
            resultsCIIB: resultsCIIB,
            collectives: resultsCollectives,
            beneficiaries: resultsBeneficiaries,
            name: req.session.name
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
            let fechaOcurrenciaReembolso = resultRefund[0].fecha_ocurrencia_reembolso.toISOString().substring(0, 10);
            let fechaNotificacionReembolso = resultRefund[0].fecha_notificacion_reembolso.toISOString().substring(0, 10);
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            let arrayBeneficiaryId = [];
            let arrayBeneficiaryName = [];
            if (resultRefund[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultRefund[0].asegurado_per_jur_id);
                for (const itemPII of resultsPII) {
                    if (itemPII.asegurado_per_jur_id === resultRefund[0].asegurado_per_jur_id) {
                        for (const itemPolicy of resultsPolicies) {
                            if (itemPII.poliza_id === itemPolicy.id_poliza) {
                                if ((itemPolicy.tipo_individual_poliza === 'Salud') || (itemPolicy.tipo_individual_poliza === 'Funerario') || (itemPolicy.tipo_individual_poliza === 'Vida')) {
                                    for (const itemPIIB of resultsPIIB) {
                                        if (itemPII.id_paa === itemPIIB.paa_id) {
                                            for (const itemBeneficiary of resultsBeneficiaries) {
                                                if (itemPIIB.beneficiario_id === itemBeneficiary.id_beneficiario) {
                                                    arrayBeneficiaryId.push(itemBeneficiary.cedula_beneficiario);
                                                    var beneficiaryName = itemBeneficiary.nombre_beneficiario + ' ' + itemBeneficiary.apellido_beneficiario;
                                                    arrayBeneficiaryName.push(beneficiaryName);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultRefund[0].asegurado_per_nat_id);
                for (const itemPII of resultsPII) {
                    if (itemPII.asegurado_per_nat_id === resultRefund[0].asegurado_per_nat_id) {
                        for (const itemPolicy of resultsPolicies) {
                            if (itemPII.poliza_id === itemPolicy.id_poliza) {
                                if ((itemPolicy.tipo_individual_poliza === 'Salud') || (itemPolicy.tipo_individual_poliza === 'Funerario') || (itemPolicy.tipo_individual_poliza === 'Vida')) {
                                    for (const itemPIIB of resultsPIIB) {
                                        if (itemPII.id_paa === itemPIIB.paa_id) {
                                            for (const itemBeneficiary of resultsBeneficiaries) {
                                                if (itemPIIB.beneficiario_id === itemBeneficiary.id_beneficiario) {
                                                    arrayBeneficiaryId.push(itemBeneficiary.cedula_beneficiario);
                                                    var beneficiaryName = itemBeneficiary.nombre_beneficiario + ' ' + itemBeneficiary.apellido_beneficiario;
                                                    arrayBeneficiaryName.push(beneficiaryName);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                for (const itemCII of resultsCII) {
                    if (itemCII.asegurado_per_nat_id === resultRefund[0].asegurado_per_nat_id) {
                        for (const itemCollective of resultsCollectives) {
                            if (itemCII.colectivo_id === itemCollective.id_colectivo) {
                                if (itemCollective.tipo_colectivo === 'Salud') {
                                    for (const itemCIIB of resultsCIIB) {
                                        if (itemCII.id_caa === itemCIIB.caa_id) {
                                            for (const itemBeneficiary of resultsBeneficiaries) {
                                                if (itemCIIB.beneficiario_id === itemBeneficiary.id_beneficiario) {
                                                    arrayBeneficiaryId.push(itemBeneficiary.cedula_beneficiario);
                                                    var beneficiaryName = itemBeneficiary.nombre_beneficiario + ' ' + itemBeneficiary.apellido_beneficiario;
                                                    arrayBeneficiaryName.push(beneficiaryName);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            res.render('editRefund', {
                refund: resultRefund[0],
                fechaOcurrenciaReembolso: fechaOcurrenciaReembolso,
                fechaNotificacionReembolso: fechaNotificacionReembolso,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                resultsPII: resultsPII,
                resultsPIIB: resultsPIIB,
                policies: resultsPolicies,
                resultsCII: resultsCII,
                resultsCIIB: resultsCIIB,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                arrayBeneficiaryId: arrayBeneficiaryId,
                arrayBeneficiaryName: arrayBeneficiaryName,
                name: req.session.name
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
            let fechaOcurrenciaCartaAval = resultLetterGuarentee[0].fecha_ocurrencia_carta_aval.toISOString().substring(0, 10);
            let fechaNotificacionCartaAval = resultLetterGuarentee[0].fecha_notificacion_carta_aval.toISOString().substring(0, 10);
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            let arrayBeneficiaryId = [];
            let arrayBeneficiaryName = [];
            if (resultLetterGuarentee[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultLetterGuarentee[0].asegurado_per_jur_id);
                for (const itemPII of resultsPII) {
                    if (itemPII.asegurado_per_jur_id === resultLetterGuarentee[0].asegurado_per_jur_id) {
                        for (const itemPolicy of resultsPolicies) {
                            if (itemPII.poliza_id === itemPolicy.id_poliza) {
                                if ((itemPolicy.tipo_individual_poliza === 'Salud') || (itemPolicy.tipo_individual_poliza === 'Funerario') || (itemPolicy.tipo_individual_poliza === 'Vida')) {
                                    for (const itemPIIB of resultsPIIB) {
                                        if (itemPII.id_paa === itemPIIB.paa_id) {
                                            for (const itemBeneficiary of resultsBeneficiaries) {
                                                if (itemPIIB.beneficiario_id === itemBeneficiary.id_beneficiario) {
                                                    arrayBeneficiaryId.push(itemBeneficiary.cedula_beneficiario);
                                                    var beneficiaryName = itemBeneficiary.nombre_beneficiario + ' ' + itemBeneficiary.apellido_beneficiario;
                                                    arrayBeneficiaryName.push(beneficiaryName);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultLetterGuarentee[0].asegurado_per_nat_id);
                for (const itemPII of resultsPII) {
                    if (itemPII.asegurado_per_nat_id === resultLetterGuarentee[0].asegurado_per_nat_id) {
                        for (const itemPolicy of resultsPolicies) {
                            if (itemPII.poliza_id === itemPolicy.id_poliza) {
                                if ((itemPolicy.tipo_individual_poliza === 'Salud') || (itemPolicy.tipo_individual_poliza === 'Funerario') || (itemPolicy.tipo_individual_poliza === 'Vida')) {
                                    for (const itemPIIB of resultsPIIB) {
                                        if (itemPII.id_paa === itemPIIB.paa_id) {
                                            for (const itemBeneficiary of resultsBeneficiaries) {
                                                if (itemPIIB.beneficiario_id === itemBeneficiary.id_beneficiario) {
                                                    arrayBeneficiaryId.push(itemBeneficiary.cedula_beneficiario);
                                                    var beneficiaryName = itemBeneficiary.nombre_beneficiario + ' ' + itemBeneficiary.apellido_beneficiario;
                                                    arrayBeneficiaryName.push(beneficiaryName);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                for (const itemCII of resultsCII) {
                    if (itemCII.asegurado_per_nat_id === resultLetterGuarentee[0].asegurado_per_nat_id) {
                        for (const itemCollective of resultsCollectives) {
                            if (itemCII.colectivo_id === itemCollective.id_colectivo) {
                                if (itemCollective.tipo_colectivo === 'Salud') {
                                    for (const itemCIIB of resultsCIIB) {
                                        if (itemCII.id_caa === itemCIIB.caa_id) {
                                            for (const itemBeneficiary of resultsBeneficiaries) {
                                                if (itemCIIB.beneficiario_id === itemBeneficiary.id_beneficiario) {
                                                    arrayBeneficiaryId.push(itemBeneficiary.cedula_beneficiario);
                                                    var beneficiaryName = itemBeneficiary.nombre_beneficiario + ' ' + itemBeneficiary.apellido_beneficiario;
                                                    arrayBeneficiaryName.push(beneficiaryName);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            res.render('editLetterGuarentee', {
                letterGuarentee: resultLetterGuarentee[0],
                fechaOcurrenciaCartaAval: fechaOcurrenciaCartaAval,
                fechaNotificacionCartaAval: fechaNotificacionCartaAval,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                resultsPII: resultsPII,
                resultsPIIB: resultsPIIB,
                policies: resultsPolicies,
                resultsCII: resultsCII,
                resultsCIIB: resultsCIIB,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                arrayBeneficiaryId: arrayBeneficiaryId,
                arrayBeneficiaryName: arrayBeneficiaryName,
                name: req.session.name
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
            let fechaOcurrenciaEmergencia = resultEmergency[0].fecha_ocurrencia_emergencia.toISOString().substring(0, 10);
            let fechaNotificacionEmergencia = resultEmergency[0].fecha_notificacion_emergencia.toISOString().substring(0, 10);
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            let arrayBeneficiaryId = [];
            let arrayBeneficiaryName = [];
            if (resultEmergency[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultEmergency[0].asegurado_per_jur_id);
                for (const itemPII of resultsPII) {
                    if (itemPII.asegurado_per_jur_id === resultEmergency[0].asegurado_per_jur_id) {
                        for (const itemPolicy of resultsPolicies) {
                            if (itemPII.poliza_id === itemPolicy.id_poliza) {
                                if ((itemPolicy.tipo_individual_poliza === 'Salud') || (itemPolicy.tipo_individual_poliza === 'Funerario') || (itemPolicy.tipo_individual_poliza === 'Vida')) {
                                    for (const itemPIIB of resultsPIIB) {
                                        if (itemPII.id_paa === itemPIIB.paa_id) {
                                            for (const itemBeneficiary of resultsBeneficiaries) {
                                                if (itemPIIB.beneficiario_id === itemBeneficiary.id_beneficiario) {
                                                    arrayBeneficiaryId.push(itemBeneficiary.cedula_beneficiario);
                                                    var beneficiaryName = itemBeneficiary.nombre_beneficiario + ' ' + itemBeneficiary.apellido_beneficiario;
                                                    arrayBeneficiaryName.push(beneficiaryName);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultEmergency[0].asegurado_per_nat_id);
                for (const itemPII of resultsPII) {
                    if (itemPII.asegurado_per_nat_id === resultEmergency[0].asegurado_per_nat_id) {
                        for (const itemPolicy of resultsPolicies) {
                            if (itemPII.poliza_id === itemPolicy.id_poliza) {
                                if ((itemPolicy.tipo_individual_poliza === 'Salud') || (itemPolicy.tipo_individual_poliza === 'Funerario') || (itemPolicy.tipo_individual_poliza === 'Vida')) {
                                    for (const itemPIIB of resultsPIIB) {
                                        if (itemPII.id_paa === itemPIIB.paa_id) {
                                            for (const itemBeneficiary of resultsBeneficiaries) {
                                                if (itemPIIB.beneficiario_id === itemBeneficiary.id_beneficiario) {
                                                    arrayBeneficiaryId.push(itemBeneficiary.cedula_beneficiario);
                                                    var beneficiaryName = itemBeneficiary.nombre_beneficiario + ' ' + itemBeneficiary.apellido_beneficiario;
                                                    arrayBeneficiaryName.push(beneficiaryName);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                for (const itemCII of resultsCII) {
                    if (itemCII.asegurado_per_nat_id === resultEmergency[0].asegurado_per_nat_id) {
                        for (const itemCollective of resultsCollectives) {
                            if (itemCII.colectivo_id === itemCollective.id_colectivo) {
                                if (itemCollective.tipo_colectivo === 'Salud') {
                                    for (const itemCIIB of resultsCIIB) {
                                        if (itemCII.id_caa === itemCIIB.caa_id) {
                                            for (const itemBeneficiary of resultsBeneficiaries) {
                                                if (itemCIIB.beneficiario_id === itemBeneficiary.id_beneficiario) {
                                                    arrayBeneficiaryId.push(itemBeneficiary.cedula_beneficiario);
                                                    var beneficiaryName = itemBeneficiary.nombre_beneficiario + ' ' + itemBeneficiary.apellido_beneficiario;
                                                    arrayBeneficiaryName.push(beneficiaryName);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            res.render('editEmergency', {
                emergency: resultEmergency[0],
                fechaOcurrenciaEmergencia: fechaOcurrenciaEmergencia,
                fechaNotificacionEmergencia: fechaNotificacionEmergencia,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                resultsPII: resultsPII,
                resultsPIIB: resultsPIIB,
                policies: resultsPolicies,
                resultsCII: resultsCII,
                resultsCIIB: resultsCIIB,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                arrayBeneficiaryId: arrayBeneficiaryId,
                arrayBeneficiaryName: arrayBeneficiaryName,
                name: req.session.name
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
            let fechaOcurrenciaAMP = resultAMP[0].fecha_ocurrencia_amp.toISOString().substring(0, 10);
            let fechaNotificacionAMP = resultAMP[0].fecha_notificacion_amp.toISOString().substring(0, 10);
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            let arrayBeneficiaryId = [];
            let arrayBeneficiaryName = [];
            if (resultAMP[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultAMP[0].asegurado_per_jur_id);
                for (const itemPII of resultsPII) {
                    if (itemPII.asegurado_per_jur_id === resultAMP[0].asegurado_per_jur_id) {
                        for (const itemPolicy of resultsPolicies) {
                            if (itemPII.poliza_id === itemPolicy.id_poliza) {
                                if ((itemPolicy.tipo_individual_poliza === 'Salud') || (itemPolicy.tipo_individual_poliza === 'Funerario') || (itemPolicy.tipo_individual_poliza === 'Vida')) {
                                    for (const itemPIIB of resultsPIIB) {
                                        if (itemPII.id_paa === itemPIIB.paa_id) {
                                            for (const itemBeneficiary of resultsBeneficiaries) {
                                                if (itemPIIB.beneficiario_id === itemBeneficiary.id_beneficiario) {
                                                    arrayBeneficiaryId.push(itemBeneficiary.cedula_beneficiario);
                                                    var beneficiaryName = itemBeneficiary.nombre_beneficiario + ' ' + itemBeneficiary.apellido_beneficiario;
                                                    arrayBeneficiaryName.push(beneficiaryName);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultAMP[0].asegurado_per_nat_id);
                for (const itemPII of resultsPII) {
                    if (itemPII.asegurado_per_nat_id === resultAMP[0].asegurado_per_nat_id) {
                        for (const itemPolicy of resultsPolicies) {
                            if (itemPII.poliza_id === itemPolicy.id_poliza) {
                                if ((itemPolicy.tipo_individual_poliza === 'Salud') || (itemPolicy.tipo_individual_poliza === 'Funerario') || (itemPolicy.tipo_individual_poliza === 'Vida')) {
                                    for (const itemPIIB of resultsPIIB) {
                                        if (itemPII.id_paa === itemPIIB.paa_id) {
                                            for (const itemBeneficiary of resultsBeneficiaries) {
                                                if (itemPIIB.beneficiario_id === itemBeneficiary.id_beneficiario) {
                                                    arrayBeneficiaryId.push(itemBeneficiary.cedula_beneficiario);
                                                    var beneficiaryName = itemBeneficiary.nombre_beneficiario + ' ' + itemBeneficiary.apellido_beneficiario;
                                                    arrayBeneficiaryName.push(beneficiaryName);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                for (const itemCII of resultsCII) {
                    if (itemCII.asegurado_per_nat_id === resultAMP[0].asegurado_per_nat_id) {
                        for (const itemCollective of resultsCollectives) {
                            if (itemCII.colectivo_id === itemCollective.id_colectivo) {
                                if (itemCollective.tipo_colectivo === 'Salud') {
                                    for (const itemCIIB of resultsCIIB) {
                                        if (itemCII.id_caa === itemCIIB.caa_id) {
                                            for (const itemBeneficiary of resultsBeneficiaries) {
                                                if (itemCIIB.beneficiario_id === itemBeneficiary.id_beneficiario) {
                                                    arrayBeneficiaryId.push(itemBeneficiary.cedula_beneficiario);
                                                    var beneficiaryName = itemBeneficiary.nombre_beneficiario + ' ' + itemBeneficiary.apellido_beneficiario;
                                                    arrayBeneficiaryName.push(beneficiaryName);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            res.render('editAMP', {
                amp: resultAMP[0],
                fechaOcurrenciaAMP: fechaOcurrenciaAMP,
                fechaNotificacionAMP: fechaNotificacionAMP,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                resultsPII: resultsPII,
                resultsPIIB: resultsPIIB,
                policies: resultsPolicies,
                resultsCII: resultsCII,
                resultsCIIB: resultsCIIB,
                collectives: resultsCollectives,
                beneficiaries: resultsBeneficiaries,
                arrayBeneficiaryId: arrayBeneficiaryId,
                arrayBeneficiaryName: arrayBeneficiaryName,
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updateRefund: async (req, res) => {
        let montoReclamoReembolso = parseFloat(req.body.monto_reclamo_reembolso);
        let montoPagadoReembolso = parseFloat(req.body.monto_pagado);
        let fechaOcurrenciaReembolso = new Date(req.body.fecha_ocurrencia_reembolso);
        let fechaNotificacionReembolso = new Date(req.body.fecha_notificacion_reembolso);
        await refundModel.updateRefund(montoReclamoReembolso, montoPagadoReembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, req.body);
        res.redirect('/sistema');
    },
    updateLetterGuarentee: async (req, res) => {
        let montoReclamoCartaAval = parseFloat(req.body.monto_reclamado_carta_aval);
        let montoPagadoCartaAval = parseFloat(req.body.monto_pagado);
        let fechaOcurrenciaCartaAval = new Date(req.body.fecha_ocurrencia_carta_aval);
        let fechaNotificacionCartaAval = new Date(req.body.fecha_notificacion_carta_aval);
        await letterGuaranteeModel.updateLetterGuarantee(montoReclamoCartaAval, montoPagadoCartaAval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, req.body);
        res.redirect('/sistema');
    },
    updateEmergency: async (req, res) => {
        let montoReclamoEmergencia = parseFloat(req.body.monto_reclamado_emergencia);
        let montoPagadoEmergencia = parseFloat(req.body.monto_pagado);
        let fechaOcurrenciaEmergencia = new Date(req.body.fecha_ocurrencia_emergencia);
        let fechaNotificacionEmergencia = new Date(req.body.fecha_notificacion_emergencia);
        await emergencyModel.updateEmergency(montoReclamoEmergencia, montoPagadoEmergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, req.body);
        res.redirect('/sistema');
    },
    updateAMP: async (req, res) => {
        let montoReclamoAMP = parseFloat(req.body.monto_reclamado_amp);
        let montoPagadoAMP = parseFloat(req.body.monto_pagado);
        let fechaOcurrenciaAMP = new Date(req.body.fecha_ocurrencia_amp);
        let fechaNotificacionAMP = new Date(req.body.fecha_notificacion_amp);
        await ampModel.updateAMP(montoReclamoAMP, montoPagadoAMP, fechaOcurrenciaAMP, fechaNotificacionAMP, req.body);
        res.redirect('/sistema');
    },
/*               DELETE                  */
    disableRefund: async (req, res) => {
        let disableRefund = 1;
        await refundModel.updateDisableRefund(req.params.id, req.body);
        await refundModel.disableRefund(req.params.id, disableRefund);
        res.redirect('/sistema/refunds');
    },
    disableLetterGuarentee: async (req, res) => {
        let disableLetterGuarentee = 1;
        await letterGuaranteeModel.updateDisableLetterGuarentee(req.params.id, req.body);
        await letterGuaranteeModel.disableLetterGuarentee(req.params.id, disableLetterGuarentee);
        res.redirect('/sistema/letters-guarentee');
    },
    disableEmergency: async (req, res) => {
        let disableEmergency = 1;
        await emergencyModel.updateDisableEmergency(req.params.id, req.body);
        await emergencyModel.disableEmergency(req.params.id, disableEmergency);
        res.redirect('/sistema/emergencies');
    },
    disableAMP: async (req, res) => {
        let disableAMP = 1;
        await ampModel.updateDisableAMP(req.params.id, req.body);
        await ampModel.disableAMP(req.params.id, disableAMP);
        res.redirect('/sistema/amp');
    } 
}