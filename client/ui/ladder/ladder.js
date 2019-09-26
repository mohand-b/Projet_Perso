import { Tickets, Corrections } from '../../../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './ladder.html'


// ----------- EVENTS




// ----------- SUBSCRIBE

Template.ladder.onCreated(function() {
	this.subscribe('ladder')
})



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
				id:users[user]._id,
				username:users[user].username,
				score: users[user].score,
				rank: users[user].rank
			}			
		}
		
	return ladder
	},

})

Template.user_single.helpers({
		
	moderateur(rank) {
    	return rank === 13
  },

})


