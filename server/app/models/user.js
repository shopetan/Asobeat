// app/models/user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    twitter_id : { type: String, required: true, unique: true },
    room_id    : String,
    longitude  : Number,
    latitude   : Number,
    is_abnormality : Boolean
});

module.exports = mongoose.model('User', UserSchema);
