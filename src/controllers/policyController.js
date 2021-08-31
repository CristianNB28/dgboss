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
        let resultsInsureds = await insuredModel.getInsureds();
        let resultsHedges = await hedgeModel.getHedges();
        let resultsBonds = await bondModel.getBonds();
        res.render('vehiclePolicyForm', {
            insurers: resultsInsurers,
            insureds: resultsInsureds,
            hedges: resultsHedges,
            bonds: resultsBonds,
            name: req.session.name
        });
    },
/*                 POST                  */
// Falta terminar la relacion N a N de póliza con tomador
    postPolicyForm: async (req, res) => {
        let tomador_viejo = req.body.tomador ? 1 : 0;
        let corporativo = req.body.corporativo ? 1 : 0;
        let monto_prima = parseFloat(req.body.monto_prima);
        let deducible = parseFloat(req.body.deducible_poliza);
        let fecha_poliza_desde = new Date(req.body.fecha_desde);
        let fecha_poliza_hasta = new Date(req.body.fecha_hasta);
        let resultsInsurers = await insurerModel.getInsurers();
        let resultsInsureds = await insuredModel.getInsureds();
        let cedula_tomador = '';
        let rif_tomador = '';
        let cedula_asegurado = '';
        let rif_asegurado = '';
        if (((req.body.id_rif_tomador.startsWith('J')) || (req.body.id_rif_tomador.startsWith('G')) || (req.body.id_rif_tomador.startsWith('V')))) {
            rif_tomador = req.body.id_rif_tomador;
        } else {
            cedula_tomador = req.body.id_rif_tomador;
        }
        if (((req.body.id_rif_asegurado.startsWith('J')) || (req.body.id_rif_asegurado.startsWith('G')) || (req.body.id_rif_asegurado.startsWith('V')))) {
            rif_asegurado = req.body.id_rif_asegurado;
        } else {
            cedula_asegurado = req.body.id_rif_asegurado;
        }
        if (req.body.correo_tomador === req.body.correo_verificar) {
            let policy = await policyModel.postPolicyForm(tomador_viejo, corporativo, monto_prima, deducible, fecha_poliza_desde, fecha_poliza_hasta, req.body);
            await policyInsurerInsuredModel.postPolicyInsurerInsured(cedula_asegurado, rif_asegurado, req.body.nombre_aseguradora, policy.insertId);
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
                    insureds: resultsInsureds,
                    name: req.session.name
                });
            }
        }
    }
/*                  PUT                  */
/*               DELETE                  */
}