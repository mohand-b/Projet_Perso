import { Tickets, Corrections } from '../both'
import { check } from 'meteor/check'

// Données du serveur publiées à l'utilisateur

// publication des données du profil
Meteor.publish('profil', (userId) => {
	check(userId, String)
	
	let userCursor = Meteor.users.find({_id: userId}, {fields: {username: 1, score: 1, rank: 1}})
	
	return [
		userCursor
	]
})

Meteor.publish('tickets.list', (/*skip, limit*/) => {
	/*check(skip, Number)
	check(limit, Number)*/
	
	/*let userCursor = Meteor.users.find({_id: { $in: arrayUniqueOwnerId}}, { fields : { username:1, score:1, rank: 1}})*/
	let ticketCursor = Tickets.find({}, { fields : { content: 0}, sort : { createdAt: -1 }/*, skip: skip, limit: limit*/})
	
	// Récupération des id des auteurs des tickets
	let arrayTicket = ticketCursor.fetch()
	let arrayOwnerId = arrayTicket.map(ticket => ticket.ownerId) // pour chaque élément du tableau, renvoie l'ownerId dans un tableau > ["id1", "id2", "id2"]
	let arrayUniqueOwnerId = Array.from(new Set(arrayOwnerId)) // ["id1", "id2"]
	
	return [
		ticketCursor,
		Meteor.users.find({_id: { $in: arrayUniqueOwnerId}}, { fields : { username:1, score:1, rank: 1}})
	]
})

Meteor.publish('ticket.single', (ticketId) => {
	check(ticketId, String)
	
	// Récupération des Cursors
	let ticketCursor = Tickets.find({_id: ticketId})
	let correctionCursor = Corrections.find({ticketId: ticketId})
	
	// Récupération des id des auteurs des corrections
	let arrayCorrection = correctionCursor.fetch()
	let arrayOwnerId = arrayCorrection.map(correction => correction.ownerId)
	
	// Ajouter l'auteur du ticket
	let ticket = ticketCursor.fetch().find(ticket => ticket._id === ticketId)
	
	arrayOwnerId.push(ticket.ownerId)
	
	let arrayUniqueOwnerId = Array.from(new Set(arrayOwnerId))
	
	return [
		ticketCursor,
		correctionCursor,
		Meteor.users.find({}, { fields : {username:1, profile : 1, rank: 1}})
	]
})

Meteor.publish('contributions', () => {
	
	let contributionCursor = Corrections.find({ownerId: Meteor.userId()})
	let ticketCursor = Tickets.find()
	
	return [
		ticketCursor,
		contributionCursor
	]
}) // Contributions de l'utilisateur 

Meteor.publish('ladder', () => {
	
	let userCursor = Meteor.users.find({}, {fields: {_id:1, username:1, score:1, rank:1}})
	
	return [
		userCursor
	]
	
})

Meteor.publish('contributeurs', () => {
	
	let correctionCursor = Corrections.find({status: "Acceptée"})
	
	return correctionCursor
})

Meteor.publish('contributionsPending', () => {
	
	let correctionCursor = Corrections.find({status: "En attente"})
	
	return correctionCursor
})
