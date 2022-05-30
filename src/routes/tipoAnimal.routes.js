const { Router } = require('express');
const router = Router();

const tipoAnimalCtrl = require('../controllers/tipoAnimal.controller.js');

router.get('/', tipoAnimalCtrl.getTipoAnimal);
router.post('/', tipoAnimalCtrl.createTipoAnimal);
router.get('/:id', tipoAnimalCtrl.getTipoAnimalByID);
router.put('/:id', tipoAnimalCtrl.editTipoAnimal);
router.delete('/:id', tipoAnimalCtrl.deleteTipoAnimal);

module.exports = router;