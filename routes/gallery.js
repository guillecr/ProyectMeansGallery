var express = require('express');
var router = express.Router();
var multer = require('multer');
var Gallery = require('../models/Gallery');

// preparamos los parametros para la construcción de la clase Multer
// NOTA: cd es como la respuesta al analisis de los parametros
var storage = multer.diskStorage({
  // Indicamos donde será guardado. Es fija, por lo que directamente indicamos que cd es la carpeta images
  destination: (req, file, cb) => {
    cb(null, './public/images'); // Indicamos el destino
  },
  /**
   * El nombre del archivo analizamos previamente el archivo para indicar que tipo de archivo es para 
   * despues en la respuesta (cd) incluirlo despues.  
   */ 
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
    if(file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if(file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});

/* 
* Montamos la clase multer con los parameros indicados. En nuestro caso es el mismo nombre porque el nombre de 
* la variable y el tipo de la variable es la misma
*/
var upload = multer({storage: storage});

/**
 * Procedimiento principal de guardar una imagen. 
 * Primero por el enrutamiento indicamos como accedemos a ella, procedemos del enrutamiento /gallery e indicamos que acedemos a ella si no se indica
 * nada mas ('/'). Ademas de indicar el tipo de petición (POST).
 * Despues indicamos el procedimiento que se va a realizar. En este caso es guardar un archivo por medio de la función .single(). Esta funcion procede del
 * objeto multer, el cual hemos indicado los parametros de guardado con el .diskStorage(). Dentro de la función .single indicamos que es lo que vamos a guardar.
 * Seguido de ella ejecutamos una función que sera a consecuencia del procedimiento realizado antes.
 * En ella tendremos el req (recibido), el res (respuesta) y el next que sera la función siguiente a ejecutar 
 */
router.post('/', upload.single('file'), function(req, res, next) {
  if(!req.file) { // Si no recibimos el 'file' en la respuesta (req) indica que no gemos recibido ningun archivo
      return res.status(500).send({ message: 'Upload fail'});
  } else {
      req.body.imageUrl = 'http://localhost:3000/images/' + req.file.filename; //Dirección de la imagen a guardar en la base de datos
      /**
       * Función para grabar en la base de datos un documento. Despues de ella ejecutaremos una función donde el primer parametro sera una respuesta de
       * error (err) y el segundo es la información guardada
       */
      Gallery.create(req.body, function (err, gallery) {
          if (err) {
              console.log(err);
              return next(err);
          }
          res.json(gallery);
      });
  }
});


/**
 * Si la petición es por un method GET y ademas se incica un parametro (:id) entraremos en esta función. El parametro lo guardaremos como id
 * que estará dentro de .params de nuestra variable recibida (req). 
 * Ejecutaremos la función .findById() de Mongoose para obtener la respuesta
 */
router.get('/:id', function(req, res, next) {
  Gallery.findById(req.params.id, function (err, gallery) {
      if (err) return next(err);
      res.json(gallery);
  });
});

/**
 * Me devuelve todos los documentos en una lista
 */
router.get('/', function(req,res,next) {
  Gallery.find(function(err,gallery){
    if(err) return next(err);
    res.json(gallery);
  })
})

module.exports = router;