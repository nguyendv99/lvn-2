'use strict';
const mysql = require('mysql');
const config = require('./../config')

const db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected database!");
});

module.exports = db