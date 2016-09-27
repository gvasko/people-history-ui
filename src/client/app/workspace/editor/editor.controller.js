(function() {
	'use strict';

	angular
		.module('phEditor')
		.controller('Editor', Editor);

	Editor.$inject = ['documentStorage'];

	function Editor(documentStorage) {
		var vm = this;
		vm.documentId = 1; // TODO
		// TODO: document and EditorViewModel together sounds as totally different things
		documentStorage.loadDocument(vm.documentId).then(function(doc) {
			vm.document = new EditorViewModel(doc);
		});
	}

})();
