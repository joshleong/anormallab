const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const server = express();

var serviceAccount = require('../.firebase/service-account.json');

const firebase = admin
    .initializeApp(
        {
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://anormallab.firebaseio.com'
        },
        'server'
    )
    .firestore();

server.use(cors());
server.use(bodyParser.json());
server.use((req, _res, next) => {
    req.firebaseServer = firebase;
    next();
});

module.exports = server;
