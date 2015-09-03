'use strict';

(function() {
	// Sciprotos Controller Spec
	describe('Sciprotos Controller Tests', function() {
		// Initialize global variables
		var SciprotosController,
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

			// Initialize the Sciprotos controller.
			SciprotosController = $controller('SciprotosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Sciproto object fetched from XHR', inject(function(Sciprotos) {
			// Create sample Sciproto using the Sciprotos service
			var sampleSciproto = new Sciprotos({
				name: 'New Sciproto'
			});

			// Create a sample Sciprotos array that includes the new Sciproto
			var sampleSciprotos = [sampleSciproto];

			// Set GET response
			$httpBackend.expectGET('sciprotos').respond(sampleSciprotos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.sciprotos).toEqualData(sampleSciprotos);
		}));

		it('$scope.findOne() should create an array with one Sciproto object fetched from XHR using a sciprotoId URL parameter', inject(function(Sciprotos) {
			// Define a sample Sciproto object
			var sampleSciproto = new Sciprotos({
				name: 'New Sciproto'
			});

			// Set the URL parameter
			$stateParams.sciprotoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/sciprotos\/([0-9a-fA-F]{24})$/).respond(sampleSciproto);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.sciproto).toEqualData(sampleSciproto);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Sciprotos) {
			// Create a sample Sciproto object
			var sampleSciprotoPostData = new Sciprotos({
				name: 'New Sciproto'
			});

			// Create a sample Sciproto response
			var sampleSciprotoResponse = new Sciprotos({
				_id: '525cf20451979dea2c000001',
				name: 'New Sciproto'
			});

			// Fixture mock form input values
			scope.name = 'New Sciproto';

			// Set POST response
			$httpBackend.expectPOST('sciprotos', sampleSciprotoPostData).respond(sampleSciprotoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Sciproto was created
			expect($location.path()).toBe('/sciprotos/' + sampleSciprotoResponse._id);
		}));

		it('$scope.update() should update a valid Sciproto', inject(function(Sciprotos) {
			// Define a sample Sciproto put data
			var sampleSciprotoPutData = new Sciprotos({
				_id: '525cf20451979dea2c000001',
				name: 'New Sciproto'
			});

			// Mock Sciproto in scope
			scope.sciproto = sampleSciprotoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/sciprotos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/sciprotos/' + sampleSciprotoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid sciprotoId and remove the Sciproto from the scope', inject(function(Sciprotos) {
			// Create new Sciproto object
			var sampleSciproto = new Sciprotos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Sciprotos array and include the Sciproto
			scope.sciprotos = [sampleSciproto];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/sciprotos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSciproto);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.sciprotos.length).toBe(0);
		}));
	});
}());