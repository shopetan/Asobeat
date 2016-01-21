// sequelize prpr_man
var Sequelize = require('sequelize');
var database = new Sequelize('sample','','',{dialect:'sqlite',storage:'./database.db'});

var User =  database.define('User', {
    twitter_id: Sequelize.STRING,
    room_id: Sequelize.STRING,
    longitude: Sequelize.INTEGER,
    latitude: Sequelize.INTEGER,
    is_abnormality: Sequelize.BOOLEAN
});
var Room =  database.define('Room', {
    host_user: Sequelize.STRING
});

database
    .sync({ force: true });
