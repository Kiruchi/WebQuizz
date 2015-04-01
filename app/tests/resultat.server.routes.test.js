'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Resultat = mongoose.model('Resultat'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, resultat;

/**
 * Resultat routes tests
 */
describe('Resultat CRUD tests', function() {
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

		// Save a user to the test db and create new Resultat
		user.save(function() {
			resultat = {
				name: 'Resultat Name'
			};

			done();
		});
	});

	it('should be able to save Resultat instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Resultat
				agent.post('/resultats')
					.send(resultat)
					.expect(200)
					.end(function(resultatSaveErr, resultatSaveRes) {
						// Handle Resultat save error
						if (resultatSaveErr) done(resultatSaveErr);

						// Get a list of Resultats
						agent.get('/resultats')
							.end(function(resultatsGetErr, resultatsGetRes) {
								// Handle Resultat save error
								if (resultatsGetErr) done(resultatsGetErr);

								// Get Resultats list
								var resultats = resultatsGetRes.body;

								// Set assertions
								(resultats[0].user._id).should.equal(userId);
								(resultats[0].name).should.match('Resultat Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Resultat instance if not logged in', function(done) {
		agent.post('/resultats')
			.send(resultat)
			.expect(401)
			.end(function(resultatSaveErr, resultatSaveRes) {
				// Call the assertion callback
				done(resultatSaveErr);
			});
	});

	it('should not be able to save Resultat instance if no name is provided', function(done) {
		// Invalidate name field
		resultat.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Resultat
				agent.post('/resultats')
					.send(resultat)
					.expect(400)
					.end(function(resultatSaveErr, resultatSaveRes) {
						// Set message assertion
						(resultatSaveRes.body.message).should.match('Please fill Resultat name');
						
						// Handle Resultat save error
						done(resultatSaveErr);
					});
			});
	});

	it('should be able to update Resultat instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Resultat
				agent.post('/resultats')
					.send(resultat)
					.expect(200)
					.end(function(resultatSaveErr, resultatSaveRes) {
						// Handle Resultat save error
						if (resultatSaveErr) done(resultatSaveErr);

						// Update Resultat name
						resultat.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Resultat
						agent.put('/resultats/' + resultatSaveRes.body._id)
							.send(resultat)
							.expect(200)
							.end(function(resultatUpdateErr, resultatUpdateRes) {
								// Handle Resultat update error
								if (resultatUpdateErr) done(resultatUpdateErr);

								// Set assertions
								(resultatUpdateRes.body._id).should.equal(resultatSaveRes.body._id);
								(resultatUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Resultats if not signed in', function(done) {
		// Create new Resultat model instance
		var resultatObj = new Resultat(resultat);

		// Save the Resultat
		resultatObj.save(function() {
			// Request Resultats
			request(app).get('/resultats')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Resultat if not signed in', function(done) {
		// Create new Resultat model instance
		var resultatObj = new Resultat(resultat);

		// Save the Resultat
		resultatObj.save(function() {
			request(app).get('/resultats/' + resultatObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', resultat.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Resultat instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Resultat
				agent.post('/resultats')
					.send(resultat)
					.expect(200)
					.end(function(resultatSaveErr, resultatSaveRes) {
						// Handle Resultat save error
						if (resultatSaveErr) done(resultatSaveErr);

						// Delete existing Resultat
						agent.delete('/resultats/' + resultatSaveRes.body._id)
							.send(resultat)
							.expect(200)
							.end(function(resultatDeleteErr, resultatDeleteRes) {
								// Handle Resultat error error
								if (resultatDeleteErr) done(resultatDeleteErr);

								// Set assertions
								(resultatDeleteRes.body._id).should.equal(resultatSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Resultat instance if not signed in', function(done) {
		// Set Resultat user 
		resultat.user = user;

		// Create new Resultat model instance
		var resultatObj = new Resultat(resultat);

		// Save the Resultat
		resultatObj.save(function() {
			// Try deleting Resultat
			request(app).delete('/resultats/' + resultatObj._id)
			.expect(401)
			.end(function(resultatDeleteErr, resultatDeleteRes) {
				// Set message assertion
				(resultatDeleteRes.body.message).should.match('User is not logged in');

				// Handle Resultat error error
				done(resultatDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Resultat.remove().exec();
		done();
	});
});