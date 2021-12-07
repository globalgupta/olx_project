const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const refData = mongoose.Schema({
    like: {
        type: Number,
        required: true
    },
    u_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    i_id: {
        type: Schema.Types.ObjectId,
        ref: 'items',
        required: true
    }

});

module.exports = mongoose.model('likes', refData);


