'use strict';

var PeopleHistory = PeopleHistory || {};
if (PeopleHistory.Document === undefined) {
	PeopleHistory.Document = {};
}

PeopleHistory.Document.PersonalEvent = function(id, what, when, where) {
	this.id = id;
	this.what = what;
	this.when = when;
	this.where = where;
}
