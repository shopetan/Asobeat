// app/models/room.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RoomSchema   = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'Tmp' }],
    host_user: String
},{ __v: false});

module.exports = mongoose.model('Room', RoomSchema);
