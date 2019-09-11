if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const APIRouter = require('./routes/API');

// const connexion = require('./db/connection');

const { DB_USER, DB_PASS, DB_NAME, DB_URL } = process.env;

const mongoDBStore = new MongoDBStore({
    uri: `mongodb://${DB_USER}:${DB_PASS}@${DB_URL}/${DB_NAME}`,
    collection: 'p12-sessions'
})

const sessionOptions = {
    store: mongoDBStore,
    secret: 'pshhhh',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        path: '/',
        httpOnly: false,
        secure: false,
        maxAge: null,
        sameSite: true
    }
}

const app = express();

app.use(session(sessionOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/API', APIRouter);
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('../../front/build/'));
}

/*
En production :
l'app sert le front react sur "/*" et les API partout ailleurs.
La base de donnée est mlab 

En dev :
Selon la valeur des variables : localDb et servesFront
l'app sert seulement l'API.
Base de donnée locale.
*/

app.use('/', (err, req, res, next) => {
    res.send('errror');
    console.log('\nServer Error\n\n', err);
})

module.exports = app;
