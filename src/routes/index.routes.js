const express = require('express');
const router = express.Router();
// Controllers
const loginController = require('../controllers/loginController');
const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');
const dataController = require('../controllers/dataController');
const insuredController = require('../controllers/insuredController');
const policyController = require('../controllers/policyController');
const vehicleController = require('../controllers/vehicleController');
const receiptController = require('../controllers/receiptController');
const claimController = require('../controllers/claimController');
const reportController = require('../controllers/reportController');
const beneficiaryController = require('../controllers/beneficiaryController');
const collectiveController = require('../controllers/collectiveController');
const riskDiverseController = require('../controllers/riskDiverseController');
const renewalController = require('../controllers/renewalController');
const emailController = require('../controllers/emailController');
const divisionController = require('../controllers/divisionController');
const distributionController = require('../controllers/distributionController');
// Middlewares
const requireAuth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerMiddleware');
const requireRole = require('../middlewares/routePermissionsMiddleware');

// Ruta index
router.get('/', requireAuth, indexController.getIndex);
router.post('/graph-accident-rate', 
    requireAuth,
    requireRole([
        'COORDINADOR SINIESTRO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    indexController.postIndexGraphicAccidentRate
);
router.post('/graph-premium-collected', 
    requireAuth,
    requireRole([
        'EJECUTIVO COBRANZAS',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    indexController.postIndexGraphicPremiumCollected
);
router.post('/graph-portfolio-composition', 
    requireAuth,
    requireRole([
        'EJECUTIVO SINIESTROS',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    indexController.postIndexGraphicPortfolioComposition
);
router.post('/graph-persistence', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    indexController.postIndexGraphicPersistence
);
// Rutas login
router.get('/login', loginController.getLogin);
router.post('/auth', loginController.postLogin);
router.get('/forgot-password', loginController.getForgotPassword);
router.get('/logout', loginController.getLogout);
// Rutas de Gestión de Usuarios
router.get('/user-management', 
    requireAuth,
    requireRole([
        'ADMINISTRADOR DIRECTOR'
    ]),
    userController.getUserForm
);
router.post('/user-management', requireAuth, userController.postUserForm);
router.get('/users', 
    requireAuth,
    requireRole([
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
userController.getUsers
);
router.post('/remove-user/:id', requireAuth, userController.disableUser);
router.get('/edit-user/:id', requireAuth, userController.putUser);
router.post('/update-user', requireAuth, userController.updateUser);
// Rutas de Datos
router.get('/add-insurer', 
    requireAuth, 
    requireRole([
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]), 
    dataController.getInsurerForm
);
router.post('/add-insurer', requireAuth, dataController.postInsurerForm);
router.get('/insurers', 
    requireAuth, 
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO SINIESTROS',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    dataController.getInsurers
);
router.post('/remove-insurer/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    dataController.disableInsurer
);
router.get('/edit-insurer/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    dataController.putInsurer
);
router.post('/update-insurer', requireAuth, dataController.updateInsurer);
router.get('/add-own-agent', 
    requireAuth,
    requireRole([
        'EJECUTIVO COBRANZAS',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    dataController.getOwnAgentForm
);
router.post('/add-own-agent', requireAuth, dataController.postOwnAgentForm);
router.get('/own-agents', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO SINIESTROS',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    dataController.getOwnAgents
);
router.post('/remove-own-agent/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    dataController.disableOwnAgent
);
router.get('/edit-own-agent/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]), 
    dataController.putOwnAgent
);
router.post('/update-own-agent', requireAuth, dataController.updateOwnAgent);
router.get('/add-executive', 
    requireAuth,
    requireRole([
        'EJECUTIVO COBRANZAS',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    dataController.getExecutiveForm
);
router.post('/add-executive', requireAuth, dataController.postExecutiveForm);
router.get('/executives', 
    requireAuth,
    requireRole([
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    dataController.getExecutives
);
router.post('/remove-executive/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    dataController.disableExecutive
);
router.get('/edit-executive/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    dataController.putExecutive
);
router.post('/update-executive', requireAuth, dataController.updateExecutive);
// Rutas de Asegurados
router.get('/add-natural-insured', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    insuredController.getNaturalInsuredForm
);
router.post('/add-natural-insured', requireAuth, insuredController.postNaturalInsuredForm);
router.get('/add-legal-insured', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    insuredController.getLegalInsuredForm
);
router.post('/add-legal-insured', requireAuth, insuredController.postLegalInsuredForm);
router.get('/natural-insureds',
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO SINIESTROS',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    insuredController.getNaturalInsureds
);
router.get('/legal-insureds',
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO SINIESTROS',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    insuredController.getLegalInsureds
);
router.post('/remove-natural-insured/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    insuredController.disableNaturalInsured
);
router.post('/remove-legal-insured/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    insuredController.disableLegalInsured
);
router.get('/edit-natural-insured/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    insuredController.putNaturalInsured
);
router.post('/update-natural-insured', requireAuth, insuredController.updateNaturalInsured);
router.get('/edit-legal-insured/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    insuredController.putLegalInsured
);
router.post('/update-legal-insured', requireAuth, insuredController.updateLegalInsured);
// Rutas de Pólizas
router.get('/add-vehicle-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getVehiclePolicyForm
);
router.get('/list-vehicle-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getVehiclePolicyList
);
router.post('/add-vehicle-policy', requireAuth, policyController.postVehiclePolicyForm);
router.post('/add-vehicle', requireAuth, vehicleController.postVehicleForm);
router.post('/add-vehicle-receipt', requireAuth, receiptController.postVehicleReceiptForm);
router.get('/add-health-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
policyController.getHealthPolicyForm
);
router.get('/list-health-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getHealthPolicyList
);
router.post('/add-health-policy', requireAuth, policyController.postHealthPolicyForm);
router.post('/add-health-beneficiary', requireAuth, beneficiaryController.postHealthBeneficiaryForm);
router.post('/add-health-receipt', requireAuth, receiptController.postHealthReceiptForm);
router.get('/add-patrimonial-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getPatrimonialPolicyForm
);
router.get('/list-patrimonial-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getPatrimonialPolicyList
);
router.post('/add-patrimonial-policy', requireAuth, policyController.postPatrimonialPolicyForm);
router.post('/add-patrimonial-receipt', requireAuth, receiptController.postPatrimonialReceiptForm);
router.get('/add-bail-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getBailPolicyForm
);
router.get('/list-bail-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getBailPolicyList
);
router.post('/add-bail-policy', requireAuth, policyController.postBailPolicyForm);
router.post('/add-bail-receipt', requireAuth, receiptController.postBailReceiptForm);
router.get('/add-another-branch-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]), 
    policyController.getAnotherBranchPolicyForm
);
router.get('/list-another-branch-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getAnotherBranchPolicyList
);
router.post('/add-another-branch-policy', requireAuth, policyController.postAnotherBranchPolicyForm);
router.post('/add-another-branch-receipt', requireAuth, receiptController.postAnotherBranchReceiptForm);
router.get('/add-funeral-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getFuneralPolicyForm
);
router.get('/list-funeral-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getFuneralPolicyList
);
router.post('/add-funeral-policy', requireAuth, policyController.postFuneralPolicyForm);
router.post('/add-funeral-beneficiary', requireAuth, beneficiaryController.postFuneralBeneficiaryForm);
router.post('/add-funeral-receipt', requireAuth, receiptController.postFuneralReceiptForm);
router.get('/add-life-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getLifePolicyForm
);
router.get('/list-life-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getLifePolicyList
);
router.post('/add-life-policy', requireAuth, policyController.postLifePolicyForm);
router.post('/add-life-beneficiary', requireAuth, beneficiaryController.postLifeBeneficiaryForm);
router.post('/add-life-receipt', requireAuth, receiptController.postLifeReceiptForm);
router.get('/add-ap-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getAPPolicyForm
);
router.get('/list-ap-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getAPPolicyList
);
router.post('/add-ap-policy', requireAuth, policyController.postAPPolicyForm);
router.post('/add-ap-receipt', requireAuth, receiptController.postAPReceiptForm);
router.get('/add-travel-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getTravelPolicyForm
);
router.get('/list-travel-policy', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getTravelPolicyList
);
router.post('/add-travel-policy', requireAuth, policyController.postTravelPolicyForm);
router.post('/add-travel-receipt', requireAuth, receiptController.postTravelReceiptForm);
router.get('/policies', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO SINIESTROS',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getPolicies
);
router.post('/remove-policy/:id',
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.disablePolicy
);
router.get('/edit-policy-health/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.putHealthPolicy
);
router.get('/edit-policy-vehicle/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.putVehiclePolicy
);
router.get('/edit-policy-patrimonial/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.putPatrimonialPolicy
);
router.get('/edit-policy-bail/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.putBailPolicy
);
router.get('/edit-policy-another-branch/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.putAnotherBranchPolicy
);
router.get('/edit-policy-funeral/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.putFuneralPolicy
);
router.get('/edit-policy-life/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.putLifePolicy
);
router.get('/edit-policy-ap/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.putAPPolicy
);
router.get('/edit-policy-travel/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.putTravelPolicy
);
router.post('/update-policy-health', requireAuth, policyController.updateHealthPolicy);
router.post('/update-policy-vehicle', requireAuth, policyController.updateVehiclePolicy);
router.post('/update-policy-patrimonial', requireAuth, policyController.updatePatrimomialPolicy);
router.post('/update-policy-bail', requireAuth, policyController.updateBailPolicy);
router.post('/update-policy-another-branch', requireAuth, policyController.updateAnotherBranchPolicy);
router.post('/update-policy-funeral', requireAuth, policyController.updateFuneralPolicy);
router.post('/update-policy-life', requireAuth, policyController.updateLifePolicy);
router.post('/update-policy-ap', requireAuth, policyController.updateAPPolicy);
router.post('/update-policy-travel', requireAuth, policyController.updateTravelPolicy);
router.get('/policies-detail/:id', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO SINIESTROS',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    policyController.getPoliciesDetail
);
// Rutas de Colectivos
router.get('/add-health-collective', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    collectiveController.getHealthCollectiveForm
);
router.get('/list-health-collective', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    collectiveController.getHealthCollectiveList
);
router.post('/add-health-collective', requireAuth, collectiveController.postHealthCollectiveForm);
router.post('/add-health-beneficiary-collective', 
    requireAuth, 
    upload.single('excel'),
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    beneficiaryController.postHealthBeneficiaryCollectiveForm
);
router.post('/add-health-receipt-collective', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    receiptController.postHealthReceiptCollectiveForm
);
router.get('/add-vehicle-collective', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    collectiveController.getVehicleCollectiveForm
);
router.get('/list-vehicle-collective', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    collectiveController.getVehicleCollectiveList
);
router.post('/add-vehicle-collective', requireAuth, collectiveController.postVehicleCollectiveForm);
router.post('/add-transportation', 
    requireAuth, 
    upload.single('excelAuto'),
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    vehicleController.postVehicleCollectiveForm
);
router.post('/add-vehicle-receipt-collective', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    receiptController.postVehicleReceiptCollectiveForm
);
router.get('/add-risk-diverse-collective', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    collectiveController.getRiskDiverseCollectiveForm
);
router.get('/list-risk-diverse-collective', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    collectiveController.getRiskDiverseCollectiveList
);
router.post('/add-risk-diverse-collective', requireAuth, collectiveController.postRiskDiverseCollectiveForm);
router.post('/add-point-sale', 
    requireAuth, 
    upload.single('excelPuntoVenta'),
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    riskDiverseController.postRiskDiverseForm
);
router.post('/add-risk-receipt-collective', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    receiptController.postRiskDiverseReceiptCollectiveForm
);
router.get('/collectives', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO SINIESTROS',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    collectiveController.getCollectives
);
router.post('/remove-collective/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    collectiveController.disableCollective
);
router.get('/edit-collective-health/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    collectiveController.putHealthCollective
);
router.get('/edit-collective-vehicle/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    collectiveController.putVehicleCollective
);
router.get('/edit-collective-risk-diverse/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    collectiveController.putRiskDiverseCollective
);
router.post('/update-collective-health', requireAuth, collectiveController.updateHealthCollective);
router.post('/update-collective-vehicle', requireAuth, collectiveController.updateVehicleCollective);
router.post('/update-collective-risk-diverse', requireAuth, collectiveController.updateRiskDiverseCollective);
router.get('/collectives-detail/:id', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO SINIESTROS',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO'
    ]),
    collectiveController.getCollectivesDetail
);
// Rutas de Reclamos
router.get('/add-refund', 
    requireAuth,
    requireRole([
        'EJECUTIVO SINIESTROS',
        'COORDINADOR SINIESTRO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.getRefundForm
);
router.post('/add-refund', requireAuth, claimController.postRefundForm);
router.get('/refunds', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO SINIESTROS',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.getRefunds
);
router.post('/remove-refund/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SINIESTRO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.disableRefund
);
router.get('/edit-refund/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SINIESTRO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.putRefund
);
router.post('/update-refund', requireAuth, claimController.updateRefund);
router.get('/add-letter-guarantee', 
    requireAuth,
    requireRole([
        'EJECUTIVO SINIESTROS',
        'COORDINADOR SINIESTRO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.getLetterGuaranteeForm
);
router.post('/add-letter-guarantee', requireAuth, claimController.postLetterGuaranteeForm);
router.get('/letters-guarentee', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO SINIESTROS',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.getLettersGuarantee
);
router.post('/remove-letter-guarantee/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SINIESTRO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.disableLetterGuarentee
);
router.get('/edit-letter-guarantee/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SINIESTRO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.putLetterGuarentee
);
router.post('/update-letter-guarantee', requireAuth, claimController.updateLetterGuarentee);
router.get('/add-emergency', 
    requireAuth,
    requireRole([
        'EJECUTIVO SINIESTROS',
        'COORDINADOR SINIESTRO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.getEmergencyForm
);
router.post('/add-emergency', requireAuth, claimController.postEmergencyForm);
router.get('/emergencies', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO SINIESTROS',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.getEmergencies
);
router.post('/remove-emergency/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SINIESTRO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.disableEmergency
);
router.get('/edit-emergency/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SINIESTRO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.putEmergency
);
router.post('/update-emergency', requireAuth, claimController.updateEmergency);
router.get('/add-amp', 
    requireAuth,
    requireRole([
        'EJECUTIVO SINIESTROS',
        'COORDINADOR SINIESTRO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.getAMPForm
);
router.post('/add-amp', requireAuth, claimController.postAMPForm);
router.get('/amp', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO SINIESTROS',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.getAMP
);
router.post('/remove-amp/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SINIESTRO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.disableAMP
);
router.get('/edit-amp/:id', 
    requireAuth,
    requireRole([
        'COORDINADOR SINIESTRO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    claimController.putAMP
);
router.post('/update-amp', requireAuth, claimController.updateAMP);
// Rutas de Reportes
router.get('/premiums-collected', 
    requireAuth,
    requireRole([
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    reportController.getPremiumsCollected
);
router.post('/premiums-collected', requireAuth, reportController.postPremiumsCollected);
router.get('/premiums-pending', 
    requireAuth,
    requireRole([
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    reportController.getPremiumsPending
);
router.post('/premiums-pending', requireAuth, reportController.postPremiumsPending);
router.get('/commission-transits', 
    requireAuth,
    requireRole([
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    reportController.getCommissionTransit
);
router.post('/commission-transits', requireAuth, reportController.postCommissionTransit);
router.get('/commission-distribution', 
    requireAuth,
    requireRole([
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    reportController.getCommissionDistribution
);
router.post('/commission-distribution', requireAuth, reportController.postCommissionDistribution);
router.get('/commission-paid',
    requireAuth,
    requireRole([
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    reportController.getCommissionPaid
);
router.post('/commission-paid', requireAuth, reportController.postCommissionPaid);
router.get('/accident-rate', 
    requireAuth,
    requireRole([
        'COORDINADOR SINIESTRO',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    reportController.getAccidentRate
);
router.post('/accident-rate', requireAuth, reportController.postAccidentRate);
router.get('/portfolio-composition', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    reportController.getPortfolioComposition
);
router.post('/portfolio-composition', requireAuth, reportController.postPortfolioComposition);
router.get('/persistence', 
    requireAuth,
    requireRole([
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    reportController.getPersistence
);
router.post('/persistence', requireAuth, reportController.postPersistence);
// Rutas de Beneficiarios
router.post('/remove-beneficiary/:id', requireAuth, beneficiaryController.disableBeneficiary);
router.get('/edit-beneficiary/:id', requireAuth, beneficiaryController.putBeneficiary);
router.post('/update-beneficiary', requireAuth, beneficiaryController.updateBeneficiary);
router.post('/remove-policy-beneficiary/:id', requireAuth, beneficiaryController.disablePolicyBeneficiary);
router.get('/edit-policy-beneficiary/:id', requireAuth, beneficiaryController.putPolicyBeneficiary);
router.post('/update-policy-beneficiary', requireAuth, beneficiaryController.updatePolicyBeneficiary);
router.post('/remove-health-beneficiary/:id', requireAuth, beneficiaryController.disableHealthBeneficiary);
router.post('/remove-funeral-beneficiary/:id', requireAuth, beneficiaryController.disableFuneralBeneficiary);
router.post('/remove-life-beneficiary/:id', requireAuth, beneficiaryController.disableLifeBeneficiary);
// Rutas de Vehiculos
router.post('/remove-vehicle/:id', requireAuth, vehicleController.disableVehicle);
router.get('/edit-vehicle/:id', requireAuth, vehicleController.putVehicle);
router.post('/update-vehicle', requireAuth, vehicleController.updateVehicle);
// Rutas de Riesgos Diversos
router.post('/remove-risk-diverse/:id', requireAuth, riskDiverseController.disableRiskDiverse);
router.get('/edit-risk-diverse/:id', requireAuth, riskDiverseController.putRiskDiverse);
router.post('/update-risk-diverse', requireAuth, riskDiverseController.updateRiskDiverse);
// Rutas de Recibos
router.get('/receipts', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    receiptController.getReceipts
);
router.post('/remove-receipt/:id', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    receiptController.disableReceipt
);
// Rutas de Fraccionamiento
router.get('/subdivisions/:id', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    divisionController.putSubdivisions
);
router.post('/remove-division/:id', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    divisionController.disableDivision
);
router.get('/division/:id', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'EJECUTIVO COBRANZAS',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    divisionController.putDivisionAdminForm
);
router.post('/add-division-receipt-admin', requireAuth, divisionController.updateDivisionAdminForm);
// Rutas de Distribución
router.post('/add-distribucion-division', 
    requireAuth,
    requireRole([
        'EJECUTIVO COBRANZAS',
        'COORDINADOR ADMINISTRACIÓN',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    distributionController.postDistributionForm
);
// Rutas de Renovaciones
router.get('/consult-renewal', 
    requireAuth,
    requireRole([
        'EJECUTIVO SUSCRIPCIÓN',
        'COORDINADOR SUSCRIPCIÓN INDIVIDUAL',
        'COORDINADOR SUSCRIPCIÓN COLECTIVO',
        'GERENTE TÉCNICO',
        'ADMINISTRADOR DIRECTOR'
    ]),
    renewalController.getRenewalConsultation
);
router.post('/consult-renewal', requireAuth, renewalController.postRenewalConsultation);
// Rutas de Correos
router.post('/email-receipt-policy-vehicle', requireAuth, emailController.postEmailReceiptPolicyVehicle);
router.post('/email-receipt-policy-health', requireAuth, emailController.postEmailReceiptPolicyHealth);
router.post('/email-receipt-patrimonial', requireAuth, emailController.postEmailReceiptPolicyPatrimonial);
router.post('/email-receipt-bail', requireAuth, emailController.postEmailReceiptPolicyBail);
router.post('/email-receipt-another-branch', requireAuth, emailController.postEmailReceiptPolicyAnotherBranch);
router.post('/email-receipt-funeral', requireAuth, emailController.postEmailReceiptPolicyFuneral);
router.post('/email-receipt-life', requireAuth, emailController.postEmailReceiptPolicyLife);
router.post('/email-receipt-ap', requireAuth, emailController.postEmailReceiptPolicyAp);
router.post('/email-receipt-travel', requireAuth, emailController.postEmailReceiptPolicyTravel);
router.post('/email-receipt-collective-health', requireAuth, emailController.postEmailReceiptCollectiveHealth);
router.post('/email-receipt-collective-vehicle', requireAuth, emailController.postEmailReceiptCollectiveVehicle);
router.post('/email-receipt-risk-diverse', requireAuth, emailController.postEmailReceiptCollectiveRiskDiverse);
router.post('/email-receipt-division', requireAuth, emailController.postEmailReceiptDivision);
// Pagina error 404
router.get('*', indexController.get404);

module.exports = router;