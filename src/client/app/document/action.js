'use strict';

function Action(name, action, enabled) {
	this.name = name;
	this.action = action;
	this.enabled = enabled;
}

function ActionEnvironment(selectedRow) {
	var row = selectedRow !== undefined ? selectedRow : -1;
	this.selectedRow = row;
	this.isAnySelected = row >= 0;
}

