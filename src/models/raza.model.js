const { Schema , model} = require('mongoose');

const razaSchema = new Schema({
    descripcion: {type: String, required: true}
},{
    versionKey: false
})

module.exports = model('Raza', razaSchema);