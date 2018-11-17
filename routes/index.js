const express = require('express');
const userRoutes = require('./user');
const publicationRoutes = require('./publication');
const languageRoutes = require('./language');

const app = express.Router();

app.use(userRoutes);
app.use(publicationRoutes);
app.use(languageRoutes);

module.exports = app;
