(function() {
	'use strict';

	angular
		.module("phDocumentStorage")
		.service("documentStorage", documentStorage);

	documentStorage.$inject = [];

	function documentStorage() {
		this.getDocumentList = function() {
			return getDummyFileList();
		};

		this.loadDocument = function(id) {
			return new Document();
		};
	}

	function getDummyFileList() {
			return [
				{
					id: 1,
					title: 'Family-1',
					description: 'Some description',
					peopleCount: 23,
					lastEdited: '2016-08-11'
				},
				{
					id: 2,
					title: 'Family-2',
					description: 'Some description',
					peopleCount: 123,
					lastEdited: '2016-08-11'
				},
				{
					id: 3,
					title: 'Family-3',
					description: 'Some description',
					peopleCount: 143,
					lastEdited: '2016-08-11'
				},
				{
					id: 4,
					title: 'Family-4',
					description: 'Some description',
					peopleCount: 155,
					lastEdited: '2016-08-11'
				},
				{
					id: 5,
					title: 'Family-5',
					description: 'Some description',
					peopleCount: 188,
					lastEdited: '2016-08-11'
				}
			];
	}


})();
