const express = require('express');
const router = express.Router();
// Controllers
const loginController = require('../controllers/loginController');
const indexController = require('../controllers/indexController');
// Middlewares
const requireAuth = require('../middlewares/authMiddleware');

// Ruta index
router.get('/', requireAuth, indexController.getIndex);
// Rutas login
router.get('/login', loginController.getLogin);
router.post('/auth', loginController.postLogin);
router.get('/forgot/password', loginController.getForgotPassword);
router.get('/logout', loginController.getLogout)

module.exports = router;