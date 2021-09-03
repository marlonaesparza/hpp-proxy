const express = require('express');
const axios = require('axios');

const signupRouter = express.Router();

signupRouter.get('/', (req, res) => {
  return axios.get('http://localhost:8001/auth', {
    params: {
      session: req.cookies.hpp_session
    }
  })
  .then(({ data }) => {
    let { session } = data;

    if (!session.userUUID) {
      res.cookie('hpp_session', session);
      return res.render('pages/signup');
    }
    
    return res.redirect('/home');
  })
  .catch(error => {
    // TODO:
    // 1. Provide a better error experience.
    console.log(error);
  })
});

signupRouter.post('/register', (req, res) => {
  console.log(req.body);
  res.end();
});

module.exports = signupRouter;
