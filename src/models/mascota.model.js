//Declarar las importaciones
const { Schema , model } = require('mongoose');
//Genero el modelo
const mascotaSchema = new Schema({
    nombre: {type: String, required: true},
    raza: {type: String, required: true},
    fotoURL: {type: String, required:false},
    sexo: {type: String, required: true }
    //creador: {type: Schema.Types.ObjectId, ref: 'Usuario'}
},{
    versionKey: false
})
//Exporto el modelo completo

module.exports = model('Mascota', mascotaSchema);