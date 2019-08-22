import { Tickets, Corrections } from '../../../both';

import './contributions.html'

// HELPERS

Template.contributions.helpers({
	
	// Liste des commentaires liés au ticket
	
	contributionsAccepted() {
		let test = Corrections.find().fetch()
		return test
	}
})

Template.contributions.onCreated(function() {
	this.subscribe('contributions')
})
