import './navbar.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.navbar.events({
	'click .current_user'(event, instance)
	{
		FlowRouter.go('/profil')	
	},
	'click .ladder-js'(event, instance)
	{
		FlowRouter.go('/ladder')
	},
	'click .js-open-login-modal'(event, instance) {
		Modal.show('login')
	},
	'click .logout-js'(event, instance) {
		Meteor.logout();
	},
});

Template.login.onCreated(function() {
	this.autorun(() => {
		if(Meteor.userId())
			Modal.hide('login')
		
	})
});

