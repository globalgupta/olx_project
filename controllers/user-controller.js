const userCollection = require('../models/user-schema');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const salt = 15;
const nodemailer = require('nodemailer');
const ejs = require('ejs');
//const { route } = require('../routes/user-routes');



exports.register = [
    body('name').exists().notEmpty().isLength({ min: 4, max: 20 }).trim().withMessage('name must be min 6 and max 20 in lengths'),
    body('phone').exists().notEmpty().isLength({ min: 10, max: 13 }).trim().withMessage('phone number must be min 10 and max 13 in lengths'),
    //body('email').isEmail().withMessage('email is required and must be a valid email'),
    body("email").isLength({ min: 1 }).trim().withMessage("email is required.")
        .isEmail().withMessage("Email must be a valid email address."),
    body('password').trim().exists().isLength({ min: 6 }).withMessage('password is required and must be 6 in lengths or above'),
    (req, res) => {
        try {
            console.log(req.body)  //test
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                console.log('errors', errors)
                return res.status(422).json({
                    status: 'failed',
                    statusCode: 422,
                    messege: errors.array()[0].msg
                });
            }
            else {
                userCollection.findOne({ email: req.body.email }, (ferr, email) => {
                    console.log('email', email)  //test

                    if (email) {
                        return res.status(422).json({
                            status: 'failed',
                            statusCode: 422,
                            messege: 'email already exist'
                        });
                    }
                    else {
                        userCollection.findOne({ phone: req.body.phone }, (gerr, phone) => {
                            if (phone) {
                                return res.status(422).json({
                                    status: 'failed',
                                    statusCode: 422,
                                    messege: 'phone number is already exist'
                                });
                            }
                            else {
                                //userCollection.findOne({email})
                                bcrypt.hash(req.body.password, salt, (berr, hash) => {
                                    if (berr) {
                                        res.status(400).json({
                                            status: 'failed',
                                            statusCode: 400,
                                            messege: 'error at bcrypt'
                                        });
                                    }
                                    else if (hash) {
                                        const refCollection = new userCollection({
                                            name: req.body.name,
                                            phone: req.body.phone,
                                            email: req.body.email,
                                            password: hash,
                                        });
                                        refCollection.save((err, data) => {
                                            //console.log(err)
                                            if (err) {
                                                console.log('err', err)
                                                res.status(500).json({
                                                    status: 'failed',
                                                    statusCode: 500,
                                                    messege: err.message
                                                });
                                            }
                                            else if (data) {

                                                userData = { userId: data._id, email: data.email }

                                                jwt.sign(userData, 'secret', (jerr, result) => {
                                                    if (jerr) {
                                                        console.log('jerr', jerr)
                                                        return res.status(400).json({
                                                            status: 'failed',
                                                            statusCode: 400,
                                                            messege: 'error at token'
                                                        });
                                                    }
                                                    else if (result) {
                                                        res.status(200).json({
                                                            status: 'success',
                                                            statusCode: 200,
                                                            messege: 'user successfully registered',
                                                            token: result
                                                        });
                                                        return;
                                                    }
                                                });
                                            }

                                        });
                                    }
                                });

                            }
                        });
                    }

                });
            }

        }
        catch (err) {
            console.log('catch', err) //test
            res.status(500).json({
                status: 'failed',
                statusCode: 500,
                messege: 'error catched...'
            });
        }
    }];

exports.login = [
    //body('email').isEmail().withMessage('email is required and must be a valid email'),
    body("email").isLength({ min: 1 }).trim().withMessage("email is required.")
        .isEmail().withMessage("Email must be a valid email address."),
    body('password').trim().exists().isLength({ min: 6 }).withMessage('password is required and must be 6 in lengths or above'),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: 'failed',
                    statusCode: 400,
                    message: errors.array()[0].msg
                });
            }
            else {
                userCollection.findOne({ email: req.body.email }, (err, data) => {
                    if (err) {
                        return res.status(400).json({
                            status: 'failed',
                            statusCode: 400,
                            messege: 'login failed'
                        });
                    }
                    else if (data) {
                        console.log(data) //test

                        bcrypt.compare(req.body.password, data.password, (berr, bdata) => {
                            if (berr) {
                                return res.status(400).json({
                                    status: 'failed',
                                    statusCode: 400,
                                    messege: err.message
                                });
                            }
                            else if (bdata) {
                                const userData = { userId: data._id }
                                jwt.sign(userData, 'secret', (jerr, result) => {
                                    if (jerr) {
                                        res.status(400).json({
                                            status: 'failed',
                                            statusCode: 400,
                                            message: 'error at token'
                                        });
                                    }
                                    else if (result) {
                                        res.status(200).json({
                                            status: 'success',
                                            statusCode: 200,
                                            message: 'user logged successfully',
                                            token: result,
                                            data: data

                                        });
                                        return;
                                    }
                                });
                                return;
                            }
                            else {
                                res.status(404).json({
                                    status: 'failed',
                                    statusCode: 404,
                                    message: 'incorrect password'
                                });
                            }
                        });

                    }
                    else {
                        res.status(404).json({
                            status: 'failed',
                            statusCode: 404,
                            message: 'email not found'
                        });
                    }
                });
            }
        }
        catch (err) {
            console.log(err) //test
            return res.status(400).json({
                status: 'failed',
                statusCode: 400,
                messege: 'error catched...'
            });
        }
    }];

