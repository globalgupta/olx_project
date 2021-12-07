const mongoose = require('mongoose');
const avoidWarning = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(`mongodb://localhost:27017/olx_db`, avoidWarning);
const con = mongoose.connection;
global.con = con;

con.once('open', (err) => err ? console.log('Database not connected') : console.log('Database connected...'));