(function() {
	'use strict';

	var app = angular.module('app', [
		'ngRoute',
		'phDocumentBrowser'
	]);

	app.config(function($routeProvider, $locationProvider) {

		$routeProvider.when('/home', {
			templateUrl: 'app/main-page/home.html'
		});

		$routeProvider.when('/documents', {
			templateUrl: 'app/document-browser/document-browser.html'
		});

		$routeProvider.when('/workspace', {
			templateUrl: 'app/workspace/workspace.html'
		});

		$routeProvider.otherwise({ redirectTo: '/home'});

		// $locationProvider.html5Mode({
		// 	enabled: true,
		// 	requireBase: false
		// });

	});

	app.run(['$rootScope', function($rootScope) {
		console.log('Adding route loggers ...');

		$rootScope.$on("$stateChangeError", console.log.bind(console));

		$rootScope.$on('$routeChangeStart', function(event, next, current) {
			var currentPath = angular.isUndefined(current) ? '#' : current.originalPath;
			var nextPath = next.originalPath;
			console.log('Starting to leave %s to go to %s', currentPath, nextPath);
		});

		$rootScope.$on('$reload', function(event) {
			console.log('Reloading');
		});

		$rootScope.$on('$routeChangeError', function(event, current, previous) {
			var prevPath = angular.isUndefined(previous) ? '#' : previous.originalPath;
			var currentPath = angular.isUndefined(current) ? '#' : current.originalPath;
			console.log('Route error: from %s to %s', prevPath, currentPath);
		});

		console.log('... done');
	}]);
	
})();