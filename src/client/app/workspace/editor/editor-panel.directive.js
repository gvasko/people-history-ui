(function() {
	'use strict';

	angular
		.module('phEditor')
		.directive('phEditorPanel', phEditorPanel);

	function phEditorPanel() {
		var directive = {
			scope: {
				'vm': '=',
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
					if (angular.isDefined(scope.vm.eventHandlers.selectionChanged)) {
						scope.vm.eventHandlers.selectionChanged(scope.getActionEnvironment());
					}
				}
				scope.getActionEnvironment = function() {
					return {
						initialized: true,
						selected: scope.selectedRow >= 0,
						selectedIndex: scope.selectedRow
					};
				}
			}
		};
		return directive;
	}
})();
