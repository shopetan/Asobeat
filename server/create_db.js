// sequelize prpr_man
var Sequelize = require('sequelize');
var database = new Sequelize('sample','','',{dialect:'sqlite',storage:'./database.db'});

var User       = require('./app/models/user');
var Room       = require('./app/models/room');

User.belongsTo(Room, {foreignKey: 'room_id'});
Room.hasMany(User , {foreignKey: 'room_id'});

database
    .sync({ force: true });
