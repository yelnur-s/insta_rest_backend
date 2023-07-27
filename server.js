const express = require('express');
const logger = require('morgan');
const passport = require('passport')

const app = express();

const PORT = 3000;

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(express.json());
app.use(passport.initialize());

require('./app/auth/passport');

app.use(require('./app/auth/routes'));
app.use(require('./app/post/router'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})

