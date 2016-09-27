'use strict';

var PeopleHistory = PeopleHistory || {};
if (PeopleHistory.Document === undefined) {
	PeopleHistory.Document = {};
}

PeopleHistory.Document.Relationship = function(id, type, who) {
	this.id = id;
	this.type = type;
	this.who = who;
}
