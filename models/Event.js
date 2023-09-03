import { Schema, model, models } from 'mongoose'

const EventSchema = new Schema({
	name: {type: String, required: true},
	active: {type: Boolean, default: true},
	time: [{type: Date, required: true}],
	url: {type: String},
	description: {type: String},
	images: [{
		url: String,
	}],
	photographer: {type: String},
})

export const Event = models.Event || model('Event', EventSchema)