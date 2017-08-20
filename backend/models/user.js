const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function(){
    const UserSchema = new Schema({
        name: String,
        location: Array,
        time: String        
    })

    mongoose.model('checkinData', UserSchema)
}