T9n.setLanguage('fr');

let email = AccountsTemplates.removeField('email');
let password = AccountsTemplates.removeField('password');


AccountsTemplates.addField({
	_id: 'username',
	type: 'text',
	displayName: "Nom d'utilisateur",
	placeholder: "Nom d'utilisateur",
	required: true,
	minLength: 3,
	trim: true	
})

password.minLength = 3;

AccountsTemplates.addField(email);
AccountsTemplates.addField(password);