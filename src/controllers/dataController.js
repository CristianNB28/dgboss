const insurerModel = require('../models/insurer');
const ownAgentModel = require('../models/own_agent');
const executiveModel = require('../models/executive');

module.exports = {
/*                  GET                  */
    getInsurerForm: (req, res) => {
        res.render('insurerForm', {
            name: req.session.name
        });
    },
    getOwnAgentForm: (req, res) => {
        res.render('ownAgentForm', {
            name: req.session.name
        });
    },
    getExecutiveForm: (req, res) => {
        res.render('executiveForm', {
            name: req.session.name
        });
    },
    getInsurers: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        res.render('insurers', {
            data: resultsInsurers,
            name: req.session.name
        });
    },
    getOwnAgents: async (req, res) => {
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        res.render('ownAgents', {
            data: resultsOwnAgents,
            name: req.session.name
        });
    },
    getExecutives: async (req, res) => {
        let resultsExecutives = await executiveModel.getExecutives();
        res.render('executives', {
            data: resultsExecutives,
            name: req.session.name
        });
    },
/*                  POST                  */
    postInsurerForm: async (req, res) => {
        await insurerModel.postInsurerForm(req.body);
        res.render('insurerForm', {
            alert: true,
            alertTitle: 'Exitoso',
            alertMessage: 'Se registraron los datos exitosamente',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'sistema',
            name: req.session.name
        });
    },
    postOwnAgentForm: async (req, res) => {
        let cedulaAgentePropio = '';
        let rifAgentePropio = '';
        let porcentajeAgentePropio = req.body.porcentaje_agente_propio;
        if ((porcentajeAgentePropio.indexOf(',') !== -1) && (porcentajeAgentePropio.indexOf('.') !== -1)) {
            porcentajeAgentePropio = porcentajeAgentePropio.replace(",", ".");
            porcentajeAgentePropio = porcentajeAgentePropio.replace(".", ",");
            porcentajeAgentePropio = parseFloat(porcentajeAgentePropio.replace(/,/g,''));
        } else if (porcentajeAgentePropio.indexOf(',') !== -1) {
            porcentajeAgentePropio = porcentajeAgentePropio.replace(",", ".");
            porcentajeAgentePropio = parseFloat(porcentajeAgentePropio);
        } else if (porcentajeAgentePropio.indexOf('.') !== -1) {
            porcentajeAgentePropio = porcentajeAgentePropio.replace(".", ",");
            porcentajeAgentePropio = parseFloat(porcentajeAgentePropio.replace(/,/g,''));
        }
        if ((req.body.id_rif_agente_propio.startsWith('J')) || (req.body.id_rif_agente_propio.startsWith('V')) || (req.body.id_rif_agente_propio.startsWith('G'))) {
            rifAgentePropio = req.body.id_rif_agente_propio;
        } else {
            cedulaAgentePropio = req.body.id_rif_agente_propio;
        }
        await ownAgentModel.postOwnAgentForm(cedulaAgentePropio, rifAgentePropio, porcentajeAgentePropio, req.body);
        res.render('ownAgentForm', {
            alert: true,
            alertTitle: 'Exitoso',
            alertMessage: 'Se registraron los datos exitosamente',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'sistema',
            name: req.session.name
        });
    },
    postExecutiveForm: async (req, res) => {
        await executiveModel.postExecutiveForm(req.body);
        res.render('executiveForm', {
            alert: true,
            alertTitle: 'Exitoso',
            alertMessage: 'Se registraron los datos exitosamente',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'sistema',
            name: req.session.name
        });
    },
