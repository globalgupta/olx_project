const mongoose = require('mongoose');

const refData = mongoose.Schema({
    name: String,
    phone: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    picture: {
        type: String,
        nullable: true
    },
    bio: {
        type: String,
        nullable: true
    }
});

//module.exports = mongoose.model('users', refData);
const temp = mongoose.model('users', refData);
module.exports = temp;
temp.createIndexes();

