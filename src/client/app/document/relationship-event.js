'use strict';

var PeopleHistory = PeopleHistory || {};
if (PeopleHistory.Document === undefined) {
	PeopleHistory.Document = {};
}

PeopleHistory.Document.RelationshipEvent = function(id, what, when, reason) {
	this.id = id;
	this.what = what;
	this.when = when;
	this.reason = reason;
}
