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
					if (scope.selectedRow === row) {
						scope.selectedRow = -1;
					} else {
						scope.selectedRow = row;
					}
					if (!!scope.vm.eventHandlers.selectionChanged) {
						scope.vm.eventHandlers.selectionChanged(scope.getActionEnvironment());
					} else {
						console.log("Event handler not found for selectionChanged");
					}
				}
				scope.getActionEnvironment = function() {
					return new PeopleHistory.Document.ActionEnvironment(scope.selectedRow);
				}
			}
		};
		return directive;
	}
})();
