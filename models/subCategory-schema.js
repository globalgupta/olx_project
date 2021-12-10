const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const refData = mongoose.Schema({
    sub_name: {
        type: String,
        required: true
    },
    c_id: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    }

});

module.exports = mongoose.model('subCategories', refData);


