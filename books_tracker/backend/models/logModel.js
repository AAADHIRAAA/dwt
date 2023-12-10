const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    scribe_number: String,
    issues: String,
    loginTime: String, 
    logoutTime: String, 
    date: String
});


const Log = mongoose.model('Log', logSchema);

module.exports = Log;
