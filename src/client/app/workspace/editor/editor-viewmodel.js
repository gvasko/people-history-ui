'use strict';

var PeopleHistory = PeopleHistory || {};
if (PeopleHistory.Editor === undefined) {
	PeopleHistory.Editor = {};
}

PeopleHistory.Editor.EditorViewModel = function(doc) {
	this._document = doc;

	// TODO: provide header info
	this.peoplePanelVM = new PeopleHistory.Editor.PanelViewModel("People");
	this.personalEventsPanelVM = new PeopleHistory.Editor.PanelViewModel("Personal Events");
	this.relationshipsPanelVM = new PeopleHistory.Editor.PanelViewModel("Relationships");
	this.relationshipEventsPanelVM = new PeopleHistory.Editor.PanelViewModel("Relationship Events");

	this.initPeople();
	this.initPersonalEvents();
	this.initRelationships();
}

PeopleHistory.Editor.EditorViewModel.prototype.initPeople = function() {
	this.peoplePanelVM.setHeaderMapping({
		firstName: "First Name",
		lastName: "Last Name",
		email: "E-mail"
	});
	this.peoplePanelVM.setData(this._document.getAllPeople());
	this.peoplePanelVM.addAction(new PeopleHistory.Document.Action("Add Person", this.actionAddPerson.bind(this), this.peoplePanelVM.whenInitialized.bind(this.peoplePanelVM)));
	this.peoplePanelVM.addAction(new PeopleHistory.Document.Action("Edit", this.actionEditPerson.bind(this), this.peoplePanelVM.whenAnySelected.bind(this.peoplePanelVM)));
	this.peoplePanelVM.addAction(new PeopleHistory.Document.Action("Delete", this.actionDeletePerson.bind(this), this.peoplePanelVM.whenAnySelected.bind(this.peoplePanelVM)));
	this.peoplePanelVM.addOption(new PeopleHistory.Document.Action("Columns", this.optionPeopleColumns.bind(this), this.peoplePanelVM.whenInitialized.bind(this.peoplePanelVM)));
	this.peoplePanelVM.eventDispatcher.registerEventHandler('rowSelected', this.selectPerson.bind(this))
	this.peoplePanelVM.eventDispatcher.registerEventHandler('selectionCleared', this.unselectPerson.bind(this))
};

PeopleHistory.Editor.EditorViewModel.prototype.initPersonalEvents = function() {
	this.personalEventsPanelVM.setHeaderMapping({
		what: "What",
		when: "When",
		where: "Where"
	});
	this.personalEventsPanelVM.addAction(new PeopleHistory.Document.Action("Add Event", this.actionAddPersonalEvent.bind(this), this.peoplePanelVM.whenInitialized.bind(this.personalEventsPanelVM)));
	this.personalEventsPanelVM.addAction(new PeopleHistory.Document.Action("Edit", this.actionEditPersonalEvent.bind(this), this.peoplePanelVM.whenAnySelected.bind(this.personalEventsPanelVM)));
	this.personalEventsPanelVM.addAction(new PeopleHistory.Document.Action("Delete", this.actionDeletePersonalEvent.bind(this), this.peoplePanelVM.whenAnySelected.bind(this.personalEventsPanelVM)));
	this.personalEventsPanelVM.addOption(new PeopleHistory.Document.Action("Columns", this.optionPersonalEventsColumns.bind(this), this.peoplePanelVM.whenInitialized.bind(this.personalEventsPanelVM)));
	this.personalEventsPanelVM.addOption(new PeopleHistory.Document.Action("Event Types", this.optionPersonalEventsEventTypes.bind(this), this.peoplePanelVM.whenInitialized.bind(this.personalEventsPanelVM)));
	this.personalEventsPanelVM.eventDispatcher.registerEventHandler('rowSelected', this.selectPersonalEvent.bind(this))
	this.personalEventsPanelVM.eventDispatcher.registerEventHandler('selectionCleared', this.unselectPersonalEvent.bind(this))
};

