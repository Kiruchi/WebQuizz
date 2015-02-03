'use strict';

(function() {
	// Quizzs Controller Spec
	describe('QuizzsController', function() {
		// Initialize global variables
		var QuizzsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Quizzs controller.
			QuizzsController = $controller('QuizzsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one quizz object fetched from XHR', inject(function(Quizzs) {
			// Create sample quizz using the Quizzs service
			var sampleQuizz = new Quizzs({
				title: 'An Quizz about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample quizzs array that includes the new quizz
			var sampleQuizzs = [sampleQuizz];

			// Set GET response
			$httpBackend.expectGET('quizzs').respond(sampleQuizzs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.quizzs).toEqualData(sampleQuizzs);
		}));

		it('$scope.findOne() should create an array with one quizz object fetched from XHR using a quizzId URL parameter', inject(function(Quizzs) {
			// Define a sample quizz object
			var sampleQuizz = new Quizzs({
				title: 'An Quizz about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.quizzId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/quizzs\/([0-9a-fA-F]{24})$/).respond(sampleQuizz);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.quizz).toEqualData(sampleQuizz);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Quizzs) {
			// Create a sample quizz object
			var sampleQuizzPostData = new Quizzs({
				title: 'An Quizz about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample quizz response
			var sampleQuizzResponse = new Quizzs({
				_id: '525cf20451979dea2c000001',
				title: 'An Quizz about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Quizz about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('quizzs', sampleQuizzPostData).respond(sampleQuizzResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the quizz was created
			expect($location.path()).toBe('/quizzs/' + sampleQuizzResponse._id);
		}));

		it('$scope.update() should update a valid quizz', inject(function(Quizzs) {
			// Define a sample quizz put data
			var sampleQuizzPutData = new Quizzs({
				_id: '525cf20451979dea2c000001',
				title: 'An Quizz about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock quizz in scope
			scope.quizz = sampleQuizzPutData;

			// Set PUT response
			$httpBackend.expectPUT(/quizzs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/quizzs/' + sampleQuizzPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid quizzId and remove the quizz from the scope', inject(function(Quizzs) {
			// Create new quizz object
			var sampleQuizz = new Quizzs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new quizzs array and include the quizz
			scope.quizzs = [sampleQuizz];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/quizzs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleQuizz);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.quizzs.length).toBe(0);
		}));
	});
}());