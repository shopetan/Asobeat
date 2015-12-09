// app/models/room.js

var mongoose     = require('mongoose');
var TmpSchema    = require('./tmp');
var Schema       = mongoose.Schema;

var RoomSchema   = new Schema({
    users: [TmpSchema],
    host_user: String
});

module.exports = mongoose.model('Room', RoomSchema);

