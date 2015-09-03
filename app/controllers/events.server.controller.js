'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    fs = require('fs'),//I added this
    errorHandler = require('./errors.server.controller'),
    Event = mongoose.model('Event'),
    _ = require('lodash');

//I wrote these rest methods
exports.getEventFile = function (req, res) {
    var event = fs.readFileSync('app/data/event/' + req.params.id + '.json', 'utf8');
    res.setHeading('Content-Type', 'application/json');
    res.send(event);
};

exports.saveEventFile = function (req, res) {
    var event = req.body;
    fs.writeFileSync('app/data/event/' + req.params.id + '.json');
    res.send(event);
};


/**
 * Create an Event
 */
exports.create = function (req, res) {
    var event = new Event(req.body);
    event.user = req.user;

    event.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(event);
        }
    });
};

/**
 * Show the current Event
 */
exports.read = function (req, res) {
    res.jsonp(req.event);
};

/**
 * Update a Event
 */
exports.update = function (req, res) {
    var event = req.event;

    event = _.extend(event, req.body);

    event.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(event);
        }
    });
};

/**
 * Delete an Event
 */
exports.delete = function (req, res) {
    var event = req.event;

    event.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(event);
        }
    });
};

/**
 * List of Events
 */
exports.list = function (req, res) {

    Event.find().sort('-created').populate('user', 'displayName')
        .exec(function (err, events) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.jsonp(events);
            }
        });
};

/**
 * Event middleware
 */
exports.eventByID = function (req, res, next, id) {
    Event.findById(id).populate('user', 'displayName').exec(function (err, event) {
        if (err) return next(err);
        if (!event) return next(new Error('Failed to load Event ' + id));
        req.event = event;
        next();
    });
};

/**
 * Event authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
    if (req.event.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }
    next();
};