'use strict';

module.exports = function (app) {
    var users = require('../../app/controllers/users.server.controller');
    var events = require('../../app/controllers/events.server.controller');

    // Events Routes
    app.route('/events')
        .get(events.list)
        .post(users.requiresLogin, events.create);

    app.route('/events/:eventId')
        .get(events.read)
        .put(users.requiresLogin, events.hasAuthorization, events.update)
        .delete(users.requiresLogin, events.hasAuthorization, events.delete);

    //=========== routes that I wrote ===========
    app.route('/events/data/:eventsId')
        .get(events.getEventFile);
    //=========== routes I wrote end ===========

    // Finish by binding the Event middleware
    app.param('eventId', events.eventByID);
};
