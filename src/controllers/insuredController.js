const ownAgentModel = require('../models/own_agent');
const insuredModel = require('../models/insured');

module.exports = {
/*                  GET                  */
    getNaturalInsuredForm: async (req, res) => {
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        res.render('naturalInsuredForm', {
            ownAgents: resultsOwnAgents,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getLegalInsuredForm: async (req, res) => {
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        res.render('legalInsuredForm', {
            ownAgents: resultsOwnAgents,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getNaturalInsureds: async (req, res) => {
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        res.render('naturalInsureds', {
            data: resultsNaturalInsureds,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getLegalInsureds: async (req, res) => {
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        res.render('legalInsureds', {
            data: resultsLegalInsureds,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
/*                 POST                  */
    postNaturalInsuredForm: async (req, res) => {
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
            let nombreCompletoAgentePropio = req.body.nombre_com_agente_propio;
            let fechaNacPerNat = new Date(req.body.fec_nac_per_nat);
            let nombresAgentePropio;
            let apellidosAgentePropio;
            if (nombreCompletoAgentePropio.split(" ").length === 2) {
                nombresAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
                apellidosAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
            } else {
                nombresAgentePropio = nombreCompletoAgentePropio.split(' ', 2).join(' ');
                apellidosAgentePropio = nombreCompletoAgentePropio.split(' ').slice(2,4).join(' ');
            }
            let nombrePerNat = req.body.nombre_asegurado_per_nat;
            let apellidoPerNat = req.body.apellido_asegurado_per_nat;
            nombrePerNat = nombrePerNat.trimStart();
            nombrePerNat = nombrePerNat.trimEnd();
            apellidoPerNat = apellidoPerNat.trimStart();
            apellidoPerNat = apellidoPerNat.trimEnd();
            let agentePropio = await ownAgentModel.getOwnAgentId(nombresAgentePropio, apellidosAgentePropio);
            if (agentePropio[0] !== undefined) {
                let idAgentePropio = agentePropio[0].id_agente_propio;
                await insuredModel.postNaturalInsuredForm(fechaNacPerNat, idAgentePropio, nombrePerNat, apellidoPerNat, req.body);
                res.render('naturalInsuredForm', {
                    alert: true,
                    alertTitle: 'Exitoso',
                    alertMessage: 'Se registraron los datos exitosamente',
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'sistema/add-natural-insured',
                    ownAgents: resultsOwnAgents,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else {
                res.render('naturalInsuredForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'No existe agente propio para que se relacione con el asegurado natural',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-natural-insured',
                    ownAgents: resultsOwnAgents,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
            throw new Error('Error, valor duplicado de asegurado persona natural');
        } catch (error) {
            console.log(error);
            res.render('naturalInsuredForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'Valor duplicado de asegurado persona natural',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-natural-insured',
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postLegalInsuredForm: async (req, res) => {
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        try {
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
            let razonSocialPerJur = req.body.razon_social_per_jur;
            razonSocialPerJur = razonSocialPerJur.trimStart();
            razonSocialPerJur = razonSocialPerJur.trimEnd();
            if (agentePropio[0] !== undefined) {
                let idAgentePropio = agentePropio[0].id_agente_propio;
                await insuredModel.postLegalInsuredForm(idAgentePropio, razonSocialPerJur, req.body);
                res.render('legalInsuredForm', {
                    alert: true,
                    alertTitle: 'Exitoso',
                    alertMessage: 'Se registraron los datos exitosamente',
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'sistema/add-legal-insured',
                    ownAgents: resultsOwnAgents,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else {
                res.render('legalInsuredForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'No existe agente propio para que se relacione con el asegurado jurídico',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-legal-insured',
                    ownAgents: resultsOwnAgents,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
            throw new Error('Error, valor duplicado de asegurado persona jurídico');
        } catch (error) {
            console.log(error);
            res.render('legalInsuredForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'Valor duplicado de asegurado persona jurídico',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-legal-insured',
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
/*                  PUT                  */
    putNaturalInsured: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idNaturalInsured = req.params.id;
        if (idNaturalInsured.match(valoresAceptados)) {
            let resultNaturalInsured = await insuredModel.getNaturalInsured(idNaturalInsured);
            let fechaNacNaturalInsured = resultNaturalInsured[0].fec_nac_per_nat.toISOString().substring(0, 10);
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
            res.render('editNaturalInsured', {
                naturalInsured: resultNaturalInsured[0],
                fechaNacNaturalInsured: fechaNacNaturalInsured,
                ownAgent: resultOwnAgent[0],
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
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
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    updateNaturalInsured: async (req, res) => {
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let idNaturalInsured = req.body.id_asegurado_per_nat;
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
        let resultOwnAgent = await ownAgentModel.getOwnAgent(idAgentePropio);
        let resultNaturalInsured = await insuredModel.getNaturalInsured(idNaturalInsured);
        let fechaNacNaturalInsured = resultNaturalInsured[0].fec_nac_per_nat.toISOString().substring(0, 10);
        try {
            let fechaNacPerNat = new Date(req.body.fec_nac_per_nat);
            let nombrePerNat = req.body.nombre_asegurado_per_nat;
            let apellidoPerNat = req.body.apellido_asegurado_per_nat;
            nombrePerNat = nombrePerNat.trimStart();
            nombrePerNat = nombrePerNat.trimEnd();
            apellidoPerNat = apellidoPerNat.trimStart();
            apellidoPerNat = apellidoPerNat.trimEnd();
            await insuredModel.updateNaturalInsured(fechaNacPerNat, nombrePerNat, apellidoPerNat, idAgentePropio, req.body);
            res.render('editNaturalInsured', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-natural-insured/${idNaturalInsured}`,
                naturalInsured: resultNaturalInsured[0],
                fechaNacNaturalInsured: fechaNacNaturalInsured,
                ownAgent: resultOwnAgent[0],
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
            throw new Error('Error, valor duplicado de asegurado persona natural');
        } catch (error) {
            console.log(error);
            res.render('editNaturalInsured', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'Valor duplicado de asegurado persona natural',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-natural-insured/${idNaturalInsured}`,
                naturalInsured: resultNaturalInsured[0],
                fechaNacNaturalInsured: fechaNacNaturalInsured,
                ownAgent: resultOwnAgent[0],
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    updateLegalInsured: async (req, res) => {
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let idLegalInsured = req.body.id_asegurado_per_jur;
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
        let resultOwnAgent = await ownAgentModel.getOwnAgent(idAgentePropio);
        let resultLegalInsured = await insuredModel.getLegalInsured(idLegalInsured);
        try {
            let razonSocialPerJur = req.body.razon_social_per_jur;
            razonSocialPerJur = razonSocialPerJur.trimStart();
            razonSocialPerJur = razonSocialPerJur.trimEnd();
            await insuredModel.updateLegalInsured(idAgentePropio, razonSocialPerJur, req.body);
            res.render('editLegalInsured', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-legal-insured/${idLegalInsured}`,
                legalInsured: resultLegalInsured[0],
                ownAgent: resultOwnAgent[0],
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
            throw new Error('Error, valor duplicado de asegurado persona jurídico');
        } catch (error) {
            console.log(error);
            res.render('editLegalInsured', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'Valor duplicado de asegurado persona jurídico',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-legal-insured/${idLegalInsured}`,
                legalInsured: resultLegalInsured[0],
                ownAgent: resultOwnAgent[0],
                ownAgents: resultsOwnAgents,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
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