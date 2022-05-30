const { Router } = require('express');
const router = Router();

const razaCtrl = require('../controllers/raza.controller.js');

router.get('/', razaCtrl.getRaza);
router.post('/', razaCtrl.createRaza);
router.get('/:id', razaCtrl.getRazaByID);
router.put('/:id', razaCtrl.editRaza);
router.delete('/:id', razaCtrl.deleteRaza);

module.exports = router;