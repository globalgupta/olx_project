const likeCollection = require('../models/like-schema');


exports.like = ((req, res) => {
    try {
        likeCollection.create({ like: req.body.like, i_id: req.body.i_id, u_id: req.currentUser.userId }, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    status: 'failed',
                    statusCode: 400,
                    messege: 'like failed...'
                });
            }
            else if (data) {
                res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    messege: 'like added'
                });
                return;
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'failed',
            statusCode: 500,
            messege: 'error catched...'
        });
    }

});