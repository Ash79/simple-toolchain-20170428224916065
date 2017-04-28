/*
    main app.js
*/

'use strict';
var path = require('path'),
    express = require('express'),
    app = express(),
    chalk = require('chalk'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    config = require('./configuration/environment/development.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require(path.join(__dirname, '/configuration/routes.js'))(app);

app.use(logger('dev'));
app.use(cookieParser());

app.use(express.static('bower_components'));
app.use(express.static('node_modules'));
app.use(express.static('dist/client/'));

// Error catch
app.use(function (err, req, res, next) {

    console.error(err, typeof next);
    res.status(err.status || 500).send(err.message || 'Internal server error.');

});


app.listen(config.PORT, function () {

    console.log(chalk.blue('Server started on port', chalk.magenta(config.PORT)));

});
