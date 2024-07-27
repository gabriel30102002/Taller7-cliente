var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/photos', async function(req, res, next) {
  const URL = 'http://localhost:4444/rest/fotos/findAll/json';
  const response = await axios.get(URL);
  res.render('fotos', { title: 'Fotos', fotos: response.data });
});

router.get('/photos/add', function(req, res, next) {
  res.render('fotos_adicion', { title: 'Agregar fotos' });
});


router.get('/photos/update', function(req, res, next) {
  res.render('fotos_actualizacion', { title: 'Actualizar fotos' });
});

router.post('/photos/save', async function(req, res, next) {
  let { title, description, rate } = req.body;
  const URL = 'http://localhost:4444/rest/fotos/save';
  let data = {
    titulo: title,
    descripcion: description,
    calificacion: rate,
    ruta: ''
  };
  try {
    const response = await axios.post(URL, data);
    if (response.status === 200 && response.statusText === 'OK') {
      res.redirect('/photos');
    } else {
      console.error('Failed to save photo:', response.status, response.statusText);
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error during saving photo:', error);
    res.redirect('/');
  }
});

router.get('/delete/:id', async function(req, res, next) {
  const photoId = req.params.id;
  const URL = `http://localhost:4444/rest/fotos/delete/${photoId}`;
  try {
    const response = await axios.delete(URL);
    if (response.status === 200 && response.statusText === 'OK') {
      res.redirect('/photos');
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.redirect('/');
  }
});

router.get('/photos/edit/:id', async function(req, res, next) {
  const photoId = req.params.id;
  const URL = `http://localhost:4444/rest/fotos/findById/${photoId}/json`;
  try {
    const response = await axios.get(URL);
    if (response.status === 200 && response.statusText === 'OK') {
      res.render('fotos_actualizacion', { title: 'Editar foto', foto: response.data });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error editing photo:', error);
    res.redirect('/');
  }
});

router.post('/photos/update/:id', async function(req, res, next) {
  const photoId = req.params.id;
  let { title, description, rate } = req.body;
  const URL = `http://localhost:4444/rest/fotos/update/${photoId}`;
  let data = {
    id: photoId, 
    titulo: title,
    descripcion: description,
    calificacion: rate,
    ruta: ''
  };
  try {
    const response = await axios.put(URL, data);
    if (response.status === 200 && response.statusText === 'OK') {
      res.redirect('/photos');
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error updating photo:', error);
    res.redirect('/');
  }
});

module.exports = router;
