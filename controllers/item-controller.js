const itemCollection = require('../models/item-schema');

exports.itemSchema = ((req, res) => {
    console.log(req.body)  //test
    try {
        console.log(req.files);  //test

        const arr = [];
        req.files.forEach((file) => {
            arr.push(`uploads/${file.filename}`);
        });

        const refItemCollection = new itemCollection({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: arr,
            state: req.body.state,
            city: req.body.city
        });
        console.log(refItemCollection);  //test

        refItemCollection.save((err, data) => {
            if (err) {
                res.status(500).json({
                    status: 'failed',
                    statusCode: 500,
                    messege: 'error at addItem',
                });
            }
            else if (data) {
                res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    messege: 'item added successfully',

                });
            }
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'failed',
            statusCode: 500,
            messege: 'error at catch'
        });
    }
});


exports.listItem = ((req, res) => {
    try {
        itemCollection.find({}, (err, data) => {
            if (err) {
                return res.status(400).json({
                    status: 'failed',
                    statusCode: 400,
                    messege: 'error at listing items'
                });
            }
            else if (data) {
                return res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    messege: 'item listed successfully',
                    data: data
                });
            }
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'failed',
            statusCode: 500,
            messege: 'error at catch'
        });
    }
});