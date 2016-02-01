// app/models/device.js

var Sequelize = require('sequelize');
var database = new Sequelize('asobeat','','',{dialect:'sqlite',storage:'./database.db'});

var Device =  database.define('Device', {
    device_id: {type:Sequelize.STRING,allowNull: false}
},{indexes: [{unique: true, fields: ['device_id']}]});

module.exports = Device;
