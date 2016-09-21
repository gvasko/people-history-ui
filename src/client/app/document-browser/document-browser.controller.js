(function() {
	'use strict';

	angular
		.module('phDocumentBrowser')
		.controller('DocumentBrowser', DocumentBrowser);

	DocumentBrowser.$inject = ['documentStorage'];

	function DocumentBrowser(documentStorage) {
		var vm = this;
		vm.documents = documentStorage.getDocumentList();
	}



})();
