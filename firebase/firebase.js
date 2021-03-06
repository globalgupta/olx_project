const express = require('express');
const app = new express();

const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://olx-project-72437.firebaseio.com",
    storageBucket: 'olx-project-72437.appspot.com'
});

app.locals.bucket = firebaseAdmin.storage().bucket();

exports.uploadFile = async(req) => {
    console.log("file", req.file)
    const fileName = Date.now() + '-' + req.file.originalname;

    await app.locals.bucket.file(fileName).createWriteStream().end(req.file.buffer);

    return fileName;
};

//const upload = ({ storage: multer.memoryStorage() });


//module.exports = uploadFile;