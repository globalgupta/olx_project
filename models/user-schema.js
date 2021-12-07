const mongoose = require('mongoose');
const refData = mongoose.Schema({
    name: String,
    phone: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    about_me: String
});

//module.exports = mongoose.model('users', refData);
const temp = mongoose.model('users', refData);
module.exports = temp;
temp.createIndexes();

