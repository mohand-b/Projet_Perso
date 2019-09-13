import { Tickets, Corrections } from '../../../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './mytickets.html';



// ----------- SUSCRIBE

Template.mytickets_list.onCreated(function() {
	this.subscribe('tickets.list')
})

Template.mytickets_single.onCreated(function() {
	this.subscribe('contributionsPending')
})




// ----------- HELPERS

Template.mytickets_list.helpers({
	// Liste des tickets triés par date
	tickets() {
		return Tickets.find({ownerId: Meteor.userId()}, { sort: {createdAt: -1}}).fetch();
	},
	
})

Template.contributionsPending.helpers({
	contributionsPending(ticketid) {
		
		let correctionCursor = Corrections.find({ticketId: ticketid})
		let countContributeurs = correctionCursor.count()
		
		return  countContributeurs
	}
})