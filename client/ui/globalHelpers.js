import moment from 'moment'


Template.registerHelper('getDisplayDateTime', function(date) {
	return moment(date).format('DD/MM/YYYY à HH:mm')
})

Template.registerHelper('getUserFullname', function(userId) {
	let user = Meteor.users.findOne({_id: userId})
	
	if(user) {
		return user.username
	}
})

// RANKING HERE 
Template.registerHelper('titleRank', function(rank) {
	switch(rank) {
		case 0 : return 'Noob'
			break
		case 1 : return 'Petit correcteur'
			break
		case 2 : return 'Correcteur acharné'
			break
		case 3 : return 'Bescherelle sur pattes'
			break
		case 4 : return 'Maître correcteur'
			break
		case 5 : return 'Disciple de Voltaire'
			break
		case 6 : return 'zzzz'
			break
		case 7 : return 'Légende'
			break
		case 13 : return 'Modérateur'
			break
		case 42 : return 'Admin'
			break
		default : 'Inconnu au bataillon'
			
	}
})

Template.registerHelper('equals', function (a, b) {
	return a === b 
})

Template.registerHelper('superieur', function (a) {
	
	let b = 1
	
	if(a>b) {
		return "s"
	}
	
	
})