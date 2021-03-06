const express = require('express');
const axios = require('axios');

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  return axios.get('http://localhost:8001/auth', {
    params: {
      session: req.cookies.hpp_session
    }
  })
  .then(({ data }) => {
    let { session } = data;

    if (!session.userUUID) {
      res.cookie('hpp_session', session);
      return res.redirect('/login');
    };
    
    return res.redirect('/home');
  })
  .catch(error => {
    // TODO:
    // 1. Provide a better error experience.
    console.log(error);
    return res.redirect('/login');
  })
});

module.exports = indexRouter;
