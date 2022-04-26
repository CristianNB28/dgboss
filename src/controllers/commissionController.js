const commissionModel = require('../models/commission');
const collectiveModel = require('../models/collective');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postVehicleCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision = req.body.caso_especial_comision;
        let porcentajeEjecutivoSuscripcion = req.body.porcentaje_ejecutivo_suscripcion;
        let porcentajeEjecutivoSiniestro = req.body.porcentaje_ejecutivo_siniestro;
        let porcentajeEjecutivoCobranza = req.body.porcentaje_ejecutivo_cobranza;
        let porcentajeFundatinaComision = req.body.porcentaje_fundatina_comision;
        let porcentajeDirectorComision = req.body.porcentaje_director_comision;
        let porcentajeSocioComision = req.body.porcentaje_socio_comision;
        let porcentajeAtinaComision = req.body.porcentaje_atina_comision;
        let montoComision = req.body.monto_comision_comision;
        casoEspecialComision = casoEspecialComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(/[%]/g, '').replace(' ', '');
        porcentajeFundatinaComision = porcentajeFundatinaComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeDirectorComision = porcentajeDirectorComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeSocioComision = porcentajeSocioComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeAtinaComision = porcentajeAtinaComision.replace(/[%]/g, '').replace(' ', '');
        montoComision = montoComision.replace(/[%]/g, '').replace(' ', '');
        if ((porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) && (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1)) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        } else if (porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion);
        } else if (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoSiniestro.indexOf(',') !== -1) && (porcentajeEjecutivoSiniestro.indexOf('.') !== -1)) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        } else if (porcentajeEjecutivoSiniestro.indexOf(',') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro);
        } else if (porcentajeEjecutivoSiniestro.indexOf('.') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoCobranza.indexOf(',') !== -1) && (porcentajeEjecutivoCobranza.indexOf('.') !== -1)) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        } else if (porcentajeEjecutivoCobranza.indexOf(',') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza);
        } else if (porcentajeEjecutivoCobranza.indexOf('.') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        }
        if ((porcentajeFundatinaComision.indexOf(',') !== -1) && (porcentajeFundatinaComision.indexOf('.') !== -1)) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        } else if (porcentajeFundatinaComision.indexOf(',') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision);
        } else if (porcentajeFundatinaComision.indexOf('.') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        }
        if ((porcentajeDirectorComision.indexOf(',') !== -1) && (porcentajeDirectorComision.indexOf('.') !== -1)) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        } else if (porcentajeDirectorComision.indexOf(',') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision);
        } else if (porcentajeDirectorComision.indexOf('.') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        }
        if ((porcentajeSocioComision.indexOf(',') !== -1) && (porcentajeSocioComision.indexOf('.') !== -1)) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        } else if (porcentajeSocioComision.indexOf(',') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision);
        } else if (porcentajeSocioComision.indexOf('.') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        }
        if ((porcentajeAtinaComision.indexOf(',') !== -1) && (porcentajeAtinaComision.indexOf('.') !== -1)) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        } else if (porcentajeAtinaComision.indexOf(',') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision);
        } else if (porcentajeAtinaComision.indexOf('.') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        }
        if (casoEspecialComision === '') {
            casoEspecialComision = 0;
        } else {
            if ((casoEspecialComision.indexOf(',') !== -1) && (casoEspecialComision.indexOf('.') !== -1)) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            } else if (casoEspecialComision.indexOf(',') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = parseFloat(casoEspecialComision);
            } else if (casoEspecialComision.indexOf('.') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            }
        }
        if ((montoComision.indexOf(',') !== -1) && (montoComision.indexOf('.') !== -1)) {
            montoComision = montoComision.replace(",", ".");
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        } else if (montoComision.indexOf(',') !== -1) {
            montoComision = montoComision.replace(",", ".");
            montoComision = parseFloat(montoComision);
        } else if (montoComision.indexOf('.') !== -1) {
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision);
        res.redirect('/sistema/add-vehicle-policy');
    },
    postHealthCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision = req.body.caso_especial_comision;
        let porcentajeEjecutivoSuscripcion = req.body.porcentaje_ejecutivo_suscripcion;
        let porcentajeEjecutivoSiniestro = req.body.porcentaje_ejecutivo_siniestro;
        let porcentajeEjecutivoCobranza = req.body.porcentaje_ejecutivo_cobranza;
        let porcentajeFundatinaComision = req.body.porcentaje_fundatina_comision;
        let porcentajeDirectorComision = req.body.porcentaje_director_comision;
        let porcentajeSocioComision = req.body.porcentaje_socio_comision;
        let porcentajeAtinaComision = req.body.porcentaje_atina_comision;
        let montoComision = req.body.monto_comision_comision;
        casoEspecialComision = casoEspecialComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(/[%]/g, '').replace(' ', '');
        porcentajeFundatinaComision = porcentajeFundatinaComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeDirectorComision = porcentajeDirectorComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeSocioComision = porcentajeSocioComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeAtinaComision = porcentajeAtinaComision.replace(/[%]/g, '').replace(' ', '');
        montoComision = montoComision.replace(/[%]/g, '').replace(' ', '');
        if ((porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) && (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1)) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        } else if (porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion);
        } else if (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoSiniestro.indexOf(',') !== -1) && (porcentajeEjecutivoSiniestro.indexOf('.') !== -1)) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        } else if (porcentajeEjecutivoSiniestro.indexOf(',') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro);
        } else if (porcentajeEjecutivoSiniestro.indexOf('.') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoCobranza.indexOf(',') !== -1) && (porcentajeEjecutivoCobranza.indexOf('.') !== -1)) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        } else if (porcentajeEjecutivoCobranza.indexOf(',') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza);
        } else if (porcentajeEjecutivoCobranza.indexOf('.') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        }
        if ((porcentajeFundatinaComision.indexOf(',') !== -1) && (porcentajeFundatinaComision.indexOf('.') !== -1)) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        } else if (porcentajeFundatinaComision.indexOf(',') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision);
        } else if (porcentajeFundatinaComision.indexOf('.') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        }
        if ((porcentajeDirectorComision.indexOf(',') !== -1) && (porcentajeDirectorComision.indexOf('.') !== -1)) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        } else if (porcentajeDirectorComision.indexOf(',') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision);
        } else if (porcentajeDirectorComision.indexOf('.') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        }
        if ((porcentajeSocioComision.indexOf(',') !== -1) && (porcentajeSocioComision.indexOf('.') !== -1)) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        } else if (porcentajeSocioComision.indexOf(',') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision);
        } else if (porcentajeSocioComision.indexOf('.') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        }
        if ((porcentajeAtinaComision.indexOf(',') !== -1) && (porcentajeAtinaComision.indexOf('.') !== -1)) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        } else if (porcentajeAtinaComision.indexOf(',') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision);
        } else if (porcentajeAtinaComision.indexOf('.') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        }
        if (casoEspecialComision === '') {
            casoEspecialComision = 0;
        } else {
            if ((casoEspecialComision.indexOf(',') !== -1) && (casoEspecialComision.indexOf('.') !== -1)) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            } else if (casoEspecialComision.indexOf(',') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = parseFloat(casoEspecialComision);
            } else if (casoEspecialComision.indexOf('.') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            }
        }
        if ((montoComision.indexOf(',') !== -1) && (montoComision.indexOf('.') !== -1)) {
            montoComision = montoComision.replace(",", ".");
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        } else if (montoComision.indexOf(',') !== -1) {
            montoComision = montoComision.replace(",", ".");
            montoComision = parseFloat(montoComision);
        } else if (montoComision.indexOf('.') !== -1) {
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision);
        res.redirect('/sistema/add-health-policy');
    },
    postPatrimonialCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision = req.body.caso_especial_comision;
        let porcentajeEjecutivoSuscripcion = req.body.porcentaje_ejecutivo_suscripcion;
        let porcentajeEjecutivoSiniestro = req.body.porcentaje_ejecutivo_siniestro;
        let porcentajeEjecutivoCobranza = req.body.porcentaje_ejecutivo_cobranza;
        let porcentajeFundatinaComision = req.body.porcentaje_fundatina_comision;
        let porcentajeDirectorComision = req.body.porcentaje_director_comision;
        let porcentajeSocioComision = req.body.porcentaje_socio_comision;
        let porcentajeAtinaComision = req.body.porcentaje_atina_comision;
        let montoComision = req.body.monto_comision_comision;
        casoEspecialComision = casoEspecialComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(/[%]/g, '').replace(' ', '');
        porcentajeFundatinaComision = porcentajeFundatinaComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeDirectorComision = porcentajeDirectorComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeSocioComision = porcentajeSocioComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeAtinaComision = porcentajeAtinaComision.replace(/[%]/g, '').replace(' ', '');
        montoComision = montoComision.replace(/[%]/g, '').replace(' ', '');
        if ((porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) && (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1)) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        } else if (porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion);
        } else if (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoSiniestro.indexOf(',') !== -1) && (porcentajeEjecutivoSiniestro.indexOf('.') !== -1)) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        } else if (porcentajeEjecutivoSiniestro.indexOf(',') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro);
        } else if (porcentajeEjecutivoSiniestro.indexOf('.') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoCobranza.indexOf(',') !== -1) && (porcentajeEjecutivoCobranza.indexOf('.') !== -1)) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        } else if (porcentajeEjecutivoCobranza.indexOf(',') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza);
        } else if (porcentajeEjecutivoCobranza.indexOf('.') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        }
        if ((porcentajeFundatinaComision.indexOf(',') !== -1) && (porcentajeFundatinaComision.indexOf('.') !== -1)) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        } else if (porcentajeFundatinaComision.indexOf(',') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision);
        } else if (porcentajeFundatinaComision.indexOf('.') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        }
        if ((porcentajeDirectorComision.indexOf(',') !== -1) && (porcentajeDirectorComision.indexOf('.') !== -1)) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        } else if (porcentajeDirectorComision.indexOf(',') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision);
        } else if (porcentajeDirectorComision.indexOf('.') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        }
        if ((porcentajeSocioComision.indexOf(',') !== -1) && (porcentajeSocioComision.indexOf('.') !== -1)) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        } else if (porcentajeSocioComision.indexOf(',') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision);
        } else if (porcentajeSocioComision.indexOf('.') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        }
        if ((porcentajeAtinaComision.indexOf(',') !== -1) && (porcentajeAtinaComision.indexOf('.') !== -1)) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        } else if (porcentajeAtinaComision.indexOf(',') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision);
        } else if (porcentajeAtinaComision.indexOf('.') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        }
        if (casoEspecialComision === '') {
            casoEspecialComision = 0;
        } else {
            if ((casoEspecialComision.indexOf(',') !== -1) && (casoEspecialComision.indexOf('.') !== -1)) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            } else if (casoEspecialComision.indexOf(',') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = parseFloat(casoEspecialComision);
            } else if (casoEspecialComision.indexOf('.') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            }
        }
        if ((montoComision.indexOf(',') !== -1) && (montoComision.indexOf('.') !== -1)) {
            montoComision = montoComision.replace(",", ".");
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        } else if (montoComision.indexOf(',') !== -1) {
            montoComision = montoComision.replace(",", ".");
            montoComision = parseFloat(montoComision);
        } else if (montoComision.indexOf('.') !== -1) {
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision);
        res.redirect('/sistema/add-patrimonial-policy');
    },
    postBailCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision = req.body.caso_especial_comision;
        let porcentajeEjecutivoSuscripcion = req.body.porcentaje_ejecutivo_suscripcion;
        let porcentajeEjecutivoSiniestro = req.body.porcentaje_ejecutivo_siniestro;
        let porcentajeEjecutivoCobranza = req.body.porcentaje_ejecutivo_cobranza;
        let porcentajeFundatinaComision = req.body.porcentaje_fundatina_comision;
        let porcentajeDirectorComision = req.body.porcentaje_director_comision;
        let porcentajeSocioComision = req.body.porcentaje_socio_comision;
        let porcentajeAtinaComision = req.body.porcentaje_atina_comision;
        let montoComision = req.body.monto_comision_comision;
        casoEspecialComision = casoEspecialComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(/[%]/g, '').replace(' ', '');
        porcentajeFundatinaComision = porcentajeFundatinaComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeDirectorComision = porcentajeDirectorComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeSocioComision = porcentajeSocioComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeAtinaComision = porcentajeAtinaComision.replace(/[%]/g, '').replace(' ', '');
        montoComision = montoComision.replace(/[%]/g, '').replace(' ', '');
        if ((porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) && (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1)) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        } else if (porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion);
        } else if (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoSiniestro.indexOf(',') !== -1) && (porcentajeEjecutivoSiniestro.indexOf('.') !== -1)) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        } else if (porcentajeEjecutivoSiniestro.indexOf(',') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro);
        } else if (porcentajeEjecutivoSiniestro.indexOf('.') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoCobranza.indexOf(',') !== -1) && (porcentajeEjecutivoCobranza.indexOf('.') !== -1)) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        } else if (porcentajeEjecutivoCobranza.indexOf(',') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza);
        } else if (porcentajeEjecutivoCobranza.indexOf('.') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        }
        if ((porcentajeFundatinaComision.indexOf(',') !== -1) && (porcentajeFundatinaComision.indexOf('.') !== -1)) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        } else if (porcentajeFundatinaComision.indexOf(',') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision);
        } else if (porcentajeFundatinaComision.indexOf('.') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        }
        if ((porcentajeDirectorComision.indexOf(',') !== -1) && (porcentajeDirectorComision.indexOf('.') !== -1)) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        } else if (porcentajeDirectorComision.indexOf(',') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision);
        } else if (porcentajeDirectorComision.indexOf('.') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        }
        if ((porcentajeSocioComision.indexOf(',') !== -1) && (porcentajeSocioComision.indexOf('.') !== -1)) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        } else if (porcentajeSocioComision.indexOf(',') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision);
        } else if (porcentajeSocioComision.indexOf('.') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        }
        if ((porcentajeAtinaComision.indexOf(',') !== -1) && (porcentajeAtinaComision.indexOf('.') !== -1)) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        } else if (porcentajeAtinaComision.indexOf(',') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision);
        } else if (porcentajeAtinaComision.indexOf('.') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        }
        if (casoEspecialComision === '') {
            casoEspecialComision = 0;
        } else {
            if ((casoEspecialComision.indexOf(',') !== -1) && (casoEspecialComision.indexOf('.') !== -1)) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            } else if (casoEspecialComision.indexOf(',') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = parseFloat(casoEspecialComision);
            } else if (casoEspecialComision.indexOf('.') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            }
        }
        if ((montoComision.indexOf(',') !== -1) && (montoComision.indexOf('.') !== -1)) {
            montoComision = montoComision.replace(",", ".");
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        } else if (montoComision.indexOf(',') !== -1) {
            montoComision = montoComision.replace(",", ".");
            montoComision = parseFloat(montoComision);
        } else if (montoComision.indexOf('.') !== -1) {
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision);
        res.redirect('/sistema/add-bail-policy');
    },
    postAnotherBranchCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision = req.body.caso_especial_comision;
        let porcentajeEjecutivoSuscripcion = req.body.porcentaje_ejecutivo_suscripcion;
        let porcentajeEjecutivoSiniestro = req.body.porcentaje_ejecutivo_siniestro;
        let porcentajeEjecutivoCobranza = req.body.porcentaje_ejecutivo_cobranza;
        let porcentajeFundatinaComision = req.body.porcentaje_fundatina_comision;
        let porcentajeDirectorComision = req.body.porcentaje_director_comision;
        let porcentajeSocioComision = req.body.porcentaje_socio_comision;
        let porcentajeAtinaComision = req.body.porcentaje_atina_comision;
        let montoComision = req.body.monto_comision_comision;
        casoEspecialComision = casoEspecialComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(/[%]/g, '').replace(' ', '');
        porcentajeFundatinaComision = porcentajeFundatinaComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeDirectorComision = porcentajeDirectorComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeSocioComision = porcentajeSocioComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeAtinaComision = porcentajeAtinaComision.replace(/[%]/g, '').replace(' ', '');
        montoComision = montoComision.replace(/[%]/g, '').replace(' ', '');
        if ((porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) && (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1)) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        } else if (porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion);
        } else if (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoSiniestro.indexOf(',') !== -1) && (porcentajeEjecutivoSiniestro.indexOf('.') !== -1)) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        } else if (porcentajeEjecutivoSiniestro.indexOf(',') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro);
        } else if (porcentajeEjecutivoSiniestro.indexOf('.') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoCobranza.indexOf(',') !== -1) && (porcentajeEjecutivoCobranza.indexOf('.') !== -1)) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        } else if (porcentajeEjecutivoCobranza.indexOf(',') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza);
        } else if (porcentajeEjecutivoCobranza.indexOf('.') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        }
        if ((porcentajeFundatinaComision.indexOf(',') !== -1) && (porcentajeFundatinaComision.indexOf('.') !== -1)) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        } else if (porcentajeFundatinaComision.indexOf(',') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision);
        } else if (porcentajeFundatinaComision.indexOf('.') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        }
        if ((porcentajeDirectorComision.indexOf(',') !== -1) && (porcentajeDirectorComision.indexOf('.') !== -1)) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        } else if (porcentajeDirectorComision.indexOf(',') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision);
        } else if (porcentajeDirectorComision.indexOf('.') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        }
        if ((porcentajeSocioComision.indexOf(',') !== -1) && (porcentajeSocioComision.indexOf('.') !== -1)) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        } else if (porcentajeSocioComision.indexOf(',') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision);
        } else if (porcentajeSocioComision.indexOf('.') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        }
        if ((porcentajeAtinaComision.indexOf(',') !== -1) && (porcentajeAtinaComision.indexOf('.') !== -1)) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        } else if (porcentajeAtinaComision.indexOf(',') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision);
        } else if (porcentajeAtinaComision.indexOf('.') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        }
        if (casoEspecialComision === '') {
            casoEspecialComision = 0;
        } else {
            if ((casoEspecialComision.indexOf(',') !== -1) && (casoEspecialComision.indexOf('.') !== -1)) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            } else if (casoEspecialComision.indexOf(',') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = parseFloat(casoEspecialComision);
            } else if (casoEspecialComision.indexOf('.') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            }
        }
        if ((montoComision.indexOf(',') !== -1) && (montoComision.indexOf('.') !== -1)) {
            montoComision = montoComision.replace(",", ".");
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        } else if (montoComision.indexOf(',') !== -1) {
            montoComision = montoComision.replace(",", ".");
            montoComision = parseFloat(montoComision);
        } else if (montoComision.indexOf('.') !== -1) {
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision);
        res.redirect('/sistema/add-another-branch-policy');
    },
    postFuneralCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision = req.body.caso_especial_comision;
        let porcentajeEjecutivoSuscripcion = req.body.porcentaje_ejecutivo_suscripcion;
        let porcentajeEjecutivoSiniestro = req.body.porcentaje_ejecutivo_siniestro;
        let porcentajeEjecutivoCobranza = req.body.porcentaje_ejecutivo_cobranza;
        let porcentajeFundatinaComision = req.body.porcentaje_fundatina_comision;
        let porcentajeDirectorComision = req.body.porcentaje_director_comision;
        let porcentajeSocioComision = req.body.porcentaje_socio_comision;
        let porcentajeAtinaComision = req.body.porcentaje_atina_comision;
        let montoComision = req.body.monto_comision_comision;
        casoEspecialComision = casoEspecialComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(/[%]/g, '').replace(' ', '');
        porcentajeFundatinaComision = porcentajeFundatinaComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeDirectorComision = porcentajeDirectorComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeSocioComision = porcentajeSocioComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeAtinaComision = porcentajeAtinaComision.replace(/[%]/g, '').replace(' ', '');
        montoComision = montoComision.replace(/[%]/g, '').replace(' ', '');
        if ((porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) && (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1)) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        } else if (porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion);
        } else if (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoSiniestro.indexOf(',') !== -1) && (porcentajeEjecutivoSiniestro.indexOf('.') !== -1)) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        } else if (porcentajeEjecutivoSiniestro.indexOf(',') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro);
        } else if (porcentajeEjecutivoSiniestro.indexOf('.') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoCobranza.indexOf(',') !== -1) && (porcentajeEjecutivoCobranza.indexOf('.') !== -1)) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        } else if (porcentajeEjecutivoCobranza.indexOf(',') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza);
        } else if (porcentajeEjecutivoCobranza.indexOf('.') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        }
        if ((porcentajeFundatinaComision.indexOf(',') !== -1) && (porcentajeFundatinaComision.indexOf('.') !== -1)) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        } else if (porcentajeFundatinaComision.indexOf(',') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision);
        } else if (porcentajeFundatinaComision.indexOf('.') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        }
        if ((porcentajeDirectorComision.indexOf(',') !== -1) && (porcentajeDirectorComision.indexOf('.') !== -1)) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        } else if (porcentajeDirectorComision.indexOf(',') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision);
        } else if (porcentajeDirectorComision.indexOf('.') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        }
        if ((porcentajeSocioComision.indexOf(',') !== -1) && (porcentajeSocioComision.indexOf('.') !== -1)) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        } else if (porcentajeSocioComision.indexOf(',') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision);
        } else if (porcentajeSocioComision.indexOf('.') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        }
        if ((porcentajeAtinaComision.indexOf(',') !== -1) && (porcentajeAtinaComision.indexOf('.') !== -1)) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        } else if (porcentajeAtinaComision.indexOf(',') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision);
        } else if (porcentajeAtinaComision.indexOf('.') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        }
        if (casoEspecialComision === '') {
            casoEspecialComision = 0;
        } else {
            if ((casoEspecialComision.indexOf(',') !== -1) && (casoEspecialComision.indexOf('.') !== -1)) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            } else if (casoEspecialComision.indexOf(',') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = parseFloat(casoEspecialComision);
            } else if (casoEspecialComision.indexOf('.') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            }
        }
        if ((montoComision.indexOf(',') !== -1) && (montoComision.indexOf('.') !== -1)) {
            montoComision = montoComision.replace(",", ".");
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        } else if (montoComision.indexOf(',') !== -1) {
            montoComision = montoComision.replace(",", ".");
            montoComision = parseFloat(montoComision);
        } else if (montoComision.indexOf('.') !== -1) {
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision);
        res.redirect('/sistema/add-funeral-policy');
    },
    postLifeCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision = req.body.caso_especial_comision;
        let porcentajeEjecutivoSuscripcion = req.body.porcentaje_ejecutivo_suscripcion;
        let porcentajeEjecutivoSiniestro = req.body.porcentaje_ejecutivo_siniestro;
        let porcentajeEjecutivoCobranza = req.body.porcentaje_ejecutivo_cobranza;
        let porcentajeFundatinaComision = req.body.porcentaje_fundatina_comision;
        let porcentajeDirectorComision = req.body.porcentaje_director_comision;
        let porcentajeSocioComision = req.body.porcentaje_socio_comision;
        let porcentajeAtinaComision = req.body.porcentaje_atina_comision;
        let montoComision = req.body.monto_comision_comision;
        casoEspecialComision = casoEspecialComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(/[%]/g, '').replace(' ', '');
        porcentajeFundatinaComision = porcentajeFundatinaComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeDirectorComision = porcentajeDirectorComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeSocioComision = porcentajeSocioComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeAtinaComision = porcentajeAtinaComision.replace(/[%]/g, '').replace(' ', '');
        montoComision = montoComision.replace(/[%]/g, '').replace(' ', '');
        if ((porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) && (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1)) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        } else if (porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion);
        } else if (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoSiniestro.indexOf(',') !== -1) && (porcentajeEjecutivoSiniestro.indexOf('.') !== -1)) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        } else if (porcentajeEjecutivoSiniestro.indexOf(',') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro);
        } else if (porcentajeEjecutivoSiniestro.indexOf('.') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoCobranza.indexOf(',') !== -1) && (porcentajeEjecutivoCobranza.indexOf('.') !== -1)) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        } else if (porcentajeEjecutivoCobranza.indexOf(',') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza);
        } else if (porcentajeEjecutivoCobranza.indexOf('.') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        }
        if ((porcentajeFundatinaComision.indexOf(',') !== -1) && (porcentajeFundatinaComision.indexOf('.') !== -1)) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        } else if (porcentajeFundatinaComision.indexOf(',') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision);
        } else if (porcentajeFundatinaComision.indexOf('.') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        }
        if ((porcentajeDirectorComision.indexOf(',') !== -1) && (porcentajeDirectorComision.indexOf('.') !== -1)) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        } else if (porcentajeDirectorComision.indexOf(',') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision);
        } else if (porcentajeDirectorComision.indexOf('.') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        }
        if ((porcentajeSocioComision.indexOf(',') !== -1) && (porcentajeSocioComision.indexOf('.') !== -1)) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        } else if (porcentajeSocioComision.indexOf(',') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision);
        } else if (porcentajeSocioComision.indexOf('.') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        }
        if ((porcentajeAtinaComision.indexOf(',') !== -1) && (porcentajeAtinaComision.indexOf('.') !== -1)) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        } else if (porcentajeAtinaComision.indexOf(',') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision);
        } else if (porcentajeAtinaComision.indexOf('.') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        }
        if (casoEspecialComision === '') {
            casoEspecialComision = 0;
        } else {
            if ((casoEspecialComision.indexOf(',') !== -1) && (casoEspecialComision.indexOf('.') !== -1)) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            } else if (casoEspecialComision.indexOf(',') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = parseFloat(casoEspecialComision);
            } else if (casoEspecialComision.indexOf('.') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            }
        }
        if ((montoComision.indexOf(',') !== -1) && (montoComision.indexOf('.') !== -1)) {
            montoComision = montoComision.replace(",", ".");
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        } else if (montoComision.indexOf(',') !== -1) {
            montoComision = montoComision.replace(",", ".");
            montoComision = parseFloat(montoComision);
        } else if (montoComision.indexOf('.') !== -1) {
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision);
        res.redirect('/sistema/add-life-policy');
    },
    postAPCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision = req.body.caso_especial_comision;
        let porcentajeEjecutivoSuscripcion = req.body.porcentaje_ejecutivo_suscripcion;
        let porcentajeEjecutivoSiniestro = req.body.porcentaje_ejecutivo_siniestro;
        let porcentajeEjecutivoCobranza = req.body.porcentaje_ejecutivo_cobranza;
        let porcentajeFundatinaComision = req.body.porcentaje_fundatina_comision;
        let porcentajeDirectorComision = req.body.porcentaje_director_comision;
        let porcentajeSocioComision = req.body.porcentaje_socio_comision;
        let porcentajeAtinaComision = req.body.porcentaje_atina_comision;
        let montoComision = req.body.monto_comision_comision;
        casoEspecialComision = casoEspecialComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(/[%]/g, '').replace(' ', '');
        porcentajeFundatinaComision = porcentajeFundatinaComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeDirectorComision = porcentajeDirectorComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeSocioComision = porcentajeSocioComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeAtinaComision = porcentajeAtinaComision.replace(/[%]/g, '').replace(' ', '');
        montoComision = montoComision.replace(/[%]/g, '').replace(' ', '');
        if ((porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) && (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1)) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        } else if (porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion);
        } else if (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoSiniestro.indexOf(',') !== -1) && (porcentajeEjecutivoSiniestro.indexOf('.') !== -1)) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        } else if (porcentajeEjecutivoSiniestro.indexOf(',') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro);
        } else if (porcentajeEjecutivoSiniestro.indexOf('.') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoCobranza.indexOf(',') !== -1) && (porcentajeEjecutivoCobranza.indexOf('.') !== -1)) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        } else if (porcentajeEjecutivoCobranza.indexOf(',') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza);
        } else if (porcentajeEjecutivoCobranza.indexOf('.') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        }
        if ((porcentajeFundatinaComision.indexOf(',') !== -1) && (porcentajeFundatinaComision.indexOf('.') !== -1)) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        } else if (porcentajeFundatinaComision.indexOf(',') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision);
        } else if (porcentajeFundatinaComision.indexOf('.') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        }
        if ((porcentajeDirectorComision.indexOf(',') !== -1) && (porcentajeDirectorComision.indexOf('.') !== -1)) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        } else if (porcentajeDirectorComision.indexOf(',') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision);
        } else if (porcentajeDirectorComision.indexOf('.') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        }
        if ((porcentajeSocioComision.indexOf(',') !== -1) && (porcentajeSocioComision.indexOf('.') !== -1)) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        } else if (porcentajeSocioComision.indexOf(',') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision);
        } else if (porcentajeSocioComision.indexOf('.') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        }
        if ((porcentajeAtinaComision.indexOf(',') !== -1) && (porcentajeAtinaComision.indexOf('.') !== -1)) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        } else if (porcentajeAtinaComision.indexOf(',') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision);
        } else if (porcentajeAtinaComision.indexOf('.') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        }
        if (casoEspecialComision === '') {
            casoEspecialComision = 0;
        } else {
            if ((casoEspecialComision.indexOf(',') !== -1) && (casoEspecialComision.indexOf('.') !== -1)) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            } else if (casoEspecialComision.indexOf(',') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = parseFloat(casoEspecialComision);
            } else if (casoEspecialComision.indexOf('.') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            }
        }
        if ((montoComision.indexOf(',') !== -1) && (montoComision.indexOf('.') !== -1)) {
            montoComision = montoComision.replace(",", ".");
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        } else if (montoComision.indexOf(',') !== -1) {
            montoComision = montoComision.replace(",", ".");
            montoComision = parseFloat(montoComision);
        } else if (montoComision.indexOf('.') !== -1) {
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision);
        res.redirect('/sistema/add-ap-policy');
    },
    postTravelCommissionForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision = req.body.caso_especial_comision;
        let porcentajeEjecutivoSuscripcion = req.body.porcentaje_ejecutivo_suscripcion;
        let porcentajeEjecutivoSiniestro = req.body.porcentaje_ejecutivo_siniestro;
        let porcentajeEjecutivoCobranza = req.body.porcentaje_ejecutivo_cobranza;
        let porcentajeFundatinaComision = req.body.porcentaje_fundatina_comision;
        let porcentajeDirectorComision = req.body.porcentaje_director_comision;
        let porcentajeSocioComision = req.body.porcentaje_socio_comision;
        let porcentajeAtinaComision = req.body.porcentaje_atina_comision;
        let montoComision = req.body.monto_comision_comision;
        casoEspecialComision = casoEspecialComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(/[%]/g, '').replace(' ', '');
        porcentajeFundatinaComision = porcentajeFundatinaComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeDirectorComision = porcentajeDirectorComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeSocioComision = porcentajeSocioComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeAtinaComision = porcentajeAtinaComision.replace(/[%]/g, '').replace(' ', '');
        montoComision = montoComision.replace(/[%]/g, '').replace(' ', '');
        if ((porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) && (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1)) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        } else if (porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion);
        } else if (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoSiniestro.indexOf(',') !== -1) && (porcentajeEjecutivoSiniestro.indexOf('.') !== -1)) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        } else if (porcentajeEjecutivoSiniestro.indexOf(',') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro);
        } else if (porcentajeEjecutivoSiniestro.indexOf('.') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoCobranza.indexOf(',') !== -1) && (porcentajeEjecutivoCobranza.indexOf('.') !== -1)) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        } else if (porcentajeEjecutivoCobranza.indexOf(',') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza);
        } else if (porcentajeEjecutivoCobranza.indexOf('.') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        }
        if ((porcentajeFundatinaComision.indexOf(',') !== -1) && (porcentajeFundatinaComision.indexOf('.') !== -1)) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        } else if (porcentajeFundatinaComision.indexOf(',') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision);
        } else if (porcentajeFundatinaComision.indexOf('.') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        }
        if ((porcentajeDirectorComision.indexOf(',') !== -1) && (porcentajeDirectorComision.indexOf('.') !== -1)) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        } else if (porcentajeDirectorComision.indexOf(',') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision);
        } else if (porcentajeDirectorComision.indexOf('.') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        }
        if ((porcentajeSocioComision.indexOf(',') !== -1) && (porcentajeSocioComision.indexOf('.') !== -1)) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        } else if (porcentajeSocioComision.indexOf(',') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision);
        } else if (porcentajeSocioComision.indexOf('.') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        }
        if ((porcentajeAtinaComision.indexOf(',') !== -1) && (porcentajeAtinaComision.indexOf('.') !== -1)) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        } else if (porcentajeAtinaComision.indexOf(',') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision);
        } else if (porcentajeAtinaComision.indexOf('.') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        }
        if (casoEspecialComision === '') {
            casoEspecialComision = 0;
        } else {
            if ((casoEspecialComision.indexOf(',') !== -1) && (casoEspecialComision.indexOf('.') !== -1)) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            } else if (casoEspecialComision.indexOf(',') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = parseFloat(casoEspecialComision);
            } else if (casoEspecialComision.indexOf('.') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            }
        }
        if ((montoComision.indexOf(',') !== -1) && (montoComision.indexOf('.') !== -1)) {
            montoComision = montoComision.replace(",", ".");
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        } else if (montoComision.indexOf(',') !== -1) {
            montoComision = montoComision.replace(",", ".");
            montoComision = parseFloat(montoComision);
        } else if (montoComision.indexOf('.') !== -1) {
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        }
        await commissionModel.postCommissionForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision);
        res.redirect('/sistema/add-travel-policy');
    },
    postHealthCommissionCollectiveForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision = req.body.caso_especial_comision;
        let porcentajeEjecutivoSuscripcion = req.body.porcentaje_ejecutivo_suscripcion;
        let porcentajeEjecutivoSiniestro = req.body.porcentaje_ejecutivo_siniestro;
        let porcentajeEjecutivoCobranza = req.body.porcentaje_ejecutivo_cobranza;
        let porcentajeFundatinaComision = req.body.porcentaje_fundatina_comision;
        let porcentajeDirectorComision = req.body.porcentaje_director_comision;
        let porcentajeSocioComision = req.body.porcentaje_socio_comision;
        let porcentajeAtinaComision = req.body.porcentaje_atina_comision;
        let montoComision = req.body.monto_comision_comision;
        casoEspecialComision = casoEspecialComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(/[%]/g, '').replace(' ', '');
        porcentajeFundatinaComision = porcentajeFundatinaComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeDirectorComision = porcentajeDirectorComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeSocioComision = porcentajeSocioComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeAtinaComision = porcentajeAtinaComision.replace(/[%]/g, '').replace(' ', '');
        montoComision = montoComision.replace(/[%]/g, '').replace(' ', '');
        let idCollective = await collectiveModel.getCollectiveLast();
        if ((porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) && (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1)) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        } else if (porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion);
        } else if (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoSiniestro.indexOf(',') !== -1) && (porcentajeEjecutivoSiniestro.indexOf('.') !== -1)) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        } else if (porcentajeEjecutivoSiniestro.indexOf(',') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro);
        } else if (porcentajeEjecutivoSiniestro.indexOf('.') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoCobranza.indexOf(',') !== -1) && (porcentajeEjecutivoCobranza.indexOf('.') !== -1)) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        } else if (porcentajeEjecutivoCobranza.indexOf(',') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza);
        } else if (porcentajeEjecutivoCobranza.indexOf('.') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        }
        if ((porcentajeFundatinaComision.indexOf(',') !== -1) && (porcentajeFundatinaComision.indexOf('.') !== -1)) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        } else if (porcentajeFundatinaComision.indexOf(',') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision);
        } else if (porcentajeFundatinaComision.indexOf('.') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        }
        if ((porcentajeDirectorComision.indexOf(',') !== -1) && (porcentajeDirectorComision.indexOf('.') !== -1)) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        } else if (porcentajeDirectorComision.indexOf(',') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision);
        } else if (porcentajeDirectorComision.indexOf('.') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        }
        if ((porcentajeSocioComision.indexOf(',') !== -1) && (porcentajeSocioComision.indexOf('.') !== -1)) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        } else if (porcentajeSocioComision.indexOf(',') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision);
        } else if (porcentajeSocioComision.indexOf('.') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        }
        if ((porcentajeAtinaComision.indexOf(',') !== -1) && (porcentajeAtinaComision.indexOf('.') !== -1)) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        } else if (porcentajeAtinaComision.indexOf(',') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision);
        } else if (porcentajeAtinaComision.indexOf('.') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        }
        if (casoEspecialComision === '') {
            casoEspecialComision = 0;
        } else {
            if ((casoEspecialComision.indexOf(',') !== -1) && (casoEspecialComision.indexOf('.') !== -1)) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            } else if (casoEspecialComision.indexOf(',') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = parseFloat(casoEspecialComision);
            } else if (casoEspecialComision.indexOf('.') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            }
        }
        if ((montoComision.indexOf(',') !== -1) && (montoComision.indexOf('.') !== -1)) {
            montoComision = montoComision.replace(",", ".");
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        } else if (montoComision.indexOf(',') !== -1) {
            montoComision = montoComision.replace(",", ".");
            montoComision = parseFloat(montoComision);
        } else if (montoComision.indexOf('.') !== -1) {
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        }
        await commissionModel.postCommissionCollectiveForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision, idCollective);
        res.redirect('/sistema/add-health-collective');
    },
    postVehicleCommissionCollectiveForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision = req.body.caso_especial_comision;
        let porcentajeEjecutivoSuscripcion = req.body.porcentaje_ejecutivo_suscripcion;
        let porcentajeEjecutivoSiniestro = req.body.porcentaje_ejecutivo_siniestro;
        let porcentajeEjecutivoCobranza = req.body.porcentaje_ejecutivo_cobranza;
        let porcentajeFundatinaComision = req.body.porcentaje_fundatina_comision;
        let porcentajeDirectorComision = req.body.porcentaje_director_comision;
        let porcentajeSocioComision = req.body.porcentaje_socio_comision;
        let porcentajeAtinaComision = req.body.porcentaje_atina_comision;
        let montoComision = req.body.monto_comision_comision;
        casoEspecialComision = casoEspecialComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(/[%]/g, '').replace(' ', '');
        porcentajeFundatinaComision = porcentajeFundatinaComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeDirectorComision = porcentajeDirectorComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeSocioComision = porcentajeSocioComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeAtinaComision = porcentajeAtinaComision.replace(/[%]/g, '').replace(' ', '');
        montoComision = montoComision.replace(/[%]/g, '').replace(' ', '');
        let idCollective = await collectiveModel.getCollectiveLast();
        if ((porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) && (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1)) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        } else if (porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion);
        } else if (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoSiniestro.indexOf(',') !== -1) && (porcentajeEjecutivoSiniestro.indexOf('.') !== -1)) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        } else if (porcentajeEjecutivoSiniestro.indexOf(',') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro);
        } else if (porcentajeEjecutivoSiniestro.indexOf('.') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoCobranza.indexOf(',') !== -1) && (porcentajeEjecutivoCobranza.indexOf('.') !== -1)) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        } else if (porcentajeEjecutivoCobranza.indexOf(',') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza);
        } else if (porcentajeEjecutivoCobranza.indexOf('.') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        }
        if ((porcentajeFundatinaComision.indexOf(',') !== -1) && (porcentajeFundatinaComision.indexOf('.') !== -1)) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        } else if (porcentajeFundatinaComision.indexOf(',') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision);
        } else if (porcentajeFundatinaComision.indexOf('.') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        }
        if ((porcentajeDirectorComision.indexOf(',') !== -1) && (porcentajeDirectorComision.indexOf('.') !== -1)) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        } else if (porcentajeDirectorComision.indexOf(',') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision);
        } else if (porcentajeDirectorComision.indexOf('.') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        }
        if ((porcentajeSocioComision.indexOf(',') !== -1) && (porcentajeSocioComision.indexOf('.') !== -1)) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        } else if (porcentajeSocioComision.indexOf(',') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision);
        } else if (porcentajeSocioComision.indexOf('.') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        }
        if ((porcentajeAtinaComision.indexOf(',') !== -1) && (porcentajeAtinaComision.indexOf('.') !== -1)) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        } else if (porcentajeAtinaComision.indexOf(',') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision);
        } else if (porcentajeAtinaComision.indexOf('.') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        }
        if (casoEspecialComision === '') {
            casoEspecialComision = 0;
        } else {
            if ((casoEspecialComision.indexOf(',') !== -1) && (casoEspecialComision.indexOf('.') !== -1)) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            } else if (casoEspecialComision.indexOf(',') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = parseFloat(casoEspecialComision);
            } else if (casoEspecialComision.indexOf('.') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            }
        }
        if ((montoComision.indexOf(',') !== -1) && (montoComision.indexOf('.') !== -1)) {
            montoComision = montoComision.replace(",", ".");
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        } else if (montoComision.indexOf(',') !== -1) {
            montoComision = montoComision.replace(",", ".");
            montoComision = parseFloat(montoComision);
        } else if (montoComision.indexOf('.') !== -1) {
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        }
        await commissionModel.postCommissionCollectiveForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision, idCollective);
        res.redirect('/sistema/add-vehicle-collective');
    },
    postRiskDiverseCommissionCollectiveForm: async (req, res) => {
        let porcentajeAgenteComision = parseFloat(req.body.porcentaje_agente_comision);
        let casoEspecialComision = req.body.caso_especial_comision;
        let porcentajeEjecutivoSuscripcion = req.body.porcentaje_ejecutivo_suscripcion;
        let porcentajeEjecutivoSiniestro = req.body.porcentaje_ejecutivo_siniestro;
        let porcentajeEjecutivoCobranza = req.body.porcentaje_ejecutivo_cobranza;
        let porcentajeFundatinaComision = req.body.porcentaje_fundatina_comision;
        let porcentajeDirectorComision = req.body.porcentaje_director_comision;
        let porcentajeSocioComision = req.body.porcentaje_socio_comision;
        let porcentajeAtinaComision = req.body.porcentaje_atina_comision;
        let montoComision = req.body.monto_comision_comision;
        casoEspecialComision = casoEspecialComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(/[%]/g, '').replace(' ', '');
        porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(/[%]/g, '').replace(' ', '');
        porcentajeFundatinaComision = porcentajeFundatinaComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeDirectorComision = porcentajeDirectorComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeSocioComision = porcentajeSocioComision.replace(/[%]/g, '').replace(' ', '');
        porcentajeAtinaComision = porcentajeAtinaComision.replace(/[%]/g, '').replace(' ', '');
        montoComision = montoComision.replace(/[%]/g, '').replace(' ', '');
        let idCollective = await collectiveModel.getCollectiveLast();
        if ((porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) && (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1)) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        } else if (porcentajeEjecutivoSuscripcion.indexOf(',') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(",", ".");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion);
        } else if (porcentajeEjecutivoSuscripcion.indexOf('.') !== -1) {
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(".", ",");
            porcentajeEjecutivoSuscripcion = parseFloat(porcentajeEjecutivoSuscripcion.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoSiniestro.indexOf(',') !== -1) && (porcentajeEjecutivoSiniestro.indexOf('.') !== -1)) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        } else if (porcentajeEjecutivoSiniestro.indexOf(',') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(",", ".");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro);
        } else if (porcentajeEjecutivoSiniestro.indexOf('.') !== -1) {
            porcentajeEjecutivoSiniestro = porcentajeEjecutivoSiniestro.replace(".", ",");
            porcentajeEjecutivoSiniestro = parseFloat(porcentajeEjecutivoSiniestro.replace(/,/g,''));
        }
        if ((porcentajeEjecutivoCobranza.indexOf(',') !== -1) && (porcentajeEjecutivoCobranza.indexOf('.') !== -1)) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        } else if (porcentajeEjecutivoCobranza.indexOf(',') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(",", ".");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza);
        } else if (porcentajeEjecutivoCobranza.indexOf('.') !== -1) {
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(".", ",");
            porcentajeEjecutivoCobranza = parseFloat(porcentajeEjecutivoCobranza.replace(/,/g,''));
        }
        if ((porcentajeFundatinaComision.indexOf(',') !== -1) && (porcentajeFundatinaComision.indexOf('.') !== -1)) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        } else if (porcentajeFundatinaComision.indexOf(',') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(",", ".");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision);
        } else if (porcentajeFundatinaComision.indexOf('.') !== -1) {
            porcentajeFundatinaComision = porcentajeFundatinaComision.replace(".", ",");
            porcentajeFundatinaComision = parseFloat(porcentajeFundatinaComision.replace(/,/g,''));
        }
        if ((porcentajeDirectorComision.indexOf(',') !== -1) && (porcentajeDirectorComision.indexOf('.') !== -1)) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        } else if (porcentajeDirectorComision.indexOf(',') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(",", ".");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision);
        } else if (porcentajeDirectorComision.indexOf('.') !== -1) {
            porcentajeDirectorComision = porcentajeDirectorComision.replace(".", ",");
            porcentajeDirectorComision = parseFloat(porcentajeDirectorComision.replace(/,/g,''));
        }
        if ((porcentajeSocioComision.indexOf(',') !== -1) && (porcentajeSocioComision.indexOf('.') !== -1)) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        } else if (porcentajeSocioComision.indexOf(',') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(",", ".");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision);
        } else if (porcentajeSocioComision.indexOf('.') !== -1) {
            porcentajeSocioComision = porcentajeSocioComision.replace(".", ",");
            porcentajeSocioComision = parseFloat(porcentajeSocioComision.replace(/,/g,''));
        }
        if ((porcentajeAtinaComision.indexOf(',') !== -1) && (porcentajeAtinaComision.indexOf('.') !== -1)) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        } else if (porcentajeAtinaComision.indexOf(',') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(",", ".");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision);
        } else if (porcentajeAtinaComision.indexOf('.') !== -1) {
            porcentajeAtinaComision = porcentajeAtinaComision.replace(".", ",");
            porcentajeAtinaComision = parseFloat(porcentajeAtinaComision.replace(/,/g,''));
        }
        if (casoEspecialComision === '') {
            casoEspecialComision = 0;
        } else {
            if ((casoEspecialComision.indexOf(',') !== -1) && (casoEspecialComision.indexOf('.') !== -1)) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            } else if (casoEspecialComision.indexOf(',') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(",", ".");
                casoEspecialComision = parseFloat(casoEspecialComision);
            } else if (casoEspecialComision.indexOf('.') !== -1) {
                casoEspecialComision = casoEspecialComision.replace(".", ",");
                casoEspecialComision = parseFloat(casoEspecialComision.replace(/,/g,''));
            }
        }
        if ((montoComision.indexOf(',') !== -1) && (montoComision.indexOf('.') !== -1)) {
            montoComision = montoComision.replace(",", ".");
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        } else if (montoComision.indexOf(',') !== -1) {
            montoComision = montoComision.replace(",", ".");
            montoComision = parseFloat(montoComision);
        } else if (montoComision.indexOf('.') !== -1) {
            montoComision = montoComision.replace(".", ",");
            montoComision = parseFloat(montoComision.replace(/,/g,''));
        }
        await commissionModel.postCommissionCollectiveForm(porcentajeAgenteComision, casoEspecialComision, porcentajeEjecutivoSuscripcion, porcentajeEjecutivoSiniestro, porcentajeEjecutivoCobranza, porcentajeFundatinaComision, porcentajeDirectorComision, porcentajeSocioComision, porcentajeAtinaComision, montoComision, idCollective);
        res.redirect('/sistema/add-risk-diverse-collective');
    },
/*                  PUT                  */
/*               DELETE                  */
}