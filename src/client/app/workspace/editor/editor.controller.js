(function() {
	'use strict';

	angular
		.module('phEditor')
		.controller('Editor', Editor);

	Editor.$inject = ['documentStorage'];

	function Editor(documentStorage) {
		var vm = this;
		vm.documentId = 1; // TODO
		// TODO: document and EditorViewModel together sounds as totally different things
		documentStorage.loadDocument(vm.documentId).then(function(documentViewModel) {
			vm.document = new EditorViewModel(documentViewModel);
		});
/*		
		vm.document = {
			people: loadPeople(),
			personalEvents: loadPersonalEvents(),
			relationships: loadRelationships(),
			relationshipEvents: loadRelationshipEvents(),


			// TODO: row is for testing purposes
			selectPerson: function(row) {
				var newPE = loadPersonalEvents(this.people.data.rows[row][1]);
				this.personalEvents.data = newPE.data;
			},
			unselectPerson: function() {
				this.personalEvents.data.rows = [];
			}
		};

		function loadPeople() {
			return {
				title: 'People',
				data: {
					header : ['FirstName', 'LastName', 'Email'],
					rows : [
						['Mary', 'Moe', 'mary@example.com'],
						['John', 'Doe', 'john@example.com'],
						['July', 'Dooley', 'july@example.com'],
						['John', 'Doe', 'john@example.com'],
						['Mary', 'Moe', 'mary@example.com'],
						['July', 'Dooley', 'july@example.com']
					]
				},
				eventHandlers: {
					selectionChanged: setCurrentPerson
				},
				actions: [
					// TODO: use ctor
					{ name: "Add Person", action: nop, enabled: whenInitialized },
					{ name: "Edit", action: nop, enabled: whenSelected },
					{ name: "Delete", action: nop, enabled: whenSelected }
				],
				options: [
					{ name: "Columns", action: nop, enabled: whenInitialized },
				]
			};
		}

		function loadPersonalEvents(person) {
			switch (person) {
				case "Moe":
					return loadPersonalEventsMoe();
				case "Dooley":
					return loadPersonalEventsDooley();
				default:
					return loadPersonalEventsDoe();
			}
		}

		function loadPersonalEventsDoe() {
			return {
				title: 'Personal Events',
				data: {
					header: ['What', 'When', 'Where'],
					rows: [
						['Born', '1927', 'Budapest'],
						['Got married', '1949', 'Debrecen'],
						['Died', '2017', 'Nyiregyhaza']
					]
				},
				eventHandlers: {
					selectionChanged: nop
				},
				actions: [
					// TODO: use ctor
					{ name: "Add Event", action: nop, enabled: whenInitialized },
					{ name: "Edit", action: nop, enabled: whenSelected },
					{ name: "Delete", action: nop, enabled: whenSelected }
				],
				options: [
					{ name: "Columns", action: nop, enabled: whenInitialized },
					{ name: "Event Types", action: nop, enabled: whenInitialized }
				]
			};
		}

		function loadPersonalEventsDooley() {
			return {
				title: 'Personal Events',
				data: {
					header: ['What', 'When', 'Where'],
					rows: [
						['Born', '1917', 'Szerencs'],
						['Got married', '1939', 'Miskolc'],
						['Died', '2007', 'Szikszo']
					]
				},
				eventHandlers: {
					selectionChanged: nop
				},
				actions: [
					// TODO: use ctor
					{ name: "Add Event", action: nop, enabled: whenInitialized },
					{ name: "Edit", action: nop, enabled: whenSelected },
					{ name: "Delete", action: nop, enabled: whenSelected }
				],
				options: [
					{ name: "Columns", action: nop, enabled: whenInitialized },
					{ name: "Event Types", action: nop, enabled: whenInitialized }
				]
			};
		}

		function loadPersonalEventsMoe() {
			return {
				title: 'Personal Events',
				data: {
					header: ['What', 'When', 'Where'],
					rows: [
						['Born', '1937', 'Miskolc'],
						['Got married', '1959', 'Szeged'],
						['Died', '2017', 'Miskolc']
					]
				},
				eventHandlers: {
					selectionChanged: nop
				},
				actions: [
					// TODO: use ctor
					{ name: "Add Event", action: nop, enabled: whenInitialized },
					{ name: "Edit", action: nop, enabled: whenSelected },
					{ name: "Delete", action: nop, enabled: whenSelected }
				],
				options: [
					{ name: "Columns", action: nop, enabled: whenInitialized },
					{ name: "Event Types", action: nop, enabled: whenInitialized }
				]
			};
		}

		function loadRelationships() {
			return {
				title: 'Relationships',
				data: {
					header: ['Type', 'Who'],
					rows: [
						['Father', 'John Doe'],
						['Mother', 'Mary Moe'],
						['Sister', 'July Dooley']
					]
				},
				eventHandlers: {
					selectionChanged: nop
				},
				actions: [
					// TODO: use ctor
					{ name: "Add Event", action: nop, enabled: whenInitialized },
					{ name: "Edit", action: nop, enabled: whenSelected },
					{ name: "Delete", action: nop, enabled: whenSelected }
				],
				options: [
					{ name: "Columns", action: nop, enabled: whenInitialized },
					{ name: "Relation Types", action: nop, enabled: whenInitialized }
				]

			};
		}

		function loadRelationshipEvents() {
			return {
				title: 'Relationship Events',
				data: {
					header: ['What', 'When', 'Reason'],
					rows: [
						['Started', '1934', 'Something'],
						['Ended', '1939', 'Something else'],
						['Who knows', '1966', 'Remember']
					]
				},
				eventHandlers: {
					selectionChanged: nop
				},
				actions: [
					// TODO: use ctor
					{ name: "Add Event", action: nop, enabled: whenInitialized },
					{ name: "Edit", action: nop, enabled: whenSelected },
					{ name: "Delete", action: nop, enabled: whenSelected }
				],
				options: [
					{ name: "Columns", action: nop, enabled: whenInitialized },
					{ name: "Event Types", action: nop, enabled: whenInitialized }
				]

			};
		}

		function nop() {
			console.log("nop");
		}

		function setCurrentPerson(actionEnvironment) {
			if (actionEnvironment.selected) {
				vm.document.selectPerson(actionEnvironment.selectedIndex);
			} else {
				vm.document.unselectPerson();
			}
		}

		function enabled() {
			return true;
		}

		function whenInitialized(actionEnvironment) {
			return actionEnvironment.initialized;
		}

		function whenSelected(actionEnvironment) {
			return actionEnvironment.selected;
		}
*/
	}

})();
