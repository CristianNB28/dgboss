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
const collectiveController = require('../controllers/collectiveController');
const riskDiverseController = require('../controllers/riskDiverseController');
const verificationFactorController = require('../controllers/verificationFactorController');
// Middlewares
const requireAuth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerMiddleware');

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
router.get('/list-vehicle-policy', requireAuth, policyController.getVehiclePolicyList);
router.get('/add-subscription-vehicle-policy', requireAuth, policyController.getSubcriptionVehiclePolicyForm);
router.get('/list-subscription-vehicle-policy', requireAuth, policyController.getSubcriptionVehiclePolicyList);
router.post('/add-vehicle-policy', requireAuth, policyController.postVehiclePolicyForm);
router.post('/add-vehicle', requireAuth, vehicleController.postVehicleForm);
router.post('/add-vehicle-receipt', requireAuth, receiptController.postVehicleReceiptForm);
router.post('/add-vehicle-commission', requireAuth, commissionController.postVehicleCommissionForm);
router.post('/add-vehicle-verification-factor', requireAuth, verificationFactorController.postVehicleVerificationFactorForm);
router.get('/add-health-policy', requireAuth, policyController.getHealthPolicyForm);
router.get('/list-health-policy', requireAuth, policyController.getHealthPolicyList);
router.get('/add-subscription-health-policy', requireAuth, policyController.getSubcriptionHealthPolicyForm);
router.get('/list-subscription-health-policy', requireAuth, policyController.getSubcriptionHealthPolicyList);
router.post('/add-health-policy', requireAuth, policyController.postHealthPolicyForm);
router.post('/add-health-beneficiary', requireAuth, beneficiaryController.postHealthBeneficiaryForm);
router.post('/add-health-receipt', requireAuth, receiptController.postHealthReceiptForm);
router.post('/add-health-commission', requireAuth, commissionController.postHealthCommissionForm);
router.post('/add-health-verification-factor', requireAuth, verificationFactorController.postHealthVerificationFactorForm);
router.get('/add-patrimonial-policy', requireAuth, policyController.getPatrimonialPolicyForm);
router.get('/list-patrimonial-policy', requireAuth, policyController.getPatrimonialPolicyList);
router.get('/add-subscription-patrimonial-policy', requireAuth, policyController.getSubcriptionPatrimonialPolicyForm);
router.get('/list-subscription-patrimonial-policy', requireAuth, policyController.getSubcriptionPatrimonialPolicyList);
router.post('/add-patrimonial-policy', requireAuth, policyController.postPatrimonialPolicyForm);
router.post('/add-patrimonial-receipt', requireAuth, receiptController.postPatrimonialReceiptForm);
router.post('/add-patrimonial-commission', requireAuth, commissionController.postPatrimonialCommissionForm);
router.post('/add-patrimonial-verification-factor', requireAuth, verificationFactorController.postPatrimonialVerificationFactorForm);
router.get('/add-bail-policy', requireAuth, policyController.getBailPolicyForm);
router.get('/list-bail-policy', requireAuth, policyController.getBailPolicyList);
router.get('/add-subscription-bail-policy', requireAuth, policyController.getSubcriptionBailPolicyForm);
router.get('/list-subscription-bail-policy', requireAuth, policyController.getSubcriptionBailPolicyList);
router.post('/add-bail-policy', requireAuth, policyController.postBailPolicyForm);
router.post('/add-bail-receipt', requireAuth, receiptController.postBailReceiptForm);
router.post('/add-bail-commission', requireAuth, commissionController.postBailCommissionForm);
router.post('/add-bail-verification-factor', requireAuth, verificationFactorController.postBailVerificationFactorForm);
router.get('/add-another-branch-policy', requireAuth, policyController.getAnotherBranchPolicyForm);
router.get('/list-another-branch-policy', requireAuth, policyController.getAnotherBranchPolicyList);
router.get('/add-subscription-another-branch-policy', requireAuth, policyController.getSubcriptionAnotherBranchPolicyForm);
router.get('/list-subscription-another-branch-policy', requireAuth, policyController.getSubcriptionAnotherBranchPolicyList);
router.post('/add-another-branch-policy', requireAuth, policyController.postAnotherBranchPolicyForm);
router.post('/add-another-branch-receipt', requireAuth, receiptController.postAnotherBranchReceiptForm);
router.post('/add-another-branch-commission', requireAuth, commissionController.postAnotherBranchCommissionForm);
router.post('/add-another-branch-verification-factor', requireAuth, verificationFactorController.postAnotherBranchVerificationFactorForm);
router.get('/add-funeral-policy', requireAuth, policyController.getFuneralPolicyForm);
router.get('/list-funeral-policy', requireAuth, policyController.getFuneralPolicyList);
router.get('/add-subscription-funeral-policy', requireAuth, policyController.getSubcriptionFuneralPolicyForm);
router.get('/list-subscription-funeral-policy', requireAuth, policyController.getSubcriptionFuneralPolicyList);
router.post('/add-funeral-policy', requireAuth, policyController.postFuneralPolicyForm);
router.post('/add-funeral-beneficiary', requireAuth, beneficiaryController.postFuneralBeneficiaryForm);
router.post('/add-funeral-receipt', requireAuth, receiptController.postFuneralReceiptForm);
router.post('/add-funeral-commission', requireAuth, commissionController.postFuneralCommissionForm);
router.post('/add-funeral-verification-factor', requireAuth, verificationFactorController.postFuneralVerificationFactorForm);
router.get('/add-life-policy', requireAuth, policyController.getLifePolicyForm);
router.get('/list-life-policy', requireAuth, policyController.getLifePolicyList);
router.get('/add-subscription-life-policy', requireAuth, policyController.getSubcriptionLifePolicyForm);
router.get('/list-subscription-life-policy', requireAuth, policyController.getSubcriptionLifePolicyList);
router.post('/add-life-policy', requireAuth, policyController.postLifePolicyForm);
router.post('/add-life-beneficiary', requireAuth, beneficiaryController.postLifeBeneficiaryForm);
router.post('/add-life-receipt', requireAuth, receiptController.postLifeReceiptForm);
router.post('/add-life-commission', requireAuth, commissionController.postLifeCommissionForm);
router.post('/add-life-verification-factor', requireAuth, verificationFactorController.postLifeVerificationFactorForm);
router.get('/add-ap-policy', requireAuth, policyController.getAPPolicyForm);
router.get('/list-ap-policy', requireAuth, policyController.getAPPolicyList);
router.get('/add-subscription-ap-policy', requireAuth, policyController.getSubcriptionAPPolicyForm);
router.get('/list-subscription-ap-policy', requireAuth, policyController.getSubcriptionAPPolicyList);
router.post('/add-ap-policy', requireAuth, policyController.postAPPolicyForm);
router.post('/add-ap-receipt', requireAuth, receiptController.postAPReceiptForm);
router.post('/add-ap-commission', requireAuth, commissionController.postAPCommissionForm);
router.post('/add-ap-verification-factor', requireAuth, verificationFactorController.postAPVerificationFactorForm);
router.get('/add-travel-policy', requireAuth, policyController.getTravelPolicyForm);
router.get('/list-travel-policy', requireAuth, policyController.getTravelPolicyList);
router.get('/add-subscription-travel-policy', requireAuth, policyController.getSubcriptionTravelPolicyForm);
router.get('/list-subscription-travel-policy', requireAuth, policyController.getSubcriptionTravelPolicyList);
router.post('/add-travel-policy', requireAuth, policyController.postTravelPolicyForm);
router.post('/add-travel-receipt', requireAuth, receiptController.postTravelReceiptForm);
router.post('/add-travel-commission', requireAuth, commissionController.postTravelCommissionForm);
router.post('/add-travel-verification-factor', requireAuth, verificationFactorController.postTravelVerificationFactorForm);
router.get('/policies', requireAuth, policyController.getPolicies);
router.post('/remove-policy/:id', requireAuth, policyController.disablePolicy);
router.get('/edit-policy-health/:id', requireAuth, policyController.putHealthPolicy);
router.get('/edit-policy-vehicle/:id', requireAuth, policyController.putVehiclePolicy);
router.get('/edit-policy-patrimonial/:id', requireAuth, policyController.putPatrimonialPolicy);
router.get('/edit-policy-bail/:id', requireAuth, policyController.putBailPolicy);
router.get('/edit-policy-another-branch/:id', requireAuth, policyController.putAnotherBranchPolicy);
router.get('/edit-policy-funeral/:id', requireAuth, policyController.putFuneralPolicy);
router.get('/edit-policy-life/:id', requireAuth, policyController.putLifePolicy);
router.get('/edit-policy-ap/:id', requireAuth, policyController.putAPPolicy);
router.get('/edit-policy-travel/:id', requireAuth, policyController.putTravelPolicy);
router.post('/update-policy-health', requireAuth, policyController.updateHealthPolicy);
router.post('/update-policy-vehicle', requireAuth, policyController.updateVehiclePolicy);
router.post('/update-policy-patrimonial', requireAuth, policyController.updatePatrimomialPolicy);
router.post('/update-policy-bail', requireAuth, policyController.updateBailPolicy);
router.post('/update-policy-another-branch', requireAuth, policyController.updateAnotherBranchPolicy);
router.post('/update-policy-funeral', requireAuth, policyController.updateFuneralPolicy);
router.post('/update-policy-life', requireAuth, policyController.updateLifePolicy);
router.post('/update-policy-ap', requireAuth, policyController.updateAPPolicy);
router.post('/update-policy-travel', requireAuth, policyController.updateTravelPolicy);
router.get('/policies-detail/:id', requireAuth, policyController.getPoliciesDetail);
// Rutas de Colectivos
router.get('/add-health-collective', requireAuth, collectiveController.getHealthCollectiveForm);
router.get('/list-health-collective', requireAuth, collectiveController.getHealthCollectiveList);
router.get('/add-subscription-health-collective', requireAuth, collectiveController.getSubscriptionHealthCollectiveForm);
router.get('/list-subscription-health-collective', requireAuth, collectiveController.getSubscriptionHealthCollectiveList);
router.post('/add-health-collective', requireAuth, collectiveController.postHealthCollectiveForm);
router.post('/add-health-beneficiary-collective', requireAuth, upload.single('excel'), beneficiaryController.postHealthBeneficiaryCollectiveForm);
router.post('/add-health-receipt-collective', requireAuth, receiptController.postHealthReceiptCollectiveForm);
router.post('/add-health-commission-collective', requireAuth, commissionController.postHealthCommissionCollectiveForm);
router.post('/add-health-verification-collective', requireAuth, verificationFactorController.postHealthVerificationFactorCollectiveForm);
router.get('/add-vehicle-collective', requireAuth, collectiveController.getVehicleCollectiveForm);
router.get('/list-vehicle-collective', requireAuth, collectiveController.getVehicleCollectiveList);
router.get('/add-subscription-vehicle-collective', requireAuth, collectiveController.getSubscriptionVehicleCollectiveForm);
router.get('/list-subscription-vehicle-collective', requireAuth, collectiveController.getSubscriptionVehicleCollectiveList);
router.post('/add-vehicle-collective', requireAuth, collectiveController.postVehicleCollectiveForm);
router.post('/add-transportation', requireAuth, upload.single('excelAuto'), vehicleController.postVehicleCollectiveForm);
router.post('/add-vehicle-receipt-collective', requireAuth, receiptController.postVehicleReceiptCollectiveForm);
router.post('/add-vehicle-commission-collective', requireAuth, commissionController.postVehicleCommissionCollectiveForm);
router.post('/add-vehicle-verification-collective', requireAuth, verificationFactorController.postVehicleVerificationFactorCollectiveForm);
router.get('/add-risk-diverse-collective', requireAuth, collectiveController.getRiskDiverseCollectiveForm);
router.get('/list-risk-diverse-collective', requireAuth, collectiveController.getRiskDiverseCollectiveList);
router.get('/add-subscription-risk-diverse-collective', requireAuth, collectiveController.getSubscriptionRiskDiverseCollectiveForm);
router.get('/list-subscription-risk-diverse-collective', requireAuth, collectiveController.getSubscriptionRiskDiverseCollectiveList);
router.post('/add-risk-diverse-collective', requireAuth, collectiveController.postRiskDiverseCollectiveForm);
router.post('/add-point-sale', requireAuth, upload.single('excelPuntoVenta'), riskDiverseController.postRiskDiverseForm);
router.post('/add-risk-receipt-collective', requireAuth, receiptController.postRiskDiverseReceiptCollectiveForm);
router.post('/add-risk-commission-collective', requireAuth, commissionController.postRiskDiverseCommissionCollectiveForm);
router.post('/add-risk-verification-collective', requireAuth, verificationFactorController.postRiskDiverseVerificationFactorCollectiveForm);
router.get('/collectives', requireAuth, collectiveController.getCollectives);
router.post('/remove-collective/:id', requireAuth, collectiveController.disableCollective);
router.get('/edit-collective-health/:id', requireAuth, collectiveController.putHealthCollective);
router.get('/edit-collective-vehicle/:id', requireAuth, collectiveController.putVehicleCollective);
router.get('/edit-collective-risk-diverse/:id', requireAuth, collectiveController.putRiskDiverseCollective);
router.post('/update-collective-health', requireAuth, collectiveController.updateHealthCollective);
router.post('/update-collective-vehicle', requireAuth, collectiveController.updateVehicleCollective);
router.post('/update-collective-risk-diverse', requireAuth, collectiveController.updateRiskDiverseCollective);
router.get('/collectives-detail/:id', requireAuth, collectiveController.getCollectivesDetail);
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
router.get('/pending-payments', requireAuth, reportController.getPendingPayments);
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
router.get('/add-receipt', requireAuth, receiptController.getReceiptForm);
router.post('/add-receipt', requireAuth, receiptController.postReceiptForm);
router.get('/receipts', requireAuth, receiptController.getReceipts);
router.post('/remove-receipt/:id', requireAuth, receiptController.disableReceipt);
router.get('/edit-receipt/:id', requireAuth, receiptController.putReceipt);
router.post('/update-receipt', requireAuth, receiptController.updateReceipt);
// Pagina error 404
router.get('*', indexController.get404);

module.exports = router;