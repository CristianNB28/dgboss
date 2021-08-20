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
        let idEmpresa = empresa[0].id_empresa;
        if (idEmpresa !== undefined) {
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
                ruta: 'sistema/add-insurer',
                name: req.session.name
            });
        }
    }
}