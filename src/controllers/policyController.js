const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');

module.exports = {
/*                  GET                  */
    getVehiclePolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy === []) {
            res.render('vehiclePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            res.render('vehiclePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                name: req.session.name
            });
        }
    },
    getHealthPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy === []) {
            res.render('healthPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            res.render('healthPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                name: req.session.name
            });
        }
    },
    getPatrimonialPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy === []) {
            res.render('patrimonialPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            res.render('patrimonialPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                name: req.session.name
            });
        }
    },
    getBailPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy === []) {
            res.render('bailPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            res.render('bailPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                name: req.session.name
            });
        }
    },
    getAnotherBranchPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy === []) {
            res.render('anotherBranchPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            res.render('anotherBranchPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                name: req.session.name
            });
        }
    },
    getFuneralPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy === []) {
            res.render('funeralPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            res.render('funeralPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                name: req.session.name
            });
        }
    },
    getLifePolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy === []) {
            res.render('lifePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            res.render('lifePolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                name: req.session.name
            });
        }
    },
    getAPPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy === []) {
            res.render('apPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            res.render('apPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                name: req.session.name
            });
        }
    },
    getTravelPolicyForm: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultPolicy = await policyModel.getPolicyLast();
        if (resultPolicy === []) {
            res.render('travelPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                name: req.session.name
            });
        } else {
            res.render('travelPolicyForm', {
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                name: req.session.name
            });
        }
    },
    getPolicies: async (req, res) => {
        let resultsPolicies =  await policyModel.getPolicies();
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        for (let index = 0; index < resultsPII.length; index++) {
            let elementPII = resultsPII[index];
            let resultInsurer = await insurerModel.getInsurer(elementPII.aseguradora_id);
            for (let index = 0; index < resultsPolicies.length; index++) {
                let elementPolicy = resultsPolicies[index];
                if ((index < elementPII.id_paa) && (typeof(elementPolicy.fecha_desde) !== 'string')) {
                    elementPolicy.fecha_desde = elementPolicy.fecha_desde.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"); 
                    elementPolicy.fecha_hasta = elementPolicy.fecha_hasta.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
                    elementPolicy.nombre_aseguradora = resultInsurer[0].nombre_aseguradora;
                    break;
                }
            }
        }
        res.render('policies', {
            data: resultsPolicies,
            name: req.session.name
        });
    },
