'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var sciprotos = require('../../app/controllers/sciprotos.server.controller');

	// Sciprotos Routes
	app.route('/sciprotos')
		.get(sciprotos.list)
		.post(users.requiresLogin, sciprotos.create);

	app.route('/sciprotos/:sciprotoId')
		.get(sciprotos.read)
		.put(users.requiresLogin, sciprotos.hasAuthorization, sciprotos.update)
		.delete(users.requiresLogin, sciprotos.hasAuthorization, sciprotos.delete);

	// Finish by binding the Sciproto middleware
	app.param('sciprotoId', sciprotos.sciprotoByID);
};
