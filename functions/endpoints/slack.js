const express = require('express');
const bodyParser = require('body-parser');
const functions = require('firebase-functions');
const actionEndpoint = require('../controllers/actionEndpoint');

const app = express();

// middlewares
app.use(bodyParser.json());

// controllers
app.post('/action-endpoint', actionEndpoint);

// expors
module.exports = functions.https.onRequest(app);
