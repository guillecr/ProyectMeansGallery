var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var multer = require('multer');


var indexRouter = require('./routes/index');
var galleryRouter = require('./routes/gallery');


/**
 * /START MONGOOSE/
 * En esta lineas establecemos una conexión a nuestro servidor mongo. 
 * Primero ejecutamos una función anonima. En la primera linea importamos una libreria de 
 * para promesas (bluebird) necesario para la porgramación reactiva.
 * Al final de esta función anonima, usamos un then() que recoge que si esta función devuelve un true que con una 
 * función landa nos imprima que la conexión ha sido exitosa. 
 * Con catch() recogemos los errores y con una función landa imprimimos por consola el error
 */
var db = require('./database/mongo');
mongoose.connect(db.db, {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
// /END MONGOSE/


// [START] EXPRESS
 var app = express(); // Constructor del servidor Express

// Configuramos Express
app.use(cors()); // Permite peticiones cruzadas
app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Establecemos los Enrutamientos
app.use('/', indexRouter);
app.use('/gallery', galleryRouter);
// [END] EXPRESS

module.exports = app;
