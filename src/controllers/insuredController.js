const ownAgentModel = require('../models/own_agent');
const insuredModel = require('../models/insured');

module.exports = {
/*                  GET                  */
    getNaturalInsuredForm: async (req, res) => {
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        res.render('naturalInsuredForm', {
            ownAgents: resultsOwnAgents,
            name: req.session.name
        });
    },
    getLegalInsuredForm: async (req, res) => {
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        res.render('legalInsuredForm', {
            ownAgents: resultsOwnAgents,
            name: req.session.name
        });
    },
    getNaturalInsureds: async (req, res) => {
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        res.render('naturalInsureds', {
            data: resultsNaturalInsureds,
            name: req.session.name
        });
    },
    getLegalInsureds: async (req, res) => {
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        res.render('legalInsureds', {
            data: resultsLegalInsureds,
            name: req.session.name
        });
    },
/*                 POST                  */
    postNaturalInsuredForm: async (req, res) => {
        let nombreCompletoAgentePropio = req.body.nombre_com_agente_propio;
        let nombresAgentePropio;
        let apellidosAgentePropio;
        if (nombreCompletoAgentePropio.split(" ").length === 2) {
            nombresAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
            apellidosAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
        } else {
            nombresAgentePropio = nombreCompletoAgentePropio.split(' ', 2).join(' ');
            apellidosAgentePropio = nombreCompletoAgentePropio.split(' ').slice(2,4).join(' ');
        }
        let agentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio, apellidosAgentePropio);
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (agentePropio[0] !== undefined) {
            let idAgentePropio = agentePropio[0].id_agente_propio;
            await insuredModel.postNaturalInsuredForm(idAgentePropio, req.body);
            res.render('naturalInsuredForm', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se registraron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'sistema',
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        } else {
            res.render('naturalInsuredForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'No existe agente propio para que se relacione con el asegurado natural',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema',
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        }
    },
    postLegalInsuredForm: async (req, res) => {
        let nombreCompletoAgentePropio = req.body.nombre_com_agente_propio
        let nombresAgentePropio;
        let apellidosAgentePropio;
        if (nombreCompletoAgentePropio.split(" ").length === 2) {
            nombresAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
            apellidosAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
        } else {
            nombresAgentePropio = nombreCompletoAgentePropio.split(' ', 2).join(' ');
            apellidosAgentePropio = nombreCompletoAgentePropio.split(' ').slice(2,4).join(' ');
        }
        let agentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio, apellidosAgentePropio);
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        if (agentePropio[0] !== undefined) {
            let idAgentePropio = agentePropio[0].id_agente_propio;
            await insuredModel.postLegalInsuredForm(idAgentePropio, req.body);
            res.render('legalInsuredForm', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se registraron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'sistema',
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        } else {
            res.render('legalInsuredForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'No existe agente propio para que se relacione con el asegurado jurídico',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema',
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        }
    },
/*                  PUT                  */
    putNaturalInsured: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idNaturalInsured = req.params.id;
        if (idNaturalInsured.match(valoresAceptados)) {
            let resultNaturalInsured = await insuredModel.getNaturalInsured(idNaturalInsured);
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
            res.render('editNaturalInsured', {
                naturalInsured: resultNaturalInsured[0],
                ownAgent: resultOwnAgent[0],
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        } else {
            next();
        }
    },
    putLegalInsured: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idLegalInsured = req.params.id;
        if (idLegalInsured.match(valoresAceptados)) {
            let resultLegalInsured = await insuredModel.getLegalInsured(idLegalInsured);
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
            res.render('editLegalInsured', {
                legalInsured: resultLegalInsured[0],
                ownAgent: resultOwnAgent[0],
                ownAgents: resultsOwnAgents,
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updateNaturalInsured: async (req, res) => {
        let nombreCompletoAgentePropio = req.body.nombre_com_agente_propio
        let nombresAgentePropio;
        let apellidosAgentePropio;
        if (nombreCompletoAgentePropio.split(" ").length === 2) {
            nombresAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
            apellidosAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
        } else {
            nombresAgentePropio = nombreCompletoAgentePropio.split(' ', 2).join(' ');
            apellidosAgentePropio = nombreCompletoAgentePropio.split(' ').slice(2,4).join(' ');
        }
        let agentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio, apellidosAgentePropio);
        let idAgentePropio = agentePropio[0].id_agente_propio;
        await insuredModel.updateNaturalInsured(idAgentePropio, req.body);
        res.redirect('/sistema');
    },
    updateLegalInsured: async (req, res) => {
        let nombreCompletoAgentePropio = req.body.nombre_com_agente_propio
        let nombresAgentePropio;
        let apellidosAgentePropio;
        if (nombreCompletoAgentePropio.split(" ").length === 2) {
            nombresAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
            apellidosAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
        } else {
            nombresAgentePropio = nombreCompletoAgentePropio.split(' ', 2).join(' ');
            apellidosAgentePropio = nombreCompletoAgentePropio.split(' ').slice(2,4).join(' ');
        }
        let agentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio, apellidosAgentePropio);
        let idAgentePropio = agentePropio[0].id_agente_propio;
        await insuredModel.updateLegalInsured(idAgentePropio, req.body);
        res.redirect('/sistema');
    },
/*               DELETE                  */
    disableNaturalInsured: async (req, res) => {
        let disableNaturalInsured = 1;
        await insuredModel.updateDisableNaturalInsured(req.params.id, req.body);
        await insuredModel.disableNaturalInsured(req.params.id, disableNaturalInsured);
        res.redirect('/sistema/natural-insureds');
    },
    disableLegalInsured: async (req, res) => {
        let disableLegalInsured = 1;
        await insuredModel.updateDisableLegalInsured(req.params.id, req.body);
        await insuredModel.disableLegalInsured(req.params.id, disableLegalInsured);
        res.redirect('/sistema/legal-insureds');
    }
}