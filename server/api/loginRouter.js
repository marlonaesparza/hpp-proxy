const express = require('express');
const axios = require('axios');

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
  return res.render('pages/login');
})

loginRouter.post('/authorize', (req, res) => {
  console.log(req.body);
  res.end();
})

module.exports = loginRouter;
