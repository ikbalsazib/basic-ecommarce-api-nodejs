// Require Main Modules..
const {
    validationResult
} = require('express-validator/check');

const bcrypt = require('bcryptjs');
// Json Web Token Module..
const jwt = require('jsonwebtoken');


// Require Post Schema from Model..
const User = require('../models/user');

/**
 * User Registration
 * User Login
 */

const userRegistration = (req, res, next) => {
    const errors = validationResult(req);
    // Check Input validation Error with Error Handelar..
    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    // Main..
    const bodyData = req.body;

    const password = bodyData.password;
    const hashedPass = bcrypt.hashSync(password, 8);

    delete bodyData.password;
    const registrationData = {...bodyData, ...{password: hashedPass}}


    const user = new User(registrationData);

    User.findOne({
        phoneNo: bodyData.phoneNo
        })
        .then(userExists => {
            if (userExists) {
                const error = new Error('A user with this phone no already registered!');
                error.statusCode = 401;
                throw error;
            } else {
                return user.save();
            }
        })
        .then(newUser => {
            res.status(200).json({
                message: 'User Registration Success!',
                userId: newUser._id
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

// Login User..
const userLogin = (req, res, next) => {
    const phoneNo = req.body.phoneNo;
    const password = req.body.password;
    let loadedUser;
    let token;

    // // For Find Account for login..
    User.findOne({
        phoneNo: phoneNo
        })
        .then(user => {
            if (!user) {
                const error = new Error('A User with this phone no could not be found!');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            // authorizedRole = user.selectRole;
            return bcrypt.compareSync(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('You entered a wrong password!');
                error.statusCode = 401;
                throw error;
            }
            // For Json Token Generate..
            token = jwt.sign({
                    phoneNo: loadedUser.phoneNo,
                    userId: loadedUser._id
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

const getLoginUserInfo = (req, res, next) => {
     // User Shop ID from check-user-auth token..
     const loginUserId = req.userData.userId;

     User.findOne({_id: loginUserId})
     .then(result => {
         res.status(200).json({
             userInfo: result,
             message: 'Succesfully Get user info.'
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
exports.userRegistration = userRegistration;
exports.userLogin = userLogin;
exports.getLoginUserInfo = getLoginUserInfo;

