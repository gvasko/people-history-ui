'use strict';

// TODO: this is not a viewmodel, it is rather a DTO

function DocumentViewModel() {
	
}

DocumentViewModel.prototype.getAllPeople = function() {
	var people = [
		new Person(1, 'Mary', 'Moe', 'mary@example.com'),
		new Person(2, 'John', 'Doe', 'john@example.com'),
		new Person(3, 'July', 'Dooley', 'july@example.com'),
		new Person(4, 'John', 'Doe', 'john@example.com'),
		new Person(5, 'Mary', 'Moe', 'mary@example.com'),
		new Person(6, 'July', 'Dooley', 'july@example.com')
	];
	return people;
};

DocumentViewModel.prototype.getPersonalEventsOf = function(personId) {
	var eventsMary = [
		new PersonalEvent(1, 'Born', '1927', 'Budapest'),
		new PersonalEvent(2, 'Got married', '1949', 'Debrecen'),
		new PersonalEvent(3, 'Died', '2017', 'Nyiregyhaza')
	];

	var eventsJohn = [
		new PersonalEvent(4, 'Born', '1917', 'Szerencs'),
		new PersonalEvent(5, 'Got married', '1939', 'Miskolc'),
		new PersonalEvent(6, 'Died', '2007', 'Szikszo')
	];

	var eventsJuly = [
		new PersonalEvent(6, 'Born', '1937', 'Miskolc'),
		new PersonalEvent(6, 'Got married', '1959', 'Szeged'),
		new PersonalEvent(6, 'Died', '2017', 'Miskolc')
	];

	var allEvents = [null, eventsMary, eventsJohn, eventsJuly, eventsMary, eventsJohn, eventsJuly];

	return allEvents[personId];
};

DocumentViewModel.prototype.getRelationshipsOf = function(personId) {
	return [
		new Relationship(1, 'Father', 'John Doe'),
		new Relationship(2, 'Mother', 'Mary Moe'),
		new Relationship(3, 'Sister', 'July Dooley')
	];
};

DocumentViewModel.prototype.getRelationEventsOf = function(relationId) {
	return [
		new RelationshipEvent(3, 'Started', '1934', 'Something'),
		new RelationshipEvent(3, 'Ended', '1939', 'Something else'),
		new RelationshipEvent(3, 'Who knows', '1966', 'Remember')
	];
};

