const companyModel = require('../models/company');
const insuredModel = require('../models/insured');

module.exports = {
/*                  GET                  */
    getInsuredForm: (req, res) => {
        res.render('insuredForm', {
            name: req.session.name
        });
    },
    getInsureds: async (req, res) => {
        let resultsInsureds = await insuredModel.getInsureds();
        res.render('insureds', {
            data: resultsInsureds,
            name: req.session.name
        });
    },
/*                 POST                  */
    postInsuredForm: async (req, res) => {
        let empresa = await companyModel.getCompany();
        if (empresa[0] !== undefined) {
            let idEmpresa = empresa[0].id_empresa;
            await insuredModel.postInsuredForm(req.body, idEmpresa);
            res.render('insuredForm', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se registraron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'sistema',
                name: req.session.name
            });
        } else {
            res.render('insuredForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'No existe empresa para que se relacione con el asegurado',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema',
                name: req.session.name
            });
        }
    },
/*                  PUT                  */
    putInsured: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idInsured = req.params.id;
        if (idInsured.match(valoresAceptados)) {
            let resultInsured = await insuredModel.getInsured(idInsured);
            res.render('editInsured', {
                insured: resultInsured[0],
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updateInsured: async (req, res) => {
        let cedulaAsegurado = '';
        let rifAsegurado = '';
        if ((typeof(req.body.rif_asegurado) !== 'undefined')) {
            if ((!req.body.rif_asegurado.startsWith('J')) && (!req.body.rif_asegurado.startsWith('G')) && (!req.body.rif_asegurado.startsWith('V'))) {
                cedulaAsegurado = req.body.rif_asegurado;
            } else if (((req.body.rif_asegurado.startsWith('J')) || (req.body.rif_asegurado.startsWith('G')) || (req.body.rif_asegurado.startsWith('V')))) {
                rifAsegurado = req.body.rif_asegurado;
            }
        } else {
            if ((req.body.cedula_asegurado.startsWith('J')) || (req.body.cedula_asegurado.startsWith('G')) || (req.body.cedula_asegurado.startsWith('V'))) {
                rifAsegurado = req.body.cedula_asegurado
            } else if ((!req.body.cedula_asegurado.startsWith('J')) && (!req.body.cedula_asegurado.startsWith('G')) && (!req.body.cedula_asegurado.startsWith('V'))) {
                cedulaAsegurado = req.body.cedula_asegurado
            } 
        }
        await insuredModel.updateInsured(cedulaAsegurado, rifAsegurado, req.body);
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
    disableInsured: async (req, res) => {
        let disableInsured = 1;
        await insuredModel.disableInsured(req.params.id, disableInsured);
        res.redirect('/sistema/insureds');
    }
}