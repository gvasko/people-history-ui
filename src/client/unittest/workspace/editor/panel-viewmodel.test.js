describe("Editor Panel ViewModel", function() {

	var sutPanelVM;

	beforeEach(function() {
		var actionEnvFactory = function() {
			return new PeopleHistory.Document.ActionEnvironment();
		};
		sutPanelVM = new PeopleHistory.Editor.PanelViewModel("dummy", actionEnvFactory);
	});

	it("is initialized", function() {
		expect(sutPanelVM).toBeDefined();
	});
	
});
