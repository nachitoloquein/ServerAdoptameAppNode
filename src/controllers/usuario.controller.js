const usuarioCtrl = {}

const Usuario = require('../models/usuario.model');
const capitalizar = require('../helpers/funciones.helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

usuarioCtrl.register = async(req,res) =>{
    try{
        const { nombre, apellido, email, pass, phoneNumber, region } = req.body;

        // Validamos nuestro usuario
        if (!(email && pass && nombre && apellido)) {
          res.status(400).send("Debe rellenar todos los campos");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const usuarioExistente = await Usuario.findOne({ email });
    
        if (usuarioExistente) {
          return res.status(409).send("Correo electrónico existente");
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(pass, 10);
        
        // Create user in our database
        const user = await Usuario.create({
          nombre: capitalizar.capitalizar(nombre),
          apellido: capitalizar.capitalizar(apellido),
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          pass: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
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
      res.status(400).send("Debe llenar todos los campos");
    }
    // Validamos si el usuario existe dentro de la bdd
    const user = await Usuario.findOne({ email });

    if (user && (await bcrypt.compare(pass, user.pass))) {
      // Creamos el token de sesión
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // salvamos el token del usuario
      user.token = token;

      // usuario
      res.status(200).json(user);
    }
    res.status(400).send("Credenciales inválidas");
  } catch (err) {
    console.log(err);
  }
}


module.exports = usuarioCtrl;