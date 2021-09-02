const express = require('express');
const authRouter = express.Router();

//--SIGN UP FUNCTIONALITY--//

authRouter.get('/signup', (req, res) => {
  // return axios.get('http://localhost:8001/home', {
  //   params: {
  //     session: req.cookies.hpp_session
  //   }
  // });
  res.render('pages/signup');
});

authRouter.post('/signup', (req, res) => {
  console.log(req.body);
  res.end();
});

//--LOGIN FUNCTIONALITY--//

authRouter.get('/login', (req, res) => {
  res.render('pages/login');
})

authRouter.post('/login', (req, res) => {
  console.log(req.body);
  res.end();
})

module.exports = authRouter;
