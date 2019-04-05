const mongoose = require( 'mongoose' );

mongoose.connect('mongodb://localhost:27017/webdb', {
    useNewUrlParser: true
});

const email = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
},{
    versionKey: false
});


module.exports = mongoose.model('Email', email);