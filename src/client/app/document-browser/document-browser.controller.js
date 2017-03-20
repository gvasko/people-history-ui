(function() {
	'use strict';

	angular
		.module('phDocumentBrowser')
		.controller('DocumentBrowser', DocumentBrowser);

	DocumentBrowser.$inject = ['documentStorage'];

	function DocumentBrowser(documentStorage) {
		var vm = this;
		documentStorage.getDocumentList().then(function(docList) {
			vm.documents = docList;
		});
	}

})();
