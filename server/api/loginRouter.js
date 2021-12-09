const express = require('express');
const axios = require('axios');

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
  return axios.get('http://localhost:8001/auth', {
    params: {
      session: req.cookies.hpp_session
    }
  })
  .then(({ data }) => {
    let { session } = data;

    if (!session.userUUID) {
      res.cookie('hpp_session', session);
      return res.render('pages/login');
    };
    
    return res.redirect('/home');
  })
  .catch(error => {
    // TODO:
    // 1. Provide a better error experience.
    console.log(error);
    return res.render('pages/login');
  });
});

loginRouter.post('/auth', (req, res) => {
  let { email, password } = req.body;
  let { hash } = req.cookies.hpp_session;
  let userUUID;

  return axios.post('http://localhost:8002/user/auth', {
    email,
    password
  })
    .then(({ data }) => {
      let { uuid } = data;
      userUUID = uuid;

      if (!uuid) {
        throw uuid;
      };
      
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
      return res.redirect('/login');
    });
})

module.exports = loginRouter;
