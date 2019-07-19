import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { FlowTransition } from 'meteor/mcissel:flow-transition';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
	action() {
		BlazeLayout.render('layout', { main: 'home', ticket_creation: 'ticket_proposition'})
	}
})


FlowRouter.route('/create/ticket', {
	action() {
		BlazeLayout.render('layout', { main: 'home', ticket_creation: 'ticket_create_form'})
	}
})
	
	
FlowRouter.route('/ticket/:ticketId', {
	action() {
	BlazeLayout.render('layout', { main: 'ticket_page'})
	}
})


FlowRouter.route('/login', {
	action() {
		BlazeLayout.render('layout', { main: 'login'})
	}
})



FlowTransition.addTransition({
  section: 'body',
  from: 'ticket_proposition',
  to: 'ticket_create_form',
  txFull: 'left' // direction of motion, content will be moving left
});



