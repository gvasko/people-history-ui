'use strict';

var PeopleHistory = PeopleHistory || {};

PeopleHistory.Person = function(id, firstName, lastName, email) {
	this.id = id;
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;
}
