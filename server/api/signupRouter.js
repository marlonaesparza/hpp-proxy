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
  let { firstName, lastName, email, password } = req.body;
  let { hash } = req.cookies.hpp_session;
  let userUUID;

  return axios.post('http://localhost:8002/user/register', {
    firstName,
    lastName,
    email,
    password
  })
    .then(({ data }) => {
      let { uuid } = data;
      userUUID = uuid;
      
      return axios.patch('http://localhost:8001/session/updateSession', {
        uuid,
        hash
      });
    })
    .then(({ data }) => {
      let { updated } = data;

      if (!updated) {
        throw updated;
      };

      req.cookies.hpp_session.userUUID = userUUID;
      return res.redirect('/home');
    })
    .catch(() => {
      return res.redirect('/signup');
    });
});

module.exports = signupRouter;
