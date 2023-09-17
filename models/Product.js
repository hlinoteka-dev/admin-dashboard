import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema({
	name: {type: String, required: true},
	price: {type: String, required: true},
	author: {type: String, required: true},
	size: {type: String, required: true},
	topProduct: Boolean,
	newProduct: Boolean,
	productTags: [String],
	images: [{
		url: String,
		description: String
	}],
})

export const Product = models.Product || model('Product', ProductSchema)