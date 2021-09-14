const express = require('express');
const axios = require('axios');
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  return axios.get('http://localhost:8001/auth', {
    params: {
      session: req.cookies.hpp_session
    }
  })
  .then(({ data }) => {
    let { session } = data;
    
    if (!session.userUUID) {
      throw session;
    };
    
    // TODO: get variables from Users Service
    return res.render('pages/home');
  })
  .catch((session) => {
    res.cookie('hpp_session', session);
    return res.redirect('/login');
  });
});

module.exports = homeRouter;
