// app/models/tmp.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TmpSchema = new Schema({
    user_id : String
} , { _id: false});

module.exports = mongoose.model('Tmp', TmpSchema);
