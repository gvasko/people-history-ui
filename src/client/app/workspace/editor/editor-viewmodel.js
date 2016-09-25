'use strict';

// TODO: add namespace

function EditorViewModel(documentViewModel) {
	this._document = documentViewModel;

	// TODO: provide header info
	this.people = new PanelViewModel("People");
	this.personalEvents = new PanelViewModel("Personal Events");
	this.relationships = new PanelViewModel("Relationships");
	this.relationshipEvents = new PanelViewModel("Rlationship Events");

	this.initPeople();
}

EditorViewModel.prototype.initPeople = function() {
	this.people.setHeaderMapping({
		firstName: "First Name",
		lastName: "Last Name",
		email: "E-mail"
	});
	this.people.setData(this._document.getAllPeople());
	this.people.addAction(new Action("Add Person", this.actionAddPerson, this.people.whenInitializes));
	this.people.addAction(new Action("Edit", this.actionEditPerson, this.people.whenAnySelected));
	this.people.addAction(new Action("Delete", this.actionDeletePerson, this.people.whenAnySelected));
}

EditorViewModel.prototype.selectPerson = function(id) {
	// this.personalEvents.setData(_document.getPersonalEventsOf(id));
	// this.relationships.setData(_document.getRelatioinshipsOf(id));
};

EditorViewModel.prototype.unselectPerson = function() {
	// this.personalEvents.clearData();
};

EditorViewModel.prototype.actionAddPerson = function(actionEnv) {
	console.log("actionAddPerson");
};

EditorViewModel.prototype.actionEditPerson = function(actionEnv) {
	console.log("actionEditPerson");
};

EditorViewModel.prototype.actionDeletePerson = function(actionEnv) {
	console.log("actionDeletePerson");
};

