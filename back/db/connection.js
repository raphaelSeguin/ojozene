const mongo = require('mongodb');
const { MongoClient } = mongo;
const { dbUser, dbPass, dbName, dbURL } = require('../../config.js');

// uri = `mongodb://user1:userOne12@ds161397.mlab.com:61397/prject12`

const URL = `mongodb://${dbUser}:${dbPass}@ds161397.mlab.com:61397/${dbName}`;

const client = new MongoClient(dbURL, { useNewUrlParser: true });

module.exports = client.connect().then( client => client.db(dbName) )
