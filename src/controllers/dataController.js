const companyModel = require('../models/company');
const insurerModel = require('../models/insurer');

module.exports = {
/*                  GET                  */
    getInsurerForm: (req, res) => {
        res.render('insurerForm', {
            name: req.session.name
        });
    },
    getCompanyForm: (req, res) => {
        res.render('companyForm', {
            name: req.session.name
        });
    },
    getCompany: async (req, res) => {
        let diasRenovacion = 0;
        let resultCompany = await companyModel.getCompany();
        if (resultCompany[0] === undefined) {
            res.render('company', {
                company: resultCompany,
                diasRenovacion: diasRenovacion,
                name: req.session.name
            });
        } else {
            let fechaTranscurrida = resultCompany[0].fecha_renovacion;
            let fechaActual = new Date();
            let diferenciaTiempo = fechaActual.getTime() - fechaTranscurrida.getTime();
            let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
            let diasRenovacion = diferenciaDias.toFixed(0) 
            res.render('company', {
                company: resultCompany,
                diasRenovacion: diasRenovacion,
                name: req.session.name
            });
        }
    },
    getInsurers: async (req, res) => {
        let resultsInsurers = await insurerModel.getInsurers();
        res.render('insurers', {
            data: resultsInsurers,
            name: req.session.name
        });
    },
/*                  POST                  */
    postCompanyForm: async (req, res) => {
        comision_porcentaje = parseFloat(req.body.comision_empresa);
        fecha_empresa = new Date(req.body.dias_renovacion_empresa);
        factor_retencion_empresa = parseFloat(req.body.factor_empresa);
        await companyModel.postCompanyForm(comision_porcentaje, fecha_empresa, factor_retencion_empresa, req.body);
        res.render('companyForm', {
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
    postInsurerForm: async (req, res) => {
        let empresa = await companyModel.getCompany();
        if (empresa[0] !== undefined) {
            let idEmpresa = empresa[0].id_empresa;
            await insurerModel.postInsurerForm(req.body, idEmpresa);
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
        } else {
            res.render('insurerForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'No existe empresa para que se relacione con la aseguradora',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema',
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
    putCompany: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idCompany = req.params.id;
        if (idCompany.match(valoresAceptados)) {
            let resultCompany = await companyModel.getCompany();
            let fechaRenovacion = resultCompany[0].fecha_renovacion.toISOString().substring(0, 10);
            res.render('editCompany', {
                company: resultCompany[0],
                fecha: fechaRenovacion,
                name: req.session.name
            });
        } else {
            next();
        }
    },
    updateInsurer: async (req, res) => {
        await insurerModel.updateInsurer(req.body);
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
    updateCompany: async (req, res) => {
        let comision_porcentaje = parseFloat(req.body.comision_empresa);
        let fecha_empresa = new Date(req.body.dias_renovacion_empresa);
        let factor_retencion_empresa = parseFloat(req.body.factor_empresa);
        let cedulaEmpresa = '';
        let rifEmpresa = '';
        if ((typeof(req.body.rif_empresa) !== 'undefined')) {
            if ((!req.body.rif_empresa.startsWith('J')) && (!req.body.rif_empresa.startsWith('G')) && (!req.body.rif_empresa.startsWith('V'))) {
                cedulaEmpresa = req.body.rif_empresa;
            } else if (((req.body.rif_empresa.startsWith('J')) || (req.body.rif_empresa.startsWith('G')) || (req.body.rif_empresa.startsWith('V')))) {
                rifEmpresa = req.body.rif_empresa;
            }
        } else {
            if ((req.body.cedula_empresa.startsWith('J')) || (req.body.cedula_empresa.startsWith('G')) || (req.body.cedula_empresa.startsWith('V'))) {
                rifEmpresa = req.body.cedula_empresa
            } else if ((!req.body.cedula_empresa.startsWith('J')) && (!req.body.cedula_empresa.startsWith('G')) && (!req.body.cedula_empresa.startsWith('V'))) {
                cedulaEmpresa = req.body.cedula_empresa
            } 
        }
        await companyModel.updateCompany(cedulaEmpresa, rifEmpresa, comision_porcentaje, fecha_empresa, factor_retencion_empresa, req.body)
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
    disableInsurer: async (req, res) => {
        let disableInsurer = 1;
        await insurerModel.disableInsurer(req.params.id, disableInsurer);
        res.redirect('/sistema/insurers');
    },
    disableCompany: async (req, res) => {
        let disableCompany = 1;
        await companyModel.disableCompany(req.params.id, disableCompany);
        res.redirect('/sistema/company');
    }
}