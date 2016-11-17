'use strict';

var PeopleHistory = PeopleHistory || {};
if (PeopleHistory.TestUtils === undefined) {
	PeopleHistory.TestUtils = {};
}

PeopleHistory.TestUtils.EditorDSL = function(jqElement) {
	this.jqElement = jqElement;
}

// Boolean functions

PeopleHistory.TestUtils.EditorDSL.prototype.count = function() {
	return this.jqElement.length;
}

PeopleHistory.TestUtils.EditorDSL.prototype.enabled = function() {
	return !this.jqElement.prop("disabled");
}

PeopleHistory.TestUtils.EditorDSL.prototype.rowSelected = function() {
	return this.jqElement.hasClass("info");
}

// Actions

PeopleHistory.TestUtils.EditorDSL.prototype.click = function() {
	this.jqElement.click();
}

// Generator functions

PeopleHistory.TestUtils.EditorDSL.prototype.panel = function(name) {
	var panel = "ph-editor-panel";
	if (name) {
		panel += "[name='" + name + "']";
	}
	this.jqElement = $(this.jqElement).find(panel);
	return this;
}

PeopleHistory.TestUtils.EditorDSL.prototype.navButton = function(name) {
	var navButton = "nav button.btn";
	this.jqElement = $(this.jqElement).find(navButton);
	if (name) {
		this.jqElement = $(this.jqElement).filter(function(index, element) {
			return $(element).text() == name;
		});
	}
	return this;
}

PeopleHistory.TestUtils.EditorDSL.prototype.tableRow = function(rowIndex) {
	var row = "tbody tr";
	if (!!rowIndex) {
		row += ":eq(" + rowIndex + ")";
	}
	this.jqElement = $(this.jqElement).find(row);
	return this;
}

PeopleHistory.TestUtils.EditorDSL.prototype.firstCell = function() {
	this.jqElement = $(this.jqElement).find("td:first");
	return this;
}


