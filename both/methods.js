import { Tickets, Corrections, ticketUpsertSchema, correctionUpsertSchema } from './collections'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { check } from 'meteor/check' // vérifier le type (package meteor), amélioré avec le Simple Schema

// Créer nous même les méthodes CRUD pour nos tickets pour sécuriser la communication à la bdd MongoDB
Meteor.methods({
	
	insertTicket(ticket) {
		ticketUpsertSchema.validate(ticket) // vérifier les infos attendues
		
		if(!this.userId) { // Vérifier que l'utilisateur est connecté
			throw new Meteor.Error('not-connected')
		}
		
		let ticketDoc = {
			title: ticket.title,
			content: ticket.content,
			createdAt: new Date(),
			ownerId: this.userId,
			open: true,
			counterEdit: 0
		};
		
		Tickets.insert(ticketDoc);
	},
	
	updateTicket(ticket) {
		ticketUpsertSchema.validate(ticket)
		
		if(!this.userId) {
			throw new Meteor.Error('not-connected')
		}
		
		let ticketFound = Tickets.findOne({_id: ticket.id})
		if(ticketFound.ownerId !== this.userId) {
			throw new Meteor.Error('unauthorized', 'L utilisateur doit être l auteur du ticket')
		}
		
		 Tickets.update({_id: ticket.id}, 
           {
             $set: 
			 {
				title: ticket.title, 
				content: ticket.content},
              	$inc: {counterEdit: 1 }
           }
       )
		console.log(ticket.id)
	 },
	
	removeTicket(ticketId) {
		check(ticketId, String)
		
		if(!this.userId) {
			throw new Meteor.Error('not-connected')
		}
		
		let ticketFound = Tickets.findOne({_id: ticketId})
		if(ticketFound.ownerId !== this.userId) {
			throw new Meteor.Error('unauthorized', 'L\'utilisateur doit être l\'auteur du ticket')
		}
		
		Tickets.remove({_id: ticketId})
	},
	
	insertCorrection(correction) {
		correctionUpsertSchema.validate(correction)
		
		if(!this.userId) {
			throw new Meteor.Error('not-connected')
		}
		
			let correctiontDoc = {
			content: correction.content,
			ticketId: correction.ticketId,
			createdAt: new Date(),
			ownerId: this.userId,
			status: "En attente"
		}
			
		Corrections.insert(correctiontDoc)
		
		
	},
	
	// Accepter une correction
	acceptCorrection(correction) {
	
	if(!this.userId) {
			throw new Meteor.Error('not-connected')
		}
		
	if(correction.status != "En attente") { // vérifier que la correction n'a pas déjà été appréciée
			throw new Meteor.Error('correction already classed')
		}
	
	Corrections.update({_id: correction.id}, 
           {
             $set: 
			 {
				status: "Acceptée"}
           }
       )
	},
	
	// Refuser une correction
	refuseCorrection(correction) {
	
	if(!this.userId) {
			throw new Meteor.Error('not-connected')
		}
	
	if(correction.status != "En attente") { // vérifier que la correction n'a pas déjà été appréciée
			throw new Meteor.Error('correction already classed')
		}
	
	Corrections.update({_id: correction.id}, 
           {
             $set: 
			 {
				status: "Refusée"}
           }
       )
	}
})