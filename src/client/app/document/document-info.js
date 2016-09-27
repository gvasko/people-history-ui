'use strict';

var PeopleHistory = PeopleHistory || {};

PeopleHistory.DocumentInfo = function(id, title, description, peopleCount, lastEdited) {
	this.id = id;
	this.title = title;
	this.description = description;
	this.peopleCount = peopleCount;
	this.lastEdited = lastEdited;
}
