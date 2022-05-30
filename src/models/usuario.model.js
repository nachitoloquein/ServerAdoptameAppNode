const { Schema, model} = require('mongoose');

const usuarioSchema = new Schema ({
    nombre: {type:String, required:true, default:null},
    apellido: {type: String, required:true, default:null},
    email: {type: String, required: true, unique:true},
    pass: {type: String, required:true},
    phoneNumber: {type: Number, required: false, maxlength:8},
    nombreUsuario: {type: String, required: true, unique: true, minlength: 5},
    region: {type: String, required: false},
    token: {type: String}
},{
    versionKey: false,
    timestamps: true
})

module.exports = model('Usuario', usuarioSchema);