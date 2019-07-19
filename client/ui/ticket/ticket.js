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
		let score = {
			score: 0,
		}
		
		Tickets.insert(ticketDoc);
		Meteor.users.insert(score);
		
		event.target.title.value = '';
		event.target.content.value = '';
		
		/*FlowRouter.go('/')*/
	}
});



// HELPERS

Template.ticket_list.helpers({
	tickets() {
		return Tickets.find({}, { sort: {createdAt: -1}}).fetch();
	}
})

// ANIMATIONS

Template.ticket_create_form.animations({
	".item": {
    container: ".container", // container of the ".item" elements
    insert: {
      class: "fade-in", // class applied to inserted elements
      before: function(attrs, element, template) {}, // callback before the insert animation is triggered
      after: function(attrs, element, template) {}, // callback after an element gets inserted
      delay: 500 // Delay before inserted items animate
    },
    remove: {
      class: "fade-out", // class applied to removed elements
      before: function(attrs, element, template) {}, // callback before the remove animation is triggered
      after: function(attrs, element, template) {}, // callback after an element gets removed
      delay: 500 // Delay before removed items animate
    },
    animateInitial: true, // animate the elements already rendered
    animateInitialStep: 200, // Step between animations for each initial item
    animateInitialDelay: 500 // Delay before the initial items animate
  }
})