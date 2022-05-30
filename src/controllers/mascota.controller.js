const mascotasCtrl = {}

const Mascota = require('../models/mascota.model');

mascotasCtrl.getMascotas = async (req,res)=> {
    const mascotas = await Mascota.find().populate('tipoAnimal', 'descripcion').populate('raza','descripcion');
    res.json(mascotas);
};

mascotasCtrl.createMascotas = async (req, res)=> {
    try{
    const newMascota = new Mascota(req.body);
    await newMascota.save();

    res.send({message: 'Mascota creada'})
    }catch(err){
    res.send({message: err})
    }
};

mascotasCtrl.getMascota = async (req, res)=> {
    try{
    const mascota = await Mascota.findById(req.params.id);
    res.send(mascota);
    }catch(err){
        res.sendStatus(404);
    }
};

mascotasCtrl.editMascotas = async (req, res)=> {
    try{
    await Mascota.findByIdAndUpdate(req.params.id, req.body);
    res.json({status: 'Mascota actualizada'})
    }catch(err){
        res.send({message: err});
    }
};

mascotasCtrl.deleteMascotas = async (req, res)=> {
    try{
    await Mascota.findByIdAndDelete(req.params.id);
    res.json({status: 'Mascota eliminada'});
    }catch(err){
        res.send({message: err})
    }
};


module.exports= mascotasCtrl;