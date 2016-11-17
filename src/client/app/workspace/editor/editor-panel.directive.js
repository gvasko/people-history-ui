(function() {
	'use strict';

	angular
		.module('phEditor')
		.directive('phEditorPanel', phEditorPanel);

	function phEditorPanel() {
		var directive = {
			scope: {
				'vm': '=',
				'name': '='
			},
			templateUrl: 'app/workspace/editor/editor-panel.html',
			restrict: 'E',
			link: function(scope) {
				scope.selectRow = function(row) {
					scope.vm.actionEnvironment.toggleSelection(row);
					if (!!scope.vm.eventHandlers.selectionChanged) {
						scope.vm.eventHandlers.selectionChanged(scope.vm.actionEnvironment);
					} else {
						console.log("Event handler not found for selectionChanged");
					}
				}
			}
		};
		return directive;
	}
})();
