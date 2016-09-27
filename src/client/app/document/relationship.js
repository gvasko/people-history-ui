'use strict';

var PeopleHistory = PeopleHistory || {};

PeopleHistory.Relationship = function(id, type, who) {
	this.id = id;
	this.type = type;
	this.who = who;
}
