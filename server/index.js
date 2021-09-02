require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const partials = require('express-partials');

const authRouter = require('./api/authRouter');
const homeRouter = require('./api/homeRouter');

const app = express();
const port = 8000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(partials());

app.use('/auth', authRouter);
app.use('/home', homeRouter);

app.get('/', (req, res) => {
  return axios.get('http://localhost:8001/auth', {
    params: {
      session: req.cookies.hpp_session
    }
  })
  .then(({ data }) => {
    let { session } = data;

    if (!session.userUUID) {
      res.cookie('hpp_session', session);
      res.redirect('/auth/login');
    } else {
      res.redirect('/home');
    };
  })
  .catch(error => {
    // TODO:
    // 1. Provide a better error experience.
    console.log(error);
  })
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
