const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
dbName = 'sample1'
const dbUrl = `mongodb+srv://Arul03:arul0311@cluster0.8pfx9.mongodb.net/${dbName}`
module.exports={dbUrl,mongodb,MongoClient}