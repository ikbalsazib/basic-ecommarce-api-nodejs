const express = require('express');

// Created Require Files..
const controller = require('../controller/category');
// const inputValidator = require('../validation/product');
// const checkAuth = require('../middileware/check-user-auth');

// Get Express Router Function..
const router = express.Router();

router.post('/add-new-category', controller.addCategory); // http://localhost:3000/api/category/add-new-category
router.get('/get-all-category-list', controller.getAllCategories); // http://localhost:3000/api/category/get-all-category-list

// Export All router..
module.exports = router;
