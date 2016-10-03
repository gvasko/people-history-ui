describe("Editor Panel ViewModel", function() {

	var sutPanelVM;

	beforeEach(function() {
		sutPanelVM = new PeopleHistory.Editor.PanelViewModel("dummy");
	});

	it("is initialized", function() {
		console.log('jasmine-version: ' + (jasmine.version || (jasmine.getEnv().versionString && jasmine.getEnv().versionString())));
		expect(sutPanelVM).toBeDefined();
	});
	
	it("empty table works", function() {
		expect(sutPanelVM.data).toBeDefined();
		expect(sutPanelVM.data.header).toBeDefined();
		expect(sutPanelVM.data.rows).toBeDefined();
		expect(sutPanelVM.eventHandlers).toBeDefined();
		expect(sutPanelVM.actions).toBeDefined();
		expect(sutPanelVM.options).toBeDefined();
	});

	describe("Table Header Handling", function() {

		it("when setting header-mapping then it sets header", function() {
			expect(sutPanelVM.data.header).toEqual([]);
			sutPanelVM.setHeaderMapping({
				foo: "Foo",
				bar: "Bar"
			});
			expect(sutPanelVM.data.header).toEqual(["Foo", "Bar"]);
		});

		it("when setting header then it keeps the header object", function() {
			var initialHeader = sutPanelVM.data.header;
			sutPanelVM.setHeaderMapping({
				foo: "Foo",
				bar: "Bar"
			});
			expect(sutPanelVM.data.header).toBe(initialHeader);
		});

		it("when row to be added contains too few values then throws exception", function() {
			sutPanelVM.setHeaderMapping({
				foo: "Foo",
				bar: "Bar"
			});
			expect(function() {
				sutPanelVM.addRow(["foo"]);
			}).toThrow();
		});

		it("when row to be added contains too many values then throws exception", function() {
			sutPanelVM.setHeaderMapping({
				foo: "Foo",
				bar: "Bar"
			});
			expect(function() {
				sutPanelVM.addRow(["foo", "bar", "foobar"]);
			}).toThrow();
		});

		it("when setting header then it deletes all rows", function() {
			expect(sutPanelVM.getRowCount()).toEqual(0);
			sutPanelVM.setHeaderMapping({
				foo: "Foo",
				bar: "Bar"
			});
			sutPanelVM.addRow(["foo", "bar"]);
			expect(sutPanelVM.getRowCount()).toEqual(1);
			sutPanelVM.setHeaderMapping({
				foo2: "Foo2",
				bar2: "Bar2"
			});
			expect(sutPanelVM.getRowCount()).toEqual(0);
		});

		it("when deleting all rows then it keeps the rows object", function() {
			var initialRows = sutPanelVM.data.rows;
			sutPanelVM.setHeaderMapping({
				foo: "Foo",
				bar: "Bar"
			});
			sutPanelVM.addRow(["foo", "bar"]);
			sutPanelVM.clearData();
			expect(sutPanelVM.getRowCount()).toEqual(0);
			expect(sutPanelVM.data.rows).toBe(initialRows);
		});

	});

	describe("Event Handling", function() {

		it("single event handler stored", function() {

		});

		it("when selection changes then it calls rowSelected", function() {

		});

		it("when unselection then it call selectionCleared", function() {

		});

	});

});
