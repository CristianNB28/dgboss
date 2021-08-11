const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
// Falta
const bcrypt = require('bcryptjs')

const maxAge = 3*24*60*60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: maxAge
    });
}

module.exports = {
/*                  GET                  */
    getLogin: (req, res) => {
        res.render('login');
    },

    getForgotPassword: (req, res) => {
        res.render('forgotPassword');
    },

    getLogout: (req, res) => {
        res.cookie('jwt', '', { maxAge: 1 });
        req.session.destroy(() => {
            res.redirect('/sistema');
        });
    },
/*                  POST                  */
    postLogin: async (req, res, next) => {
        let results = await userModel.postLogin(req.body.correo_usuario);
        if (results[0] === undefined) {
            try {
                throw new Error('Error, correo o contraseña no encontrada');
            } catch (error) {
                console.log(error);
                res.render('login', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'correo o contraseña no encontrada',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'sistema/login'
                });
            }
        } else {
            //const equals = bcrypt.compareSync(req.body.password_usuario, results.password_usuario);
            if (req.body.password_usuario !== results[0].password_usuario) {
                try {
                    throw new Error('Error, contraseña incorrecta');
                } catch (error) {
                    console.log(error);
                    res.render('login', {
                        alert: true,
                        alertTitle: 'Error',
                        alertMessage: 'contraseña incorrecta',
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: 1500,
                        ruta: 'sistema/login'
                    });
                }
            } else {
                const token = createToken(results[0].id_usuario);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                req.session.name = results[0].nombre_usuario;
                res.render('login', {
                    alert: true,
                    alertTitle: 'Bienvenido',
                    alertMessage: 'ingreso al sistema exitosamente',
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'sistema'
                });
            }
        }
    }
}