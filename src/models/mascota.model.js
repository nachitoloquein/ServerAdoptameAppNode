//Declarar las importaciones
const { Schema , model } = require('mongoose');
//Genero el modelo
const mascotaSchema = new Schema({
    nombre: {type: String, required: true},
    tipoAnimal:  {type: Schema.Types.ObjectId, ref: 'TipoAnimal', required: true},
    raza: {type: Schema.Types.ObjectId, ref: 'Raza', required: false}
},{
    versionKey: false
})
//Exporto el modelo completo

module.exports = model('Mascota', mascotaSchema);