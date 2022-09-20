const express = require('express');
const { json } = require('express/lib/response');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 4000)

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//Establecemos el subdominio de los WebService
app.use("/api/mascotas",require('./routes/mascotas.routes'));
app.use("/api/usuario", require('./routes/usuario.routes'));
app.use('/public/img', express.static('public/img'));

//Exportamos el archivo
module.exports = app;