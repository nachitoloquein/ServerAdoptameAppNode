const { Router } = require('express');
const router = Router();

const mascotasCtrl = require('../controllers/mascota.controller.js');
const upload = require('../libs/multer.js');

router.get('/', mascotasCtrl.getMascotas);
router.post('/', upload.single('foto'),mascotasCtrl.createMascotas);
router.get('/:id', mascotasCtrl.getMascota);
router.put('/:id', mascotasCtrl.editMascotas);
router.delete('/:id', mascotasCtrl.deleteMascotas);
module.exports = router