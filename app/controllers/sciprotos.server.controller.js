'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Sciproto = mongoose.model('Sciproto'),
	_ = require('lodash');

/**
 * Create a Sciproto
 */
exports.create = function(req, res) {
	var sciproto = new Sciproto(req.body);
	sciproto.user = req.user;

	sciproto.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sciproto);
		}
	});
};

/**
 * Show the current Sciproto
 */
exports.read = function(req, res) {
	res.jsonp(req.sciproto);
};

/**
 * Update a Sciproto
 */
exports.update = function(req, res) {
	var sciproto = req.sciproto ;

	sciproto = _.extend(sciproto , req.body);

	sciproto.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sciproto);
		}
	});
};

/**
 * Delete an Sciproto
 */
exports.delete = function(req, res) {
	var sciproto = req.sciproto ;

	sciproto.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sciproto);
		}
	});
};

/**
 * List of Sciprotos
 */
exports.list = function(req, res) { 
	Sciproto.find().sort('-created').populate('user', 'displayName').exec(function(err, sciprotos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(sciprotos);
		}
	});
};

/**
 * Sciproto middleware
 */
exports.sciprotoByID = function(req, res, next, id) {

	Sciproto.findById(id).populate('user', 'displayName').exec(function(err, sciproto) {
		if (err) return next(err);
		if (! sciproto) return next(new Error('Failed to load Sciproto ' + id));
		req.sciproto = sciproto;
        console.log("zzz id = "+id);
		next();
	});
};

/**
 * Sciproto authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.sciproto.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
