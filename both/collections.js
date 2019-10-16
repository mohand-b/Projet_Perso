import SimpleSchema from 'simpl-schema'
import { check } from 'meteor/check'

export const Tickets = new Mongo.Collection('tickets');

export const Corrections = new Mongo.Collection('corrections');


export const ticketUpsertSchema = new SimpleSchema({
	title: {
		type: String,
		min: 3,
		max: 30
	},
	content: {
		type: String,
		min: 3,
		max: 15000
	},
	id: {
		type: String,
		optional: true
	}
}, { check })

export const correctionUpsertSchema = new SimpleSchema({
	content: {
		type: String,
		min: 3,
		max: 15000
	},
	ticketId: {
		type: String
	}
}, { check })