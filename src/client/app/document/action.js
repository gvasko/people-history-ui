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
}

PeopleHistory.Document.ActionEnvironment.prototype.clearSelection = function() {
	this.selectedRow = -1;
}

PeopleHistory.Document.ActionEnvironment.prototype.select = function(row) {
	this.selectedRow = row;
}

PeopleHistory.Document.ActionEnvironment.prototype.isSelected = function(row) {
	return this.selectedRow === row;
}

PeopleHistory.Document.ActionEnvironment.prototype.isAnySelected = function() {
	return this.selectedRow >= 0;
}

PeopleHistory.Document.ActionEnvironment.prototype.getSelectedRowIndex = function() {
	return this.selectedRow;
}

PeopleHistory.Document.ActionEnvironment.prototype.toggleSelection = function(row) {
	if (this.selectedRow === row) {
		this.clearSelection();
	} else {
		this.select(row);
	}
}
