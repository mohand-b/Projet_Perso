import './correction.html'
import { Corrections } from '../../../both'
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
				event.target.content.value = ''
			}
		})		
	},
})


// ----------- HELPERS

Template.correction_accepted_list.helpers({
	
	// Liste des commentaires liés au ticket
	corrections() {
		return Corrections.find({ticketId: FlowRouter.getParam('ticketId')})
	},
})

