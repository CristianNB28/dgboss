const userModel = require('../models/user');
const executiveModel = require('../models/executive');
const bcrypt = require('bcryptjs');

module.exports = {
/*                  GET                  */
    getUserForm: async (req, res) => {
        const resultExecutives = await executiveModel.getExecutives();
        res.render('userForm', {
            executives: resultExecutives,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
    getUsers: async (req, res) => {
        const resultsUsers = await userModel.getUsers();
        res.render('users', {
            data: resultsUsers,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
/*                  POST                  */
    postUserForm: async (req, res) => {
        try {
            const {
                nombre_apellido_usuario: nameUser,
                password_usuario: passwordUser,
                password_confirm: passwordConfirm
            } = req.body;
            if (passwordUser === passwordConfirm) {
                const passwordHash = await bcrypt.hash(passwordUser, 8);
                let nombresEjecutivo;
                let apellidosEjecutivo;
                if (nameUser.split(" ").length === 2) {
                    nombresEjecutivo = nameUser.split(' ', 1).join(' ');
                    apellidosEjecutivo = nameUser.split(' ').slice(1,2).join(' ');
                } else {
                    nombresEjecutivo = nameUser.split(' ', 2).join(' ');
                    apellidosEjecutivo = nameUser.split(' ').slice(2,4).join(' ');
                }
                const idEjecutivo = await executiveModel.getExecutiveId(nombresEjecutivo, apellidosEjecutivo);
                await userModel.postUserForm(passwordHash, idEjecutivo[0].id_ejecutivo, req.body);
                res.render('userForm', {
                    alert: true,
                    alertTitle: 'Exitoso',
                    alertMessage: 'Se registraron los datos exitosamente',
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'sistema/user-management',
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
                        name: req.session.name,
                        cookieRol: req.cookies.rol
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.render('userForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/user-management',
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
/*                  PUT                  */
    putUser: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idUser = req.params.id;
        if (idUser.match(valoresAceptados)) {
            const resultUser = await userModel.getUser(idUser);
            const resultExecutives = await executiveModel.getExecutives();
            res.render('editUser', {
                user: resultUser[0],
                executives: resultExecutives,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    updateUser: async (req, res) => {
        const {
            nombre_apellido_usuario: nameUser,
            password_usuario: passwordUser,
            id_usuario: idUser
        } = req.body;
        const resultUser = await userModel.getUser(idUser);
        const resultExecutives = await executiveModel.getExecutives();
        try {
            let nombresEjecutivo;
            let apellidosEjecutivo;
            if (nameUser.split(" ").length === 2) {
                nombresEjecutivo = nameUser.split(' ', 1).join(' ');
                apellidosEjecutivo = nameUser.split(' ').slice(1,2).join(' ');
            } else {
                nombresEjecutivo = nameUser.split(' ', 2).join(' ');
                apellidosEjecutivo = nameUser.split(' ').slice(2,4).join(' ');
            }
            const idEjecutivo = await executiveModel.getExecutiveId(nombresEjecutivo, apellidosEjecutivo);
            if (passwordUser !== resultUser[0].password_usuario) {
                const newPassword = await bcrypt.hash(passwordUser, 8);
                await userModel.updateUser(newPassword, idEjecutivo[0].id_ejecutivo, req.body);
                res.render('editUser', {
                    alert: true,
                    alertTitle: 'Exitoso',
                    alertMessage: 'Se actualizaron los datos exitosamente',
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: `sistema/edit-user/${idUser}`,
                    user: resultUser[0],
                    executives: resultExecutives,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            } else {
                await userModel.updateUser(passwordUser, idEjecutivo[0].id_ejecutivo, req.body);
                res.render('editUser', {
                    alert: true,
                    alertTitle: 'Exitoso',
                    alertMessage: 'Se actualizaron los datos exitosamente',
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: `sistema/edit-user/${idUser}`,
                    user: resultUser[0],
                    executives: resultExecutives,
                    name: req.session.name,
                    cookieRol: req.cookies.rol
                });
            }
        } catch (error) {
            console.log(error);
            res.render('editUser', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-user/${idUser}`,
                user: resultUser[0],
                executives: resultExecutives,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
/*               DELETE                  */
    disableUser: async (req, res) => {
        const disable = 1;
        await userModel.updateDisableUser(req.params.id, req.body);
        await userModel.disableUser(req.params.id, disable);
        res.redirect('/sistema/users');
    },
}