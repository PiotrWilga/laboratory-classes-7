const { MongoClient, ServerApiVersion } = require('mongodb');
const { DB_USER, DB_PASS } = require('./config');

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@piotrw.vhhn8wn.mongodb.net/?retryWrites=true&w=majority&appName=PiotrW`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database;

async function mongoConnect(callback) {
  try {
    await client.connect();
    database = client.db('shop');
    console.log('Connection to the database has been established.');
    callback(); // uruchomienie serwera
  } catch (err) {
    console.error('Failed to connect to the database.', err);
  }
}

function getDatabase() {
  if (!database) {
    throw new Error('No database found.');
  }
  return database;
}

module.exports = {
  mongoConnect,
  getDatabase
};
