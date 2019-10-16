import { Tickets, Corrections } from '../../../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './profil.html'



// ----------- SUBSCRIBE

Template.myprofil.onCreated(function() {
	this.subscribe('profil', Meteor.userId())
})

Template.profil.onCreated(function() {
	this.subscribe('profil', FlowRouter.getParam('userId'))
	this.subscribe('tickets.list')
	this.subscribe('contributions')
})





// ----------- HELPERS

Template.profil.helpers({
	// Liste des tickets triés par date
	profilInfos() {
		return Meteor.users.findOne({_id: FlowRouter.getParam('userId')})
	},
	
	lastTickets() {
		return Tickets.find({ownerId: FlowRouter.getParam('userId')}).fetch()
	},
	
	countContributions() {
		let contributionsUser = Corrections.find({ownerId: FlowRouter.getParam('userId')}).fetch()
		return Object.keys(contributionsUser).length
	},
	
	currentUserProfil() {
		return FlowRouter.getParam('userId') === Meteor.userId()
	}
})
