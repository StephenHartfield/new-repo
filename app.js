const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const businessRoute = require('./businessRoute');
const reviewsRoute = require('./reviewsRoute');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
});

app.use('/business', businessRoute);
app.use('/reviews', reviewsRoute);

//error handling - catch all error
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

//error handling - throw errors for indivual cases
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;