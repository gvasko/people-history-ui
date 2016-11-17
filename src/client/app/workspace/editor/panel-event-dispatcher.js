'use strict';

var PeopleHistory = PeopleHistory || {};
if (PeopleHistory.Editor === undefined) {
	PeopleHistory.Editor = {};
}

PeopleHistory.Editor.PanelEventDispathcer = function() {
	this.actionEnvironment = new PeopleHistory.Document.ActionEnvironment();
	this.eventHandlers = {
		selectionChanged: this.eventHandlerSelectionChanged.bind(this),
		rowSelected: null,
		selectionCleared: null
	};
}

PeopleHistory.Editor.PanelEventDispathcer.prototype.clearSelection = function() {
	var wasSelected = this.actionEnvironment.isAnySelected();
	this.actionEnvironment.clearSelection();
	if (wasSelected) {
		this.eventHandlers.selectionChanged();
	}
}

PeopleHistory.Editor.PanelEventDispathcer.prototype.registerEventHandler = function(event, handler) {
	if (this.eventHandlers.hasOwnProperty(event)) {
		this.eventHandlers[event] = handler;
	} else {
		throw "Event not found: " + event;
	}
}

PeopleHistory.Editor.PanelEventDispathcer.prototype.eventHandlerSelectionChanged = function() {
	if (this.actionEnvironment.isAnySelected()) {
		if (!!this.eventHandlers.rowSelected) {
			this.eventHandlers.rowSelected(this.actionEnvironment.getSelectedRowIndex());
		}
	} else {
		if (!!this.eventHandlers.selectionCleared) {
			this.eventHandlers.selectionCleared();
		}
	}
}

PeopleHistory.Editor.PanelEventDispathcer.prototype.selectRow = function(row) {
	this.actionEnvironment.toggleSelection(row);
	if (!!this.eventHandlers.selectionChanged) {
		this.eventHandlers.selectionChanged();
	} else {
		console.log("Event handler not found for selectionChanged");
	}
}
