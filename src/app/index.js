const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const baseRouter = require('./routes')
require('./utils/passport');
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));

app.disable('x-powered-by');
app.use('/api',baseRouter);

module.exports = app;