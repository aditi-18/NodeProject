/**
 * @file Server file
 */
const express = require('express');
const app = express();

app.get('/hello', (req, res) =>
  res.send('Hello World!'));

const PORT = 3000;
app.listen(PORT);
