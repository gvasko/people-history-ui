'use strict';

function Action(name, action, enabled) {
	this.name = name;
	this.action = action;
	this.enabled = enabled;
}

function ActionEnvironment(selectedRow) {
	var row = -1;
	if (selectedRow !== undefined) {
		row = selectedRow;
	}
	this.selectedRow = row;
	this.isAnySelected = row >= 0;
}

