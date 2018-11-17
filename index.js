const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

/*RUTAS*/
const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);

mongoose.connect('mongodb://localhost/relationships', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error en conexión'));
db.once('open', () => {
  console.log('Conexión correcta');
  app.listen(3000, () => {
    console.log(`Servidor corriendo 🚀 en el puerto ${process.env.PORT}!`);
  });
});
