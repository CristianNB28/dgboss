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
        if ((req.body.id_rif_agente_propio.startsWith('J')) || (req.body.id_rif_agente_propio.startsWith('V')) || (req.body.id_rif_agente_propio.startsWith('G'))) {
            rifAgentePropio = req.body.id_rif_agente_propio;
        } else {
            cedulaAgentePropio = req.body.id_rif_agente_propio;
        }
        await ownAgentModel.postOwnAgentForm(cedulaAgentePropio, rifAgentePropio, req.body);
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
        let cedulaEjecutivo = '';
        let rifEjecutivo = '';
        if ((req.body.id_rif_ejecutivo.startsWith('J')) || (req.body.id_rif_ejecutivo.startsWith('V')) || (req.body.id_rif_ejecutivo.startsWith('G'))) {
            rifEjecutivo = req.body.id_rif_ejecutivo;
        } else {
            cedulaEjecutivo = req.body.id_rif_ejecutivo;
        }
        await executiveModel.postExecutiveForm(cedulaEjecutivo, rifEjecutivo, req.body);
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
            res.render('editOwnAgent', {
                ownAgent: resultOwnAgent[0],
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
        await ownAgentModel.updateOwnAgent(cedulaAgentePropio, rifAgentePropio, req.body);
        res.redirect('/sistema');
    },
    updateExecutive: async (req, res) => {
        let cedulaEjecutivo = '';
        let rifEjecutivo = '';
        if ((typeof(req.body.rif_ejecutivo) !== 'undefined')) {
            if ((!req.body.rif_ejecutivo.startsWith('J')) && (!req.body.rif_ejecutivo.startsWith('G')) && (!req.body.rif_ejecutivo.startsWith('V'))) {
                cedulaEjecutivo = req.body.rif_ejecutivo;
            } else if (((req.body.rif_ejecutivo.startsWith('J')) || (req.body.rif_ejecutivo.startsWith('G')) || (req.body.rif_ejecutivo.startsWith('V')))) {
                rifEjecutivo = req.body.rif_ejecutivo;
            }
        } else {
            if ((req.body.cedula_ejecutivo.startsWith('J')) || (req.body.cedula_ejecutivo.startsWith('G')) || (req.body.cedula_ejecutivo.startsWith('V'))) {
                rifEjecutivo = req.body.cedula_ejecutivo;
            } else if ((!req.body.cedula_ejecutivo.startsWith('J')) && (!req.body.cedula_ejecutivo.startsWith('G')) && (!req.body.cedula_ejecutivo.startsWith('V'))) {
                cedulaEjecutivo = req.body.cedula_ejecutivo;
            } 
        }
        await executiveModel.updateExecutive(cedulaEjecutivo, rifEjecutivo, req.body);
        res.redirect('/sistema');
    },
/*               DELETE                  */
    disableInsurer: async (req, res) => {
        let disableInsurer = 1;
        await insurerModel.disableInsurer(req.params.id, disableInsurer);
        res.redirect('/sistema/insurers');
    },
    disableOwnAgent: async (req, res) => {
        let disableOwnAgent = 1;
        await ownAgentModel.disableOwnAgent(req.params.id, disableOwnAgent);
        res.redirect('/sistema/own-agents');
    },
    disableExecutive: async (req, res) => {
        let disableExecutive = 1;
        await executiveModel.disableExecutive(req.params.id, disableExecutive);
        res.redirect('/sistema/executives');
    }
}