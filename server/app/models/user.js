// app/models/user.js

var Sequelize = require('sequelize');
var database = new Sequelize('asobeat','','',{dialect:'sqlite',storage:'./database.db'});

var User =  database.define('User', {
    twitter_id: {type:Sequelize.STRING,allowNull: false,unique:true},
    room_id: Sequelize.STRING,
    longitude: Sequelize.INTEGER,
    latitude: Sequelize.INTEGER,
    is_abnormality: Sequelize.BOOLEAN
});

module.exports = User;

