const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(
  "mongodb+srv://ramakrishna:jH22J58mrH9a7ZR@nodejs-learning.mcpws.mongodb.net/shop?retryWrites=true&w=majority"
);
let _db;
const mongoConnect = (callback) => {
  mongoClient
    .connect()
    .then((connection) => {
      _db = connection.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "no db found!";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;

// connecting to db using sequelize

// const { Sequelize } = require("sequelize");
// const sequelize = new Sequelize('nodejs-complete', 'root', 'ramkidev#22', {
//     dialect: 'mysql',
//     host: 'localhost'
// })

// module.exports = sequelize;

// const sql = require('mysql2')

// const pool = sql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'nodejs-complete',
//     password:'ramkidev#22'
// })

// module.exports = pool.promise()
