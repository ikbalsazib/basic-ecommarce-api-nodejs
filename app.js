/**
 * Error Status Code 422 mean Validation Error
 */
// Main Module Required..
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Main Admin Router File..
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const bazaarRoutes = require('./routes/bazaar');
const categoryRoutes = require('./routes/category');


// Cross Unblocker File..
const crossUnblocker = require('./middileware/cros-unblocker');
// Custom Error Hanndler..
const errorHandler = require('./middileware/error-handler');

// Main Express App Variable..
const app = express();

// BodyParser Middleware for request data extractor..
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// CROS Unblocker Middleware..
app.use(crossUnblocker.allowCross);


//Router Request Handeler..
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/bazaar', bazaarRoutes);
app.use('/api/category', categoryRoutes);

//Error Handelar..
app.use(errorHandler.extra);

//MongoDB Connection..
mongoose.connect('mongodb://localhost:27017/basic-e-commerce', {
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => {
        // For Main Server..
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Server is running at port:${port}`));
        console.log('Connected to mongoDB');


    })
    .catch(err => {
        console.error('Opps! Could not connect to mongoDB Cluster0', err);
    })
