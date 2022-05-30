const tipoAnimalCtrl = {}

const TipoAnimal = require('../models/tipoAnimal.model');

//Get
tipoAnimalCtrl.getTipoAnimal = async (req, res)=> {
    const tipoAnimales = await TipoAnimal.find();
    res.json(tipoAnimales);
};
//Create
tipoAnimalCtrl.createTipoAnimal = async (req, res)=> {
    try{
    const newTipoAnimal = new TipoAnimal(req.body);
    await newTipoAnimal.save();

    res.send({message: 'Tipo Animal creada'})
    }catch(err){
        res.send({message: err});
    }

};
//GetByID
tipoAnimalCtrl.getTipoAnimalByID = async (req, res)=> {
    try{
    const TipoAnimal = await TipoAnimal.findById(req.params.id);
    res.send(TipoAnimal);
    }catch(err){
        res.sendStatus(404);
    }
};
//Update
tipoAnimalCtrl.editTipoAnimal = async (req, res)=> {
    try{
    await TipoAnimal.findByIdAndUpdate(req.params.id, req.body);
    res.json({status: 'Tipo Animal actualizada'})
    }catch(err){
        res.send({message:err})
    }
};
//Delete
tipoAnimalCtrl.deleteTipoAnimal = async (req, res)=> {
    try{
    await TipoAnimal.findByIdAndDelete(req.params.id);
    res.json({status: 'Tipo Animal eliminada'});
    }catch(err){
        res.send({message: err});
    }
};


module.exports= tipoAnimalCtrl;