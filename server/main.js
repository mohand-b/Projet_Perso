import { Meteor } from 'meteor/meteor';

import '../both';

Meteor.users.deny({
	update() {return true}
})