/*                 POST                  */
    postVehiclePolicyForm: async (req, res) => {
        let tomadorViejo = req.body.tomador_viejo ? 1 : 0;
        let montoTasa = parseFloat(req.body.tasa_poliza);
        let montoPrimaAnual = parseFloat(req.body.prima_anual_poliza);
        let deducible = parseFloat(req.body.deducible_poliza);
        let sumaAsegurada = parseFloat(req.body.suma_asegurada_poliza);
        let fechaPolizaDesde = new Date(req.body.fecha_desde);
        let fechaPolizaHasta = new Date(req.body.fecha_hasta);
        let tipoPoliza = 'Individual';
        let tipoIndividualPoliza = 'Automovil';
        let cedulaAseguradoNatural = '';
        let rifAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        let estatusPoliza = '';
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let diasExpiracion = 0;
        let fechaActual = new Date();
        let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
        let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
        diasExpiracion = diferenciaDias.toFixed(0);
        if (req.body.id_rif_asegurado.startsWith('V')) {
            rifAseguradoNatural = req.body.id_rif_asegurado;
        } else if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'Vigente';
        } else {
            estatusPoliza = 'Anulado';
        }
        if (req.body.correo_tomador === req.body.correo_verificar) {
            let policy = await policyModel.postVehiclePolicyForm(tomadorViejo, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoPoliza, tipoIndividualPoliza, estatusPoliza, req.body);
            await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
            res.redirect('/sistema/add-vehicle-policy');
        } else {
            try {
                throw new Error('Error, los correos no son iguales');
            } catch (error) {
                console.log(error);
                res.render('vehiclePolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'Los correos no son iguales',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-vehicle-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    name: req.session.name
                });
            }
        }
    },
    postHealthPolicyForm: async (req, res) => {
        let tomadorViejo = req.body.tomador_viejo ? 1 : 0;
        let montoPrimaAnual = parseFloat(req.body.prima_anual_poliza);
        let deducible = parseFloat(req.body.deducible_poliza);
        let sumaAsegurada = parseFloat(req.body.suma_asegurada_poliza);
        let fechaPolizaDesde = new Date(req.body.fecha_desde);
        let fechaPolizaHasta = new Date(req.body.fecha_hasta);
        let tipoPoliza = 'Individual';
        let tipoIndividualPoliza = 'Salud';
        let cedulaAseguradoNatural = '';
        let rifAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        let estatusPoliza = '';
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let diasExpiracion = 0;
        let fechaActual = new Date();
        let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
        let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
        diasExpiracion = diferenciaDias.toFixed(0);
        if (req.body.id_rif_asegurado.startsWith('V')) {
            rifAseguradoNatural = req.body.id_rif_asegurado;
        } else if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'Vigente';
        } else {
            estatusPoliza = 'Anulado';
        }
        if (req.body.correo_tomador === req.body.correo_verificar) {
            let policy = await policyModel.postHealthPolicyForm(tomadorViejo, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoPoliza, tipoIndividualPoliza, estatusPoliza, req.body);
            await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
            res.redirect('/sistema/add-health-policy');
        } else {
            try {
                throw new Error('Error, los correos no son iguales');
            } catch (error) {
                console.log(error);
                res.render('healthPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'Los correos no son iguales',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-health-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    name: req.session.name
                });
            }
        }
    },
    postPatrimonialPolicyForm: async (req, res) => {
        let tomadorViejo = req.body.tomador_viejo ? 1 : 0;
        let montoTasa = parseFloat(req.body.tasa_poliza);
        let montoPrimaAnual = parseFloat(req.body.prima_anual_poliza);
        let deducible = parseFloat(req.body.deducible_poliza);
        let sumaAsegurada = parseFloat(req.body.suma_asegurada_poliza);
        let fechaPolizaDesde = new Date(req.body.fecha_desde);
        let fechaPolizaHasta = new Date(req.body.fecha_hasta);
        let tipoPoliza = 'Individual';
        let tipoIndividualPoliza = 'Patrimonial';
        let cedulaAseguradoNatural = '';
        let rifAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        let estatusPoliza = '';
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let diasExpiracion = 0;
        let fechaActual = new Date();
        let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
        let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
        diasExpiracion = diferenciaDias.toFixed(0);
        if (req.body.id_rif_asegurado.startsWith('V')) {
            rifAseguradoNatural = req.body.id_rif_asegurado;
        } else if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'Vigente';
        } else {
            estatusPoliza = 'Anulado';
        }
        if (req.body.correo_tomador === req.body.correo_verificar) {
            let policy = await policyModel.postPatrimonialPolicyForm(tomadorViejo, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoPoliza, tipoIndividualPoliza, estatusPoliza, req.body);
            await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
            res.redirect('/sistema/add-patrimonial-policy');
        } else {
            try {
                throw new Error('Error, los correos no son iguales');
            } catch (error) {
                console.log(error);
                res.render('patrimonialPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'Los correos no son iguales',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-patrimonial-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    name: req.session.name
                });
            }
        }
    },
    postBailPolicyForm: async (req, res) => {
        let tomadorViejo = req.body.tomador_viejo ? 1 : 0;
        let montoTasa = parseFloat(req.body.tasa_poliza);
        let montoPrimaAnual = parseFloat(req.body.prima_anual_poliza);
        let deducible = parseFloat(req.body.deducible_poliza);
        let sumaAsegurada = parseFloat(req.body.suma_asegurada_poliza);
        let fechaPolizaDesde = new Date(req.body.fecha_desde);
        let fechaPolizaHasta = new Date(req.body.fecha_hasta);
        let tipoPoliza = 'Individual';
        let tipoIndividualPoliza = 'Fianza';
        let cedulaAseguradoNatural = '';
        let rifAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        let estatusPoliza = '';
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let diasExpiracion = 0;
        let fechaActual = new Date();
        let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
        let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
        diasExpiracion = diferenciaDias.toFixed(0);
        if (req.body.id_rif_asegurado.startsWith('V')) {
            rifAseguradoNatural = req.body.id_rif_asegurado;
        } else if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'Vigente';
        } else {
            estatusPoliza = 'Anulado';
        }
        if (req.body.correo_tomador === req.body.correo_verificar) {
            let policy = await policyModel.postBailPolicyForm(tomadorViejo, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoPoliza, tipoIndividualPoliza, estatusPoliza, req.body);
            await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
            res.redirect('/sistema/add-bail-policy');
        } else {
            try {
                throw new Error('Error, los correos no son iguales');
            } catch (error) {
                console.log(error);
                res.render('bailPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'Los correos no son iguales',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-bail-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    name: req.session.name
                });
            }
        }
    },
    postAnotherBranchPolicyForm: async (req, res) => {
        let tomadorViejo = req.body.tomador_viejo ? 1 : 0;
        let montoTasa = parseFloat(req.body.tasa_poliza);
        let montoPrimaAnual = parseFloat(req.body.prima_anual_poliza);
        let deducible = parseFloat(req.body.deducible_poliza);
        let sumaAsegurada = parseFloat(req.body.suma_asegurada_poliza);
        let fechaPolizaDesde = new Date(req.body.fecha_desde);
        let fechaPolizaHasta = new Date(req.body.fecha_hasta);
        let tipoPoliza = 'Individual';
        let tipoIndividualPoliza = 'Otros Ramos';
        let cedulaAseguradoNatural = '';
        let rifAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        let estatusPoliza = '';
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let diasExpiracion = 0;
        let fechaActual = new Date();
        let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
        let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
        diasExpiracion = diferenciaDias.toFixed(0);
        if (req.body.id_rif_asegurado.startsWith('V')) {
            rifAseguradoNatural = req.body.id_rif_asegurado;
        } else if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'Vigente';
        } else {
            estatusPoliza = 'Anulado';
        }
        if (req.body.correo_tomador === req.body.correo_verificar) {
            let policy = await policyModel.postAnotherBranchPolicyForm(tomadorViejo, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoPoliza, tipoIndividualPoliza, estatusPoliza, req.body);
            await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
            res.redirect('/sistema/add-another-branch-policy');
        } else {
            try {
                throw new Error('Error, los correos no son iguales');
            } catch (error) {
                console.log(error);
                res.render('anotherBranchPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'Los correos no son iguales',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-another-branch-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    name: req.session.name
                });
            }
        }
    },
    postFuneralPolicyForm: async (req, res) => {
        let tomadorViejo = req.body.tomador_viejo ? 1 : 0;
        let montoTasa = parseFloat(req.body.tasa_poliza);
        let montoPrimaAnual = parseFloat(req.body.prima_anual_poliza);
        let deducible = parseFloat(req.body.deducible_poliza);
        let sumaAsegurada = parseFloat(req.body.suma_asegurada_poliza);
        let fechaPolizaDesde = new Date(req.body.fecha_desde);
        let fechaPolizaHasta = new Date(req.body.fecha_hasta);
        let tipoPoliza = 'Individual';
        let tipoIndividualPoliza = 'Funerario';
        let cedulaAseguradoNatural = '';
        let rifAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        let estatusPoliza = '';
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let diasExpiracion = 0;
        let fechaActual = new Date();
        let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
        let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
        diasExpiracion = diferenciaDias.toFixed(0);
        if (req.body.id_rif_asegurado.startsWith('V')) {
            rifAseguradoNatural = req.body.id_rif_asegurado;
        } else if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'Vigente';
        } else {
            estatusPoliza = 'Anulado';
        }
        if (req.body.correo_tomador === req.body.correo_verificar) {
            let policy = await policyModel.postFuneralPolicyForm(tomadorViejo, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoPoliza, tipoIndividualPoliza, estatusPoliza, req.body);
            await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
            res.redirect('/sistema/add-funeral-policy');
        } else {
            try {
                throw new Error('Error, los correos no son iguales');
            } catch (error) {
                console.log(error);
                res.render('funeralPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'Los correos no son iguales',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-funeral-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    name: req.session.name
                });
            }
        }
    },
    postLifePolicyForm: async (req, res) => {
        let tomadorViejo = req.body.tomador_viejo ? 1 : 0;
        let montoTasa = parseFloat(req.body.tasa_poliza);
        let montoPrimaAnual = parseFloat(req.body.prima_anual_poliza);
        let deducible = parseFloat(req.body.deducible_poliza);
        let sumaAsegurada = parseFloat(req.body.suma_asegurada_poliza);
        let fechaPolizaDesde = new Date(req.body.fecha_desde);
        let fechaPolizaHasta = new Date(req.body.fecha_hasta);
        let tipoPoliza = 'Individual';
        let tipoIndividualPoliza = 'Vida';
        let cedulaAseguradoNatural = '';
        let rifAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        let estatusPoliza = '';
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let diasExpiracion = 0;
        let fechaActual = new Date();
        let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
        let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
        diasExpiracion = diferenciaDias.toFixed(0);
        if (req.body.id_rif_asegurado.startsWith('V')) {
            rifAseguradoNatural = req.body.id_rif_asegurado;
        } else if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'Vigente';
        } else {
            estatusPoliza = 'Anulado';
        }
        if (req.body.correo_tomador === req.body.correo_verificar) {
            let policy = await policyModel.postLifePolicyForm(tomadorViejo, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoPoliza, tipoIndividualPoliza, estatusPoliza, req.body);
            await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
            res.redirect('/sistema/add-life-policy');
        } else {
            try {
                throw new Error('Error, los correos no son iguales');
            } catch (error) {
                console.log(error);
                res.render('lifePolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'Los correos no son iguales',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-life-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    name: req.session.name
                });
            }
        }
    },
    postAPPolicyForm: async (req, res) => {
        let tomadorViejo = req.body.tomador_viejo ? 1 : 0;
        let montoTasa = parseFloat(req.body.tasa_poliza);
        let montoPrimaAnual = parseFloat(req.body.prima_anual_poliza);
        let deducible = parseFloat(req.body.deducible_poliza);
        let sumaAsegurada = parseFloat(req.body.suma_asegurada_poliza);
        let fechaPolizaDesde = new Date(req.body.fecha_desde);
        let fechaPolizaHasta = new Date(req.body.fecha_hasta);
        let tipoPoliza = 'Individual';
        let tipoIndividualPoliza = 'AP';
        let cedulaAseguradoNatural = '';
        let rifAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        let estatusPoliza = '';
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let diasExpiracion = 0;
        let fechaActual = new Date();
        let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
        let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
        diasExpiracion = diferenciaDias.toFixed(0);
        if (req.body.id_rif_asegurado.startsWith('V')) {
            rifAseguradoNatural = req.body.id_rif_asegurado;
        } else if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'Vigente';
        } else {
            estatusPoliza = 'Anulado';
        }
        if (req.body.correo_tomador === req.body.correo_verificar) {
            let policy = await policyModel.postAPPolicyForm(tomadorViejo, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoPoliza, tipoIndividualPoliza, estatusPoliza, req.body);
            await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
            res.redirect('/sistema/add-ap-policy');
        } else {
            try {
                throw new Error('Error, los correos no son iguales');
            } catch (error) {
                console.log(error);
                res.render('apPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'Los correos no son iguales',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-ap-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    name: req.session.name
                });
            }
        }
    },
    postTravelPolicyForm: async (req, res) => {
        let tomadorViejo = req.body.tomador_viejo ? 1 : 0;
        let montoTasa = parseFloat(req.body.tasa_poliza);
        let montoPrimaAnual = parseFloat(req.body.prima_anual_poliza);
        let deducible = parseFloat(req.body.deducible_poliza);
        let sumaAsegurada = parseFloat(req.body.suma_asegurada_poliza);
        let fechaPolizaDesde = new Date(req.body.fecha_desde);
        let fechaPolizaHasta = new Date(req.body.fecha_hasta);
        let tipoPoliza = 'Individual';
        let tipoIndividualPoliza = 'Viaje';
        let cedulaAseguradoNatural = '';
        let rifAseguradoNatural = '';
        let rifAseguradoJuridico = '';
        let estatusPoliza = '';
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let diasExpiracion = 0;
        let fechaActual = new Date();
        let diferenciaTiempo = fechaPolizaHasta.getTime() - fechaActual.getTime();
        let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
        diasExpiracion = diferenciaDias.toFixed(0);
        if (req.body.id_rif_asegurado.startsWith('V')) {
            rifAseguradoNatural = req.body.id_rif_asegurado;
        } else if ((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G'))) {
            rifAseguradoJuridico = req.body.id_rif_asegurado;
        } else {
            cedulaAseguradoNatural = req.body.id_rif_asegurado;
        }
        if (diasExpiracion > 0) {
            estatusPoliza = 'Vigente';
        } else {
            estatusPoliza = 'Anulado';
        }
        if (req.body.correo_tomador === req.body.correo_verificar) {
            let policy = await policyModel.postTravelPolicyForm(tomadorViejo, montoTasa, montoPrimaAnual, deducible, sumaAsegurada, fechaPolizaDesde, fechaPolizaHasta, tipoPoliza, tipoIndividualPoliza, estatusPoliza, req.body);
            await policyInsurerInsuredModel.postPolicyInsurerInsured(cedulaAseguradoNatural, rifAseguradoNatural, rifAseguradoJuridico, req.body.nombre_aseguradora, policy.insertId);
            res.redirect('/sistema/add-travel-policy');
        } else {
            try {
                throw new Error('Error, los correos no son iguales');
            } catch (error) {
                console.log(error);
                res.render('travelPolicyForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'Los correos no son iguales',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/add-travel-policy',
                    insurers: resultsInsurers,
                    naturalInsureds: resultsNaturalInsureds,
                    legalInsureds: resultsLegalInsureds,
                    name: req.session.name
                });
            }
        }
    },
