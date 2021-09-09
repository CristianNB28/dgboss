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
router.get('/add-insurer', requireAuth, dataController.getInsurerForm);
router.post('/add-insurer', requireAuth, dataController.postInsurerForm);
router.get('/insurers', requireAuth, dataController.getInsurers);
router.post('/remove-insurer/:id', requireAuth, dataController.disableInsurer);
router.get('/edit-insurer/:id', requireAuth, dataController.putInsurer);
router.post('/update-insurer', requireAuth, dataController.updateInsurer);
router.get('/add-own-agent', requireAuth, dataController.getOwnAgentForm);
router.post('/add-own-agent', requireAuth, dataController.postOwnAgentForm);
router.get('/own-agents', requireAuth, dataController.getOwnAgents);
router.post('/remove-own-agent/:id', requireAuth, dataController.disableOwnAgent);
router.get('/edit-own-agent/:id', requireAuth, dataController.putOwnAgent);
router.post('/update-own-agent', requireAuth, dataController.updateOwnAgent);
router.get('/add-executive', requireAuth, dataController.getExecutiveForm);
router.post('/add-executive', requireAuth, dataController.postExecutiveForm);
router.get('/executives', requireAuth, dataController.getExecutives);
router.post('/remove-executive/:id', requireAuth, dataController.disableExecutive);
router.get('/edit-executive/:id', requireAuth, dataController.putExecutive);
router.post('/update-executive', requireAuth, dataController.updateExecutive);
// Rutas de Asegurados
router.get('/add-natural-insured', requireAuth, insuredController.getNaturalInsuredForm);
router.post('/add-natural-insured', requireAuth, insuredController.postNaturalInsuredForm);
router.get('/add-legal-insured', requireAuth, insuredController.getLegalInsuredForm);
router.post('/add-legal-insured', requireAuth, insuredController.postLegalInsuredForm);
router.get('/natural-insureds', requireAuth, insuredController.getNaturalInsureds);
router.get('/legal-insureds', requireAuth, insuredController.getLegalInsureds);
router.post('/remove-natural-insured/:id', requireAuth, insuredController.disableNaturalInsured);
router.post('/remove-legal-insured/:id', requireAuth, insuredController.disableLegalInsured);
router.get('/edit-natural-insured/:id', requireAuth, insuredController.putNaturalInsured);
router.post('/update-natural-insured', requireAuth, insuredController.updateNaturalInsured);
router.get('/edit-legal-insured/:id', requireAuth, insuredController.putLegalInsured);
router.post('/update-legal-insured', requireAuth, insuredController.updateLegalInsured);
// Rutas de Pólizas
router.get('/add-vehicle-policy', requireAuth, policyController.getVehiclePolicyForm);
router.post('/add-policy', requireAuth, policyController.postPolicyForm);
router.post('/add-vehicle', requireAuth, vehicleController.postVehicleForm);
router.post('/add-hedge-policy', requireAuth, hedgeController.postPolicyHedgeForm);
router.post('/add-bond-policy', requireAuth, bondController.postPolicyBondForm);
router.post('/add-receipt', requireAuth, receiptController.postReceiptForm);
router.get('/policies', requireAuth, policyController.getPolicies);
router.post('/remove-policy/:id', requireAuth, policyController.disablePolicy);
router.get('/edit-policy/:id', requireAuth, policyController.putPolicy);
router.post('/update-policy', requireAuth, policyController.updatePolicy);
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