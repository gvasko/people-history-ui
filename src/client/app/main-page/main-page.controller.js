(function() {
	'use strict';

	angular
		.module('phMainPage')
		.controller('MainPage', MainPage);

	MainPage.$inject = ['$http'];

	function MainPage($http) {
		var vm = this;
		$http.get("tag.json").then(function(tagJson) {
			vm.tag = tagJson.data;
		});
	}
})();
