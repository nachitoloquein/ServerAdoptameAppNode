const { Router } = require('express');
const router = Router();

const mascotasCtrl = require('../controllers/mascota.controller.js');

router.get('/', mascotasCtrl.getMascotas);
router.post('/', mascotasCtrl.createMascotas);
router.get('/:id', mascotasCtrl.getMascota);
router.put('/:id', mascotasCtrl.editMascotas);
router.delete('/:id', mascotasCtrl.deleteMascotas);
module.exports = router