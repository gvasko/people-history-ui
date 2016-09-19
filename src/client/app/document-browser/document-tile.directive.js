(function() {
	'use strict';

	angular
		.module('phDocumentBrowser')
		.directive('phDocumentTile', phDocumentTile);

	function phDocumentTile() {
		var directive = {
			scope: {
				'doc': '='
			},
			templateUrl: 'app/document-browser/document-tile.html',
			restrict: 'E'
		};
		return directive;
	}

})();
