const mongo = require('mongodb');
const { MongoClient } = mongo;
const { DB_USER, DB_PASS, DB_NAME, DB_URL } = process.env;

const URL = `mongodb://${DB_USER}:${DB_PASS}@${DB_URL}/${DB_NAME}`;

const client = new MongoClient(URL, { useNewUrlParser: true });

module.exports = client.connect()
    .then( client => client.db(DB_NAME) )
    .catch( err => console.log(err))
