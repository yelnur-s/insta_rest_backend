const express = require('express');
const logger = require('morgan');
const passport = require('passport')
const cors = require('cors')
const app = express();

const PORT = 3001;

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(express.json());
app.use(passport.initialize());
app.use(cors())

require('./app/auth/passport');

app.use(require('./app/auth/routes'));
app.use(require('./app/post/router'));
app.use(require('./app/story/router'));
app.use(require('./app/comments/router'));
app.use(require('./app/subscription/router'));
app.use(require('./app/like/router'));


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})

