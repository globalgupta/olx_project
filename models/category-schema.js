const mongoose = require('mongoose');
const refData = mongoose.Schema({
    catg_name: {
        type: String,
        required: true
    },
    catg_image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('categories', refData);


