const express = require('express');
const Language = require('../models/language');

const app = express.Router();

app.get('/languages', async (req, res) => {
  try {
    const languages = await Language.find();
    res.status(200).send({ languages });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.post('/languages', async (req, res) => {
  try {
    const { body } = req;
    const newLanguage = new Language();
    newLanguage.name = body. name;
    const language = await newLanguage.save();
    res.status(201).send({ language });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.get('/languages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const language = await Language.findById(id).populate('users', '-_id name');
    if (!language) {
      res.status(404).json({ message: 'No se encontro lenguaje' });
      return;
    }

    res.status(200).json({ language });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = app;
