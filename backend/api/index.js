const express = require('express');

const api = express.Router();

api.use('/checkin', require('./Check-in'));

module.exports = api; 