/*                  PUT                  */
    putPolicy: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            let resultPolicy = await policyModel.getPolicy(idPolicy);
            let resultPolicies = await policyModel.getPolicies();
            let resultsTaker = await policyModel.getPolicyHolder();
            let fechaDesdePoliza = resultPolicy[0].fecha_desde.toISOString().substring(0, 10);
            let fechaHastaPoliza = resultPolicy[0].fecha_hasta.toISOString().substring(0, 10);
            let insurers = await insurerModel.getInsurers();
            let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            res.render('editPolicy', {
                policy: resultPolicy[0],
                policies: resultPolicies,
                takerNames: resultsTaker,
                fechaDesdePoliza: fechaDesdePoliza,
                fechaHastaPoliza: fechaHastaPoliza,
                insurers: insurers,
                insurer: resultInsurer[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updatePolicy: async (req, res) => {
        let fechaDesdePoliza = new Date(req.body.fecha_desde);
        let fechaHastaPoliza = new Date(req.body.fecha_hasta);
        let montoPrimaAnual = parseFloat(req.body.prima_anual_poliza);
        await policyModel.updatePolicy(fechaDesdePoliza, fechaHastaPoliza, montoPrimaAnual, req.body);
        await policyInsurerInsuredModel.updatePolicyInsurerInsured(req.body.nombre_aseguradora, req.body.id_poliza);
        res.redirect('/sistema');
    },
/*               DELETE                  */
    disablePolicy: async (req, res) => {
        let disablePolicy = 1;
        let disablePolicyInsurerInsured = 1;
        await policyModel.disablePolicy(req.params.id, disablePolicy);
        await policyInsurerInsuredModel.disablePolicyInsurerInsured(req.params.id, disablePolicyInsurerInsured);
        res.redirect('/sistema/policies');
    }
}