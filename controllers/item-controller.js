const itemCollection = require('../models/item-schema');
const firebase = require('../firebase/firebase');


exports.itemSchema = (async (req, res) => {
    console.log(req.body)  //test
    try {
        console.log('test')  //test
        console.log(req.file);  //test

        // const arr = [];
        // req.files.forEach((file) => {
        //     arr.push(`uploads/${file.filename}`);
        // });
        //console.log('heeeee', re)
        let fileName = await firebase.uploadFile(req);
        console.log("fileName", fileName);
        const refItemCollection = new itemCollection({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: "https://firebasestorage.googleapis.com/v0/b/olx-project-72437.appspot.com/o/" + fileName + "?alt=media",
            state: req.body.state,
            city: req.body.city
        });

        //console.log(refItemCollection);  //test

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
                    data: data

                });
            }
        });
    }
    catch (err) {
        console.log("error", err);
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
        }).sort({ _id: -1 });
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
        //console.log(skip)  //test
        //console.log(limit)  //test

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
        }).sort({ _id: -1 });
    }
    catch (err) {
        return res.status(500).json({
            status: 'failed',
            statusCode: 500,
            messege: 'error at catch'
        });
    }
});