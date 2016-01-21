// app/models/room.js

var Sequelize = require('sequelize');
var database = new Sequelize('asobeat','','',{dialect:'sqlite',storage:'./database.db'});

var Room =  database.define('Room', {
    host_user: {type:Sequelize.STRING,allowNull: false}
},{indexes: [{unique: true, fields: ['host_user']}]});

module.exports = Room;
