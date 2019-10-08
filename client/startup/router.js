import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Route principale : accueil
FlowRouter.route('/', {
	action() {
		BlazeLayout.render('layout', { main: 'home', ticket_creation: 'ticket_proposition'})
	}
})

// Route principale : création de ticket, module dynamique
FlowRouter.route('/create/ticket', {
	action() {
		BlazeLayout.render('layout', { main: 'home', ticket_creation: 'ticket_create_form'})
	}
})
	
// Page du ticket
FlowRouter.route('/ticket/:ticketId', {
	action() {
	BlazeLayout.render('layout', { main: 'ticket_page'})
	}
})


// Page de mofidication du ticket
FlowRouter.route('/ticket/:ticketId/edit', {
	action() {
	BlazeLayout.render('layout', { main: 'ticket_edit_form'})
	}
})


FlowRouter.route('/profil/:userId', {
	action() {
		BlazeLayout.render('layout', { main: 'profil'})
	}
})

// Page du classement
FlowRouter.route('/ladder', {
	action() {
		BlazeLayout.render('layout', { main: 'ladder'})
	}
})

// Page du classement
FlowRouter.route('/mycontributions', {
	action() {	
		BlazeLayout.render('layout', { main: 'contributions'})
	}
})





