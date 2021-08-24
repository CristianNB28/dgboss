const express = require('express');
const router = express.Router();
// Controllers
const loginController = require('../controllers/loginController');
const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');
const dataController = require('../controllers/dataController');
// Middlewares
const requireAuth = require('../middlewares/authMiddleware');

// Ruta index
router.get('/', requireAuth, indexController.getIndex);
// Rutas login
router.get('/login', loginController.getLogin);
router.post('/auth', loginController.postLogin);
router.get('/forgot-password', loginController.getForgotPassword);
router.get('/logout', loginController.getLogout);
// Rutas de Gestión de Usuarios
router.get('/user-management', requireAuth, userController.getUserForm);
router.post('/user-management', requireAuth, userController.postUserForm);
router.get('/add-rol', requireAuth, userController.getRolForm);
router.post('/add-rol', requireAuth, userController.postRolForm);
router.get('/roles', requireAuth, userController.getRoles);
router.get('/users', requireAuth, userController.getUsers);
router.post('/remove-rol/:id', requireAuth, userController.deleteRol);
router.post('/remove-user/:id', requireAuth, userController.deleteUser);
router.get('/edit-rol/:id', requireAuth, userController.putRol);
router.post('/update-rol', requireAuth, userController.updateRol);
router.get('/edit-user/:id', requireAuth, userController.putUser);
router.post('/update-user', requireAuth, userController.updateUser);
// Rutas de Datos
router.get('/add-company', requireAuth, dataController.getCompanyForm);
router.post('/add-company', requireAuth, dataController.postCompanyForm);
router.get('/company', requireAuth, dataController.getCompany)
router.get('/add-insurer', requireAuth, dataController.getInsurerForm);
router.post('/add-insurer', requireAuth, dataController.postInsurerForm);
router.get('/insurers', requireAuth, dataController.getInsurers);
router.post('/remove-insurer/:id', requireAuth, dataController.deleteInsurer);
// Pagina error 404
router.get('*', indexController.get404);

module.exports = router;