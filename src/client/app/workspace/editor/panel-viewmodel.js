'use strict';

var PeopleHistory = PeopleHistory || {};
if (PeopleHistory.Editor === undefined) {
	PeopleHistory.Editor = {};
}

PeopleHistory.Editor.PanelViewModel = function(title) {
	this.title = title;
	this.data = {
		header: [],
		rows: []
	};
	this.eventDispatcher = new PeopleHistory.Editor.PanelEventDispathcer();
	this.actions = [];
	this.options = [];
	this._initialized = false;
}

PeopleHistory.Editor.PanelViewModel.prototype.setHeaderMapping = function(headerMap) {
	this._headerMap = headerMap;
	var newHeader = [];
	for (var prop in this._headerMap) {
		if (this._headerMap.hasOwnProperty(prop)) {
			newHeader.push(this._headerMap[prop]);
		}
	}
	this._setHeader(newHeader);
};

PeopleHistory.Editor.PanelViewModel.prototype.setData = function(recordSet) {
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

PeopleHistory.Editor.PanelViewModel.prototype.clearData = function() {
	this.eventDispatcher.clearSelection();
	this.data.rows.length = 0;
	this._initialized = false;
}

PeopleHistory.Editor.PanelViewModel.prototype._setHeader = function(header) {
	this.data.header.length = 0;

	for (var item in header) {
		this.data.header.push(header[item]);
	}

	this.clearData();
};

PeopleHistory.Editor.PanelViewModel.prototype.getColumnCount = function() {
	return this.data.header.length;
}

PeopleHistory.Editor.PanelViewModel.prototype.getRowCount = function() {
	return this.data.rows.length;
}

PeopleHistory.Editor.PanelViewModel.prototype.addRow = function(row) {
	if (row.length !== this.data.header.length) {
		throw "Row should contain " + this.data.header.length + " items, not " + row.length;
	}
	this.data.rows.push(row);
}

PeopleHistory.Editor.PanelViewModel.prototype.addAction = function(action) {
	this.actions.push(action);
}

PeopleHistory.Editor.PanelViewModel.prototype.addOption = function(action) {
	this.options.push(action);
}

PeopleHistory.Editor.PanelViewModel.prototype.whenInitialized = function() {
	return this._initialized;
}

PeopleHistory.Editor.PanelViewModel.prototype.whenAnySelected = function() {
	return this.eventDispatcher.actionEnvironment.isAnySelected();
}

PeopleHistory.Editor.PanelViewModel.prototype.isSelected = function(row) {
	return this.eventDispatcher.actionEnvironment.isSelected(row);
}

PeopleHistory.Editor.PanelViewModel.prototype.toggleRow = function(row) {
	this.eventDispatcher.selectRow(row);
}
