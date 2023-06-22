const express = require('express');
const logger = require('morgan');
const app = express();
const PORT = 3000;

app.use(logger('dev'));
app.use(express.urlencoded());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('ok');
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})

