// const fs = require('fs');
// var multer = require("multer");

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         var path = "./public/uploads/"
//         //Create folder if does not exist
//         //fs.mkdirSync(path, { recursive: true })
//         cb(null, path, function (err, succ) {
//             if (err) throw err
//         });
//     },
//     filename: function (req, file, cb) {
//         var name = (Date.now() + '_' + file.originalname);
//         //name = name.replace(/ /g, '-');
//         cb(null, name, function (err, succ1) {
//             if (err) throw err
//         });
//     }
// });
