var createError = require('http-errors'); // Manejo de errores por defecto
var express = require('express'); // Arquitectura de la aplicación en backend
var path = require('path'); // Manejo de rutas
var cookieParser = require('cookie-parser'); // Manejo de cookies
var logger = require('morgan'); // Registro log de las acciones del servidor

var indexRouter = require('./routes/index'); // Carga del manejador de subrutas para la ruta raíz
var usersRouter = require('./routes/users'); // Carga del manejador de subrutas para la ruta users

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // Ruta a los archivos fisicos que contienen las vistas
app.set('view engine', 'ejs'); // Motor de renderizado de vistas - EJS

app.use(logger('dev')); // Instancia de logger para registrar las acciones del servidor
app.use(express.json()); // Este método se usa para analizar las solicitudes entrantes con cargas JSON y se basa en el analizador de cuerpo de mensajes HTTP.
app.use(express.urlencoded({ extended: false })); // Analiza las requests entrantes con cargas codificadas y se basa en body-parser. 
app.use(cookieParser()); // Manejo de cookies entre el cliente y el servidor 
app.use(express.static(path.join(__dirname, 'public'))); //  Registro de la ruta para archivos estáticos (imágenes, hojas de estilo, etc)

app.use('/', indexRouter); // Pareo entre la ruta raíz y el manejador de subrutas
app.use('/users', usersRouter); // Pareo entre la ruta users y el manejador de subrutas
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); // En caso de cualquier error, lanzar un error404 
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; //  Los errores se mostrarán en el MODO DE DESARROLLO 

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
