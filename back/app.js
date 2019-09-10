const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const APIRouter = require('./routes/API');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const connexion = require('./db/connection');

const store = new MongoDBStore({
    uri: `mongodb://user1:userOne12@ds161397.mlab.com:61397/prject12`,
    collection: 'p12-sessions'
})

const sessionOptions = {
    store: store,
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
app.use('/static', express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/API', APIRouter);
app.use('/', indexRouter);

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
