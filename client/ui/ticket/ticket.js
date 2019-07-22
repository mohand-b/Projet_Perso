import { Tickets } from '../../../both';

import './ticket.html';

Template.ticket_proposition.events({
	'click .btn-proposition-ticket'(event, instance) {
		FlowRouter.go('/create/ticket')
	},
});

Template.ticket_create_form.events({
	'submit .js-create-ticket'(event, instance) {
		event.preventDefault();
		
		const title = event.target.title.value;
		const content = event.target.content.value;
		
		let ticketDoc = {
			title: title,
			content: content,
			createdAt: new Date(),
			ownerId: Meteor.userId(),
			open: true,
			
		};

		
		Tickets.insert(ticketDoc);
		
		event.target.title.value = '';
		event.target.content.value = '';

	},
	'click .btn-cancel'(event, instance){
		FlowRouter.go('/')
	}
});



// HELPERS

Template.ticket_page.helpers({
	ticket() {
		return Tickets.findOne({_id: FlowRouter.getParam('ticketId')});
	}
})

Template.ticket_list.helpers({
	tickets() {
		return Tickets.find({}, { sort: {createdAt: -1}}).fetch();
	}
})

Template.ticket_edit_form.helpers({
	ticket() {
		return Tickets.findOne({_id: FlowRouter.getParam('ticketId')});
	}
})

// ANIMATIONS
