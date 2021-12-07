const categoryCollection = require('../models/category-schema');

exports.category = ((req, res) => {
    try {

        
        categoryCollection.find({}, (err, data) => {
            if (err) {
                return res.status(400).json({
                    status: 'failed',
                    statusCode: 500,
                    messege: 'error at category'
                });
            }
            else if (data) {
                return res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    messege: 'category found',
                    data: data
                });
            }
            else {
                return res.status(404).json({
                    status: 'failed',
                    statusCode: 400,
                    messege: 'category not found',
                });
            }
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'failed',
            statusCode: 500,
            messege: 'error catched...'
        });
    }
});