'use strict';

var PeopleHistory = PeopleHistory || {};

PeopleHistory.RelationshipEvent = function(id, what, when, reason) {
	this.id = id;
	this.what = what;
	this.when = when;
	this.reason = reason;
}
