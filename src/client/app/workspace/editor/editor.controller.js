(function() {
	'use strict';

	angular
		.module('phEditor')
		.controller('Editor', Editor);

	Editor.$inject = ['documentStorage'];

	function Editor(documentStorage) {
		var vm = this;
		vm.documentId = 1; // TODO
		documentStorage.loadDocument(vm.documentId).then(function(doc) {
			vm.editorVM = new PeopleHistory.Editor.EditorViewModel(doc);
		});
	}

})();
