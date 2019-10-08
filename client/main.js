import { Tickets, Corrections, UsersActivity } from '../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


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




