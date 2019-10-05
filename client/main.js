import { Tickets, Corrections, UsersActivity } from '../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';
Vue.use(VueMeteorTracker);

import Vuetify from 'vuetify'; 
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify); // this is all you need for Vuetify 1.x


import './ui/globalHelpers'
import './startup/router';
import './ui/layout/layout';

import './normalize.css';
import './main.css';
import './diff_match.js';
import './ranking.js';

if (Meteor.isDevelopment) {
	window.FlowRouter = FlowRouter;
	window.Tickets = Tickets;
	window.Corrections = Corrections;
	window.UsersActivity = UsersActivity;
}



// for Vuetify 2.x you also need:
const vuetify = new Vuetify();

Meteor.startup(() => {
	new Vue({
		el: '#app',
		vuetify, // this bit is also needed for Vuetify 2.x
		...App,
	});
});

