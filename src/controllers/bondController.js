const bondModel = require('../models/bond');

module.exports = {
/*                  GET                  */
    getBondForm: (req, res) => {
        res.render('bondForm', {
            name: req.session.name
        });
    },
    getBonds: async (req, res) => {
        let resultsBonds = await bondModel.getBonds();
        res.render('bonds',{
            data: resultsBonds,
            name: req.session.name 
        });
    },
/*                 POST                  */
    postBondForm: async (req, res) => {
        await bondModel.postBondForm(req.body);
        res.render('rolForm', {
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
    putBond: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idBond = req.params.id;
        if (idBond.match(valoresAceptados)) {
            let resultBond = await bondModel.getBond(idBond);
            res.render('editBond', {
                bond: resultBond[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updateBond: async (req, res) => {
        await bondModel.updateBond(req.body);
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
    disableBond: async (req, res) => {
        let disableBond = 1;
        await bondModel.disableBond(req.params.id, disableBond);
        res.redirect('/sistema/bonds')
    } 
}