const mongoose = require('mongoose');
//const moment = require('moment-timezone');

const epoch = Math.floor(new Date().getTime()/1000.0);
//console.log(epoch)


const refData = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        default: []
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        default: epoch
    },
    updated_at: {
        type: String,
        default: epoch
    }
});

module.exports = mongoose.model('AddItems', refData);