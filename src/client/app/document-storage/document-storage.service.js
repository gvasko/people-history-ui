(function() {
	'use strict';

	angular
		.module("phDocumentStorage")
		.service("documentStorage", documentStorage);

	documentStorage.$inject = ["$q"];

	function documentStorage($q) {
		this.getDocumentList = function() {
			var deferred = $q.defer();
			deferred.resolve(getDummyFileList());
			return deferred.promise;
		};

		this.loadDocument = function(documentId) {
			var deferred = $q.defer();
			// TODO: Build the document here?
			deferred.resolve(new PeopleHistory.Document());
			return deferred.promise;
		};
	}

	function getDummyFileList() {
			return [
				new PeopleHistory.DocumentInfo(1, 'Family-1', 'Some description', 23, '2016-08-11'),
				new PeopleHistory.DocumentInfo(2, 'Family-2', 'Some description', 123, '2016-08-11'),
				new PeopleHistory.DocumentInfo(3, 'Family-3', 'Some description', 143, '2016-08-11'),
				new PeopleHistory.DocumentInfo(4, 'Family-4', 'Some description', 155, '2016-08-11'),
				new PeopleHistory.DocumentInfo(5, 'Family-5', 'Some description', 188, '2016-08-11')
			];
	}


})();
