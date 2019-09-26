import { Meteor } from 'meteor/meteor';

import '../both';
import './publications'

Meteor.users.deny({
	update() {return true}
})


Accounts.onCreateUser(function(options, user) {
	
	user.score =0,
	user.rank = 0
	
  return user
	
});



