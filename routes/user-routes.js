const express = require('express');
const router = express.Router();
//global.router = router;
const validate = require('../middlewares/authorization');

const fs = require('fs');
var multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var path = "./public/uploads/"
        //Create folder if does not exist
        //fs.mkdirSync(path, { recursive: true })
        cb(null, path, function (err, succ) {
            if (err) throw err
        });
    },
    filename: function (req, file, cb) {
        var name = (Date.now() + '_' + file.originalname);
        //name = name.replace(/ /g, '-');
        cb(null, name, function (err, succ1) {
            if (err) throw err
        });
    }
});


const upload = multer({ storage: storage, limits: 1000000 });

const userController = require('../controllers/user-controller');
const categoryController = require('../controllers/category-controller');
const subCategoryController = require('../controllers/subCategory-controller');
const addItemController = require('../controllers/item-controller');
const likeController = require('../controllers/like-controller');
const { validationResult } = require('express-validator');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/category', validate, categoryController.category);
router.get('/subCategory/:c_id', validate, subCategoryController.subCategory);
router.post('/addItem', validate, upload.any(), addItemController.itemSchema);
router.post('/like', validate, likeController.like);
router.get('/listItem', addItemController.listItem);
//router.get('/edit/:id', validate, userController.edit);
router.post('/update/:id', validate, userController.update);
router.post('/forgotPassword', validate, userController.forgotPassword);
router.post('/pass/:email', validate, userController.forgotPassword);


module.exports = router;