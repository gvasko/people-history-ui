'use strict';

// TODO: add namespace
//var PeopleHistory = PeopleHistory || {};

function Document() {
	this.people = new TableViewModel("People");
	this.personalEvents = new TableViewModel("Personal Events");
	this.relationships = new TableViewModel("Relationships");
	this.relationshipEvents = new TableViewModel("Rlationship Events");
}

function DocumentMethods() {
	this.selectPerson = function(id) {

	};

	this.unselectPerson = function() {

	};

	this.actionAddPerson = function(actionEnv) {

	};

	// TODO this.people is undefined
	//this.people.addAction("Add Person", this.actionAddPerson, this.people.whenInitializes);
	//this.people.addAction("Edit", this.actionEditPerson, this.people.whenAnySelected);
	//this.people.addAction("Delete", this.actionDeletePerson, this.people.whenAnySelected);
}

Document.prototype = new DocumentMethods();
