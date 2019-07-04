import './navbar.html'

Template.navbar.events({
	'click .logout-js'(event, instance) {
		Meteor.logout();
	}
})