describe("Editor Integration Test", function() {
	var templateHtml;
	var editorElement;
	var jqElement;
	var $compile, $rootScope;
	var EditorDSL;

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
			//$rootScope.$applyAsync();
			$rootScope.$digest();
		});

		EditorDSL = function() {
			return new PeopleHistory.TestUtils.EditorDSL(jqElement);
		};

	});

	afterEach(function() {
		$rootScope.$destroy();
		editorElement.remove();
	});
	
	describe("When initialized", function() {

		it("Then we have 4 panels", function() {
			expect(EditorDSL().panel().count()).toEqual(4);
			expect(EditorDSL().panel("people").count()).toEqual(1);
			expect(EditorDSL().panel("personalEvents").count()).toEqual(1);
			expect(EditorDSL().panel("relationships").count()).toEqual(1);
			expect(EditorDSL().panel("relationshipEvents").count()).toEqual(1);
		});

		it("Then People-panel has 3 buttons", function() {
			expect(EditorDSL().panel("people").navButton().count()).toEqual(3);
		});

		it("Then PersonalEvents-panel has 3 buttons", function() {
			expect(EditorDSL().panel("personalEvents").navButton().count()).toEqual(3);
		});

		it("Then Relationships-panel has 3 buttons", function() {
			expect(EditorDSL().panel("relationships").navButton().count()).toEqual(3);
		});

		it("Then RelationshipEvents-panel has no button", function() {
			expect(EditorDSL().panel("relationshipEvents").navButton().count()).toEqual(0);
		});

		it("Then person can be added only", function() {
			expect(EditorDSL().panel("people").navButton("Add Person").enabled()).toBeTruthy();
			expect(EditorDSL().panel("people").navButton("Edit").enabled()).toBeFalsy();
			expect(EditorDSL().panel("people").navButton("Delete").enabled()).toBeFalsy();
		});

		it("Then no action is available for PersonalEvents", function() {
			expect(EditorDSL().panel("personalEvents").navButton("Add Event").enabled()).toBeFalsy();
			expect(EditorDSL().panel("personalEvents").navButton("Edit").enabled()).toBeFalsy();
			expect(EditorDSL().panel("personalEvents").navButton("Delete").enabled()).toBeFalsy();
		});

		it("Then no action is available for Relationships", function() {
			expect(EditorDSL().panel("relationships").navButton("Add Relationship").enabled()).toBeFalsy();
			expect(EditorDSL().panel("relationships").navButton("Edit").enabled()).toBeFalsy();
			expect(EditorDSL().panel("relationships").navButton("Delete").enabled()).toBeFalsy();
		});

		describe("When selecting a person", function() {

			beforeEach(function() {
				EditorDSL().panel("people").tableRow(1).firstCell().click();
			});

			it("Then person can be edited and deleted", function() {
				expect(EditorDSL().panel("people").navButton("Add Person").enabled()).toBeTruthy();
				expect(EditorDSL().panel("people").navButton("Edit").enabled()).toBeTruthy();
				expect(EditorDSL().panel("people").navButton("Delete").enabled()).toBeTruthy();
			});

			it("Then personal event can be added", function() {
				expect(EditorDSL().panel("personalEvents").navButton("Add Event").enabled()).toBeTruthy();
				expect(EditorDSL().panel("personalEvents").navButton("Edit").enabled()).toBeFalsy();
				expect(EditorDSL().panel("personalEvents").navButton("Delete").enabled()).toBeFalsy();
			});

			it("Then relationship can be added", function() {
				expect(EditorDSL().panel("relationships").navButton("Add Relationship").enabled()).toBeTruthy();
				expect(EditorDSL().panel("relationships").navButton("Edit").enabled()).toBeFalsy();
				expect(EditorDSL().panel("relationships").navButton("Delete").enabled()).toBeFalsy();
			});

			it("Then we get 3 personal-events", function() {
				expect(EditorDSL().panel("personalEvents").tableRow().count()).toEqual(3);
			});

			it("Then we get 3 relationships", function() {
				expect(EditorDSL().panel("relationships").tableRow().count()).toEqual(3);
			});

			describe("When selecting another person", function() {

				beforeEach(function() {
					EditorDSL().panel("people").tableRow(2).firstCell().click();
				});

				// TODO: duplicated
				it("Then person can be edited and deleted", function() {
					expect(EditorDSL().panel("people").navButton("Add Person").enabled()).toBeTruthy();
					expect(EditorDSL().panel("people").navButton("Edit").enabled()).toBeTruthy();
					expect(EditorDSL().panel("people").navButton("Delete").enabled()).toBeTruthy();
				});

				it("Then personal event can be added", function() {
					expect(EditorDSL().panel("personalEvents").navButton("Add Event").enabled()).toBeTruthy();
					expect(EditorDSL().panel("personalEvents").navButton("Edit").enabled()).toBeFalsy();
					expect(EditorDSL().panel("personalEvents").navButton("Delete").enabled()).toBeFalsy();
				});

				it("Then relationship can be added", function() {
					expect(EditorDSL().panel("relationships").navButton("Add Relationship").enabled()).toBeTruthy();
					expect(EditorDSL().panel("relationships").navButton("Edit").enabled()).toBeFalsy();
					expect(EditorDSL().panel("relationships").navButton("Delete").enabled()).toBeFalsy();
				});

			});

			describe("When unselecting the person", function() {

				beforeEach(function() {
					EditorDSL().panel("people").tableRow(1).firstCell().click();
				});

				// TODO: duplicated
				it("Then person can be added only", function() {
					expect(EditorDSL().panel("people").navButton("Add Person").enabled()).toBeTruthy();
					expect(EditorDSL().panel("people").navButton("Edit").enabled()).toBeFalsy();
					expect(EditorDSL().panel("people").navButton("Delete").enabled()).toBeFalsy();
				});

				it("Then no action is available for PersonalEvents", function() {
					expect(EditorDSL().panel("personalEvents").navButton("Add Event").enabled()).toBeFalsy();
					expect(EditorDSL().panel("personalEvents").navButton("Edit").enabled()).toBeFalsy();
					expect(EditorDSL().panel("personalEvents").navButton("Delete").enabled()).toBeFalsy();
				});

				it("Then no action is available for Relationships", function() {
					expect(EditorDSL().panel("relationships").navButton("Add Relationship").enabled()).toBeFalsy();
					expect(EditorDSL().panel("relationships").navButton("Edit").enabled()).toBeFalsy();
					expect(EditorDSL().panel("relationships").navButton("Delete").enabled()).toBeFalsy();
				});

				it("Then we get no personal-events", function() {
					expect(EditorDSL().panel("personalEvents").tableRow().count()).toEqual(0);
				});

				it("Then we get no relationships", function() {
					expect(EditorDSL().panel("relationships").tableRow().count()).toEqual(0);
				});


			});

		});
	});
});
