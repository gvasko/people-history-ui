'use strict';

function PanelViewModel(title) {
	this.title = title;
	this.data = {
		header: [],
		rows: []
	};
	this.eventHandlers = {
		selectionChanged: this.eventHandlerSelectionChanged.bind(this),
		rowSelected: null,
		selectionCleared: null
	};
	this.actions = [];
	this.options = [];
	this._lastActionEnv = new ActionEnvironment();
	this._initialized = false;
}


PanelViewModel.prototype.setHeaderMapping = function(headerMap) {
	this._headerMap = headerMap;
	var newHeader = [];
	for (var prop in this._headerMap) {
		if (this._headerMap.hasOwnProperty(prop)) {
			newHeader.push(this._headerMap[prop]);
		}
	}
	this.setHeader(newHeader);
};

PanelViewModel.prototype.setData = function(recordSet) {
	this.clearData();
	for (var i in recordSet) {
		var record = recordSet[i];
		var newRow = [];
		for (var prop in this._headerMap) {
			var newValue = null;
			if (record.hasOwnProperty(prop)) {
				newValue = record[prop];
			}
			newRow.push(newValue);
		}
		if (newRow.length !== this.data.header.length) {
			this.clearData();
			throw "Invalid record";
		}
		this.addRow(newRow);
	}
	this._initialized = true;
};

PanelViewModel.prototype.clearData = function() {
	this.data.rows.length = 0;
	this._initialized = false;
}

PanelViewModel.prototype.setHeader = function(header) {
	this.data.header.length = 0;

	for (var item in header) {
		this.data.header.push(header[item]);
	}

	this.clearData();
};

PanelViewModel.prototype.addRow = function(row) {
	if (row.length != this.data.header.length) {
		throw "Row should contain " + this.data.header.length + " items, not " + row.length;
	}
	this.data.rows.push(row);
}

PanelViewModel.prototype.registerEventHandler = function(event, handler) {
	this.eventHandlers[event] = handler;
}

PanelViewModel.prototype.addAction = function(action) {
	this.actions.push(action);
}

PanelViewModel.prototype.addOption = function(action) {
	this.options.push(action);
}

PanelViewModel.prototype.eventHandlerSelectionChanged = function(actionEnv) {
	if (actionEnv.isAnySelected) {
		if (!!this.eventHandlers.rowSelected) {
			this.eventHandlers.rowSelected(actionEnv.selectedRow);
		}
	} else {
		if (!!this.eventHandlers.selectionCleared) {
			this.eventHandlers.selectionCleared();
		}
	}
	this._lastActionEnv = actionEnv;
}

PanelViewModel.prototype.whenInitialized = function(actionEnv) {
	return this._initialized;
}

PanelViewModel.prototype.whenAnySelected = function(actionEnv) {
	return actionEnv.isAnySelected;
}

