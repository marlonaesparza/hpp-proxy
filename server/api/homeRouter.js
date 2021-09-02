const express = require('express');
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  // TODO: get variables from Users Service
  let firstName = 'Marlon';
  let lastName = 'Esparza';

  res.render('pages/index', {
    firstName,
    lastName
  });
});

module.exports = homeRouter;
