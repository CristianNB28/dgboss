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
        try {
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
            throw new Error('Error, valor duplicado de la aseguradora');
        } catch (error) {
            console.log(error);
            res.render('insurerForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'Valor duplicado de la aseguradora',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-insurer',
                name: req.session.name
            });
        }
    },
    postOwnAgentForm: async (req, res) => {
        try {
            let porcentajeAgentePropio = req.body.porcentaje_agente_propio;
            let nombreAgentePropio = req.body.nombre_agente_propio;
            let apellidoAgentePropio = req.body.apellido_agente_propio;
            nombreAgentePropio = nombreAgentePropio.trimStart();
            nombreAgentePropio = nombreAgentePropio.trimEnd();
            apellidoAgentePropio = apellidoAgentePropio.trimStart();
            apellidoAgentePropio = apellidoAgentePropio.trimEnd();
            if (porcentajeAgentePropio === '') {
                porcentajeAgentePropio = 0;
            } else {
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
            }
            await ownAgentModel.postOwnAgentForm(porcentajeAgentePropio, nombreAgentePropio, apellidoAgentePropio, req.body);
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
            throw new Error('Error, valor duplicado del agente propio');
        } catch (error) {
            console.log(error);
            res.render('ownAgentForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'Valor duplicado del agente propio',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-own-agent',
                name: req.session.name
            });
        }
    },
    postExecutiveForm: async (req, res) => {
        try {
            let nombreEjecutivo = req.body.nombre_ejecutivo;
            let apellidoEjecutivo = req.body.apellido_ejecutivo;
            nombreEjecutivo = nombreEjecutivo.trimStart();
            nombreEjecutivo = nombreEjecutivo.trimEnd();
            apellidoEjecutivo = apellidoEjecutivo.trimStart();
            apellidoEjecutivo = apellidoEjecutivo.trimEnd();
            await executiveModel.postExecutiveForm(nombreEjecutivo, apellidoEjecutivo, req.body);
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
            throw new Error('Error, valor duplicado del ejecutivo');
        } catch (error) {
            console.log(error);
            res.render('executiveForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'Valor duplicado del ejecutivo',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-executive',
                name: req.session.name
            });
        }
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
            porcentajeAgentePropio = porcentajeAgentePropio.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
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
        let idInsurer = req.body.id_aseguradora;
        let resultInsurer = await insurerModel.getInsurer(idInsurer);
        try {
            await insurerModel.updateInsurer(req.body);
            res.render('editInsurer', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'sistema',
                insurer: resultInsurer[0],
                name: req.session.name
            });
            throw new Error('Error, valor duplicado de la aseguradora');
        } catch (error) {
            console.log(error);
            res.render('editInsurer', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'Valor duplicado de la aseguradora',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-insurer/${idInsurer}`,
                insurer: resultInsurer[0],
                name: req.session.name
            });
        }
    },
    updateOwnAgent: async (req, res) => {
        let idOwnAgent = req.body.id_agente_propio;
        let resultOwnAgent = await ownAgentModel.getOwnAgent(idOwnAgent);
        let porcentajeAgentePropio = req.body.porcentaje_agente_propio;
        try {
            let nombreAgentePropio = req.body.nombre_agente_propio;
            let apellidoAgentePropio = req.body.apellido_agente_propio;
            nombreAgentePropio = nombreAgentePropio.trimStart();
            nombreAgentePropio = nombreAgentePropio.trimEnd();
            apellidoAgentePropio = apellidoAgentePropio.trimStart();
            apellidoAgentePropio = apellidoAgentePropio.trimEnd();
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
            await ownAgentModel.updateOwnAgent(porcentajeAgentePropio, nombreAgentePropio, apellidoAgentePropio, req.body);
            res.render('editOwnAgent', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'sistema',
                ownAgent: resultOwnAgent[0],
                porcentajeAgentePropio: porcentajeAgentePropio,
                name: req.session.name
            });
            throw new Error('Error, valor duplicado del agente propio');
        } catch (error) {
            console.log(error);
            res.render('editOwnAgent', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'Valor duplicado del agente propio',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-own-agent/${idOwnAgent}`,
                ownAgent: resultOwnAgent[0],
                porcentajeAgentePropio: porcentajeAgentePropio,
                name: req.session.name
            });
        }
    },
    updateExecutive: async (req, res) => {
        let idExecutive = req.body.id_ejecutivo;
        let resultExecutive = await executiveModel.getExecutive(idExecutive);
        try {
            let nombreEjecutivo = req.body.nombre_ejecutivo;
            let apellidoEjecutivo = req.body.apellido_ejecutivo;
            nombreEjecutivo = nombreEjecutivo.trimStart();
            nombreEjecutivo = nombreEjecutivo.trimEnd();
            apellidoEjecutivo = apellidoEjecutivo.trimStart();
            apellidoEjecutivo = apellidoEjecutivo.trimEnd();
            await executiveModel.updateExecutive(nombreEjecutivo, apellidoEjecutivo, req.body);
            res.render('editExecutive', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'sistema',
                executive: resultExecutive[0],
                name: req.session.name
            });
            throw new Error('Error, valor duplicado del ejecutivo');
        } catch (error) {
            console.log(error);
            res.render('editExecutive', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'Valor duplicado del ejecutivo',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-executive/${idExecutive}`,
                executive: resultExecutive[0],
                name: req.session.name
            });
        }
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