import { Schema, model, models } from 'mongoose'

const EventSchema = new Schema({
	name: {type: String, required: true},
	dateFrom: {type: String, required: true},
	dateTo: {type: String, required: true},
	url: {type: String, required: true},
	description: {type: String, required: true},
	color: {type: String},
	image: [{
		url: String,
	}],
})

export const Event = models.Event || model('Event', EventSchema)