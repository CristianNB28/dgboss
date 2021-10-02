const insuredModel = require('../models/insured');
const refundModel = require('../models/refund');
const letterGuaranteeModel = require('../models/letter_guarentee');
const emergencyModel = require('../models/emergency');
const ampModel = require('../models/amp');

module.exports = {
/*                  GET                  */
    getRefundForm: async (req, res) => {
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        res.render('refundForm', {
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            name: req.session.name
        });
    },
    getLetterGuaranteeForm: async (req, res) => {
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        res.render('letterGuaranteeForm', {
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            name: req.session.name
        });
    },
    getEmergencyForm: async (req, res) => {
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        res.render('emergencyForm', {
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
            name: req.session.name
        });
    },
    getAMPForm: async (req, res) => {
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        res.render('ampForm', {
            naturalInsureds: resultsNaturalInsured,
            legalInsureds: resultsLegalInsured,
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
        let montoReembolso = parseFloat(req.body.monto_reembolso);
        let fechaOcurrenciaReembolso = new Date(req.body.fecha_ocurrencia_reembolso);
        let fechaNotificacionReembolso = new Date(req.body.fecha_notificacion_reembolso);
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        await refundModel.postRefundForm(montoReembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, req.body);
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
            name: req.session.name
        });
    },
    postLetterGuaranteeForm: async (req, res) => {
        let montoCartaAval = parseFloat(req.body.monto_carta_aval);
        let fechaOcurrenciaCartaAval = new Date(req.body.fecha_ocurrencia_carta_aval);
        let fechaNotificacionCartaAval = new Date(req.body.fecha_notificacion_carta_aval);
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        await letterGuaranteeModel.postLetterGuaranteeForm(montoCartaAval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, req.body);
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
            name: req.session.name
        });
    },
    postEmergencyForm: async (req, res) => {
        let montoEmergencia = parseFloat(req.body.monto_emergencia);
        let fechaOcurrenciaEmergencia = new Date(req.body.fecha_ocurrencia_emergencia);
        let fechaNotificacionEmergencia = new Date(req.body.fecha_notificacion_emergencia);
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        await emergencyModel.postEmergencyForm(montoEmergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, req.body);
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
            name: req.session.name
        });
    },
    postAMPForm: async (req, res) => {
        let montoAMP = parseFloat(req.body.monto_amp);
        let fechaOcurrenciaAMP = new Date(req.body.fecha_ocurrencia_amp);
        let fechaNotificacionAMP = new Date(req.body.fecha_notificacion_amp);
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        await ampModel.postAMPForm(montoAMP, fechaOcurrenciaAMP, fechaNotificacionAMP, req.body);
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
            name: req.session.name
        });
    },
