'use strict';

function TableViewModel(title) {
	this.title = title;
	this.data = {
		header: [],
		rows: []
	};
	this.eventHandlers = {
		selectionChanged: null
	};
	this.actions = [];
	this.options = [];
}

function TableViewModelMethods() {
	this.setHeader = function(header) {
		this.data.header = header;
		this.data.rows.length = 0;
	};

	this.addRow = function(row) {
		if (row.length != data.header.length) {
			throw "Row should contain " + data.header.length + " items, not " + row.length;
		}
		this.data.rows.push(row);
	}

	this.registerEventHandler = function(event, handler) {
		this.eventHandlers[event] = handler;
	}

	this.addAction = function(action) {
		this.actions.push(action);
	}

	this.addOption = function(action) {
		this.options.push(action);
	}

	this.lastActionEnv = new ActionEnvironment();
	this.eventHandlersSelectionChanged = function(actionEnv) {
		this.lastActionEnv = actionEnv;
	}
	// TODO: this.eventHandlers is undefined

	this.whenInitialized = function() {
		return true;
	}

	this.whenAnySelected = function() {
		return this.lastActionEnv.isAnySelected;
	}


}

TableViewModel.prototype = new TableViewModelMethods();
