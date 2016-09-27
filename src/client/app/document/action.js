'use strict';

var PeopleHistory = PeopleHistory || {};
if (PeopleHistory.Document === undefined) {
	PeopleHistory.Document = {};
}

PeopleHistory.Document.Action = function(name, action, enabled) {
	this.name = name;
	this.action = action;
	this.enabled = enabled;
}

PeopleHistory.Document.ActionEnvironment = function(selectedRow) {
	var row = selectedRow !== undefined ? selectedRow : -1;
	this.selectedRow = row;
	this.isAnySelected = row >= 0;
}

