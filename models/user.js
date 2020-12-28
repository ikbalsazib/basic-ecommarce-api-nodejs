const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        // email: {
        //     type: String,
        //     required: true
        // },
        // username: {
        //     type: String,
        //     required: false
        // },
        // profileImg: {
        //     type: String
        // },
        password: {
            type: String,
            required: true
        },
        // isPhoneVerified: {
        //     type: Boolean,
        //     required: true
        // },
        // registrationAt: {
        //     type: Date,
        //     required: true
        // },
        // hasAccess: {
        //     type: Boolean,
        //     required: true
        // }
    },
    {
        timestamps: true
    }
);


const User = mongoose.model('User', userSchema);
module.exports = User;
