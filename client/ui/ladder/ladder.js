import { Tickets, Corrections } from '../../../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './ladder.html'


// ----------- EVENTS




// ----------- HELPERS

Template.ladder.helpers({
	
	users() {
		
		// Liste des users triés par score
		let users = Meteor.users.find({}, { sort: {score: -1}}).fetch()
	
		
		//tableau classement
		let ladder = []
		//position du user
		let position = 0

		//console.log("tableau users : "+users)
		
		//Pour chaque user
		for(user in users){
			
			position++	
			
			ladder[user]= 
				{
				position: position,
				username:users[user].username,
				score: users[user].score
			}			
		}
		
	return ladder
	}

})




// ----------- SUBSCRIBE

Template.ladder.onCreated(function() {
	this.subscribe('ladder')
})
