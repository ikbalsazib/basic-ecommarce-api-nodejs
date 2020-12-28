// Require Main Modules..
const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
// Json Web Token Module..
const jwt = require('jsonwebtoken');

// Require Admin Schema from Model..
const Admin = require('../models/admin');
const User = require('../models/user');



/**
 * Admin Registration
 * Admin Login
 */

const adminSignUp = (req, res, next) => {
    const errors = validationResult(req);
    // Check Input validation Error with Error Handelar..
    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete all input field');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    // Main..
    const email = req.body.email;
    const username = req.body.username;
    const name = req.body.name;
    const phoneNo = req.body.phoneNo;
    const role = req.body.role;
    const password = req.body.password;
    const registrationAt = req.body.registrationAt;
    const profileImg = req.body.profileImg;
    const status = req.body.status;

    const hashedPass = bcrypt.hashSync(password, 8);

    const admin = new Admin({
        email: email,
        username: username,
        name: name,
        phoneNo: phoneNo,
        role: role,
        password: hashedPass,
        registrationAt: registrationAt,
        profileImg: profileImg,
        status: status
    });

    Admin.findOne({username: username})
        .then(adminExists => {
            if (adminExists) {
                const error = new Error('A admin with this username already registered!');
                error.statusCode = 401;
                throw error;
            } else {
                return admin.save();
            }
        })
        .then(newAdmin => {
            res.status(200).json({
                message: 'Admin Registration Success!',
                adminId: newAdmin._id
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

// Login Admin..
const adminLogin = (req, res, next) => {

    const errors = validationResult(req);
    // Check Input validation Error with Error Handelar..
    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete all input field');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const username = req.body.username;
    const password = req.body.password;
    let loadedAdmin;
    // // For Find Account for login..
    Admin.findOne({username: username})
        .then(admin => {
            if (!admin) {
                const error = new Error('A admin with this username not found!');
                error.statusCode = 401;
                throw error;
            }
            loadedAdmin = admin;
            return bcrypt.compareSync(password, admin.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('You entered a wrong password!');
                error.statusCode = 401;
                throw error;
            }
            // For Json Token Generate..
            const token = jwt.sign(
                {
                    username: loadedAdmin.username,
                    adminId: loadedAdmin._id.toString()
                },
                'a_secret_key_of_mission_twentty_twentty_three_generate_by_md_iqbal_in_2019_at_dhaka', {
                    expiresIn: '24h'
                }
            );
            res.status(200).json({
                token: token,
                expiredIn: 86400
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

/**
 * All User List
 * User Single Data
 */
const getAllUsers = (req, res, next) => {
    User.find()
        .then(users => {
            // Main Response..
            res.status(200).json({
                data: users,
                message: 'Successfully Get All Users.'
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

const getSingleUserInfo = (req, res, next) => {
    // User Shop ID from check-user-auth token..
    const userId = req.params.userId;

    User.findOne({_id: userId})
        .then(result => {
            res.status(200).json({
                data: result,
                message: 'Successfully Get user info.'
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}




// Exports All Function..
exports.adminSignUp = adminSignUp;
exports.adminLogin = adminLogin;
exports.getAllUsers = getAllUsers;
exports.getSingleUserInfo = getSingleUserInfo;



