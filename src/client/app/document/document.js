'use strict';

var PeopleHistory = PeopleHistory || {};
if (PeopleHistory.Document === undefined) {
	PeopleHistory.Document = {};
}

PeopleHistory.Document.Document = function() {
	
}

PeopleHistory.Document.Document.prototype.getAllPeople = function() {
	var people = [
		new PeopleHistory.Document.Person(1, 'Mary', 'Moe', 'mary@example.com'),
		new PeopleHistory.Document.Person(2, 'John', 'Doe', 'john@example.com'),
		new PeopleHistory.Document.Person(3, 'July', 'Dooley', 'july@example.com'),
		new PeopleHistory.Document.Person(4, 'John', 'Doe', 'john@example.com'),
		new PeopleHistory.Document.Person(5, 'Mary', 'Moe', 'mary@example.com'),
		new PeopleHistory.Document.Person(6, 'July', 'Dooley', 'july@example.com')
	];
	return people;
};

PeopleHistory.Document.Document.prototype.getPersonalEventsOf = function(personId) {
	var eventsMary = [
		new PeopleHistory.Document.PersonalEvent(1, 'Born', '1927', 'Budapest'),
		new PeopleHistory.Document.PersonalEvent(2, 'Got married', '1949', 'Debrecen'),
		new PeopleHistory.Document.PersonalEvent(3, 'Died', '2017', 'Nyiregyhaza')
	];

	var eventsJohn = [
		new PeopleHistory.Document.PersonalEvent(4, 'Born', '1917', 'Szerencs'),
		new PeopleHistory.Document.PersonalEvent(5, 'Got married', '1939', 'Miskolc'),
		new PeopleHistory.Document.PersonalEvent(6, 'Died', '2007', 'Szikszo')
	];

	var eventsJuly = [
		new PeopleHistory.Document.PersonalEvent(6, 'Born', '1937', 'Miskolc'),
		new PeopleHistory.Document.PersonalEvent(6, 'Got married', '1959', 'Szeged'),
		new PeopleHistory.Document.PersonalEvent(6, 'Died', '2017', 'Miskolc')
	];

	var allEvents = [null, eventsMary, eventsJohn, eventsJuly, eventsMary, eventsJohn, eventsJuly];

	return allEvents[personId];
};

PeopleHistory.Document.Document.prototype.getRelationshipsOf = function(personId) {
	var relationsMary = [
		new PeopleHistory.Document.Relationship(1, 'Father', 'John Doe 1'),
		new PeopleHistory.Document.Relationship(2, 'Mother', 'Mary Moe 1'),
		new PeopleHistory.Document.Relationship(3, 'Sister', 'July Dooley 1')
	];

	var relationsJohn = [
		new PeopleHistory.Document.Relationship(1, 'Father', 'John Doe 2'),
		new PeopleHistory.Document.Relationship(2, 'Mother', 'Mary Moe 2'),
		new PeopleHistory.Document.Relationship(3, 'Sister', 'July Dooley 2')
	];

	var relationsJuly = [
		new PeopleHistory.Document.Relationship(1, 'Father', 'John Doe 3'),
		new PeopleHistory.Document.Relationship(2, 'Mother', 'Mary Moe 3'),
		new PeopleHistory.Document.Relationship(3, 'Sister', 'July Dooley 3')
	];

	var allRelations = [null, relationsMary, relationsJohn, relationsJuly, relationsMary, relationsJohn, relationsJuly];

	return allRelations[personId];
};

PeopleHistory.Document.Document.prototype.getRelationEventsOf = function(relationId) {
	return [
		new PeopleHistory.Document.RelationshipEvent(3, 'Started', '1934', 'Something'),
		new PeopleHistory.Document.RelationshipEvent(3, 'Ended', '1939', 'Something else'),
		new PeopleHistory.Document.RelationshipEvent(3, 'Who knows', '1966', 'Remember')
	];
};