/*                  PUT                  */
    putRefund: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let resultsNaturalInsured = await insuredModel.getNaturalInsureds();
        let resultsLegalInsured = await insuredModel.getLegalInsureds();
        let idRefund = req.params.id;
        if (idRefund.match(valoresAceptados)) {
            let resultRefund = await refundModel.getRefund(idRefund);
            let fechaOcurrenciaReembolso = resultRefund[0].fecha_ocurrencia_reembolso.toISOString().substring(0, 10);
            let fechaNotificacionReembolso = resultRefund[0].fecha_notificacion_reembolso.toISOString().substring(0, 10);
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            if (resultRefund[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultRefund[0].asegurado_per_jur_id);
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultRefund[0].asegurado_per_nat_id);
            }
            res.render('editRefund', {
                refund: resultRefund[0],
                fechaOcurrenciaReembolso: fechaOcurrenciaReembolso,
                fechaNotificacionReembolso: fechaNotificacionReembolso,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
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
        let idLetterGuarentee = req.params.id;
        if (idLetterGuarentee.match(valoresAceptados)) {
            let resultLetterGuarentee = await letterGuaranteeModel.getLetterGuarantee(idLetterGuarentee);
            let fechaOcurrenciaCartaAval = resultLetterGuarentee[0].fecha_ocurrencia_carta_aval.toISOString().substring(0, 10);
            let fechaNotificacionCartaAval = resultLetterGuarentee[0].fecha_notificacion_carta_aval.toISOString().substring(0, 10);
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            if (resultLetterGuarentee[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultLetterGuarentee[0].asegurado_per_jur_id);
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultLetterGuarentee[0].asegurado_per_nat_id);
            }
            res.render('editLetterGuarentee', {
                letterGuarentee: resultLetterGuarentee[0],
                fechaOcurrenciaCartaAval: fechaOcurrenciaCartaAval,
                fechaNotificacionCartaAval: fechaNotificacionCartaAval,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
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
        let idEmergency = req.params.id;
        if (idEmergency.match(valoresAceptados)) {
            let resultEmergency = await emergencyModel.getEmergency(idEmergency);
            let fechaOcurrenciaEmergencia = resultEmergency[0].fecha_ocurrencia_emergencia.toISOString().substring(0, 10);
            let fechaNotificacionEmergencia = resultEmergency[0].fecha_notificacion_emergencia.toISOString().substring(0, 10);
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            if (resultEmergency[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultEmergency[0].asegurado_per_jur_id);
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultEmergency[0].asegurado_per_nat_id);
            }
            res.render('editEmergency', {
                emergency: resultEmergency[0],
                fechaOcurrenciaEmergencia: fechaOcurrenciaEmergencia,
                fechaNotificacionEmergencia: fechaNotificacionEmergencia,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
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
        let idAMP = req.params.id;
        if (idAMP.match(valoresAceptados)) {
            let resultAMP = await ampModel.getAMPId(idAMP);
            let fechaOcurrenciaAMP = resultAMP[0].fecha_ocurrencia_amp.toISOString().substring(0, 10);
            let fechaNotificacionAMP = resultAMP[0].fecha_notificacion_amp.toISOString().substring(0, 10);
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            if (resultAMP[0].asegurado_per_nat_id === null) {
                resultLegalInsured = await insuredModel.getLegalInsured(resultAMP[0].asegurado_per_jur_id);
            } else {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultAMP[0].asegurado_per_nat_id);
            }
            res.render('editAMP', {
                amp: resultAMP[0],
                fechaOcurrenciaAMP: fechaOcurrenciaAMP,
                fechaNotificacionAMP: fechaNotificacionAMP,
                naturalInsureds: resultsNaturalInsured,
                legalInsureds: resultsLegalInsured,
                naturalInsured: resultNaturalInsured[0],
                legalInsured: resultLegalInsured[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updateRefund: async (req, res) => {
        let montoReembolso = parseFloat(req.body.monto_reembolso);
        let fechaOcurrenciaReembolso = new Date(req.body.fecha_ocurrencia_reembolso);
        let fechaNotificacionReembolso = new Date(req.body.fecha_notificacion_reembolso);
        await refundModel.updateRefund(montoReembolso, fechaOcurrenciaReembolso, fechaNotificacionReembolso, req.body);
        res.redirect('/sistema');
    },
    updateLetterGuarentee: async (req, res) => {
        let montoCartaAval = parseFloat(req.body.monto_carta_aval);
        let fechaOcurrenciaCartaAval = new Date(req.body.fecha_ocurrencia_carta_aval);
        let fechaNotificacionCartaAval = new Date(req.body.fecha_notificacion_carta_aval);
        await letterGuaranteeModel.updateLetterGuarantee(montoCartaAval, fechaOcurrenciaCartaAval, fechaNotificacionCartaAval, req.body);
        res.redirect('/sistema');
    },
    updateEmergency: async (req, res) => {
        let montoEmergencia = parseFloat(req.body.monto_emergencia);
        let fechaOcurrenciaEmergencia = new Date(req.body.fecha_ocurrencia_emergencia);
        let fechaNotificacionEmergencia = new Date(req.body.fecha_notificacion_emergencia);
        await emergencyModel.updateEmergency(montoEmergencia, fechaOcurrenciaEmergencia, fechaNotificacionEmergencia, req.body);
        res.redirect('/sistema');
    },
    updateAMP: async (req, res) => {
        let montoAMP = parseFloat(req.body.monto_amp);
        let fechaOcurrenciaAMP = new Date(req.body.fecha_ocurrencia_amp);
        let fechaNotificacionAMP = new Date(req.body.fecha_notificacion_amp);
        await ampModel.updateAMP(montoAMP, fechaOcurrenciaAMP, fechaNotificacionAMP, req.body);
        res.redirect('/sistema');
    },
/*               DELETE                  */
    disableRefund: async (req, res) => {
        let disableRefund = 1;
        await refundModel.disableRefund(req.params.id, disableRefund);
        res.redirect('/sistema/refunds');
    },
    disableLetterGuarentee: async (req, res) => {
        let disableLetterGuarentee = 1;
        await letterGuaranteeModel.disableLetterGuarentee(req.params.id, disableLetterGuarentee);
        res.redirect('/sistema/letters-guarentee');
    },
    disableEmergency: async (req, res) => {
        let disableEmergency = 1;
        await emergencyModel.disableEmergency(req.params.id, disableEmergency);
        res.redirect('/sistema/emergencies');
    },
    disableAMP: async (req, res) => {
        let disableAMP = 1;
        await ampModel.disableAMP(req.params.id, disableAMP);
        res.redirect('/sistema/amp');
    } 
}