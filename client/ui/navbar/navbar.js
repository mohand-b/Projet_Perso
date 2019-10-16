import './navbar.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';



// ----------- EVENTS

Template.navbar.events({
	'click .current_user'(event, instance)
	{
		FlowRouter.go('/profil/:id', {id:Meteor.userId()})
	},
	
	'click .ladder-js'(event, instance)
	{
		FlowRouter.go('/ladder')
	},

	'click .contributions-js'(event, instance)
	{
		FlowRouter.go('/mycontributions')	
	},
	'click .js-open-login-modal'(event, instance) {
		Modal.show('login')
	},
	'click .logout-js'(event, instance) {
		Meteor.logout();
	},
});



// ----------- SUSCRIBE

Template.login.onCreated(function() {
	this.autorun(() => {
		if(Meteor.userId())
			Modal.hide('login')
		
	})
});

