(function() {
	'use strict';

	angular
		.module('phEditor')
		.controller('Editor', Editor);

	Editor.$inject = [];

	function Editor() {
		var vm = this;
		vm.people = loadPeople();
		vm.personalEvents = loadPersonalEvents();
		vm.relationships = loadRelationships();
		vm.relationshipEvents = loadRelationshipEvents();

		function loadPeople() {
			return {
				title: 'People',
				data: {
					header : ['FirstName', 'LastName', 'Email'],
					rows : [
						['John', 'Doe', 'john@example.com'],
						['Mary', 'Moe', 'mary@example.com'],
						['July', 'Dooley', 'july@example.com'],
						['John', 'Doe', 'john@example.com'],
						['Mary', 'Moe', 'mary@example.com'],
						['July', 'Dooley', 'july@example.com']
					]
				}

			};
		}

		function loadPersonalEvents() {
			return {
				title: 'Personal Events',
				data: {
					header: ['What', 'When', 'Where'],
					rows: [
						['Born', '1927', 'Budapest'],
						['Got married', '1949', 'Debrecen'],
						['Died', '2017', 'Nyiregyhaza']
					]
				}
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
				}
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
				}
			};
		}
	}

})();
