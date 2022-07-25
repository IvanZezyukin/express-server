//import express from 'express';
//import bodyParser from 'body-parser';
//import routes from './routes/routes.js';
const routes = require('./routes/routes')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization, Content-Length, X-Requested-With');

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.sendStatus(200);
  }
  else {
    //move on
    next();
  }
});

routes(app);

const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});