PeopleHistory.Editor.EditorViewModel.prototype.initRelationships = function() {
	this.relationshipsPanelVM.setHeaderMapping({
		type: "Type",
		who: "Who"
	});
	this.relationshipsPanelVM.addAction(new PeopleHistory.Document.Action("Add Relationship", this.actionAddRelationship.bind(this), this.relationshipsPanelVM.whenInitialized.bind(this.relationshipsPanelVM)));
	this.relationshipsPanelVM.addAction(new PeopleHistory.Document.Action("Edit", this.actionEditRelationship.bind(this), this.relationshipsPanelVM.whenAnySelected.bind(this.relationshipsPanelVM)));
	this.relationshipsPanelVM.addAction(new PeopleHistory.Document.Action("Delete", this.actionDeleteRelationship.bind(this), this.relationshipsPanelVM.whenAnySelected.bind(this.relationshipsPanelVM)));
	this.relationshipsPanelVM.addOption(new PeopleHistory.Document.Action("Columns", this.optionRelationshipsColumns.bind(this), this.relationshipsPanelVM.whenInitialized.bind(this.relationshipsPanelVM)));
	this.relationshipsPanelVM.addOption(new PeopleHistory.Document.Action("Relation Types", this.optionRelationshipsRelationTypes.bind(this), this.relationshipsPanelVM.whenInitialized.bind(this.relationshipsPanelVM)));
	this.relationshipsPanelVM.eventDispatcher.registerEventHandler('rowSelected', this.selectRelationship.bind(this))
	this.relationshipsPanelVM.eventDispatcher.registerEventHandler('selectionCleared', this.unselectRelationship.bind(this))
};

PeopleHistory.Editor.EditorViewModel.prototype.selectPerson = function(row) {
	console.log("selectPerson in row " + row);
	var id = row + 1; // TODO
	this.personalEventsPanelVM.setData(this._document.getPersonalEventsOf(id));
	this.relationshipsPanelVM.setData(this._document.getRelationshipsOf(id));
};

PeopleHistory.Editor.EditorViewModel.prototype.unselectPerson = function() {
	console.log("unselectPerson");
	this.personalEventsPanelVM.clearData();
	this.relationshipsPanelVM.clearData();
};

PeopleHistory.Editor.EditorViewModel.prototype.selectPersonalEvent = function(row) {
	console.log("selectPersonalEvent in row " + row);
	// this.personalEventsPanelVM.setData(_document.getPersonalEventsOf(id));
	// this.relationshipsPanelVM.setData(_document.getRelatioinshipsOf(id));
};

PeopleHistory.Editor.EditorViewModel.prototype.unselectPersonalEvent = function() {
	console.log("unselectPersonalEvent");
	// this.personalEventsPanelVM.clearData();
};

PeopleHistory.Editor.EditorViewModel.prototype.selectRelationship = function(row) {
	console.log("selectRelationship in row " + row);
	// this.personalEventsPanelVM.setData(_document.getPersonalEventsOf(id));
	// this.relationshipsPanelVM.setData(_document.getRelatioinshipsOf(id));
};

PeopleHistory.Editor.EditorViewModel.prototype.unselectRelationship = function() {
	console.log("unselectRelationship");
	// this.personalEventsPanelVM.clearData();
};



// ----------

PeopleHistory.Editor.EditorViewModel.prototype.actionAddPerson = function(actionEnv) {
	console.log("actionAddPerson");
};

PeopleHistory.Editor.EditorViewModel.prototype.actionEditPerson = function(actionEnv) {
	console.log("actionEditPerson");
};

PeopleHistory.Editor.EditorViewModel.prototype.actionDeletePerson = function(actionEnv) {
	console.log("actionDeletePerson");
};

PeopleHistory.Editor.EditorViewModel.prototype.optionPeopleColumns = function(actionEnv) {
	console.log("optionPeopleColumns");
};

// ----------

PeopleHistory.Editor.EditorViewModel.prototype.actionAddPersonalEvent = function(actionEnv) {
	console.log("actionAddPersonalEvent");
};

PeopleHistory.Editor.EditorViewModel.prototype.actionEditPersonalEvent = function(actionEnv) {
	console.log("actionEditPersonalEvent");
};

PeopleHistory.Editor.EditorViewModel.prototype.actionDeletePersonalEvent = function(actionEnv) {
	console.log("actionDeletePersonalEvent");
};

PeopleHistory.Editor.EditorViewModel.prototype.optionPersonalEventsColumns = function(actionEnv) {
	console.log("optionPersonalEventsColumns");
};

PeopleHistory.Editor.EditorViewModel.prototype.optionPersonalEventsEventTypes = function(actionEnv) {
	console.log("optionPersonalEventsEventTypes");
};

// ----------

PeopleHistory.Editor.EditorViewModel.prototype.actionAddRelationship = function(actionEnv) {
	console.log("actionAddRelationship");
};

PeopleHistory.Editor.EditorViewModel.prototype.actionEditRelationship = function(actionEnv) {
	console.log("actionEditRelationship");
};

PeopleHistory.Editor.EditorViewModel.prototype.actionDeleteRelationship = function(actionEnv) {
	console.log("actionDeleteRelationship");
};

PeopleHistory.Editor.EditorViewModel.prototype.optionRelationshipsColumns = function(actionEnv) {
	console.log("optionRelationshipsColumns");
};

PeopleHistory.Editor.EditorViewModel.prototype.optionRelationshipsRelationTypes = function(actionEnv) {
	console.log("optionRelationshipsRelationTypes");
};

