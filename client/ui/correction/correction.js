import './correction.html'
import { Corrections, Tickets } from '../../../both'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'


// ----------- EVENTS

// Évènements liés au template "correction_form"
Template.correction_form.events({
	'submit .js-create-correction'(event, instance){
		event.preventDefault()
		
		const content = event.target.content.value;
		Meteor.call('insertCorrection', { content: content, ticketId: FlowRouter.getParam('ticketId')}, 
		(err, res) => { 
			if(!err) {
				event.target.content.value = '';
				Modal.show('correction_sended')
			} console.log(err)
		})		
	},
})

Template.correction_single.events({
	'click .js-accept-correction'(event, instance){
		
		Meteor.call('acceptCorrection', {id: this._id, status: this.status, ownerId: this.ownerId},
				   (err, res) => {
			if(!err) console.log('accepted!')
		})
	},
	
	'click .js-refuse-correction'(event, instance){
		
		Meteor.call('refuseCorrection', {id: this._id, status: this.status},
				   (err, res) => {
			if(!err) console.log('refused!')
		})
	}
})
	
// ----------- SUBSCRIBE

Template.correction_form.onCreated(function() {
	this.subscribe('ticket.single', FlowRouter.getParam('ticketId'))
})


// ----------- HELPERS

Template.correction_accepted_list.helpers({
	
	// Liste des commentaires liés au ticket
	corrections() {
		return Corrections.find({ticketId: FlowRouter.getParam('ticketId')})
	},
	
	correctionsAccepted() {
		return Corrections.find({ticketId: FlowRouter.getParam('ticketId'), status: "Acceptée"})
	},
	
	whoCanAppreciate() {
		return Meteor.userId() === Tickets.findOne({_id: FlowRouter.getParam('ticketId')}).ownerId
	}
	
})

Template.correction_form.helpers({
	// Ticket affiché sur la page
	ticket() {
		return Tickets.findOne({_id: FlowRouter.getParam('ticketId')});
	}
})

Template.correction_single.helpers({
	
	// Vérifier le status de la correction
	statusPending(correctionStatus) { 
		return correctionStatus === "En attente"
	},
	statusAccepted(correctionStatus) {
		return correctionStatus === "Acceptée"
	},
	statusRefused(correctionStatus) {
		return correctionStatus === "Refusée"
	},
	
	whoCanAppreciate() {
		return Meteor.userId() === Tickets.findOne({_id: FlowRouter.getParam('ticketId')}).ownerId
	}
})

	


// ------- JS


