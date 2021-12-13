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
router.post('/listItemBySubCategory/:c_id/:s_id', addItemController.listItemBySubCategory);
router.post('/listItemByAddItemId/:_id', addItemController.listItemByAddItemId);
router.post('/switchPage/:page', addItemController.switchPage);
//router.get('/edit/:id', validate, userController.edit);
router.post('/updateById/:id', userController.updatePasswordById);  //update via id
router.post('/updateByEmail', userController.updatePasswordByEmail);  //update via email
router.post('/forgotPassword', userController.forgotPassword);
router.get('/pass', userController.pass);
router.get('/getProfile/:id', validate, userController.getProfile);
router.post('/delAccount/:id', validate, userController.delAccount);





module.exports = router;