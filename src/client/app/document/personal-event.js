'use strict';

var PeopleHistory = PeopleHistory || {};

PeopleHistory.PersonalEvent = function(id, what, when, where) {
	this.id = id;
	this.what = what;
	this.when = when;
	this.where = where;
}
