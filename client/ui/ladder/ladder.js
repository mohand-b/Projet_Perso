import { Tickets, Corrections } from '../../../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './ladder.html'


// ----------- EVENTS




// ----------- HELPERS

Template.ladder.helpers({
	// Liste des tickets triés par date
	users() {
		return Meteor.users.find().fetch();
	}
})



// ----------- SUBSCRIBE

Template.ladder.onCreated(function() {
	this.subscribe('ladder')
})
