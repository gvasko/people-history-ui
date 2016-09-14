(function() {
	'use strict';

	angular
		.module('phEditor')
		.directive('phEditorPanel', phEditorPanel);

	function phEditorPanel() {
		var directive = {
			scope: {
				'vm': '='
			},
			templateUrl: 'app/workspace/editor/editor-panel.html',
			restrict: 'E'
		};
		return directive;
	}
})();
