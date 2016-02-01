// app/models/device.js

var Sequelize = require('sequelize');
var database = new Sequelize('asobeat','','',{dialect:'sqlite',storage:'./database.db'});

var Device =  database.define('Device', {
    device_id: {type:Sequelize.STRING,allowNull: false,unique:true}
});

module.exports = Device;
