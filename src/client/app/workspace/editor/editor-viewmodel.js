'use strict';

// TODO: add namespace

function EditorViewModel(doc) {
	this._document = doc;

	// TODO: provide header info
	this.people = new PanelViewModel("People");
	this.personalEvents = new PanelViewModel("Personal Events");
	this.relationships = new PanelViewModel("Relationships");
	this.relationshipEvents = new PanelViewModel("Relationship Events");

	this.initPeople();
	this.initPersonalEvents();
	this.initRelationships();
}

EditorViewModel.prototype.initPeople = function() {
	this.people.setHeaderMapping({
		firstName: "First Name",
		lastName: "Last Name",
		email: "E-mail"
	});
	this.people.setData(this._document.getAllPeople());
	this.people.addAction(new PeopleHistory.Action("Add Person", this.actionAddPerson.bind(this), this.people.whenInitialized.bind(this.people)));
	this.people.addAction(new PeopleHistory.Action("Edit", this.actionEditPerson.bind(this), this.people.whenAnySelected.bind(this.people)));
	this.people.addAction(new PeopleHistory.Action("Delete", this.actionDeletePerson.bind(this), this.people.whenAnySelected.bind(this.people)));
	this.people.addOption(new PeopleHistory.Action("Columns", this.optionPeopleColumns.bind(this), this.people.whenInitialized.bind(this.people)));
	this.people.registerEventHandler('rowSelected', this.selectPerson.bind(this))
	this.people.registerEventHandler('selectionCleared', this.unselectPerson.bind(this))
};

EditorViewModel.prototype.initPersonalEvents = function() {
	this.personalEvents.setHeaderMapping({
		what: "What",
		when: "When",
		where: "Where"
	});
	this.personalEvents.addAction(new PeopleHistory.Action("Add Event", this.actionAddPersonalEvent.bind(this), this.people.whenInitialized.bind(this.personalEvents)));
	this.personalEvents.addAction(new PeopleHistory.Action("Edit", this.actionEditPersonalEvent.bind(this), this.people.whenAnySelected.bind(this.personalEvents)));
	this.personalEvents.addAction(new PeopleHistory.Action("Delete", this.actionDeletePersonalEvent.bind(this), this.people.whenAnySelected.bind(this.personalEvents)));
	this.personalEvents.addOption(new PeopleHistory.Action("Columns", this.optionPersonalEventsColumns.bind(this), this.people.whenInitialized.bind(this.personalEvents)));
	this.personalEvents.addOption(new PeopleHistory.Action("Event Types", this.optionPersonalEventsEventTypes.bind(this), this.people.whenInitialized.bind(this.personalEvents)));
	this.personalEvents.registerEventHandler('rowSelected', this.selectPersonalEvent.bind(this))
	this.personalEvents.registerEventHandler('selectionCleared', this.unselectPersonalEvent.bind(this))
};

EditorViewModel.prototype.initRelationships = function() {
	this.relationships.setHeaderMapping({
		type: "Type",
		who: "Who"
	});
	this.relationships.addAction(new PeopleHistory.Action("Add Relationship", this.actionAddRelationship.bind(this), this.relationships.whenInitialized.bind(this.relationships)));
	this.relationships.addAction(new PeopleHistory.Action("Edit", this.actionEditRelationship.bind(this), this.relationships.whenAnySelected.bind(this.relationships)));
	this.relationships.addAction(new PeopleHistory.Action("Delete", this.actionDeleteRelationship.bind(this), this.relationships.whenAnySelected.bind(this.relationships)));
	this.relationships.addOption(new PeopleHistory.Action("Columns", this.optionRelationshipsColumns.bind(this), this.relationships.whenInitialized.bind(this.relationships)));
	this.relationships.addOption(new PeopleHistory.Action("Relation Types", this.optionRelationshipsRelationTypes.bind(this), this.relationships.whenInitialized.bind(this.relationships)));
	this.relationships.registerEventHandler('rowSelected', this.selectRelationship.bind(this))
	this.relationships.registerEventHandler('selectionCleared', this.unselectRelationship.bind(this))
};

EditorViewModel.prototype.selectPerson = function(row) {
	console.log("selectPerson in row " + row);
	var id = row + 1; // TODO
	this.personalEvents.setData(this._document.getPersonalEventsOf(id));
	this.relationships.setData(this._document.getRelationshipsOf(id));
};

EditorViewModel.prototype.unselectPerson = function() {
	console.log("unselectPerson");
	this.personalEvents.clearData();
	this.relationships.clearData();
};

EditorViewModel.prototype.selectPersonalEvent = function(row) {
	console.log("selectPersonalEvent in row " + row);
	// this.personalEvents.setData(_document.getPersonalEventsOf(id));
	// this.relationships.setData(_document.getRelatioinshipsOf(id));
};

EditorViewModel.prototype.unselectPersonalEvent = function() {
	console.log("unselectPersonalEvent");
	// this.personalEvents.clearData();
};

EditorViewModel.prototype.selectRelationship = function(row) {
	console.log("selectRelationship in row " + row);
	// this.personalEvents.setData(_document.getPersonalEventsOf(id));
	// this.relationships.setData(_document.getRelatioinshipsOf(id));
};

EditorViewModel.prototype.unselectRelationship = function() {
	console.log("unselectRelationship");
	// this.personalEvents.clearData();
};



// ----------

EditorViewModel.prototype.actionAddPerson = function(actionEnv) {
	console.log("actionAddPerson");
};

EditorViewModel.prototype.actionEditPerson = function(actionEnv) {
	console.log("actionEditPerson");
};

EditorViewModel.prototype.actionDeletePerson = function(actionEnv) {
	console.log("actionDeletePerson");
};

EditorViewModel.prototype.optionPeopleColumns = function(actionEnv) {
	console.log("optionPeopleColumns");
};

// ----------

EditorViewModel.prototype.actionAddPersonalEvent = function(actionEnv) {
	console.log("actionAddPersonalEvent");
};

EditorViewModel.prototype.actionEditPersonalEvent = function(actionEnv) {
	console.log("actionEditPersonalEvent");
};

EditorViewModel.prototype.actionDeletePersonalEvent = function(actionEnv) {
	console.log("actionDeletePersonalEvent");
};

EditorViewModel.prototype.optionPersonalEventsColumns = function(actionEnv) {
	console.log("optionPersonalEventsColumns");
};

EditorViewModel.prototype.optionPersonalEventsEventTypes = function(actionEnv) {
	console.log("optionPersonalEventsEventTypes");
};

// ----------

EditorViewModel.prototype.actionAddRelationship = function(actionEnv) {
	console.log("actionAddRelationship");
};

EditorViewModel.prototype.actionEditRelationship = function(actionEnv) {
	console.log("actionEditRelationship");
};

EditorViewModel.prototype.actionDeleteRelationship = function(actionEnv) {
	console.log("actionDeleteRelationship");
};

EditorViewModel.prototype.optionRelationshipsColumns = function(actionEnv) {
	console.log("optionRelationshipsColumns");
};

EditorViewModel.prototype.optionRelationshipsRelationTypes = function(actionEnv) {
	console.log("optionRelationshipsRelationTypes");
};

