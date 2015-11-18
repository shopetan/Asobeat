// app/models/user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RoomSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Room', RoomSchema);
