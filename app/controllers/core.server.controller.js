'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Core = mongoose.model('Core'),
    _ = require('lodash');

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.list = function (req, res) {
    Core.find(function (err, cores) {
        if(err) return res.send(500, err);
        return res.send(cores);
    });
}
