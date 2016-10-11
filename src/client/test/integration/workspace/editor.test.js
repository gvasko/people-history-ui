describe("Editor Integration Test", function() {
	var templateHtml;
	var editorElement;
	var jqElement;
	var $compile, $rootScope;

	beforeEach(function() {
		module("phEditor");
		module("phDocumentStorage");
		module("templates");

		inject(function($templateCache) {
			templateHtml = $templateCache.get("app/workspace/editor/editor.html");
		});

		inject(function(_$compile_, _$rootScope_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			editorElement = angular.element(templateHtml);
			jqElement = $compile(editorElement)($rootScope);
			$rootScope.$digest();
		});


	});
	
	var numberOf = function(q) {
		return $(jqElement).find(q).length;
	}

	it("initialized", function() {
		expect(numberOf("ph-editor-panel")).toEqual(4);

		expect(numberOf("ph-editor-panel[name='people']")).toEqual(1);
		expect(numberOf("ph-editor-panel[name='personalEvents']")).toEqual(1);
		expect(numberOf("ph-editor-panel[name='relationships']")).toEqual(1);
		expect(numberOf("ph-editor-panel[name='relationshipEvents']")).toEqual(1);

		expect(numberOf("ph-editor-panel[name='people'] nav button.btn")).toEqual(3);
		expect(numberOf("ph-editor-panel[name='personalEvents'] nav button.btn")).toEqual(3);
		expect(numberOf("ph-editor-panel[name='relationships'] nav button.btn")).toEqual(3);
		expect(numberOf("ph-editor-panel[name='relationshipEvents'] nav button.btn")).toEqual(0);
	});

});
