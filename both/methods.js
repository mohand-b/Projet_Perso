import { Tickets, Corrections } from './collections'

// Créer nous même les méthodes CRUD pour nos tickets pour sécuriser la communication à la bdd MongoDB
Meteor.methods({
	
	insertTicket(ticket) {
		let ticketDoc = {
			title: ticket.title,
			content: ticket.content,
			createdAt: new Date(),
			ownerId: this.userId,
			open: true,
		};
		
		Tickets.insert(ticketDoc);
	},
	
	updateTicket(ticketId, ticket) {
		Tickets.update({_id: ticketId}, 
		{ $set: {title: ticket.title, content: ticket.content, counterEdit: 1}})
	},
	
	removeTicket(ticketId) {
		Tickets.remove({_id: ticketId})
	},
	
	insertCorrection(correction, ticketId) {
			let correctiontDoc = {
			content: correction.content,
			ticketId: correction.ticketId,
			createdAt: new Date(),
			ownerId: this.userId,
			status:"En attente"
		}
			
		Corrections.insert(correctiontDoc)
		Tickets.update({_id: correction.ticketId}, {$set: {counterEdit: this.counterEdit+2}})
	}
})