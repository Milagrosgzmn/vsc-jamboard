const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const mainRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
       'Access-Control-Allow-Methods',
       'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
 });

 app.use('/jamboard', mainRouter);

 module.exports = app;