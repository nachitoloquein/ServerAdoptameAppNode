const { Router } = require('express');
const router = Router();

const usuarioCtrl = require('../controllers/usuario.controller');

router.post('/register', usuarioCtrl.register);
router.post('/login', usuarioCtrl.login);

module.exports = router;