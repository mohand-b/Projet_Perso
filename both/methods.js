import { Tickets, Corrections, ticketUpsertSchema, correctionUpsertSchema } from './collections'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { check } from 'meteor/check' // vérifier le type (package meteor), amélioré avec le Simple Schema

// Créer nous même les méthodes pour sécuriser la communication à la bdd MongoDB
Meteor.methods({
	
	// Créer un ticket
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
	
	// Modifier un ticket > Modifie le contenu
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
	
	// Fermer un ticket > Modifie le status
	closedTicket(ticketId) {
		check(ticketId, String)
		
		if(!this.userId) {
			throw new Meteor.Error('not-connected')
		}
		
		let ticketFound = Tickets.findOne({_id: ticketId})
		if(ticketFound.ownerId !== this.userId) {
			throw new Meteor.Error('unauthorized', 'L\'utilisateur doit être l\'auteur du ticket')
		}
		if(ticketFound.open == true)
			Tickets.update({_id: ticketId}, {$set: {open: false}})
		else if(ticketFound.open == false)
			Tickets.update({_id: ticketId}, {$set: {open: true}})
	},
	
	// Créer une correction
	insertCorrection(correction) {
		correctionUpsertSchema.validate(correction)
		
		if(!this.userId) {
			throw new Meteor.Error('not-connected')
		} else if(Tickets.find({_id:correction.ticketId}).fetch()[0].ownerId == Meteor.userId()) {
			throw new Meteor.Error('Tu ne peux pas envoyer de correction sur ton propre ticket')
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
	
	// Accepter une correction > Modifie le status
	acceptCorrection(correction) {
	
	if(!this.userId) {
			throw new Meteor.Error('not-connected')
		}
		
	if(correction.status != "En attente") { // vérifier que la correction n'a pas déjà été appréciée
			throw new Meteor.Error('correction already classed')
		}
	
	Corrections.update({_id: correction.id}, 
           {$set: 
			{status: "Acceptée"}
           }
       )
	Meteor.users.update({_id: correction.ownerId}, {$inc: {score:100} }) // +5 pts pour la correction validée
	
		// ranking
		for(user in Meteor.users.find().fetch()) {
			let users = Meteor.users.find().fetch()
				  
			if(users[user].score > 0 && users[user].score < 50 && users[user].rank != 13) {
				Meteor.users.update({_id: users[user]._id}, {$set: {rank:1} })  
			}
			else if(users[user].score >= 50 && users[user].score < 100 && users[user].rank != 13) {
				Meteor.users.update({_id: users[user]._id}, {$set: {rank:2} })
			}
			else if(users[user].score >= 100 && users[user].score < 200 && users[user].rank != 13) {
				Meteor.users.update({_id: users[user]._id}, {$set: {rank:3} }) 
			}
			else if(users[user].score >= 200 && users[user].score < 300 && users[user].rank != 13) {
				Meteor.users.update({_id: users[user]._id}, {$set: {rank:4} }) 
			}
			else if(users[user].score >= 300 && users[user].score < 500 && users[user].rank != 13) {
				Meteor.users.update({_id: users[user]._id}, {$set: {rank:5} }) 
			}
			else if(users[user].score >= 500 && users[user].score < 700 && users[user].rank != 13) {
				Meteor.users.update({_id: users[user]._id}, {$set: {rank:6} }) 
			}
			else if(users[user].score >= 700 && users[user].score < 1000 && users[user].rank != 13) {
				Meteor.users.update({_id: users[user]._id}, {$set: {rank:7} }) 
			}
			console.log('score updated')
		}	},
	
	// Refuser une correction > Modifie le status
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
	},
	
})

