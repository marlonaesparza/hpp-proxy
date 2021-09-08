require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const cookieParser = require('cookie-parser');
const partials = require('express-partials');

const indexRouter = require('./api/indexRouter');
const signupRouter = require('./api/signupRouter');
const loginRouter = require('./api/loginRouter');
const homeRouter = require('./api/homeRouter');

const app = express();
const port = 8000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(partials());
app.use(express.static(__dirname + '/../public'));

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
