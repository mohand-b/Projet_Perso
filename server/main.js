import { Meteor } from 'meteor/meteor';

import '../both';
import './publications'

Meteor.users.deny({
	update() {return true}
})
