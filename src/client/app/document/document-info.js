'use strict';

var PeopleHistory = PeopleHistory || {};
if (PeopleHistory.Document === undefined) {
	PeopleHistory.Document = {};
}

PeopleHistory.Document.DocumentInfo = function(id, title, description, peopleCount, lastEdited) {
	this.id = id;
	this.title = title;
	this.description = description;
	this.peopleCount = peopleCount;
	this.lastEdited = lastEdited;
}