/*                  PUT                  */
    putInsurer: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idInsurer = req.params.id;
        if (idInsurer.match(valoresAceptados)) {
            let resultInsurer = await insurerModel.getInsurer(idInsurer);
            res.render('editInsurer', {
                insurer: resultInsurer[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    putOwnAgent: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idOwnAgent = req.params.id;
        if (idOwnAgent.match(valoresAceptados)) {
            let resultOwnAgent = await ownAgentModel.getOwnAgent(idOwnAgent);
            let porcentajeAgentePropio = resultOwnAgent[0].porcentaje_agente_propio;
            porcentajeAgentePropio = new Intl.NumberFormat('de-DE').format(porcentajeAgentePropio);
            res.render('editOwnAgent', {
                ownAgent: resultOwnAgent[0],
                porcentajeAgentePropio: porcentajeAgentePropio,
                name: req.session.name
            });
        } else {
            next();
        }
    },
    putExecutive: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idExecutive = req.params.id;
        if (idExecutive.match(valoresAceptados)) {
            let resultExecutive = await executiveModel.getExecutive(idExecutive);
            res.render('editExecutive', {
                executive: resultExecutive[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updateInsurer: async (req, res) => {
        await insurerModel.updateInsurer(req.body);
        res.redirect('/sistema');
    },
    updateOwnAgent: async (req, res) => {
        let cedulaAgentePropio = '';
        let rifAgentePropio = '';
        let porcentajeAgentePropio = req.body.porcentaje_agente_propio;
        if ((porcentajeAgentePropio.indexOf(',') !== -1) && (porcentajeAgentePropio.indexOf('.') !== -1)) {
            porcentajeAgentePropio = porcentajeAgentePropio.replace(",", ".");
            porcentajeAgentePropio = porcentajeAgentePropio.replace(".", ",");
            porcentajeAgentePropio = parseFloat(porcentajeAgentePropio.replace(/,/g,''));
        } else if (porcentajeAgentePropio.indexOf(',') !== -1) {
            porcentajeAgentePropio = porcentajeAgentePropio.replace(",", ".");
            porcentajeAgentePropio = parseFloat(porcentajeAgentePropio);
        } else if (porcentajeAgentePropio.indexOf('.') !== -1) {
            porcentajeAgentePropio = porcentajeAgentePropio.replace(".", ",");
            porcentajeAgentePropio = parseFloat(porcentajeAgentePropio.replace(/,/g,''));
        }
        if ((typeof(req.body.rif_agente_propio) !== 'undefined')) {
            if ((!req.body.rif_agente_propio.startsWith('J')) && (!req.body.rif_agente_propio.startsWith('G')) && (!req.body.rif_agente_propio.startsWith('V'))) {
                cedulaAgentePropio = req.body.rif_agente_propio;
            } else if (((req.body.rif_agente_propio.startsWith('J')) || (req.body.rif_agente_propio.startsWith('G')) || (req.body.rif_agente_propio.startsWith('V')))) {
                rifAgentePropio = req.body.rif_agente_propio;
            }
        } else {
            if ((req.body.cedula_agente_propio.startsWith('J')) || (req.body.cedula_agente_propio.startsWith('G')) || (req.body.cedula_agente_propio.startsWith('V'))) {
                rifAgentePropio = req.body.cedula_agente_propio;
            } else if ((!req.body.cedula_agente_propio.startsWith('J')) && (!req.body.cedula_agente_propio.startsWith('G')) && (!req.body.cedula_agente_propio.startsWith('V'))) {
                cedulaAgentePropio = req.body.cedula_agente_propio;
            } 
        }
        await ownAgentModel.updateOwnAgent(cedulaAgentePropio, rifAgentePropio, porcentajeAgentePropio, req.body);
        res.redirect('/sistema');
    },
    updateExecutive: async (req, res) => {
        await executiveModel.updateExecutive(req.body);
        res.redirect('/sistema');
    },
/*               DELETE                  */
    disableInsurer: async (req, res) => {
        let disableInsurer = 1;
        await insurerModel.updateDisableInsurer(req.params.id, req.body);
        await insurerModel.disableInsurer(req.params.id, disableInsurer);
        res.redirect('/sistema/insurers');
    },
    disableOwnAgent: async (req, res) => {
        let disableOwnAgent = 1;
        await ownAgentModel.updateDisableOwnAgent(req.params.id, req.body);
        await ownAgentModel.disableOwnAgent(req.params.id, disableOwnAgent);
        res.redirect('/sistema/own-agents');
    },
    disableExecutive: async (req, res) => {
        let disableExecutive = 1;
        await executiveModel.updateDisableExecutive(req.params.id, req.body);
        await executiveModel.disableExecutive(req.params.id, disableExecutive);
        res.redirect('/sistema/executives');
    }
}