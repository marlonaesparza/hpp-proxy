const express = require('express');
const multer = require('multer');
const axios = require('axios');

const postRouter = express.Router();
const upload = multer({ dest: './public/devData/postMedia'})

postRouter.post('/createPost', upload.single('media'), (req, res) => {
  console.log('Body:', req.body);
  console.log('File:', req.file);

  return res.redirect('/home');
});

module.exports = postRouter;
