const { Schema , model} = require('mongoose');

const tipoAnimalSchema = new Schema({
    descripcion: {type: String, required: true}
},{
    versionKey: false
})

module.exports = model('TipoAnimal', tipoAnimalSchema);