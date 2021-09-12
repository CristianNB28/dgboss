const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const bondModel = require('../models/bond');
const hedgeModel = require('../models/hedge');

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
    getPolicies: async (req, res) => {
        let resultsPolicies =  await policyModel.getPolicies();
        let resultsPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
        for (let index = 0; index < resultsPII.length; index++) {
            let elementPII = resultsPII[index];
            let resultInsurer = await insurerModel.getInsurer(elementPII.aseguradora_id);
            let resultInsured = await insuredModel.getInsured(elementPII.asegurado_id);
            for (let index = 0; index < resultsPolicies.length; index++) {
                let elementPolicy = resultsPolicies[index];
                if ((index < elementPII.id_paa) && (typeof(elementPolicy.fecha_desde) !== 'string')) {
                    elementPolicy.fecha_desde = elementPolicy.fecha_desde.toLocaleDateString().split('T')[0] 
                    elementPolicy.fecha_hasta = elementPolicy.fecha_hasta.toLocaleDateString().split('T')[0]
                    elementPolicy.nombre_aseguradora = resultInsurer[0].nombre_aseguradora;
                    elementPolicy.cedula_asegurado = resultInsured[0].cedula_asegurado;
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
        let montoPrima = parseFloat(req.body.monto_prima);
        let tasaPoliza = parseFloat(req.body.tasa_poliza);
        let deducible = parseFloat(req.body.deducible_poliza);
        let comisionPoliza = parseFloat(req.body.comision_poliza);
        let fechaPolizaDesde = new Date(req.body.fecha_desde);
        let fechaPolizaHasta = new Date(req.body.fecha_hasta);
        let tipoPoliza = 'Individual';
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
            let policy = await policyModel.postVehiclePolicyForm(tomadorViejo, montoPrima, tasaPoliza, deducible, comisionPoliza, fechaPolizaDesde, fechaPolizaHasta, tipoPoliza, estatusPoliza, req.body);
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
        let montoPrima = parseFloat(req.body.monto_prima);
        let deducible = parseFloat(req.body.deducible_poliza);
        let comisionPoliza = parseFloat(req.body.comision_poliza);
        let fechaPolizaDesde = new Date(req.body.fecha_desde);
        let fechaPolizaHasta = new Date(req.body.fecha_hasta);
        let tipoPoliza = 'Individual';
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
            let policy = await policyModel.postHealthPolicyForm(tomadorViejo, montoPrima, deducible, comisionPoliza, fechaPolizaDesde, fechaPolizaHasta, tipoPoliza, estatusPoliza, req.body);
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
        let montoPrima = parseFloat(req.body.monto_prima);
        let tasaPoliza = parseFloat(req.body.tasa_poliza);
        let deducible = parseFloat(req.body.deducible_poliza);
        let comisionPoliza = parseFloat(req.body.comision_poliza);
        let fechaPolizaDesde = new Date(req.body.fecha_desde);
        let fechaPolizaHasta = new Date(req.body.fecha_hasta);
        let tipoPoliza = 'Individual';
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
            let policy = await policyModel.postPatrimonialPolicyForm(tomadorViejo, montoPrima, tasaPoliza, deducible, comisionPoliza, fechaPolizaDesde, fechaPolizaHasta, tipoPoliza, estatusPoliza, req.body);
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
/*                  PUT                  */
// Falta por arreglar los tomadores
    putPolicy: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idPolicy = req.params.id;
        if (idPolicy.match(valoresAceptados)) {
            let resultPolicy = await policyModel.getPolicy(idPolicy);
            let fechaDesdePoliza = resultPolicy[0].fecha_desde.toISOString().substring(0, 10);
            let fechaHastaPoliza = resultPolicy[0].fecha_hasta.toISOString().substring(0, 10);
            let insurers = await insurerModel.getInsurers();
            let insureds = await insuredModel.getInsureds();
            let resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
            let resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            let resultInsured = await insuredModel.getInsured(resultPII[0].asegurado_id);
            res.render('editPolicy', {
                policy: resultPolicy[0],
                fechaDesdePoliza: fechaDesdePoliza,
                fechaHastaPoliza: fechaHastaPoliza,
                insurers: insurers,
                insureds: insureds,
                insurer: resultInsurer[0],
                insured: resultInsured[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updatePolicy: async (req, res) => {
        let fechaDesdePoliza = new Date(req.body.fecha_desde);
        let fechaHastaPoliza = new Date(req.body.fecha_hasta);
        let montoPrima = parseFloat(req.body.monto_prima);
        await policyModel.updatePolicy(fechaDesdePoliza, fechaHastaPoliza, montoPrima, req.body);
        await policyInsurerInsuredModel.updatePolicyInsurerInsured(req.body.nombre_tomador, req.body.nombre_aseguradora, req.body.id_poliza);
        res.render('index', {
            alert: true,
            alertTitle: 'Exitoso',
            alertMessage: 'Se actualizaron los datos exitosamente',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'sistema',
            name: req.session.name
        });
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