exports.updatePasswordById = ((req, res) => {
    try {
        console.log(req.params.id)  //test

        bcrypt.hash(req.body.password, salt, (berr, hash) => {
            if (berr) {
                res.status(500).json({
                    status: 'failed',
                    statusCode: 500,
                    message: 'error at bcrypt..'
                });
                return;
            }
            if (hash) {
                userCollection.findByIdAndUpdate(req.params.id, { password: hash }, (err, data) => {
                    if (err) {
                        res.status(400).json({
                            status: 'failed',
                            statusCode: 400,
                            message: 'error at password change'
                        });
                        return;
                    }
                    if (data) {
                        console.log('heyyyy', data)
                        return res.status(200).json({
                            status: 'success',
                            statusCode: 200,
                            message: 'password changed successfully',
                            data: data
                        });
                    }
                });
            }
        });

    }
    catch (err) {
        return res.status(500).json({
            status: 'failed',
            statusCode: 500,
            message: 'error at catch..'
        });
    }
});

exports.forgotPassword = [
    body('email').isEmail().withMessage('input must be a valid email'),

    (req, res) => {
        try {
            console.log('test', req.body.email) //test

            userCollection.findOne({ email: req.body.email }, (err, user) => {
                if (err) {
                    console.log('test111', user)  //test
                    return res.status(400).json({
                        status: 'failed',
                        statusCode: 400,
                        message: 'unable to find input email'
                    });
                }
                else if (user) {
                    var transport = nodemailer.createTransport({
                        host: "smtp.mailtrap.io",
                        port: 2525,
                        auth: {
                            user: "348c207fb796a5",
                            pass: "dcc67366bc521a"
                        }
                    });

                    // generating the link for the email
                    let url = '<a href="http://' + req.headers.host + '/auth/pass' + '">http://' + req.headers.host + '/pass' + '</a>';
                    console.log("url", url);

                    transport.sendMail({
                        from: 'guptajeehere@gmail.com', // sender address
                        to: req.body.email, // list of receivers                    
                        text: 'Hello world ?', // plaintext body
                        html: '<p>We just acknowledged that you have requested to change your account password. You can change your password by clicking on the link below.</p>' + url + '<p>If you did not make this request. Please ignore this email.</p>'
                    });
                    res.status(200).json({ // link sent on the email
                        status: 200,
                        message: "link sent to your email"
                    });
                }
                else {
                    return res.status(400).json({
                        status: 400,
                        message: "email is not registered"
                    });
                }
            });
        }
        catch (err) {
            return res.status(500).json({
                status: 'failed',
                statusCode: 500,
                message: 'error at catch..'
            });
        }
    }];

exports.pass = ((req, res) => {
    console.log('hey', res);  //test
    // rendering ejs file                
    ejs.renderFile('./password.ejs', {}, {}, function (err, template) {
        if (err) throw err;

        else res.end(template);

    });
});

exports.updatePasswordByEmail = ((req, res) => {
    try {
        console.log(req.body.email)  //test

        bcrypt.hash(req.body.password, salt, (berr, hash) => {
            if (berr) {
                res.status(500).json({
                    status: 'failed',
                    statusCode: 500,
                    message: 'error at bcrypt..'
                });
                return;
            }
            if (hash) {
                userCollection.findOneAndUpdate({ email: req.body.email }, { password: hash }, (err, data) => {

                    if (err) {
                        res.status(400).json({
                            status: 'failed',
                            statusCode: 400,
                            message: 'error at password change'
                        });
                        return;
                    }
                    if (data) {
                        ejs.renderFile('./sucess.ejs', {}, {}, function (err, template) {
                            if (err) throw err;

                            else res.end(template);
                        });
                    }
                });
            }
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'failed',
            statusCode: 500,
            message: 'error at catch..'
        });
    }
});

exports.getProfile = ((req, res) => {
    try {
        userCollection.findOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    status: 'failed',
                    statusCode: 400,
                    message: 'error at fetching profile..'
                });
            }
            else if (data) {
                res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    message: 'profile fetched successfully..',
                    data: data
                });
                return;
            }
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'failed',
            statusCode: 500,
            message: 'error at catch..'
        });
    }
});

exports.delAccount = ((req, res) => {
    try {
        userCollection.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: 'failed',
                    statusCode: 400,
                    message: 'something went wrong, please try again'
                });
            }
            else if (result) {
                res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    message: 'account deleted successfully'
                });
                return;
            }
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'failed',
            statusCode: 500,
            message: 'error at catch..'
        });
    }
});


// exports.editProfile = ((req, res) => {
//     try {
//         userCollection.findById(req.params.id, (err, result) => {
//             if (err) {
//                 return res.status(400).json({
//                     status: 'failed',
//                     statusCode: 400,
//                     message: 'unable to edit the profile'
//                 });
//             }
//             else if (result) {
//                 return res.status(200).json({
//                     status: 'success',
//                     statusCode: 200,
//                     message: 'please update the required fields'
//                 });
//             }
//             else {
//                 return res.status(403).json({
//                     status: 'failed',
//                     statusCode: 403,
//                     message: 'something wemt wrong, please try again'
//                 });
//             }
//         });
//     }
//     catch (err) {
//         return res.status(500).json({
//             status: 'failed',
//             statusCode: 500,
//             message: 'error at catch..'
//         });
//     }
// });


exports.updateProfile = ((req, res) => {
    try {
        userCollection.findByIdAndUpdate(req.params.id, { name: req.body.name, phone: req.body.phone, bio: req.body.bio }, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: 'failed',
                    statusCode: 400,
                    message: 'unable to update the profile'
                });
            }
            else if (result) {
                return res.status(200).json({
                    status: 'success',
                    statusCode: 200,
                    message: 'profile updated successfully'
                });
            }
            else {
                return res.status(403).json({
                    status: 'failed',
                    statusCode: 403,
                    message: 'something wemt wrong, please try again'
                });
            }
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'failed',
            statusCode: 500,
            message: 'error at catch..'
        });
    }
});

