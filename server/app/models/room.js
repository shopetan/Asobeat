// app/models/room.js

var Sequelize = require('sequelize');
var database = new Sequelize('sample','','',{dialect:'sqlite',storage:'../../database.db'});

module.exports = function(database, Sequelize) {
    return database.define('Room', {
        host_user: Sequelize.STRING
    });
};
