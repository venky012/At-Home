const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User } = require('../Models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password')

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password')

  const token = user.generateAuthToken();

  userDetails = {
    user: user,
    token: token
  }
  res.send(userDetails)
});


function validate(req) {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required()
  };
  return Joi.validate(req, schema)
}
module.exports = router;
