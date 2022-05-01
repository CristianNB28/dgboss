const userModel = require('../models/user');
const rolUserModel = require('../models/rol_user');
const rolModel = require('../models/rol');
const bcrypt = require('bcryptjs');

module.exports = {
/*                  GET                  */
    getUserForm: async (req, res) => {
        let resultsRoles = await rolModel.getRoles();
        res.render('userForm', {
            roles: resultsRoles,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getRolForm: (req, res) => {
        res.render('rolForm', {
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getUsers: async (req, res) => {
        let resultsUsers = await userModel.getUsers();
        res.render('users', {
            data: resultsUsers,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getRoles: async (req, res) => {
        let results = await rolModel.getRoles();
        res.render('checkRoles',{
            data: results,
            name: req.session.name,
            cookieRol: req.cookies.rol 
        });
    },
/*                  POST                  */
    postUserForm: async (req, res) => {
        let admin = req.body.admin ? 1 : 0;
        let productor = req.body.productor ? 1 : 0;
        let resultsRol = await rolModel.getRoles();
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
                ruta: 'sistema/user-management',
                roles: resultsRol,
                name: req.session.name,
                cookieRol: req.cookies.rol
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
                    roles: resultsRol,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        }
    },
    postRolForm: async (req, res) => {
        await rolModel.postRolForm(req.body)
        res.render('rolForm', {
            alert: true,
            alertTitle: 'Exitoso',
            alertMessage: 'Se registraron los datos exitosamente',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'sistema/add-rol',
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
/*                  PUT                  */
    putUser: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idUser = req.params.id;
        if (idUser.match(valoresAceptados)) {
            let resultUser = await userModel.getUser(idUser);
            let resultRolUser = await rolUserModel.getRolUser(idUser);
            let resultRol = await rolModel.getRol(resultRolUser[0].rol_id);
            let resultsRoles = await rolModel.getRoles();
            res.render('editUser', {
                user: resultUser[0],
                rol: resultRol[0],
                roles: resultsRoles,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putRol: async(req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idRol = req.params.id;
        if (idRol.match(valoresAceptados)) {
            let resultRol = await rolModel.getRol(idRol);
            res.render('editRol', {
                rol: resultRol[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    updateUser: async (req, res) => {
        let admin = req.body.admin ? 1 : 0;
        let productor = req.body.productor ? 1 : 0;
        let cedulaUsuario = '';
        let rifUsuario = '';
        const idUser = req.body.id_usuario;
        if ((typeof(req.body.rif_usuario) !== 'undefined')) {
            if ((!req.body.rif_usuario.startsWith('J')) && (!req.body.rif_usuario.startsWith('G')) && (!req.body.rif_usuario.startsWith('V'))) {
                cedulaUsuario = req.body.rif_usuario;
            } else if (((req.body.rif_usuario.startsWith('J')) || (req.body.rif_usuario.startsWith('G')) || (req.body.rif_usuario.startsWith('V')))) {
                rifUsuario = req.body.rif_usuario;
            }
        } else {
            if ((req.body.cedula_usuario.startsWith('J')) || (req.body.cedula_usuario.startsWith('G')) || (req.body.cedula_usuario.startsWith('V'))) {
                rifUsuario = req.body.cedula_usuario
            } else if ((!req.body.cedula_usuario.startsWith('J')) && (!req.body.cedula_usuario.startsWith('G')) && (!req.body.cedula_usuario.startsWith('V'))) {
                cedulaUsuario = req.body.cedula_usuario
            } 
        }
        if (req.body.password_usuario !== req.body.password_confirm) {
            let newPassword = await bcrypt.hash(req.body.password_usuario, 8);
            await rolUserModel.updateRolUser(idUser, req.body.rol);
            await userModel.updateUser(cedulaUsuario, rifUsuario, admin, productor, newPassword, req.body);
            res.redirect(`/sistema/edit-user/${idUser}`);
        } else {
            await rolUserModel.updateRolUser(idUser, req.body.rol);
            await userModel.updateUser(cedulaUsuario, rifUsuario, admin, productor, req.body.password_usuario, req.body);
            res.redirect(`/sistema/edit-user/${idUser}`);
        }
    },
    updateRol: async (req, res) => {
        const idRol = req.body.id_rol
        if ((req.body.nombre_rol) || (req.body.descripcion_rol)) {
            await rolModel.updateRol(req.body);
        }
        res.redirect(`/sistema/edit-rol/${idRol}`);
    },
/*               DELETE                  */
    disableUser: async (req, res) => {
        let disable = 1;
        await userModel.updateDisableUser(req.params.id, req.body);
        await rolUserModel.disableRolUser(req.params.id, disable);
        await userModel.disableUser(req.params.id, disable);
        res.redirect('/sistema/users');
    },
    disableRol: async (req, res) => {
        let disableRol = 1;
        await rolModel.updateDisableRol(req.params.id, req.body);
        await rolModel.disableRol(req.params.id, disableRol);
        res.redirect('/sistema/roles');
    }
}