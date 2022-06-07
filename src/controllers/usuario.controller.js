const usuarioCtrl = {}

const Usuario = require('../models/usuario.model');
const funciones = require('../helpers/funciones.helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

usuarioCtrl.register = async(req,res) =>{
    try{
        const { nombre, apellido, email, pass, phoneNumber, region } = req.body;

        // Validamos los campos
        if (!(email && pass && nombre && apellido)) {
          return res.status(400).send("Debe rellenar todos los campos");
        }
    
        // Verificamos si ya existe el correo
        const usuarioExistente = await Usuario.findOne({ email });
    
        if (usuarioExistente) {
          return res.status(409).send("Correo electrónico existente");
        }
    
        //Encriptamos nuestra contraseña
        encryptedPassword = await bcrypt.hash(pass, 10);
        
        // Lo creamos
        const user = await Usuario.create({
          nombre: funciones.capitalizar(nombre), //acá simplemente vamos a capitalizar estos dos valores
          apellido: funciones.capitalizar(apellido),
          email: email.toLowerCase(), // sanitizamos las letras del correo 
          pass: encryptedPassword,
        });
        await user.save(); //lo guardamos
    
        // Creamos el token, por defecto le pasamos un test si no encuentra el de la variable de entorno
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY || 'test',
          {
            expiresIn: "2h",
          }
        );
        // lo guardamos
        user.token = token;
    
        // retornamos estado correcto 200
        res.status(201).json(user);

    }
    catch(err){
        console.log(err)
    }
}

usuarioCtrl.login = async(req,res) =>{
  try {
    // Obtenemos los parámetros del login
    const { email, pass } = req.body;

    // Validamos que obtenga todos los campos
    if (!(email || pass)) {
      return res.status(400).send("Debe llenar todos los campos");
    }
    // Validamos si el usuario existe dentro de la bdd
    const user = await Usuario.findOne({ email });

    if(!user) return res.status(401).send('Error, correo electrónico no existente');
    //if(user.pass !== pass) return res.status(401).send('Contraseña equivocada');

    if (user && (await bcrypt.compare(pass, user.pass))) {
      // Creamos el token de sesión
      const token = jwt.sign(
        { _id: user._id},
        process.env.TOKEN_KEY || 'test',
        {
          expiresIn: "2h",
        }
      );

      // salvamos el token del usuario
      user.token = token;

      // enviamos el mensaje correcto
      return res.status(200).send('Logeado');
    }
    else{
    return res.status(400).send("Contraseña incorrecta");
    }
  } catch (err) {
    console.log(err);
  }
}


module.exports = usuarioCtrl;