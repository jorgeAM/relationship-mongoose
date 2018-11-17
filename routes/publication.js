const express = require('express');
const Publication = require('../models/publication');

const app = express.Router();

app.get('/publications', async (req, res) => {
  try {
    const publications = await Publication.find();
    res.status(200).send({ publications });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.post('/publications', async (req, res) => {
  try {
    const { body } = req;
    const newPublication = new Publication();
    newPublication.title = body. title;
    newPublication.content = body. content;
    newPublication.author = body. author;
    const publication = await newPublication.save();
    res.status(201).send({ publication });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.get('/publications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const publication = await Publication.findById(id).populate('author');
    if (!publication) {
      res.status(404).json({ message: 'No se encontro publicación' });
      return;
    }

    res.status(200).send({ publication });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = app;
