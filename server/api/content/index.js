'use strict';

var express = require('express'),
    controller = require('./content.controller'),
    router = express.Router(); // eslint-disable-line new-cap

// define route and point an a specific action in this controller
router.get('/', controller.getContent);

module.exports = router;

