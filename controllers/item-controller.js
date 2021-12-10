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
                res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    messege: 'item listed successfully',
                    data: data
                });
                return
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

exports.listItemBySubCategory = ((req, res) => {
    try {
        console.log('categoryid', req.params.c_id)  //test
        console.log('subcategoryid', req.params.s_id)  //test
        itemCollection.findOne({ c_id: req.params.c_id, s_id: req.params.s_id }, (err, data) => {
            console.log('data', data)  //test

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
            else {
                return res.status(404).json({
                    status: 'failed',
                    statusCode: 404,
                    messege: 'no record found'
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


exports.listItemByAddItemId = ((req, res) => {
    try {
        console.log('addItemid', req.params.i_id)  //test

        itemCollection.findById(req.params._id, (err, data) => {
            console.log('data', data)  //test

            if (err) {
                return res.status(400).json({
                    status: 'failed',
                    statusCode: 400,
                    messege: 'error at listing items'
                });
            }
            else if (data) {
                res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    messege: 'item listed successfully',
                    data: data
                });
            }
            else {
                res.status(404).json({
                    status: 'failed',
                    statusCode: 404,
                    messege: 'no record found'
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


exports.switchPage = ((req, res) => {
    try {
        const page = req.params.page;
        const limit = 8;

        let skip = (limit * page) - limit;
        console.log(skip)  //test
        console.log(limit)  //test

        itemCollection.find({}, null, { skip: skip, limit: limit }, (err, data) => {

            if (err) {
                return res.status(400).json({
                    status: 'failed',
                    statusCode: 400,
                    messege: 'error at pagination'
                });
            }
            else if (data) {
                res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    messege: 'page fetched successfully',
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