const razaCtrl = {}

const { sendStatus } = require('express/lib/response');
const Raza = require('../models/raza.model');

//Get
razaCtrl.getRaza = async (req, res)=> {
    const razas = await Raza.find();
    res.json(razas);
};
//Create
razaCtrl.createRaza = async (req, res)=> {
    try{
    const newRaza = new Raza(req.body);
    await newRaza.save();

    res.send({message: 'Raza creada'})
    }
    catch(err){
        res.send({message: err})
    }
};
//GetByID
razaCtrl.getRazaByID = async (req, res)=> {
    try{
    const Raza = await Raza.findById(req.params.id);
    res.send(Raza);
    }catch(err){
        res.sendStatus(404)
    }
};
//Update
razaCtrl.editRaza = async (req, res)=> {
    try{
    await Raza.findByIdAndUpdate(req.params.id, req.body);
    res.json({status: 'Raza actualizada'})
    }catch(err){
        res.send({message: err})
    }
};
//Delete
razaCtrl.deleteRaza = async (req, res)=> {
    try{
    await Raza.findByIdAndDelete(req.params.id);
    res.json({status: 'Raza eliminada'});
    }catch(err){
        res.send({message: err})
    }
};


module.exports= razaCtrl;