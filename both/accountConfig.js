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

AccountsTemplates.addField({
	_id: 'rank',
	type: 'hidden',
	value: 1,
})

password.minLength = 3;

AccountsTemplates.addField(email);
AccountsTemplates.addField(password);

let options = {
	password: password,
	email: email
}

Accounts.onCreateUser((options, user) => {
  // add your extra fields here; don't forget to validate the options, if needed
  _.extend(user, {
    status: false,
  });

  return user;
});