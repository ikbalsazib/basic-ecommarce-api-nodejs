const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        required: false
    },
    registrationAt: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
});


const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
