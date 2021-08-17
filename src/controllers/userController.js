const userModel = require('../models/user');
const rolUserModel = require('../models/rol_user');
const rolModel = require('../models//rol');
const bcrypt = require('bcryptjs');

module.exports = {
/*                  GET                  */
    getUserForm: (req, res) => {
        res.render('userForm', {
            name: req.session.name
        });
    },
    getRol: async (req, res) => {
        let results = await rolModel.getRol();
        if (results === undefined) {
            try {
                throw new Error('Error, No se encontraron roles inscritos en el sistema');
            } catch (error) {
                console.log(error);
                res.render('checkRoles', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'No se encontraron roles inscritos en el sistema',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/roles',
                    name: req.session.name
                });
            }
        } else {
            res.render('checkRoles',{
                roles: results,
                name: req.session.name 
            });
        }
    },
    getUsers: async (req, res) => {
        //let resultsRoles = await rolModel.getRol();
        let resultsUsers = await userModel.getUsers();
        res.render('users', {
            data: resultsUsers,
            name: req.session.name
        });
    },
/*                  POST                  */
    postUserForm: async (req, res) => {
        let admin = req.body.admin ? 1 : 0;
        let productor = req.body.productor ? 1 : 0;
        if (req.body.password_usuario === req.body.password_confirm) {
            let passwordHash = await bcrypt.hash(req.body.password_usuario, 8);
            let user = await userModel.postUserForm(admin, productor, passwordHash, req.body);
            await rolUserModel.postRolUserForm(user.insertId, req.body.rol);
            res.render('userForm', {
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
            try {
                throw new Error('Error, las claves no son iguales');
            } catch (error) {
                console.log(error);
                res.render('userForm', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'Las claves no son iguales',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/user-management',
                    name: req.session.name
                });
            }
        }
    }
}