import { Tickets, Corrections } from '../../../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './profil.html'



// ----------- SUBSCRIBE

Template.profil.onCreated(function() {
	this.subscribe('profil'/*, FlowRouter.getParam('userId')*/)
})

Template.myprofil.onCreated(function() {
	this.subscribe('profil'/*, FlowRouter.getParam('userId')*/)
})



// ----------- HELPERS

Template.profil.helpers({
	// Liste des tickets triés par date
	profilInfos() {
		return Meteor.users.findOne({_id: FlowRouter.getParam('userId')})
	}
})
