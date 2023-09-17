import { Schema, model, models } from 'mongoose'

const TagSchema = new Schema({
	name: {type: String, required: true},
})

export const Tag = models.Tag || model('Tag', TagSchema)