// app/models/user.js prpr_man

var Sequelize = require('sequelize');
var database = new Sequelize('sample','','',{dialect:'sqlite',storage:'../../database.db'});

module.exports = function(database, Sequelize) {
    var User =  database.define('User', {
        twitter_id: Sequelize.STRING,
        room_id: Sequelize.STRING,
        lonitude: Sequelize.INTEGER,
        latitude: Sequelize.INTEGER,
        is_abnormality: Sequelize.BOOLEAN
    });
    return User;
};
