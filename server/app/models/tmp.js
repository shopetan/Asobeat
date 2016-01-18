// app/models/tmp.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TmpSchema = new Schema({
    twitter_id : String,
    room_id    : String,
    longitude  : Number,
    latitude   : Number,
    is_abnormality : Boolean
} , { _id: false},{ __v: false});

module.exports = mongoose.model('Tmp', TmpSchema);
