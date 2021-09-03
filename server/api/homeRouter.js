const express = require('express');
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  // TODO: get variables from Users Service
  let firstName = 'Marlon';
  let lastName = 'Esparza';

  return res.render('pages/home', {
    firstName,
    lastName
  });
});

module.exports = homeRouter;
