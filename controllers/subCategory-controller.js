const subCategoryCollection = require('../models/subCategory-schema');

exports.subCategory = ((req, res) => {
    try {
        console.log(req.params.c_id)  //test
        subCategoryCollection.find({ c_id: req.params.c_id }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    status: 'failed',
                    statusCode: 500,
                    messege: 'error at sub-category'
                });
            }
            else if (data) {
                return res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    messege: 'sub-category found',
                    data: data
                });
            }
            else {
                return res.status(404).json({
                    status: 'success',
                    statusCode: 404,
                    messege: 'sub-category not found',
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