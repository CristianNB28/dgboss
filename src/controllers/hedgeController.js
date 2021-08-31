const hedgeModel = require('../models/hedge');
const policyHedgeModel = require('../models/policy_hedge');

module.exports = {
/*                  GET                  */
    getHedgeForm: (req, res) => {
        res.render('hedgeForm', {
            name: req.session.name
        });
    },
    getHedges: async (req, res) => {
        let resultsHedges = await hedgeModel.getHedges();
        res.render('hedges',{
            data: resultsHedges,
            name: req.session.name 
        });
    },
/*                 POST                  */
    postHedgeForm: async (req, res) => {
        await hedgeModel.postHedgeForm(req.body);
        res.render('hedgeForm', {
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
    postPolicyHedgeForm: async (req, res) => {
        await policyHedgeModel.postPolicyHedgeForm(req.body.descripcion_cobertura);
        res.redirect('/sistema/add-vehicle-policy');
    },
/*                  PUT                  */
    putHedge: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idHedge = req.params.id;
        if (idHedge.match(valoresAceptados)) {
            let resultHedge = await hedgeModel.getHedge(idHedge);
            res.render('editHedge', {
                hedge: resultHedge[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updateHedge: async (req, res) => {
        await hedgeModel.updateHedge(req.body);
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
    disableHedge: async (req, res) => {
        let disableHedge = 1;
        await hedgeModel.disableHedge(req.params.id, disableHedge);
        res.redirect('/sistema/hedges');
    }
}