'use strict';

(function() {
	// Resultats Controller Spec
	describe('Resultats Controller Tests', function() {
		// Initialize global variables
		var ResultatsController,
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

			// Initialize the Resultats controller.
			ResultatsController = $controller('ResultatsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Resultat object fetched from XHR', inject(function(Resultats) {
			// Create sample Resultat using the Resultats service
			var sampleResultat = new Resultats({
				name: 'New Resultat'
			});

			// Create a sample Resultats array that includes the new Resultat
			var sampleResultats = [sampleResultat];

			// Set GET response
			$httpBackend.expectGET('resultats').respond(sampleResultats);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.resultats).toEqualData(sampleResultats);
		}));

		it('$scope.findOne() should create an array with one Resultat object fetched from XHR using a resultatId URL parameter', inject(function(Resultats) {
			// Define a sample Resultat object
			var sampleResultat = new Resultats({
				name: 'New Resultat'
			});

			// Set the URL parameter
			$stateParams.resultatId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/resultats\/([0-9a-fA-F]{24})$/).respond(sampleResultat);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.resultat).toEqualData(sampleResultat);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Resultats) {
			// Create a sample Resultat object
			var sampleResultatPostData = new Resultats({
				name: 'New Resultat'
			});

			// Create a sample Resultat response
			var sampleResultatResponse = new Resultats({
				_id: '525cf20451979dea2c000001',
				name: 'New Resultat'
			});

			// Fixture mock form input values
			scope.name = 'New Resultat';

			// Set POST response
			$httpBackend.expectPOST('resultats', sampleResultatPostData).respond(sampleResultatResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Resultat was created
			expect($location.path()).toBe('/resultats/' + sampleResultatResponse._id);
		}));

		it('$scope.update() should update a valid Resultat', inject(function(Resultats) {
			// Define a sample Resultat put data
			var sampleResultatPutData = new Resultats({
				_id: '525cf20451979dea2c000001',
				name: 'New Resultat'
			});

			// Mock Resultat in scope
			scope.resultat = sampleResultatPutData;

			// Set PUT response
			$httpBackend.expectPUT(/resultats\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/resultats/' + sampleResultatPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid resultatId and remove the Resultat from the scope', inject(function(Resultats) {
			// Create new Resultat object
			var sampleResultat = new Resultats({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Resultats array and include the Resultat
			scope.resultats = [sampleResultat];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/resultats\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleResultat);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.resultats.length).toBe(0);
		}));
	});
}());