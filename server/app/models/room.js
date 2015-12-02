// app/models/user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RoomSchema   = new Schema({
    users: {
        user_id: String
    },
    host_user: String
});

module.exports = mongoose.model('Room', RoomSchema);
