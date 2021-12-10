const mongoose = require('mongoose');
const avoidWarning = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const mong = 'mongodb+srv://aditya:Hello!1234@cluster0.daow0.mongodb.net/olx_db?retryWrites=true&w=majority';
mongoose.connect(mong)
// mongoose.connect(`mongodb://localhost:27017/olx_db`, avoidWarning);
const con = mongoose.connection;
global.con = con;

con.once('open', (err) => err ? console.log('Database not connected') : console.log('Database connected...'));