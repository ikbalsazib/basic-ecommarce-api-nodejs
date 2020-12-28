// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/admin');
const inputValidator = require('../validation/admin');
const checkAdminAuth = require('../middileware/check-admin-auth');

// Get Express Router Function..
const router = express.Router();

router.post('/registration', inputValidator.checkAdminRegInput, controller.adminSignUp); // http://localhost:3000/api/admin/registration
router.put('/login', inputValidator.checkAdminLoginInput, controller.adminLogin); // http://localhost:3000/api/admin/login

// Export All router..
module.exports = router;
