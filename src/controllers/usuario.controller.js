const usuarioCtrl = {}

const Usuario = require('../models/usuario.model')
const Funcion = require('../helpers/funciones.helpers')

usuarioCtrl.register = async(req,res) =>{
    try{
        const { nombre, apellido, email, pass, phoneNumber, nombreUsuario, region } = req.body;

        // Validamos nuestro usuario
        if (!(email && pass && nombre && apellido && nombreUsuario)) {
          res.status(400).send("Debe rellenar todos los campos");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const usuarioExistente = await User.findOne({ email });
    
        if (usuarioExistente) {
          return res.status(409).send("Correo electrónico existente");
        }

        const usernameExistente = await User.findOne({ nombreUsuario });
    
        if (usernameExistente) {
          return res.status(409).send("Nombre de usuario existente");
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(pass, 10);
        
        // Create user in our database
        const user = await Usuario.create({
          nombre: Funcion.capitalizar(nombre),
          apellido: Funcion.capitalizar(apellido),
          nombreUsuario,
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