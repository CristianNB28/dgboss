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
const commissionController = require('../controllers/commissionController');
const claimController = require('../controllers/claimController');
const reportController = require('../controllers/reportController');
const beneficiaryController = require('../controllers/beneficiaryController');
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
router.post('/add-vehicle-policy', requireAuth, policyController.postVehiclePolicyForm);
router.post('/add-vehicle', requireAuth, vehicleController.postVehicleForm);
router.post('/add-vehicle-receipt', requireAuth, receiptController.postVehicleReceiptForm);
router.post('/add-vehicle-commission', requireAuth, commissionController.postVehicleCommissionForm);
router.get('/add-health-policy', requireAuth, policyController.getHealthPolicyForm);
router.post('/add-health-policy', requireAuth, policyController.postHealthPolicyForm);
router.post('/add-health-beneficiary', requireAuth, beneficiaryController.postHealthBeneficiaryForm);
router.post('/add-health-receipt', requireAuth, receiptController.postHealthReceiptForm);
router.post('/add-health-commission', requireAuth, commissionController.postHealthCommissionForm);
router.get('/add-patrimonial-policy', requireAuth, policyController.getPatrimonialPolicyForm);
router.post('/add-patrimonial-policy', requireAuth, policyController.postPatrimonialPolicyForm);
router.post('/add-patrimonial-receipt', requireAuth, receiptController.postPatrimonialReceiptForm);
router.post('/add-patrimonial-commission', requireAuth, commissionController.postPatrimonialCommissionForm);
router.get('/add-bail-policy', requireAuth, policyController.getBailPolicyForm);
router.post('/add-bail-policy', requireAuth, policyController.postBailPolicyForm);
router.post('/add-bail-receipt', requireAuth, receiptController.postBailReceiptForm);
router.post('/add-bail-commission', requireAuth, commissionController.postBailCommissionForm);
router.get('/add-another-branch-policy', requireAuth, policyController.getAnotherBranchPolicyForm);
router.post('/add-another-branch-policy', requireAuth, policyController.postAnotherBranchPolicyForm);
router.post('/add-another-branch-receipt', requireAuth, receiptController.postAnotherBranchReceiptForm);
router.post('/add-another-branch-commission', requireAuth, commissionController.postAnotherBranchCommissionForm);
router.get('/add-funeral-policy', requireAuth, policyController.getFuneralPolicyForm);
router.post('/add-funeral-policy', requireAuth, policyController.postFuneralPolicyForm);
router.post('/add-funeral-beneficiary', requireAuth, beneficiaryController.postFuneralBeneficiaryForm);
router.post('/add-funeral-receipt', requireAuth, receiptController.postFuneralReceiptForm);
router.post('/add-funeral-commission', requireAuth, commissionController.postFuneralCommissionForm);
router.get('/add-life-policy', requireAuth, policyController.getLifePolicyForm);
router.post('/add-life-policy', requireAuth, policyController.postLifePolicyForm);
router.post('/add-life-beneficiary', requireAuth, beneficiaryController.postLifeBeneficiaryForm);
router.post('/add-life-receipt', requireAuth, receiptController.postLifeReceiptForm);
router.post('/add-life-commission', requireAuth, commissionController.postLifeCommissionForm);
router.get('/add-ap-policy', requireAuth, policyController.getAPPolicyForm);
router.post('/add-ap-policy', requireAuth, policyController.postAPPolicyForm);
router.post('/add-ap-receipt', requireAuth, receiptController.postAPReceiptForm);
router.post('/add-ap-commission', requireAuth, commissionController.postAPCommissionForm);
router.get('/add-travel-policy', requireAuth, policyController.getTravelPolicyForm);
router.post('/add-travel-policy', requireAuth, policyController.postTravelPolicyForm);
router.post('/add-travel-receipt', requireAuth, receiptController.postTravelReceiptForm);
router.post('/add-travel-commission', requireAuth, commissionController.postTravelCommissionForm);
router.get('/policies', requireAuth, policyController.getPolicies);
router.post('/remove-policy/:id', requireAuth, policyController.disablePolicy);
router.get('/edit-policy/:id', requireAuth, policyController.putPolicy);
router.post('/update-policy', requireAuth, policyController.updatePolicy);
// Rutas de Reclamos
router.get('/add-refund', requireAuth, claimController.getRefundForm);
router.post('/add-refund', requireAuth, claimController.postRefundForm);
router.get('/refunds', requireAuth, claimController.getRefunds);
router.post('/remove-refund/:id', requireAuth, claimController.disableRefund);
router.get('/edit-refund/:id', requireAuth, claimController.putRefund);
router.post('/update-refund', requireAuth, claimController.updateRefund);
router.get('/add-letter-guarantee', requireAuth, claimController.getLetterGuaranteeForm);
router.post('/add-letter-guarantee', requireAuth, claimController.postLetterGuaranteeForm);
router.get('/letters-guarentee', requireAuth, claimController.getLettersGuarantee);
router.post('/remove-letter-guarantee/:id', requireAuth, claimController.disableLetterGuarentee);
router.get('/edit-letter-guarantee/:id', requireAuth, claimController.putLetterGuarentee);
router.post('/update-letter-guarantee', requireAuth, claimController.updateLetterGuarentee);
router.get('/add-emergency', requireAuth, claimController.getEmergencyForm);
router.post('/add-emergency', requireAuth, claimController.postEmergencyForm);
router.get('/emergencies', requireAuth, claimController.getEmergencies);
router.post('/remove-emergency/:id', requireAuth, claimController.disableEmergency);
router.get('/edit-emergency/:id', requireAuth, claimController.putEmergency);
router.post('/update-emergency', requireAuth, claimController.updateEmergency);
router.get('/add-amp', requireAuth, claimController.getAMPForm);
router.post('/add-amp', requireAuth, claimController.postAMPForm);
router.get('/amp', requireAuth, claimController.getAMP);
router.post('/remove-amp/:id', requireAuth, claimController.disableAMP);
router.get('/edit-amp/:id', requireAuth, claimController.putAMP);
router.post('/update-amp', requireAuth, claimController.updateAMP);
// Rutas de Reportes
router.get('/premiums-collected', requireAuth, reportController.getPremiumsCollected);
router.get('/commissions-collected', requireAuth, reportController.getCommissionsCollected);
router.get('/policy-claims', requireAuth, reportController.getPolicyClaims);
router.get('/global-loss-ratio', requireAuth, reportController.getGlobalLossRatio);
// Pagina error 404
router.get('*', indexController.get404);

module.exports = router;