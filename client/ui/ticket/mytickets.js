import { Tickets } from '../../../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './mytickets.html';



Template.mytickets_list.onCreated(function() {
	this.subscribe('tickets.list')
})



Template.mytickets_list.helpers({
	// Liste des tickets triés par date
	tickets() {
		return Tickets.find({ownerId: Meteor.userId()}, { sort: {createdAt: -1}}).fetch();
	}
})
