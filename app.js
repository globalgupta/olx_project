const express = require('express');
const app = express();

const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

const userRoutes = require('./routes/user-routes');
app.use('/auth', userRoutes);

const path = require('path');
app.use('/', express.static(path.join(__dirname, 'public')));

const ejs = require('ejs');
app.set('view engine', 'ejs');


const port = 3000;
app.listen(port, (err) => console.log(`Server is listening at port: ${port}`));