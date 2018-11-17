const express = require('express');
const User = require('../models/user');
const Language = require('../models/language');

const app = express.Router();

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { body } = req;
    const newUser = new User();
    newUser.name = body. name;
    const user = await newUser.save();
    res.status(201).send({ user });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
              .populate('languages', '-_id name')
              .populate('publications', '-_id title content');
    if (!user) {
      res.status(404).json({ message: 'No se encontro usuario' });
      return;
    }

    res.status(200).send({ user });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.put('/users/:id/language', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await User.findById(id);
    const language = await Language.findById(body.language);
    console.log(user);
    console.log(language);
    if (!user) {
      res.status(404).json({ message: 'No se encontro usuario' });
      return;
    }

    if (!language) {
      res.status(404).json({ message: 'Lenguaje NO existe' });
      return;
    }

    user.languages.push(body.language);
    language.users.push(user._id);
    const userUpdated = await user.save();
    const languageUpdated = await language.save();
    res.status(200).send({ user: userUpdated });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = app;
