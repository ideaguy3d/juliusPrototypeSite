'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Sciproto = mongoose.model('Sciproto'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, sciproto;

/**
 * Sciproto routes tests
 */
describe('Sciproto CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Sciproto
		user.save(function() {
			sciproto = {
				name: 'Sciproto Name'
			};

			done();
		});
	});

	it('should be able to save Sciproto instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sciproto
				agent.post('/sciprotos')
					.send(sciproto)
					.expect(200)
					.end(function(sciprotoSaveErr, sciprotoSaveRes) {
						// Handle Sciproto save error
						if (sciprotoSaveErr) done(sciprotoSaveErr);

						// Get a list of Sciprotos
						agent.get('/sciprotos')
							.end(function(sciprotosGetErr, sciprotosGetRes) {
								// Handle Sciproto save error
								if (sciprotosGetErr) done(sciprotosGetErr);

								// Get Sciprotos list
								var sciprotos = sciprotosGetRes.body;

								// Set assertions
								(sciprotos[0].user._id).should.equal(userId);
								(sciprotos[0].name).should.match('Sciproto Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Sciproto instance if not logged in', function(done) {
		agent.post('/sciprotos')
			.send(sciproto)
			.expect(401)
			.end(function(sciprotoSaveErr, sciprotoSaveRes) {
				// Call the assertion callback
				done(sciprotoSaveErr);
			});
	});

	it('should not be able to save Sciproto instance if no name is provided', function(done) {
		// Invalidate name field
		sciproto.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sciproto
				agent.post('/sciprotos')
					.send(sciproto)
					.expect(400)
					.end(function(sciprotoSaveErr, sciprotoSaveRes) {
						// Set message assertion
						(sciprotoSaveRes.body.message).should.match('Please fill Sciproto name');
						
						// Handle Sciproto save error
						done(sciprotoSaveErr);
					});
			});
	});

	it('should be able to update Sciproto instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sciproto
				agent.post('/sciprotos')
					.send(sciproto)
					.expect(200)
					.end(function(sciprotoSaveErr, sciprotoSaveRes) {
						// Handle Sciproto save error
						if (sciprotoSaveErr) done(sciprotoSaveErr);

						// Update Sciproto name
						sciproto.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Sciproto
						agent.put('/sciprotos/' + sciprotoSaveRes.body._id)
							.send(sciproto)
							.expect(200)
							.end(function(sciprotoUpdateErr, sciprotoUpdateRes) {
								// Handle Sciproto update error
								if (sciprotoUpdateErr) done(sciprotoUpdateErr);

								// Set assertions
								(sciprotoUpdateRes.body._id).should.equal(sciprotoSaveRes.body._id);
								(sciprotoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Sciprotos if not signed in', function(done) {
		// Create new Sciproto model instance
		var sciprotoObj = new Sciproto(sciproto);

		// Save the Sciproto
		sciprotoObj.save(function() {
			// Request Sciprotos
			request(app).get('/sciprotos')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Sciproto if not signed in', function(done) {
		// Create new Sciproto model instance
		var sciprotoObj = new Sciproto(sciproto);

		// Save the Sciproto
		sciprotoObj.save(function() {
			request(app).get('/sciprotos/' + sciprotoObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', sciproto.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Sciproto instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sciproto
				agent.post('/sciprotos')
					.send(sciproto)
					.expect(200)
					.end(function(sciprotoSaveErr, sciprotoSaveRes) {
						// Handle Sciproto save error
						if (sciprotoSaveErr) done(sciprotoSaveErr);

						// Delete existing Sciproto
						agent.delete('/sciprotos/' + sciprotoSaveRes.body._id)
							.send(sciproto)
							.expect(200)
							.end(function(sciprotoDeleteErr, sciprotoDeleteRes) {
								// Handle Sciproto error error
								if (sciprotoDeleteErr) done(sciprotoDeleteErr);

								// Set assertions
								(sciprotoDeleteRes.body._id).should.equal(sciprotoSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Sciproto instance if not signed in', function(done) {
		// Set Sciproto user 
		sciproto.user = user;

		// Create new Sciproto model instance
		var sciprotoObj = new Sciproto(sciproto);

		// Save the Sciproto
		sciprotoObj.save(function() {
			// Try deleting Sciproto
			request(app).delete('/sciprotos/' + sciprotoObj._id)
			.expect(401)
			.end(function(sciprotoDeleteErr, sciprotoDeleteRes) {
				// Set message assertion
				(sciprotoDeleteRes.body.message).should.match('User is not logged in');

				// Handle Sciproto error error
				done(sciprotoDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Sciproto.remove().exec();
		done();
	});
});