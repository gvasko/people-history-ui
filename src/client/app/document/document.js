'use strict';

var PeopleHistory = PeopleHistory || {};

PeopleHistory.Document = function() {
	
}

PeopleHistory.Document.prototype.getAllPeople = function() {
	var people = [
		new PeopleHistory.Person(1, 'Mary', 'Moe', 'mary@example.com'),
		new PeopleHistory.Person(2, 'John', 'Doe', 'john@example.com'),
		new PeopleHistory.Person(3, 'July', 'Dooley', 'july@example.com'),
		new PeopleHistory.Person(4, 'John', 'Doe', 'john@example.com'),
		new PeopleHistory.Person(5, 'Mary', 'Moe', 'mary@example.com'),
		new PeopleHistory.Person(6, 'July', 'Dooley', 'july@example.com')
	];
	return people;
};

PeopleHistory.Document.prototype.getPersonalEventsOf = function(personId) {
	var eventsMary = [
		new PeopleHistory.PersonalEvent(1, 'Born', '1927', 'Budapest'),
		new PeopleHistory.PersonalEvent(2, 'Got married', '1949', 'Debrecen'),
		new PeopleHistory.PersonalEvent(3, 'Died', '2017', 'Nyiregyhaza')
	];

	var eventsJohn = [
		new PeopleHistory.PersonalEvent(4, 'Born', '1917', 'Szerencs'),
		new PeopleHistory.PersonalEvent(5, 'Got married', '1939', 'Miskolc'),
		new PeopleHistory.PersonalEvent(6, 'Died', '2007', 'Szikszo')
	];

	var eventsJuly = [
		new PeopleHistory.PersonalEvent(6, 'Born', '1937', 'Miskolc'),
		new PeopleHistory.PersonalEvent(6, 'Got married', '1959', 'Szeged'),
		new PeopleHistory.PersonalEvent(6, 'Died', '2017', 'Miskolc')
	];

	var allEvents = [null, eventsMary, eventsJohn, eventsJuly, eventsMary, eventsJohn, eventsJuly];

	return allEvents[personId];
};

PeopleHistory.Document.prototype.getRelationshipsOf = function(personId) {
	var relationsMary = [
		new PeopleHistory.Relationship(1, 'Father', 'John Doe 1'),
		new PeopleHistory.Relationship(2, 'Mother', 'Mary Moe 1'),
		new PeopleHistory.Relationship(3, 'Sister', 'July Dooley 1')
	];

	var relationsJohn = [
		new PeopleHistory.Relationship(1, 'Father', 'John Doe 2'),
		new PeopleHistory.Relationship(2, 'Mother', 'Mary Moe 2'),
		new PeopleHistory.Relationship(3, 'Sister', 'July Dooley 2')
	];

	var relationsJuly = [
		new PeopleHistory.Relationship(1, 'Father', 'John Doe 3'),
		new PeopleHistory.Relationship(2, 'Mother', 'Mary Moe 3'),
		new PeopleHistory.Relationship(3, 'Sister', 'July Dooley 3')
	];

	var allRelations = [null, relationsMary, relationsJohn, relationsJuly, relationsMary, relationsJohn, relationsJuly];

	return allRelations[personId];
};

PeopleHistory.Document.prototype.getRelationEventsOf = function(relationId) {
	return [
		new PeopleHistory.RelationshipEvent(3, 'Started', '1934', 'Something'),
		new PeopleHistory.RelationshipEvent(3, 'Ended', '1939', 'Something else'),
		new PeopleHistory.RelationshipEvent(3, 'Who knows', '1966', 'Remember')
	];
};

