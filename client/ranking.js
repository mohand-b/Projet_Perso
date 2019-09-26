import { Tickets, Corrections, UsersActivity } from '../both';

function ranking() {
	//update rank	
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
		}
}