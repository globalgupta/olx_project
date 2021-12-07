const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const refData = mongoose.Schema({
    brand_name: {
        type: String,
        required: true
    },
    s_id: {
        type: Schema.Types.ObjectId,
        ref: 'subCategories',
        required: true
    }

});

module.exports = mongoose.model('brands', refData);


