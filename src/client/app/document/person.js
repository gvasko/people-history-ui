'use strict';

var PeopleHistory = PeopleHistory || {};
if (PeopleHistory.Document === undefined) {
	PeopleHistory.Document = {};
}

PeopleHistory.Document.Person = function(id, firstName, lastName, email) {
	this.id = id;
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;
}
