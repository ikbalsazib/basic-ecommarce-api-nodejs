// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/user');
const inputValidator = require('../validation/user');
const checkAuth = require('../middileware/check-user-auth');

// Get Express Router Function..
const router = express.Router();

router.post('/registration', inputValidator.checkUserRegInput, controller.userRegistration); // http://localhost:3000/api/user/registration
router.put('/login', controller.userLogin); // http://localhost:3000/api/user/login
router.get('/logged-in-user-data', checkAuth, controller.getLoginUserInfo); // http://localhost:3000/api/user/logged-in-user-data

// Export All router..
module.exports = router;
