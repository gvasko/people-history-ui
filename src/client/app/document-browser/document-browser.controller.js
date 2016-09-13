(function() {
	'use strict';

	angular
		.module('phDocumentBrowser')
		.controller('DocumentBrowser', DocumentBrowser);

	DocumentBrowser.$inject = [];

	function DocumentBrowser() {
		var vm = this;
		vm.documents = loadDocuments();

		function loadDocuments() {
			return [
				{
					title: 'Family-1',
					description: 'Some description',
					peopleCount: 23,
					lastEdited: '2016-08-11'
				},
				{
					title: 'Family-2',
					description: 'Some description',
					peopleCount: 123,
					lastEdited: '2016-08-11'
				},
				{
					title: 'Family-3',
					description: 'Some description',
					peopleCount: 143,
					lastEdited: '2016-08-11'
				},
				{
					title: 'Family-4',
					description: 'Some description',
					peopleCount: 155,
					lastEdited: '2016-08-11'
				},
				{
					title: 'Family-5',
					description: 'Some description',
					peopleCount: 188,
					lastEdited: '2016-08-11'
				}
			];
		}
	}



})();
