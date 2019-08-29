import { Tickets, Corrections } from '../../../both';

import './contributions.html'

// ----------- HELPERS

Template.contributions.helpers({
	
	// Liste des commentaires liés au ticket
	
	contributionsAccepted() {
		return Corrections.find({status: "Acceptée"}).fetch()
	},
	
	contributionsPending() {
		return Corrections.find({status: "En attente"}).fetch()
	},
	
	contributionsRefused() {
		return Corrections.find({status: "Refusée"}).fetch()
	}
})



Template.contribution_single.helpers({
	
	statusPending(correctionStatus) { 
		return correctionStatus === "En attente"
	},
	statusAccepted(correctionStatus) {
		return correctionStatus === "Acceptée"
	},
	statusRefused(correctionStatus) {
		return correctionStatus === "Refusée"
	},
	
})


// ----------- SUBSCRIBE

Template.contributions.onCreated(function() {
	this.subscribe('contributions')
})
