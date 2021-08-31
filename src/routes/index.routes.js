const express = require('express');
const router = express.Router();
// Controllers
const loginController = require('../controllers/loginController');
const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');
const dataController = require('../controllers/dataController');
const insuredController = require('../controllers/insuredController');
const policyController = require('../controllers/policyController');
const bondController = require('../controllers/bondController');
const hedgeController = require('../controllers/hedgeController');
const vehicleController = require('../controllers/vehicleController');
const receiptController = require('../controllers/receiptController');
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
router.post('/remove-rol/:id', requireAuth, userController.disableRol);
router.post('/remove-user/:id', requireAuth, userController.disableUser);
router.get('/edit-rol/:id', requireAuth, userController.putRol);
router.post('/update-rol', requireAuth, userController.updateRol);
router.get('/edit-user/:id', requireAuth, userController.putUser);
router.post('/update-user', requireAuth, userController.updateUser);
// Rutas de Datos
router.get('/add-company', requireAuth, dataController.getCompanyForm);
router.post('/add-company', requireAuth, dataController.postCompanyForm);
router.get('/company', requireAuth, dataController.getCompany);
router.post('/remove-company/:id', requireAuth, dataController.disableCompany);
router.get('/edit-company/:id', requireAuth, dataController.putCompany);
router.post('/update-company', requireAuth, dataController.updateCompany);
router.get('/add-insurer', requireAuth, dataController.getInsurerForm);
router.post('/add-insurer', requireAuth, dataController.postInsurerForm);
router.get('/insurers', requireAuth, dataController.getInsurers);
router.post('/remove-insurer/:id', requireAuth, dataController.disableInsurer);
router.get('/edit-insurer/:id', requireAuth, dataController.putInsurer);
router.post('/update-insurer', requireAuth, dataController.updateInsurer);
// Rutas de Asegurados
router.get('/add-insured', requireAuth, insuredController.getInsuredForm);
router.post('/add-insured', requireAuth, insuredController.postInsuredForm);
router.get('/insureds', requireAuth, insuredController.getInsureds);
router.post('/remove-insured/:id', requireAuth, insuredController.disableInsured);
router.get('/edit-insured/:id', requireAuth, insuredController.putInsured);
router.post('/update-insured', requireAuth, insuredController.updateInsured);
// Rutas de Pólizas
router.get('/add-vehicle-policy', requireAuth, policyController.getVehiclePolicyForm);
router.post('/add-policy', requireAuth, policyController.postPolicyForm);
router.post('/add-vehicle', requireAuth, vehicleController.postVehicleForm);
router.post('/add-hedge', requireAuth, hedgeController.postPolicyHedgeForm);
router.post('/add-bond', requireAuth, bondController.postPolicyBondForm);
router.post('/add-receipt', requireAuth, receiptController.postReceiptForm);
// Rutas de Bonos
router.get('/add-bond', requireAuth, bondController.getBondForm);
router.post('/add-bond', requireAuth, bondController.postBondForm);
router.get('/bonds', requireAuth, bondController.getBonds);
router.post('/remove-bond/:id', requireAuth, bondController.disableBond);
router.get('/edit-bond/:id', requireAuth, bondController.putBond);
router.post('/update-bond', requireAuth, bondController.updateBond);
// Rutas de Coberturas
router.get('/add-hedge', requireAuth, hedgeController.getHedgeForm);
router.post('/add-hedge', requireAuth, hedgeController.postHedgeForm);
router.get('/hedges', requireAuth, hedgeController.getHedges);
router.post('/remove-hedge/:id', requireAuth, hedgeController.disableHedge);
router.get('/edit-hedge/:id', requireAuth, hedgeController.putHedge);
router.post('/update-hegde', requireAuth, hedgeController.updateHedge);
// Pagina error 404
router.get('*', indexController.get404);

module.exports = router;