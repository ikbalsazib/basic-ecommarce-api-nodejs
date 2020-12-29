// Require Main Modules..
const {
    validationResult
} = require('express-validator/check');


// Require Post Schema from Model..
const Category = require('../models/category');

/**
 * Add Bazaar
 * Get Bazaar List
 */

// Registration User..
const addCategory = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const data = req.body;

    const category = new Category(data);

    category.save()
        .then(() => {
            res.status(200).json({
                message: 'Category Added Successfully!'
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}


const getAllCategories = async (req, res, next) => {
    Category.find()
        .then((data) => {
            res.status(200).json({
                data: data,
                message: 'All Bazaar fetch Successfully!'
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}


// Exports All Function..
exports.addCategory = addCategory;
exports.getAllCategories = getAllCategories;
