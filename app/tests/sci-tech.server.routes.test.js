'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	SciTech = mongoose.model('SciTech'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, sciTech;

/**
 * Sci tech routes tests
 */
describe('Sci tech CRUD tests', function() {
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

		// Save a user to the test db and create new Sci tech
		user.save(function() {
			sciTech = {
				name: 'Sci tech Name'
			};

			done();
		});
	});

	it('should be able to save Sci tech instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sci tech
				agent.post('/sci-teches')
					.send(sciTech)
					.expect(200)
					.end(function(sciTechSaveErr, sciTechSaveRes) {
						// Handle Sci tech save error
						if (sciTechSaveErr) done(sciTechSaveErr);

						// Get a list of Sci teches
						agent.get('/sci-teches')
							.end(function(sciTechesGetErr, sciTechesGetRes) {
								// Handle Sci tech save error
								if (sciTechesGetErr) done(sciTechesGetErr);

								// Get Sci teches list
								var sciTeches = sciTechesGetRes.body;

								// Set assertions
								(sciTeches[0].user._id).should.equal(userId);
								(sciTeches[0].name).should.match('Sci tech Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Sci tech instance if not logged in', function(done) {
		agent.post('/sci-teches')
			.send(sciTech)
			.expect(401)
			.end(function(sciTechSaveErr, sciTechSaveRes) {
				// Call the assertion callback
				done(sciTechSaveErr);
			});
	});

	it('should not be able to save Sci tech instance if no name is provided', function(done) {
		// Invalidate name field
		sciTech.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sci tech
				agent.post('/sci-teches')
					.send(sciTech)
					.expect(400)
					.end(function(sciTechSaveErr, sciTechSaveRes) {
						// Set message assertion
						(sciTechSaveRes.body.message).should.match('Please fill Sci tech name');
						
						// Handle Sci tech save error
						done(sciTechSaveErr);
					});
			});
	});

	it('should be able to update Sci tech instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sci tech
				agent.post('/sci-teches')
					.send(sciTech)
					.expect(200)
					.end(function(sciTechSaveErr, sciTechSaveRes) {
						// Handle Sci tech save error
						if (sciTechSaveErr) done(sciTechSaveErr);

						// Update Sci tech name
						sciTech.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Sci tech
						agent.put('/sci-teches/' + sciTechSaveRes.body._id)
							.send(sciTech)
							.expect(200)
							.end(function(sciTechUpdateErr, sciTechUpdateRes) {
								// Handle Sci tech update error
								if (sciTechUpdateErr) done(sciTechUpdateErr);

								// Set assertions
								(sciTechUpdateRes.body._id).should.equal(sciTechSaveRes.body._id);
								(sciTechUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Sci teches if not signed in', function(done) {
		// Create new Sci tech model instance
		var sciTechObj = new SciTech(sciTech);

		// Save the Sci tech
		sciTechObj.save(function() {
			// Request Sci teches
			request(app).get('/sci-teches')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Sci tech if not signed in', function(done) {
		// Create new Sci tech model instance
		var sciTechObj = new SciTech(sciTech);

		// Save the Sci tech
		sciTechObj.save(function() {
			request(app).get('/sci-teches/' + sciTechObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', sciTech.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Sci tech instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Sci tech
				agent.post('/sci-teches')
					.send(sciTech)
					.expect(200)
					.end(function(sciTechSaveErr, sciTechSaveRes) {
						// Handle Sci tech save error
						if (sciTechSaveErr) done(sciTechSaveErr);

						// Delete existing Sci tech
						agent.delete('/sci-teches/' + sciTechSaveRes.body._id)
							.send(sciTech)
							.expect(200)
							.end(function(sciTechDeleteErr, sciTechDeleteRes) {
								// Handle Sci tech error error
								if (sciTechDeleteErr) done(sciTechDeleteErr);

								// Set assertions
								(sciTechDeleteRes.body._id).should.equal(sciTechSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Sci tech instance if not signed in', function(done) {
		// Set Sci tech user 
		sciTech.user = user;

		// Create new Sci tech model instance
		var sciTechObj = new SciTech(sciTech);

		// Save the Sci tech
		sciTechObj.save(function() {
			// Try deleting Sci tech
			request(app).delete('/sci-teches/' + sciTechObj._id)
			.expect(401)
			.end(function(sciTechDeleteErr, sciTechDeleteRes) {
				// Set message assertion
				(sciTechDeleteRes.body.message).should.match('User is not logged in');

				// Handle Sci tech error error
				done(sciTechDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		SciTech.remove().exec();
		done();
	});
});